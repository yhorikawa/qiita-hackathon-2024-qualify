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

  .get("/categorized", async (c) => {
    const payload = c.get("jwtPayload");
    const userId = payload.id;

    const mostFrequentCategory = await db.findMostFrequentCategory(c.env.DB, {
      userId,
    });
    const category = mostFrequentCategory?.category || "love";
    const messages = await db.getCategorizedMessages(c.env.DB, {
      userId,
      category,
      limit: 10,
    });

    return c.json({ success: true, messages: messages.results });
  })

  .get("/sent", async (c) => {
    const payload = c.get("jwtPayload");
    const userId = payload.id;
    const messages = await db.getSentMessages(c.env.DB, { userId });
    return c.json({ success: true, messages: messages.results });
  })

  .get(
    "/:messageId",
    zValidator(
      "param",
      z.object({
        messageId: z
          .string()
          .transform((v) => parseInt(v))
          .refine((v) => !Number.isNaN(v), { message: "not a number" }),
      }),
    ),
    async (c) => {
      const { messageId } = c.req.valid("param");
      const message = await db.getMessage(c.env.DB, { id: messageId });
      return c.json({ success: true, message });
    },
  )

  .post(
    "/:messageId/replies",
    zValidator(
      "json",
      z.object({
        content: z.string(),
      }),
    ),
    zValidator(
      "param",
      z.object({
        messageId: z
          .string()
          .transform((v) => parseInt(v))
          .refine((v) => !Number.isNaN(v), { message: "not a number" }),
      }),
    ),
    async (c) => {
      const payload = c.get("jwtPayload");
      const { content } = await c.req.valid("json");
      const { messageId } = c.req.valid("param");
      await db.createReply(c.env.DB, {
        messageId,
        content,
        userId: payload.id,
      });
      c.status(201);
      return c.json({ success: true });
    },
  )

  .get(
    "/:messageId/replies",
    zValidator(
      "param",
      z.object({
        messageId: z
          .string()
          .transform((v) => parseInt(v))
          .refine((v) => !Number.isNaN(v), { message: "not a number" }),
      }),
    ),
    async (c) => {
      const { messageId } = c.req.valid("param");
      const replies = await db.getReplies(c.env.DB, { messageId });
      return c.json({ success: true, replies: replies.results });
    },
  );

export default routes;
