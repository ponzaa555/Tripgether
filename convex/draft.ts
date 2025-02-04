"use client";

import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    blogName: v.string(),
    memberId: v.string(),
    coverImgUrl: v.optional(v.string()),
    stDate: v.string(),
    endDate: v.string(),
    liveBlockId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.memberId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }
    console.log({ identity });
    const draftId = await ctx.db.insert("draft", {
      blogName: args.blogName,
      memberId: identity._id,
      coverImgUrl: undefined,
      stDate: args.stDate,
      endDate: args.endDate,
      liveBlockId: args.liveBlockId,
    });
    return;
  },
});

export const queryMember = query({
  args: {
    liveBlockId: v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("draft")
      .filter((q) => q.eq(q.field("liveBlockId"), args.liveBlockId))
      .collect();
    console.log({ data });
    const userDataList = await data.map(async (draft) => {
      const user = await ctx.db.get(draft.memberId);
      return user;
    });

    return {
      user: userDataList,
    };
  },
});

export const queryDraftByRoomId = mutation({
  args: {
    liveBlockId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(args);
    return await getDraftByLiveBlockId(ctx, args.liveBlockId);
  },
});

async function getDraftByLiveBlockId(ctx: MutationCtx, liveBlockId: string) {
  return await ctx.db
    .query("draft")
    .withIndex("by_liveBlock", (q) => q.eq("liveBlockId", liveBlockId))
    .first();
}

async function getDraftByDrafttId(ctx: MutationCtx, draftId: string) {
  return await ctx.db
    .query("draft")
    .withIndex("by_id", (q) => q.eq("_id", draftId as Id<"draft">))
    .first();
}

export const queryDraftByUserId = query({
  args: {
    membersId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.membersId))
      .unique();
    if (!identity) {
      throw new ConvexError("User not found");
    }

    const data = await ctx.db
      .query("draft")
      .filter((q) => q.eq(q.field("memberId"), identity._id))
      .collect();

    return data;
  },
});

export const AddFriend = mutation({
  args: {
    draftId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user) {
      throw new ConvexError("User not found");
    }

    const draft = await getDraftByDrafttId(ctx, args.draftId);
    if (!draft) {
      throw new ConvexError("Draft not found");
    }

    const draftId = await ctx.db.insert("draft", {
      blogName: draft?.blogName,
      memberId: user._id,
      coverImgUrl: draft.coverImgUrl,
      stDate: draft.stDate,
      endDate: draft.endDate,
      liveBlockId: draft.liveBlockId,
    });

    return { status: 200 };
  },
});

export const deleteDraft = mutation({
  args: {
    liveBlockId: v.string(),
  },
  handler: async (ctx, args) => {
    const listDraft = await ctx.db
      .query("draft")
      .withIndex("by_liveBlock", (q) => q.eq("liveBlockId", args.liveBlockId))
      .collect();
    for (const element of listDraft) {
      await ctx.db.delete(element._id );
    }
  },
});
