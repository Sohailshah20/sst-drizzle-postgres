import { StackContext, Api, EventBus } from "sst/constructs";

export function API({ stack }: StackContext) {
	const api = new Api(stack, "api", {
		routes: {
			"POST /note": "packages/functions/note/note-post.handler",
			"GET /note/{id}": "packages/functions/note/note-get.handler",
			"PUT /note/{id}": "packages/functions/note/note-put.handler",
			"DELETE /note/{id}": "packages/functions/note/note-delete.handler",
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
