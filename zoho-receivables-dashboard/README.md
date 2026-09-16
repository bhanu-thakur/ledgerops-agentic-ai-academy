# Fictional Zoho Receivables Operations Dashboard

A lightweight, local accounting operations dashboard built for Week 1 of the LedgerOps Agentic AI Academy. It ingests fictional Zoho Books invoice records, validates data integrity, deterministically calculates accounts receivable (AR) aging, isolates currencies, and preserves an exact source audit trail behind every number.

---

## 1. Quick Start

### Setup (One Command)
No third-party packages or compile steps required. It runs on native Node.js (v18+ / v24+):
```bash
npm install
```
*(Zero external dependencies; this step completes instantaneously)*

### Run Automated Checks (One Command)
```bash
npm test
```
Runs the 7 acceptance tests via Node's native test runner (`node:test`), verifying the hand-worked sample totals, draft/void exclusions, boundary conditions, currency isolation, error quarantine, refresh resilience, and source ID lineage.

### Start the Dashboard
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 2. Architecture & Data Flow

```
[ Fictional Invoices: sample-invoices.json ]
                     │
                     ▼
             [ validator.js ]
             Integrity Check
           ┌─────────┴─────────┐
           ▼                   ▼
    Valid Records        Quarantined
    (Staging Area)       (Exceptions Table)
           │
           ▼
    [ sync-service.js ]
    Atomic Promotion
    (Preserves Snapshot on Failure & Marks Stale)
           │
           ▼
    [ metrics.js ]
    Deterministic Engine (Integer Cents Math)
    ├── Filter out Draft & Void
    ├── Group by Currency (USD / INR isolated)
    ├── Calculate Days Overdue: (report_date - due_date)
    └── Assign Aging Buckets (Current, 1-30, 31-60, 61-90, 91+)
           │
           ▼
     [ server.js ]
     REST APIs + Static Web Dashboard
           │
           ▼
     [ Browser UI ]
     KPI Cards ➔ Aging Bars ➔ Drilldown Table ➔ Audit Modal
```

### Folder Organization
```
practice/week-01/receivables-dashboard/
├── data/
│   └── sample-invoices.json    # Synthetic fixture data (teaching cases, INR, boundary, invalid)
├── src/
│   ├── money.js               # Exact integer minor-unit (cents) arithmetic
│   ├── validator.js           # Schema integrity checks and quarantine routing
│   ├── metrics.js             # Deterministic aging calculation and lineage indexing
│   ├── sync-service.js        # Snapshot lifecycle, atomic sync, and stale handling
│   └── server.js              # Native Node.js HTTP server & REST endpoints
├── public/
│   ├── index.html             # Dashboard layout (KPIs, aging grid, table, alerts)
│   ├── styles.css             # Operational theme, badges, and responsive tables
│   └── app.js                 # Client-side reactivity, drilldown filter, modal audit
├── tests/
│   └── acceptance.test.js     # Automated test suite covering Acceptance Tests 1–7
├── package.json               # Scripts (test, start) and metadata
└── README.md                  # Handover guide and runbook
```

---

## 3. Business Rules Verified

1. **Deterministic Calculations**: Money calculations are strictly executed in integer minor units (cents) to avoid floating-point math issues.
2. **Draft & Void Exclusion**: Invoices with `draft` or `void` status are omitted from open receivables.
3. **Overdue Definition**: An invoice is overdue only when `due_date < report_date` and `balance > 0`. A due date equal to the report date has 0 days overdue and counts as **Current / Due Today** (Acceptance Test 3).
4. **Currency Segregation**: Currencies (e.g. USD, INR) are never aggregated together.
5. **Traceability**: Every headline number, ratio, and aging bucket retains the array of contributing source invoice IDs (`invoice_ids`).
6. **Data Quarantine**: Any record missing required fields (`invoice_id`, `customer_id`, `customer_name`, dates, `currency`, `total`, `balance`) or with unparseable numbers is held in an exceptions table with specific failure reasons.

---

## 4. Failure & Recovery Runbook

### Scenario A: Ingestion / Sync Failure (Stale Data)
- **Symptom**: Upstream API or network times out during sync.
- **System Behavior**:
  - The previously validated dataset remains active in memory.
  - The dashboard displays a prominent amber warning banner:
    `STALE DATA WARNING: Upstream sync failure... Showing last good snapshot from [timestamp]`.
  - The sync badge turns red: `STALE DATA`.
- **Operator Action**:
  1. Inspect the error message displayed in the banner and sync strip.
  2. Verify network connectivity to upstream services.
  3. Click **"Refresh"** in the dashboard header once connectivity is restored.

### Scenario B: Corrupt or Incomplete Source Records
- **Symptom**: Incoming records are missing IDs, dates, or contain non-numeric amounts.
- **System Behavior**:
  - Valid invoices continue processing normally; calculations are not interrupted.
  - Faulty records are routed to the **"Data Quality & Quarantined Exceptions"** panel at the bottom of the dashboard.
- **Operator Action**:
  1. Review the quarantined rows and the listed validation failure tags (e.g., `Missing customer_id`).
  2. Update or repair the record in the fictional source fixture.
  3. Re-sync the dashboard to promote the corrected records.

---

## 5. Known Limits & Assumptions

- **Mock Data**: Uses fictional synthetic fixtures only; no live Zoho Books OAuth credentials or network calls are made.
- **Credits & Allocations**: For Week 1, the invoice `balance` field represents the net outstanding amount. Complex unapplied credit notes and retroactive credit allocations are handled in future weeks.
- **Calendar Basis**: Days overdue are calculated based on calendar days in UTC to prevent timezone/daylight savings distortion.
