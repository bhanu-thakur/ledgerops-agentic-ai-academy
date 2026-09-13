/* Generated from the researched LedgerOps Academy source files.
   Full weekly mission detail and complete source metadata remain in DATA for audit. */
const DATA = {
  "asOf": "2026-09-13",
  "programme": "LedgerOps Academy",
  "curriculum": {
    "schema_version": "1.0",
    "programme": "LedgerOps Academy",
    "level": "beginner",
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
        "title": "Understand the process and run your first script",
        "prerequisites": [],
        "concepts": [
          "terminal and files",
          "variables and functions",
          "Git commits",
          "invoice versus payment",
          "process discovery"
        ],
        "resource_ids": [
          25,
          27
        ],
        "build": "Create a repository workspace, run a Python script and describe a fictional client-to-invoice-to-payment process. Enter ten fictional invoices as dictionaries with string amounts. Print the invoice count and a labelled summary. Draw the handoffs, owner and exception path.",
        "failure_lab": "Change a file path, remove a required field and introduce a syntax error. Read each error and explain the smallest repair.",
        "deliverables": [
          "first_script.py",
          "process-map.md",
          "data-dictionary.md",
          "learning-log.md"
        ],
        "gate": "Run the script from a fresh terminal, explain every line, distinguish an invoice from cash received and make a meaningful Git commit.",
        "transfer_challenge": "Add a new fictional client and one new invoice without asking the tutor to write the change."
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
    "org": "Accounting operations automation course",
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
      "title": "Learn accounting",
      "titleSub": "automation and agentic AI",
      "org": "A practical course and app plan",
      "footL": "Beginner level · 20 hours each week",
      "footR": "13 September 2026"
    },
    {
      layout: "statement",
      "tone": "dark",
      "section": "GOAL",
      "eyebrow": "WHAT THIS COURSE PREPARES YOU TO DO",
      "title": "Improve real work",
      "sub": "Learn how an accounting process works, automate the right parts and make failures easy to see.",
      "text": "You will learn to map a process, connect approved systems, build clear dashboards, handle errors and use an AI agent only when it adds real value. Every result should be easy to check and easy for another person to run.",
      "cites": [
        "S1 · S2 · S3 · S4 · S5"
      ]
    },
    {
      layout: "table",
      "section": "JOB TARGETS",
      "eyebrow": "PRUDENT ACCOUNTANTS AND ZENI",
      "title": "What to practise",
      "sub": "The same core skills can support both companies, but the first projects may differ.",
      "cols": [
        "Area",
        "Prudent Accountants",
        "Zeni"
      ],
      "rows": [
        [
          "Public focus",
          "Bookkeeping, tax, payroll and CFO services",
          "AI Accountant and AI CFO products"
        ],
        [
          "Useful practice",
          "Client setup, missing files and close tracking",
          "Transaction review, close checks and forecasts"
        ],
        [
          "Likely first view",
          "Client work and close status",
          "Actuals, exceptions and forecast inputs"
        ],
        [
          "System approach",
          "Learn the real tools after joining",
          "Include a QuickBooks practice project"
        ],
        [
          "Shared rule",
          "Show the source behind every important number",
          "Show the source behind every important number"
        ]
      ],
      "note": "Sources S1 · S2 · S3 · S4 · S5. Public pages do not show either company's full internal process or software setup."
    },
    {
      layout: "hier",
      "section": "JOB SKILLS",
      "eyebrow": "WHAT GOOD WORK LOOKS LIKE",
      "title": "Four habits",
      "sub": "A good automation saves time, shows problems and can be handed to another person.",
      "items": [
        {
          "tag": "01",
          "t": "Understand the process",
          "b": "Find the owner, inputs, rules, handoffs and common problems."
        },
        {
          "tag": "02",
          "t": "Trust the data",
          "b": "Define each number and show where it came from."
        },
        {
          "tag": "03",
          "t": "Control the automation",
          "b": "Keep logs, reviews and a safe way to stop or recover."
        },
        {
          "tag": "04",
          "t": "Hand it over",
          "b": "Write simple instructions and prove the result with a small pilot."
        }
      ]
    },
    {
      layout: "table",
      "section": "TIME PLAN",
      "eyebrow": "20 HOURS EACH WEEK",
      "title": "Spend most of the time building",
      "sub": "Study only what helps the current task, then test it and explain it in your own words.",
      "cols": [
        "Activity",
        "Hours",
        "Why"
      ],
      "rows": [
        [
          "Guided learning",
          3,
          "Learn the ideas needed this week"
        ],
        [
          "Building",
          11,
          "Make something that works"
        ],
        [
          "Breaking and fixing",
          3,
          "Learn how to recover from errors"
        ],
        [
          "Explain from memory",
          2,
          "Check that you understand the work"
        ],
        [
          "Notes and research",
          1,
          "Keep clear instructions and fresh sources"
        ]
      ],
      "total": [
        "Total",
        20,
        "Repeat important skills after 1, 3, 7 and 14 days"
      ]
    },
    {
      layout: "timeline",
      "section": "COURSE MAP",
      "eyebrow": "20 WEEKS",
      "title": "From first script to job-ready projects",
      "sub": "Build the data skills first. Add agents after you can test the system underneath them.",
      "items": [
        {
          "d": "W1–W5",
          "t": "Basics",
          "b": "Python, money, tests, SQL and clear metrics"
        },
        {
          "d": "W6–W10",
          "t": "Dashboard",
          "b": "Local dashboard, HTTP, Zoho Books and CRM"
        },
        {
          "d": "W11–W13",
          "t": "Useful AI",
          "b": "Workflow maps, document reading and policy search"
        },
        {
          "d": "W14–W16",
          "t": "Agents",
          "b": "Tools, review steps, safety and testing"
        },
        {
          "d": "W17–W20",
          "t": "Portfolio",
          "b": "AP, close, QuickBooks and handover",
          "state": "next"
        }
      ]
    },
    {
      layout: "table",
      "section": "START HERE",
      "eyebrow": "YOUR FIRST 20 HOURS",
      "title": "Build one invoice script",
      "sub": "Week one ends with working code, a simple process map and an explanation you can repeat.",
      "cols": [
        "Day",
        "Hours",
        "Result"
      ],
      "rows": [
        [
          "Monday",
          2,
          "Install Python and run your first command"
        ],
        [
          "Tuesday",
          2,
          "Create ten fake invoices and print the count"
        ],
        [
          "Wednesday",
          2,
          "Map invoices, payments, owners and errors"
        ],
        [
          "Thursday",
          2,
          "Break the script and repair two errors"
        ],
        [
          "Friday",
          2,
          "Check and save the work with Git"
        ],
        [
          "Saturday",
          5,
          "Build and test an invoice summary"
        ],
        [
          "Sunday",
          5,
          "Rebuild one part and explain every line"
        ]
      ]
    },
    {
      layout: "table",
      "section": "20-WEEK COURSE",
      "eyebrow": "WEEKS 1 TO 5",
      "title": "Learn the basics",
      "sub": "Write small Python programs, work with money safely, test your code, use SQL and define useful numbers.",
      "cols": [
        "Week",
        "Main task",
        "What you build",
        "How you pass"
      ],
      "rows": [
        [
          "W01",
          "First script",
          "Invoice list and process map",
          "Run it and explain every line"
        ],
        [
          "W02",
          "Money rules",
          "Balance and overdue functions",
          "Match the hand-worked totals"
        ],
        [
          "W03",
          "Files and tests",
          "Clean data and error report",
          "Show that bad rows are handled"
        ],
        [
          "W04",
          "SQL basics",
          "Small accounting database",
          "Five reports match your checks"
        ],
        [
          "W05",
          "Metric rules",
          "Clear rules for four numbers",
          "Each number has a source and owner"
        ]
      ]
    },
    {
      layout: "table",
      "section": "20-WEEK COURSE",
      "eyebrow": "WEEKS 6 TO 10",
      "title": "Build the first dashboard",
      "sub": "Build a local dashboard, learn HTTP and connect read-only Zoho Books and CRM data.",
      "cols": [
        "Week",
        "Main task",
        "What you build",
        "How you pass"
      ],
      "rows": [
        [
          "W06",
          "First dashboard",
          "Filters, charts and source details",
          "Another person can run it"
        ],
        [
          "W07",
          "HTTP and pages",
          "Mock API with 450 invoices",
          "Read all pages with no duplicates"
        ],
        [
          "W08",
          "Zoho Books",
          "Read-only test connection",
          "No secret enters Git or the browser"
        ],
        [
          "W09",
          "Zoho CRM",
          "Safe match between clients and contacts",
          "Unclear matches stay unresolved"
        ],
        [
          "W10",
          "Safe sync",
          "Retries, checkpoints and last-good data",
          "A failed run does not harm the view"
        ]
      ]
    },
    {
      layout: "table",
      "section": "20-WEEK COURSE",
      "eyebrow": "WEEKS 11 TO 15",
      "title": "Add safe AI",
      "sub": "Map workflows, extract data from documents, find policy evidence and build a small tool-using agent.",
      "cols": [
        "Week",
        "Main task",
        "What you build",
        "How you pass"
      ],
      "rows": [
        [
          "W11",
          "One full workflow",
          "Missing-document task and draft",
          "One event creates one open task"
        ],
        [
          "W12",
          "Read invoice text",
          "Typed fields from fake documents",
          "Wrong fields are marked unresolved"
        ],
        [
          "W13",
          "Find policy proof",
          "Helper for ten fake policies",
          "Every answer cites the right policy"
        ],
        [
          "W14",
          "Small agent",
          "Read-only exception investigator",
          "It stops when proof is missing"
        ],
        [
          "W15",
          "Review states",
          "Draft, review and approval flow",
          "Retries never repeat an action"
        ]
      ]
    },
    {
      layout: "table",
      "section": "20-WEEK COURSE",
      "eyebrow": "WEEKS 16 TO 20",
      "title": "Prove your work",
      "sub": "Test the agent, build two accounting projects, add a QuickBooks version and prepare the handover.",
      "cols": [
        "Week",
        "Main task",
        "What you build",
        "How you pass"
      ],
      "rows": [
        [
          "W16",
          "Agent tests",
          "Sixty repeatable cases",
          "All money and access checks pass"
        ],
        [
          "W17",
          "Bill review",
          "Fields, duplicates and policy checks",
          "Measure wrong suggestions"
        ],
        [
          "W18",
          "Close helper",
          "Tasks, proof and status board",
          "Every status has evidence"
        ],
        [
          "W19",
          "QuickBooks version",
          "Second read-only connector",
          "The same metric tests still pass"
        ],
        [
          "W20",
          "Portfolio",
          "Three demos and runbooks",
          "Score 80/100 with no critical failure"
        ]
      ]
    },
    {
      layout: "hier",
      "section": "ZOHO PROJECT",
      "eyebrow": "HOW THE DATA MOVES",
      "title": "A safe dashboard path",
      "sub": "Login details stay on the server. The dashboard receives checked data and clear numbers.",
      "items": [
        {
          "tag": "01",
          "t": "Read Zoho data",
          "b": "Use separate read-only connections for Books and CRM."
        },
        {
          "tag": "02",
          "t": "Check the data",
          "b": "Reject broken records and keep the source identity."
        },
        {
          "tag": "03",
          "t": "Save a clean copy",
          "b": "Use stable IDs so repeated syncs do not create duplicates."
        },
        {
          "tag": "04",
          "t": "Calculate the numbers",
          "b": "Keep money and date rules in tested SQL or Python."
        },
        {
          "tag": "05",
          "t": "Show the dashboard",
          "b": "Let users open the source record behind a result."
        }
      ],
      "cite": "S6 · S7 · S8 · S9 · S10 · S11 · S12"
    },
    {
      layout: "stats",
      "section": "ZOHO PROJECT",
      "eyebrow": "API BASICS",
      "title": "Rules to check before coding",
      "sub": "Books and CRM use different permissions and limits. Confirm the real account settings first.",
      "items": [
        {
          "fig": "100",
          "unit": "requests each minute",
          "lab": "Books reference value for one organisation",
          "accent": true,
          "note": "S6"
        },
        {
          "fig": "1",
          "unit": "hour",
          "lab": "Access-token life in the checked Books guide",
          "note": "S7"
        },
        {
          "fig": "READ",
          "unit": "only",
          "lab": "Start with the smallest permissions"
        },
        {
          "fig": "V8",
          "unit": "CRM API",
          "lab": "Track its limits in a separate connector",
          "note": "S10 · S11 · S12"
        }
      ],
      "foot": "These values can vary by product, plan and region. Check the official page and the live account before use."
    },
    {
      layout: "steps",
      "section": "ZOHO PROJECT",
      "eyebrow": "SYNC WITHOUT LOSING TRUST",
      "title": "Fetch, check, save, recover",
      "sub": "If one page fails, keep the last good dashboard and show that the data may be old.",
      "items": [
        {
          "n": "01",
          "t": "Fetch",
          "list": [
            "Set time limits",
            "Read every page of results"
          ]
        },
        {
          "n": "02",
          "t": "Check",
          "list": [
            "Reject unknown shapes",
            "Keep company and source IDs"
          ]
        },
        {
          "n": "03",
          "t": "Save",
          "list": [
            "Replace data only after a full success",
            "Save the new checkpoint last"
          ]
        },
        {
          "n": "04",
          "t": "Recover",
          "list": [
            "Retry temporary errors",
            "Check voids, deletes and missed updates"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "ZOHO PROJECT",
      "eyebrow": "DATA AND NUMBERS",
      "title": "Keep the model simple",
      "sub": "Store clear source records, then calculate dashboard numbers with written rules.",
      "cols": [
        "Part",
        "What to store or define",
        "How to check it"
      ],
      "rows": [
        [
          "Client and connection",
          "Client, product, organisation, region and secret reference",
          "Confirm the right company and account"
        ],
        [
          "Invoices and bills",
          "Source ID, dates, status, currency, total and balance",
          "Compare with the source system"
        ],
        [
          "Payments and credits",
          "Amount, date and the invoice it was used against",
          "Rebuild balances for a chosen date"
        ],
        [
          "Sync run",
          "Start, finish, page count, checkpoint and error",
          "Prove that retry does not duplicate data"
        ],
        [
          "Metric rule",
          "Owner, formula, exclusions, dates and currency",
          "Test edge cases and reconcile totals"
        ],
        [
          "Close task",
          "Client, period, owner, due date, evidence and state",
          "Return N/A when nothing is required"
        ]
      ],
      "note": "Store money as exact decimal values or integer cents. Do not use normal floating-point values for final accounting totals."
    },
    {
      layout: "hero",
      "tone": "dark",
      "section": "ZOHO PROJECT",
      "eyebrow": "EASY EXAMPLE",
      "title": "Open invoices",
      "sub": "At 31 August 2026, two real invoices are still open. A draft is left out.",
      "figure": "$1,100",
      "unit": "open amount",
      "label": "$600 from invoice A plus $500 from invoice B",
      "aside": [
        {
          "fig": "$600",
          "lab": "overdue amount"
        },
        {
          "fig": "30",
          "lab": "days late for invoice A"
        }
      ],
      "note": "A paid invoice adds zero. A later $100 credit changes the total only when it is valid on or before the report date."
    },
    {
      layout: "table",
      "section": "CHOOSING AI",
      "eyebrow": "USE THE SIMPLEST TOOL THAT WORKS",
      "title": "Code, workflow or agent?",
      "sub": "Keep money calculations in normal code. Use an agent for messy text or an investigation that can change direction.",
      "cols": [
        "Task",
        "Best starting choice",
        "Reason"
      ],
      "rows": [
        [
          "Calculate money or age",
          "SQL or Python",
          "The rule is clear and easy to test"
        ],
        [
          "Follow the same known steps",
          "Fixed workflow",
          "The order and approvals are known"
        ],
        [
          "Read messy text",
          "Workflow with an AI step",
          "The model handles text; code checks the output"
        ],
        [
          "Choose the next check",
          "Small agent",
          "The next step depends on new proof"
        ],
        [
          "Proof is missing",
          "Stop and ask",
          "Do not guess in accounting work"
        ],
        [
          "Send or post something",
          "Human approval",
          "Check the exact action before it runs"
        ]
      ],
      "note": "Start with normal code. Add a workflow next. Use an agent only when the path must change. Source S18."
    },
    {
      layout: "hier",
      "section": "AGENTIC AI",
      "eyebrow": "A SMALL, CHECKABLE LOOP",
      "title": "Proof before action",
      "sub": "An accounting agent should show what it checked, what it found and why it stopped.",
      "items": [
        {
          "tag": "01",
          "t": "Start from a clear case",
          "b": "Normal code finds the overdue invoice or other exception."
        },
        {
          "tag": "02",
          "t": "Use small tools",
          "b": "The agent can read approved invoices, mappings and policy pages."
        },
        {
          "tag": "03",
          "t": "Save the trail",
          "b": "Record each tool call, result, source and open question."
        },
        {
          "tag": "04",
          "t": "Ask a person",
          "b": "Show the amount, proof and draft before any outside action."
        },
        {
          "tag": "05",
          "t": "Check again",
          "b": "Make sure the source did not change before doing the action."
        }
      ],
      "cite": "S19 · S20 · S21 · S22 · S23"
    },
    {
      layout: "cards",
      "section": "AGENTIC AI",
      "eyebrow": "SAFETY AND APPROVAL",
      "title": "Controls belong in the app",
      "sub": "A prompt is only an instruction. The software must enforce access, approval and recovery rules.",
      "cols": 2,
      "items": [
        {
          "icon": "shield",
          "t": "Keep clients separate",
          "b": "Use the signed-in client ID for every data read, search, cache and export."
        },
        {
          "icon": "shield",
          "t": "Protect login details",
          "b": "Keep tokens on the server and remove secrets from learning exports."
        },
        {
          "icon": "check",
          "t": "Approve one exact action",
          "b": "Save the client, amount, destination, source version, reviewer and expiry."
        },
        {
          "icon": "layers",
          "t": "Recover safely",
          "b": "Use checkpoints and unique action IDs. Check the target after an uncertain timeout."
        }
      ],
      "note": "S24"
    },
    {
      layout: "table",
      "section": "AGENTIC AI",
      "eyebrow": "HOW TO TEST IT",
      "title": "Sixty repeatable cases",
      "sub": "A strong demo must pass normal cases, hard edge cases and hidden variations.",
      "cols": [
        "Test group",
        "Cases",
        "What success means"
      ],
      "rows": [
        [
          "Accounting and data",
          20,
          "Correct totals, dates and matching"
        ],
        [
          "API and sync",
          15,
          "All pages read, retries safe and errors visible"
        ],
        [
          "Agent and proof",
          15,
          "Right tools, useful sources and safe stopping"
        ],
        [
          "Security and recovery",
          10,
          "Blocked bad access and successful restore"
        ],
        [
          "Visible while building",
          40,
          "Used for daily development"
        ],
        [
          "Hidden variations",
          20,
          "Used to test real understanding"
        ]
      ],
      "total": [
        "Total",
        60,
        "Critical money, access or approval failures always fail the project"
      ]
    },
    {
      layout: "steps",
      "section": "LEARNING APP",
      "eyebrow": "HOW PRACTICE WORKS",
      "title": "Try, check, explain, repeat",
      "sub": "The app helps you learn by doing the work again with changed data.",
      "items": [
        {
          "n": "01",
          "t": "Choose",
          "list": [
            "Open the next ready task",
            "Review weak skills first"
          ]
        },
        {
          "n": "02",
          "t": "Try",
          "list": [
            "Work in a local folder",
            "Ask for one hint at a time"
          ]
        },
        {
          "n": "03",
          "t": "Check",
          "list": [
            "Run clear tests",
            "Save the result and your explanation"
          ]
        },
        {
          "n": "04",
          "t": "Repeat",
          "list": [
            "Use different data",
            "Come back after a few days"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "LEARNING APP",
      "eyebrow": "FIRST VERSION",
      "title": "What the app needs",
      "sub": "Start with a small local app that stores progress and gives another tutor enough context to continue.",
      "cols": [
        "Part",
        "Job"
      ],
      "rows": [
        [
          "Today",
          "Show the next task, needed skill and expected result"
        ],
        [
          "Roadmap",
          "Keep attempted, passed and review-due work separate"
        ],
        [
          "Mission",
          "Give a small task, starter files and pass checks"
        ],
        [
          "Practice data",
          "Serve fake accounting records and planned failures"
        ],
        [
          "Review",
          "Save tests, file hash, feedback and hints used"
        ],
        [
          "Progress engine",
          "Rebuild skill status from saved events"
        ],
        [
          "Tutor export",
          "Share clean learning context without secrets"
        ],
        [
          "Optional connector",
          "Read Zoho data and keep the last good copy"
        ]
      ]
    },
    {
      layout: "timeline",
      "section": "LEARNING APP",
      "eyebrow": "BUILD ORDER",
      "title": "Four useful releases",
      "sub": "Build the learning habit first. Add live systems and code running only after the basics work.",
      "items": [
        {
          "d": "M1 · 12–20h",
          "t": "Learning shell",
          "b": "Today, roadmap, local progress and tutor export"
        },
        {
          "d": "M2 · 20–35h",
          "t": "First tasks",
          "b": "Ten fake invoices, mock API and clear grading"
        },
        {
          "d": "M3 · 25–45h",
          "t": "Full course",
          "b": "Twenty missions, review dates and evidence history"
        },
        {
          "d": "M4 · 20–40h+",
          "t": "Read-only Zoho",
          "b": "Optional live connector after safe local practice",
          "state": "next"
        }
      ]
    },
    {
      layout: "steps",
      "section": "NEW ROLE",
      "eyebrow": "FIRST 90 DAYS",
      "title": "Start small and prove value",
      "sub": "Learn the work first, test one small change and then make it reliable.",
      "cols": 3,
      "items": [
        {
          "n": "1–30",
          "t": "Learn",
          "list": [
            "Watch two or three repeated workflows",
            "Write down volume, owners, rules and problems",
            "Build a read-only process view"
          ]
        },
        {
          "n": "31–60",
          "t": "Pilot",
          "list": [
            "Use a small approved group",
            "Compare old and new results",
            "Write the runbook and recovery steps"
          ]
        },
        {
          "n": "61–90",
          "t": "Strengthen",
          "list": [
            "Name the owner and rollback plan",
            "Add another case only after steady value",
            "Share results and remaining risks"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "PORTFOLIO",
      "eyebrow": "THREE JOB-READY PROJECTS",
      "title": "Show the work, proof and recovery",
      "sub": "Each project includes fake data, a demo, tests, limits and simple operating instructions.",
      "cols": [
        "Project",
        "What you show",
        "Hard test"
      ],
      "rows": [
        [
          "Zoho operations dashboard",
          "Metric rules, Books and CRM matching, links to source data",
          "Recover from a failed sync"
        ],
        [
          "Bill intake and review",
          "Extracted fields, possible duplicates and policy checks",
          "Measure wrong suggestions and reviewer fixes"
        ],
        [
          "Close readiness helper",
          "Task order, fixed variance rules and source-backed notes",
          "Pause, resume and hand the case to a person"
        ]
      ],
      "note": "Use fake data in public work. Time-saving claims stay estimates until a real pilot measures them."
    },
    {
      layout: "table",
      "section": "SOURCES",
      "eyebrow": "SOURCES 1 TO 9",
      "title": "Research sources 1 of 4",
      "sub": "These pages support the company research, technical plan and learning path.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Page",
        "Date or status"
      ],
      "rows": [
        [
          "S1",
          "Prudent Accountants",
          "Accounting Firm in Minneapolis",
          "Undated"
        ],
        [
          "S2",
          "Prudent Accountants",
          "Small Business Accounting Services Minneapolis",
          "Undated"
        ],
        [
          "S3",
          "Prudent Accountants",
          "Fractional CFO Services for Small Business",
          "Undated"
        ],
        [
          "S4",
          "Zeni",
          "AI Accountant Agent",
          "Undated"
        ],
        [
          "S5",
          "Zeni",
          "AI CFO Agent",
          "Undated"
        ],
        [
          "S6",
          "Zoho",
          "Zoho Books API Introduction",
          "Living documentation"
        ],
        [
          "S7",
          "Zoho",
          "Zoho Books API OAuth",
          "Living documentation"
        ],
        [
          "S8",
          "Zoho",
          "Zoho Books API Pagination",
          "Living documentation"
        ],
        [
          "S9",
          "Zoho",
          "Zoho Books API Invoices",
          "Living documentation"
        ]
      ],
      "note": "Checked 13 September 2026. Full links are stored in content.js and research/sources.json. Check live product pages again before building."
    },
    {
      layout: "table",
      "section": "SOURCES",
      "eyebrow": "SOURCES 10 TO 18",
      "title": "Research sources 2 of 4",
      "sub": "These pages support the company research, technical plan and learning path.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Page",
        "Date or status"
      ],
      "rows": [
        [
          "S10",
          "Zoho",
          "Zoho CRM V8 APIs",
          "Living documentation"
        ],
        [
          "S11",
          "Zoho",
          "Zoho CRM V8 API Limits",
          "Living documentation"
        ],
        [
          "S12",
          "Zoho",
          "Notifications APIs Overview",
          "Living documentation"
        ],
        [
          "S13",
          "Zoho",
          "Zoho Finance Connector for Zoho Analyti\u0063s",
          "Living documentation"
        ],
        [
          "S14",
          "Zoho",
          "Introduction to Deluge",
          "Living documentation"
        ],
        [
          "S15",
          "Zoho",
          "Create a Flow from Scratch",
          "Living documentation"
        ],
        [
          "S16",
          "Zoho",
          "AI Features in Zoho Books",
          "Living documentation"
        ],
        [
          "S17",
          "Intuit",
          "Intuit Introduces Ground Breaking Virtual Team of AI Agents to Fuel Growth for Businesses",
          "2025-07-01"
        ],
        [
          "S18",
          "Anthropic",
          "Building Effective Agents",
          "2024-12-19"
        ]
      ],
      "note": "Checked 13 September 2026. Full links are stored in content.js and research/sources.json. Check live product pages again before building."
    },
    {
      layout: "table",
      "section": "SOURCES",
      "eyebrow": "SOURCES 19 TO 27",
      "title": "Research sources 3 of 4",
      "sub": "These pages support the company research, technical plan and learning path.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Page",
        "Date or status"
      ],
      "rows": [
        [
          "S19",
          "Anthropic",
          "Effective Context Engineering for AI Agents",
          "2025-09-29"
        ],
        [
          "S20",
          "Anthropic",
          "Writing Effective Tools for AI Agents Using AI Agents",
          "2025-09-11"
        ],
        [
          "S21",
          "Anthropic",
          "Demystifying Evals for AI Agents",
          "2026-01-09"
        ],
        [
          "S22",
          "LangChain",
          "LangGraph Overview",
          "Living documentation"
        ],
        [
          "S23",
          "Model Context Protocol",
          "What Is the Model Context Protocol",
          "2026-07-28 documentation version"
        ],
        [
          "S24",
          "OWASP GenAI Security Project",
          "LLM Top 10",
          "2025 risk taxonomy on living page"
        ],
        [
          "S25",
          "Harvard CS50",
          "Introduction to Programming with Python",
          "Living course page"
        ],
        [
          "S26",
          "Harvard CS50",
          "Introduction to Databases with SQL",
          "Living course page"
        ],
        [
          "S27",
          "OpenStax",
          "Principles of Accounting Volume 1 Financial Accounting",
          "2019"
        ]
      ],
      "note": "Checked 13 September 2026. Full links are stored in content.js and research/sources.json. Check live product pages again before building."
    },
    {
      layout: "table",
      "section": "SOURCES",
      "eyebrow": "SOURCES 28 TO 36",
      "title": "Research sources 4 of 4",
      "sub": "These pages support the company research, technical plan and learning path.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Page",
        "Date or status"
      ],
      "rows": [
        [
          "S28",
          "Streamlit",
          "Get Started with Streamlit",
          "Living documentation"
        ],
        [
          "S29",
          "FastAPI",
          "Tutorial User Guide",
          "Living documentation"
        ],
        [
          "S30",
          "MDN Web Docs",
          "Learn Web Development",
          "Living documentation"
        ],
        [
          "S31",
          "Hugging Face",
          "Welcome to the AI Agents Course",
          "Living course page"
        ],
        [
          "S32",
          "DeepLearning.AI",
          "Agentic AI",
          "Living course page"
        ],
        [
          "S33",
          "n8n",
          "n8n Academy Courses",
          "Living course catalog"
        ],
        [
          "S34",
          "Intuit Developer",
          "QuickBooks Online Sandboxes",
          "Living developer portal"
        ],
        [
          "S35",
          "Python Software Foundation",
          "Decimal Fixed Point and Floating Point Arithmetic",
          "Python 3.14 documentation as retrieved"
        ],
        [
          "S36",
          "React",
          "Quick Start",
          "Living documentation"
        ]
      ],
      "note": "Checked 13 September 2026. Full links are stored in content.js and research/sources.json. Check live product pages again before building."
    },
    {
      layout: "closing",
      "tone": "dark",
      "title": "Start with ten fake invoices",
      "b": "Write the first script, break it on purpose and explain the fix. Small working steps will build the skills needed for dashboards, integrations and safe agents.",
      "footL": "LedgerOps Academy",
      "footR": "30-slide course and app plan"
    }
  ]
};
