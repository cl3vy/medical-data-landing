import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Steps } from "@/components/sections/Steps";
import { Appraisal } from "@/components/sections/Appraisal";
import { Clean } from "@/components/sections/Clean";
import { Faster } from "@/components/sections/Faster";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <SocialProof />
        <Steps />
        <Appraisal />
        <Clean />
        <Faster />
        <Closing />
      </main>
    </>
  );
}
