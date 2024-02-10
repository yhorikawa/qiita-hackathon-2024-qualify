import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const signIn = async (_url: string, { arg }: { arg: { userName: string } }) => {
  const result = await client.api.v1.auth.register.$post({
    json: { userName: arg.userName },
  });
  return result.ok;
};

export const useSignIn = () => {
  const { trigger } = useSWRMutation("/v1/api/register", signIn);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const signInAction = useCallback(async () => {
    const result = await trigger({ userName });
    if (!result) return;
    router.push("/messages/me");
  }, [userName, trigger, router]);
  const handleSignIn = () => signInAction();

  return {
    userName,
    setUserName,
    handleSignIn,
  };
};
