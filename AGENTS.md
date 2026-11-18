# Instructions for agents

## Cheap model workers (Bhanu, standing instruction)

**Cheap model workers for mundane work.** From time to time, hand a mundane,
well-bounded job — a status check, a file search, reading and summarising logs, a diff
or a folder — to a subagent on a cheaper model, and keep the main session as the
authority. In Claude Code that is the Agent tool's `model` parameter: `haiku` by
default, `sonnet` when the job needs judgement. Pass it explicitly, because on a
subscription the built-in Explore agent otherwise runs on Opus. On Anthropic's price
list read 2026-10-13, Haiku 5.5 is $0.10 in / $0.50 out per million tokens against
Opus 5.5's $4 / $20 — forty times cheaper — so a worker that reads 40,000 tokens
costs what Opus spends reading 1,000. Haiku's price rises fivefold above 100,000
tokens in one prompt, so keep each job narrow. Whether the plan's usage limit weighs
the models in the same ratio is not checked yet; workers do spend from the same limit.
Give the worker a self-contained brief that names the repo and tells it to read that
repo's `AGENTS.md` first, because it starts with none of your context. Verify its
load-bearing claims yourself before repeating them — the latest commit, a count, a
pass or a fail: a worker's report is evidence to check, not a finding. Do the job
yourself when the answer is one command away. Bhanu's instruction, 2026-10-13.

## Commit and push automatically (Bhanu, standing instruction)

**Always commit and push automatically.** Every change a session makes in this repo is
committed and pushed to the repo's default branch as soon as that piece of work is done —
without asking first, and without leaving anything uncommitted at the end of a turn. Do
not end a turn with "want me to commit this?" or "shall I push?". This replaces any older
line in this repo that says not to commit or push until Bhanu asks. It does not change
what must never be committed: files `.gitignore` excludes, secrets, credentials and
private data stay out. Stage the files you changed by name rather than with `git add -A`,
so another session's unfinished work is not swept into your commit. Bhanu's instruction,
2026-10-15.

## Pull from GitHub before you start work (Bhanu, standing instruction)

**Pull from GitHub before you start work.** At the start of every session, and again
before each new piece of work, run `git pull` so this checkout holds every commit
already on GitHub. Send that first pull together with your first other command,
not as a step of its own, so it costs no extra round trip. Bhanu works on more than one machine and runs more than one session
at a time, so the thing you are about to do may already be done and pushed. Read the
new commits first; if the work is already there, say so and stop rather than doing it
a second time. Pull again just before you push. If a pull fails or conflicts, do not
discard or overwrite anything to get past it — resolve it, or tell Bhanu. Bhanu's
instruction, 2026-10-27, after a session in `inviteX` finished a change and only found
out when it went to push that another session had already pushed the same change.

## Never branch — always use main (Bhanu, standing instruction)

**Never branch. Always use `main`.** Do all work on `main` and push straight to it: do
not create a branch — local, remote, or in a worktree — and do not open a pull request.
If you find a branch other than `main`, here or on GitHub, merge it into `main` safely
and then delete it: pull first, merge only when it fast-forwards or merges cleanly and
the repo's own tests still pass, push, and only then delete the branch locally and on
GitHub (`git push origin --delete <branch>`) along with any worktree that held it. A
branch whose commits are already in `main` is deleted without merging. If a branch will
not merge cleanly, or you cannot tell whether its work is wanted, leave it and tell
Bhanu — never discard unmerged work to get to a clean list. In a repo whose default
branch is still called `master`, read `main` as that default branch. Bhanu's
instruction, 2026-11-14.

**Keep standing instructions in the repo, not in memory.** Claude's memory lives on one
machine only and is lost when that machine is cleaned up or reset, and Bhanu works on
more than one machine. So when he gives an instruction or preference meant to last
beyond this session, write it into this repo's `AGENTS.md` (or `CLAUDE.md` where there
is no `AGENTS.md`), or into a skill committed to this repo, and commit and push it.
Memory may hold a copy, never the only copy. When you find a preference that lives only
in memory, move it into the repo. If it should hold in every repo, say so, so the
commandX session can copy it into all of them. Bhanu's instruction, 2026-11-18.
