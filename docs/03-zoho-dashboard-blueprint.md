## 7 Build custom dashboards with Zoho data

### Choose the product and the route

Zoho Books is an accounting source. Zoho CRM holds relationship and sales-process data through a separate API. Zoho Analytics provides a native finance connector and can be an efficient reporting choice.[^13] Deluge provides native scripting, and Zoho Flow offers trigger/action workflows.[^14][^15] Start by deciding whether the need is a report, an operational application, an integration or an agent. These require different amounts of custom engineering.

Use Zoho Analytics when supported connectors and reporting satisfy the requirement. Use a custom Python dashboard when specialised joins, exception handling or a teaching environment justify it. Use a richer React interface later when workflow interaction requires it. Do not introduce a custom financial database solely to reproduce an existing native report.

### Reference architecture

The data path is: Zoho Books and CRM -> backend adapters -> validated staging -> normalized database -> versioned SQL metrics -> dashboard. A scheduled worker refreshes the database. An optional agent calls read-only metric and evidence tools over the same curated data. It cannot bypass the metric definitions or access credentials.

The browser receives approved records and metrics from the backend. OAuth tokens remain server-side. Each data record carries client identity, product, organization ID, external ID, source modification time where available and ingestion time. Each dashboard exposes report date, currency, latest successful sync, selected filters and any unresolved reconciliation warning.

### Zoho API implementation checklist

Zoho Books documents organization IDs and regional API domains. It currently specifies 100 requests per minute per organization, with separate daily plan allowances and concurrent-call limits.[^6] Treat these as checked reference values, not universal Zoho limits; configure the permitted budget after examining the actual account. CRM uses a credit and concurrency model of its own.[^11]

Books OAuth documentation describes scopes, expiring access tokens, refresh tokens and revocation.[^7] Register an appropriate backend client, use the organisation's regional Accounts/API domains, validate OAuth state, request only the required READ scopes and store secrets in a backend secret store. Use the returned API domain subject to a trusted domain allowlist. Expired access can trigger a controlled refresh; a revoked connection must become a visible reauthorization task. Do not put tokens in Git, frontend storage, URLs shown to users, or tutor exports.

Books list endpoints use pagination with page/per_page and page_context; the general guide documents has_more_page.[^8] Fetch the next page until the server says there is no more data. Validate the actual resource response: the invoice reference and generic pagination examples differ in how page_context is illustrated, so confirm the runtime contract and add a fixture for it instead of silently accepting an unknown shape. The invoice API exposes fields including invoice_id, date, due_date, currency_code, total, balance and modification metadata.[^9]

Start with GET /books/v3/organizations and GET /books/v3/invoices, with the documented authorization header and organization_id on organization-scoped requests. These are resource paths; the correct regional host comes from connection configuration. Add contacts, payments, credit notes and bills only when the metric requires them, verifying each endpoint and scope in the live reference. Do not assume a reports endpoint exists because a similar report appears in the UI.

CRM V8 has distinct metadata, core, bulk, query and notification APIs.[^10] Read module/field metadata and use API field names rather than screen labels. Discover the client's custom fields and map IDs explicitly. CRM notifications can cover record changes and have channel expiration, so renewal and missed-event reconciliation belong in the integration design.[^12] Notifications improve freshness; a periodic reconciliation still detects gaps.

### Reliable sync behaviour

Use a unique key consisting of tenant, source product, organization and external record ID. Preserve a raw response snapshot where permitted, validate records into staging, and promote a successful snapshot atomically. A failed middle page must leave the prior successful view available with a stale-data indication. Mark a checkpoint complete only after the corresponding data commit.

Retry transient failures with bounded exponential backoff and jitter; honour a documented server retry instruction when available. Treat authentication, permission and schema failures separately. Use a refresh lock so many workers do not refresh one connection concurrently. Periodically detect source removals and voids. Do not claim exactly-once delivery: support at-least-once ingestion and idempotent processing.

Use update filters only after verifying that the specific endpoint supports them. For small training datasets, a bounded full rescan is easier to explain and validate. For larger datasets, combine a supported incremental cursor, an overlap window, upserts and regular full reconciliation. Store sync history so a discrepancy can be investigated rather than overwritten.

### Minimum canonical data model

| Entity | Grain and important fields |
| --- | --- |
| Client | One practice client; internal tenant ID, name, reporting currency, time zone |
| Connection | One product/organization connection; client ID, product, region, status, secret reference |
| Invoice | One source invoice; composite source key, customer ID, dates, status, currency, total, current balance |
| Payment allocation | One amount applied from a payment to an invoice; effective date and allocation ID |
| Credit allocation | One credit applied to an invoice; effective date, source credit and amount |
| Bill | One payable document; vendor, dates, currency, total, balance and approval status |
| Identity mapping | One reviewed link between CRM account and Books contact; mapping status and evidence |
| Sync run | One fetch attempt; connection, cursor, counts, checksum, status, timings and error category |
| Close task | One required task per client/period; owner, dependencies, evidence and review status |

