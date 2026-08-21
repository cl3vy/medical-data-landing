import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
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
      <body className={`${instrument.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
