# What accounting automation can do

Use normal rules for exact calculations and known steps. Use AI for messy text, search and drafts. Use an agent when the next step depends on what the system discovers.

| Pattern | Example | Best starting method | Important control |
| --- | --- | --- | --- |
| Dashboard | Open invoices and close status | API + database + fixed calculations | Every number links to source records |
| Data sync | Copy Zoho Books invoices into a reporting store | Scheduled workflow | Pagination, retries and last-good data |
| Document intake | Read fields from emailed invoices | AI extraction inside a fixed workflow | Schema checks and human review |
| Matching | Link CRM clients to accounting contacts | Rules plus review queue | Never match on name alone |
| Routing | Assign missing documents or exceptions | Fixed workflow | One event creates one open task |
| Reconciliation help | Find records that do not agree | Fixed calculations plus AI explanation | AI cannot change the calculated result |
| Policy assistant | Answer an SOP question | Search plus AI answer | Cite the correct policy and stop if absent |
| Exception investigation | Check why an invoice looks unpaid | Small read-only agent | Narrow tools, step limit and saved evidence |
| Draft communication | Prepare a reminder or status update | AI draft | A person approves before sending |
| Controlled action | Update a task after approval | Fixed action after review | Recheck the source and prevent duplicates |

## What not to automate first

- Moving money or posting accounting entries without review.
- A broken process whose owner and rules are unknown.
- A dashboard whose numbers have no written definition.
- A broad agent with access to every client and tool.
- A task that happens rarely and costs more to maintain than it saves.

## The decision rule

1. Can a simple rule solve it? Use the rule.
2. Are the steps known but one input is messy? Use a fixed workflow with one AI step.
3. Must the next step change after new evidence appears? Consider a small agent.
4. Can an error harm money, clients or compliance? Add human review and a safe stop.
