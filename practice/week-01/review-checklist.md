# Implementation review checklist

## Business fit

- [ ] The user and decision are clear.
- [ ] The automation removes a real step or makes an important problem visible.
- [ ] A simpler rule or built-in product feature was considered.
- [ ] The success measure can be checked during a pilot.

## Data and accounting

- [ ] Every input has a source and stable ID.
- [ ] Every metric has a written formula, date rule and currency rule.
- [ ] Headline numbers open into the records behind them.
- [ ] Empty, missing and conflicting data are visible.

## Automation and AI

- [ ] Fixed rules calculate money and dates.
- [ ] AI is used only for text, search, drafts or changing investigation paths.
- [ ] The agent has only the tools and clients needed for the task.
- [ ] Missing proof makes the agent stop or ask for review.

## Failure and recovery

- [ ] Repeating a run does not duplicate work.
- [ ] A partial or failed sync cannot replace the last good data.
- [ ] The user can see when data is old.
- [ ] The runbook explains the first recovery action and owner.

## Release decision

- [ ] All critical checks pass.
- [ ] Known limits are written down.
- [ ] The pilot group and rollback plan are clear.
- [ ] A person owns monitoring and support.
