import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        content: z.string(),
      }),
    ),
    async (c) => {
      const payload = c.get("jwtPayload");
      const { content } = await c.req.valid("json");
      const createMessageParams = {
        userId: payload.id,
        category: "love",
        content,
      };

      await db.createMessage(c.env.DB, createMessageParams);
      c.status(201);
      return c.json({ success: true });
    },
  )
  .post(
    "/messages/:message_id/reply",
    zValidator(
      "json",
      z.object({
        content: z.string(),
      }),
    ),
    async (c) => {
      const payload = c.get("jwtPayload");
      const { content } = await c.req.valid("json");
      //const ok = createReplies({ content })
      c.status(201);
      return c.json({ success: true });
    },
  )
  .get("/", async (c) => {
    const payload = c.get("jwtPayload");
    //const messages = getMessages()
    return c.json({ success: true, messages: ["hello", "world"] });
  })
  .get("/:message_id", async (c) => {
    const payload = c.get("jwtPayload");
    const { message_id } = c.req.param();
    //const message = getMessage({ message_id })
    return c.json({ success: true, message: "hello" });
  });

export default routes;
