import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
});