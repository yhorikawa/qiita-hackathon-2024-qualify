import EntranceImage from "#/app/assets/entrance-image.png";

export const runtime = "edge";

export default function NotFound() {
  return (
    <>
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
              404
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              該当のページが見つかりません
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  desc: {
    display: "inline-block",
  },

  h1: {
    display: "inline-block",
    margin: "0 20px 0 0",
    padding: "0 23px 0 0",
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: "top",
    lineHeight: "49px",
  },

  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "49px",
    margin: 0,
  },
} as const;
