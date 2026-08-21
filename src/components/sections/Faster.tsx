import { Growth } from "@/components/illustrations";

export function Faster() {
  return (
    <section
      className="wrap grid split py-[110px]"
      style={{ gridTemplateColumns: "0.9fr 1.1fr" }}
      aria-labelledby="faster-h"
    >
      <div className="flex justify-center">
        <Growth className="max-w-full h-auto" />
      </div>
      <div>
        <p className="mb-[18px] text-[13px] tracking-[0.14em] uppercase text-[var(--color-accent)] font-semibold">
          Step three in detail
        </p>
        <h2
          id="faster-h"
          className="font-serif font-normal text-[clamp(1.85rem,4.4vw,2.625rem)] leading-[1.12] tracking-[-0.01em] mb-6 text-pretty"
        >
          You get paid up to millions. Your team gets AI that works for them,
          not instead of them
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-5 text-pretty">
          The money comes as cash upfront, royalties every year, or both. First
          payments have landed within 34 days of appraisal.
        </p>
        <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-9 text-pretty">
          Then we give you back what your data built: AI trained on how your
          plant already works, installed for your team. It takes over the
          repetitive work your people hate, so they spend their day on the work
          that needs them. Same team, same jobs, more done every day. And we
          keep it running on the best AI available, so your team only gets
          faster over time.
        </p>
        <a href="/form" className="btn-fill px-7 py-[15px] text-[15px]">
          Find out what your data is worth
        </a>
      </div>
    </section>
  );
}
