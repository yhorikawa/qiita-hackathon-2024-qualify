import { useParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async (id: string) => {
  const res = await client.api.v1.messages[":messageId"].$get({
    param: { messageId: id },
  });
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useSentMessage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const swr = useSWR(["/api/v1/messages/:messageId", id], ([, messageId]) =>
    fetcher(messageId),
  );
  useEffect(() => {
    if (swr.error) throw swr.error;
  }, [swr.error]);
  return swr;
};
