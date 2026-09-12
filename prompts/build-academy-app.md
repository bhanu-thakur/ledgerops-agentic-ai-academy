# Future app implementation handoff

Build LedgerOps Academy according to docs/04-learning-app-specification.md, using curriculum/weeks.json as the authoritative weekly content and the metric exercise in docs/03-zoho-dashboard-blueprint.md. This file is a handoff for a later implementation request; this repository's initial release is the plan and curriculum only.

Start with milestones M1 and M2 as a complete usable slice: roadmap, Today view, W01-W06 missions, persistent progress, fictional invoice fixtures, mock API failures, deterministic artifact grading and tutor context export. Display planned later milestones honestly. Use the exact 20-hour weekly budget and prerequisite gates. Do not turn the app into only a reading list or a generic chat interface.

Keep the learner's coding workspace separate from the Academy's own implementation. Use React/TypeScript for the Academy UI and Python/FastAPI plus SQLite for the initial backend unless the active hosting environment requires an evidenced adaptation. State that adaptation in an architecture decision record. Follow applicable repository and hosting skills during the actual build.

Ship mock mode first. Make all data explicitly fictional; do not create Zoho accounts or purchase services as part of the initial slice. Never put credentials in the frontend. Do not execute uploaded code in the web server; only add isolated execution when the specification's containment requirements are implemented and tested.

Write meaningful tests for accounting totals, correct filters, persistence, prerequisite transitions, duplicate submissions, failed pagination, tutor export redaction and imported-feedback validation. Verify the UI in a browser, including empty/error states and a full first-session flow. Return working launch instructions and document remaining milestones precisely.
