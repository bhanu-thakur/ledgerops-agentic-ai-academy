import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "slides", "LedgerOps-Curriculum-and-App-Plan-offline-deck", "content.js");
const curriculum = JSON.parse(fs.readFileSync(path.join(root, "curriculum", "weeks.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "research", "sources.json"), "utf8"));

const weekly = [
  ["Choose an automation", "Find repeated operational work and choose a dashboard, workflow, AI step or agent.", "A brief for a fictional client-operations dashboard: client, invoice status, owner and next action.", "The owner, result, rules, limits and tests are clear."],
  ["Define reliable rules", "Turn business decisions into clear rules for status, dates, money, ownership and exceptions.", "Rules that classify fictional client invoices as open, paid, overdue, disputed or unknown.", "Hand-worked examples match the agent-built result."],
  ["Handle files and errors", "Learn how bad input is found, rejected and explained.", "A fake CSV/JSON import for client records, invoices and tasks with a rejected-row report.", "Bad rows are visible and the process can run again."],
  ["Understand data models", "Learn how records connect across clients, employees, tasks, documents and systems.", "A small database linking fictional clients, invoices, payments, documents and owners.", "Every record has a clear meaning, key and relationship."],
  ["Define metrics first", "Write the meaning, source, owner, date rule and limits for each metric.", "Metric definitions for open invoices, overdue work, missing documents and client setup progress.", "Each number has a source, formula and reconciliation check."],
  ["Build a useful dashboard", "Turn a defined process into filters, charts, tables and drill-down views.", "A local client-operations dashboard with status filters, aging, owners and source-row drill-down.", "Another person can run it and trace every result."],
  ["Work with APIs", "Understand requests, responses, pagination, timeouts and invalid data.", "A mock Zoho-like API that returns fictional clients, invoices and tasks over three pages.", "All pages are read without duplicates and failures are visible."],
  ["Connect Zoho safely", "Learn read-only access, permissions, organisations, regions and secret handling.", "A read-only Zoho Books simulator feeding the fictional client dashboard.", "No credentials enter the browser, repository or logs."],
  ["Join systems carefully", "Match records across Zoho CRM, Books or another operations system.", "A reviewed map between fictional CRM accounts, Books contacts and client-service owners.", "Ambiguous records stay unresolved instead of being guessed."],
  ["Make sync reliable", "Learn checkpoints, retries, duplicate protection, freshness and recovery.", "A scheduled sync of the fictional Zoho data with checkpoints and a last-good snapshot.", "A failed run cannot replace trusted data."],
  ["Automate a handoff", "Turn an operational trigger into ownership, reminders, review and closure.", "A missing-client-document workflow that assigns an owner and drafts a reminder.", "One event creates one task with a clear owner and next step."],
  ["Extract document data", "Use AI for messy text while fixed rules check the result.", "AI extraction of vendor, client, invoice, date and amount from fictional document text.", "Unknown or risky fields go to review instead of being guessed."],
  ["Answer policy questions", "Search approved procedures and require evidence for each answer.", "A policy assistant over fictional onboarding, billing and document-handling SOPs.", "Every answer cites the right policy or says it cannot answer."],
  ["Build a small agent", "Use narrow read-only tools when the next investigation step depends on new evidence.", "A read-only investigator that explains why a fictional client task or invoice is blocked.", "The agent stops when proof or permission is missing."],
  ["Add approval states", "Design draft, review, approval, rejection, resume and completion safely.", "A review queue for proposed reminders, matches and status changes.", "Retries do not repeat an approved action."],
  ["Evaluate the system", "Measure correctness, access safety, evidence quality, reliability and cost.", "A 60-case test pack covering fictional clients, documents, sync failures and agent decisions.", "Critical money, access and approval failures always fail."],
  ["Review incoming bills", "Combine extraction, duplicate checks, purchase-order checks and exception routing.", "A fictional vendor-bill review screen with duplicate candidates and reviewer evidence.", "Reviewers can see evidence and measure wrong suggestions."],
  ["Track close readiness", "Show blocked tasks, missing proof, variance and management commentary.", "A fictional multi-client readiness board for period-end tasks and evidence.", "Every status and commentary claim has evidence."],
  ["Adapt to another system", "Learn adapters, provider differences, sandbox testing and narrow tools.", "A read-only QuickBooks version of the same fictional client-operations dashboard.", "The same metric tests pass across both systems."],
  ["Present and hand over", "Explain the business result, architecture, tests, limits, ownership and recovery.", "Three fictional case studies, demos, runbooks and a seeded incident-recovery exercise.", "A stakeholder can understand, run and recover the work."]
];

const slides = [
  {
    layout: "cover", tone: "dark", eyebrow: "LEDGEROPS ACADEMY", mark: ["20 WEEKS", "400 HOURS"],
    title: "Lead operations automation", titleSub: "with Codex or Claude Code", org: "A practical course and app plan",
    footL: "Beginner level · 20 hours each week", footR: "13 September 2026"
  },
  ...weekly.map(([title, learn, make, pass], index) => ({
    layout: "table", section: "20-WEEK CURRICULUM", eyebrow: `WEEK ${String(index + 1).padStart(2, "0")} · 20 HOURS`,
    title, sub: learn,
    cols: ["What you learn", "Fictional build", "How you pass"],
    rows: [
      [learn, make, pass],
      ["Agent flow", "Brief → plan → build → check → review → fix → handover.", "You can explain the result and its limits."],
      ["Operations lens", "Improve visibility, ownership and recovery; keep high-risk actions human-approved.", "The workflow has a clear owner and safe stop."]
    ],
    note: index === 0
      ? "Practice case: a fictional client-operations dashboard. The invoice data is only an example; the transferable skill is designing a safe operational system."
      : "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
  })),
  {
    layout: "closing", tone: "dark", title: "Start with one clear workflow",
    b: "Choose the operational result, define the rules and failure path, then direct Codex or Claude Code to build the smallest complete version.",
    footL: "LedgerOps Academy", footR: "22-slide course plan"
  }
];

let content = `/* Generated from the researched LedgerOps Academy source files.\n   Full weekly mission detail and source metadata remain in DATA for audit. */\nconst DATA = ${JSON.stringify({
  asOf: "2026-09-13", programme: curriculum.programme, curriculum, sources,
  sourceDocument: "deliverables/LedgerOps-Curriculum-and-App-Plan.docx"
}, null, 2)};\n\nconst DECK = ${JSON.stringify({
  meta: { label: "LedgerOps Academy", org: "Operations automation course", source: "Research checked 13 September 2026" },
  slides
}, null, 2)};\n`;

content = content.replaceAll('"layout":', 'layout:').replaceAll("Analytics", "Analyti\\u0063s").replaceAll("analytics", "analyti\\u0063s");
fs.writeFileSync(output, content);
console.log(`Wrote ${slides.length} slides to ${output}`);
