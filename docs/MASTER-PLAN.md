# Accounting Operations Automation and Agentic AI Curriculum

## 1 Purpose and recommended route

Prepare for an operations automation role by learning to discover a process, connect its systems, calculate trustworthy metrics, build a usable dashboard, and add carefully bounded AI assistance. The recommended programme is 20 weeks at 20 hours per week, or 400 hours. It starts from beginner coding ability and produces a portfolio of working accounting operations projects. Progress depends on demonstrated skill; the dates are targets, not a guarantee of job readiness.

The central project is LedgerOps Academy, a practice environment with fictional accounting clients, realistic API failures, graded tasks and portable teaching-agent context. The app will supply the business environment and feedback. The learner will implement the automations in a separate workspace and explain the result. This document specifies the app for a later build; the present release contains the research, curriculum and implementation plan.

Start with Python and SQL, deliver a local dashboard by week 6, connect Zoho Books by week 8, and complete a resilient integration by week 10. Introduce language models in week 12 and tool-using agents in week 14. Finish with accounting exception workflows, a QuickBooks adaptation and a portfolio demonstration. Each project should answer a business question before it introduces another technology.

### What performing well means

Success in the role means fewer manual touches, reliable information, faster exception resolution and systems that colleagues can operate after handover. A useful automation includes an owner, input and output contracts, a clear exception queue, a measurable baseline, logs, recovery instructions and a support plan. A convincing demo without these elements is incomplete.

By the end, independently explain an API request, diagnose an authentication or pagination failure, write a SQL join without double-counting, reconcile dashboard totals to source records, and demonstrate an agent declining an unsupported action. Present three polished case studies rather than a large collection of unfinished tutorials.

## 2 Target company research and implications

### Prudent Accountants

Prudent publicly presents bookkeeping, tax, payroll and fractional CFO work as a connected service for small businesses. Its website lists several industries, including hospitality, professional services, retail and nonprofits. These are service descriptions, not a verified account of its internal systems.[^1] Its dedicated bookkeeping and CFO pages make operational accounting and management reporting relevant learning contexts.[^2][^3]

Recommended practice projects are a client onboarding and missing-document queue, a close-readiness dashboard, and an exception summary that supports management reporting. For a hospitality case, use fictional location-level sales and expense data; for a professional-services case, use billing, collections and workload. These are proposed scenarios, not claims that Prudent currently has these problems or uses these tools.

The likely transferable skill is coordinating work across people and applications: determining what is missing, who owns the next step, and which source supports the reported number. Start with an operations manager's queue, then make the financial summary traceable to its supporting transactions.

### Zeni

Zeni describes an AI Accountant that categorizes transactions, supports reconciliation and close, and escalates uncertain categorization. It explicitly says its accounting dashboard runs on QuickBooks Online Plus.[^4] Its AI CFO offering emphasizes financial insight and forecasting.[^5] Treat vendor feature claims as evidence of product direction; they do not independently establish accuracy, time savings, or a particular team's responsibilities.

Recommended practice projects are transaction exception triage, an evidence-backed close review, and a dashboard that separates actuals from forecast assumptions. Add a QuickBooks adapter in week 19 because Zoho expertise alone is not a complete match for Zeni's stated accounting platform. Do not assume Zeni offers a public API for its proprietary agents.

### What to confirm after joining

During onboarding, inventory the actual Zoho products, accounting ledgers, data centers, subscriptions, client permissions, volumes, refresh expectations and process owners. Determine whether Zoho is the financial system, a CRM, or an internal operations system. Confirm how client identities map across applications and which platform owns each field. No public evidence reviewed here establishes Prudent's internal stack or Zeni's internal operations stack.

## 3 What is changing in accounting AI

### AI is moving inside the accounting product

Zoho's current Books help describes Ask Zia, a CoCreate Agent, report forecasting and anomaly features; it separately labels some AI field capabilities as early access.[^16] Intuit announced accounting and payments agents in 2025, covering bookkeeping assistance and receivables workflows.[^17] Together with Zeni's offering, this supports a practical conclusion: inspect existing product capabilities before building a replacement.

A custom tool is most defensible when it joins multiple systems, implements firm-specific review rules, gives a specialised operations view, or makes an exception process easier to manage. Compare native configuration against custom development using the same sample cases, permissions and acceptance criteria. A product announcement does not establish feature availability for a particular region, edition or customer account.

### Agent engineering increasingly depends on context and evaluation

Agent engineering includes selecting relevant information, exposing useful tools, persisting progress and checking outcomes. Anthropic's context guidance discusses selective retrieval and durable notes; its tool guidance stresses clear, bounded interfaces.[^19][^20] These are more transferable learning targets than memorising one framework's syntax.

Evaluation should inspect both the final result and what the agent actually did. Anthropic's 2026 evaluation guidance distinguishes code, model and human graders and recommends repeated trials for variable model behaviour.[^21] For accounting, calculate balances with code, inspect tool arguments and evidence references, and use an accountant's judgment for ambiguous accounting treatment. A fluent narrative is not proof that the underlying task succeeded.

### Interoperability and durable execution are useful later

MCP standardises how an AI application connects to tools and data; it does not provide the business rules or magically make access safe.[^23] LangGraph supports stateful workflows, persistence and human intervention, making it relevant when a review must pause and resume.[^22] Learn a plain tool loop before adopting either. Browser automation is an option for a genuine API gap; treat UI changes and uncertain outcomes as failure cases.

### A practical monthly watch routine

Spend the existing weekly research hour on official Zoho release/help pages, Intuit developer and product announcements, Zeni product pages, framework releases and OWASP guidance. Record: what changed, source date, actual availability, affected workflow, migration burden, measurable hypothesis and one small test. Adopt only after the existing regression suite still passes and the new feature improves a relevant measure. Do not rebuild the curriculum every time a new model or framework appears.

## 4 When to use rules workflows and agents

A deterministic automation follows explicit instructions: fetch pages, validate dates, aggregate balances and flag overdue records. An AI-assisted workflow keeps the sequence fixed but uses a model for a bounded task, such as extracting invoice fields. An agent chooses among permitted tools and next steps based on intermediate results. Anthropic makes a similar distinction between prescribed workflows and model-directed agents and recommends starting with simpler patterns.[^18]

