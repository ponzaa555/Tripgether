import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    nextAuthId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

export const get = internalQuery({
  args: { nextAuthId: v.string() },
  async handler(ctx, args) {
    return ctx.db
      .query("users")
      .withIndex("by_nextAuthId", (q) => q.eq("nextAuthId", args.nextAuthId))
      .unique();
  },
});
