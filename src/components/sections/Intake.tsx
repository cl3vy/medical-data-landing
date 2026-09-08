"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  DATA_RIGHTS,
  DOCUMENT_FORMATS,
  ERP_SYSTEMS,
  EQUIPMENT_TYPES,
  FAILURE_CODED,
  HISTORY_DEPTHS,
  ID_LINKAGE,
  INDUSTRY_VERTICALS,
  INSPECTION_TYPES,
  LABEL_STATUS,
  PLANT_LOCATIONS,
  PRODUCTION_MODELS,
  RECORD_FORMATS,
  ROLES,
  SAMPLING_FREQUENCIES,
  TEST_TYPES,
  TIMELINES,
  UNIT_TYPES,
  WORKPLACE_TOOLS,
  type SourceId,
} from "@/lib/intake";

type ScaleRow = { unitType: string; newPerMonth: string; totalSize: string };

type FormState = {
  email: string;
  company: string;
  name: string;
  role: string;
  plants: string;
  industryVertical: string;
  productionModel: string;
  timeline: string;

  sources: Record<SourceId, boolean>;
  sensorsEquipment: string[];
  sensorsFrequency: string;
  visionInspectionType: string;
  visionLabeled: string;
  batchFormat: string;
  qualityTestTypes: string[];
  qualityLinked: string;
  maintenanceAssetClasses: string;
  maintenanceFailureCoded: string;
  erpSystem: string;
  videoHours: string;
  videoTotalGb: string;
  videoNotes: string;
  videoShowsOperators: boolean;
  engineeringFormats: string[];
  otherSources: string;

  workplaceTools: string[];
  workplaceOther: string;

  scaleRows: ScaleRow[];
  historyDepth: string;
  plantLocations: string;

  dataRights: string;
};

const EMPTY: FormState = {
  email: "",
  company: "",
  name: "",
  role: "",
  plants: "",
  industryVertical: "",
  productionModel: "",
  timeline: "",

  sources: {
    sensors: false,
    vision: false,
    batch: false,
    quality: false,
    maintenance: false,
    erp: false,
    video: false,
    engineering: false,
  },
  sensorsEquipment: [],
  sensorsFrequency: "",
  visionInspectionType: "",
  visionLabeled: "",
  batchFormat: "",
  qualityTestTypes: [],
  qualityLinked: "",
  maintenanceAssetClasses: "",
  maintenanceFailureCoded: "",
  erpSystem: "",
  videoHours: "",
  videoTotalGb: "",
  videoNotes: "",
  videoShowsOperators: false,
  engineeringFormats: [],
  otherSources: "",

  workplaceTools: [],
  workplaceOther: "",

  scaleRows: [{ unitType: "", newPerMonth: "", totalSize: "" }],
  historyDepth: "",
  plantLocations: "",

  dataRights: "",
};

function toggleInArray(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint ? <p className="text-[12px] leading-[1.35] text-[var(--color-muted)]">{hint}</p> : null}
      {children}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  required,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <select
      id={id}
      name={id}
      className="input"
      required={required}
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
  );
}