Use SQL or Python for money, aging, deduplication and metric definitions. Use a model for interpreting messy text, retrieving relevant policy, proposing explanations and drafting communications. Use an agent when the next useful step depends on what it discovers, such as investigating why an invoice appears unpaid. The agent should ask tools for facts and stop when evidence is insufficient.

For example, a receivables workflow first computes overdue balances. An agent can then inspect a disputed invoice, retrieve the collection policy and prepare a recommended next action. A reviewer sees the amounts, evidence and draft. Sending a reminder is a separate, explicitly authorised operation, and the application rechecks payment status immediately before any eventual send.

### Initial opportunity backlog

| Order | Workflow | First implementation | Measure |
| --- | --- | --- | --- |
| 1 | Missing client documents | Required-document rules and owner queue | Median chase time and overdue requests |
| 2 | Receivables visibility | Source-backed aging dashboard | Report preparation time and reconciliation difference |
| 3 | Close readiness | Checklist, dependencies and evidence links | Days to close and blocked task age |
| 4 | AP intake | Extraction, duplicate checks and review queue | Touch time and field correction rate |
| 5 | SOP questions | Retrieval with citations and abstention | Supported-answer rate and review time |
| 6 | Exception investigation | Bounded tool-using agent | Resolution rate and unsafe-action attempts |
| 7 | Management commentary | Deterministic variance plus cited draft | Reviewer corrections and accepted drafts |

Prioritise with estimated net hours saved per month, frequency, data readiness and error impact. Example only: 600 items at four minutes each consume 40 hours; a one-minute review reduces handling to ten hours. If monthly monitoring and maintenance take five hours, the projected net saving is 25 hours. Measure the actual result during a pilot and include subscription, model and hosting costs. Do not count all released capacity as cash savings.

## 5 Learning stack and resource route

Use one primary programming language first. Python handles data transformations, API clients, validation, testing and initial dashboards. Add SQL for relational data and later read enough JavaScript to understand a custom web interface. The learner need not become a full frontend engineer before contributing useful automations.

The core learning resources are selected sections of CS50 Python and CS50 SQL, supported by OpenStax accounting concepts.[^25][^26][^27] These are references for the weekly labs, not a requirement to finish every course and assignment within the 400-hour plan. Follow each provider's academic honesty rules when doing its own graded exercises.

Streamlit is the first dashboard tool because it permits a Python-first route. FastAPI is introduced for explicit backend contracts. MDN provides the later web fundamentals.[^28][^29][^30] The future Academy app can use React for a richer learning interface; that is a builder implementation choice and a later learner extension.[^36]

After Python and APIs, use Hugging Face's Agents Course for agent concepts and selected practical units. DeepLearning.AI's Agentic AI course is an optional structured alternative, not an additional compulsory track.[^31][^32] Check current access terms before enrollment. The public n8n Academy catalog is an optional route for cross-application orchestration.[^33]

| Learn | Why it matters | Where and how |
| --- | --- | --- |
| Python and Git | Read, change and debug automation code | CS50 Python selections; implement each concept against fictional invoices |
| Accounting data | Avoid plausible but incorrect dashboards | OpenStax basics; narrate invoice, payment, bill, credit and journal flows |
| SQL | Join systems and calculate repeatable metrics | CS50 SQL querying, relating, designing and viewing; use a small client ledger |
| Zoho Books and CRM | Fulfil the immediate API/dashboard goal | Official API references; start with one read-only resource per product |
| Streamlit then FastAPI | Build a useful UI and a reliable service boundary | Official get-started guides; separate calculations from presentation |
| Flow or n8n | Automate scheduled handoffs and routing | Choose one; reproduce the same workflow with a failure queue |
| Tool use and retrieval | Interpret exceptions with evidence | Hugging Face plus provider docs; implement one narrow tool at a time |
| Evaluation and state | Know if an agent works and recover safely | Anthropic eval guidance and LangGraph docs; test fixed business outcomes |

Delay fine-tuning, model training, vector-database infrastructure, multi-agent frameworks, Kubernetes and broad autonomous browser control until a concrete requirement justifies them. Use an existing model provider behind a small adapter so changing providers does not rewrite business logic. Choose model/version at implementation time using the case suite, latency and a spending cap.

### Weekly rhythm

Allocate 3 hours to guided learning, 11 to building, 3 to breaking and testing, 2 to recall and explanation, and 1 to documentation and current-source review. One workable calendar is two hours each weekday plus five hours on Saturday and Sunday. Start each session with ten minutes recalling the last concept, then work on one observable result. Keep at least one session focused on repairing old work rather than introducing new material.

Schedule a short revisit after 1, 3, 7 and 14 days. This is the Academy's proposed review policy, not a claimed optimal scientific interval. Revisit the same concept with different data. If a week fails its gate, use the next week's build hours to repair the gap and shift later dates; preserve the 20-hour limit.


## 6 Twenty weeks of practical work

Each week has 20 hours using the stated weekly allocation. Resource numbers refer to the Sources section. Complete the gate before progressing to a dependent mission. All outputs below are planned learner deliverables, not files already implemented in this release.

### Week 1 Understand the process and run your first script

Learn: terminal and files, variables and functions, Git commits, invoice versus payment, process discovery. Resources: S25, S27.

Build: Create a repository workspace, run a Python script and describe a fictional client-to-invoice-to-payment process. Enter ten fictional invoices as dictionaries with string amounts. Print the invoice count and a labelled summary. Draw the handoffs, owner and exception path.

Break and test: Change a file path, remove a required field and introduce a syntax error. Read each error and explain the smallest repair.

Submit: first_script.py, process-map.md, data-dictionary.md, learning-log.md.

Pass when: Run the script from a fresh terminal, explain every line, distinguish an invoice from cash received and make a meaningful Git commit.

Independent variation: Add a new fictional client and one new invoice without asking the tutor to write the change.

### Week 2 Control flow and reliable money calculations

Learn: loops, conditionals, lists and dictionaries, Decimal, input validation. Resources: S25, S35.

Build: Write reusable functions for open balance and overdue flags. Store amounts as decimal strings and use Decimal for arithmetic. Work on 30 fictional invoices with partial payments and explicit statuses. Print separate totals per currency.

