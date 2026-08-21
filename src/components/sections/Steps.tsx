import { StepAppraise, StepClean, StepPay } from "@/components/illustrations";

const STEPS = [
  {
    n: "Step 1",
    title: "We appraise your data",
    body: "Tell us what you have and we reply with a real number in about a week.",
    Icon: StepAppraise,
  },
  {
    n: "Step 2",
    title: "We clean it up",
    body: "We structure your records, and turn raw files into a licensed dataset you own.",
    Icon: StepClean,
  },
  {
    n: "Step 3",
    title: "We pay you and make your business faster",
    body: "You get cash and royalties, plus AI applications built from your data, making your team more efficient.",
    Icon: StepPay,
  },
];

export function Steps() {
  return (
    <section className="wrap pt-[110px] pb-[90px]" aria-labelledby="steps-h">
      <h2
        id="steps-h"
        className="font-serif font-normal text-[clamp(1.9rem,4.6vw,2.75rem)] leading-[1.1] tracking-[-0.01em] mx-auto mb-[18px] max-w-[22ch] text-center text-pretty"
      >
        From one form to your first payment in three steps
      </h2>
      <p className="text-center text-[17px] text-[var(--color-muted)] mx-auto mb-16 max-w-[58ch] leading-[1.65]">
        We appraise your manufacturing data, clean it up, and then pay you for
        it while making your plant faster with AI built from it. Here is how it
        works.
      </p>
      <div
        className="grid gap-7"
        data-stack
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
      >
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="bg-[var(--color-card)] rounded-[var(--radius-card)] px-8 py-9"
          >
            <step.Icon className="mb-[26px]" />
            <p className="mb-2.5 text-[13px] tracking-[0.12em] uppercase text-[var(--color-accent)] font-semibold">
              {step.n}
            </p>
            <h3 className="font-serif font-medium text-[24px] mb-3">{step.title}</h3>
            <p className="text-[15px] leading-[1.65] text-[var(--color-muted)]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
