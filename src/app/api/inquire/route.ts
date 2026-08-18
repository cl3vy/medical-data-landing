import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = process.env.INQUIRE_TO_EMAIL ?? "klevi@trysigil.io";
const FROM = process.env.RESEND_FROM ?? "SIGIL <onboarding@resend.dev>";

const REQUIRED = [
  "vertical",
  "taskType",
  "volume",
  "experts",
  "outcome",
  "freshness",
  "rights",
  "email",
  "company",
  "name",
  "role",
  "holderType",
  "timeline",
] as const;

const LABELS: Record<(typeof REQUIRED)[number], string> = {
  vertical: "Vertical",
  taskType: "Task type",
  volume: "Volume",
  experts: "Distinct experts",
  outcome: "Outcome data",
  freshness: "Freshness",
  rights: "Rights",
  email: "Work email",
  company: "Company",
  name: "Name",
  role: "Role",
  holderType: "Data holder type",
  timeline: "Timeline",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 503 },
    );
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
  for (const keyName of REQUIRED) {
    const value = body[keyName];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { error: "Please fill in every field." },
        { status: 400 },
      );
    }
    fields[keyName] = value.trim();
  }

  const email = fields.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  const rows = REQUIRED.map((keyName) => `${LABELS[keyName]}: ${fields[keyName]}`);
  const text = rows.join("\n");
  const html = `<pre style="font:14px/1.5 ui-sans-serif,system-ui,sans-serif">${rows
    .map((line) => escapeHtml(line))
    .join("\n")}</pre>`;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Appraisal form — ${fields.company}`,
    text,
    html,
  });

  if (error) {
    return NextResponse.json({ error: "Could not send. Try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
