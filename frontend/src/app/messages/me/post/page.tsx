"use client";

import TextareaAutosize from "react-textarea-autosize";

import Link from "next/link";
import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { NavigationLayout } from "#/components/NavigationLayout";

export default function MessagesPage() {
  const textareaId = useId();
  const [text, setText] = useState<string>("");
  return (
    <NavigationLayout>
      <Link
        href="#"
        className="inline-flex items-center gap-x-2.5 text-sm text-blue-600 decoration-2 font-semibold dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="flex-shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        すべての届いたメッセージ
      </Link>
      <div className={twMerge("pt-0.5", "mt-4")}>
        <label
          htmlFor={textareaId}
          className="block text-sm mb-2 dark:text-white font-bold"
        >
          送るメッセージ
        </label>
        <TextareaAutosize
          id={textareaId}
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          className={twMerge(
            "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",
          )}
          minRows={10}
          cacheMeasurements={true}
          placeholder="誰かに伝えたいことを書こう"
        />
      </div>
      <button
        type="button"
        className={twMerge(
          "p-4 sm:p-5 flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
          "mt-4 ml-auto",
        )}
      >
        メッセージを送る
      </button>
    </NavigationLayout>
  );
}
