import { Hono } from "hono";
import api from "./api/v1";

const app = new Hono();
app.route("/api/v1", api);

export default app;
