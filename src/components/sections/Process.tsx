"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    label: "Step one",
    title: "Free appraisal",
    body: "We look at what you have and tell you what it is worth. Takes one call. No cost, no paperwork, no obligation to do anything with the number.",
    example:
      "A logistics operator brought eleven years of dispatch and delivery records. Appraised in one call, $600k–$1.1M.",
  },
  {
    label: "Step two",
    title: "You set the terms",
    body: "You choose what is included, who is allowed to license it, and how the money arrives. We handle the cleaning, the structuring, and the buyers. Nothing moves until you sign.",
    example:
      "They excluded raw documents, barred two competitors, took half upfront and half as royalty.",
  },
  {
    label: "Step three",
    title: "You get paid",
    body: "Checks start arriving, and they keep arriving. You walk away owning a clean dataset you never had before, plus a licence you can renegotiate or end.",
    example:
      "First payment cleared 34 days after the appraisal call. Royalties renew annually.",
  },
];

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const steps = stepsRef.current;
    const progress = progressRef.current;
    if (!pin || !steps || !progress) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    if (reduce || mobile) {
      gsap.set(steps.querySelectorAll("[data-step]"), { opacity: 1, y: 0 });
      gsap.set(progress, { scaleX: 1 });
      return;
    }

    const panels = gsap.utils.toArray<HTMLElement>(
      steps.querySelectorAll("[data-step]"),
    );

    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, y: 40 });
      gsap.set(panels[0], { opacity: 1, y: 0 });
      gsap.set(progress, { scaleX: 1 / panels.length, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * panels.length * 0.95}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1];
        tl.to(
          prev,
          { opacity: 0, y: -28, duration: 0.45, ease: "power2.inOut" },
          i,
        );
        tl.to(
          panel,
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.inOut" },
          i,
        );
        tl.to(
          progress,
          {
            scaleX: (i + 1) / panels.length,
            duration: 0.45,
            ease: "power2.inOut",
          },
          i,
        );
      });
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" aria-labelledby="process-h" className="section-pad">
      <div
        ref={pinRef}
        className="content-wrap min-h-[100svh] flex flex-col justify-center py-[var(--space-block)]"
      >
        <div className="border-t-2 border-[var(--color-divider)] pt-[var(--space-item)]">
          <p className="kicker text-[var(--color-neutral-700)]">03 — How it works</p>
        </div>
        <Reveal
          as="h2"
          id="process-h"
          className="mt-[var(--space-block)] text-[clamp(2rem,4.8vw,3.6rem)] leading-[1] tracking-[-0.03em] font-extrabold"
        >
          Three steps. One call to start.
        </Reveal>

        <div className="mt-[var(--space-block)] h-[3px] bg-[var(--color-divider)] overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-[var(--color-accent)] origin-left"
            style={{ width: "100%", transform: "scaleX(0.333)" }}
          />
        </div>

        {/* Desktop pinned scrub */}
        <div
          ref={stepsRef}
          className="relative mt-[var(--space-block)] hidden md:block min-h-[340px]"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              data-step
              className="absolute inset-0 grid gap-[clamp(24px,4vw,56px)] items-start border-t-2 border-[var(--color-divider)] pt-[var(--space-group)]"
              style={{
                gridTemplateColumns: "120px minmax(0, 1fr) minmax(0, 0.8fr)",
                opacity: i === 0 ? 1 : 0,
              }}
            >
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                {step.label}
              </span>
              <div>
                <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.02em] font-extrabold">
                  {step.title}
                </h3>
                <p className="mt-[var(--space-item)] text-[16px] leading-relaxed max-w-[46ch]">
                  {step.body}
                </p>
              </div>
              <p className="text-[13px] leading-[1.7] text-[var(--color-neutral-700)] border-l border-[var(--color-divider)] pl-4">
                <strong className="font-semibold tracking-[0.1em] uppercase text-[10px] text-[var(--color-neutral-800)]">
                  Example
                </strong>
                <br />
                {step.example}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile stacked */}
        <ol className="mt-[var(--space-block)] md:hidden">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className={`py-[var(--space-group)] border-t-2 border-[var(--color-divider)] ${
                i === STEPS.length - 1 ? "border-b-2" : ""
              }`}
            >
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                {step.label}
              </span>
              <h3 className="mt-[var(--space-item)] text-[1.35rem] leading-[1.15] tracking-[-0.02em] font-extrabold">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed">{step.body}</p>
              <p className="mt-[var(--space-group)] text-[12px] leading-[1.7] text-[var(--color-neutral-700)] border-l border-[var(--color-divider)] pl-4">
                <strong className="font-semibold tracking-[0.1em] uppercase text-[10px] text-[var(--color-neutral-800)]">
                  Example
                </strong>
                <br />
                {step.example}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