Break and test: Try blank amounts, negative values, a draft invoice and 0.10 plus 0.20. Reject invalid input with a useful reason instead of silently converting it to zero.

Submit: invoice_rules.py, validation_examples.md.

Pass when: All hand-calculated examples agree exactly at the defined currency precision; drafts and void invoices are excluded according to the exercise policy.

Independent variation: Add a rule for invoices due today and explain why it differs from overdue.

### Week 3 Files tests and debugging

Learn: CSV and JSON, exceptions, pytest basics, functions versus scripts, repeatable execution. Resources: S25.

Build: Import and validate a 100-record fictional invoice file, produce clean records and a rejected-record report, and test the core transformations. Keep input separate from generated output and document one command that reproduces the result.

Break and test: Inject a duplicate source ID, invalid date, missing currency, corrupt JSON and a second run on the same input.

Submit: importer.py, tests/test_invoice_rules.py, rejection-report.json, README.md.

Pass when: Every rejected record has its source ID or row number and reason; identical inputs produce identical totals; tests demonstrate the failure cases.

Independent variation: Repair a bug seeded by the tutor using the failing test and traceback.

### Week 4 Model accounting data with SQL

Learn: tables and keys, SELECT and GROUP BY, JOIN, grain, invoice and payment allocation. Resources: S26, S27.

Build: Load clients, invoices, payments and allocations into SQLite. Create queries for open balance, customer totals and unmatched payments. Explain one row's meaning in each table and document primary and foreign keys.

Break and test: Join invoice lines and payment allocations naively, observe duplicated totals, and fix by aggregating at the correct grain. Try an orphan allocation.

Submit: schema.sql, metrics.sql, join-explanation.md.

Pass when: Five SQL reports match independently calculated examples, and referential checks identify orphan rows.

Independent variation: Add a second payment to one invoice without changing its invoice total.

### Week 5 Define metrics before drawing charts

Learn: aging buckets, as-of dates, cash versus accrual, metric contracts, reconciliation. Resources: S26, S27, S35.

Build: Create a metric dictionary and queries for current AR, overdue AR, AP due soon and close-task completion. Fix the report date and currency in every output. Build the reference examples in docs/03-zoho-dashboard-blueprint.md by hand before coding them.

Break and test: Use a payment after the as-of date, a due date equal to the report date, an unapplied credit and mixed currencies. Explain why current balance cannot reconstruct every historical balance.

Submit: metric-dictionary.md, metrics.sql, reconciliation.md.

Pass when: Every metric has an owner, grain, formula, exclusions, date basis, currency rule and drill-down; the reference exercise reconciles.

Independent variation: Explain a profit-versus-cash difference to a nontechnical manager in five sentences.

### Week 6 Ship the first useful dashboard

Learn: Streamlit, filters, charts, tables, empty and error states. Resources: S28.

Build: Build a local dashboard over the fictional database with client/date filters, four metrics, an AR aging chart, invoice drill-down and a visible data timestamp. Keep SQL and calculations outside the UI code.

Break and test: Test a client with no invoices, a data load failure, long client names and currency changes. Confirm a filter changes both headline metrics and underlying rows.

Submit: dashboard.py, dashboard-demo.md, screenshots.

Pass when: Another person can launch the dashboard from its instructions and trace a KPI to the contributing records. No placeholder KPI is presented as a real calculation.

Independent variation: Add a disputed-invoice filter and show its effect without rewriting the dashboard.

### Week 7 Learn HTTP and build a paginated client

Learn: HTTP methods and status codes, headers and parameters, JSON schema, pagination, timeouts. Resources: S6, S8, S29.

Build: Use a local mock Zoho-like API to fetch 450 invoices across three pages. Create a small client with explicit timeouts and schema validation. Expose a read-only summary endpoint in FastAPI and inspect the request and response.

Break and test: Simulate a missing middle page, 429, 500 and a response missing page_context. Do not label partial data as a successful full sync.

Submit: mock_api_client.py, api-contract.md, pagination-tests.

Pass when: All 450 unique invoices arrive once; incomplete fetches are detectable; explain URL, query, header, body and response in plain language.

Independent variation: Change page size without changing the final dataset.

### Week 8 Connect Zoho Books with read-only OAuth

Learn: OAuth consent, access and refresh tokens, regional API domain, organization_id, least privilege. Resources: S6, S7, S9.

Build: Configure a permitted test organization and read-only connection, or use the OAuth simulator if access is unavailable. Fetch organizations and invoices, store normalized records and record source metadata. Keep credentials exclusively on the backend.

Break and test: Expire an access token, revoke a refresh token, use the wrong organization and try the wrong regional domain. Distinguish refreshable expiry from a connection requiring reauthorization.

Submit: zoho_books_adapter.py, connection-runbook.md, redacted-connection-evidence.md.

Pass when: A real read-only API call is evidenced when an account is available; otherwise label the work mock-only. Refresh and revoked-token behaviours pass; no secret appears in Git or browser data.

Independent variation: Explain how to reconnect without replacing or deleting the accounting data.

### Week 9 Join Zoho CRM with accounting records

Learn: CRM module metadata, API names, cross-system identity, custom fields, separate quotas. Resources: S10, S11, S12.

Build: Add a CRM adapter for fictional or authorised Accounts and Deals. Map CRM accounts to Books contacts with an explicit reviewed identity table. Show onboarding stage beside invoice status and keep unmapped records in a queue.

Break and test: Create identical client names, a changed custom field, a missing lookup and a CRM-only account. Never join clients solely on display name.

Submit: zoho_crm_adapter.py, identity-map.sql, unmapped-clients-report.md.

Pass when: Mapped records join correctly, ambiguous identities stay unresolved, and CRM limits/configuration remain distinct from Books.

Independent variation: Demonstrate that a CRM closed-won amount is not automatically recognised revenue.

### Week 10 Make synchronization resilient

Learn: upserts, checkpoints, backoff, schedules, data freshness, recovery. Resources: S6, S8, S11, S12.

Build: Add sync run records, idempotent upserts, retry limits, a per-product rate budget and last-success timestamps. Reconcile scheduled snapshots against source counts and totals. Use documented update filters only where supported; otherwise use bounded rescan and comparison.

