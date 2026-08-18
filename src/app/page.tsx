import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Value } from "@/components/sections/Value";
import { Process } from "@/components/sections/Process";
import { Control } from "@/components/sections/Control";
import { Closing } from "@/components/sections/Closing";
import { Inquire } from "@/components/sections/Inquire";
// import { Book } from "@/components/sections/Book";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="top">
        <Hero />
        <Proof />
        <Value />
        <Process />
        <Control />
        <Closing />
        <Inquire />
        {/* Calendar / booking — restore <Book /> to show Cal.com again.
            Link: https://cal.com/team/shfa-ai/technical-test */}
        {/* <Book /> */}
      </main>
      <Footer />
    </>
  );
}
