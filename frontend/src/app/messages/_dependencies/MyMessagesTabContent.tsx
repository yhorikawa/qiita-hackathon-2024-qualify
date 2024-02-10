import Link from "next/link";

export const MyMessagesTabContent = () => (
  <div id="tabs-with-badges-1" role="tabpanel">
    <ul className="flex flex-col">
      {[...Array(10)].fill("誰かから来たメッセージ").map((message, i) => (
        <li
          key={`list-item-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            i
          }`}
          className="inline-flex w-full items-center gap-x-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
        >
          <Link href="#" className="w-full inline-block py-3 px-4">
            {message}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
