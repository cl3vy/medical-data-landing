import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { CalEmbed } from "@/components/analytics/CalEmbed";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Find out what your manufacturing data is worth",
  description:
    "AI labs need data that shows how real manufacturing work gets done, and it only exists inside plants like yours. We appraise it for free, clean it, and pay you in cash and royalties.",
  verification: {
    other: {
      "facebook-domain-verification": "e5kiqs911hovs3azy2cl9rg470wyoh",
    },
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
      className={`${instrument.variable} ${newsreader.variable} h-full`}
    >
      <head>
        <MetaPixel />
      </head>
      <body className={`${instrument.className} min-h-full antialiased`}>
        {children}
        <CalEmbed />
      </body>
    </html>
  );
}
