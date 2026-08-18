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
    id: "claims",
    tab: "Claims and disputes",
    title: "Claims and disputes",
    body: "Serial records of the same case, the decision made at each step, and how it resolved. Labs pay for the judgment between the steps, not the final label.",
    tag: "Highest demand",
    rows: [
      { k: "Asset", v: "12,400 case episodes, 11 years" },
      { k: "Unit", v: "One case, all steps attached" },
      { k: "Signal", v: "Decision made → outcome reached" },
      { k: "Excluded", v: "Names, account numbers, documents" },
      { k: "Licence", v: "Nonexclusive, 24 months, renewable" },
    ],
  },
  {
    id: "routing",
    tab: "Routing and logistics",
    title: "Routing and logistics",
    body: "Who got sent where, how fast, and what happened next. Labs pay for the dispatch judgment, not the destination code.",
    tag: "Fast to prepare",
    rows: [
      { k: "Asset", v: "104,000 routes, 6 years" },
      { k: "Unit", v: "Dispatch → delivery → exception" },
      { k: "Signal", v: "Routing decision → time to complete" },
      { k: "Excluded", v: "Customer names, addresses" },
      { k: "Licence", v: "Nonexclusive, royalty-bearing" },
    ],
  },
  {
    id: "case",
    tab: "Case and contract trails",
    title: "Case and contract trails",
    body: "The file, the clause that mattered, and how it closed. There is no public corpus of what actually gets signed, which is exactly why it prices well.",
    tag: "Scarce",
    rows: [
      { k: "Asset", v: "38,900 matters, 9 years" },
      { k: "Unit", v: "Matter + clause + outcome" },
      { k: "Signal", v: "Argument used → resolution" },
      { k: "Excluded", v: "Client and counterparty identifiers" },
      { k: "Licence", v: "Exclusive by practice segment" },
    ],
  },
  {
    id: "tx",
    tab: "Transaction outcomes",
    title: "Transaction outcomes",
    body: "The transaction, the exception raised, and whether it cleared. Operational outcome data trains the agents every operator is buying.",
    tag: "Broad demand",
    rows: [
      { k: "Asset", v: "2.1M transactions, 8 years" },
      { k: "Unit", v: "Transaction → exception → outcome" },
      { k: "Signal", v: "Decision made → loss or recovery" },
      { k: "Excluded", v: "Account numbers, names" },
      { k: "Licence", v: "Nonexclusive, 24 months, renewable" },
    ],
  },
];

export const VERTICALS = [
  { id: "retail", label: "Retail", mult: 1.0 },
  { id: "logistics", label: "Logistics", mult: 1.15 },
  { id: "legal", label: "Legal", mult: 1.35 },
  { id: "insurance", label: "Insurance", mult: 1.25 },
  { id: "finance", label: "Finance", mult: 1.3 },
  { id: "manufacturing", label: "Manufacturing", mult: 1.05 },
  { id: "healthcare", label: "Healthcare", mult: 1.4 },
  { id: "real-estate", label: "Real estate", mult: 1.1 },
  { id: "other", label: "Other", mult: 0.95 },
] as const;

export const CAL_URL = "https://cal.com/team/shfa-ai/technical-test";
export const CAL_EMBED_URL =
  "https://cal.com/team/shfa-ai/technical-test?embed=true&embedType=inline&layout=month_view&theme=light";

export const NAV_LINKS = [
  { href: "#value", label: "Why they pay" },
  { href: "#worth", label: "What it's worth" },
  { href: "#process", label: "How it works" },
  { href: "#control", label: "Control" },
] as const;
