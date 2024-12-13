import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
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
    const friendship1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", identity._id))
      .collect();

    const friendship2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", identity._id))
      .collect();

    const friendships = [...friendship1, ...friendship2];

    const friends = await Promise.all(
      friendships.map(async (friendship) => {
        const friend = await ctx.db.get(
          friendship.user1 === identity._id
            ? friendship.user2
            : friendship.user1
        );

        if (!friend) {
          throw new ConvexError("Friend not found");
        }

        return friend;
      })
    );
    return friends;
  },
});
