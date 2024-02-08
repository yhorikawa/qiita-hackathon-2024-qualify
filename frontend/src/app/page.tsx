"use client";

import { useFormState } from "react-dom";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";
import { action } from "./_dependencies/register-action";

const clientAction = async () => {
  const result = await client.api.v1.auth.register.$post({});
  const { success } = await result.json();
  return success;
};

export default function Home() {
  const { trigger } = useSWRMutation("/v1/api/register", clientAction);
  const [state, formAction] = useFormState(action, false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button type="button" onClick={() => trigger()}>
        Register
      </button>
      <form action={formAction}>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
