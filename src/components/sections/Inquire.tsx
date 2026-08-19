"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sunburst } from "@/components/illustrations";
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
        <p className="text-[12px] leading-[1.35] text-[var(--color-muted)] min-h-[2.7em]">
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const reduce = useReducedMotion();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function goNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (step === 1) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "Could not send. Try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not send. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fade = reduce
    ? { duration: 0 }
    : { duration: 0.28 };

  return (
    <section
      id="form"
      aria-labelledby="form-h"
      className="bg-[var(--color-dark)] text-[var(--color-bg)]"
    >
      <div id="inquire" className="max-w-[840px] mx-auto px-[var(--gutter)] pt-[120px] pb-[100px] text-center">
        <Sunburst className="mx-auto mb-9" />
        <h2
          id="form-h"
          className="font-serif font-normal text-[clamp(1.95rem,4.8vw,2.875rem)] leading-[1.1] tracking-[-0.01em] mb-6 text-pretty"
        >
          Somebody is going to get paid for your data this year. It should be
          you
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--color-stone)] mx-auto mb-10 max-w-[56ch] text-pretty">
          Every company sitting on years of records is sitting on an asset. Most
          will never find out what it is worth. Finding out costs you nothing:
          one form, a real number in two weeks, and every decision after that
          stays yours.
        </p>

        {sent ? (
          <div className="mx-auto max-w-[640px] bg-[var(--color-bg)] text-[var(--color-text)] rounded-[var(--radius-card)] p-8 text-left min-h-[220px] flex flex-col justify-center">
            <p className="text-[13px] tracking-[0.12em] uppercase text-[var(--color-accent)] font-semibold">
              Received
            </p>
            <p className="mt-4 font-serif text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] max-w-[18ch]">
              We will reply with a number.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed max-w-[42ch] text-[var(--color-muted)]">
              Keep the number. Walk away if you want to.
            </p>
          </div>
        ) : (
          <form
            onSubmit={goNext}
            className="mx-auto max-w-[640px] bg-[var(--color-bg)] text-[var(--color-text)] rounded-[var(--radius-card)] p-8 grid gap-6 text-left"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2.5">
                <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[var(--color-muted)]">
                  Step {step} of 2
                </p>
                <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[var(--color-accent)]">
                  {step === 1 ? "The data" : "You"}
                </p>
              </div>
              <div className="h-[3px] bg-[var(--color-card)] rounded-full overflow-hidden">
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
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={fade}
                  className="grid gap-6"
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
                    <p className="text-[12px] leading-relaxed text-[var(--color-muted)] -mt-1">
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
                    className="grid gap-6 items-end"
                    data-stack
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div className="field">
                      <label htmlFor="volume">Volume</label>
                      <p className="text-[12px] leading-[1.35] text-[var(--color-muted)] min-h-[2.7em]">
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
                      <p className="text-[12px] leading-[1.35] text-[var(--color-muted)] min-h-[2.7em]">
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
                    className="grid gap-6 items-end"
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
                  <button type="submit" className="btn-fill btn-block py-3.5 px-6 text-[15px]">
                    Continue
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={fade}
                  className="grid gap-6"
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
                    className="grid gap-6"
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
                      className="btn-ghost-light py-3.5 px-6 text-[15px]"
                      onClick={() => setStep(1)}
                      disabled={submitting}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-fill py-3.5 px-6 text-[15px]"
                      disabled={submitting}
                    >
                      {submitting ? "Sending…" : "Get my appraisal"}
                    </button>
                  </div>
                  {error ? (
                    <p className="text-[13px] leading-relaxed text-[var(--color-accent)]">
                      {error}
                    </p>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}

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
