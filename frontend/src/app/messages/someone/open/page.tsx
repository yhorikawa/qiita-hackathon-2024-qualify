import { twMerge } from "tailwind-merge";
import { NavsTabLayout } from "#/app/_ui-components/NavsTabLayout";
import { MessageListNav } from "../../_dependencies/MessageListNav";

export default function MessagesSomeoneOpenPage() {
  return (
    <NavsTabLayout Navigation={<MessageListNav someoneMessageCount={0} />}>
      <span className="w-[20rem] h-[20rem] flex justify-center items-center text-gray-500 font-bold bg-gray-200 dark:bg-gray-700 mx-auto">
        Placeholder
      </span>

      <div className="mt-10">
        <p className="w-full inline-flex justify-center">
          5件の新しいボトルが流れ着いています
        </p>
        <button
          type="button"
          className={twMerge(
            "p-4 sm:p-5 flex w-full items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
            "mt-4",
          )}
        >
          ボトルメールを開ける
        </button>
      </div>
    </NavsTabLayout>
  );
}
