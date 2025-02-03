import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
export const create = mutation({
  args: {
    blogName: v.string(),
    authorId: v.string(),
    stDate: v.string(),
    endDate: v.string(),
    roomId: v.string(),
    coverImgUrl: v.optional(v.string()),  // coverImgUrl is optional
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.authorId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    console.log({ identity });

    const blogData: any = {
      blogName: args.blogName,
      authorId: identity._id,
      stDate: args.stDate,
      endDate: args.endDate,
      roomId: args.roomId,
    };

    // Only add coverImgUrl if it's defined (not null or undefined)
    if (args.coverImgUrl !== undefined && args.coverImgUrl !== null) {
      blogData.coverImgUrl = args.coverImgUrl;
    }

    const blogId = await ctx.db.insert("blog", blogData);
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
    draftId: v.id("draft"),
    imgUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { draftId } = args;
    await ctx.db.patch(draftId, { coverImgUrl: args.imgUrl });
    return args.imgUrl;
  },
});

export const infiniteScrollAndSearch = query({
  args: {
    paginationOpts: paginationOptsValidator,
    query: v.string(),
  },
  handler: async (ctx, args) => {
    let data;
    if (args.query === "") {
      data = await ctx.db
        .query("blog")
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      data = await ctx.db
        .query("blog")
        .filter((q) => q.eq(q.field("blogName"), args.query))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    const blogWithUserData = await Promise.all(
      data.page.map(async (blog) => {
        const user = await ctx.db.get(blog.authorId);
        return {
          ...blog,
          user,
        };
      })
    );

    return {
      ...data,
      page: blogWithUserData,
    };
  },
});

export const getByIdQuery = query({
  args: {
    blogId: v.id("blog"),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blog")
      .withIndex("by_id", (q) => q.eq("_id", args.blogId))
      .first();
    return blog;
  },
});

export const getBlogsbyUserId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.authorId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    const blogs = await ctx.db
      .query("blog")
      .withIndex("by_authorId", (q) => q.eq("authorId", identity._id))
      .collect();
    return blogs;
  },
});
