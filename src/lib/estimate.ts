export const DEPTHS = [
  { label: "Generalist", mult: 0.7, buyers: "3–5" },
  { label: "Mixed", mult: 1.0, buyers: "5–8" },
  { label: "Specialty", mult: 1.4, buyers: "8–12" },
  { label: "Sub-specialty", mult: 1.9, buyers: "12–18" },
  { label: "Rare / longitudinal", mult: 2.6, buyers: "18+" },
] as const;

export function money(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    const fixed = v.toFixed(n < 10_000_000 ? 2 : 1).replace(/\.0+$/, "");
    return `$${fixed}M`;
  }
  return `$${Math.round(n / 1000).toLocaleString("en-US")}k`;
}

export function computeEstimate(records: number, years: number, depth: number) {
  const d = DEPTHS[depth - 1] ?? DEPTHS[2];
  const base = records * 1000 * 1.8 * (0.6 + years * 0.04) * d.mult;
  const low = Math.max(60_000, base * 0.6);
  const high = Math.min(4_200_000, base * 1.35);
  const rows = records * 1000 * (2 + years * 0.6);

  return {
    depthLabel: d.label,
    buyers: d.buyers,
    estimate: `${money(low)} – ${money(high)}`,
    estimatePct: Math.min(100, (high / 4_200_000) * 100),
    rowsLabel:
      rows >= 1_000_000
        ? `${(rows / 1_000_000).toFixed(1)}M`
        : `${Math.round(rows / 1000)}k`,
    dealShape:
      high > 1_500_000
        ? "Upfront + royalty"
        : years > 8
          ? "Royalty-weighted"
          : "Upfront",
    recordsLabel: records >= 500 ? "500k+" : `${records}k`,
    yearsLabel: years === 20 ? "20+ yrs" : `${years} yrs`,
  };
}
