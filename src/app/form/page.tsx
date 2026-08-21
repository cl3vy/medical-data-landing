import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Inquire } from "@/components/sections/Inquire";

export const metadata: Metadata = {
  title: "Get your appraisal — Sigil",
  description:
    "Tell us about your manufacturing data. We reply with a number. Free, no files, no obligation.",
};

export default function FormPage() {
  return (
    <>
      <Header />
      <main>
        <Inquire />
      </main>
    </>
  );
}
