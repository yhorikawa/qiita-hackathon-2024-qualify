import { ClientRequest, hc } from "hono/client";
import { AppType } from "../../../backend/src/index";

const ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

export const client = hc<AppType>(ENDPOINT, {
  // MEMO: https://github.com/orgs/honojs/discussions/1054#discussioncomment-5766433
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fetch: (req: any) => {
    return fetch(req, {
      mode: "cors",
      headers: {
        credentials: "include",
      },
    });
  },
});
