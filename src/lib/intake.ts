export const ROLES = [
  "Founder or exec",
  "Operations or plant lead",
  "Data or IT lead",
] as const;

export const INDUSTRY_VERTICALS = [
  "Food and beverage",
  "Pharma and nutraceutical",
  "Chemicals",
  "Plastics and rubber",
  "Metals and machining",
  "Automotive",
  "Electronics and PCB",
  "Packaging",
  "Aerospace and defense",
  "Medical device",
  "Consumer goods",
  "Other",
] as const;

export const PRODUCTION_MODELS = [
  "Discrete (assembled units)",
  "Batch (lots and recipes)",
  "Continuous (flow process)",
] as const;

export const TIMELINES = ["Ready now", "Few months", "Just exploring"] as const;

export const EQUIPMENT_TYPES = [
  "CNC and machining",
  "Injection molding",
  "Extrusion",
  "Welding",
  "Mixing and batching",
  "Filling and packaging",
  "Furnaces and ovens",
  "Robotics and pick and place",
  "Assembly lines",
  "HVAC and utilities",
  "Other",
] as const;

export const SAMPLING_FREQUENCIES = [
  "Per second",
  "Per minute",
  "Hourly",
  "Event based",
] as const;

export const INSPECTION_TYPES = [
  "Surface defects",
  "Dimensional",
  "Assembly verification",
  "Label and print",
  "Weld inspection",
  "PCB and AOI",
  "Packaging",
  "Other",
] as const;

export const LABEL_STATUS = [
  "Pass/fail",
  "Defect class",
  "Bounding boxes",
  "None",
] as const;

export const RECORD_FORMATS = [
  "Recorded electronically",
  "On paper",
  "Mixed",
] as const;

export const TEST_TYPES = [
  "Dimensional",
  "Chemical",
  "Mechanical",
  "Microbial",
  "Electrical",
  "Visual",
] as const;

export const ID_LINKAGE = [
  "Yes, linked to batch or part ID",
  "Partially",
  "No",
] as const;

export const FAILURE_CODED = [
  "Yes, causes are coded",
  "Partially",
  "No, uncoded",
] as const;

export const ERP_SYSTEMS = [
  "SAP",
  "NetSuite",
  "Dynamics",
  "Epicor",
  "QuickBooks",
  "Odoo",
  "Fishbowl",
  "Spreadsheets",
  "Other",
] as const;

export const DOCUMENT_FORMATS = [
  "STEP and native CAD",
  "PDF drawings",
  "SOP documents",
  "Recipes and formulations",
] as const;

export const WORKPLACE_TOOLS = [
  "Google Workspace",
  "Slack",
  "Microsoft 365",
  "Source code, automation, or firmware repositories",
  "Shared network drives or file servers",
  "Email based records",
] as const;

export const UNIT_TYPES = [
  "Machines or assets",
  "Production lines",
  "Parts or units produced",
  "Batches or lots",
  "Sensor tags or signals",
  "Images",
  "Work orders",
  "Inspections or tests",
  "Videos",
  "Other",
] as const;

export const HISTORY_DEPTHS = [
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "5 to 10 years",
  "More than 10 years",
] as const;

export const PLANT_LOCATIONS = [
  "Single plant",
  "Multiple plants you own",
  "Data aggregated from customers or vendors (OEM, integrator, or contract manufacturer)",
] as const;

export const DATA_RIGHTS = [
  "No — we fully own this data",
  "Yes — some customer, OEM, or contract constraints apply",
  "Unsure",
] as const;

export type SourceId =
  | "sensors"
  | "vision"
  | "batch"
  | "quality"
  | "maintenance"
  | "erp"
  | "video"
  | "engineering";
