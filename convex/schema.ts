import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    nextAuthId: v.string(),
    email: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_nextAuthId", ["nextAuthId"]),
});
