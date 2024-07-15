import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getNoteById } from "../data/note";
import { errorHandler } from "../util/errorHandler";

export const handler: APIGatewayProxyHandler = middy(
	async (event: APIGatewayProxyEvent) => {
		const noteId = event.pathParameters?.id ?? null;
		if (!noteId) {
			return {
				statusCode: 400,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ message: "note id is required" }),
			};
		}
		const note = await getNoteById(noteId);
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(note),
		};
	}
)
	// .use(bodyValidator(NewNoteSchema))
	.use(errorHandler());
