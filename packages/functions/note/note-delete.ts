import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { deleteNote } from "../data/note";
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
		const newNote = await deleteNote(noteId);
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(newNote),
		};
	}
)
	// .use(pathParamsValidator(UUIDSchema)))
	.use(errorHandler());
