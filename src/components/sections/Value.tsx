"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const BUYERS = [
  "Your records and the decisions behind them",
  "Problems, disputes, and how you solved them",
  "How work moves from start to finish",
  "Transactions and what happened after",
  "Anything a new hire would take a year to learn",
];

const METERS = [
  { label: "Public internet text — used up", pct: 100, accent: false },
  { label: "Books and licensed text — mostly used", pct: 84, accent: false },
  { label: "Business records inside companies — barely touched", pct: 3, accent: true },
];

export function Value() {
  const metersRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = metersRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bars = list.querySelectorAll<HTMLElement>("[data-meter]");

    if (reduce) {
      bars.forEach((bar) => {
        bar.style.width = `${bar.dataset.meter}%`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${bar.dataset.meter}%`,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.6,
            },
            delay: i * 0.05,
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="value" aria-labelledby="value-h" className="content-wrap section-pad">
      <div
        className="grid gap-x-[clamp(48px,7vw,104px)] gap-y-[var(--space-block)] items-start border-t-2 border-[var(--color-divider)] pt-[var(--space-block)]"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)" }}
      >
        <div>
          <Reveal as="h2" id="value-h" className="text-[clamp(2rem,4.8vw,3.6rem)] leading-[1] tracking-[-0.03em] font-extrabold">
            The free data is gone.
            <br />
            Yours is what&apos;s left.
          </Reveal>
          <Reveal
            as="p"
            delay={0.08}
            className="mt-[var(--space-group)] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] max-w-[54ch] text-pretty"
          >
            AI companies have used up the free data on the internet. Now they
            need real business records that show how work actually gets done.
            That only exists inside companies like yours. They will pay a lot
            for it.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[var(--space-block)] text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]"
          >
            What they want
          </Reveal>
          <ul className="mt-[var(--space-item)]">
            {BUYERS.map((item, i) => (
              <Reveal
                key={item}
                as="li"
                delay={0.04 * i}
                className={`py-[18px] text-[16px] leading-[1.45] border-t border-[var(--color-divider)] ${
                  i === BUYERS.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 items-baseline">
                  <span className="text-[11px] font-semibold tracking-[0.1em] text-[var(--color-accent-700)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="min-w-0 self-start md:sticky md:top-[calc(var(--header-h)+48px)]">
          <Reveal
            as="figure"
            className="border-t-2 border-[var(--color-divider)] pt-[var(--space-item)]"
          >
            <figcaption className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)] mb-[var(--space-group)]">
              Fig. 01 — How much training data is left
            </figcaption>
            <ul ref={metersRef} className="flex flex-col gap-10">
              {METERS.map((m) => (
                <li key={m.label}>
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="text-[13px] font-semibold">{m.label}</span>
                    <span
                      className={`font-extrabold text-[15px] ${
                        m.accent ? "text-[var(--color-accent)]" : ""
                      }`}
                    >
                      {m.pct}%
                    </span>
                  </div>
                  <div className="mt-[var(--space-item)] h-3.5 border border-[var(--color-divider)] bg-[var(--color-bg)]">
                    <div
                      data-meter={m.pct}
                      className="h-full w-0"
                      style={{
                        background: m.accent
                          ? "var(--color-accent)"
                          : "var(--color-neutral-400)",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-[var(--space-group)] pt-[var(--space-item)] border-t border-[var(--color-divider)] text-[12px] leading-relaxed text-[var(--color-neutral-700)]">
              The part nobody can reach is the part you are sitting on.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
