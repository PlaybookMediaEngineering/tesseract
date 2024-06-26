// import { SystemBanner } from "@/components/system-banner";
import "@/styles/globals.css";
import { Provider as Analytics } from "@midday/events/client";
import { cn } from "@midday/ui/cn";
import "@midday/ui/globals.css";
import { Toaster } from "@midday/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.solomon-ai.app"),
  title: "Solomon AI | Proactive Stress Testing for Your Practice",
  description:
    "Solomon AI equips your practice with advanced tools designed to conduct thorough financial stress tests.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export const preferredRegion = ["fra1", "sfo1"];

export default function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "whitespace-pre-line overscroll-none"
        )}
      >
        {/* <SystemBanner /> */}
        {children}
        <SpeedInsights />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
