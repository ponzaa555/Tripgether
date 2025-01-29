import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const like = mutation({
  args: {
    blogId: v.id("blog"),
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

    const existingLike = await ctx.db
      .query("like")
      .withIndex("by_blogId_userId", (q) =>
        q.eq("blogId", args.blogId).eq("userId", identity._id)
      )
      .unique();

    if (existingLike) {
      await ctx.db.delete(existingLike._id);
    } else {
      await ctx.db.insert("like", {
        blogId: args.blogId,
        userId: identity._id,
        createdAt: new Date().toISOString(),
      });
    }
  },
});

export const createComment = mutation({
  args: {
    blogId: v.id("blog"),
    currentUserId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.currentUserId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    await ctx.db.insert("comment", {
      blogId: args.blogId,
      userId: identity._id,
      content: args.content,
      createdAt: new Date().toISOString(),
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("comment"),
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
    const comment = await ctx.db.get(args.commentId);

    if (!comment) {
      throw new ConvexError("Comment not found");
    }

    if (comment.userId !== identity._id) {
      throw new ConvexError("You can only delete your own comments");
    }

    await ctx.db.delete(args.commentId);
  },
});

export const getCommentsByBlog = query({
  args: {
    blogId: v.id("blog"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comment")
      .withIndex("by_blogId", (q) => q.eq("blogId", args.blogId))
      .collect();

    const commentWithUser = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        return {
          ...comment,
          user,
        };
      })
    );

    return commentWithUser;
  },
});

export const getLikesByBlog = query({
  args: {
    blogId: v.id("blog"),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("like")
      .withIndex("by_blogId", (q) => q.eq("blogId", args.blogId))
      .collect();
    const likesWithUsers = await Promise.all(
      likes.map(async (like) => {
        const user = await ctx.db.get(like.userId);
        return {
          ...like,
          user,
        };
      })
    );

    return likesWithUsers;
  },
});

export const bookmark = mutation({
  args: {
    blogId: v.id("blog"),
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
    const existingBookmark = await ctx.db
      .query("bookmark")
      .withIndex("by_blogId_userId", (q) =>
        q.eq("blogId", args.blogId).eq("userId", identity._id)
      )
      .unique();

    if (existingBookmark) {
      await ctx.db.delete(existingBookmark._id);
    } else {
      await ctx.db.insert("bookmark", {
        blogId: args.blogId,
        userId: identity._id,
        createdAt: new Date().toISOString(),
      });
    }
  },
});

export const getBookmarksByBlog = query({
  args: {
    blogId: v.id("blog"),
  },
  handler: async (ctx, args) => {
    const bookmarks = await ctx.db
      .query("bookmark")
      .withIndex("by_blogId_userId", (q) => q.eq("blogId", args.blogId))
      .collect();

    const bookmarkWithUser = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const user = await ctx.db.get(bookmark.userId);
        return {
          ...bookmark,
          user,
        };
      })
    );

    return bookmarkWithUser;
  },
});
