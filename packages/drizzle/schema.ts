import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const notes = pgTable("notes", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const NewNoteSchema = createInsertSchema(notes, {
	title: z.string().min(3),
});

export type Note = typeof notes.$inferInsert;

export type NewNote = z.infer<typeof NewNoteSchema>;
