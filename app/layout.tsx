import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "آهنگ بازار",
  description: "مرجع دانلود آهنگ های ایران قدیم ",
};

const vazirmatn = localFont({
  src: [
    {
      path: "../fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body
        className={`${vazirmatn.className} flex flex-col h-screen overflow-hidden`}
      >
        <QueryProvider>
          <Header />
          <div className="flex flex-1 pt-[70px]">
            <aside
              className="fixed top-[70px] bottom-0 right-3 overflow-auto z-20
              hidden md:flex"
            >
              <Sidebar />
            </aside>

            <main className="flex-1 overflow-y-auto mr-[19.5rem] h-[calc(100vh-70px)]">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
