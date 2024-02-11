"use client";

import EntranceImage from "#/app/assets/entrance-image.png";

export default function GlobalError() {
  return (
    <html lang="ja">
      <body>
        <main className="bg-slate-200">
          <div className="mx-auto max-w-md bg-slate-100 min-h-svh relative flex flex-col justify-center items-center">
            <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full pb-20">
              <header className="mb-auto flex justify-center z-50 w-full py-4">
                <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
                  <a
                    className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
                    href="/signin"
                  >
                    <img
                      src={EntranceImage.src}
                      alt="ボトルメッセージのイラスト"
                      className="mx-auto inline-block max-w-full select-none"
                    />
                  </a>
                </nav>
              </header>

              <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
                  Error
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  システム障害が発生しました
                </p>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
