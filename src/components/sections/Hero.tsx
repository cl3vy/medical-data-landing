"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const brand = brandRef.current;
    const rule = ruleRef.current;
    if (!section || !brand || !rule) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        brand,
        { scale: 1.04, opacity: 0.85 },
        {
          scale: 0.92,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        rule,
        { scaleX: 0.2, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-h"
      className="content-wrap pt-[calc(var(--header-h)+var(--space-group))] min-h-[100svh] flex flex-col justify-center pb-[var(--space-block)]"
    >
      <p
        ref={brandRef}
        className="font-extrabold leading-[0.82] tracking-[-0.06em] text-[clamp(3.5rem,10vw,8.5rem)] text-[var(--color-accent)] origin-left will-change-transform"
        aria-hidden
      >
        SIGIL
      </p>
      <div
        ref={ruleRef}
        className="mt-2 h-[3px] w-full bg-[var(--color-text)] origin-left will-change-transform"
        aria-hidden
      />

      <h1
        id="hero-h"
        className="mt-[var(--space-group)] text-[clamp(2.25rem,5.8vw,5.2rem)] leading-[0.98] tracking-[-0.04em] font-extrabold max-w-[18ch]"
      >
        <span className="line-mask">
          <span style={{ animationDelay: "60ms" }}>$300,000 to $3,000,000</span>
        </span>
        <span className="line-mask">
          <span style={{ animationDelay: "140ms" }}>for the data already</span>
        </span>
        <span className="line-mask">
          <span style={{ animationDelay: "220ms" }}>sitting in your systems.</span>
        </span>
      </h1>

      <div
        className="grid gap-x-[clamp(48px,7vw,104px)] gap-y-[var(--space-group)] mt-[var(--space-block)] items-end"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)" }}
      >
        <p
          className="text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.5] max-w-[48ch] text-pretty"
          style={{ animation: "fadeIn 600ms ease 380ms both" }}
        >
          We just paid one company $943,000 for theirs. The AI labs have
          finished the internet. What they need next is how real operators
          actually work, and that only exists inside companies like yours.
          Retail, logistics, legal, insurance, finance, manufacturing,
          healthcare, whatever you run. You already own the data. We get you
          paid for it.
        </p>
        <div
          className="flex flex-col gap-[var(--space-item)]"
          style={{ animation: "fadeIn 600ms ease 460ms both" }}
        >
          <div className="flex flex-wrap gap-2">
            <MagneticButton
              href="#inquire"
              className="btn btn-primary py-3 px-6"
              strength={0.28}
            >
              Find out what your data is worth
            </MagneticButton>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-neutral-700)] leading-[1.8]">
            Free appraisal · No commitment · You approve every deal
          </p>
        </div>
      </div>
    </section>
  );
}
