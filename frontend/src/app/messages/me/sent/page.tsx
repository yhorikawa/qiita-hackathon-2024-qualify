"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { NavigationLayout } from "#/components/NavigationLayout";
import animationData from "./animation.json";

export default function MessagesSentPage() {
  return (
    <NavigationLayout>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-[168px] h-[168px] rounded-3xl overflow-hidden m-auto mt-14"
      />
      <div className="mt-5">
        <p className="w-full inline-flex justify-center text-lg leading-normal font-semibold text-center">
          メッセージが
          <br />
          誰かのもとへ流れていきました
        </p>
        <Link
          href="/messages/someone"
          className={twMerge(
            "py-3.5 px-4 sm:p-5 flex w-60 m-auto items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
            "mt-16",
          )}
        >
          自分のメッセージ一覧にもどる
        </Link>
      </div>
    </NavigationLayout>
  );
}
