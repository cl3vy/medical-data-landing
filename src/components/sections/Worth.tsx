"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { computeEstimate } from "@/lib/estimate";
import { EXAMPLES, VERTICALS } from "@/lib/examples";

export function Worth() {
  const [records, setRecords] = useState(120);
  const [years, setYears] = useState(10);
  const [depth, setDepth] = useState(3);
  const [vertical, setVertical] = useState<(typeof VERTICALS)[number]["id"]>(
    "retail",
  );
  const [ex, setEx] = useState(0);

  const verticalMult =
    VERTICALS.find((v) => v.id === vertical)?.mult ?? 1;

  const estimate = useMemo(
    () => computeEstimate(records, years, depth, verticalMult),
    [records, years, depth, verticalMult],
  );
  const example = EXAMPLES[ex];

  return (
    <section id="worth" aria-labelledby="worth-h" className="content-wrap section-pad">
      <Reveal
        as="h2"
        id="worth-h"
        className="border-t-2 border-[var(--color-divider)] pt-[var(--space-block)] text-[clamp(2rem,4.8vw,3.6rem)] leading-[1] tracking-[-0.03em] font-extrabold max-w-[22ch]"
      >
        Tell us your vertical. See the number.
      </Reveal>
      <p className="mt-[var(--space-group)] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] max-w-[54ch]">
        Every industry prices differently. A year of legal case files is not
        worth the same as a year of warehouse scans or a year of policy claims.
        Move the inputs, pick your sector, and the estimate follows.
      </p>

      <div
        className="grid gap-0 mt-[var(--space-block)] border-t-2 border-[var(--color-divider)]"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)" }}
      >
        <div
          data-stack-border
          className="py-[var(--space-block)] pr-[var(--gutter)] border-r-2 border-[var(--color-divider)] flex flex-col gap-[var(--space-block)]"
        >
          <RangeSlider
            id="s-records"
            label="Records on file"
            valueLabel={estimate.recordsLabel}
            min={5}
            max={500}
            step={5}
            value={records}
            onChange={setRecords}
          />
          <RangeSlider
            id="s-years"
            label="Years of history"
            valueLabel={estimate.yearsLabel}
            min={1}
            max={20}
            step={1}
            value={years}
            onChange={setYears}
          />
          <RangeSlider
            id="s-depth"
            label="Data depth"
            valueLabel={estimate.depthLabel}
            min={1}
            max={5}
            step={1}
            value={depth}
            onChange={setDepth}
          />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)] mb-[var(--space-item)]">
              Vertical
            </p>
            <div
              className="tile-grid"
              role="tablist"
              aria-label="Industry vertical"
            >
              {VERTICALS.map((item) => (
                <label key={item.id} className="tile-opt">
                  <input
                    type="radio"
                    name="vertical"
                    checked={vertical === item.id}
                    onChange={() => setVertical(item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="py-[var(--space-block)] pl-0 md:pl-[var(--gutter)] flex flex-col">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]">
            Indicative licensing value, year one
          </p>
          <p
            aria-live="polite"
            className="mt-[var(--space-item)] font-extrabold text-[clamp(2.1rem,5.4vw,3.6rem)] leading-[0.95] tracking-[-0.04em] text-[var(--color-accent)]"
          >
            {estimate.estimate}
          </p>
          <div className="mt-[var(--space-group)] h-3.5 border border-[var(--color-divider)]">
            <div
              className="h-full bg-[var(--color-accent)] transition-[width] duration-300 ease-out"
              style={{ width: `${estimate.estimatePct}%` }}
            />
          </div>
          <p className="mt-[var(--space-item)] text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--color-neutral-700)]">
            Against a $4M ceiling seen in this market
          </p>
          <ul className="mt-[var(--space-block)] border-t border-[var(--color-divider)]">
            {[
              ["Rows we would clean", estimate.rowsLabel],
              ["Likely deal shape", estimate.dealShape],
              ["Buyers we would run it past", estimate.buyers],
            ].map(([label, val]) => (
              <li
                key={label}
                className="flex justify-between gap-4 border-b border-[var(--color-divider)] py-[var(--space-item)] text-[15px]"
              >
                <span className="text-[var(--color-neutral-700)]">{label}</span>
                <span className="font-extrabold">{val}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[var(--space-group)] text-[12px] leading-relaxed text-[var(--color-neutral-700)]">
            Estimate only, not an offer. The multipliers here are placeholders.
            The appraisal call replaces them with real buyer demand for your
            sector.
          </p>
        </div>
      </div>

      <div className="mt-[var(--space-section)] border-t-2 border-[var(--color-divider)] pt-[var(--space-item)]">
        <div className="flex flex-wrap gap-4 items-baseline justify-between mb-[var(--space-block)]">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]">
            Examples — what a licensed asset looks like
          </p>
          <div className="seg" role="tablist" aria-label="Example datasets">
            {EXAMPLES.map((item, i) => (
              <label key={item.id} className="seg-opt">
                <input
                  type="radio"
                  name="ex"
                  checked={ex === i}
                  onChange={() => setEx(i)}
                />
                {item.tab}
              </label>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-x-[clamp(48px,7vw,104px)] gap-y-[var(--space-group)] items-start"
            data-stack
            style={{ gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }}
          >
            <ExampleCopy example={example} />
            <ExampleTable example={example} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ExampleCopy({ example }: { example: (typeof EXAMPLES)[number] }) {
  return (
    <div>
      <h3 className="text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.1] tracking-[-0.02em] font-extrabold">
        {example.title}
      </h3>
      <p className="mt-[var(--space-item)] text-[15px] leading-relaxed text-[var(--color-neutral-800)] max-w-[42ch]">
        {example.body}
      </p>
      <p className="mt-[var(--space-group)]">
        <span className="tag tag-outline">{example.tag}</span>
      </p>
    </div>
  );
}

function ExampleTable({ example }: { example: (typeof EXAMPLES)[number] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Field</th>
          <th>Example value, anonymized</th>
        </tr>
      </thead>
      <tbody>
        {example.rows.map((row) => (
          <tr key={row.k}>
            <td className="text-[var(--color-neutral-700)]">{row.k}</td>
            <td>{row.v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