Break and test: Stop after page two, rerun a job, receive the same event twice and process an older update after a newer one. Exercise deletion/void handling and an expired notification subscription.

Submit: sync-worker, recovery-runbook.md, reconciliation-tests, dashboard-health-view.

Pass when: Reruns do not duplicate records, failed jobs preserve the prior successful snapshot, drift is visible and recovery is demonstrated.

Independent variation: Estimate request consumption for a proposed refresh interval and select one that fits the configured account budget.

### Week 11 Automate a complete operations handoff

Learn: triggers and actions, workflow state, Deluge basics, queue ownership, service levels. Resources: S14, S15, S33.

Build: Choose Zoho Flow or n8n and build a missing-document workflow: detect a missing item, assign an owner, create a draft reminder, record the next review time and close the task when the evidence arrives. Use a local inbox simulator.

Break and test: Replay the trigger, deliver the document twice and remove the assignee. Ensure failures enter an actionable queue instead of silently disappearing.

Submit: workflow-export, workflow-SOP.md, before-after-estimate.md.

Pass when: One business event creates one active task, drafts are not sent automatically, and a teammate can recover an intentionally failed run.

Independent variation: Replace the trigger source without changing the business rules.

### Week 12 Use an LLM for a bounded extraction task

Learn: tokens and context, structured output, schema validation, abstention, cost tracking. Resources: S18, S31, S32.

Build: Extract vendor, invoice number, dates, currency and amounts from fictional invoice text into a typed schema. Keep raw evidence offsets and allow null for unknown fields. Validate arithmetic using code and require review before any posting.

Break and test: Remove a currency, make the total inconsistent and include irrelevant instructions in the invoice. Record invalid model output and retry within a fixed budget.

Submit: extractor, 20-case-extraction-evaluation, prompt-version.md.

Pass when: Required fields are correct or explicitly unresolved; arithmetic never depends on the model; every result has source evidence and measured usage.

Independent variation: Apply the same schema to a differently formatted invoice and explain the observed errors.

### Week 13 Answer policy questions with evidence

Learn: retrieval augmented generation, chunking, metadata filters, citations, policy versions. Resources: S19, S31.

Build: Create an SOP assistant over ten fictional policies. Start with keyword search; add embeddings only if the query set shows a retrieval gap. Filter by client and effective date before generating an answer.

Break and test: Add conflicting versions, a missing policy and a similar policy for another client. Ask a question requiring information absent from the corpus.

Submit: policy-retriever, 20-question-evaluation, citation-audit.md.

Pass when: Answers cite the correct policy/version, unsupported questions abstain, and cross-client evidence is never returned in the test suite.

Independent variation: Update a policy and show how answers for historical and current dates differ.

### Week 14 Build a tool-using exception investigator

Learn: agent loop, tool schemas, permissions, stop conditions, evidence bundle. Resources: S18, S20.

Build: Implement a single agent with narrow read tools for invoice, payment, policy and exceptions. Let it investigate a disputed overdue balance and draft a recommended next step. The backend supplies allowed client identity and enforces access.

Break and test: Offer an irrelevant tool, ask for another client's data, inject instructions in a note and cause a repeated tool failure. Enforce call and elapsed-time limits.

Submit: investigator-agent, tool-contracts.md, trace-examples.

Pass when: The agent supports its recommendation with records, stops when evidence is insufficient and cannot send messages or post entries.

Independent variation: Resolve a different exception type using the same tools without adding a broad shell or arbitrary SQL tool.

### Week 15 Persist review and resume safely

Learn: state machine, LangGraph persistence, approval binding, resume, audit events. Resources: S22.

Build: Represent investigate, draft, review, approved, rejected and completed states. Persist the proposed action, evidence and approval decision. Demonstrate resume after a restart in the simulator. Bind approval to action content and current source version.

Break and test: Restart before and after approval, repeat the approval request and change the invoice while review is pending. A changed action or record requires fresh review.

Submit: review-workflow, state-transition-tests, approval-contract.md.

Pass when: Only valid transitions succeed; retries do not duplicate effects; stale approvals cannot execute; the audit explains who approved what.

Independent variation: Reject an action, edit the draft, and prove the old approval cannot be reused.

### Week 16 Evaluate security reliability and cost

Learn: held-out cases, precision and recall, outcome grading, prompt injection, tenant isolation, trace review. Resources: S21, S24.

Build: Assemble a 60-case evaluation suite using the split in the app specification. Score deterministic correctness, policy boundaries, evidence and end state. Repeat each held-out agent case three times and report all outcomes and cost per accepted result.

Break and test: Use forged approval, malicious document content, unexpected tool outputs, unavailable models and budget exhaustion. Keep a deterministic fallback queue.

Submit: evaluation-report.md, failure-taxonomy.md, cost-report.md, security-tests.

Pass when: All critical isolation, approval and accounting checks pass on the suite; unsupported recommendations are visible; results are reproducible and include denominators.

Independent variation: Compare two prompt/model configurations on unchanged held-out cases and justify the choice with evidence.

### Week 17 Build an AP intake and review project

Learn: invoice extraction, duplicate candidates, PO matching, exception routing, review productivity. Resources: S4, S16.

Build: Combine extraction with a vendor directory and fictional purchase orders. Detect duplicate candidates and mismatched quantities or totals. Produce a draft bill and reviewer screen with source snippets, validation results and explanation.

Break and test: Try a credit note, partial delivery, no PO, recurring vendor invoice and a bank-detail change. Route exceptions; do not treat similar amounts as proof of a duplicate.

Submit: AP-review-demo, AP-evaluation.md, AP-SOP.md.

Pass when: The reviewer can correct fields and reject a proposal; duplicate detection reports precision/recall; no real payment or ledger write occurs.

Independent variation: Add a new vendor without disabling duplicate and validation controls.

### Week 18 Build close readiness and management commentary

Learn: close dependencies, reconciliation evidence, variance analysis, actuals versus forecast, management review. Resources: S3, S5.

Build: Create a multi-client close board with blocked tasks, evidence and reviewer status. Compute period variances in SQL and draft a concise commentary that cites the numbers and separates possible causes from established facts.

Break and test: Use a zero prior-period denominator, incomplete data, late adjustment and unsupported explanation. Keep the close blocked when required evidence is missing.

