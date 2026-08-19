import { FormDoc } from "@/components/illustrations";

export function Appraisal() {
  return (
    <section
      className="wrap grid split pt-[60px] pb-[110px]"
      style={{ gridTemplateColumns: "0.85fr 1.15fr" }}
      aria-labelledby="appraisal-h"
    >
      <div className="flex justify-center">
        <FormDoc className="max-w-full h-auto" />
      </div>
      <div>
        <h2
          id="appraisal-h"
          className="font-serif font-normal text-[clamp(1.85rem,4.4vw,2.625rem)] leading-[1.12] tracking-[-0.01em] mb-6 text-pretty"
        >
          Your appraisal is free, takes ten minutes, and commits you to nothing
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-9 text-pretty">
          All it takes is the form below. Tell us about your business and the
          data you have, and we come back with everything you need to make a
          decision: the automations we can build for your company, how much more
          efficient your teams will become, and how much we will pay you for
          your data. It costs nothing, you never upload a file, and there is no
          obligation.
        </p>
        <a href="/form" className="btn-fill px-7 py-[15px] text-[15px]">
          Find out what your data is worth
        </a>
      </div>
    </section>
  );
}
