import { hc } from "hono/client";
import { AppType } from "../../../backend/src/index";

// TODO: 環境変数からURLを取得するようにする
export const client = hc<AppType>("http://localhost:3000");
