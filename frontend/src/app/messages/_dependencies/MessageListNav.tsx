type Props = {
  someoneMessageCount: number;
};

export const MessageListNav = ({ someoneMessageCount = 0 }: Props) => (
  <div className="border-b border-gray-200 dark:border-gray-700">
    <nav className="flex space-x-2 gap-2" aria-label="Tabs" role="tablist">
      <button
        type="button"
        className="w-full justify-center hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active"
        id="tabs-with-badges-item-1"
        data-hs-tab="#tabs-with-badges-1"
        aria-controls="tabs-with-badges-1"
        role="tab"
      >
        自分のメッセージ
      </button>
      <button
        type="button"
        className="w-full justify-center hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500"
        id="tabs-with-badges-item-2"
        data-hs-tab="#tabs-with-badges-2"
        aria-controls="tabs-with-badges-2"
        role="tab"
      >
        誰かのメッセージ
        {someoneMessageCount > 0 && (
          <span className="hs-tab-active:bg-blue-100 hs-tab-active:text-blue-600 dark:hs-tab-active:bg-blue-800 dark:hs-tab-active:text-white ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {someoneMessageCount}
          </span>
        )}
      </button>
    </nav>
  </div>
);
