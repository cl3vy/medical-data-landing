import { HeroValue } from "@/components/illustrations";

export function Hero() {
  return (
    <section
      className="wrap grid split pb-[110px] pt-[72px]"
      style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
    >
      <div>
        <h1 className="font-serif font-normal text-[clamp(2.05rem,5.6vw,3.625rem)] leading-[1.06] tracking-[-0.015em] text-pretty mb-7">
          We pay your manufacturing company up to{" "}
          <em className="italic text-[var(--color-accent)]">$3,000,000</em>{" "}
          for records you already own.
        </h1>
        <p className="text-[18px] leading-[1.65] text-[var(--color-muted)] mb-9 max-w-[52ch] text-pretty">
          AI labs need data that shows how real manufacturing work gets done,
          and it only exists inside plants like yours. We appraise it for free,
          clean it, and pay you in cash and royalties. Then we give you AI built
          from your own data that makes your team faster.
        </p>
        <a href="/form" className="btn-fill px-[30px] py-4 text-[16px]">
          Find out what your data is worth
        </a>
        <p className="mt-[22px] text-[14px] text-[var(--color-faint)]">
          Free appraisal&ensp;·&ensp;No commitment&ensp;·&ensp;You approve every
          deal
        </p>
      </div>
      <div className="flex justify-center">
        <HeroValue className="max-w-full h-auto" />
      </div>
    </section>
  );
}
