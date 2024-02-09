import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import * as db from "../../gen/sqlc/querier";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

const routes = app
  .post("/register", async (c) => {
    const uuid = crypto.randomUUID();
    const createUserParams = {
      uuid,
    };

    await db.createUsers(c.env.DB, createUserParams);
    const accessToken = await sign({ uuid: uuid }, c.env.JWT_SECRET);
    setCookie(c, "accessToken", accessToken, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      httpOnly: true,
      sameSite: "None",
      // secure:  c.env.ENVIROMENT === "dev" ? false : true,
      secure: true,
      path: "/",
    });
    c.status(201);
    return c.json({ success: true });
  })

  .post("/signin", async (c) => {
    const { uuid } = await c.req.json();

    const results = await db.getUser(c.env.DB, { uuid });
    if (!results) {
      c.status(401);
      return c.json({ message: "User does not exist" });
    }

    const accessToken = await sign({ uuid: results.uuid }, c.env.JWT_SECRET);
    setCookie(c, "accessToken", accessToken, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      httpOnly: true,
      sameSite: "None",
      secure: c.env.ENVIROMENT === "dev" ? false : true,
      domain: "github.dev",
    });
    return c.json({ success: true });
  });

export default routes;
