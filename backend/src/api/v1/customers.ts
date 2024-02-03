import { Hono } from "hono";
import * as db from "../../gen/sqlc/querier";
import { Bindings } from "./index";

const customerApi = new Hono<{ Bindings: Bindings }>();

customerApi.get("/", async (c) => {
  const { results } = await db.customers(c.env.DB);
  return c.json(results);
});

export default customerApi;
