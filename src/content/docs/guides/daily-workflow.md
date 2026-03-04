---
title: Daily workflow
sidebar:
  order: 1
---

This guide covers the repeatable loop for day-to-day work with kipp•punkt. It assumes you've already [shipped your first idea](/get-started/ship-your-first-idea/).

## The loop

Every feature follows the same cycle: **issue → refine → approve → implement → review → merge**.

### Create an issue

Open a GitHub issue and assign it to the bot user. Before creating it, decide whether the issue is ready to start — if it depends on in-flight work, defer it. If it covers multiple distinct outcomes, split it into separate issues first so each maps to one PR.

Keep your active pipeline narrow. One or two issues in refinement at a time is enough — more creates review pressure you'll struggle to keep up with. Match `maxConcurrency` to what you can realistically review.

### Refine and approve

The refine agent drives the issue toward a structured requirement table. Answer its questions, correct its proposals, and add context it can't infer on its own — file paths, design links, related issues.

Before approving for enqueue, verify the requirement table is specific enough to review a PR against: testable acceptance criteria, scope that fits a single PR, relevant context referenced, and no implicit dependencies on unmerged work.

### Review and merge

The agent opens a PR. Review it like any other PR — leave comments on files or code lines (general PR-level comments are not consumed by the agent).

Batch your feedback into one review pass rather than leaving comments one by one. Each round-trip triggers a new agent cycle, so fewer passes means faster convergence. The agent interprets your tone: if your comment reads like an instruction, it will try to push a code change; if it reads like a question or discussion point, it will reply without changing code. You can nudge it in either direction by how you phrase your comment.

Merge when satisfied. The issue closes automatically.

## When things fail

The agent posts a comment on the issue when a task fails. Check logs to identify the root cause, then either tell the agent to retry in the issue or fix the underlying context gap first. See [Handle blocked or failed tasks](/guides/handle-blocked-or-failed-tasks/) for details.

## Keep your context current

The single biggest factor in output quality is the context kipp•punkt works with. When you notice recurring review feedback correcting the same pattern, add it to `AGENTS.md`. After merging features that change architecture or APIs, update the context docs that reference them. After failed tasks that trace back to missing context, fix the source rather than just retrying.
