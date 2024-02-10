import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (_url: string, { arg }: { arg: { content: string } }) => {
  const res = await client.api.v1.messages.$post({
    json: {
      content: arg.content,
    },
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.ok;
};

export const usePostMessage = () => {
  const router = useRouter();
  const onSuccess = useCallback(() => {
    router.push("/messages/me/sent");
  }, [router]);
  const { trigger } = useSWRMutation("postMessage", fetcher, { onSuccess });
  const [text, setText] = useState<string>("");
  const action = useCallback(() => {
    trigger({ content: text });
  }, [trigger, text]);
  const handleAction = useCallback(() => action(), [action]);

  return {
    text,
    setText,
    handleAction,
  };
};
