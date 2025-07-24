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
      weight: "400",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body className={`${vazirmatn.className}`}>
        <Header />
        <QueryProvider>
          <main className="p-3.5 flex gap-3">
            <Sidebar />
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
