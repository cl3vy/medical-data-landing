import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Free appraisal",
    body: "We look at what you have and tell you what it is worth. Takes one call. No cost, no paperwork, no obligation to do anything with the number.",
    example:
      "A logistics operator brought eleven years of dispatch and delivery records. Appraised in one call, $600k–$1.1M.",
  },
  {
    n: "02",
    title: "You set the terms",
    body: "You choose what is included, who is allowed to license it, and how the money arrives. We handle the cleaning, the structuring, and the buyers. Nothing moves until you sign.",
    example:
      "They excluded raw documents, barred two competitors, took half upfront and half as royalty.",
  },
  {
    n: "03",
    title: "You get paid",
    body: "Checks start arriving, and they keep arriving. You walk away owning a clean dataset you never had before, plus a licence you can renegotiate or end.",
    example:
      "First payment cleared 34 days after the appraisal call. Royalties renew annually.",
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
        Three steps. One call to start.
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
    </section>
  );
}
