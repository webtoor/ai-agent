import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Welcome to AI Agent" });
});

export default app;
