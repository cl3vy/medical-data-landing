export type ExampleRow = { k: string; v: string };

export type Example = {
  id: string;
  tab: string;
  title: string;
  body: string;
  tag: string;
  rows: ExampleRow[];
};

export const EXAMPLES: Example[] = [
  {
    id: "wound",
    tab: "Wound care",
    title: "Wound care progression",
    body: "Serial assessments of the same wound, the dressing chosen each visit, and whether it closed. Labs pay for the judgment between visits, not the diagnosis code.",
    tag: "Highest demand",
    rows: [
      { k: "Asset", v: "12,400 wound episodes, 11 years" },
      { k: "Unit", v: "One episode, all visits attached" },
      { k: "Signal", v: "Dressing choice → healing time" },
      { k: "Excluded", v: "Names, MRNs, photographs" },
      { k: "Licence", v: "Non-exclusive, 24 months, renewable" },
    ],
  },
  {
    id: "claims",
    tab: "Denied claims",
    title: "Denied claims and appeals",
    body: "The denial, the appeal your team wrote, and the payer's answer. There is no public corpus of what actually gets overturned, which is exactly why it prices well.",
    tag: "Scarce",
    rows: [
      { k: "Asset", v: "38,900 denials, 9 years" },
      { k: "Unit", v: "Denial + appeal + outcome" },
      { k: "Signal", v: "Argument used → overturn rate" },
      { k: "Excluded", v: "Patient and payer identifiers" },
      { k: "Licence", v: "Exclusive by payer segment" },
    ],
  },
  {
    id: "referral",
    tab: "Referral trails",
    title: "Referral and triage trails",
    body: "Who got sent where, how fast, and what happened next. Operational routing data trains the scheduling and intake agents every health system is buying.",
    tag: "Fast to prepare",
    rows: [
      { k: "Asset", v: "104,000 referrals, 6 years" },
      { k: "Unit", v: "Referral → appointment → outcome" },
      { k: "Signal", v: "Routing decision → time to care" },
      { k: "Excluded", v: "Provider names, addresses" },
      { k: "Licence", v: "Non-exclusive, royalty-bearing" },
    ],
  },
];

export const CAL_URL = "https://cal.com/team/shfa-ai/technical-test";
export const CAL_EMBED_URL =
  "https://cal.com/team/shfa-ai/technical-test?embed=true&embedType=inline&layout=month_view&theme=light";

export const NAV_LINKS = [
  { href: "#value", label: "Why they pay" },
  { href: "#worth", label: "What it's worth" },
  { href: "#process", label: "How it works" },
  { href: "#control", label: "Control" },
] as const;
