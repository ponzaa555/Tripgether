import { ConvexError, v } from "convex/values";
import { MutationCtx, query } from "./_generated/server";
import { QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {
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

    const conversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", identity._id))
      .collect();

    const conversations = await Promise.all(
      conversationMemberships.map(async (membership) => {
        const conversation = await ctx.db.get(membership.conversationId);
        if (!conversation) {
          throw new ConvexError("Conversation could not be found");
        }
        return conversation;
      })
    );
    const conversationWithDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const allConversationMemberships = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", (q) =>
            q.eq("conversationId", conversation?._id)
          )
          .collect();
        const lastMessage = await getLastMessageDetails({
          ctx,
          id: conversation.lastMessage,
        });
        if (conversation.isGroup) {
          return { conversation, lastMessage };
        } else {
          const otherMembership = allConversationMemberships.filter(
            (member) => member.memberId !== identity._id
          )[0];
          const otherMember = await ctx.db.get(otherMembership.memberId);
          return { conversation, otherMember, lastMessage };
        }
      })
    );
    return conversationWithDetails;
  },
});

const getLastMessageDetails = async ({
  ctx,
  id,
}: {
  ctx: QueryCtx | MutationCtx;
  id: Id<"messages"> | undefined;
}) => {
  if (!id) return null;

  const message = await ctx.db.get(id);

  if (!message) {
    return null;
  }

  const sender = await ctx.db.get(message.senderId);

  if (!sender) return null;

  const content = getMessageContent(
    message.type,
    message.content as unknown as string
  );

  return {
    content,
    sender: sender.username,
  };
};

const getMessageContent = (type: string, content: string) => {
  switch (type) {
    case "text":
      return content;
    default:
      return "[Non-text]";
  }
};
