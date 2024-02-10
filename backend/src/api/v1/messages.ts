import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import { fetchChatGPTResponse } from "../../util/openai";
import { Bindings } from "./index";

const categories = [
  "love",
  "work",
  "education",
  "health",
  "mental-health",
  "finances",
  "growth",
  "life",
  "loss",
  "identity",
  "parenting",
  "sexuality",
  "communication",
  "relationships",
];

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

      const messages = [
        { role: "system", content: systemChat },
        {
          role: "user",
          content: content,
        },
      ];
      const response = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        messages,
      );

      const category = categories.includes(response.choices[0].message.content)
        ? response.choices[0].message.content
        : "other";

      const createMessageParams = {
        userId: payload.id,
        category: category,
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

    const category = mostFrequentCategory?.category || "";
    const messages = await db.getCategorizedMessages(c.env.DB, {
      userId,
      category,
      limit: 10,
    });

    const ids =
      messages.results.length !== 0 ? messages.results.map((m) => m.id) : [0];
    const limit = 10 - messages.results.length;
    const randomMessage = await db.getRandMessages(c.env.DB, {
      userId,
      ids,
      limit,
    });

    return c.json({
      success: true,
      messages: messages.results.concat(randomMessage.results),
    });
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

const systemChat = `
  これらのカテゴリーのどれに当てはまるかだけをお答えします
  - love
  - work
  - education
  - health
  - mental-health
  - finances
  - growth
  - life
  - loss
  - identity
  - parenting
  - sexuality
  - communication
  - relationships

  判断したら、日本語を含まずカテゴリー名のみを出力してください。
  以降の返答に以下に定義する特定のワードが含まれる場合は指示に従ってカテゴリーのみを出力します

  - 以降の文章に恋人、パートナー、彼氏、彼女、デート、好き、愛、別れ、不倫、浮気、信頼、疑念、遠距離、相性、片思い、恋愛関係、異性、結婚、モテるなどのキーワードが部分一致でも含まれる場合は「love」で出力
  - 以降の文章に「結婚」が含まれる場合は「love」で出力
  - 以降の文章に「会社」が含まれる場合は「work」で出力
  - 以降の文章に「育児」「子ども」というキーワードが含まれない限り「parenting」で出力しない
`;