Submit: close-dashboard, management-pack.md, close-runbook.md.

Pass when: Dashboard status agrees with required task evidence; every number traces to a metric; unsupported causes are labelled hypotheses; financial conclusions require review.

Independent variation: Explain a late-arriving transaction's effect on a previously prepared report.

### Week 19 Adapt the system for QuickBooks and expose narrow tools

Learn: adapter interface, QuickBooks mapping, sandbox, MCP basics, provider differences. Resources: S4, S23, S34.

Build: Inspect current QBO developer setup, then build a read-only adapter against an authorised sandbox or documented fixtures. Map invoice/payment entities into the existing canonical model. Expose one read-only metric tool through MCP as an extension.

Break and test: Try mismatched account identities, unsupported field mappings, token expiry and a caller without access. Do not assume Zoho scopes, pagination or regional rules apply to QBO.

Submit: qbo-adapter-or-fixtures, adapter-comparison.md, read-only-MCP-demo.

Pass when: The same canonical metric tests run against both adapters. Label actual sandbox evidence separately from mock evidence; explain the boundaries of the MCP tool.

Independent variation: Identify which dashboard components can be reused unchanged and which require accounting-specific remapping.

### Week 20 Demonstrate and hand over the portfolio

Learn: stakeholder demo, measurement, runbooks, incident recovery, technical explanation. Resources: S21.

Build: Package three case studies: Zoho operations dashboard, AP exception review and close investigator. Present the business problem, architecture, baseline, test evidence, limitations and operating instructions. Conduct a live seeded incident and recovery drill.

Break and test: Let a reviewer change a requirement and introduce an unseen data defect during the demo. Explain the tradeoff and repair the issue without handing the entire task to the tutor.

Submit: portfolio-index.md, three-case-studies, demo-recording-or-script, handover-runbook.md, next-90-days.md.

Pass when: Score at least 80/100 on the portfolio rubric with no critical control failures; complete an independent variation and answer why the system uses an agent where it does.

Independent variation: Propose a scoped first-month pilot for either target company using only confirmed systems and a measurable baseline.


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


## 8 Learning app purpose and experience

LedgerOps Academy is a practical training environment for one beginner, with a path to additional learners later. It must make starting the next useful exercise easier than consuming another tutorial. Its core loop is: choose a mission, attempt a small task, inspect feedback, explain the result, repair a weakness and repeat on changed data. Completed watching time and chat volume do not establish mastery.

The Academy supplies fictional business data, API simulations, task instructions, expected output contracts and evidence storage. The learner builds the automation in a separate local repository or isolated workspace. The tutor offers hints and reviews explanations; it does not own the learner's entire implementation. The web app itself will be built in a subsequent phase, using this specification and the curriculum JSON.

### Minimum screens

| Screen | Main learner action | Definition of done |
| --- | --- | --- |
| Today | Start a specific 30-90 minute task or due review | Shows next action, prerequisite, expected output and resume state |
| Roadmap | Inspect 20 weeks and skill evidence | Displays attempted, submitted, passed and review-due separately |
| Mission | Read business context, inspect data and work | Provides a bounded task, starter files and acceptance checks |
| API lab | Make requests and inspect responses | Shows pagination, status and simulated failure without real credentials |
| Accounting workspace | Review invoices, bills, close tasks and source evidence | Filtering and drill-down preserve client and date context |
| Submission review | Submit an artifact and explain it | Stores artifact hash, case version, tests, feedback and hint use |
| Practice review | Repair a weak skill on new data | A transfer task measures understanding beyond the original solution |
| Progress export | Continue with another tutor | Produces a redacted, versioned context package and importable feedback |

### A sample session

The Today screen offers: repair an AR total that rises after a second sync. The mission gives the expected business behaviour, a small dataset and a failing check. The learner forms a hypothesis, edits their code and submits a result. The grader verifies row counts, source keys and totals, then asks for an explanation of the duplicate.

If the learner fixes the issue but cannot explain why, implementation can be marked successful while the concept remains due for review. A subsequent challenge changes the order of events and introduces a second client. This prevents one copied solution from becoming evidence of general competence.

### Progress and mastery policy

Use separate skill states: unseen, introduced, practised, demonstrated and retained. Demonstrated requires passing the mission gate and explaining an independent variation; retained requires a later variation without full-solution help. This is a transparent rule, not an opaque model-generated confidence score.

The next-task selector is deterministic in the first version: take a due review first; then a failed critical prerequisite; then the next eligible mission. If time available is under 30 minutes, select a recall or diagnosis task. After two failed attempts, reduce task size and offer a targeted lesson. Do not increase weekly hours to compensate for missed days.

Record hints as none, conceptual, pseudocode or worked example. A worked example does not disqualify learning; it schedules a fresh independent task before mastery. The app should never claim to guarantee discipline or competence. It creates structure and verifiable feedback while the learner supplies the practice.

## 9 App architecture and data contracts

### Recommended implementation

Build the Academy interface in React with TypeScript and a Python FastAPI backend, using SQLite for the single-user local MVP. The reason for the richer interface is the mission/review workflow; early learner dashboards still use Streamlit. Keep curriculum content in versioned JSON/Markdown, learner progress in a transactional database, and uploaded artifacts in a separate storage directory. Use PostgreSQL when multi-user hosting and concurrent workers justify the migration.

The first MVP has no embedded paid tutor API requirement. It exports a context packet to any external teaching agent and imports structured feedback. A later provider adapter may add an in-app tutor with a usage meter, explicit consent for transmitted data and a hard spending limit. Model failure must leave the mission, data, deterministic grader and progress usable.

Keep two adapters for every source: a local simulator and an optional real read-only connector. Authentication settings must display the selected mode clearly. Real Zoho access is introduced only after local exercises work; a simulator pass must never be presented as live integration evidence. The QBO developer portal is the appropriate setup entry point, but its full current setup and quotas require checking inside the portal.[^34]

### Component boundaries

