import { Orbit } from "@/components/illustrations";

export function SocialProof() {
  return (
    <section className="bg-[var(--color-dark)] text-[var(--color-bg)]" aria-labelledby="proof-h">
      <div
        className="wrap grid split py-24"
        style={{ gridTemplateColumns: "0.9fr 1.1fr" }}
      >
        <div className="flex justify-center">
          <Orbit className="max-w-full h-auto" />
        </div>
        <div>
          <p className="mb-[18px] text-[13px] tracking-[0.14em] uppercase text-[var(--color-stone)] font-semibold">
            Social proof
          </p>
          <h2
            id="proof-h"
            className="font-serif font-normal text-[clamp(1.85rem,4.4vw,2.625rem)] leading-[1.12] tracking-[-0.01em] mb-6 text-pretty"
          >
            OpenAI and the biggest names in AI buy through us.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[var(--color-stone)] mb-10 text-pretty">
            We work with OpenAI, Anthropic, and micro1. When your manufacturing
            data is ready, it goes in front of the buyers with the deepest
            pockets in the industry, and you get paid what it is actually worth.
            Working with the frontier of AI also means you get the deepest AI
            automations and analytics available, built to make your plant more
            efficient.
          </p>
          <p className="flex flex-wrap gap-9 items-center font-serif text-[22px] text-[var(--color-bg)]">
            <span>OpenAI</span>
            <span className="text-[#57514A]" aria-hidden>
              ·
            </span>
            <span>Anthropic</span>
            <span className="text-[#57514A]" aria-hidden>
              ·
            </span>
            <span>micro1</span>
          </p>
        </div>
      </div>
    </section>
  );
}
