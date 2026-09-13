/* Generated from the researched LedgerOps Academy source files.
   Full weekly mission detail and source metadata remain in DATA for audit. */
const DATA = {
  "asOf": "2026-09-13",
  "programme": "LedgerOps Academy",
  "curriculum": {
    "schema_version": "1.0",
    "programme": "LedgerOps Academy",
    "level": "beginner",
    "learning_mode": "AI-assisted implementation lead: learner owns workflows, briefs, prompts, tests and operating decisions; Codex or Claude Code implements code",
    "hours_per_week": 20,
    "total_weeks": 20,
    "total_hours": 400,
    "weekly_allocation": {
      "guided_learning": 3,
      "building": 11,
      "failure_testing": 3,
      "recall_and_explanation": 2,
      "documentation_and_research": 1
    },
    "weeks": [
      {
        "week": 1,
        "id": "W01",
        "title": "Choose and design an automation",
        "prerequisites": [],
        "concepts": [
          "automation patterns",
          "rules versus workflows versus agents",
          "process discovery",
          "implementation briefs",
          "prompt flow",
          "acceptance tests"
        ],
        "resource_ids": [
          18,
          21,
          27
        ],
        "build": "Review ten accounting automation patterns and score eight possible workflows. Use a fictional Zoho receivables dashboard as the default case. Map the current and improved process. Write an implementation brief and build, review, fix and handover prompts for Codex or Claude Code.",
        "failure_lab": "Remove the process owner, leave a metric undefined, mix currencies and omit the failed-sync path. Explain why each gap would make the implementation unsafe or hard to review.",
        "deliverables": [
          "automation-opportunity-map.md",
          "process-map.md",
          "implementation-brief.md",
          "prompt-pack.md",
          "review-checklist.md",
          "learning-log.md"
        ],
        "gate": "The selected workflow has a clear trigger, user, inputs, rules, exceptions, output, permissions, tests, recovery path and owner. The build prompt gives a coding agent enough context to implement without guessing key business rules.",
        "transfer_challenge": "Write a second brief for a missing-document workflow without copying the completed receivables brief."
      },
      {
        "week": 2,
        "id": "W02",
        "title": "Control flow and reliable money calculations",
        "prerequisites": [
          "W01"
        ],
        "concepts": [
          "loops",
          "conditionals",
          "lists and dictionaries",
          "Decimal",
          "input validation"
        ],
        "resource_ids": [
          25,
          35
        ],
        "build": "Write reusable functions for open balance and overdue flags. Store amounts as decimal strings and use Decimal for arithmetic. Work on 30 fictional invoices with partial payments and explicit statuses. Print separate totals per currency.",
        "failure_lab": "Try blank amounts, negative values, a draft invoice and 0.10 plus 0.20. Reject invalid input with a useful reason instead of silently converting it to zero.",
        "deliverables": [
          "invoice_rules.py",
          "validation_examples.md"
        ],
        "gate": "All hand-calculated examples agree exactly at the defined currency precision; drafts and void invoices are excluded according to the exercise policy.",
        "transfer_challenge": "Add a rule for invoices due today and explain why it differs from overdue."
      },
      {
        "week": 3,
        "id": "W03",
        "title": "Files tests and debugging",
        "prerequisites": [
          "W02"
        ],
        "concepts": [
          "CSV and JSON",
          "exceptions",
          "pytest basics",
          "functions versus scripts",
          "repeatable execution"
        ],
        "resource_ids": [
          25
        ],
        "build": "Import and validate a 100-record fictional invoice file, produce clean records and a rejected-record report, and test the core transformations. Keep input separate from generated output and document one command that reproduces the result.",
        "failure_lab": "Inject a duplicate source ID, invalid date, missing currency, corrupt JSON and a second run on the same input.",
        "deliverables": [
          "importer.py",
          "tests/test_invoice_rules.py",
          "rejection-report.json",
          "README.md"
        ],
        "gate": "Every rejected record has its source ID or row number and reason; identical inputs produce identical totals; tests demonstrate the failure cases.",
        "transfer_challenge": "Repair a bug seeded by the tutor using the failing test and traceback."
      },
      {
        "week": 4,
        "id": "W04",
        "title": "Model accounting data with SQL",
        "prerequisites": [
          "W03"
        ],
        "concepts": [
          "tables and keys",
          "SELECT and GROUP BY",
          "JOIN",
          "grain",
          "invoice and payment allocation"
        ],
        "resource_ids": [
          26,
          27
        ],
        "build": "Load clients, invoices, payments and allocations into SQLite. Create queries for open balance, customer totals and unmatched payments. Explain one row's meaning in each table and document primary and foreign keys.",
        "failure_lab": "Join invoice lines and payment allocations naively, observe duplicated totals, and fix by aggregating at the correct grain. Try an orphan allocation.",
        "deliverables": [
          "schema.sql",
          "metrics.sql",
          "join-explanation.md"
        ],
        "gate": "Five SQL reports match independently calculated examples, and referential checks identify orphan rows.",
        "transfer_challenge": "Add a second payment to one invoice without changing its invoice total."
      },
      {
        "week": 5,
        "id": "W05",
        "title": "Define metrics before drawing charts",
        "prerequisites": [
          "W04"
        ],
        "concepts": [
          "aging buckets",
          "as-of dates",
          "cash versus accrual",
          "metric contracts",
          "reconciliation"
        ],
        "resource_ids": [
          26,
          27,
          35
        ],
        "build": "Create a metric dictionary and queries for current AR, overdue AR, AP due soon and close-task completion. Fix the report date and currency in every output. Build the reference examples in docs/03-zoho-dashboard-blueprint.md by hand before coding them.",
        "failure_lab": "Use a payment after the as-of date, a due date equal to the report date, an unapplied credit and mixed currencies. Explain why current balance cannot reconstruct every historical balance.",
        "deliverables": [
          "metric-dictionary.md",
          "metrics.sql",
          "reconciliation.md"
        ],
        "gate": "Every metric has an owner, grain, formula, exclusions, date basis, currency rule and drill-down; the reference exercise reconciles.",
        "transfer_challenge": "Explain a profit-versus-cash difference to a nontechnical manager in five sentences."
      },
      {
        "week": 6,
        "id": "W06",
        "title": "Ship the first useful dashboard",
        "prerequisites": [
          "W05"
        ],
        "concepts": [
          "Streamlit",
          "filters",
          "charts",
          "tables",
          "empty and error states"
        ],
        "resource_ids": [
          28
        ],
        "build": "Build a local dashboard over the fictional database with client/date filters, four metrics, an AR aging chart, invoice drill-down and a visible data timestamp. Keep SQL and calculations outside the UI code.",
        "failure_lab": "Test a client with no invoices, a data load failure, long client names and currency changes. Confirm a filter changes both headline metrics and underlying rows.",
        "deliverables": [
          "dashboard.py",
          "dashboard-demo.md",
          "screenshots"
        ],
        "gate": "Another person can launch the dashboard from its instructions and trace a KPI to the contributing records. No placeholder KPI is presented as a real calculation.",
        "transfer_challenge": "Add a disputed-invoice filter and show its effect without rewriting the dashboard."
      },
      {
        "week": 7,
        "id": "W07",
        "title": "Learn HTTP and build a paginated client",
        "prerequisites": [
          "W06"
        ],
        "concepts": [
          "HTTP methods and status codes",
          "headers and parameters",
          "JSON schema",
          "pagination",
          "timeouts"
        ],
        "resource_ids": [
          6,
          8,
          29
        ],
        "build": "Use a local mock Zoho-like API to fetch 450 invoices across three pages. Create a small client with explicit timeouts and schema validation. Expose a read-only summary endpoint in FastAPI and inspect the request and response.",
        "failure_lab": "Simulate a missing middle page, 429, 500 and a response missing page_context. Do not label partial data as a successful full sync.",
        "deliverables": [
          "mock_api_client.py",
          "api-contract.md",
          "pagination-tests"
        ],
        "gate": "All 450 unique invoices arrive once; incomplete fetches are detectable; explain URL, query, header, body and response in plain language.",
        "transfer_challenge": "Change page size without changing the final dataset."
      },
      {
        "week": 8,
        "id": "W08",
        "title": "Connect Zoho Books with read-only OAuth",
        "prerequisites": [
          "W07"
        ],
        "concepts": [
          "OAuth consent",
          "access and refresh tokens",
          "regional API domain",
          "organization_id",
          "least privilege"
        ],
        "resource_ids": [
          6,
          7,
          9
        ],
        "build": "Configure a permitted test organization and read-only connection, or use the OAuth simulator if access is unavailable. Fetch organizations and invoices, store normalized records and record source metadata. Keep credentials exclusively on the backend.",
        "failure_lab": "Expire an access token, revoke a refresh token, use the wrong organization and try the wrong regional domain. Distinguish refreshable expiry from a connection requiring reauthorization.",
        "deliverables": [
          "zoho_books_adapter.py",
          "connection-runbook.md",
          "redacted-connection-evidence.md"
        ],
        "gate": "A real read-only API call is evidenced when an account is available; otherwise label the work mock-only. Refresh and revoked-token behaviours pass; no secret appears in Git or browser data.",
        "transfer_challenge": "Explain how to reconnect without replacing or deleting the accounting data."
      },
      {
        "week": 9,
        "id": "W09",
        "title": "Join Zoho CRM with accounting records",
        "prerequisites": [
          "W08"
        ],
        "concepts": [
          "CRM module metadata",
          "API names",
          "cross-system identity",
          "custom fields",
          "separate quotas"
        ],
        "resource_ids": [
          10,
          11,
          12
        ],
        "build": "Add a CRM adapter for fictional or authorised Accounts and Deals. Map CRM accounts to Books contacts with an explicit reviewed identity table. Show onboarding stage beside invoice status and keep unmapped records in a queue.",
        "failure_lab": "Create identical client names, a changed custom field, a missing lookup and a CRM-only account. Never join clients solely on display name.",
        "deliverables": [
          "zoho_crm_adapter.py",
          "identity-map.sql",
          "unmapped-clients-report.md"
        ],
        "gate": "Mapped records join correctly, ambiguous identities stay unresolved, and CRM limits/configuration remain distinct from Books.",
        "transfer_challenge": "Demonstrate that a CRM closed-won amount is not automatically recognised revenue."
      },
      {
        "week": 10,
        "id": "W10",
        "title": "Make synchronization resilient",
        "prerequisites": [
          "W09"
        ],
        "concepts": [
          "upserts",
          "checkpoints",
          "backoff",
          "schedules",
          "data freshness",
          "recovery"
        ],
        "resource_ids": [
          6,
          8,
          11,
          12
        ],
        "build": "Add sync run records, idempotent upserts, retry limits, a per-product rate budget and last-success timestamps. Reconcile scheduled snapshots against source counts and totals. Use documented update filters only where supported; otherwise use bounded rescan and comparison.",
        "failure_lab": "Stop after page two, rerun a job, receive the same event twice and process an older update after a newer one. Exercise deletion/void handling and an expired notification subscription.",
        "deliverables": [
          "sync-worker",
          "recovery-runbook.md",
          "reconciliation-tests",
          "dashboard-health-view"
        ],
        "gate": "Reruns do not duplicate records, failed jobs preserve the prior successful snapshot, drift is visible and recovery is demonstrated.",
        "transfer_challenge": "Estimate request consumption for a proposed refresh interval and select one that fits the configured account budget."
      },
      {
        "week": 11,
        "id": "W11",
        "title": "Automate a complete operations handoff",
        "prerequisites": [
          "W10"
        ],
        "concepts": [
          "triggers and actions",
          "workflow state",
          "Deluge basics",
          "queue ownership",
          "service levels"
        ],
        "resource_ids": [
          14,
          15,
          33
        ],
        "build": "Choose Zoho Flow or n8n and build a missing-document workflow: detect a missing item, assign an owner, create a draft reminder, record the next review time and close the task when the evidence arrives. Use a local inbox simulator.",
        "failure_lab": "Replay the trigger, deliver the document twice and remove the assignee. Ensure failures enter an actionable queue instead of silently disappearing.",
        "deliverables": [
          "workflow-export",
          "workflow-SOP.md",
          "before-after-estimate.md"
        ],
        "gate": "One business event creates one active task, drafts are not sent automatically, and a teammate can recover an intentionally failed run.",
        "transfer_challenge": "Replace the trigger source without changing the business rules."
      },
      {
        "week": 12,
        "id": "W12",
        "title": "Use an LLM for a bounded extraction task",
        "prerequisites": [
          "W11"
        ],
        "concepts": [
          "tokens and context",
          "structured output",
          "schema validation",
          "abstention",
          "cost tracking"
        ],
        "resource_ids": [
          18,
          31,
          32
        ],
        "build": "Extract vendor, invoice number, dates, currency and amounts from fictional invoice text into a typed schema. Keep raw evidence offsets and allow null for unknown fields. Validate arithmetic using code and require review before any posting.",
        "failure_lab": "Remove a currency, make the total inconsistent and include irrelevant instructions in the invoice. Record invalid model output and retry within a fixed budget.",
        "deliverables": [
          "extractor",
          "20-case-extraction-evaluation",
          "prompt-version.md"
        ],
        "gate": "Required fields are correct or explicitly unresolved; arithmetic never depends on the model; every result has source evidence and measured usage.",
        "transfer_challenge": "Apply the same schema to a differently formatted invoice and explain the observed errors."
      },
      {
        "week": 13,
        "id": "W13",
        "title": "Answer policy questions with evidence",
        "prerequisites": [
          "W12"
        ],
        "concepts": [
          "retrieval augmented generation",
          "chunking",
          "metadata filters",
          "citations",
          "policy versions"
        ],
        "resource_ids": [
          19,
          31
        ],
        "build": "Create an SOP assistant over ten fictional policies. Start with keyword search; add embeddings only if the query set shows a retrieval gap. Filter by client and effective date before generating an answer.",
        "failure_lab": "Add conflicting versions, a missing policy and a similar policy for another client. Ask a question requiring information absent from the corpus.",
        "deliverables": [
          "policy-retriever",
          "20-question-evaluation",
          "citation-audit.md"
        ],
        "gate": "Answers cite the correct policy/version, unsupported questions abstain, and cross-client evidence is never returned in the test suite.",
        "transfer_challenge": "Update a policy and show how answers for historical and current dates differ."
      },
      {
        "week": 14,
        "id": "W14",
        "title": "Build a tool-using exception investigator",
        "prerequisites": [
          "W13"
        ],
        "concepts": [
          "agent loop",
          "tool schemas",
          "permissions",
          "stop conditions",
          "evidence bundle"
        ],
        "resource_ids": [
          18,
          20
        ],
        "build": "Implement a single agent with narrow read tools for invoice, payment, policy and exceptions. Let it investigate a disputed overdue balance and draft a recommended next step. The backend supplies allowed client identity and enforces access.",
        "failure_lab": "Offer an irrelevant tool, ask for another client's data, inject instructions in a note and cause a repeated tool failure. Enforce call and elapsed-time limits.",
        "deliverables": [
          "investigator-agent",
          "tool-contracts.md",
          "trace-examples"
        ],
        "gate": "The agent supports its recommendation with records, stops when evidence is insufficient and cannot send messages or post entries.",
        "transfer_challenge": "Resolve a different exception type using the same tools without adding a broad shell or arbitrary SQL tool."
      },
      {
        "week": 15,
        "id": "W15",
        "title": "Persist review and resume safely",
        "prerequisites": [
          "W14"
        ],
        "concepts": [
          "state machine",
          "LangGraph persistence",
          "approval binding",
          "resume",
          "audit events"
        ],
        "resource_ids": [
          22
        ],
        "build": "Represent investigate, draft, review, approved, rejected and completed states. Persist the proposed action, evidence and approval decision. Demonstrate resume after a restart in the simulator. Bind approval to action content and current source version.",
        "failure_lab": "Restart before and after approval, repeat the approval request and change the invoice while review is pending. A changed action or record requires fresh review.",
        "deliverables": [
          "review-workflow",
          "state-transition-tests",
          "approval-contract.md"
        ],
        "gate": "Only valid transitions succeed; retries do not duplicate effects; stale approvals cannot execute; the audit explains who approved what.",
        "transfer_challenge": "Reject an action, edit the draft, and prove the old approval cannot be reused."
      },
      {
        "week": 16,
        "id": "W16",
        "title": "Evaluate security reliability and cost",
        "prerequisites": [
          "W15"
        ],
        "concepts": [
          "held-out cases",
          "precision and recall",
          "outcome grading",
          "prompt injection",
          "tenant isolation",
          "trace review"
        ],
        "resource_ids": [
          21,
          24
        ],
        "build": "Assemble a 60-case evaluation suite using the split in the app specification. Score deterministic correctness, policy boundaries, evidence and end state. Repeat each held-out agent case three times and report all outcomes and cost per accepted result.",
        "failure_lab": "Use forged approval, malicious document content, unexpected tool outputs, unavailable models and budget exhaustion. Keep a deterministic fallback queue.",
        "deliverables": [
          "evaluation-report.md",
          "failure-taxonomy.md",
          "cost-report.md",
          "security-tests"
        ],
        "gate": "All critical isolation, approval and accounting checks pass on the suite; unsupported recommendations are visible; results are reproducible and include denominators.",
        "transfer_challenge": "Compare two prompt/model configurations on unchanged held-out cases and justify the choice with evidence."
      },
      {
        "week": 17,
        "id": "W17",
        "title": "Build an AP intake and review project",
        "prerequisites": [
          "W16"
        ],
        "concepts": [
          "invoice extraction",
          "duplicate candidates",
          "PO matching",
          "exception routing",
          "review productivity"
        ],
        "resource_ids": [
          4,
          16
        ],
        "build": "Combine extraction with a vendor directory and fictional purchase orders. Detect duplicate candidates and mismatched quantities or totals. Produce a draft bill and reviewer screen with source snippets, validation results and explanation.",
        "failure_lab": "Try a credit note, partial delivery, no PO, recurring vendor invoice and a bank-detail change. Route exceptions; do not treat similar amounts as proof of a duplicate.",
        "deliverables": [
          "AP-review-demo",
          "AP-evaluation.md",
          "AP-SOP.md"
        ],
        "gate": "The reviewer can correct fields and reject a proposal; duplicate detection reports precision/recall; no real payment or ledger write occurs.",
        "transfer_challenge": "Add a new vendor without disabling duplicate and validation controls."
      },
      {
        "week": 18,
        "id": "W18",
        "title": "Build close readiness and management commentary",
        "prerequisites": [
          "W17"
        ],
        "concepts": [
          "close dependencies",
          "reconciliation evidence",
          "variance analysis",
          "actuals versus forecast",
          "management review"
        ],
        "resource_ids": [
          3,
          5
        ],
        "build": "Create a multi-client close board with blocked tasks, evidence and reviewer status. Compute period variances in SQL and draft a concise commentary that cites the numbers and separates possible causes from established facts.",
        "failure_lab": "Use a zero prior-period denominator, incomplete data, late adjustment and unsupported explanation. Keep the close blocked when required evidence is missing.",
        "deliverables": [
          "close-dashboard",
          "management-pack.md",
          "close-runbook.md"
        ],
        "gate": "Dashboard status agrees with required task evidence; every number traces to a metric; unsupported causes are labelled hypotheses; financial conclusions require review.",
        "transfer_challenge": "Explain a late-arriving transaction's effect on a previously prepared report."
      },
      {
        "week": 19,
        "id": "W19",
        "title": "Adapt the system for QuickBooks and expose narrow tools",
        "prerequisites": [
          "W18"
        ],
        "concepts": [
          "adapter interface",
          "QuickBooks mapping",
          "sandbox",
          "MCP basics",
          "provider differences"
        ],
        "resource_ids": [
          4,
          23,
          34
        ],
        "build": "Inspect current QBO developer setup, then build a read-only adapter against an authorised sandbox or documented fixtures. Map invoice/payment entities into the existing canonical model. Expose one read-only metric tool through MCP as an extension.",
        "failure_lab": "Try mismatched account identities, unsupported field mappings, token expiry and a caller without access. Do not assume Zoho scopes, pagination or regional rules apply to QBO.",
        "deliverables": [
          "qbo-adapter-or-fixtures",
          "adapter-comparison.md",
          "read-only-MCP-demo"
        ],
        "gate": "The same canonical metric tests run against both adapters. Label actual sandbox evidence separately from mock evidence; explain the boundaries of the MCP tool.",
        "transfer_challenge": "Identify which dashboard components can be reused unchanged and which require accounting-specific remapping."
      },
      {
        "week": 20,
        "id": "W20",
        "title": "Demonstrate and hand over the portfolio",
        "prerequisites": [
          "W19"
        ],
        "concepts": [
          "stakeholder demo",
          "measurement",
          "runbooks",
          "incident recovery",
          "technical explanation"
        ],
        "resource_ids": [
          21
        ],
        "build": "Package three case studies: Zoho operations dashboard, AP exception review and close investigator. Present the business problem, architecture, baseline, test evidence, limitations and operating instructions. Conduct a live seeded incident and recovery drill.",
        "failure_lab": "Let a reviewer change a requirement and introduce an unseen data defect during the demo. Explain the tradeoff and repair the issue without handing the entire task to the tutor.",
        "deliverables": [
          "portfolio-index.md",
          "three-case-studies",
          "demo-recording-or-script",
          "handover-runbook.md",
          "next-90-days.md"
        ],
        "gate": "Score at least 80/100 on the portfolio rubric with no critical control failures; complete an independent variation and answer why the system uses an agent where it does.",
        "transfer_challenge": "Propose a scoped first-month pilot for either target company using only confirmed systems and a measurable baseline."
      }
    ]
  },
  "sources": [
    {
      "id": 1,
      "publisher": "Prudent Accountants",
      "title": "Accounting Firm in Minneapolis",
      "url": "https://prudentaccountants.com/",
      "date": "Undated",
      "use": "Public services and client segments; no inference of internal software stack."
    },
    {
      "id": 2,
      "publisher": "Prudent Accountants",
      "title": "Small Business Accounting Services Minneapolis",
      "url": "https://prudentaccountants.com/accounting-and-bookkeeping-services/",
      "date": "Undated",
      "use": "Bookkeeping and operational accounting context."
    },
    {
      "id": 3,
      "publisher": "Prudent Accountants",
      "title": "Fractional CFO Services for Small Business",
      "url": "https://prudentaccountants.com/cfo-services/",
      "date": "Undated",
      "use": "Advisory and management reporting context."
    },
    {
      "id": 4,
      "publisher": "Zeni",
      "title": "AI Accountant Agent",
      "url": "https://www.zeni.ai/ai-agents/ai-accountant-agent",
      "date": "Undated",
      "use": "Vendor describes transaction categorization, close, exceptions, and QBO Plus foundation. Claims are not independent performance validation."
    },
    {
      "id": 5,
      "publisher": "Zeni",
      "title": "AI CFO Agent",
      "url": "https://www.zeni.ai/ai-agents/ai-cfo-agent",
      "date": "Undated",
      "use": "Vendor positioning around runway, forecasts and insights."
    },
    {
      "id": 6,
      "publisher": "Zoho",
      "title": "Zoho Books API Introduction",
      "url": "https://www.zoho.com/books/api/v3/introduction/",
      "date": "Living documentation",
      "use": "Organization identity, regional domains and Books API rate limits."
    },
    {
      "id": 7,
      "publisher": "Zoho",
      "title": "Zoho Books API OAuth",
      "url": "https://www.zoho.com/books/api/v3/oauth/",
      "date": "Living documentation",
      "use": "Authorization, scopes, one-hour access tokens, refresh and revocation."
    },
    {
      "id": 8,
      "publisher": "Zoho",
      "title": "Zoho Books API Pagination",
      "url": "https://www.zoho.com/books/api/v3/pagination/",
      "date": "Living documentation",
      "use": "page, per_page and page_context.has_more_page."
    },
    {
      "id": 9,
      "publisher": "Zoho",
      "title": "Zoho Books API Invoices",
      "url": "https://www.zoho.com/books/api/v3/invoices/",
      "date": "Living documentation",
      "use": "Invoice endpoint and fields. Search-index excerpt accessible; direct page fetch failed."
    },
    {
      "id": 10,
      "publisher": "Zoho",
      "title": "Zoho CRM V8 APIs",
      "url": "https://www.zoho.com/crm/developer/docs/api/v8/",
      "date": "Living documentation",
      "use": "Separate CRM API surface, metadata, bulk, query and notifications."
    },
    {
      "id": 11,
      "publisher": "Zoho",
      "title": "Zoho CRM V8 API Limits",
      "url": "https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html",
      "date": "Living documentation",
      "use": "CRM credit and concurrency system; not interchangeable with Books limits."
    },
    {
      "id": 12,
      "publisher": "Zoho",
      "title": "Notifications APIs Overview",
      "url": "https://www.zoho.com/crm/developer/docs/api/v8/notifications/overview.html",
      "date": "Living documentation",
      "use": "Record event notifications and channel expiry."
    },
    {
      "id": 13,
      "publisher": "Zoho",
      "title": "Zoho Finance Connector for Zoho Analyti\u0063s",
      "url": "https://www.zoho.com/analyti\u0063s/help/connectors/zoho-books.html",
      "date": "Living documentation",
      "use": "Native BI connector alternative to custom dashboards."
    },
    {
      "id": 14,
      "publisher": "Zoho",
      "title": "Introduction to Deluge",
      "url": "https://www.zoho.com/deluge/help/",
      "date": "Living documentation",
      "use": "Zoho native scripting learning resource."
    },
    {
      "id": 15,
      "publisher": "Zoho",
      "title": "Create a Flow from Scratch",
      "url": "https://help.zoho.com/portal/en/kb/flow/user-guide/create-a-flow/building-a-flow/articles/create-a-flow-from-scratch",
      "date": "Living documentation",
      "use": "Native trigger and action automation."
    },
    {
      "id": 16,
      "publisher": "Zoho",
      "title": "AI Features in Zoho Books",
      "url": "https://www.zoho.com/us/books/help/ai-features/ai-features.html",
      "date": "Living documentation",
      "use": "Ask Zia, CoCreate, forecasting and anomalies; some AI field features explicitly early access."
    },
    {
      "id": 17,
      "publisher": "Intuit",
      "title": "Intuit Introduces Ground Breaking Virtual Team of AI Agents to Fuel Growth for Businesses",
      "url": "https://investors.intuit.com/news-events/press-releases/detail/1258/intuit-introduces-ground-breaking-virtual-team-of-ai-agents-to-fuel-growth-for-businesses",
      "date": "2025-07-01",
      "use": "Vendor announcement of accounting and payments agents; no independent ROI inference."
    },
    {
      "id": 18,
      "publisher": "Anthropic",
      "title": "Building Effective Agents",
      "url": "https://www.anthropic.com/engineering/building-effective-agents",
      "date": "2024-12-19",
      "use": "Workflows versus agents; add complexity only after a simple baseline."
    },
    {
      "id": 19,
      "publisher": "Anthropic",
      "title": "Effective Context Engineering for AI Agents",
      "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      "date": "2025-09-29",
      "use": "Selective retrieval and persistent state as agent design topics."
    },
    {
      "id": 20,
      "publisher": "Anthropic",
      "title": "Writing Effective Tools for AI Agents Using AI Agents",
      "url": "https://www.anthropic.com/engineering/writing-tools-for-agents",
      "date": "2025-09-11",
      "use": "Narrow tools, descriptions and evaluation."
    },
    {
      "id": 21,
      "publisher": "Anthropic",
      "title": "Demystifying Evals for AI Agents",
      "url": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
      "date": "2026-01-09",
      "use": "Outcome and trace grading, repeated trials, code/model/human graders."
    },
    {
      "id": 22,
      "publisher": "LangChain",
      "title": "LangGraph Overview",
      "url": "https://docs.langchain.com/oss/python/langgraph/overview",
      "date": "Living documentation",
      "use": "Stateful orchestration, persistence and human review."
    },
    {
      "id": 23,
      "publisher": "Model Context Protocol",
      "title": "What Is the Model Context Protocol",
      "url": "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro",
      "date": "2026-07-28 documentation version",
      "use": "Standard connection between AI apps and tools/data."
    },
    {
      "id": 24,
      "publisher": "OWASP GenAI Security Project",
      "title": "LLM Top 10",
      "url": "https://genai.owasp.org/llm-top-10/",
      "date": "2025 risk taxonomy on living page",
      "use": "Prompt injection, excessive agency, data exposure and unbounded consumption."
    },
    {
      "id": 25,
      "publisher": "Harvard CS50",
      "title": "Introduction to Programming with Python",
      "url": "https://cs50.harvard.edu/python/",
      "date": "Living course page",
      "use": "Beginner Python core; select lessons rather than promise full course in allocated hours."
    },
    {
      "id": 26,
      "publisher": "Harvard CS50",
      "title": "Introduction to Databases with SQL",
      "url": "https://cs50.harvard.edu/sql/",
      "date": "Living course page",
      "use": "Queries, relationships, schema, views and indexes."
    },
    {
      "id": 27,
      "publisher": "OpenStax",
      "title": "Principles of Accounting Volume 1 Financial Accounting",
      "url": "https://openstax.org/books/principles-financial-accounting/pages/1-1-explain-the-importance-of-accounting-and-distinguish-between-financial-and-managerial-accounting",
      "date": "2019",
      "use": "Accounting foundation entry point; selected concepts only."
    },
    {
      "id": 28,
      "publisher": "Streamlit",
      "title": "Get Started with Streamlit",
      "url": "https://docs.streamlit.io/get-started",
      "date": "Living documentation",
      "use": "Python-first dashboard learning path."
    },
    {
      "id": 29,
      "publisher": "FastAPI",
      "title": "Tutorial User Guide",
      "url": "https://fastapi.tiangolo.com/tutorial/",
      "date": "Living documentation",
      "use": "API boundaries, validation and backend fundamentals."
    },
    {
      "id": 30,
      "publisher": "MDN Web Docs",
      "title": "Learn Web Development",
      "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
      "date": "Living documentation",
      "use": "HTML, CSS, JavaScript and web fundamentals."
    },
    {
      "id": 31,
      "publisher": "Hugging Face",
      "title": "Welcome to the AI Agents Course",
      "url": "https://huggingface.co/learn/agents-course/en/unit0/introduction",
      "date": "Living course page",
      "use": "Agent concepts and practical course after Python prerequisites."
    },
    {
      "id": 32,
      "publisher": "DeepLearning.AI",
      "title": "Agentic AI",
      "url": "https://www.deeplearning.ai/courses/agentic-ai",
      "date": "Living course page",
      "use": "Optional structured alternative. Search-index description accessible; full page retrieval failed; enrollment terms not verified."
    },
    {
      "id": 33,
      "publisher": "n8n",
      "title": "n8n Academy Courses",
      "url": "https://learn.n8n.io/courses",
      "date": "Living course catalog",
      "use": "Optional workflow learning catalog; do not depend on old learning-path URLs."
    },
    {
      "id": 34,
      "publisher": "Intuit Developer",
      "title": "QuickBooks Online Sandboxes",
      "url": "https://developer.intuit.com/app/developer/qbo/docs/develop/sandboxes",
      "date": "Living developer portal",
      "use": "Implementation entry point only. Page returned a JavaScript shell, so current setup steps and quotas require checking in portal."
    },
    {
      "id": 35,
      "publisher": "Python Software Foundation",
      "title": "Decimal Fixed Point and Floating Point Arithmetic",
      "url": "https://docs.python.org/3/library/decimal.html",
      "date": "Python 3.14 documentation as retrieved",
      "use": "Decimal arithmetic and explicit rounding in accounting exercises."
    },
    {
      "id": 36,
      "publisher": "React",
      "title": "Quick Start",
      "url": "https://react.dev/learn",
      "date": "Living documentation",
      "use": "Optional custom UI extension; not an initial learner prerequisite."
    }
  ],
  "sourceDocument": "deliverables/LedgerOps-Curriculum-and-App-Plan.docx"
};

