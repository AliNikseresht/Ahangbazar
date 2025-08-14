import type { Metadata } from "next";
import Script from "next/script";
import QueryProvider from "@/components/providers/query-provider";
import localFont from "next/font/local";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "آهنگ بازار - دانلود آهنگ جدید",
  description: "مرجع دانلود انواع آهنگ‌های جدید و قدیمی با کیفیت بالا.",
  keywords: "دانلود آهنگ, دانلود آهنگ جدید, آهنگ ایرانی, آهنگ بازار",
  authors: [{ name: "آهنگ بازار" }],
  openGraph: {
    title: "آهنگ بازار",
    description: "دانلود جدیدترین آهنگ‌ها با کیفیت عالی.",
    url: "https://ahangbazar.vercel.app/",
    siteName: "آهنگ بازار",
    locale: "fa_IR",
    type: "website",
  },
  alternates: {
    canonical: "https://ahangbazar.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-T9WXMWV5YR`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T9WXMWV5YR');
  `}
        </Script>
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "آهنگ بازار",
            url: "https://ahangbazar.vercel.app/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://ahangbazar.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
      </head>
      <body
        className={`${vazirmatn.className}`}
      >
        <QueryProvider>
          <main>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