function CheckGrid({
  options,
  values,
  onChange,
}: {
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="check-grid">
      {options.map((opt) => (
        <label key={opt} className="check-row">
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => onChange(toggleInArray(values, opt))}
          />
          <span className="check-row-label">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="section-label">
      <span className="section-num">{n}</span>
      <span className="section-title">{title}</span>
    </div>
  );
}

export function Intake() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const reduce = useReducedMotion();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSource(id: SourceId) {
    setForm((prev) => ({ ...prev, sources: { ...prev.sources, [id]: !prev.sources[id] } }));
  }

  function setScaleRow(index: number, patch: Partial<ScaleRow>) {
    setForm((prev) => ({
      ...prev,
      scaleRows: prev.scaleRows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    }));
  }

  function addScaleRow() {
    if (form.scaleRows.length >= 8) return;
    setForm((prev) => ({
      ...prev,
      scaleRows: [...prev.scaleRows, { unitType: "", newPerMonth: "", totalSize: "" }],
    }));
  }

  function removeScaleRow(index: number) {
    setForm((prev) => ({
      ...prev,
      scaleRows: prev.scaleRows.length === 1 ? prev.scaleRows : prev.scaleRows.filter((_, i) => i !== index),
    }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const anySourceSelected = Object.values(form.sources).some(Boolean) || form.otherSources.trim().length > 0;
    if (!anySourceSelected) {
      setError("Select at least one data source.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
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

  const fade = reduce ? { duration: 0 } : { duration: 0.28 };

  return (
    <section aria-labelledby="form-h" className="wrap pb-[100px] pt-6">
      <div className="max-w-[720px] mx-auto">
        <h1
          id="form-h"
          className="font-serif font-normal text-[clamp(1.95rem,4.8vw,2.875rem)] leading-[1.1] tracking-[-0.01em] mb-5 text-pretty"
        >
          Start with the form. We reply with a number.
        </h1>
        <p className="text-[17px] leading-[1.7] text-[var(--color-muted)] mb-4 text-pretty">
          Share an overview of your manufacturing data. No files, no records,
          nothing confidential.
        </p>
        <p className="mb-10 text-[14px] text-[var(--color-faint)]">
          One form&ensp;·&ensp;No obligation&ensp;·&ensp;You set the terms
        </p>

        {sent ? (
          <div className="bg-[var(--color-card)] text-[var(--color-text)] rounded-[var(--radius-card)] p-8 text-left min-h-[220px] flex flex-col justify-center">
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
          <motion.form
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fade}
            onSubmit={submit}
            className="bg-[var(--color-card)] text-[var(--color-text)] rounded-[var(--radius-card)] p-8 grid gap-10 text-left"
          >
            {/* 01 — Contact and organization */}
            <div className="grid gap-6">
              <SectionHeading n="01" title="Contact and organization" />
              <div className="grid gap-6" data-stack style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Field id="name" label="Your name">
                  <input
                    id="name"
                    name="name"
                    className="input"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>
                <Field id="email" label="Work email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid gap-6" data-stack style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Field id="company" label="Company">
                  <input
                    id="company"
                    name="company"
                    className="input"
                    required
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </Field>
                <Field id="plants" label="Number of plants or sites">
                  <input
                    id="plants"
                    name="plants"
                    className="input"
                    required
                    value={form.plants}
                    onChange={(e) => set("plants", e.target.value)}
                    placeholder="e.g. 3"
                  />
                </Field>
              </div>
              <Field id="role" label="Role">
                <Select id="role" value={form.role} onChange={(v) => set("role", v)} options={ROLES} required />
              </Field>
              <div className="grid gap-6" data-stack style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Field id="industryVertical" label="Industry vertical">
                  <Select
                    id="industryVertical"
                    value={form.industryVertical}
                    onChange={(v) => set("industryVertical", v)}
                    options={INDUSTRY_VERTICALS}
                    required
                  />
                </Field>
                <Field id="productionModel" label="Production model">
                  <Select
                    id="productionModel"
                    value={form.productionModel}
                    onChange={(v) => set("productionModel", v)}
                    options={PRODUCTION_MODELS}
                    required
                  />
                </Field>
              </div>
            </div>

            {/* 02 — Manufacturing data sources */}
            <div className="grid gap-6">
              <SectionHeading n="02" title="Manufacturing data sources" />
              <p className="text-[13px] leading-relaxed text-[var(--color-muted)] -mt-2">
                Which sources are in scope? Select all that apply.
              </p>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.sensors}
                  onChange={() => toggleSource("sensors")}
                />
                <span>
                  <span className="check-row-label">Machine and sensor time series</span>
                  <span className="check-row-sub">PLC, SCADA, historian, IoT.</span>
                </span>
              </label>
              {form.sources.sensors ? (
                <div className="subblock">
                  <Field id="sensorsEquipment" label="Equipment or process types">
                    <CheckGrid
                      options={EQUIPMENT_TYPES}
                      values={form.sensorsEquipment}
                      onChange={(v) => set("sensorsEquipment", v)}
                    />
                  </Field>
                  <Field id="sensorsFrequency" label="Sampling frequency">
                    <Select
                      id="sensorsFrequency"
                      value={form.sensorsFrequency}
                      onChange={(v) => set("sensorsFrequency", v)}
                      options={SAMPLING_FREQUENCIES}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.vision}
                  onChange={() => toggleSource("vision")}
                />
                <span>
                  <span className="check-row-label">Machine vision and inspection images</span>
                </span>
              </label>
              {form.sources.vision ? (
                <div className="subblock">
                  <Field id="visionInspectionType" label="Inspection type">
                    <Select
                      id="visionInspectionType"
                      value={form.visionInspectionType}
                      onChange={(v) => set("visionInspectionType", v)}
                      options={INSPECTION_TYPES}
                    />
                  </Field>
                  <Field id="visionLabeled" label="Are images labeled?">
                    <Select
                      id="visionLabeled"
                      value={form.visionLabeled}
                      onChange={(v) => set("visionLabeled", v)}
                      options={LABEL_STATUS}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.batch}
                  onChange={() => toggleSource("batch")}
                />
                <span>
                  <span className="check-row-label">Production and batch records</span>
                  <span className="check-row-sub">MES, batch sheets, genealogy, OEE.</span>
                </span>
              </label>
              {form.sources.batch ? (
                <div className="subblock">
                  <Field id="batchFormat" label="Records are">
                    <Select
                      id="batchFormat"
                      value={form.batchFormat}
                      onChange={(v) => set("batchFormat", v)}
                      options={RECORD_FORMATS}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.quality}
                  onChange={() => toggleSource("quality")}
                />
                <span>
                  <span className="check-row-label">Quality and lab data</span>
                  <span className="check-row-sub">SPC, CoAs, test results, NCRs, CAPA.</span>
                </span>
              </label>
              {form.sources.quality ? (
                <div className="subblock">
                  <Field id="qualityTestTypes" label="Test types">
                    <CheckGrid
                      options={TEST_TYPES}
                      values={form.qualityTestTypes}
                      onChange={(v) => set("qualityTestTypes", v)}
                    />
                  </Field>
                  <Field id="qualityLinked" label="Are results linked to a batch or part ID?">
                    <Select
                      id="qualityLinked"
                      value={form.qualityLinked}
                      onChange={(v) => set("qualityLinked", v)}
                      options={ID_LINKAGE}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.maintenance}
                  onChange={() => toggleSource("maintenance")}
                />
                <span>
                  <span className="check-row-label">Maintenance and downtime</span>
                  <span className="check-row-sub">CMMS work orders, failures, downtime logs.</span>
                </span>
              </label>
              {form.sources.maintenance ? (
                <div className="subblock">
                  <Field id="maintenanceAssetClasses" label="Asset classes covered">
                    <input
                      id="maintenanceAssetClasses"
                      name="maintenanceAssetClasses"
                      className="input"
                      value={form.maintenanceAssetClasses}
                      onChange={(e) => set("maintenanceAssetClasses", e.target.value)}
                      placeholder="e.g. pumps, conveyors, robots"
                    />
                  </Field>
                  <Field id="maintenanceFailureCoded" label="Are failure causes coded?">
                    <Select
                      id="maintenanceFailureCoded"
                      value={form.maintenanceFailureCoded}
                      onChange={(v) => set("maintenanceFailureCoded", v)}
                      options={FAILURE_CODED}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.erp}
                  onChange={() => toggleSource("erp")}
                />
                <span>
                  <span className="check-row-label">ERP and supply chain</span>
                  <span className="check-row-sub">Orders, BOMs, inventory, invoices, shipments, costing.</span>
                </span>
              </label>
              {form.sources.erp ? (
                <div className="subblock">
                  <Field id="erpSystem" label="Which system?">
                    <Select
                      id="erpSystem"
                      value={form.erpSystem}
                      onChange={(v) => set("erpSystem", v)}
                      options={ERP_SYSTEMS}
                    />
                  </Field>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.video}
                  onChange={() => toggleSource("video")}
                />
                <span>
                  <span className="check-row-label">Video</span>
                  <span className="check-row-sub">Line cameras, operator workstations, robot cells.</span>
                </span>
              </label>
              {form.sources.video ? (
                <div className="subblock">
                  <div className="grid gap-6" data-stack style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <Field id="videoHours" label="Hours of video">
                      <input
                        id="videoHours"
                        name="videoHours"
                        className="input"
                        value={form.videoHours}
                        onChange={(e) => set("videoHours", e.target.value)}
                      />
                    </Field>
                    <Field id="videoTotalGb" label="Total size (GB)">
                      <input
                        id="videoTotalGb"
                        name="videoTotalGb"
                        className="input"
                        value={form.videoTotalGb}
                        onChange={(e) => set("videoTotalGb", e.target.value)}
                      />
                    </Field>
                  </div>
                  <Field id="videoNotes" label="Notes">
                    <textarea
                      id="videoNotes"
                      name="videoNotes"
                      className="input"
                      value={form.videoNotes}
                      onChange={(e) => set("videoNotes", e.target.value)}
                    />
                  </Field>
                  <label className="check-row">
                    <input
                      type="checkbox"
                      checked={form.videoShowsOperators}
                      onChange={(e) => set("videoShowsOperators", e.target.checked)}
                    />
                    <span className="check-row-label">Video shows human operators performing tasks</span>
                  </label>
                </div>
              ) : null}

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.sources.engineering}
                  onChange={() => toggleSource("engineering")}
                />
                <span>
                  <span className="check-row-label">Engineering and documents</span>
                  <span className="check-row-sub">CAD, drawings, work instructions, SOPs, recipes.</span>
                </span>
              </label>
              {form.sources.engineering ? (
                <div className="subblock">
                  <Field id="engineeringFormats" label="Formats">
                    <CheckGrid
                      options={DOCUMENT_FORMATS}
                      values={form.engineeringFormats}
                      onChange={(v) => set("engineeringFormats", v)}
                    />
                  </Field>
                </div>
              ) : null}

              <Field id="otherSources" label="Other sources" hint="Anything not covered above.">
                <textarea
                  id="otherSources"
                  name="otherSources"
                  className="input"
                  value={form.otherSources}
                  onChange={(e) => set("otherSources", e.target.value)}
                />
              </Field>
            </div>

            {/* 03 — Workplace tools and sources */}
            <div className="grid gap-6">
              <SectionHeading n="03" title="Workplace tools and sources" />
              <CheckGrid
                options={WORKPLACE_TOOLS}
                values={form.workplaceTools}
                onChange={(v) => set("workplaceTools", v)}
              />
              <Field id="workplaceOther" label="Other workplace tools">
                <input
                  id="workplaceOther"
                  name="workplaceOther"
                  className="input"
                  value={form.workplaceOther}
                  onChange={(e) => set("workplaceOther", e.target.value)}
                />
              </Field>
            </div>

            {/* 04 — Scale and distribution */}
            <div className="grid gap-6">
              <SectionHeading n="04" title="Scale and distribution" />
              <div className="row-table">
                {form.scaleRows.map((row, i) => (
                  <div className="row-table-row" key={i}>
                    <Select
                      id={`scaleUnit-${i}`}
                      value={row.unitType}
                      onChange={(v) => setScaleRow(i, { unitType: v })}
                      options={UNIT_TYPES}
                    />
                    <input
                      className="input"
                      placeholder="New per month"
                      value={row.newPerMonth}
                      onChange={(e) => setScaleRow(i, { newPerMonth: e.target.value })}
                    />
                    <input
                      className="input"
                      placeholder="Total size"
                      value={row.totalSize}
                      onChange={(e) => setScaleRow(i, { totalSize: e.target.value })}
                    />
                    <button
                      type="button"
                      className="btn-ghost-light py-2.5 px-4 text-[13px]"
                      onClick={() => removeScaleRow(i)}
                      disabled={form.scaleRows.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-ghost-light py-2.5 px-4 text-[13px]"
                style={{ justifySelf: "start" }}
                onClick={addScaleRow}
                disabled={form.scaleRows.length >= 8}
              >
                Add row
              </button>

              <div className="grid gap-6" data-stack style={{ gridTemplateColumns: "1fr 1fr" }}>
                <Field id="historyDepth" label="History depth">
                  <Select
                    id="historyDepth"
                    value={form.historyDepth}
                    onChange={(v) => set("historyDepth", v)}
                    options={HISTORY_DEPTHS}
                    required
                  />
                </Field>
                <Field id="plantLocations" label="Plant locations">
                  <Select
                    id="plantLocations"
                    value={form.plantLocations}
                    onChange={(v) => set("plantLocations", v)}
                    options={PLANT_LOCATIONS}
                    required
                  />
                </Field>
              </div>
            </div>

            {/* Data rights */}
            <div className="grid gap-6">
              <SectionHeading n="05" title="Data rights" />
              <Field
                id="dataRights"
                label="Is any of this data produced under customer contracts, on OEM leased equipment, or subject to customer ownership of process or design data?"
              >
                <Select
                  id="dataRights"
                  value={form.dataRights}
                  onChange={(v) => set("dataRights", v)}
                  options={DATA_RIGHTS}
                  required
                />
              </Field>
              <Field id="timeline" label="Timeline">
                <Select
                  id="timeline"
                  value={form.timeline}
                  onChange={(v) => set("timeline", v)}
                  options={TIMELINES}
                  required
                />
              </Field>
            </div>

            <div>
              <button type="submit" className="btn-fill btn-block py-3.5 px-6 text-[15px]" disabled={submitting}>
                {submitting ? "Sending…" : "Get my appraisal"}
              </button>
              {error ? (
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-accent)]">{error}</p>
              ) : null}
            </div>
          </motion.form>
        )}

        <p className="mt-6 text-[13px] leading-relaxed text-[var(--color-faint)]">
          Describe your data in the form. Do not send records, customer files,
          or anything confidential.
        </p>
      </div>
    </section>
  );
}
