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
