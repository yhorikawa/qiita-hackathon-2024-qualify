import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import customerApi from "./customers";

export type Bindings = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/customers", customerApi);

export default api;
