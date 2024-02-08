"use server";

import { client } from "#/lib/client";

export const action = async () => {
  const result = await client.api.v1.auth.register.$post({});
  const { success } = await result.json();
  return success;
};
