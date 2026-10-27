# Instructions for agents

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
already on GitHub. Bhanu works on more than one machine and runs more than one session
at a time, so the thing you are about to do may already be done and pushed. Read the
new commits first; if the work is already there, say so and stop rather than doing it
a second time. Pull again just before you push. If a pull fails or conflicts, do not
discard or overwrite anything to get past it — resolve it, or tell Bhanu. Bhanu's
instruction, 2026-10-27, after a session in `inviteX` finished a change and only found
out when it went to push that another session had already pushed the same change.
