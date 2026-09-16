# Implementation review checklist
 
## Business fit

- [x] The user and decision are clear. (Finance Lead & AR Specialist; collection escalation and AR reconciliation).
- [x] The automation removes a real step or makes an important problem visible. (Eliminates 45-min daily spreadsheet collation; makes overdue debt and corrupt records visible).
- [x] A simpler rule or built-in product feature was considered. (Evaluated Zoho native reporting; custom dashboard chosen to isolate teaching rules, exception quarantine, and source ID lineage).
- [x] The success measure can be checked during a pilot. (Target: AR daily review under 5 minutes; 0 currency contamination errors).

## Data and accounting

- [x] Every input has a source and stable ID. (Composite key with `invoice_id`, `customer_id`, `customer_name`, and dates).
- [x] Every metric has a written formula, date rule and currency rule. (Overdue = `due_date < report_date` and `balance > 0`; UTC calendar days; USD/INR isolated).
- [x] Headline numbers open into the records behind them. (Interactive drilldown and `invoice_ids` lineage preserved on all KPI and aging cards).
- [x] Empty, missing and conflicting data are visible. (Corrupt records quarantined into dedicated Exceptions panel with failure reasons).

## Automation and AI

- [x] Fixed rules calculate money and dates. (Integer minor-unit/cents math; deterministic UTC calendar diff).
- [x] AI is used only for text, search, drafts or changing investigation paths. (Core financial math and aging logic are 100% rule-based and deterministic).
- [x] The agent has only the tools and clients needed for the task. (Zero-dependency local node architecture; read-only access).
- [x] Missing proof makes the agent stop or ask for review. (Quarantine validator stops unverified records from polluting financial aggregates).

## Failure and recovery

- [x] Repeating a run does not duplicate work. (Idempotent sync and atomic snapshot replacement).
- [x] A partial or failed sync cannot replace the last good data. (On sync failure, previous valid snapshot is preserved intact).
- [x] The user can see when data is old. (Prominent amber Stale Data alert banner and red status pill display failure time and error details).
- [x] The runbook explains the first recovery action and owner. (Step-by-step failure scenarios and recovery actions documented in README.md).

## Release decision

- [x] All critical checks pass. (9/9 automated tests passing in tests/acceptance.test.js).
- [x] Known limits are written down. (Fictional data only, unapplied credits deferred, UTC calendar basis).
- [x] The pilot group and rollback plan are clear. (Pilot with AR specialist team; instant fallback to standard Zoho manual view if needed).
- [x] A person owns monitoring and support. (Head of Accounting Operations & Systems Administrator).
