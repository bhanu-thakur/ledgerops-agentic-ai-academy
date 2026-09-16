# Implementation brief: fictional Zoho receivables dashboard

Complete every section before sending the build prompt to Codex or Claude Code.

## Outcome

Build a local dashboard that shows open invoices, overdue invoices and aging groups from fictional Zoho-like data. Each total must open into the source invoices.

## Users and decisions

- Main user: Finance Operations Lead / Accounts Receivable Specialist
- Decision they need to make: Which past-due customers require immediate collection follow-up, which invoices are at risk, and which specific source records comprise open/overdue balances.
- How often they need it: Daily operational review and weekly close reconciliation.

## Inputs

- Fictional invoice records.
- Customer name and source customer ID.
- Invoice ID, issue date, due date, status, currency, total and current balance.
- Report date chosen by the user.

## Business rules

- Draft and void invoices do not count.
- An invoice is overdue when it has a positive balance and its due date is before the report date.
- Keep each currency separate.
- Do not guess a missing date, amount, status or currency.

## Required output

- Open invoice total by currency.
- Overdue total by currency.
- Aging groups: current, 1–30, 31–60, 61–90 and over 90 days.
- A table of the invoices behind every number.
- Last successful data time and a clear stale-data warning.

## Permissions and limits

- Use fictional data only in Week 1.
- No live Zoho login.
- No sending messages, changing invoices, posting entries or moving money.
- Keep calculations outside the visual components so they can be tested.

## Acceptance tests

1. Hand-worked sample totals match exactly.
2. Drafts and void invoices are excluded.
3. A due date equal to the report date is not overdue.
4. USD and INR totals are never added together.
5. Missing required data creates a visible error.
6. A failed refresh keeps the last successful view and marks it stale.
7. Every headline number opens the contributing invoices.

## Handover

- One setup command.
- One check command.
- A short explanation of the folders and data flow.
- A failure and recovery guide.
