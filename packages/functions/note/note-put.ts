import middy from "@middy/core";
import { NewNote } from "../../drizzle/schema";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { bodyValidator } from "../util/bodyValidator";
import { NewNoteSchema } from "../../drizzle/schema";
import { updateNote } from "../data/note";
import { errorHandler } from "../util/errorHandler";

export const handler: APIGatewayProxyHandler = middy(
	async (event: APIGatewayProxyEvent) => {
		const noteId = event.pathParameters?.id ?? null;
		if (!noteId) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "invalid request" }),
			};
		}
		const { title, content } = JSON.parse(event.body || "{}") as NewNote;
		const note: NewNote = {
			title,
			content,
		};
		const newNote = await updateNote(noteId, note);
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(newNote),
		};
	}
)
	.use(bodyValidator(NewNoteSchema))
	.use(errorHandler());
