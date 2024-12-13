import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    userId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    if (user.length > 0) {
      throw new ConvexError("User already exists");
    }
    ctx.db.insert("users", args);
    return args;
  },
});
