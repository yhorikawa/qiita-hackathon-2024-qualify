import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import api from "./api/v1";

const app = new Hono();
const routes = app.route("/api/v1", api);
showRoutes(app);
export default app;
export type AppType = typeof routes;
