import { defineConfig } from "drizzle-kit";

const connectionString =
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
  `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` +
  `?sslmode=disable&connect_timeout=${process.env.DB_TIMEOUT}`;

export default defineConfig({
  schema: "./database/schema",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString!,
  },
  migrations: {
    prefix: "timestamp",
    schema: "public",
  },
});