const DECK = {
  "meta": {
    "label": "LedgerOps Academy",
    "org": "Operations automation course",
    "source": "Research checked 13 September 2026"
  },
  "slides": [
    {
      layout: "cover",
      "tone": "dark",
      "eyebrow": "LEDGEROPS ACADEMY",
      "mark": [
        "20 WEEKS",
        "400 HOURS"
      ],
      "title": "Lead operations automation",
      "titleSub": "with Codex or Claude Code",
      "org": "A practical course and app plan",
      "footL": "Beginner level · 20 hours each week",
      "footR": "13 September 2026"
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 01 · 20 HOURS",
      "title": "Choose an automation",
      "sub": "Find repeated operational work and choose a dashboard, workflow, AI step or agent.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Find repeated operational work and choose a dashboard, workflow, AI step or agent.",
          "A brief for a fictional client-operations dashboard: client, invoice status, owner and next action.",
          "The owner, result, rules, limits and tests are clear."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "Practice case: a fictional client-operations dashboard. The invoice data is only an example; the transferable skill is designing a safe operational system."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 02 · 20 HOURS",
      "title": "Define reliable rules",
      "sub": "Turn business decisions into clear rules for status, dates, money, ownership and exceptions.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Turn business decisions into clear rules for status, dates, money, ownership and exceptions.",
          "Rules that classify fictional client invoices as open, paid, overdue, disputed or unknown.",
          "Hand-worked examples match the agent-built result."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 03 · 20 HOURS",
      "title": "Handle files and errors",
      "sub": "Learn how bad input is found, rejected and explained.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Learn how bad input is found, rejected and explained.",
          "A fake CSV/JSON import for client records, invoices and tasks with a rejected-row report.",
          "Bad rows are visible and the process can run again."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 04 · 20 HOURS",
      "title": "Understand data models",
      "sub": "Learn how records connect across clients, employees, tasks, documents and systems.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Learn how records connect across clients, employees, tasks, documents and systems.",
          "A small database linking fictional clients, invoices, payments, documents and owners.",
          "Every record has a clear meaning, key and relationship."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 05 · 20 HOURS",
      "title": "Define metrics first",
      "sub": "Write the meaning, source, owner, date rule and limits for each metric.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Write the meaning, source, owner, date rule and limits for each metric.",
          "Metric definitions for open invoices, overdue work, missing documents and client setup progress.",
          "Each number has a source, formula and reconciliation check."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 06 · 20 HOURS",
      "title": "Build a useful dashboard",
      "sub": "Turn a defined process into filters, charts, tables and drill-down views.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Turn a defined process into filters, charts, tables and drill-down views.",
          "A local client-operations dashboard with status filters, aging, owners and source-row drill-down.",
          "Another person can run it and trace every result."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 07 · 20 HOURS",
      "title": "Work with APIs",
      "sub": "Understand requests, responses, pagination, timeouts and invalid data.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Understand requests, responses, pagination, timeouts and invalid data.",
          "A mock Zoho-like API that returns fictional clients, invoices and tasks over three pages.",
          "All pages are read without duplicates and failures are visible."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 08 · 20 HOURS",
      "title": "Connect Zoho safely",
      "sub": "Learn read-only access, permissions, organisations, regions and secret handling.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Learn read-only access, permissions, organisations, regions and secret handling.",
          "A read-only Zoho Books simulator feeding the fictional client dashboard.",
          "No credentials enter the browser, repository or logs."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 09 · 20 HOURS",
      "title": "Join systems carefully",
      "sub": "Match records across Zoho CRM, Books or another operations system.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Match records across Zoho CRM, Books or another operations system.",
          "A reviewed map between fictional CRM accounts, Books contacts and client-service owners.",
          "Ambiguous records stay unresolved instead of being guessed."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 10 · 20 HOURS",
      "title": "Make sync reliable",
      "sub": "Learn checkpoints, retries, duplicate protection, freshness and recovery.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Learn checkpoints, retries, duplicate protection, freshness and recovery.",
          "A scheduled sync of the fictional Zoho data with checkpoints and a last-good snapshot.",
          "A failed run cannot replace trusted data."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 11 · 20 HOURS",
      "title": "Automate a handoff",
      "sub": "Turn an operational trigger into ownership, reminders, review and closure.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Turn an operational trigger into ownership, reminders, review and closure.",
          "A missing-client-document workflow that assigns an owner and drafts a reminder.",
          "One event creates one task with a clear owner and next step."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 12 · 20 HOURS",
      "title": "Extract document data",
      "sub": "Use AI for messy text while fixed rules check the result.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Use AI for messy text while fixed rules check the result.",
          "AI extraction of vendor, client, invoice, date and amount from fictional document text.",
          "Unknown or risky fields go to review instead of being guessed."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 13 · 20 HOURS",
      "title": "Answer policy questions",
      "sub": "Search approved procedures and require evidence for each answer.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Search approved procedures and require evidence for each answer.",
          "A policy assistant over fictional onboarding, billing and document-handling SOPs.",
          "Every answer cites the right policy or says it cannot answer."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 14 · 20 HOURS",
      "title": "Build a small agent",
      "sub": "Use narrow read-only tools when the next investigation step depends on new evidence.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Use narrow read-only tools when the next investigation step depends on new evidence.",
          "A read-only investigator that explains why a fictional client task or invoice is blocked.",
          "The agent stops when proof or permission is missing."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 15 · 20 HOURS",
      "title": "Add approval states",
      "sub": "Design draft, review, approval, rejection, resume and completion safely.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Design draft, review, approval, rejection, resume and completion safely.",
          "A review queue for proposed reminders, matches and status changes.",
          "Retries do not repeat an approved action."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 16 · 20 HOURS",
      "title": "Evaluate the system",
      "sub": "Measure correctness, access safety, evidence quality, reliability and cost.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Measure correctness, access safety, evidence quality, reliability and cost.",
          "A 60-case test pack covering fictional clients, documents, sync failures and agent decisions.",
          "Critical money, access and approval failures always fail."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 17 · 20 HOURS",
      "title": "Review incoming bills",
      "sub": "Combine extraction, duplicate checks, purchase-order checks and exception routing.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Combine extraction, duplicate checks, purchase-order checks and exception routing.",
          "A fictional vendor-bill review screen with duplicate candidates and reviewer evidence.",
          "Reviewers can see evidence and measure wrong suggestions."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 18 · 20 HOURS",
      "title": "Track close readiness",
      "sub": "Show blocked tasks, missing proof, variance and management commentary.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Show blocked tasks, missing proof, variance and management commentary.",
          "A fictional multi-client readiness board for period-end tasks and evidence.",
          "Every status and commentary claim has evidence."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 19 · 20 HOURS",
      "title": "Adapt to another system",
      "sub": "Learn adapters, provider differences, sandbox testing and narrow tools.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Learn adapters, provider differences, sandbox testing and narrow tools.",
          "A read-only QuickBooks version of the same fictional client-operations dashboard.",
          "The same metric tests pass across both systems."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "table",
      "section": "20-WEEK CURRICULUM",
      "eyebrow": "WEEK 20 · 20 HOURS",
      "title": "Present and hand over",
      "sub": "Explain the business result, architecture, tests, limits, ownership and recovery.",
      "cols": [
        "What you learn",
        "Fictional build",
        "How you pass"
      ],
      "rows": [
        [
          "Explain the business result, architecture, tests, limits, ownership and recovery.",
          "Three fictional case studies, demos, runbooks and a seeded incident-recovery exercise.",
          "A stakeholder can understand, run and recover the work."
        ],
        [
          "Agent flow",
          "Brief → plan → build → check → review → fix → handover.",
          "You can explain the result and its limits."
        ],
        [
          "Operations lens",
          "Improve visibility, ownership and recovery; keep high-risk actions human-approved.",
          "The workflow has a clear owner and safe stop."
        ]
      ],
      "note": "You define the business rules and review the evidence. Codex or Claude Code implements the technical parts."
    },
    {
      layout: "closing",
      "tone": "dark",
      "title": "Start with one clear workflow",
      "b": "Choose the operational result, define the rules and failure path, then direct Codex or Claude Code to build the smallest complete version.",
      "footL": "LedgerOps Academy",
      "footR": "22-slide course plan"
    }
  ]
};
