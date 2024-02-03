import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import * as db from "./gen/sqlc/querier";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/query/customers", async (c) => {
  const { results } = await db.customers(c.env.DB);
  return c.json(results);
});

export default app;
