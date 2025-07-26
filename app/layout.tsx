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
        className={`${vazirmatn.className} h-screen grid grid-rows-[55px_1fr] grid-cols-1 lg:grid-cols-[265px_1fr]`}
      >
        <QueryProvider>
          <Header />
          <Sidebar />
          <main className="row-start-2 col-span-full lg:col-start-2 overflow-y-auto p-4">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
