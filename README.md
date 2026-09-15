# LedgerOps Academy

A practical path from beginner to leading accounting operations automation with Codex or Claude Code: **20 weeks, 20 hours per week, 400 hours**.

Designed around Zoho API dashboards, reliable integrations, accounting exception workflows and agentic AI, with research on Prudent Accountants and Zeni. Public company descriptions inform the scenarios; this is an independent learning programme, not company training or a verified account of either company's internal operations.

**Status: planning complete, building not started.** No learner exercises have been marked completed, the learning web app is specified rather than implemented, and no real accounting accounts are connected.

## Portfolio: three applications

The current priority is the [portfolio plan](docs/07-portfolio-plan.md): three deployed applications aimed at the AI-Forward Engineer opening at Prudent Accountants, built over five weeks at twelve hours a week.

| Application | Business problem | Status |
| --- | --- | --- |
| Client Document Chaser | Missing client paperwork is chased by hand with no shared view of who owes what | Not started |
| AR Exception Desk | Receivables figures take time to prepare and cannot be traced to source invoices | Not started |
| Firm Policy Answer Desk | Staff repeatedly ask how to handle cases whose answers sit in unread documents | Not started |

Two supporting artefacts accompany them: a build-versus-configure map recording which workflows Zoho already handles natively, and an evaluation pack measuring accuracy, refusal rate, blocked unsafe actions and time saved.

Zoho is the system of record; Azure is where the code runs. DevOps, production monitoring and performance optimisation are out of scope by decision, and section 2 of the plan explains why.

## Start here

1. Read the [AI-assisted implementation mode](docs/06-ai-assisted-implementation-mode.md), then use the [complete plan](docs/MASTER-PLAN.md) as the reference.
2. Open the [first-week schedule](docs/05-first-week-and-role-plan.md).
3. Give another agent the [teaching protocol](prompts/teaching-agent.md) and ask it to start W01.
4. Save each session using the [session record](progress/session-template.md). Keep real progress in [state.json](progress/state.json).

## Slideshow

The [30-slide offline presentation](slides/LedgerOps-Curriculum-and-App-Plan-offline-deck/index.html) explains the curriculum and app plan in plain English. Download the packaged ZIP from the `slides/` folder for a portable copy. The package includes its browser audit, rendered slides, montage and validation report.

## The practical route

| Weeks | Outcome |
| --- | --- |
| 1-6 | Python, accounting data, SQL and a working local dashboard |
| 7-10 | HTTP, read-only Zoho Books/CRM and resilient synchronization |
| 11-13 | Operations workflows, structured extraction and policy retrieval |
| 14-16 | Tool-using agent, durable review and rigorous evaluation |
| 17-20 | AP and close projects, QuickBooks adaptation and portfolio handover |

The first dashboard targets week 6, Zoho Books access week 8, resilient integration week 10 and a first bounded agent week 14. These are learning targets; move dates when a prerequisite gate needs more practice.

## Documents

- [Research and learning strategy](docs/01-research-and-strategy.md)
- [Weekly curriculum and pass criteria](docs/02-weekly-curriculum.md)
- [Zoho dashboard blueprint and hand-checkable metric examples](docs/03-zoho-dashboard-blueprint.md)
- [Future learning app specification](docs/04-learning-app-specification.md)
- [First week, portfolio and first 90 days in the role](docs/05-first-week-and-role-plan.md)
- [Portfolio plan for the AI-Forward Engineer role](docs/07-portfolio-plan.md)
- [36-source bibliography](research/SOURCES.md) and [verification notes](research/RESEARCH-NOTES.md)

The [curriculum JSON](curriculum/weeks.json) is ready for a future app to consume. Each mission includes prerequisites, concepts, resources, a build exercise, a failure lab, deliverables, a pass gate and an independent variation. The [app build handoff](prompts/build-academy-app.md) defines the initial implementation slice.

## Working rules

Use fictional data and authorised test accounts. Label mock evidence accurately. Keep credentials and real financial records out of Git, even in a private repository. Measure calculations with code and validate financial policy with the appropriate reviewer. Tutors help you learn; completing a task with a full worked solution is followed by an independent variation.

Research checked on 13 September 2026; the portfolio plan was checked on 15 September 2026. API versions, account availability, model offerings and course terms can change. The source register records access limitations. All development estimates and learning targets are proposed, not observed results.
