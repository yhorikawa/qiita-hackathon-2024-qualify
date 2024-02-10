import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrelineScript } from "./_dependencies/PrelineScript";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "ボトルメール(仮)",
  description: "ボトルメール(仮)は、ボトルメールを送受信できるサービスです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="bg-slate-200">
          <div className="mx-auto max-w-md bg-slate-100 min-h-svh">
            {children}
          </div>
        </main>
        <PrelineScript />
      </body>
    </html>
  );
}
