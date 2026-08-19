import { ScatterGrid } from "@/components/illustrations";

export function Clean() {
  return (
    <section className="bg-[var(--color-card)]" aria-labelledby="clean-h">
      <div
        className="wrap grid split py-[110px]"
        style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
      >
        <div>
          <h2
            id="clean-h"
            className="font-serif font-normal text-[clamp(1.85rem,4.4vw,2.625rem)] leading-[1.12] tracking-[-0.01em] mb-6 text-pretty"
          >
            We turn your messy archives into a clean, sellable asset. You keep
            full control
          </h2>
          <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-5 text-pretty">
            Most companies run on years of records scattered across tools,
            inboxes, and spreadsheets. Our team maps your workflows, structures
            the data, and cleans it all up, so for the first time your business
            runs on one organized, usable system.
          </p>
          <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-9 text-pretty">
            That clean foundation is what makes everything else possible. From
            there you can license your data for real money, or put it to work
            inside your company with powerful AI automations, analytics, and
            more. Either way, the organized system is yours to keep.
          </p>
          <a href="#form" className="btn-ink px-7 py-[15px] text-[15px]">
            Find out what your data is worth
          </a>
        </div>
        <div className="flex justify-center">
          <ScatterGrid className="max-w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
