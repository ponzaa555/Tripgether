import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
    args:{
        blogName : v.string(),
        author : v.string(),
        teamMate :v.array(v.string()),
        stDate : v.string(),
        endDate : v.string(),
    },
    handler : async(ctx,args) => {
        const blogId = await ctx.db.insert("Blog",{
            blogName : args.blogName,
            authorId : args.author,
            teamMate: args.teamMate,
            coverImgUrl:undefined,
            stDate:args.stDate,
            endDate:args.endDate,
        })
        return blogId;
    }
})

export const getById = mutation({
    args:{
        blogId:v.string()
    },
    handler: async(ctx , args) => {
        const blog = await ctx.db
            .query("Blog")
            .filter((q) => q.eq(q.field("_id"),args.blogId))
            .first()
        return blog
    }
})

export const upSetImageCover = mutation({
    args:{
        blogId : v.id("Blog"),
        imgUrl : v.string()
    },
    handler : async(ctx , args) =>{
        console.log("upSetImageCover")
        const {blogId} =  args
        await ctx.db.patch(blogId,{coverImgUrl : args.imgUrl})
        return args.imgUrl
    }
})