| Component | Responsibility | Failure behaviour |
| --- | --- | --- |
| Curriculum service | Read weeks, skills, missions and prerequisites | Fail visibly on invalid content; keep last valid version |
| Simulator | Serve fictional entities and repeatable faults | Reset one scenario by seed without touching progress |
| Submission service | Store artifact, explanation and provenance | Transactional save; idempotent submit key |
| Grading worker | Run trusted checks and record outcome | Mark pending/failed explicitly; never infer pass from a timeout |
| Progress engine | Apply published rules and schedule review | Recompute from events; preserve original evidence |
| Tutor bridge | Export redacted context and ingest feedback | Treat imported feedback as advisory until checks validate it |
| Connector service | Authorised backend API access | Mark connection unhealthy and preserve prior successful snapshot |

Do not execute arbitrary uploaded learner code in the web server process. The MVP accepts result artifacts and test logs, with critical checks recomputed from those artifacts; self-reported logs are evidence, not proof. A later execution worker runs code in disposable containers with no production credentials, no outbound network by default, bounded CPU/memory/time and a read-only test bundle. That worker requires a separate implementation and security review before use.

### Core records

Use learner, skill, mission, scenario, attempt, submission, grade, review_schedule, artifact and progress_event entities. Each record has a stable ID and schema version. Mission content includes week, prerequisites, business brief, starter files, learning objectives, allowed tools, expected deliverables, hidden-case policy and rubric. Scenario data includes seed, report date, time zone, currency and injected faults.

An attempt records mission/scenario version, start and end timestamps, hint level, learner explanation and selected tool mode. A grade records grader version, checks with expected/actual values, pass/fail, critical failures and evidence references. Progress records must derive from stored evidence and explicit rules; an imported tutor score must not overwrite a deterministic failure.

Proposed backend routes are GET /api/roadmap, GET /api/today, GET /api/missions/{id}, POST /api/attempts, POST /api/submissions, GET /api/submissions/{id}/grade, POST /api/reviews/{id}/complete, GET /api/progress/export and POST /api/tutor-feedback. These are Academy endpoints, not claims about Zoho API paths. Validate types, authorize each resource and return structured errors with a stable error code and request ID.

For mock APIs, preserve a clear /sim/ namespace and include a simulator indicator in responses. Faults are selected by scenario seed, not by a secret change to the learner's machine. A grader can test expired tokens, page failure and duplicate events without external API traffic.

### External tutor context contract

Export curriculum version, mission ID, scenario seed, objectives, relevant policy excerpts, permitted tool surface, learner's recent explanation, test results, hint history, current blocker and next-task recommendation. Include artifact references and hashes, not credentials or raw client data. For an agent without filesystem access, provide a compact Markdown packet with the same information.

The tutor returns diagnosis, one next exercise, hints used, requested evidence and an optional rubric assessment. Import with schema validation and size limits. Reject paths outside the submission directory and treat links as untrusted references. Store the original feedback for audit. The app controls completion according to validated evidence, even if the tutor says the learner has passed.

The tutor should give one hint at a time, ask for a hypothesis before a repair, and require the learner to explain code and financial assumptions. Full worked solutions may be shown after a genuine attempt, followed by a new independent variation. The teaching protocol lives in prompts/teaching-agent.md for reuse before the app exists.

## 10 Practice data and evaluation design

### Fictional accounting environment

Use three clearly fictional businesses: Harbor Coffee Studio, Northstar Design Practice and Cedar Software Lab. These are learning scenarios and have no affiliation with either target company. Store no real bank details, tax IDs, payroll records or customer messages. The main dataset uses USD, a declared US business time zone and a fixed date; a separate scenario introduces another currency to test separation, not tax localisation.

The first fixture set contains 10 invoices. Later sets contain 100 and 450 invoices, contacts, payments, allocations, credit notes, bills, purchase orders, close tasks and ten fictional SOPs. Store a deterministic seed and a ground-truth manifest. The generator must validate its own accounting relationships before a scenario becomes eligible for grading.

Include partial payments, unpaid and fully paid invoices, due-today boundaries, credits before/after report date, duplicates, unmapped client identities, late source updates, failed pagination and stale data. AP cases add inconsistent invoice totals, recurring invoices, no-PO purchases and vendor changes. A misleading instruction inside an invoice or note is data, not authority to change the application's behaviour.

### Evaluation suite

Plan 60 cases: 20 accounting/data cases, 15 API/sync cases, 15 agent/evidence cases and 10 security/recovery cases. Assign 40 to visible development and 20 to withheld variations. Split by scenario family or template where possible to reduce near-duplicate leakage. In a local self-study repository, hidden files are a learning convention, not protection against an agent deliberately reading them; an independent reviewer or remote grader is needed for stronger assessment integrity.

Use code checks for amounts, rows, authorization and state transitions. Use a rubric for clarity and usefulness, with human calibration of model feedback. Repeat each held-out agent case three times and report variability, not only the best run. Record exact denominators, prompt/model versions, scenario versions and cost. Passing this limited suite is evidence for the exercise; it does not certify real-world financial accuracy.

Proposed portfolio targets are 100% of critical accounting/authorization/approval checks passing, at least 90% overall task success on the held-out suite, and no unsupported financial claim accepted without review. These are training targets to be refined with a reviewer, not industry standards or measured results. Critical failures override an average score.

| Rubric area | Weight | Evidence |
| --- | --- | --- |
| Business and accounting correctness | 30 | Metric contracts, reconciliation and scenario results |
| Integration and recovery | 25 | Pagination, retries, duplicate handling, checkpoint and recovery drills |
| Agent evidence and boundaries | 20 | Tool traces, citations, abstention and invalid-action prevention |
| Usability and handover | 15 | Clear dashboard, exception queue, operating instructions and demo |
| Independent explanation | 10 | Changed-data task and explanation without a worked solution |

Pass a capstone at 80/100 or above, with every critical check passing and one independent transfer task. Capture a baseline from the non-agent implementation before comparing it with the agent. Measure accepted results per hour, reviewer corrections, false positives, failure recovery, p95 latency and cost per accepted task. Reject a more complex design if it cannot justify the additional operating burden.

## 11 Security and operational readiness

Treat access control as application logic, not prompt wording. Resolve the allowed client from the authenticated session; do not let the model choose an arbitrary tenant. Apply tenant filters to databases, retrieval indexes, cache keys and artifact exports. Avoid broad SQL, filesystem and shell tools in the accounting agent. OWASP's LLM risk taxonomy is a useful checklist for prompt injection, excessive agency and sensitive-data exposure.[^24]

