"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  { dt: "Free appraisal", dd: "One form. No cost." },
  { dt: "Fast offer", dd: "A real number in about two weeks." },
  { dt: "You get paid", dd: "Cash upfront, royalties, or both." },
];

export function Proof() {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 18%",
        end: "+=30%",
        pin: true,
        pinSpacing: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Proof" className="content-wrap section-pad">
      <div
        ref={pinRef}
        className="border-y-2 border-[var(--color-divider)] grid gap-0"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)" }}
      >
        <div
          data-stack-border
          className="py-[var(--space-block)] pr-[var(--gutter)] border-r-2 border-[var(--color-divider)]"
        >
          <CountUp
            value={943000}
            prefix="$"
            className="font-extrabold text-[clamp(3.4rem,9vw,7rem)] leading-[0.88] tracking-[-0.045em] text-[var(--color-accent)]"
          />
          <p className="mt-[var(--space-group)] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.45] max-w-[26ch]">
            paid to one company for a single dataset.
          </p>
        </div>
        <dl className="flex flex-col justify-between py-[var(--space-block)] pl-0 md:pl-[var(--gutter)]">
          {FACTS.map((fact, i) => (
            <Reveal
              key={fact.dt}
              as="div"
              delay={i * 0.08}
              className={[
                i > 0 ? "pt-[var(--space-group)]" : "",
                i < FACTS.length - 1
                  ? "pb-[var(--space-group)] border-b border-[var(--color-divider)]"
                  : "",
              ].join(" ")}
            >
              <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]">
                {fact.dt}
              </dt>
              <dd className="mt-[var(--space-item)] text-[17px] leading-[1.4]">
                {fact.dd}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
