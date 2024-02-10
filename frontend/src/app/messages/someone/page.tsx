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
      <button className="absolute right-6 bottom-8" type="button">
        <span className="m-1 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full bg-blue-600 text-white dark:bg-blue-500">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="flex-shrink-0 w-5 h-5"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.8333L15.8333 10L18.3333 12.5L12.5 18.3333L10 15.8333Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 10.8333L13.75 4.58332L1.66669 1.66666L4.58335 13.75L10.8334 15L15 10.8333Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.66669 1.66666L7.98835 7.98832"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.16667 10.8333C10.0871 10.8333 10.8333 10.0871 10.8333 9.16667C10.8333 8.24619 10.0871 7.5 9.16667 7.5C8.24619 7.5 7.5 8.24619 7.5 9.16667C7.5 10.0871 8.24619 10.8333 9.16667 10.8333Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </NavigationLayout>
  );
}
