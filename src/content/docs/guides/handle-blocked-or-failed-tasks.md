---
title: Handle blocked or failed tasks
sidebar:
  order: 4
---

Tasks can fail for many reasons — the agent exits with an error, PR creation breaks, or a PR gets closed without merging. This guide covers how to detect failures, diagnose them, and get tasks back on track.

## What counts as a failed attempt

A failed attempt is any execution cycle that does not produce a merged result. Common causes:

- The agent process exits with an error.
- PR creation fails (e.g. due to Git or GitHub issues).
- An opened PR is closed without being merged.

Each of these increments the task's failed-attempt counter.

## When a task becomes failed

Each failed attempt increments the counter. When the count exceeds `maxFailedAttempts` (default: `3`, configurable in your [config file](/reference/configuration/)), the task transitions to `failed` and is no longer retried automatically.

A failed task stays in that state until you explicitly intervene.

## How you detect it

kipppunkt posts a comment on the related GitHub issue when a task moves to `failed`. If you configured `shutdownOnTaskFailed: true`, the orchestrator also shuts down gracefully — useful for CI-style setups where you want a hard stop on failure.

Beyond that, you can check task state at any time via the orchestrator API:

```bash
curl "$ORCHESTRATOR_URL/tasks"
```

## First recovery action

Check logs first. The orchestrator and agent logs typically contain the root cause — a missing dependency, a merge conflict the agent could not resolve, a harness timeout, or a context problem in your instructions.

Identify whether the failure is:

- **Transient** (network blip, rate limit, flaky tool) — retry is likely enough.
- **Structural** (bad instructions, missing context, unsupported task shape) — fix the underlying cause before retrying.

## Retry behavior

To retry a failed task, tell the agent in the GitHub issue to retry. This resets the task's failure state and puts it back into the execution flow.

You do not need to restart the orchestrator. The retry happens within the running session.

## Choosing between retry and intervention

Retry is always available, but not always the right move. Use your judgment:

- If the failure looks transient, retry immediately.
- If the same failure repeats, investigate before retrying again. Check your `AGENTS.md`, the requirement description, and any linked context for gaps.
- If the task consistently fails after multiple retries, the requirement may need reshaping — consider refining the scope or splitting it into smaller pieces.
