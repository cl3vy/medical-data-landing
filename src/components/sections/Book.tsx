"use client";

import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CAL_EMBED_URL, CAL_URL } from "@/lib/examples";

export function Book() {
  return (
    <section id="book" aria-labelledby="book-h" className="content-wrap section-pad">
      <div className="border-t-2 border-[var(--color-divider)] pt-[var(--space-item)]">
        <p className="kicker text-[var(--color-neutral-700)]">05 — Book the appraisal</p>
      </div>
      <div
        className="grid gap-x-[clamp(48px,7vw,104px)] gap-y-[var(--space-block)] mt-[var(--space-block)] items-start"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)" }}
      >
        <Reveal>
          <h2
            id="book-h"
            className="text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.03em] font-extrabold"
          >
            Pick a time.
          </h2>
          <p className="mt-[var(--space-group)] text-[15px] leading-relaxed max-w-[38ch]">
            Thirty minutes. You will know what your data is worth by the end of
            it.
          </p>
          <p className="mt-[var(--space-group)] text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--color-neutral-700)] leading-[1.9]">
            One call · No obligation · You set the terms
          </p>
          <MagneticButton
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-[var(--space-item)] py-3 px-6 inline-flex"
            strength={0.25}
          >
            Open the booking page
          </MagneticButton>
          <p className="mt-[var(--space-block)] text-[12px] leading-relaxed text-[var(--color-neutral-700)] max-w-[40ch]">
            Please do not include patient information, medical records, or
            confidential datasets in your booking notes.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="border-2 border-[var(--color-divider)] bg-[var(--color-surface)] min-h-[460px] overflow-hidden"
        >
          <iframe
            src={CAL_EMBED_URL}
            title="Book a free data appraisal with Shfa"
            loading="lazy"
            className="w-full h-[560px] border-0 block"
          />
        </Reveal>
      </div>
    </section>
  );
}
