import { Sunburst } from "@/components/illustrations";

export function Closing() {
  return (
    <section className="bg-[var(--color-dark)] text-[var(--color-bg)]">
      <div className="max-w-[840px] mx-auto px-[var(--gutter)] pt-[120px] pb-[100px] text-center">
        <Sunburst className="mx-auto mb-9" />
        <h2 className="font-serif font-normal text-[clamp(1.95rem,4.8vw,2.875rem)] leading-[1.1] tracking-[-0.01em] mb-6 text-pretty">
          Somebody is going to get paid for your manufacturing data this year.
          It should be you
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--color-stone)] mx-auto mb-10 max-w-[56ch] text-pretty">
          Every manufacturer sitting on years of records is sitting on an
          asset. Most will never find out what it is worth. Finding out costs
          you nothing: one form, a real number in two weeks, and every decision
          after that stays yours.
        </p>
        <a href="/form" className="btn-fill px-[34px] py-[17px] text-[16px]">
          Find out what your data is worth
        </a>
        <p className="mt-6 text-[14px] text-[var(--color-faint)]">
          One form&ensp;·&ensp;No obligation&ensp;·&ensp;You set the terms
        </p>
        <footer className="mt-14 pt-7 border-t border-[var(--color-dark-line)] text-[13px] text-[var(--color-faint)]">
          <p>
            Describe your data in the form. Do not send records, customer files,
            or anything confidential.
          </p>
          <p className="mt-3">© 2026 Sigil</p>
        </footer>
      </div>
    </section>
  );
}
