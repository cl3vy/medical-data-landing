"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

export function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { clipPath: "inset(8% 4% 8% 4%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 35%",
            scrub: 0.45,
          },
        },
      );

      gsap.fromTo(
        headline,
        { scale: 0.94, y: 40 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Closing statement"
      className="bg-[var(--color-accent)] text-[var(--color-bg)] py-[var(--space-band)] will-change-[clip-path]"
    >
      <div className="content-wrap">
        <h2
          ref={headlineRef}
          className="text-[clamp(2.3rem,6.6vw,5.2rem)] leading-[0.95] tracking-[-0.04em] font-extrabold max-w-[22ch] origin-left will-change-transform"
        >
          Somebody is going to get paid for your data this year. It should be
          you.
        </h2>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-[var(--space-block)] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.5] max-w-[48ch] text-pretty"
        >
          One call, and you will know the number. Book the appraisal, keep the
          number, walk away if you want to.
        </Reveal>
      </div>
    </section>
  );
}
