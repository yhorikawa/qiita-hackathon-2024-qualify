import { hc } from "hono/client";
import { AppType } from "../../../backend/src/index";

export const client = hc<AppType>(
  "https://ideal-couscous-vr6xgpxp6gxcx4wj-8787.app.github.dev",
);
