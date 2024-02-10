"use client";

import Link from "next/link";
import { PropsWithChildren, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useBottoleMessageList } from "./use-bottle-message-list";
import { useMarkMessageRead } from "./use-mark-message-read";
import { useTab } from "./use-tab";

export const NavigationLayout = ({ children }: PropsWithChildren<unknown>) => {
  const { data, isLoading } = useBottoleMessageList();
  const [readMessages] = useMarkMessageRead();
  const someoneMessageCount = useMemo(() => {
    return (
      data?.messages.filter((message) => !readMessages?.includes(message.id))
        .length ?? 0
    );
  }, [data?.messages, readMessages]);
  const { activeTab } = useTab();
  if (isLoading || !data) return null;
  return (
    <div className="pt-6">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2 gap-2" aria-label="Tabs" role="tablist">
          <Link
            href="/messages/me"
            className={twMerge(
              "w-full justify-center py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active",
              activeTab === "me"
                ? "font-semibold border-blue-600 text-blue-600"
                : "",
            )}
            role="tab"
          >
            自分のメッセージ
          </Link>
          <Link
            href="/messages/someone"
            className={twMerge(
              "w-full justify-center py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active",
              activeTab === "someone"
                ? "font-semibold border-blue-600 text-blue-600"
                : "",
            )}
            role="tab"
          >
            誰かのメッセージ
            {someoneMessageCount > 0 && (
              <span
                className={twMerge(
                  "ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                  activeTab === "someone"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white"
                    : "",
                )}
              >
                {someoneMessageCount >= 9 ? "9+" : someoneMessageCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
      <div className="p-6" role="tabpanel">
        {children}
      </div>
    </div>
  );
};
