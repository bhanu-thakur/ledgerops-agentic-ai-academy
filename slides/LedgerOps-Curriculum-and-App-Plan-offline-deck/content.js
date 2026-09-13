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
    "org": "Accounting operations automation curriculum",
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
      "title": "Accounting operations",
      "titleSub": "automation and agentic AI",
      "org": "Practical curriculum and learning-system plan",
      "footL": "Beginner route · 20 hours each week",
      "footR": "13 September 2026"
    },
    {
      layout: "statement",
      "tone": "dark",
      "section": "PURPOSE",
      "eyebrow": "ROLE OUTCOME",
      "title": "Operations automation",
      "sub": "The programme builds the ability to improve an accounting process and leave colleagues with a system they can operate.",
      "text": "The learner discovers the workflow, connects approved systems, calculates traceable metrics, handles exceptions and adds bounded AI only where interpretation or investigative branching creates a clear benefit.",
      "cites": [
        "S1 · S2 · S3 · S4 · S5"
      ]
    },
    {
      layout: "table",
      "section": "TARGET CONTEXT",
      "eyebrow": "PUBLIC EVIDENCE",
      "title": "Prudent and Zeni",
      "sub": "Both targets reward accounting operations judgment, while their public product context points to different integration priorities.",
      "cols": [
        "Area",
        "Prudent",
        "Zeni"
      ],
      "rows": [
        [
          "Public context",
          "Bookkeeping, tax, payroll and fractional CFO services",
          "AI Accountant and AI CFO products"
        ],
        [
          "Relevant practice",
          "Client onboarding, missing documents, close readiness",
          "Transaction exceptions, close review, forecast separation"
        ],
        [
          "Platform implication",
          "Confirm the internal stack after joining",
          "QuickBooks Online Plus is named publicly"
        ],
        [
          "Shared capability",
          "Trace every number to approved source evidence",
          "Trace every number to approved source evidence"
        ],
        [
          "First dashboard",
          "Client work and close readiness",
          "Actuals, exceptions and forecast assumptions"
        ],
        [
          "Integration route",
          "Start with the systems found during onboarding",
          "Include a QuickBooks adapter in the portfolio"
        ],
        [
          "Operating measure",
          "Queue age, correction rate and handover",
          "Exception resolution, evidence and review"
        ],
        [
          "Boundary",
          "No public evidence confirms its internal Zoho stack",
          "Do not assume a public API for proprietary agents"
        ]
      ],
      "note": "Sources S1 · S2 · S3 · S4 · S5. Company pages describe their own offerings and do not establish measured performance."
    },
    {
      layout: "hier",
      "section": "ROLE STANDARD",
      "eyebrow": "WHAT GOOD LOOKS LIKE",
      "title": "Reliable operating ownership",
      "sub": "A useful automation has measurable business value, visible exceptions and recovery instructions.",
      "items": [
        {
          "tag": "01",
          "t": "Process discovery",
          "b": "Identify the owner, inputs, decisions, handoffs and costly exceptions."
        },
        {
          "tag": "02",
          "t": "Trustworthy data",
          "b": "Define source identity, metric grain, filters and reconciliation before visual design."
        },
        {
          "tag": "03",
          "t": "Controlled automation",
          "b": "Log outcomes, preserve a review queue and stop safely when evidence is missing."
        },
        {
          "tag": "04",
          "t": "Handover",
          "b": "Provide runbooks, recovery drills, support ownership and a measured pilot result."
        }
      ]
    },
    {
      layout: "hero",
      "tone": "dark",
      "section": "COMMITMENT",
      "eyebrow": "BEGINNER ROUTE",
      "title": "Four hundred hours",
      "sub": "Twenty focused weeks create enough repetition to move from a first script to three explainable case studies.",
      "figure": 400,
      "unit": "study hours",
      "label": "20 hours each week for 20 weeks",
      "aside": [
        {
          "fig": 6,
          "lab": "first dashboard week"
        },
        {
          "fig": 14,
          "lab": "first tool agent week"
        }
      ],
      "note": "Dates are learning targets. A failed prerequisite gate shifts later work without increasing the weekly limit."
    },
    {
      layout: "table",
      "section": "LEARNING SYSTEM",
      "eyebrow": "WEEKLY ALLOCATION",
      "title": "Twenty-hour rhythm",
      "sub": "Most time goes into building, with protected time for testing, explanation and current-source review.",
      "cols": [
        "Activity",
        "Hours",
        "Purpose"
      ],
      "rows": [
        [
          "Guided learning",
          3,
          "Learn only what the current mission needs"
        ],
        [
          "Building",
          11,
          "Produce an observable accounting automation result"
        ],
        [
          "Failure testing",
          3,
          "Break assumptions and practise recovery"
        ],
        [
          "Recall and explanation",
          2,
          "Explain code and business logic without copying"
        ],
        [
          "Documentation and research",
          1,
          "Maintain runbooks and check current official sources"
        ]
      ],
      "total": [
        "Total",
        20,
        "Two hours each weekday and five hours on each weekend day is one workable calendar"
      ],
      "note": "The proposed revisit pattern is after 1, 3, 7 and 14 days, using changed data."
    },
    {
      layout: "timeline",
      "section": "CURRICULUM",
      "eyebrow": "DELIVERY PATH",
      "title": "Twenty-week sequence",
      "sub": "The sequence delays model-directed work until the learner can build and verify the underlying data system.",
      "items": [
        {
          "d": "W1–W6",
          "t": "Foundation",
          "b": "Python, accounting data, SQL and a working local dashboard"
        },
        {
          "d": "W7–W10",
          "t": "Integration",
          "b": "HTTP, Zoho Books and CRM, resilient synchronization"
        },
        {
          "d": "W11–W13",
          "t": "Bounded AI",
          "b": "Operations handoff, extraction and policy retrieval"
        },
        {
          "d": "W14–W16",
          "t": "Agent systems",
          "b": "Tool use, durable review, security and evaluation"
        },
        {
          "d": "W17–W20",
          "t": "Portfolio",
          "b": "AP, close, QuickBooks adaptation and handover",
          "state": "next"
        }
      ]
    },
    {
      layout: "table",
      "section": "START THIS WEEK",
      "eyebrow": "DAY BY DAY",
      "title": "The first twenty hours",
      "sub": "Week one ends with a working invoice script, a process map and an explanation the learner can reproduce.",
      "cols": [
        "Day",
        "Hours",
        "Visible result"
      ],
      "rows": [
        [
          "Monday",
          2,
          "Install the editor and Python, then run and record the first command"
        ],
        [
          "Tuesday",
          2,
          "Create ten fictional invoices as dictionaries and print a count"
        ],
        [
          "Wednesday",
          2,
          "Map invoice, payment, balance, owners and exception paths"
        ],
        [
          "Thursday",
          2,
          "Repair a path error and missing field from the traceback"
        ],
        [
          "Friday",
          2,
          "Use Git status, diff and commit after checking staged files"
        ],
        [
          "Saturday",
          5,
          "Build the invoice summary and run it from a fresh terminal"
        ],
        [
          "Sunday",
          5,
          "Rebuild one part, explain each line and complete the transfer task"
        ]
      ]
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "01",
      "of": 4,
      "at": 1,
      "title": "Technical foundation",
      "sub": "Programming, data modelling and metric definitions come before live integrations."
    },
    {
      layout: "table",
      "section": "CURRICULUM",
      "eyebrow": "WEEKS 1 TO 4",
      "title": "Programming foundation",
      "sub": "The first four weeks establish repeatable code, exact money calculations, tests and relational data.",
      "cols": [
        "Week",
        "Mission",
        "Build result",
        "Pass evidence"
      ],
      "rows": [
        [
          "W01",
          "Understand the process and run your first script",
          "Create a repository workspace, run a Python script and describe a fictional client-to-invoice-to-payment process.",
          "Run the script from a fresh terminal, explain every line, distinguish an invoice from cash received and make a meaningful Git commit."
        ],
        [
          "W02",
          "Control flow and reliable money calculations",
          "Write reusable functions for open balance and overdue flags.",
          "All hand-calculated examples agree exactly at the defined currency precision; drafts and void invoices are excluded according to the exercise policy."
        ],
        [
          "W03",
          "Files tests and debugging",
          "Import and validate a 100-record fictional invoice file, produce clean records and a rejected-record report, and test the core transformations.",
          "Every rejected record has its source ID or row number and reason; identical inputs produce identical totals; tests demonstrate the failure cases."
        ],
        [
          "W04",
          "Model accounting data with SQL",
          "Load clients, invoices, payments and allocations into SQLite.",
          "Five SQL reports match independently calculated examples, and referential checks identify orphan rows."
        ]
      ]
    },
    {
      layout: "table",
      "section": "CURRICULUM",
      "eyebrow": "WEEKS 5 TO 8",
      "title": "Metrics and first integration",
      "sub": "The learner defines financial metrics before building a dashboard and then connects a read-only Books adapter.",
      "cols": [
        "Week",
        "Mission",
        "Build result",
        "Pass evidence"
      ],
      "rows": [
        [
          "W05",
          "Define metrics before drawing charts",
          "Create a metric dictionary and queries for current AR, overdue AR, AP due soon and close-task completion.",
          "Every metric has an owner, grain, formula, exclusions, date basis, currency rule and drill-down; the reference exercise reconciles."
        ],
        [
          "W06",
          "Ship the first useful dashboard",
          "Build a local dashboard over the fictional database with client/date filters, four metrics, an AR aging chart, invoice drill-down and a visible data timestamp.",
          "Another person can launch the dashboard from its instructions and trace a KPI to the contributing records. No placeholder KPI is presented as a real calculation."
        ],
        [
          "W07",
          "Learn HTTP and build a paginated client",
          "Use a local mock Zoho-like API to fetch 450 invoices across three pages.",
          "All 450 unique invoices arrive once; incomplete fetches are detectable; explain URL, query, header, body and response in plain language."
        ],
        [
          "W08",
          "Connect Zoho Books with read-only OAuth",
          "Configure a permitted test organization and read-only connection, or use the OAuth simulator if access is unavailable.",
          "A real read-only API call is evidenced when an account is available; otherwise label the work mock-only. Refresh and revoked-token behaviours pass; no secret appears in Git or browser data."
        ]
      ]
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "02",
      "of": 4,
      "at": 2,
      "title": "Integrations and AI",
      "sub": "The middle phase joins systems, recovers from failures and introduces bounded model use."
    },
    {
      layout: "table",
      "section": "CURRICULUM",
      "eyebrow": "WEEKS 9 TO 12",
      "title": "Joined data and bounded AI",
      "sub": "CRM mapping and resilient synchronization come before the first language-model extraction task.",
      "cols": [
        "Week",
        "Mission",
        "Build result",
        "Pass evidence"
      ],
      "rows": [
        [
          "W09",
          "Join Zoho CRM with accounting records",
          "Add a CRM adapter for fictional or authorised Accounts and Deals.",
          "Mapped records join correctly, ambiguous identities stay unresolved, and CRM limits/configuration remain distinct from Books."
        ],
        [
          "W10",
          "Make synchronization resilient",
          "Add sync run records, idempotent upserts, retry limits, a per-product rate budget and last-success timestamps.",
          "Reruns do not duplicate records, failed jobs preserve the prior successful snapshot, drift is visible and recovery is demonstrated."
        ],
        [
          "W11",
          "Automate a complete operations handoff",
          "Choose Zoho Flow or n8n and build a missing-document workflow: detect a missing item, assign an owner, create a draft reminder, record the next review time and close the task when the evidence arrives.",
          "One business event creates one active task, drafts are not sent automatically, and a teammate can recover an intentionally failed run."
        ],
        [
          "W12",
          "Use an LLM for a bounded extraction task",
          "Extract vendor, invoice number, dates, currency and amounts from fictional invoice text into a typed schema.",
          "Required fields are correct or explicitly unresolved; arithmetic never depends on the model; every result has source evidence and measured usage."
        ]
      ]
    },
    {
      layout: "table",
      "section": "CURRICULUM",
      "eyebrow": "WEEKS 13 TO 16",
      "title": "Agent design and evaluation",
      "sub": "Evidence retrieval, tool use, durable review and evaluation turn an AI demo into an auditable workflow.",
      "cols": [
        "Week",
        "Mission",
        "Build result",
        "Pass evidence"
      ],
      "rows": [
        [
          "W13",
          "Answer policy questions with evidence",
          "Create an SOP assistant over ten fictional policies.",
          "Answers cite the correct policy/version, unsupported questions abstain, and cross-client evidence is never returned in the test suite."
        ],
        [
          "W14",
          "Build a tool-using exception investigator",
          "Implement a single agent with narrow read tools for invoice, payment, policy and exceptions.",
          "The agent supports its recommendation with records, stops when evidence is insufficient and cannot send messages or post entries."
        ],
        [
          "W15",
          "Persist review and resume safely",
          "Represent investigate, draft, review, approved, rejected and completed states.",
          "Only valid transitions succeed; retries do not duplicate effects; stale approvals cannot execute; the audit explains who approved what."
        ],
        [
          "W16",
          "Evaluate security reliability and cost",
          "Assemble a 60-case evaluation suite using the split in the app specification.",
          "All critical isolation, approval and accounting checks pass on the suite; unsupported recommendations are visible; results are reproducible and include denominators."
        ]
      ]
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "03",
      "of": 4,
      "at": 3,
      "title": "Portfolio delivery",
      "sub": "The final phase turns learned components into accounting operations case studies and handover evidence."
    },
    {
      layout: "table",
      "section": "CURRICULUM",
      "eyebrow": "WEEKS 17 TO 20",
      "title": "Portfolio and handover",
      "sub": "The final four weeks produce AP, close, QuickBooks and operating handover case studies.",
      "cols": [
        "Week",
        "Mission",
        "Build result",
        "Pass evidence"
      ],
      "rows": [
        [
          "W17",
          "Build an AP intake and review project",
          "Combine extraction with a vendor directory and fictional purchase orders.",
          "The reviewer can correct fields and reject a proposal; duplicate detection reports precision/recall; no real payment or ledger write occurs."
        ],
        [
          "W18",
          "Build close readiness and management commentary",
          "Create a multi-client close board with blocked tasks, evidence and reviewer status.",
          "Dashboard status agrees with required task evidence; every number traces to a metric; unsupported causes are labelled hypotheses; financial conclusions require review."
        ],
        [
          "W19",
          "Adapt the system for QuickBooks and expose narrow tools",
          "Inspect current QBO developer setup, then build a read-only adapter against an authorised sandbox or documented fixtures.",
          "The same canonical metric tests run against both adapters. Label actual sandbox evidence separately from mock evidence; explain the boundaries of the MCP tool."
        ],
        [
          "W20",
          "Demonstrate and hand over the portfolio",
          "Package three case studies: Zoho operations dashboard, AP exception review and close investigator.",
          "Score at least 80/100 on the portfolio rubric with no critical control failures; complete an independent variation and answer why the system uses an agent where it does."
        ]
      ]
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "04",
      "of": 4,
      "at": 4,
      "title": "Zoho dashboard",
      "sub": "The central technical project connects Books and CRM to a traceable operations view."
    },
    {
      layout: "hier",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "REFERENCE ARCHITECTURE",
      "title": "Data path and control points",
      "sub": "The browser receives approved records and metrics while tokens remain in the backend.",
      "items": [
        {
          "tag": "01",
          "t": "Zoho Books and CRM",
          "b": "Separate product adapters use the correct organization, region and read scopes."
        },
        {
          "tag": "02",
          "t": "Validated staging",
          "b": "Schema checks preserve raw evidence where policy permits and reject unknown shapes."
        },
        {
          "tag": "03",
          "t": "Normalized database",
          "b": "Stable tenant and source keys support upserts, reconciliation and audit history."
        },
        {
          "tag": "04",
          "t": "Versioned SQL metrics",
          "b": "Money and aging use deterministic definitions with explicit date and currency rules."
        },
        {
          "tag": "05",
          "t": "Dashboard and tools",
          "b": "The UI and optional agent share curated data and cannot bypass metric definitions."
        }
      ],
      "cite": "S6 · S7 · S8 · S9 · S10 · S11 · S12"
    },
    {
      layout: "stats",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "API CONTRACT",
      "title": "Connection constraints",
      "sub": "Books and CRM have different authorization and quota models, so the account configuration becomes part of the design.",
      "items": [
        {
          "fig": "100",
          "unit": "requests per minute",
          "lab": "Current Books reference per organization",
          "accent": true,
          "note": "S6"
        },
        {
          "fig": "1",
          "unit": "hour",
          "lab": "Books access-token lifetime in the retrieved OAuth reference",
          "note": "S7"
        },
        {
          "fig": "READ",
          "unit": "scopes",
          "lab": "Start with the minimum resource permissions"
        },
        {
          "fig": "V8",
          "unit": "CRM API",
          "lab": "Credits, concurrency and notifications require a separate adapter",
          "note": "S10 · S11 · S12"
        }
      ],
      "foot": "These are checked reference values, not universal Zoho limits. Confirm the actual subscription, region and account budget."
    },
    {
      layout: "steps",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "SYNC DESIGN",
      "title": "Reliable synchronization",
      "sub": "A failed page or expired connection must remain visible without destroying the last trusted view.",
      "items": [
        {
          "n": "01",
          "t": "Fetch",
          "list": [
            "Use timeouts and pagination",
            "Respect rate and concurrency budgets"
          ],
          "now": false
        },
        {
          "n": "02",
          "t": "Validate",
          "list": [
            "Reject unknown schemas",
            "Record tenant and source identity"
          ],
          "now": false
        },
        {
          "n": "03",
          "t": "Commit",
          "list": [
            "Promote a complete snapshot atomically",
            "Complete checkpoints after data commit"
          ],
          "now": false
        },
        {
          "n": "04",
          "t": "Recover",
          "list": [
            "Retry transient failures with bounds",
            "Reconcile removals, voids and missed events"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "CANONICAL MODEL",
      "title": "Accounting data entities",
      "sub": "A stable internal model separates client identity, source connections, financial records and synchronization evidence.",
      "split": true,
      "cols": [
        "Entity",
        "Grain and key fields"
      ],
      "rows": [
        [
          "Client",
          "One practice client with currency and time zone"
        ],
        [
          "Connection",
          "One product and organization connection with region and secret reference"
        ],
        [
          "Invoice",
          "One source invoice with dates, status, currency, total and current balance"
        ],
        [
          "Payment allocation",
          "One dated amount applied from a payment to an invoice"
        ],
        [
          "Credit allocation",
          "One dated credit applied to an invoice"
        ],
        [
          "Bill",
          "One payable with vendor, dates, balance and approval status"
        ],
        [
          "Identity mapping",
          "One reviewed CRM account to Books contact link"
        ],
        [
          "Sync run",
          "One fetch attempt with cursor, counts, checksum, status and error category"
        ],
        [
          "Close task",
          "One required task per client and period with evidence and review status"
        ]
      ],
      "note": "Store money as Decimal values or integer minor units. Keep source and reporting currencies separate."
    },
    {
      layout: "table",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "METRIC CONTRACTS",
      "title": "Dashboard definitions",
      "sub": "Every metric names its owner, grain, formula, exclusions, date basis, currency rule and reconciliation method.",
      "cols": [
        "Metric",
        "Training definition",
        "Verification"
      ],
      "rows": [
        [
          "Current AR",
          "Eligible current invoice balances by currency",
          "Reconcile to the source snapshot"
        ],
        [
          "Historical AR",
          "Issued amount less dated payments and credits through the report date",
          "Compare with an as-of report or checked ledger"
        ],
        [
          "Overdue AR",
          "Positive balance where due date precedes the report date",
          "Inspect invoices and boundary dates"
        ],
        [
          "AP due in seven days",
          "Eligible bills due from report date through date plus seven",
          "Separate already overdue bills"
        ],
        [
          "Close completion",
          "Completed required tasks divided by required tasks",
          "Return N/A when no task is required"
        ],
        [
          "Exception age",
          "Time since creation for unresolved cases",
          "Declare time zone and day rule"
        ],
        [
          "Net burn and runway",
          "Later extension with a documented operating-cash policy",
          "Return N/A for zero or negative burn"
        ]
      ]
    },
    {
      layout: "hero",
      "tone": "dark",
      "section": "ZOHO DASHBOARD",
      "eyebrow": "HAND-CHECKED EXAMPLE",
      "title": "Accounts receivable",
      "sub": "The teaching case separates issued balances, historical payments and draft exclusions at 31 August 2026.",
      "figure": "$1,100",
      "unit": "open receivables",
      "label": "$600 from invoice A and $500 from invoice B",
      "aside": [
        {
          "fig": "$600",
          "lab": "overdue receivables"
        },
        {
          "fig": "30",
          "lab": "days overdue for invoice A"
        }
      ],
      "note": "Invoice C contributes zero after full payment. Draft invoice D is excluded. A later $100 credit reduces open AR to $1,000 only when effective by the report date."
    },
    {
      layout: "matrix",
      "section": "AUTOMATION DESIGN",
      "eyebrow": "CHOOSING THE MECHANISM",
      "title": "Rules, workflows and agents",
      "sub": "The business question and uncertainty determine the mechanism, while financial calculations remain deterministic.",
      "attrLabel": "Need",
      "options": [
        "SQL or Python",
        "Fixed workflow",
        "Bounded agent"
      ],
      "pick": 0,
      "rows": [
        [
          "Money, aging and deduplication",
          true,
          true,
          null
        ],
        [
          "Known sequence and approvals",
          true,
          true,
          null
        ],
        [
          "Messy text interpretation",
          null,
          true,
          true
        ],
        [
          "Next step depends on evidence",
          null,
          null,
          true
        ],
        [
          "Financial calculation",
          true,
          true,
          null
        ],
        [
          "Unsupported evidence",
          "Fail the check",
          "Route the exception",
          "Stop and ask for review"
        ],
        [
          "Required control",
          "Tests and reconciliation",
          "State and exception queue",
          "Narrow tools and stop conditions"
        ],
        {
          "cells": [
            "First baseline",
            "Always",
            "After the rule is clear",
            "After simpler patterns work"
          ],
          "verdict": true
        }
      ],
      "note": "Source S18. The agent asks tools for facts and stops when evidence is insufficient."
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "AI",
      "title": "Bounded agent systems",
      "sub": "The agent investigates exceptions through narrow tools while application logic controls access, money and side effects."
    },
    {
      layout: "hier",
      "section": "AGENTIC AI",
      "eyebrow": "OPERATING MODEL",
      "title": "Evidence before action",
      "sub": "A useful accounting agent connects intermediate findings to source records and a reviewer decision.",
      "items": [
        {
          "tag": "01",
          "t": "Deterministic trigger",
          "b": "Code computes the overdue balance or exception and supplies the case boundary."
        },
        {
          "tag": "02",
          "t": "Curated tools",
          "b": "The agent can retrieve invoices, mappings, policies and metric evidence through narrow interfaces."
        },
        {
          "tag": "03",
          "t": "Investigation state",
          "b": "The trace records calls, results, citations, uncertainty and the next proposed step."
        },
        {
          "tag": "04",
          "t": "Human review",
          "b": "The reviewer sees the amount, source evidence and draft before any external action."
        },
        {
          "tag": "05",
          "t": "Freshness recheck",
          "b": "The application rechecks source state and approval validity at execution time."
        }
      ],
      "cite": "S19 · S20 · S21 · S22 · S23"
    },
    {
      layout: "steps",
      "section": "AGENTIC AI",
      "eyebrow": "APPROVAL AND RECOVERY",
      "title": "Controlled side effects",
      "sub": "Approval binds to the exact action, and uncertain execution returns to evidence rather than blind retry.",
      "items": [
        {
          "n": "01",
          "t": "Draft",
          "list": [
            "Prepare a recommendation",
            "Cite the current source state"
          ],
          "now": false
        },
        {
          "n": "02",
          "t": "Approve",
          "list": [
            "Bind client, payload and version",
            "Set expiry and reviewer identity"
          ],
          "now": false
        },
        {
          "n": "03",
          "t": "Recheck",
          "list": [
            "Confirm amount and destination",
            "Invalidate approval after material change"
          ],
          "now": false
        },
        {
          "n": "04",
          "t": "Execute or stop",
          "list": [
            "Record state before external action",
            "Inspect target state after uncertain timeout"
          ]
        }
      ]
    },
    {
      layout: "kpi",
      "section": "AGENTIC AI",
      "eyebrow": "EVALUATION SUITE",
      "title": "Sixty repeatable cases",
      "sub": "The suite checks accounting outcomes, integration recovery, agent evidence and security behaviour.",
      "items": [
        {
          "fig": 60,
          "lab": "total cases"
        },
        {
          "fig": 40,
          "lab": "visible development cases"
        },
        {
          "fig": 20,
          "lab": "withheld variations"
        },
        {
          "fig": "3×",
          "lab": "runs for each held-out agent case"
        }
      ],
      "note": "Case mix: 20 accounting and data, 15 API and sync, 15 agent and evidence, 10 security and recovery."
    },
    {
      layout: "table",
      "section": "AGENTIC AI",
      "eyebrow": "GRADUATION RUBRIC",
      "title": "Evidence and weights",
      "sub": "Critical accounting, authorization and approval failures override the average score.",
      "cols": [
        "Area",
        "Weight",
        "Evidence"
      ],
      "rows": [
        [
          "Business and accounting correctness",
          30,
          "Metric contracts, reconciliation and scenario results"
        ],
        [
          "Integration and recovery",
          25,
          "Pagination, retries, duplicate handling and recovery drills"
        ],
        [
          "Agent evidence and boundaries",
          20,
          "Tool traces, citations, abstention and blocked invalid actions"
        ],
        [
          "Usability and handover",
          15,
          "Dashboard, exception queue, instructions and demo"
        ],
        [
          "Independent explanation",
          10,
          "Changed-data task without a worked solution"
        ]
      ],
      "total": [
        "Total",
        100,
        "Capstone target is at least 80 out of 100 with every critical check passing"
      ],
      "note": "The proposed held-out target is at least 90% overall task success. These are training targets, not industry standards."
    },
    {
      layout: "cards",
      "section": "AGENTIC AI",
      "eyebrow": "SECURITY BOUNDARIES",
      "title": "Application-enforced controls",
      "sub": "Prompt wording cannot replace tenant isolation, narrow tools, bound approvals and tested recovery.",
      "cols": 2,
      "items": [
        {
          "icon": "shield",
          "t": "Tenant isolation",
          "b": "Resolve the client from the authenticated session across data, retrieval, cache and exports."
        },
        {
          "icon": "shield",
          "t": "Credential boundary",
          "b": "Keep OAuth tokens server-side and remove secrets or client data from tutor exports."
        },
        {
          "icon": "check",
          "t": "Approval binding",
          "b": "Bind the exact payload, source version, reviewer and expiry before an action."
        },
        {
          "icon": "layers",
          "t": "Recovery evidence",
          "b": "Use idempotent processing, checkpoints, stale warnings, backups and a restore drill."
        }
      ],
      "note": "S24"
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "APP",
      "title": "The learning system",
      "sub": "The future web app turns the curriculum into missions, evidence, review and portable tutor context."
    },
    {
      layout: "steps",
      "section": "LEARNING APP",
      "eyebrow": "CORE LOOP",
      "title": "Practice with changed data",
      "sub": "Progress comes from an attempted task, verified evidence, explanation and a later independent variation.",
      "items": [
        {
          "n": "01",
          "t": "Choose",
          "list": [
            "Take the next eligible mission",
            "Prefer due reviews and failed prerequisites"
          ],
          "now": false
        },
        {
          "n": "02",
          "t": "Attempt",
          "list": [
            "Work in a separate local workspace",
            "Ask for one hint at a time"
          ],
          "now": false
        },
        {
          "n": "03",
          "t": "Verify",
          "list": [
            "Run deterministic checks",
            "Store explanation and artifact hash"
          ],
          "now": false
        },
        {
          "n": "04",
          "t": "Transfer",
          "list": [
            "Repeat on changed data",
            "Schedule retention review"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "LEARNING APP",
      "eyebrow": "MINIMUM EXPERIENCE",
      "title": "Eight learner screens",
      "sub": "Every screen leads to an observable action or stores evidence that another tutor can continue from.",
      "cols": [
        "Screen",
        "Definition of done"
      ],
      "rows": [
        [
          "Today",
          "Next task, prerequisite, output and resume state"
        ],
        [
          "Roadmap",
          "Attempted, submitted, passed and review-due stay distinct"
        ],
        [
          "Mission",
          "Bounded task, starter files and acceptance checks"
        ],
        [
          "API lab",
          "Pagination, status and simulated failure without credentials"
        ],
        [
          "Accounting workspace",
          "Client and date context survive filtering and drill-down"
        ],
        [
          "Submission review",
          "Artifact hash, case version, tests, feedback and hint use"
        ],
        [
          "Practice review",
          "A changed-data task tests transfer"
        ],
        [
          "Progress export",
          "Redacted context and importable tutor feedback"
        ]
      ]
    },
    {
      layout: "hier",
      "section": "LEARNING APP",
      "eyebrow": "COMPONENT BOUNDARIES",
      "title": "Deterministic progress engine",
      "sub": "React and FastAPI manage the learning workflow while SQLite stores evidence for the single-user local MVP.",
      "items": [
        {
          "tag": "01",
          "t": "Curriculum service",
          "b": "Loads versioned weeks, missions, skills and prerequisites."
        },
        {
          "tag": "02",
          "t": "Simulator",
          "b": "Serves fictional records and reproducible failure scenarios by seed."
        },
        {
          "tag": "03",
          "t": "Submission and grading",
          "b": "Stores artifacts transactionally and records explicit pass or failure evidence."
        },
        {
          "tag": "04",
          "t": "Progress engine",
          "b": "Recomputes skill state from events and published rules."
        },
        {
          "tag": "05",
          "t": "Tutor bridge",
          "b": "Exports redacted context and treats imported feedback as advisory."
        },
        {
          "tag": "06",
          "t": "Connector service",
          "b": "Provides optional read-only API access and preserves the last successful snapshot."
        },
        {
          "tag": "07",
          "t": "Later execution worker",
          "b": "Runs learner code only inside reviewed disposable isolation."
        }
      ]
    },
    {
      layout: "stats",
      "section": "LEARNING APP",
      "eyebrow": "FICTIONAL PRACTICE DATA",
      "title": "Three scenario scales",
      "sub": "Synthetic clients let the learner test accounting boundaries and failure recovery without client records.",
      "items": [
        {
          "fig": 3,
          "unit": "fictional businesses",
          "lab": "Harbor Coffee, Northstar Design and Cedar Software"
        },
        {
          "fig": 10,
          "unit": "invoices",
          "lab": "first hand-checkable fixture",
          "accent": true
        },
        {
          "fig": 100,
          "unit": "records",
          "lab": "intermediate data and mapping exercises"
        },
        {
          "fig": 450,
          "unit": "invoices",
          "lab": "three-page pagination and recovery case"
        }
      ],
      "foot": "Later fixtures also include contacts, payments, allocations, credits, bills, purchase orders, close tasks and ten fictional SOPs."
    },
    {
      layout: "timeline",
      "section": "LEARNING APP",
      "eyebrow": "BUILD BACKLOG",
      "title": "Five implementation milestones",
      "sub": "The app starts as a local evidence system, then adds scenarios, optional connectors and isolated execution only when justified.",
      "items": [
        {
          "d": "M1 · 12–20h",
          "t": "Learning shell",
          "b": "Today, roadmap, local progress and tutor export"
        },
        {
          "d": "M2 · 20–35h",
          "t": "First missions",
          "b": "Ten-invoice fixture, mock API and deterministic grading"
        },
        {
          "d": "M3 · 25–45h",
          "t": "Full curriculum",
          "b": "Twenty missions, review scheduling and evidence history"
        },
        {
          "d": "M4 · 20–40h+",
          "t": "Optional live mode",
          "b": "Read-only Zoho connector and an in-app tutor",
          "state": "next"
        },
        {
          "d": "M5 · TBD",
          "t": "Advanced hosting",
          "b": "Isolated code execution and multi-user operation",
          "state": "far"
        }
      ]
    },
    {
      layout: "steps",
      "section": "ROLE TRANSITION",
      "eyebrow": "FIRST NINETY DAYS",
      "title": "Pilot before expansion",
      "sub": "The role plan starts with observation, proves one workflow with a small group and then hardens ownership.",
      "cols": 3,
      "items": [
        {
          "n": "1–30",
          "t": "Discover",
          "list": [
            "Shadow two or three recurring workflows",
            "Record volumes, owners, rules and failure cost",
            "Deliver a read-only process view"
          ],
          "now": false
        },
        {
          "n": "31–60",
          "t": "Pilot",
          "list": [
            "Use a small approved group",
            "Compare the previous process and sample critical exceptions",
            "Publish the runbook and recovery demo"
          ],
          "now": false
        },
        {
          "n": "61–90",
          "t": "Harden",
          "list": [
            "Assign ownership and routine rollback",
            "Add a second case after sustained benefit",
            "Present measured results and residual risks"
          ]
        }
      ]
    },
    {
      layout: "table",
      "section": "ROLE TRANSITION",
      "eyebrow": "GRADUATION PORTFOLIO",
      "title": "Three case studies",
      "sub": "Each case includes a business brief, synthetic data, architecture, test evidence, demo, limitations and operating runbook.",
      "cols": [
        "Case",
        "Core evidence",
        "Operational test"
      ],
      "rows": [
        [
          "Zoho operations dashboard",
          "Metric contracts, Books and CRM mapping, source drill-down",
          "Reliable sync and recovery demonstration"
        ],
        [
          "AP intake and review",
          "Extracted fields, duplicate candidates, policy checks",
          "Reviewer correction and measured false positives"
        ],
        [
          "Close readiness and investigation",
          "Task dependencies, deterministic variances, cited commentary",
          "Approval pause, resume and handover"
        ]
      ],
      "note": "Estimated savings remain estimates until a real pilot measures them. Remove all client information and secrets before external sharing."
    },
    {
      layout: "section",
      "tone": "dark",
      "num": "36",
      "title": "Research register",
      "sub": "Thirty-six sources record the company context, API constraints, learning route and agent engineering practices."
    },
    {
      layout: "table",
      "section": "SOURCE REGISTER",
      "eyebrow": "REFERENCES 1 TO 9",
      "title": "Research sources 1 of 4",
      "sub": "Primary company pages, official product documentation and selected learning resources support the plan.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Title",
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
      "note": "Research checked 13 September 2026. Full URLs remain in content.js and research/sources.json. Recheck living documentation during implementation."
    },
    {
      layout: "table",
      "section": "SOURCE REGISTER",
      "eyebrow": "REFERENCES 10 TO 18",
      "title": "Research sources 2 of 4",
      "sub": "Primary company pages, official product documentation and selected learning resources support the plan.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Title",
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
      "note": "Research checked 13 September 2026. Full URLs remain in content.js and research/sources.json. Recheck living documentation during implementation."
    },
    {
      layout: "statement",
      "tone": "dark",
      "section": "SOURCE REGISTER",
      "eyebrow": "IMPLEMENTATION REFERENCES",
      "title": "Living documentation",
      "sub": "API versions, feature availability and course terms can change.",
      "text": "The implementation phase rechecks regional hosts, account permissions, scopes, quotas, payload shapes and product terms against the official source before using a live connector. It records the observed response contract and keeps mock, sandbox and live evidence clearly separated.",
      "cites": [
        "S6 · S7 · S8 · S9 · S10 · S11 · S12 · S16 · S34"
      ]
    },
    {
      layout: "table",
      "section": "SOURCE REGISTER",
      "eyebrow": "REFERENCES 19 TO 27",
      "title": "Research sources 3 of 4",
      "sub": "Primary company pages, official product documentation and selected learning resources support the plan.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Title",
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
      "note": "Research checked 13 September 2026. Full URLs remain in content.js and research/sources.json. Recheck living documentation during implementation."
    },
    {
      layout: "table",
      "section": "SOURCE REGISTER",
      "eyebrow": "REFERENCES 28 TO 36",
      "title": "Research sources 4 of 4",
      "sub": "Primary company pages, official product documentation and selected learning resources support the plan.",
      "compact": true,
      "cols": [
        "ID",
        "Publisher",
        "Title",
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
      "note": "Research checked 13 September 2026. Full URLs remain in content.js and research/sources.json. Recheck living documentation during implementation."
    },
    {
      layout: "closing",
      "tone": "dark",
      "title": "Week one starts with one script",
      "b": "Create ten fictional invoices, map the process, break the script deliberately and explain the repair. The Academy app can follow after the learning habit exists.",
      "footL": "LedgerOps Academy",
      "footR": "Curriculum and learning-system plan"
    }
  ]
};