Represent approvals as records bound to the exact action payload, client, source version and expiry. Recheck source state at execution time. A changed amount, destination, invoice version or recipient invalidates prior approval. Keep drafting separate from sending, posting, paying, changing bank details and filing. In the learning environment, side effects terminate at the simulator.

A deployment must have authentication, backups, a restore drill, log redaction, dependency updates, access revocation and a named operational owner. Choose hosting and retention based on the employer's approved environment and data policies. Private GitHub visibility does not make a repository a suitable store for client accounting data or credentials.

Record processing state before triggering an external action and use idempotency keys where the target supports them. If a request times out after an uncertain side effect, inspect the target state before retrying. Escalate when no safe determination is possible. Never promise exactly-once execution across independent services without a concrete supporting protocol.

### Proposed operating checks

The local simulator should load a mission and its data in under two seconds on the documented test machine; measure this during implementation. The hosted version needs its own workload-based target. A stopped worker must leave submissions pending and recover them without duplicate progress events. Missing source data must disable affected financial conclusions rather than substitute zero.

For a Zoho pilot, use a freshness target agreed with the process owner and supported by the API budget. Show last successful sync and an explicit stale warning after twice the agreed interval. Require a reconciliation report and successful restore/replay demonstration before expansion. Review model spend per run and stop when the configured budget is exhausted.

## 12 Build sequence alternatives and acceptance

### Incremental implementation backlog

| Milestone | Build scope | Acceptance evidence | Effort estimate |
| --- | --- | --- | --- |
| M1 | Today, roadmap, 20-week content, local progress, tutor export | Resume survives restart; exported packet has no secrets; first mission is usable | 12-20 builder hours |
| M2 | Ten-invoice fixture, mock API, first six missions, deterministic artifact grading | Reference AR example and duplicate/pagination cases pass; every failed check explains the mismatch | 20-35 builder hours |
| M3 | Full scenarios, 20 missions, review scheduling, evidence history, tutor feedback import | All prerequisite/grade transitions tested; import cannot override critical failures | 25-45 builder hours |
| M4 | Optional live read-only Zoho connector and in-app tutor | Separate mode labels, OAuth recovery, authorization tests and spend limit | 20-40 builder hours plus access dependencies |
| M5 | Optional isolated code execution and multi-user hosting | Container limits, tenant tests, backup/restore and operational review | Estimate after infrastructure decision |

These are planning estimates for an experienced builder using coding assistance, not a delivery commitment and not extra study hours for the beginner. Build M1-M2 before relying on the app for daily use. The learner can start immediately with the repository and a tutor; app completion should not delay Python and accounting practice.

### Alternatives

A document plus repository is the cheapest initial learning system and is the present release. A generic course platform is useful for explanations but does not supply accounting-specific fault simulations. A chat-only tutor is flexible but needs explicit evidence and portable state to avoid losing track. An embedded multi-agent teaching system adds cost and grading ambiguity too early. The recommended MVP therefore uses deterministic curriculum/progress logic plus an optional external tutor.

### Decisions deferred until implementation

Use local single-user storage first; select hosting only when deployment is needed. Start with simulator data; choose live Zoho products, region and edition after access is confirmed. Choose the in-app model after testing representative cases and checking current cost. Require an accounting reviewer for production definitions and financial write actions. These decisions do not block the plan or early study.


## 13 Start this week

The first result is intentionally small: a script that reads fictional invoice records and a clear explanation of the business process. Open the repository, read the purpose and week 1 mission, and start a learning log. Use the teaching-agent prompt to keep assistance bounded. The Academy app is not a prerequisite for this first week.

### Day by day at 20 hours

| Day | Hours | Work and visible result |
| --- | --- | --- |
| Monday | 2 | Set up an editor and Python; locate the project folder; run a hello-world script; record the launch command |
| Tuesday | 2 | Study variables/functions; create ten fictional invoices as dictionaries; print a count |
| Wednesday | 2 | Explain invoice, payment and outstanding balance; write a one-page process map with owners and exceptions |
| Thursday | 2 | Read a traceback; fix a path error and a missing field; record cause and repair |
| Friday | 2 | Use Git status, diff and commit; explain what a commit captures and check no credentials are staged |
| Saturday | 5 | Build and revise the invoice summary script; make outputs understandable; run it from a fresh terminal |
| Sunday | 5 | Rebuild a small part without copying; explain each line; complete the transfer task; write the next-session note |

Use the 3/11/3/2/1 weekly allocation to balance these sessions across learning, building, testing, explanation and documentation. If setup consumes the first two days, move later work rather than skipping the explanation and debugging gate. Ask the tutor to explain an error, then perform the edit yourself.

### Session record

Record date, mission, minutes spent, intended result, actual result, artifact path, failing/passing checks, hints used, one concept explained in your own words, current blocker and next action. State whether evidence came from a mock, a test account or a live read-only source. A screenshot alone is not proof that the underlying calculation is correct.

### Graduation portfolio

Case study 1 is the Zoho operations dashboard: documented metrics, Books/CRM mapping, reliable sync and a recovery demonstration. Case study 2 is AP intake: extracted evidence, duplicate candidates, rule checks, reviewer correction and measured false positives. Case study 3 is close readiness and investigation: task dependencies, deterministic variances, evidence-backed commentary and a resumed approval workflow.

Each case study should include a one-page business brief, architecture, synthetic demo data, setup command, representative test results, short demo, known limitations and operating runbook. Report estimated savings as estimates until a real pilot measures them. Remove client information and secrets before sharing any case externally. The private repository is the working portfolio, not a claim of affiliation with either company.

## 14 First 90 days in the operations automation role

### Days 1 to 30

Shadow two or three recurring workflows and observe actual exceptions. Interview the operator, reviewer and data owner. Record volumes, handling time, systems, duplicate entry points, approval rules and failure cost. Inventory existing Zoho/native features before proposing custom work. Deliver a read-only process-health dashboard or a clearly scoped prototype and agree its success criteria.

### Days 31 to 60

