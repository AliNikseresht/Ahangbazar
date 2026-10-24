
import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/ahang/provider/AppProvider";

const vazirmatn = localFont({
  src: [
    {
      path: "../fonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-vazirmatn",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

const siteUrl = "https://ahangbazar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "آهنگ بازار | دانلود آهنگ جدید ایرانی",
    template: "%s | آهنگ بازار",
  },
  description:
    "دانلود آهنگ جدید ایرانی، موزیک‌های پرطرفدار و آهنگ‌های قدیمی با کیفیت بالا در آهنگ بازار؛ همراه با جدیدترین آثار خوانندگان ایرانی.",
  keywords: [
    "آهنگ بازار",
    "دانلود آهنگ",
    "دانلود آهنگ جدید",
    "آهنگ ایرانی",
    "موزیک جدید",
    "دانلود موزیک",
  ],
  authors: [{ name: "آهنگ بازار" }],
  creator: "آهنگ بازار",
  applicationName: "آهنگ بازار",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "آهنگ بازار | دانلود آهنگ جدید ایرانی",
    description:
      "جدیدترین آهنگ‌های ایرانی و موزیک‌های پرطرفدار را در آهنگ بازار پیدا کن.",
    url: siteUrl,
    siteName: "آهنگ بازار",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "آهنگ بازار | دانلود آهنگ جدید ایرانی",
    description:
      "جدیدترین آهنگ‌های ایرانی و موزیک‌های پرطرفدار در آهنگ بازار.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "آهنگ بازار",
  alternateName: "AhangBazar",
  url: siteUrl,
  inLanguage: "fa-IR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={vazirmatn.variable}
    >
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T9WXMWV5YR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-T9WXMWV5YR');
          `}
        </Script>

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
