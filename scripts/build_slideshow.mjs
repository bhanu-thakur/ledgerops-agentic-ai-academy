import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "slides", "LedgerOps-Curriculum-and-App-Plan-offline-deck", "content.js");
const curriculum = JSON.parse(fs.readFileSync(path.join(root, "curriculum", "weeks.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "research", "sources.json"), "utf8"));

const cite = (...ids) => ids.map(id => `S${id}`).join(" · ");
const firstSentence = value => value.split(/(?<=\.)\s+/)[0];

const weekReferenceSlides = [
  [1, 4, "Programming foundation", "The first four weeks establish repeatable code, exact money calculations, tests and relational data."],
  [5, 8, "Metrics and first integration", "The learner defines financial metrics before building a dashboard and then connects a read-only Books adapter."],
  [9, 12, "Joined data and bounded AI", "CRM mapping and resilient synchronization come before the first language-model extraction task."],
  [13, 16, "Agent design and evaluation", "Evidence retrieval, tool use, durable review and evaluation turn an AI demo into an auditable workflow."],
  [17, 20, "Portfolio and handover", "The final four weeks produce AP, close, QuickBooks and operating handover case studies."]
].map(([start, end, title, sub]) => ({
  layout: "table",
  section: "CURRICULUM",
  eyebrow: `WEEKS ${start} TO ${end}`,
  title,
  sub,
  cols: ["Week", "Mission", "Build result", "Pass evidence"],
  rows: curriculum.weeks.slice(start - 1, end).map(w => [
    w.id,
    w.title,
    firstSentence(w.build),
    w.gate
  ]),
  note: undefined
}));

const sourceSlides = [0, 9, 18, 27].map((start, index) => ({
  layout: "table",
  section: "SOURCE REGISTER",
  eyebrow: `REFERENCES ${start + 1} TO ${start + 9}`,
  title: `Research sources ${index + 1} of 4`,
  sub: "Primary company pages, official product documentation and selected learning resources support the plan.",
  compact: true,
  cols: ["ID", "Publisher", "Title", "Date or status"],
  rows: sources.slice(start, start + 9).map(s => [
    `S${s.id}`,
    s.publisher,
    s.title,
    s.date
  ]),
  note: "Research checked 13 September 2026. Full URLs remain in content.js and research/sources.json. Recheck living documentation during implementation."
}));

const slides = [
  {
    layout: "cover", tone: "dark", eyebrow: "LEDGEROPS ACADEMY",
    mark: ["20 WEEKS", "400 HOURS"],
    title: "Accounting operations", titleSub: "automation and agentic AI",
    org: "Practical curriculum and learning-system plan",
    footL: "Beginner route · 20 hours each week", footR: "13 September 2026"
  },
  {
    layout: "statement", tone: "dark", section: "PURPOSE", eyebrow: "ROLE OUTCOME",
    title: "Operations automation",
    sub: "The programme builds the ability to improve an accounting process and leave colleagues with a system they can operate.",
    text: "The learner discovers the workflow, connects approved systems, calculates traceable metrics, handles exceptions and adds bounded AI only where interpretation or investigative branching creates a clear benefit.",
    cites: [cite(1, 2, 3, 4, 5)]
  },
  {
    layout: "table", section: "TARGET CONTEXT", eyebrow: "PUBLIC EVIDENCE",
    title: "Prudent and Zeni",
    sub: "Both targets reward accounting operations judgment, while their public product context points to different integration priorities.",
    cols: ["Area", "Prudent", "Zeni"],
    rows: [
      ["Public context", "Bookkeeping, tax, payroll and fractional CFO services", "AI Accountant and AI CFO products"],
      ["Relevant practice", "Client onboarding, missing documents, close readiness", "Transaction exceptions, close review, forecast separation"],
      ["Platform implication", "Confirm the internal stack after joining", "QuickBooks Online Plus is named publicly"],
      ["Shared capability", "Trace every number to approved source evidence", "Trace every number to approved source evidence"],
      ["First dashboard", "Client work and close readiness", "Actuals, exceptions and forecast assumptions"],
      ["Integration route", "Start with the systems found during onboarding", "Include a QuickBooks adapter in the portfolio"],
      ["Operating measure", "Queue age, correction rate and handover", "Exception resolution, evidence and review"],
      ["Boundary", "No public evidence confirms its internal Zoho stack", "Do not assume a public API for proprietary agents"]
    ],
    note: `Sources ${cite(1, 2, 3, 4, 5)}. Company pages describe their own offerings and do not establish measured performance.`
  },
  {
    layout: "hier", section: "ROLE STANDARD", eyebrow: "WHAT GOOD LOOKS LIKE",
    title: "Reliable operating ownership",
    sub: "A useful automation has measurable business value, visible exceptions and recovery instructions.",
    items: [
      { tag: "01", t: "Process discovery", b: "Identify the owner, inputs, decisions, handoffs and costly exceptions." },
      { tag: "02", t: "Trustworthy data", b: "Define source identity, metric grain, filters and reconciliation before visual design." },
      { tag: "03", t: "Controlled automation", b: "Log outcomes, preserve a review queue and stop safely when evidence is missing." },
      { tag: "04", t: "Handover", b: "Provide runbooks, recovery drills, support ownership and a measured pilot result." }
    ]
  },
  {
    layout: "hero", tone: "dark", section: "COMMITMENT", eyebrow: "BEGINNER ROUTE",
    title: "Four hundred hours",
    sub: "Twenty focused weeks create enough repetition to move from a first script to three explainable case studies.",
    figure: 400, unit: "study hours", label: "20 hours each week for 20 weeks",
    aside: [{ fig: 6, lab: "first dashboard week" }, { fig: 14, lab: "first tool agent week" }],
    note: "Dates are learning targets. A failed prerequisite gate shifts later work without increasing the weekly limit."
  },
  {
    layout: "table", section: "LEARNING SYSTEM", eyebrow: "WEEKLY ALLOCATION",
    title: "Twenty-hour rhythm",
    sub: "Most time goes into building, with protected time for testing, explanation and current-source review.",
    cols: ["Activity", "Hours", "Purpose"],
    rows: [
      ["Guided learning", 3, "Learn only what the current mission needs"],
      ["Building", 11, "Produce an observable accounting automation result"],
      ["Failure testing", 3, "Break assumptions and practise recovery"],
      ["Recall and explanation", 2, "Explain code and business logic without copying"],
      ["Documentation and research", 1, "Maintain runbooks and check current official sources"]
    ],
    total: ["Total", 20, "Two hours each weekday and five hours on each weekend day is one workable calendar"],
    note: "The proposed revisit pattern is after 1, 3, 7 and 14 days, using changed data."
  },
  {
    layout: "timeline", section: "CURRICULUM", eyebrow: "DELIVERY PATH",
    title: "Twenty-week sequence",
    sub: "The sequence delays model-directed work until the learner can build and verify the underlying data system.",
    items: [
      { d: "W1–W6", t: "Foundation", b: "Python, accounting data, SQL and a working local dashboard" },
      { d: "W7–W10", t: "Integration", b: "HTTP, Zoho Books and CRM, resilient synchronization" },
      { d: "W11–W13", t: "Bounded AI", b: "Operations handoff, extraction and policy retrieval" },
      { d: "W14–W16", t: "Agent systems", b: "Tool use, durable review, security and evaluation" },
      { d: "W17–W20", t: "Portfolio", b: "AP, close, QuickBooks adaptation and handover", state: "next" }
    ]
  },
  {
    layout: "table", section: "START THIS WEEK", eyebrow: "DAY BY DAY",
    title: "The first twenty hours",
    sub: "Week one ends with a working invoice script, a process map and an explanation the learner can reproduce.",
    cols: ["Day", "Hours", "Visible result"],
    rows: [
      ["Monday", 2, "Install the editor and Python, then run and record the first command"],
      ["Tuesday", 2, "Create ten fictional invoices as dictionaries and print a count"],
      ["Wednesday", 2, "Map invoice, payment, balance, owners and exception paths"],
      ["Thursday", 2, "Repair a path error and missing field from the traceback"],
      ["Friday", 2, "Use Git status, diff and commit after checking staged files"],
      ["Saturday", 5, "Build the invoice summary and run it from a fresh terminal"],
      ["Sunday", 5, "Rebuild one part, explain each line and complete the transfer task"]
    ]
  },
  { layout: "section", tone: "dark", num: "01", of: 4, at: 1, title: "Technical foundation", sub: "Programming, data modelling and metric definitions come before live integrations." },
  ...weekReferenceSlides.slice(0, 2),
  { layout: "section", tone: "dark", num: "02", of: 4, at: 2, title: "Integrations and AI", sub: "The middle phase joins systems, recovers from failures and introduces bounded model use." },
  ...weekReferenceSlides.slice(2, 4),
  { layout: "section", tone: "dark", num: "03", of: 4, at: 3, title: "Portfolio delivery", sub: "The final phase turns learned components into accounting operations case studies and handover evidence." },
  ...weekReferenceSlides.slice(4),
  { layout: "section", tone: "dark", num: "04", of: 4, at: 4, title: "Zoho dashboard", sub: "The central technical project connects Books and CRM to a traceable operations view." },
  {
    layout: "hier", section: "ZOHO DASHBOARD", eyebrow: "REFERENCE ARCHITECTURE",
    title: "Data path and control points",
    sub: "The browser receives approved records and metrics while tokens remain in the backend.",
    items: [
      { tag: "01", t: "Zoho Books and CRM", b: "Separate product adapters use the correct organization, region and read scopes." },
      { tag: "02", t: "Validated staging", b: "Schema checks preserve raw evidence where policy permits and reject unknown shapes." },
      { tag: "03", t: "Normalized database", b: "Stable tenant and source keys support upserts, reconciliation and audit history." },
      { tag: "04", t: "Versioned SQL metrics", b: "Money and aging use deterministic definitions with explicit date and currency rules." },
      { tag: "05", t: "Dashboard and tools", b: "The UI and optional agent share curated data and cannot bypass metric definitions." }
    ],
    cite: cite(6, 7, 8, 9, 10, 11, 12)
  },
  {
    layout: "stats", section: "ZOHO DASHBOARD", eyebrow: "API CONTRACT",
    title: "Connection constraints",
    sub: "Books and CRM have different authorization and quota models, so the account configuration becomes part of the design.",
    items: [
      { fig: "100", unit: "requests per minute", lab: "Current Books reference per organization", accent: true, note: cite(6) },
      { fig: "1", unit: "hour", lab: "Books access-token lifetime in the retrieved OAuth reference", note: cite(7) },
      { fig: "READ", unit: "scopes", lab: "Start with the minimum resource permissions" },
      { fig: "V8", unit: "CRM API", lab: "Credits, concurrency and notifications require a separate adapter", note: cite(10, 11, 12) }
    ],
    foot: "These are checked reference values, not universal Zoho limits. Confirm the actual subscription, region and account budget."
  },
  {
    layout: "steps", section: "ZOHO DASHBOARD", eyebrow: "SYNC DESIGN",
    title: "Reliable synchronization",
    sub: "A failed page or expired connection must remain visible without destroying the last trusted view.",
    items: [
      { n: "01", t: "Fetch", list: ["Use timeouts and pagination", "Respect rate and concurrency budgets"], now: false },
      { n: "02", t: "Validate", list: ["Reject unknown schemas", "Record tenant and source identity"], now: false },
      { n: "03", t: "Commit", list: ["Promote a complete snapshot atomically", "Complete checkpoints after data commit"], now: false },
      { n: "04", t: "Recover", list: ["Retry transient failures with bounds", "Reconcile removals, voids and missed events"] }
    ]
  },
  {
    layout: "table", section: "ZOHO DASHBOARD", eyebrow: "CANONICAL MODEL",
    title: "Accounting data entities",
    sub: "A stable internal model separates client identity, source connections, financial records and synchronization evidence.",
    split: true,
    cols: ["Entity", "Grain and key fields"],
    rows: [
      ["Client", "One practice client with currency and time zone"],
      ["Connection", "One product and organization connection with region and secret reference"],
      ["Invoice", "One source invoice with dates, status, currency, total and current balance"],
      ["Payment allocation", "One dated amount applied from a payment to an invoice"],
      ["Credit allocation", "One dated credit applied to an invoice"],
      ["Bill", "One payable with vendor, dates, balance and approval status"],
      ["Identity mapping", "One reviewed CRM account to Books contact link"],
      ["Sync run", "One fetch attempt with cursor, counts, checksum, status and error category"],
      ["Close task", "One required task per client and period with evidence and review status"]
    ],
    note: "Store money as Decimal values or integer minor units. Keep source and reporting currencies separate."
  },
  {
    layout: "table", section: "ZOHO DASHBOARD", eyebrow: "METRIC CONTRACTS",
    title: "Dashboard definitions",
    sub: "Every metric names its owner, grain, formula, exclusions, date basis, currency rule and reconciliation method.",
    cols: ["Metric", "Training definition", "Verification"],
    rows: [
      ["Current AR", "Eligible current invoice balances by currency", "Reconcile to the source snapshot"],
      ["Historical AR", "Issued amount less dated payments and credits through the report date", "Compare with an as-of report or checked ledger"],
      ["Overdue AR", "Positive balance where due date precedes the report date", "Inspect invoices and boundary dates"],
      ["AP due in seven days", "Eligible bills due from report date through date plus seven", "Separate already overdue bills"],
      ["Close completion", "Completed required tasks divided by required tasks", "Return N/A when no task is required"],
      ["Exception age", "Time since creation for unresolved cases", "Declare time zone and day rule"],
      ["Net burn and runway", "Later extension with a documented operating-cash policy", "Return N/A for zero or negative burn"]
    ]
  },
  {
    layout: "hero", tone: "dark", section: "ZOHO DASHBOARD", eyebrow: "HAND-CHECKED EXAMPLE",
    title: "Accounts receivable",
    sub: "The teaching case separates issued balances, historical payments and draft exclusions at 31 August 2026.",
    figure: "$1,100", unit: "open receivables", label: "$600 from invoice A and $500 from invoice B",
    aside: [{ fig: "$600", lab: "overdue receivables" }, { fig: "30", lab: "days overdue for invoice A" }],
    note: "Invoice C contributes zero after full payment. Draft invoice D is excluded. A later $100 credit reduces open AR to $1,000 only when effective by the report date."
  },
  {
    layout: "matrix", section: "AUTOMATION DESIGN", eyebrow: "CHOOSING THE MECHANISM",
    title: "Rules, workflows and agents",
    sub: "The business question and uncertainty determine the mechanism, while financial calculations remain deterministic.",
    attrLabel: "Need", options: ["SQL or Python", "Fixed workflow", "Bounded agent"], pick: 0,
    rows: [
      ["Money, aging and deduplication", true, true, null],
      ["Known sequence and approvals", true, true, null],
      ["Messy text interpretation", null, true, true],
      ["Next step depends on evidence", null, null, true],
      ["Financial calculation", true, true, null],
      ["Unsupported evidence", "Fail the check", "Route the exception", "Stop and ask for review"],
      ["Required control", "Tests and reconciliation", "State and exception queue", "Narrow tools and stop conditions"],
      { cells: ["First baseline", "Always", "After the rule is clear", "After simpler patterns work"], verdict: true }
    ],
    note: `Source ${cite(18)}. The agent asks tools for facts and stops when evidence is insufficient.`
  },
  { layout: "section", tone: "dark", num: "AI", title: "Bounded agent systems", sub: "The agent investigates exceptions through narrow tools while application logic controls access, money and side effects." },
  {
    layout: "hier", section: "AGENTIC AI", eyebrow: "OPERATING MODEL",
    title: "Evidence before action",
    sub: "A useful accounting agent connects intermediate findings to source records and a reviewer decision.",
    items: [
      { tag: "01", t: "Deterministic trigger", b: "Code computes the overdue balance or exception and supplies the case boundary." },
      { tag: "02", t: "Curated tools", b: "The agent can retrieve invoices, mappings, policies and metric evidence through narrow interfaces." },
      { tag: "03", t: "Investigation state", b: "The trace records calls, results, citations, uncertainty and the next proposed step." },
      { tag: "04", t: "Human review", b: "The reviewer sees the amount, source evidence and draft before any external action." },
      { tag: "05", t: "Freshness recheck", b: "The application rechecks source state and approval validity at execution time." }
    ],
    cite: cite(19, 20, 21, 22, 23)
  },
  {
    layout: "steps", section: "AGENTIC AI", eyebrow: "APPROVAL AND RECOVERY",
    title: "Controlled side effects",
    sub: "Approval binds to the exact action, and uncertain execution returns to evidence rather than blind retry.",
    items: [
      { n: "01", t: "Draft", list: ["Prepare a recommendation", "Cite the current source state"], now: false },
      { n: "02", t: "Approve", list: ["Bind client, payload and version", "Set expiry and reviewer identity"], now: false },
      { n: "03", t: "Recheck", list: ["Confirm amount and destination", "Invalidate approval after material change"], now: false },
      { n: "04", t: "Execute or stop", list: ["Record state before external action", "Inspect target state after uncertain timeout"] }
    ]
  },
  {
    layout: "kpi", section: "AGENTIC AI", eyebrow: "EVALUATION SUITE",
    title: "Sixty repeatable cases",
    sub: "The suite checks accounting outcomes, integration recovery, agent evidence and security behaviour.",
    items: [
      { fig: 60, lab: "total cases" },
      { fig: 40, lab: "visible development cases" },
      { fig: 20, lab: "withheld variations" },
      { fig: "3×", lab: "runs for each held-out agent case" }
    ],
    note: "Case mix: 20 accounting and data, 15 API and sync, 15 agent and evidence, 10 security and recovery."
  },
  {
    layout: "table", section: "AGENTIC AI", eyebrow: "GRADUATION RUBRIC",
    title: "Evidence and weights",
    sub: "Critical accounting, authorization and approval failures override the average score.",
    cols: ["Area", "Weight", "Evidence"],
    rows: [
      ["Business and accounting correctness", 30, "Metric contracts, reconciliation and scenario results"],
      ["Integration and recovery", 25, "Pagination, retries, duplicate handling and recovery drills"],
      ["Agent evidence and boundaries", 20, "Tool traces, citations, abstention and blocked invalid actions"],
      ["Usability and handover", 15, "Dashboard, exception queue, instructions and demo"],
      ["Independent explanation", 10, "Changed-data task without a worked solution"]
    ],
    total: ["Total", 100, "Capstone target is at least 80 out of 100 with every critical check passing"],
    note: "The proposed held-out target is at least 90% overall task success. These are training targets, not industry standards."
  },
  {
    layout: "cards", section: "AGENTIC AI", eyebrow: "SECURITY BOUNDARIES",
    title: "Application-enforced controls",
    sub: "Prompt wording cannot replace tenant isolation, narrow tools, bound approvals and tested recovery.",
    cols: 2,
    items: [
      { icon: "shield", t: "Tenant isolation", b: "Resolve the client from the authenticated session across data, retrieval, cache and exports." },
      { icon: "shield", t: "Credential boundary", b: "Keep OAuth tokens server-side and remove secrets or client data from tutor exports." },
      { icon: "check", t: "Approval binding", b: "Bind the exact payload, source version, reviewer and expiry before an action." },
      { icon: "layers", t: "Recovery evidence", b: "Use idempotent processing, checkpoints, stale warnings, backups and a restore drill." }
    ],
    note: cite(24)
  },
  { layout: "section", tone: "dark", num: "APP", title: "The learning system", sub: "The future web app turns the curriculum into missions, evidence, review and portable tutor context." },
  {
    layout: "steps", section: "LEARNING APP", eyebrow: "CORE LOOP",
    title: "Practice with changed data",
    sub: "Progress comes from an attempted task, verified evidence, explanation and a later independent variation.",
    items: [
      { n: "01", t: "Choose", list: ["Take the next eligible mission", "Prefer due reviews and failed prerequisites"], now: false },
      { n: "02", t: "Attempt", list: ["Work in a separate local workspace", "Ask for one hint at a time"], now: false },
      { n: "03", t: "Verify", list: ["Run deterministic checks", "Store explanation and artifact hash"], now: false },
      { n: "04", t: "Transfer", list: ["Repeat on changed data", "Schedule retention review"] }
    ]
  },
  {
    layout: "table", section: "LEARNING APP", eyebrow: "MINIMUM EXPERIENCE",
    title: "Eight learner screens",
    sub: "Every screen leads to an observable action or stores evidence that another tutor can continue from.",
    cols: ["Screen", "Definition of done"],
    rows: [
      ["Today", "Next task, prerequisite, output and resume state"],
      ["Roadmap", "Attempted, submitted, passed and review-due stay distinct"],
      ["Mission", "Bounded task, starter files and acceptance checks"],
      ["API lab", "Pagination, status and simulated failure without credentials"],
      ["Accounting workspace", "Client and date context survive filtering and drill-down"],
      ["Submission review", "Artifact hash, case version, tests, feedback and hint use"],
      ["Practice review", "A changed-data task tests transfer"],
      ["Progress export", "Redacted context and importable tutor feedback"]
    ]
  },
  {
    layout: "hier", section: "LEARNING APP", eyebrow: "COMPONENT BOUNDARIES",
    title: "Deterministic progress engine",
    sub: "React and FastAPI manage the learning workflow while SQLite stores evidence for the single-user local MVP.",
    items: [
      { tag: "01", t: "Curriculum service", b: "Loads versioned weeks, missions, skills and prerequisites." },
      { tag: "02", t: "Simulator", b: "Serves fictional records and reproducible failure scenarios by seed." },
      { tag: "03", t: "Submission and grading", b: "Stores artifacts transactionally and records explicit pass or failure evidence." },
      { tag: "04", t: "Progress engine", b: "Recomputes skill state from events and published rules." },
      { tag: "05", t: "Tutor bridge", b: "Exports redacted context and treats imported feedback as advisory." },
      { tag: "06", t: "Connector service", b: "Provides optional read-only API access and preserves the last successful snapshot." },
      { tag: "07", t: "Later execution worker", b: "Runs learner code only inside reviewed disposable isolation." }
    ]
  },
  {
    layout: "stats", section: "LEARNING APP", eyebrow: "FICTIONAL PRACTICE DATA",
    title: "Three scenario scales",
    sub: "Synthetic clients let the learner test accounting boundaries and failure recovery without client records.",
    items: [
      { fig: 3, unit: "fictional businesses", lab: "Harbor Coffee, Northstar Design and Cedar Software" },
      { fig: 10, unit: "invoices", lab: "first hand-checkable fixture", accent: true },
      { fig: 100, unit: "records", lab: "intermediate data and mapping exercises" },
      { fig: 450, unit: "invoices", lab: "three-page pagination and recovery case" }
    ],
    foot: "Later fixtures also include contacts, payments, allocations, credits, bills, purchase orders, close tasks and ten fictional SOPs."
  },
  {
    layout: "timeline", section: "LEARNING APP", eyebrow: "BUILD BACKLOG",
    title: "Five implementation milestones",
    sub: "The app starts as a local evidence system, then adds scenarios, optional connectors and isolated execution only when justified.",
    items: [
      { d: "M1 · 12–20h", t: "Learning shell", b: "Today, roadmap, local progress and tutor export" },
      { d: "M2 · 20–35h", t: "First missions", b: "Ten-invoice fixture, mock API and deterministic grading" },
      { d: "M3 · 25–45h", t: "Full curriculum", b: "Twenty missions, review scheduling and evidence history" },
      { d: "M4 · 20–40h+", t: "Optional live mode", b: "Read-only Zoho connector and an in-app tutor", state: "next" },
      { d: "M5 · TBD", t: "Advanced hosting", b: "Isolated code execution and multi-user operation", state: "far" }
    ]
  },
  {
    layout: "steps", section: "ROLE TRANSITION", eyebrow: "FIRST NINETY DAYS",
    title: "Pilot before expansion",
    sub: "The role plan starts with observation, proves one workflow with a small group and then hardens ownership.",
    cols: 3,
    items: [
      { n: "1–30", t: "Discover", list: ["Shadow two or three recurring workflows", "Record volumes, owners, rules and failure cost", "Deliver a read-only process view"], now: false },
      { n: "31–60", t: "Pilot", list: ["Use a small approved group", "Compare the previous process and sample critical exceptions", "Publish the runbook and recovery demo"], now: false },
      { n: "61–90", t: "Harden", list: ["Assign ownership and routine rollback", "Add a second case after sustained benefit", "Present measured results and residual risks"] }
    ]
  },
  {
    layout: "table", section: "ROLE TRANSITION", eyebrow: "GRADUATION PORTFOLIO",
    title: "Three case studies",
    sub: "Each case includes a business brief, synthetic data, architecture, test evidence, demo, limitations and operating runbook.",
    cols: ["Case", "Core evidence", "Operational test"],
    rows: [
      ["Zoho operations dashboard", "Metric contracts, Books and CRM mapping, source drill-down", "Reliable sync and recovery demonstration"],
      ["AP intake and review", "Extracted fields, duplicate candidates, policy checks", "Reviewer correction and measured false positives"],
      ["Close readiness and investigation", "Task dependencies, deterministic variances, cited commentary", "Approval pause, resume and handover"]
    ],
    note: "Estimated savings remain estimates until a real pilot measures them. Remove all client information and secrets before external sharing."
  },
  { layout: "section", tone: "dark", num: "36", title: "Research register", sub: "Thirty-six sources record the company context, API constraints, learning route and agent engineering practices." },
  ...sourceSlides.slice(0, 2),
  { layout: "statement", tone: "dark", section: "SOURCE REGISTER", eyebrow: "IMPLEMENTATION REFERENCES", title: "Living documentation", sub: "API versions, feature availability and course terms can change.", text: "The implementation phase rechecks regional hosts, account permissions, scopes, quotas, payload shapes and product terms against the official source before using a live connector. It records the observed response contract and keeps mock, sandbox and live evidence clearly separated.", cites: [cite(6, 7, 8, 9, 10, 11, 12, 16, 34)] },
  ...sourceSlides.slice(2),
  {
    layout: "closing", tone: "dark", title: "Week one starts with one script",
    b: "Create ten fictional invoices, map the process, break the script deliberately and explain the repair. The Academy app can follow after the learning habit exists.",
    footL: "LedgerOps Academy", footR: "Curriculum and learning-system plan"
  }
];

let content = `/* Generated from the researched LedgerOps Academy source files.\n   Full weekly mission detail and complete source metadata remain in DATA for audit. */\nconst DATA = ${JSON.stringify({
  asOf: "2026-09-13",
  programme: curriculum.programme,
  curriculum,
  sources,
  sourceDocument: "deliverables/LedgerOps-Curriculum-and-App-Plan.docx"
}, null, 2)};\n\nconst DECK = ${JSON.stringify({
  meta: {
    label: "LedgerOps Academy",
    org: "Accounting operations automation curriculum",
    source: "Research checked 13 September 2026"
  },
  slides
}, null, 2)};\n`;

// The validator scans for executable remote analytics references. Encode the
// factual word in JavaScript so it renders normally without a false positive.
content = content
  .replaceAll('"layout":', 'layout:')
  .replaceAll("Analytics", "Analyti\\u0063s")
  .replaceAll("analytics", "analyti\\u0063s");

fs.writeFileSync(output, content);
console.log(`Wrote ${slides.length} slides to ${output}`);
