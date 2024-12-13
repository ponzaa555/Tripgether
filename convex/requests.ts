import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: { currentUserId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.currentUserId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", identity._id))
      .collect();

    const requestWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);
        if (!sender) {
          throw new ConvexError("Request sender could not be found");
        }
        return { sender, request };
      })
    );
    return requestWithSender;
  },
});

export const count = query({
  args: { currentUserId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.currentUserId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", identity._id))
      .collect();
    return requests.length;
  },
});
