import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app.post(
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
    //const ok = createMessages({ content })
    c.status(201);
    return c.json({ success: true });
  },
);

export default routes;
