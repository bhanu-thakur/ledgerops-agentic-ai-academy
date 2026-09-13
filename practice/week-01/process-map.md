# Receivables dashboard process map

## Business question

Which invoices are open, which are overdue, and which source records make up each number?

## Current process

| Step | Person or system | Input | Action | Output | Common problem |
| --- | --- | --- | --- | --- | --- |
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |
| 4 |  |  |  |  |  |

## Improved process

| Step | Person or system | Action | Check | If the check fails |
| --- | --- | --- | --- | --- |
| 1 | Scheduler | Request all invoice pages | Page count is complete | Keep the last good dashboard and show stale data |
| 2 | Sync service | Check and store source records | IDs and required fields are valid | Send bad records to an error report |
| 3 | Metric service | Calculate open and overdue amounts | Totals match hand-worked examples | Stop publication and show the failed check |
| 4 | Dashboard | Show totals and source rows | Every number can be opened | Show an empty or error state |
| 5 | Operator | Review exceptions | Owner and next action are present | Assign the exception for follow-up |

## Owner and success measure

- Process owner:
- Dashboard user:
- Data owner:
- Baseline time or problem:
- Expected improvement:
- Measure after the pilot:
