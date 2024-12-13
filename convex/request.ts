import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    email: v.string(),
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

    if (identity.email === args.email) {
      throw new ConvexError("You cannot send a request to yourself");
    }

    const receiver = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError("User could not be found");
    }

    const requestAlreadySent = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", receiver._id).eq("sender", identity._id)
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError("Request already sent");
    }

    const requestAlreadyReceived = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", identity._id).eq("sender", receiver._id)
      )
      .unique();
    if (requestAlreadyReceived) {
      throw new ConvexError("This user has already sent you a request");
    }

    const frineds1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", identity._id))
      .collect();

    const frineds2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", identity._id))
      .collect();

    if (
      frineds1.some((friend) => friend.user2 === receiver._id) ||
      frineds2.some((friend) => friend.user1 === receiver._id)
    ) {
      throw new ConvexError("You are already friends with this user");
    }

    const request = await ctx.db.insert("requests", {
      sender: identity._id,
      receiver: receiver._id,
    });

    return request;
  },
});

export const deny = mutation({
  args: {
    id: v.id("requests"),
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

    const request = await ctx.db.get(args.id);

    if (!request || request.receiver !== identity._id) {
      throw new ConvexError("There was an error denying the request");
    }

    await ctx.db.delete(request._id);
  },
});

export const accept = mutation({
  args: {
    id: v.id("requests"),
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

    const request = await ctx.db.get(args.id);
    if (!request || request.receiver !== identity._id) {
      throw new ConvexError("There was an error accepting the request");
    }

    const conversationId = await ctx.db.insert("conversations", {
      isGroup: false,
    });

    await ctx.db.insert("friends", {
      user1: identity._id,
      user2: request.sender,
      conversationId,
    });

    await ctx.db.insert("conversationMembers", {
      memberId: identity._id,
      conversationId,
    });

    await ctx.db.insert("conversationMembers", {
      memberId: request.sender,
      conversationId,
    });

    await ctx.db.delete(request._id);
  },
});
