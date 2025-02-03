import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    blogName: v.string(),
    memberId: v.id("users"),
    coverImgUrl: v.optional(v.string()),
    stDate: v.string(),
    endDate: v.string(),
    liveBlockId : v.string()
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
      liveBlockId : args.liveBlockId
    });
    return ;
  },
});

export const queryMember = query({
    args:{
        liveBlockId : v.string(),
    },
    handler: async ( ctx , args) => {
        const data = await ctx.db
                            .query("draft")
                            .filter((q) => q.eq(q.field("liveBlockId" ), args.liveBlockId))
                            .collect()
        console.log({data})
        const userDataList = await data.map( async (draft) => {
            const user = await ctx.db.get(draft.memberId)
            return user
        })

        return{
            user : userDataList
        }
    }
})