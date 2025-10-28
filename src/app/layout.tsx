import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import ClientLayout from "./ClientLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "DemandTech | Accelerate Your Business Growth",
    template: "%s | DemandTech"
  },
  description: "Transform your demand generation with cutting-edge technology and proven strategies. Drive qualified leads, increase conversions, and scale your business.",
  keywords: ["demand generation", "marketing automation", "lead generation", "B2B marketing", "growth marketing"],
  authors: [{ name: "DemandTech" }],
  creator: "DemandTech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://demand-tech.com",
    siteName: "DemandTech",
    title: "DemandTech | Accelerate Your Business Growth",
    description: "Transform your demand generation with cutting-edge technology and proven strategies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DemandTech | Accelerate Your Business Growth",
    description: "Transform your demand generation with cutting-edge technology and proven strategies.",
    creator: "@demandtech",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Favicon and PWA metadata
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=neue-montreal@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-16EX5QDP29" />
        <Script id="gtag-init">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-16EX5QDP29');
          `}
        </Script>
      </head>
      <body className="font-inter antialiased">
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
