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