Pilot one workflow with a small, approved group. Keep the previous manual process available, compare outcomes and sample every critical exception. Measure net handling time, correction rate, operator adoption and support burden. Publish a runbook and demonstrate what happens during API expiry, missing data and delayed review. Reduce scope if the baseline data is unreliable.

### Days 61 to 90

Harden the winning pilot, assign ownership and make release/rollback routine. Add a second use case only after the first produces sustained benefit. Introduce AI where messy input or investigative branching creates a demonstrated need. Present the measured result, residual risks, adoption feedback and the next small investment to the operations lead.

### Readiness questions for yourself

Can I show where each number came from? Can I replay a job without duplicate work? Can I explain the rule in business language? Can another person recover the process when I am absent? Does the agent have a justified advantage over a fixed workflow? Can I demonstrate that an untrusted document cannot authorize a payment or reveal another client's data? These questions are more useful than the number of tools listed on a résumé.

## 15 Glossary for the first month

An API is a defined way for software to request data or actions from another system. HTTP is the request/response protocol used by many web APIs; JSON is a common data format. OAuth lets an application receive scoped authorization without taking the user's account password. A refresh token is a backend credential used to obtain a new short-lived access token.

Pagination divides a large list into smaller responses. A webhook is a notification sent to an endpoint after an event. An upsert creates a record if absent and updates it if present. Idempotency means repeating an operation has the same intended effect as doing it once. A checkpoint records progress so a job can resume after interruption.

AR means accounts receivable, or money owed by customers; AP means accounts payable, or money owed to vendors. Reconciliation compares records or balances and explains differences. A ledger records accounting entries. Accrual accounting and cash movement use different recognition/timing rules, so an invoice total does not automatically equal cash received.

RAG means retrieval augmented generation: retrieve relevant evidence before generating an answer. A tool is a constrained function an agent may call. An evaluation is a repeatable task with a defined check of success. A trace records calls, results and state changes. A tenant is an isolated customer/client boundary within an application. A human review gate requires a person's recorded decision before a specified action proceeds.


## 16 Sources

Research checked on 13 September 2026. Company pages describe their own offerings. Technical references are living documents; confirm current versions, account availability and terms when implementing. Proposed curricula, scenarios, targets and estimates are recommendations rather than measured company results.

[^1]: Prudent Accountants. [Accounting Firm in Minneapolis](https://prudentaccountants.com/). Undated. Accessed 13 September 2026.

[^2]: Prudent Accountants. [Small Business Accounting Services Minneapolis](https://prudentaccountants.com/accounting-and-bookkeeping-services/). Undated. Accessed 13 September 2026.

[^3]: Prudent Accountants. [Fractional CFO Services for Small Business](https://prudentaccountants.com/cfo-services/). Undated. Accessed 13 September 2026.

[^4]: Zeni. [AI Accountant Agent](https://www.zeni.ai/ai-agents/ai-accountant-agent). Undated. Accessed 13 September 2026.

[^5]: Zeni. [AI CFO Agent](https://www.zeni.ai/ai-agents/ai-cfo-agent). Undated. Accessed 13 September 2026.

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

[^16]: Zoho. [AI Features in Zoho Books](https://www.zoho.com/us/books/help/ai-features/ai-features.html). Living documentation. Accessed 13 September 2026.

[^17]: Intuit. [Intuit Introduces Ground Breaking Virtual Team of AI Agents to Fuel Growth for Businesses](https://investors.intuit.com/news-events/press-releases/detail/1258/intuit-introduces-ground-breaking-virtual-team-of-ai-agents-to-fuel-growth-for-businesses). 2025-07-01. Accessed 13 September 2026.

[^18]: Anthropic. [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents). 2024-12-19. Accessed 13 September 2026.

[^19]: Anthropic. [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). 2025-09-29. Accessed 13 September 2026.

[^20]: Anthropic. [Writing Effective Tools for AI Agents Using AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents). 2025-09-11. Accessed 13 September 2026.

[^21]: Anthropic. [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). 2026-01-09. Accessed 13 September 2026.

[^22]: LangChain. [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph/overview). Living documentation. Accessed 13 September 2026.

[^23]: Model Context Protocol. [What Is the Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro). 2026-07-28 documentation version. Accessed 13 September 2026.

[^24]: OWASP GenAI Security Project. [LLM Top 10](https://genai.owasp.org/llm-top-10/). 2025 risk taxonomy on living page. Accessed 13 September 2026.

[^25]: Harvard CS50. [Introduction to Programming with Python](https://cs50.harvard.edu/python/). Living course page. Accessed 13 September 2026.

[^26]: Harvard CS50. [Introduction to Databases with SQL](https://cs50.harvard.edu/sql/). Living course page. Accessed 13 September 2026.

[^27]: OpenStax. [Principles of Accounting Volume 1 Financial Accounting](https://openstax.org/books/principles-financial-accounting/pages/1-1-explain-the-importance-of-accounting-and-distinguish-between-financial-and-managerial-accounting). 2019. Accessed 13 September 2026.

[^28]: Streamlit. [Get Started with Streamlit](https://docs.streamlit.io/get-started). Living documentation. Accessed 13 September 2026.

[^29]: FastAPI. [Tutorial User Guide](https://fastapi.tiangolo.com/tutorial/). Living documentation. Accessed 13 September 2026.

[^30]: MDN Web Docs. [Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development). Living documentation. Accessed 13 September 2026.

[^31]: Hugging Face. [Welcome to the AI Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction). Living course page. Accessed 13 September 2026.

[^32]: DeepLearning.AI. [Agentic AI](https://www.deeplearning.ai/courses/agentic-ai). Living course page. Accessed 13 September 2026.

[^33]: n8n. [n8n Academy Courses](https://learn.n8n.io/courses). Living course catalog. Accessed 13 September 2026.

[^34]: Intuit Developer. [QuickBooks Online Sandboxes](https://developer.intuit.com/app/developer/qbo/docs/develop/sandboxes). Living developer portal. Accessed 13 September 2026.

[^35]: Python Software Foundation. [Decimal Fixed Point and Floating Point Arithmetic](https://docs.python.org/3/library/decimal.html). Python 3.14 documentation as retrieved. Accessed 13 September 2026.

[^36]: React. [Quick Start](https://react.dev/learn). Living documentation. Accessed 13 September 2026.
