# Receivables dashboard process map

## Business question

Which invoices are open, which are overdue, and which source records make up each number?

## Current process

| Step | Person or system | Input | Action | Output | Common problem |
| --- | --- | --- | --- | --- | --- |
| 1 | AR Specialist | Zoho Books UI | Manually export invoices to CSV | Raw spreadsheets | Export cuts off or misses recent credit updates |
| 2 | AR Specialist | Spreadsheet | Manually filter statuses and calculate aging formulas | Static summary sheet | Human formula error; USD & INR mixed; drafts included |
| 3 | Finance Lead | Static sheet | Review totals and ask questions via email | Ad-hoc email threads | Headline totals cannot open source invoice IDs |
| 4 | Operator | Email threads | Manually cross-check invoice IDs in Zoho Books | Unverified notes | Out-of-date sheet versions lead to disputed collections |

## Improved process

| Step | Person or system | Action | Check | If the check fails |
| --- | --- | --- | --- | --- |
| 1 | Scheduler | Request all invoice pages | Page count is complete | Keep the last good dashboard and show stale data |
| 2 | Sync service | Check and store source records | IDs and required fields are valid | Send bad records to an error report |
| 3 | Metric service | Calculate open and overdue amounts | Totals match hand-worked examples | Stop publication and show the failed check |
| 4 | Dashboard | Show totals and source rows | Every number can be opened | Show an empty or error state |
| 5 | Operator | Review exceptions | Owner and next action are present | Assign the exception for follow-up |

## Owner and success measure

- Process owner: Head of Accounting Operations
- Dashboard user: Accounts Receivable Specialist and Billing Leads
- Data owner: Zoho Books Systems Administrator
- Baseline time or problem: 45 minutes daily spent exporting spreadsheets, fixing broken formula filters, and cross-checking currencies.
- Expected improvement: Zero manual spreadsheet manipulation; instant deterministic aging breakdown with full source ID drilldown.
- Measure after the pilot: Daily receivables review time reduced from 45 minutes to under 5 minutes, with zero multi-currency mixing errors.
