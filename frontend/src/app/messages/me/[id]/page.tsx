import Link from "next/link";
import { NavigationLayout } from "#/components/NavigationLayout";

type PageProps = {
  params: { id: string };
};

export default function MessagesDetailPage({ params: { id } }: PageProps) {
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
        すべての送信メッセージ
      </Link>
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl py-5 px-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 mt-4 leading-6 text-base font-normal">
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
        では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
      </div>
      <section className="mt-8">
        <p className="text-lg font-bold leading-normal">届いたメッセージ</p>
        <ul className="space-y-2 mt-4">
          <li>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 dark:bg-slate-900 dark:border-gray-700">
              誰かからのコメントが出てくるよ
            </div>
            <p className="mt-1 text-xs font-medium leading-4 text-gray-500">
              2024/02/11 18:00
            </p>
          </li>
          <li>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 dark:bg-slate-900 dark:border-gray-700">
              誰かからのコメントが出てくるよ。長い場合は改行されて表示されるよね。長い場合はこうなる
            </div>
            <p className="mt-1 text-xs font-medium leading-4 text-gray-500">
              2024/02/11 17:00
            </p>
          </li>
          <li>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 dark:bg-slate-900 dark:border-gray-700">
              誰かからのコメントが出てくるよ
            </div>
            <p className="mt-1 text-xs font-medium leading-4 text-gray-500">
              2024/02/11 16:00
            </p>
          </li>
        </ul>
      </section>
    </NavigationLayout>
  );
}
