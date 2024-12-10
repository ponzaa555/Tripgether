import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    senderId: v.string(),
  },
  handler: async (ctx, args) => {
    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", args.senderId))
      .collect();

    const requestWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request._id);
        const senderId = sender?.sender;

        if (!senderId) {
          throw new ConvexError("Request sender not found");
        }
        return { senderId, request };
      })
    );
    return requestWithSender;
  },
});
