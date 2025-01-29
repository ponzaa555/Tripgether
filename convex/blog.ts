import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    blogName: v.string(),
    currentUserId: v.string(),
    teamMate: v.array(v.string()),
    stDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.currentUserId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    const blogId = await ctx.db.insert("blog", {
      blogName: args.blogName,
      authorId: identity._id,
      teamMate: args.teamMate,
      coverImgUrl: undefined,
      stDate: args.stDate,
      endDate: args.endDate,
    });
    return blogId;
  },
});

export const getById = mutation({
  args: {
    blogId: v.string(),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blog")
      .filter((q) => q.eq(q.field("_id"), args.blogId))
      .first();
    return blog;
  },
});

export const upSetImageCover = mutation({
  args: {
    blogId: v.id("blog"),
    imgUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { blogId } = args;
    await ctx.db.patch(blogId, { coverImgUrl: args.imgUrl });
    return args.imgUrl;
  },
});
