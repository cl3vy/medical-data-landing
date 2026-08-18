"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "You draw the line",
    body: "You decide what is included and what never leaves the premises. Identifiers are stripped before anything is licensed, and we do not want them in the first place.",
  },
  {
    title: "You pick the buyer",
    body: "Approve each licensee and each permitted use in writing. Say no to a competitor, a category, or a whole industry. Revoke access later if you change your mind.",
  },
  {
    title: "You choose the money",
    body: "Cash upfront, ongoing royalties, or both. Terms are yours to change at renewal. It is your data; we make sure you get paid like it.",
  },
];

export function Control() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(section, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { clipPath: "inset(12% 0% 12% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
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
      id="control"
      aria-labelledby="control-h"
      className="mt-[var(--space-section)] bg-[var(--color-neutral-900)] text-[var(--color-neutral-100)] py-[var(--space-band)] ink-grain will-change-[clip-path]"
    >
      <div className="content-wrap">
        <div className="border-t-2 border-[var(--color-neutral-700)] pt-[var(--space-item)]">
          <p className="kicker text-[var(--color-neutral-400)]">04 — Control</p>
        </div>
        <Reveal
          as="h2"
          id="control-h"
          className="mt-[var(--space-block)] text-[clamp(2.1rem,5.6vw,4.2rem)] leading-[0.98] tracking-[-0.035em] font-extrabold max-w-[20ch]"
        >
          Nothing leaves your building without your signature.
        </Reveal>
        <div
          className="grid gap-y-[var(--space-block)] gap-x-[clamp(32px,5vw,72px)] mt-[var(--space-block)]"
          data-stack
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.1}
              className="border-t-2 border-[var(--color-neutral-700)] pt-[var(--space-item)]"
            >
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent-400)]">
                {pillar.title}
              </p>
              <p className="mt-[var(--space-group)] text-[15px] leading-relaxed text-[var(--color-neutral-300)]">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
