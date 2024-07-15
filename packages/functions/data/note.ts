import { NewNote, Note, notes } from "../../drizzle/schema";
import { db } from "../../drizzle/client";
import { eq } from "drizzle-orm";

export const addNote = async (note: NewNote) => {
	const newNote = await db
		.insert(notes)
		.values({
			title: note.title,
			content: note.content,
		})
		.returning();
	return newNote;
};
export const getNoteById = async (id: string): Promise<Note | null> => {
	const [note] = await db
		.select()
		.from(notes)
		.where(eq(notes.id, id))
		.limit(1);
	return note || null;
};

export const getAllNote = async () => {
	const note = await db.select().from(notes).offset(1).limit(10);
};

export const updateNote = async (
	id: string,
	updatedNote: NewNote
): Promise<Note | null> => {
	const [updated] = await db
		.update(notes)
		.set({ ...updatedNote, updatedAt: new Date() })
		.where(eq(notes.id, id))
		.returning();
	return updated || null;
};

export const deleteNote = async (id: string) => {
	const result = await db.delete(notes).where(eq(notes.id, id));
	console.log(result);
};
