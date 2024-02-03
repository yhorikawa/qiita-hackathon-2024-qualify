import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import customerApi from "./customers";

export type Bindings = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>();

api.get("/", (c) => {
  return c.text("Hello Hono!");
});

api.route("customers", customerApi);

export default api;
