import * as db from "@/sqlc/querier";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

// TODO: 検証用に作ったので、実際にDeployするときは消す
const routes = app.get("/:uuid", async (c) => {
  const payload = c.get("jwtPayload");
  const uuid = c.req.param("uuid");

  if (payload.uuid !== uuid) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const user = await db.getUser(c.env.DB, { uuid });
  if (!user) {
    c.status(404);
    return c.json({ message: "Not Found" });
  }

  return c.json(user);
});

export default routes;
