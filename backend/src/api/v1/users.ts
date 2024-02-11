import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app.get("/me", async (c) => {
  return c.json({ success: true });
});

export default routes;
