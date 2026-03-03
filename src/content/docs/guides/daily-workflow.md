---
title: Daily workflow
sidebar:
  order: 1
---

This guide describes the repeatable day-to-day loop for working with kipp•punkt. It builds on [Ship your first idea](/get-started/ship-your-first-idea/) — if you haven't shipped one yet, start there.

## The core loop

Every feature follows the same cycle:

1. **Create a GitHub issue** — describe what you want to build and assign it to the bot user. Mentioning the agent in the issue body or comments also works.
2. **Refine until approved** — the refine agent responds whenever your comment is the latest, driving the issue toward implementation-ready scope. If scope is too large, it may propose splitting into sub-issues. When ready, it presents a structured requirement table for your review. Approve explicitly in a comment to enqueue.
3. **Implement → review → merge** — the task is queued and implemented, a PR is opened, you review and leave feedback, the agent responds and pushes fixes, and you merge when satisfied. The linked issue closes automatically.

:::note
The main failure mode is weak context engineering. Keep `AGENTS.md` and your focused context docs current so refine and build decisions stay aligned with your codebase.
:::

## Issue triage

Not every idea should enter the loop immediately. Before creating an issue:

- **Start now** — the idea is well-scoped and independent of in-flight work.
- **Defer** — the idea depends on something not yet merged, or you haven't thought it through enough.
- **Split first** — the idea covers multiple distinct outcomes. Break it into separate issues so each one maps to a single PR.

One feature per issue keeps implementation and review manageable. If the refine agent suggests splitting, take its advice seriously.

## WIP limits

Limit how many issues are actively moving through the loop at once. A good default:

- **1–2 issues in refinement** — so you can respond to the agent without context-switching too much.
- **`maxConcurrency` active implementations** — match this config value to what you can realistically review. More parallel PRs means more review pressure on you.

If the review queue grows faster than you can handle, pause new issues until you catch up. Unreviewed PRs are wasted agent cycles.

## Cadence

Establish a rhythm that keeps the loop moving without requiring constant attention:

- **Morning** — triage new ideas, check open refinement threads, respond to agent questions.
- **Midday** — review open PRs, leave feedback, merge what's ready.
- **End of day** — approve any refined requirements so the agent can work overnight.

Adjust to your schedule. The key is predictable response windows — the agent waits for your input, so long silences stall the pipeline.

## Approval policy

Before approving a requirement for implementation, verify:

- [ ] The requirement table is specific enough that you could review a PR against it.
- [ ] Acceptance criteria are testable — you know what "done" looks like.
- [ ] Scope fits a single PR. If it feels like it would touch too many files or concepts, ask the agent to split.
- [ ] Relevant context is referenced — file paths, docs, design links — so the build agent has what it needs.
- [ ] No implicit dependencies on unmerged work.

Approving a vague requirement leads to vague implementation. The time you invest here saves multiples in review.

## Feedback policy

When reviewing PRs, efficient feedback reduces iteration cycles:

- **Batch your comments** — leave all feedback in one review pass rather than trickling comments one by one. Each round-trip triggers a new agent cycle.
- **Be specific and actionable** — point to exact lines and describe expected behavior. "This should return early when the list is empty" beats "handle edge cases."
- **Separate discussion from action** — prefix exploratory questions with `Question:` or `Let's discuss!` so the agent knows not to push code changes. Action-oriented comments like `drop the last commit` trigger code changes.
- **Use file-level or line-level comments** — the agent consumes file-thread comments where it is not the last commenter. General PR-level comments are not consumed.

## Failure protocol

When things go wrong:

1. **Check logs first** — identify the root cause before retrying. The agent posts a comment on the GitHub issue when a task fails.
2. **Decide: retry or clarify** — if the failure is transient (network, rate limit), tell the agent in the issue to retry. If the failure points to a context gap, add context before retrying.
3. **Know the threshold** — after `maxFailedAttempts` (default: 3), the task moves to `failed` and stops retrying automatically. You can always reset it by telling the agent to retry in the issue.

See [Handle blocked or failed tasks](/guides/handle-blocked-or-failed-tasks/) for detailed recovery steps.

## Context maintenance

Your agent instructions and context docs drift over time. Schedule regular upkeep:

- **After recurring review feedback** — if you keep correcting the same pattern, add it to `AGENTS.md` so the agent learns it upfront.
- **After merging significant features** — update context docs that reference changed architecture or APIs.
- **After failed tasks** — if a failure traces back to missing or outdated context, fix the source rather than just retrying.

Good context hygiene is the highest-leverage activity for improving agent output quality over time.
