import { Hono } from "hono";
import { ReadConfig } from "./config";
import { initDependencies } from "./deps";
import { documentHandler } from "./handlers/documents";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Welcome to AI Agent" });
});

const cfg = ReadConfig();
const deps = initDependencies(cfg);

app.route("/api/documents", documentHandler(deps.documentService));

export default app;
