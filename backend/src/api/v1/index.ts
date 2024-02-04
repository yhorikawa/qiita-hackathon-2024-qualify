import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import authApi from "./auth";
import usersApi from "./users";

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  ENVIROMENT: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .use(
    "*",
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
      allowHeaders: [],
    }),
  )
  .use(
    "*",
    csrf({
      origin: "http://localhost:3000",
    }),
  )
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/auth", authApi)
  .route("/users", usersApi);

export default api;
