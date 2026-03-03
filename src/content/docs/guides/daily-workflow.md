---
title: Daily workflow
sidebar:
  order: 1
---

This guide defines the repeatable day-to-day loop for working with kipp•punkt. It builds on [Ship your first idea](/get-started/ship-your-first-idea/) — if you haven't shipped one yet, start there.

## Core flow

Every feature follows the same cycle:

1. **Create a GitHub issue** and assign it to the bot user. Mentioning the agent in the issue body or comments is also supported.
2. **Refine until approved** — the refine agent responds whenever your comment is the latest and drives the issue toward implementation-ready scope. If scope is too large, it may propose splitting into sub-issues. When ready, it proposes a structured requirement table. Review it and explicitly approve in a comment to enqueue.
3. **Implement, review, merge** — after approval, the task is queued and implemented. A PR is opened. You review and leave feedback. The agent responds and/or pushes fixes. You merge when satisfied, and the issue closes automatically.

:::note
The main failure mode is weak context engineering. Keep `AGENTS.md` and your focused context docs current so refine and build decisions stay aligned.
:::

## Issue triage

Before creating an issue, decide:

- **Start now** — well-scoped, independent of in-flight work.
- **Defer** — depends on something not yet merged, or not thought through enough.
- **Split first** — covers multiple distinct outcomes. Break it into separate issues so each maps to a single PR.

## WIP limits

Limit how many issues move through the loop at once:

- **1–2 issues in refinement** — so you can respond without excessive context-switching.
- **`maxConcurrency` active implementations** — match this to what you can realistically review. More parallel PRs means more review pressure.

If the review queue grows faster than you can handle, pause new issues until you catch up.

## Cadence

Define when you check issue threads, review PRs, and merge. The agent waits for your input, so predictable response windows keep the pipeline moving.

## Approval policy

Before approving a requirement for enqueue, verify:

- [ ] The requirement table is specific enough to review a PR against.
- [ ] Acceptance criteria are testable.
- [ ] Scope fits a single PR.
- [ ] Relevant context is referenced (file paths, docs, design links).
- [ ] No implicit dependencies on unmerged work.

## Feedback policy

Batch your PR feedback to reduce iteration cycles. Each round-trip triggers a new agent cycle, so leave all comments in one review pass rather than one by one.

Be specific and actionable — point to exact lines and describe expected behavior. Use file-level or line-level comments; general PR-level comments are not consumed by the agent.

Separate discussion from action: prefix questions with `Question:` or `Let's discuss!` so the agent knows not to push code. Action-oriented comments (e.g. `drop the last commit`) trigger code changes.

## Failure protocol

When a task fails:

1. Check logs first to identify the root cause. The agent posts a comment on the GitHub issue when a task fails.
2. Decide whether to retry immediately or add context first. If the failure is transient, tell the agent in the issue to retry. If it points to a context gap, fix the context before retrying.
3. After `maxFailedAttempts` (default: 3), the task moves to `failed` and stops retrying automatically. You can always reset it by telling the agent to retry in the issue.

See [Handle blocked or failed tasks](/guides/handle-blocked-or-failed-tasks/) for detailed recovery steps.

## Context maintenance

Update `AGENTS.md` and context docs to prevent recurring mistakes:

- **After recurring review feedback** — if you keep correcting the same pattern, add it to `AGENTS.md`.
- **After merging significant features** — update context docs that reference changed architecture or APIs.
- **After failed tasks** — if a failure traces back to missing or outdated context, fix the source rather than just retrying.
