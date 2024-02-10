import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

const routes = app
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        userName: z.string(),
      }),
    ),
    async (c) => {
      const { userName } = await c.req.valid("json");
      const id = crypto.randomUUID();

      await db.createUsers(c.env.DB, { id, userName });
      const accessToken = await sign({ id: id }, c.env.JWT_SECRET);
      setCookie(c, "accessToken", accessToken, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        httpOnly: true,
        sameSite: "Lax",
        secure: c.env.ENVIROMENT === "dev" ? false : true,
      });
      c.status(201);
      return c.json({ success: true });
    },
  )

  .post(
    "/signin",
    zValidator(
      "json",
      z.object({
        userName: z.string(),
      }),
    ),
    async (c) => {
      const { userName } = await c.req.valid("json");

      const results = await db.getUser(c.env.DB, { userName });
      if (!results) {
        c.status(401);
        return c.json({ message: "User does not exist" });
      }

      const accessToken = await sign({ id: results.id }, c.env.JWT_SECRET);
      setCookie(c, "accessToken", accessToken, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        httpOnly: true,
        sameSite: "Lax",
        secure: c.env.ENVIROMENT === "dev" ? false : true,
      });
      return c.json({ success: true });
    },
  );

export default routes;
