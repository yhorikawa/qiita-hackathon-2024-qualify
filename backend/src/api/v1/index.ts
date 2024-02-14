import { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import authApi from "./auth";
import messagesApi from "./messages";
import usersAPI from "./users";

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  ENVIROMENT: string;
  OPENAI_API_KEY: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .use(
    "*",
    cors({
      origin: "*",
      credentials: true,
    }),
  )
  // .use(
  //   "*",
  //   csrf({
  //     origin: [
  //       "http://localhost:3000",
  //       "*.app.github.dev",
  //       "https://qiita-hackathon-2024-qualify-frontend.pages.dev",
  //     ],
  //   }),
  // )
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/auth", authApi)
  .route("/messages", messagesApi)
  .route("/users", usersAPI);

export default api;
