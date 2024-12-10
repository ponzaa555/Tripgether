import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    receiverId: v.string(),
    senderId: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.receiverId === args.senderId) {
      throw new ConvexError("You cannot send a request to yourself");
    }
    const requestAlreadySent = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", args.receiverId).eq("sender", args.senderId)
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError("Request already sent");
    }

    const requestAlreadyReceived = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", args.senderId).eq("sender", args.receiverId)
      )
      .unique();
    if (requestAlreadyReceived) {
      throw new ConvexError("This user has already sent you a request");
    }

    const request = await ctx.db.insert("requests", {
      sender: args.senderId,
      receiver: args.receiverId,
    });

    return request;
  },
});
