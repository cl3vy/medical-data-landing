import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = process.env.INQUIRE_TO_EMAIL ?? "klevi@trysigil.io";
const FROM = process.env.RESEND_FROM ?? "SIGIL <onboarding@resend.dev>";

const REQUIRED_STRINGS = [
  "name",
  "email",
  "company",
  "plants",
  "role",
  "industryVertical",
  "productionModel",
  "historyDepth",
  "plantLocations",
  "dataRights",
  "timeline",
] as const;

const LABELS: Record<(typeof REQUIRED_STRINGS)[number], string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  plants: "Number of plants or sites",
  role: "Role",
  industryVertical: "Industry vertical",
  productionModel: "Production model",
  historyDepth: "History depth",
  plantLocations: "Plant locations",
  dataRights: "Data rights",
  timeline: "Timeline",
};

const SOURCE_IDS = [
  "sensors",
  "vision",
  "batch",
  "quality",
  "maintenance",
  "erp",
  "video",
  "engineering",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim().length > 0) : [];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const fieldKey of REQUIRED_STRINGS) {
    const value = str(body[fieldKey]);
    if (!value) {
      return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
    }
    fields[fieldKey] = value;
  }

  const email = fields.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  const sourcesRaw = isRecord(body.sources) ? body.sources : {};
  const sources = SOURCE_IDS.filter((id) => sourcesRaw[id] === true);
  const otherSources = str(body.otherSources);
  if (sources.length === 0 && !otherSources) {
    return NextResponse.json({ error: "Select at least one data source." }, { status: 400 });
  }

  const lines: string[] = [];
  const push = (label: string, value: string) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  lines.push("Contact and organization");
  push(LABELS.name, fields.name);
  push(LABELS.email, fields.email);
  push(LABELS.company, fields.company);
  push(LABELS.plants, fields.plants);
  push(LABELS.role, fields.role);
  push(LABELS.industryVertical, fields.industryVertical);
  push(LABELS.productionModel, fields.productionModel);

  lines.push("", "Manufacturing data sources");
  if (sourcesRaw.sensors === true) {
    lines.push("- Machine and sensor time series");
    push("  Equipment or process types", strArray(body.sensorsEquipment).join(", "));
    push("  Sampling frequency", str(body.sensorsFrequency));
  }
  if (sourcesRaw.vision === true) {
    lines.push("- Machine vision and inspection images");
    push("  Inspection type", str(body.visionInspectionType));
    push("  Labeled", str(body.visionLabeled));
  }
  if (sourcesRaw.batch === true) {
    lines.push("- Production and batch records");
    push("  Format", str(body.batchFormat));
  }
  if (sourcesRaw.quality === true) {
    lines.push("- Quality and lab data");
    push("  Test types", strArray(body.qualityTestTypes).join(", "));
    push("  Linked to batch or part ID", str(body.qualityLinked));
  }
  if (sourcesRaw.maintenance === true) {
    lines.push("- Maintenance and downtime");
    push("  Asset classes covered", str(body.maintenanceAssetClasses));
    push("  Failure causes coded", str(body.maintenanceFailureCoded));
  }
  if (sourcesRaw.erp === true) {
    lines.push("- ERP and supply chain");
    push("  System", str(body.erpSystem));
  }
  if (sourcesRaw.video === true) {
    lines.push("- Video");
    push("  Hours", str(body.videoHours));
    push("  Total size (GB)", str(body.videoTotalGb));
    push("  Notes", str(body.videoNotes));
    push("  Shows human operators", body.videoShowsOperators === true ? "Yes" : "No");
  }
  if (sourcesRaw.engineering === true) {
    lines.push("- Engineering and documents");
    push("  Formats", strArray(body.engineeringFormats).join(", "));
  }
  if (otherSources) {
    lines.push("- Other sources");
    push("  Description", otherSources);
  }

  lines.push("", "Workplace tools and sources");
  push("Tools", strArray(body.workplaceTools).join(", "));
  push("Other tools", str(body.workplaceOther));

  lines.push("", "Scale and distribution");
  const scaleRows = Array.isArray(body.scaleRows) ? body.scaleRows : [];
  for (const row of scaleRows) {
    if (!isRecord(row)) continue;
    const unitType = str(row.unitType);
    const newPerMonth = str(row.newPerMonth);
    const totalSize = str(row.totalSize);
    if (!unitType && !newPerMonth && !totalSize) continue;
    lines.push(`- ${unitType || "Unspecified"}: ${newPerMonth || "—"} new/month, ${totalSize || "—"} total`);
  }
  push(LABELS.historyDepth, fields.historyDepth);
  push(LABELS.plantLocations, fields.plantLocations);

  lines.push("", "Data rights and timeline");
  push(LABELS.dataRights, fields.dataRights);
  push(LABELS.timeline, fields.timeline);

  const text = lines.join("\n");
  const html = `<pre style="font:14px/1.5 ui-sans-serif,system-ui,sans-serif">${escapeHtml(text)}</pre>`;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Manufacturing data intake — ${fields.company}`,
    text,
    html,
  });

  if (error) {
    return NextResponse.json({ error: "Could not send. Try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
