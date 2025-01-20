import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createOrUpdateUser = mutation({
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
      .unique();
    if (user) {
      await ctx.db.patch(user._id, {
        username: args.username,
        imageUrl: args.imageUrl,
        email: args.email,
      });
    } else {
      await ctx.db.insert("users", args);
    }
    return args;
  },
});

export const getUserById = mutation({
  args:{
    userId : v.string()
  },
  handler: async (ctx , args) =>{
    const user = await ctx.db
                  .query("users")
                  .withIndex("by_userId", (q) => q.eq("userId",args.userId))
                  .first()
    return user
  }
})
