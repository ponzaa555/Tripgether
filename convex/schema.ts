import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    userId: v.string(),
    email: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  requests: defineTable({
    sender: v.id("users"),
    receiver: v.id("users"),
  })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"]),

  friends: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    conversationId: v.id("conversations"),
  })
    .index("by_user1", ["user1"])
    .index("by_user2", ["user2"])
    .index("by_conversationId", ["conversationId"]),

  conversations: defineTable({
    name: v.optional(v.string()),
    isGroup: v.boolean(),
    lastMessage: v.optional(v.id("messages")),
  }),

  conversationMembers: defineTable({
    memberId: v.id("users"),
    conversationId: v.id("conversations"),
    lastSeenMessage: v.optional(v.id("messages")),
  })
    .index("by_conversationId", ["conversationId"])
    .index("by_memberId", ["memberId"])
    .index("by_conversationId_memberId", ["conversationId", "memberId"]),

  messages: defineTable({
    senderId: v.id("users"),
    conversationId: v.id("conversations"),
    type: v.string(),
    content: v.array(v.string()),
  }).index("by_conversationId", ["conversationId"]),

  Blog:defineTable({
    blogName : v.string(),
    authorId : v.string(),
    teamMate : v.array(v.string()),
    coverImgUrl : v.optional(v.string()),
    stDate : v.string(),
    endDate : v.string(),
  })
});
