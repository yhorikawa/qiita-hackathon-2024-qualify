"use client";

import { twMerge } from "tailwind-merge";

import { useId } from "react";
import EntranceImage from "#/app/assets/entrance-image.png";
import { AllPaddingLayout } from "#/components/AllPaddingLayout";
import { useShouldNotAuthGuardEffect } from "#/components/use-is-signin";
import { useSignIn } from "./use-signin";

export default function SignInPage() {
  useShouldNotAuthGuardEffect();
  const { userName, setUserName, handleAction } = useSignIn();
  const inputId = useId();

  return (
    <AllPaddingLayout>
      <img
        src={EntranceImage.src}
        alt="ボトルメッセージのイラスト"
        className="mx-auto inline-block max-w-full select-none"
      />

      <div className="mt-20">
        <label htmlFor={inputId} className="block text-sm font-medium mb-2">
          ユーザー名
        </label>
        <input
          type="text"
          id={inputId}
          value={userName}
          onInput={(e) => setUserName(e.currentTarget.value)}
          className={twMerge(
            "py-3 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
          )}
          placeholder="ユーザー名を入力"
        />
        <p className="text-gray-400 text-sm font-medium leading-normal mt-2">
          半角英数字のみご利用になれます
        </p>
        <button
          type="button"
          onClick={handleAction}
          className={twMerge(
            "p-4 sm:p-5 flex w-full items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
            "mt-10",
          )}
        >
          登録する
        </button>
      </div>
    </AllPaddingLayout>
  );
}
