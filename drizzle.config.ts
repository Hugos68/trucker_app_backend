import { defineConfig } from "drizzle-kit";

// biome-ignore lint/style/noDefaultExport: Required by Drizzle
export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schema.ts",
	schemaFilter: "public",
	dbCredentials: {
		host: process.env.POSTGRES_HOST as string,
		port: Number.parseInt(process.env.POSTGRES_PORT as string),
		database: process.env.POSTGRES_DATABASE as string,
		user: process.env.POSTGRES_USERNAME as string,
		password: process.env.POSTGRES_PASSWORD as string,
	},
});
