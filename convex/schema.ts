import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  requests: defineTable({
    sender: v.string(),
    receiver: v.string(),
  })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"]),
});
