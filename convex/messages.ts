import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    id: v.id("conversations"),
    currentUserId: v.string(),
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
        q.eq("conversationId", args.id).eq("memberId", identity._id)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("You are not a member of the conversation");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
      .order("desc")
      .collect();

    const messagesWithUsers = Promise.all(
      messages.map(async (message) => {
        const messageSender = await ctx.db.get(message.senderId);

        if (!messageSender) {
          throw new ConvexError("Could not find sender a message");
        }

        return {
          message,
          senderImage: messageSender.imageUrl,
          senderName: messageSender.username,
          isCurrentUser: messageSender._id === identity._id,
        };
      })
    );

    return messagesWithUsers;
  },
});
