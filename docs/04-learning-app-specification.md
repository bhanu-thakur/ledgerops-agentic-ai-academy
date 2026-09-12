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

[^24]: OWASP GenAI Security Project. [LLM Top 10](https://genai.owasp.org/llm-top-10/). 2025 risk taxonomy on living page. Accessed 13 September 2026.

[^34]: Intuit Developer. [QuickBooks Online Sandboxes](https://developer.intuit.com/app/developer/qbo/docs/develop/sandboxes). Living developer portal. Accessed 13 September 2026.
