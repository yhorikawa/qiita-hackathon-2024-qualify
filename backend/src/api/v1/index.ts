import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import authApi from "./auth";
import usersApi from "./users";
import messagesApi from './messages'

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  ENVIROMENT: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .use(
    "*",
    csrf({
      origin: ["http://localhost:3000", "*.app.github.dev"],
    }),
  )
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/auth", authApi)
  .route("/users", usersApi)
  .route("/messages", messagesApi);

export default api;
