import Link from "next/link";
import { NavigationLayout } from "#/components/NavigationLayout";

export default function MessagesSomeoneListPage() {
  return (
    <NavigationLayout>
      <ul className="flex flex-col">
        {[...Array(10)].fill("届いたメッセージ").map((message, i) => (
          <li
            key={`list-item-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              i
            }`}
            className="inline-flex w-full items-center gap-x-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
          >
            <Link
              href={`/messages/someone/${i}`}
              className="w-full inline-block py-3 px-4"
            >
              {message}
            </Link>
          </li>
        ))}
      </ul>
    </NavigationLayout>
  );
}
