import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    currentUserId: v.string(),
    conversationId: v.id("conversations"),
    type: v.string(),
    content: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.currentUserId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversationId_memberId", (q) =>
        q.eq("conversationId", args.conversationId).eq("memberId", identity._id)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("You are not a member of the conversation");
    }

    const message = await ctx.db.insert("messages", {
      senderId: identity._id,
      conversationId: args.conversationId,
      type: args.type,
      content: args.content,
    });

    await ctx.db.patch(args.conversationId, {
      lastMessage: message,
    });

    return message;
  },
});
