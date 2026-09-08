import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Intake } from "@/components/sections/Intake";

export const metadata: Metadata = {
  title: "Manufacturing data intake — Sigil",
  description:
    "Tell us about your manufacturing data. We reply with a number. Free, no files, no obligation.",
};

export default function IntakePage() {
  return (
    <>
      <Header />
      <main>
        <Intake />
      </main>
    </>
  );
}
