"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import {
  FRESHNESS,
  HOLDER_TYPES,
  INQUIRE_VERTICALS,
  OUTCOME_CAPTURE,
  RIGHTS,
  ROLES,
  TIMELINES,
} from "@/lib/inquire";

type Step = 1 | 2;

type FormState = {
  vertical: string;
  taskType: string;
  volume: string;
  experts: string;
  outcome: string;
  freshness: string;
  rights: string;
  email: string;
  company: string;
  name: string;
  role: string;
  holderType: string;
  timeline: string;
};

const EMPTY: FormState = {
  vertical: "",
  taskType: "",
  volume: "",
  experts: "",
  outcome: "",
  freshness: "",
  rights: "",
  email: "",
  company: "",
  name: "",
  role: "",
  holderType: "",
  timeline: "",
};

function SelectField({
  id,
  label,
  hint,
  options,
  value,
  onChange,
}: {
  id: keyof FormState;
  label: string;
  hint?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <p className="text-[12px] leading-[1.35] text-[var(--color-neutral-700)] min-h-[2.7em]">
          {hint}
        </p>
      ) : null}
      <select
        id={id}
        name={id}
        className="input"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Inquire() {
  const [step, setStep] = useState<Step>(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setSent(true);
  }

  return (
    <section id="inquire" aria-labelledby="inquire-h" className="content-wrap section-pad">
      <div
        className="grid gap-x-[clamp(48px,7vw,104px)] gap-y-[var(--space-block)] items-start border-t-2 border-[var(--color-divider)] pt-[var(--space-block)]"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)" }}
      >
        <Reveal>
          <h2
            id="inquire-h"
            className="text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.03em] font-extrabold max-w-[16ch]"
          >
            Start with the form. We reply with a number.
          </h2>
          <p className="mt-[var(--space-group)] text-[15px] leading-relaxed max-w-[38ch]">
            Two steps. First the shape of the data, then who to send the number
            to. No files, no records, no confidential data.
          </p>
          <p className="mt-[var(--space-group)] text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--color-neutral-700)] leading-[1.9]">
            One form · No obligation · You set the terms
          </p>
          <p className="mt-[var(--space-block)] text-[12px] leading-relaxed text-[var(--color-neutral-700)] max-w-[40ch]">
            Please do not include customer records, confidential files, or raw
            datasets in the form. Describe the data, do not send it.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          {sent ? (
            <div className="border-2 border-[var(--color-divider)] p-[var(--space-block)] min-h-[280px] flex flex-col justify-center">
              <p className="kicker text-[var(--color-accent)]">Received</p>
              <p className="mt-[var(--space-group)] text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] font-extrabold max-w-[18ch]">
                We will reply with a number.
              </p>
              <p className="mt-[var(--space-item)] text-[15px] leading-relaxed max-w-[42ch] text-[var(--color-neutral-700)]">
                Keep the number. Walk away if you want to.
              </p>
            </div>
          ) : (
            <form
              onSubmit={goNext}
              className="border-2 border-[var(--color-divider)] p-[var(--space-block)] grid gap-[var(--space-group)]"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-[var(--space-item)]">
                  <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]">
                    Step {step} of 2
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                    {step === 1 ? "The data" : "You"}
                  </p>
                </div>
                <div className="h-[3px] bg-[var(--color-divider)]">
                  <div
                    className="h-full bg-[var(--color-accent)] origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${step === 1 ? 0.5 : 1})` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="grid gap-[var(--space-group)]"
                  >
                    <SelectField
                      id="vertical"
                      label="Vertical"
                      hint="Which field?"
                      options={INQUIRE_VERTICALS}
                      value={form.vertical}
                      onChange={(v) => set("vertical", v)}
                    />
                    <div className="field">
                      <label htmlFor="taskType">Task type</label>
                      <p className="text-[12px] leading-relaxed text-[var(--color-neutral-700)] -mt-1">
                        The specific job the experts do. e.g. quote and tender a
                        load, draft a contract clause.
                      </p>
                      <input
                        id="taskType"
                        name="taskType"
                        className="input"
                        required
                        value={form.taskType}
                        onChange={(e) => set("taskType", e.target.value)}
                        placeholder="e.g. draft a contract clause"
                      />
                    </div>
                    <div
                      className="grid gap-[var(--space-group)] items-end"
                      data-stack
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      <div className="field">
                        <label htmlFor="volume">Volume</label>
                        <p className="text-[12px] leading-[1.35] text-[var(--color-neutral-700)] min-h-[2.7em]">
                          Rough number of rows, or hours of recorded work.
                        </p>
                        <input
                          id="volume"
                          name="volume"
                          className="input"
                          required
                          value={form.volume}
                          onChange={(e) => set("volume", e.target.value)}
                          placeholder="e.g. 80k rows"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="experts">Distinct experts</label>
                        <p className="text-[12px] leading-[1.35] text-[var(--color-neutral-700)] min-h-[2.7em]">
                          How many different people is it drawn from?
                        </p>
                        <input
                          id="experts"
                          name="experts"
                          className="input"
                          required
                          value={form.experts}
                          onChange={(e) => set("experts", e.target.value)}
                          placeholder="e.g. 40"
                        />
                      </div>
                    </div>
                    <SelectField
                      id="outcome"
                      label="Outcome data"
                      hint="How are results captured?"
                      options={OUTCOME_CAPTURE}
                      value={form.outcome}
                      onChange={(v) => set("outcome", v)}
                    />
                    <div
                      className="grid gap-[var(--space-group)] items-end"
                      data-stack
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      <SelectField
                        id="freshness"
                        label="Freshness"
                        hint="How current is it?"
                        options={FRESHNESS}
                        value={form.freshness}
                        onChange={(v) => set("freshness", v)}
                      />
                      <SelectField
                        id="rights"
                        label="Rights"
                        hint="Can it be sold and used for AI training?"
                        options={RIGHTS}
                        value={form.rights}
                        onChange={(v) => set("rights", v)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary self-start py-3 px-6"
                    >
                      Continue
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="grid gap-[var(--space-group)]"
                  >
                    <div className="field">
                      <label htmlFor="email">Work email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="input"
                        required
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    <div
                      className="grid gap-[var(--space-group)]"
                      data-stack
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      <div className="field">
                        <label htmlFor="company">Company</label>
                        <input
                          id="company"
                          name="company"
                          className="input"
                          required
                          value={form.company}
                          onChange={(e) => set("company", e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="name">Your name</label>
                        <input
                          id="name"
                          name="name"
                          className="input"
                          required
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                      </div>
                    </div>
                    <SelectField
                      id="role"
                      label="Role"
                      options={ROLES}
                      value={form.role}
                      onChange={(v) => set("role", v)}
                    />
                    <SelectField
                      id="holderType"
                      label="Data holder type"
                      options={HOLDER_TYPES}
                      value={form.holderType}
                      onChange={(v) => set("holderType", v)}
                    />
                    <SelectField
                      id="timeline"
                      label="Timeline"
                      options={TIMELINES}
                      value={form.timeline}
                      onChange={(v) => set("timeline", v)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-secondary py-3 px-6"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary py-3 px-6">
                        Get my appraisal
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
