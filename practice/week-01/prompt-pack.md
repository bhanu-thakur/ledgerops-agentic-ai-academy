# Prompt pack for Codex or Claude Code

The strongest prompt describes the job, boundaries and proof. It does not need to tell the agent how to write every line.

## Build prompt

```text
You are implementing a small accounting operations tool.

Read these files first:
- practice/week-01/implementation-brief.md
- practice/week-01/process-map.md
- docs/03-zoho-dashboard-blueprint.md

Goal:
Build the fictional receivables dashboard described in the brief.

Working rules:
- Use fictional data only.
- Keep money and aging calculations deterministic and separately testable.
- Preserve the source ID behind every displayed number.
- Do not add live credentials, messaging, invoice changes or accounting writes.
- Handle empty data, invalid records and a failed refresh visibly.

Before coding:
1. Inspect the repository.
2. Restate the proposed data flow in plain English.
3. List any unclear requirement and use the safest stated assumption when work can continue.
4. Write a short implementation plan tied to the acceptance tests.

Then implement the smallest complete version. Run meaningful checks. Report:
- what changed;
- how to run it;
- which acceptance tests passed;
- remaining limits and assumptions.
```

## Review prompt

```text
Review this implementation against practice/week-01/implementation-brief.md.

Do not judge it by appearance alone. Trace every displayed total to its source rows. Check the report-date boundary, draft and void exclusions, currency separation, missing data, failed refresh behaviour and stale warning.

List findings from highest to lowest impact. Give the file and evidence for each finding. If all checks pass, say what you verified and which risks still require a real Zoho test later.
```

## Fix prompt

```text
Fix the confirmed review findings with the smallest clear change. Preserve the written business rules. Add or update a meaningful check for each fixed failure. Run the focused checks, then the normal project checks. Report the changed behaviour and any remaining issue.
```

## Handover prompt

```text
Prepare a short handover for an operations teammate. Explain the business purpose, data flow, setup, normal run, visible failure states, recovery steps, ownership and known limits in plain English. Do not claim that mock data proves a live Zoho connection.
```

## Prompt flow

1. **Brief:** give the business problem, users, rules and limits.
2. **Plan:** make the agent explain its proposed flow before building.
3. **Build:** ask for the smallest complete result.
4. **Check:** run fixed calculations and failure cases.
5. **Review:** use a fresh review prompt or another agent.
6. **Fix:** repair confirmed findings and rerun checks.
7. **Pilot:** compare against the old process with a small group.
8. **Handover:** document ownership, recovery and support.
