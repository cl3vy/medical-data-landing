import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const STEPS = [
  {
    n: "01",
    title: "Free appraisal",
    body: "We look at what you have and tell you what it is worth. One form. No cost, no paperwork, no obligation. Keep the number and walk away if you want.",
    example:
      "A shipping company brought eleven years of records. Appraised at $600k to $1.1M.",
  },
  {
    n: "02",
    title: "You set the terms",
    body: "You choose what is included, who can buy it, and how you get paid. We handle the cleaning, the structuring, and the buyers. Nothing moves until you sign.",
    example:
      "They left out sensitive files, blocked two competitors, and took half upfront and half in royalties.",
  },
  {
    n: "03",
    title: "You get paid",
    body: "The money starts arriving and keeps arriving. You end up owning a clean dataset you never had before, plus a licence you can renew or cancel.",
    example:
      "The first payment landed 34 days after the appraisal. Royalties renew every year.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="content-wrap section-pad">
      <Reveal
        as="h2"
        id="process-h"
        className="text-[clamp(2rem,4.8vw,3.6rem)] leading-[1] tracking-[-0.03em] font-extrabold max-w-[16ch]"
      >
        Three steps. One form to start.
      </Reveal>

      <ol
        className="mt-[var(--space-block)] grid gap-x-[clamp(32px,5vw,72px)] gap-y-[var(--space-block)]"
        data-stack
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
      >
        {STEPS.map((step, i) => (
          <Reveal key={step.n} as="li" delay={i * 0.08}>
            <p
              className="font-extrabold text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.06em] text-[var(--color-accent)]"
              aria-hidden
            >
              {step.n}
            </p>
            <h3 className="mt-[var(--space-group)] text-[clamp(1.25rem,2vw,1.55rem)] leading-[1.15] tracking-[-0.02em] font-extrabold">
              {step.title}
            </h3>
            <p className="mt-[var(--space-item)] text-[15px] leading-relaxed text-[var(--color-text)]">
              {step.body}
            </p>
            <p className="mt-[var(--space-group)] text-[13px] leading-relaxed text-[var(--color-neutral-700)]">
              <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--color-neutral-600)] mb-1">
                Example
              </span>
              {step.example}
            </p>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.2} className="mt-[var(--space-block)]">
        <MagneticButton href="#inquire" className="btn btn-primary py-3 px-6" strength={0.25}>
          Find out what your data is worth
        </MagneticButton>
      </Reveal>
    </section>
  );
}
