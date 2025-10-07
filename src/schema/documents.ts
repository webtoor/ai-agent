import * as p from "drizzle-orm/pg-core";

export const documents = p.pgTable("documents", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  chunkIndex: p.integer("chunk_index").notNull(),
  chunkContent: p.text("chunk_content").notNull(),
  embedding: p.vector("embedding", { dimensions: 1536 }),
  metadata: p.jsonb("metadata").default("{}").notNull(),
  createdAt: p
    .timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