Store currency amounts as decimal values or integer minor units with explicit precision metadata. Python's Decimal supports exact decimal representation and controlled rounding; construct it from strings rather than binary floats.[^35] Keep source-currency and reporting-currency amounts separate. An invoice alone is insufficient to rebuild complete profit and loss or cash flow statements; those require the appropriate ledger/report data and accounting basis.

### Metric contracts and a hand-checkable exercise

Every metric needs a business owner, grain, formula, inclusion policy, date basis, currency rule, source dependency and a reconciliation method. The dashboard calculates metrics deterministically. Forecasts are separate scenarios with explicit assumptions, not observed transactions.

For a teaching example, use USD and report date 2026-08-31. Only issued, non-void invoices are included. Invoice A totals $1,000, has $400 of payments by the report date and is due August 1. Invoice B totals $500, has no payments and is due September 5. Invoice C totals $800 and is fully paid. Invoice D is a $300 draft and is excluded. There are no credits in this example.

The expected open receivables are $1,100: $600 for A and $500 for B. Overdue receivables are $600. A is 30 days overdue and belongs in the 1-30 day bucket; B is current. C contributes zero and D is excluded. Define buckets as current/due today, 1-30, 31-60, 61-90 and 91+ days. Test all boundaries explicitly.

An optional second case applies a $100 credit to A before the report date, making A $500 and total AR $1,000. A payment on September 2 does not reduce the August 31 historical balance. A present-day API balance cannot, by itself, establish that historical balance; use dated allocations or an authoritative as-of report. Confirm treatment of unapplied credits and adjustments with the process owner before production use.

| Metric | Definition for the training model | Verification |
| --- | --- | --- |
| Current AR | Sum of eligible current invoice balances, separately by currency | Reconcile to source balance view at the same snapshot |
| Historical AR | Issued amount less dated payments/credits through as-of date, with applicable adjustments | Compare to a reference as-of report or hand-checked ledger |
| Overdue AR | Eligible positive balance where due date is before report date | Drill down to invoices and date boundaries |
| AP due in seven days | Eligible unpaid bills with due dates from report date through report date + 7 | Separate already-overdue bills |
| Close completion | Completed required tasks divided by required tasks | Required task count of zero is N/A; show blockers separately |
| Exception age | Time since exception creation for unresolved cases | Use one declared time zone and business/calendar-day rule |
| Net burn and runway | Later extension with documented operating cash definition; runway = available cash / positive monthly net burn | Return N/A for zero/negative burn; exclude restricted cash by policy |

The first dashboard should contain an operations overview, AR aging and drill-down, AP due/overdue, client mapping exceptions and data health. Add close readiness in the later capstone. A nice-looking chart is not complete until a reviewer can identify its source, date, filters and calculation.

[^6]: Zoho. [Zoho Books API Introduction](https://www.zoho.com/books/api/v3/introduction/). Living documentation. Accessed 13 September 2026.

[^7]: Zoho. [Zoho Books API OAuth](https://www.zoho.com/books/api/v3/oauth/). Living documentation. Accessed 13 September 2026.

[^8]: Zoho. [Zoho Books API Pagination](https://www.zoho.com/books/api/v3/pagination/). Living documentation. Accessed 13 September 2026.

[^9]: Zoho. [Zoho Books API Invoices](https://www.zoho.com/books/api/v3/invoices/). Living documentation. Accessed 13 September 2026.

[^10]: Zoho. [Zoho CRM V8 APIs](https://www.zoho.com/crm/developer/docs/api/v8/). Living documentation. Accessed 13 September 2026.

[^11]: Zoho. [Zoho CRM V8 API Limits](https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html). Living documentation. Accessed 13 September 2026.

[^12]: Zoho. [Notifications APIs Overview](https://www.zoho.com/crm/developer/docs/api/v8/notifications/overview.html). Living documentation. Accessed 13 September 2026.

[^13]: Zoho. [Zoho Finance Connector for Zoho Analytics](https://www.zoho.com/analytics/help/connectors/zoho-books.html). Living documentation. Accessed 13 September 2026.

[^14]: Zoho. [Introduction to Deluge](https://www.zoho.com/deluge/help/). Living documentation. Accessed 13 September 2026.

[^15]: Zoho. [Create a Flow from Scratch](https://help.zoho.com/portal/en/kb/flow/user-guide/create-a-flow/building-a-flow/articles/create-a-flow-from-scratch). Living documentation. Accessed 13 September 2026.

[^35]: Python Software Foundation. [Decimal Fixed Point and Floating Point Arithmetic](https://docs.python.org/3/library/decimal.html). Python 3.14 documentation as retrieved. Accessed 13 September 2026.
