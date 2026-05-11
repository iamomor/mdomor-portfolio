import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import StoreProvider from "./store/provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://iamomor.com"),
  title: {
    default: "Muhammad Omor Faruk (iamomor) | Senior Software Engineer",
    template: "%s | Muhammad Omor Faruk",
  },
  description:
    "Official portfolio of Muhammad Omor Faruk (iamomor) — Senior Software Engineer specializing in Angular, Next.js, Node.js, and scalable full-stack development.",
  keywords: [
    "mdomorfaruk",
    "iamomor",
    "Muhammad Omor Faruk",
    "Senior Software Engineer",
    "Angular developer",
    "Next.js developer",
    "Portfolio",
    "Dhaka Bangladesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://iamomor.com",
    siteName: "Muhammad Omor Faruk Portfolio",
    title: "Muhammad Omor Faruk (iamomor) | Senior Software Engineer",
    description:
      "Official portfolio of Muhammad Omor Faruk (iamomor) with projects, experience, writing, and contact details.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Omor Faruk (iamomor) | Senior Software Engineer",
    description:
      "Official portfolio of Muhammad Omor Faruk (iamomor), Senior Software Engineer.",
    creator: "@iamomor",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,30..100;1,9..144,300..700,30..100&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Grammarly and similar extensions inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var saved=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',saved||(prefersDark?'dark':'light'));})();`}
        </Script>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
