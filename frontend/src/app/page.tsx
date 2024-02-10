"use client";

import { useId } from "react";
import { useFormState } from "react-dom";
import useSWRMutation from "swr/mutation";
import { twMerge } from "tailwind-merge";
import { client } from "#/lib/client";
import { action } from "./_dependencies/register-action";

const clientAction = async () => {
  const result = await client.api.v1.auth.register.$post({});
  const { success } = await result.json();
  return success;
};

export default function Home() {
  const { trigger } = useSWRMutation("/v1/api/register", clientAction);
  const inputId = useId();

  return (
    <main className="p-6 flex flex-col gap-4 min-h-svh">
      <span className="w-[20rem] h-[20rem] flex justify-center items-center text-gray-500 font-bold bg-gray-200 dark:bg-gray-700 mx-auto">
        Placeholder
      </span>
      <div className="mt-20">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          ユーザー名
        </label>
        <input
          type="text"
          id={inputId}
          className={twMerge(
            "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",
          )}
          placeholder="ユーザー名を入力"
        />
        <button
          type="button"
          onClick={() => trigger()}
          className={twMerge(
            "p-4 sm:p-5 flex w-full items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
            "mt-10",
          )}
        >
          登録する
        </button>
      </div>
    </main>
  );
}
