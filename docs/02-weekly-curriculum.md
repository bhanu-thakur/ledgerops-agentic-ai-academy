## 6 Twenty weeks of practical work

Each week has 20 hours using the stated weekly allocation. Resource numbers refer to the Sources section. Complete the gate before progressing to a dependent mission. All outputs below are planned learner deliverables, not files already implemented in this release.

### Week 1 Choose and design an automation

Learn: automation patterns, rules versus workflows versus agents, process discovery, implementation briefs, prompt flow and acceptance tests. Resources: S18, S21, S27.

Build: Review ten accounting automation patterns and score eight possible workflows. Use the fictional Zoho receivables dashboard as the default case. Map the current process and the improved process. Write an implementation brief and a build, review, fix and handover prompt for Codex or Claude Code.

Break and test: Remove the process owner, leave a metric undefined, mix currencies and omit the failed-sync path. Explain why each gap would make the implementation unsafe or hard to review.

Submit: automation-opportunity-map.md, process-map.md, implementation-brief.md, prompt-pack.md, review-checklist.md and learning-log.md.

Pass when: The selected workflow has a clear trigger, user, inputs, rules, exceptions, output, permissions, tests, recovery path and owner. The build prompt gives a coding agent enough context to implement without guessing key business rules.

Independent variation: Write a second brief for a missing-document workflow without copying the completed receivables brief.

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
