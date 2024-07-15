import middy from "@middy/core";
import { NewNote } from "../../drizzle/schema";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { bodyValidator } from "../util/bodyValidator";
import { NewNoteSchema } from "../../drizzle/schema";
import { addNote } from "../data/note";
import { errorHandler } from "../util/errorHandler";

export const handler: APIGatewayProxyHandler = middy(
	async (event: APIGatewayProxyEvent) => {
		const { title, content } = JSON.parse(event.body || "{}") as NewNote;
		const note: NewNote = {
			title,
			content,
		};
		const newNote = await addNote(note);
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
