---
title: Handle blocked or failed tasks
sidebar:
  order: 4
---

Tasks can fail for many reasons — the agent exits with an error, PR creation breaks, or a PR gets closed without merging. This guide covers how to detect failures, diagnose them, and get tasks back on track.

## What counts as a failed attempt

A failed attempt is any execution cycle that does not produce a merged result. Common causes:

- **Network issues** — transient connectivity problems between the agent, GitHub, or your AI provider.
- **Incorrect agent setup** — the agent cannot reach GitHub due to sandbox restrictions, or the bot Git user has insufficient permissions on the repo.
- **Hitting your agent usage quota** — the AI provider rejects requests because your plan limit is reached.
- **PR closed by the user** — you (or a teammate) close the PR without merging.

Each of these increments the task's failed-attempt counter.

## When a task becomes failed

Each failed attempt increments the counter. When the count exceeds `maxFailedAttempts` (default: `3`, configurable in your [config file](/reference/configuration/)), the task transitions to `failed` and is no longer retried automatically.

A failed task stays in that state until you explicitly intervene.

## How you detect it

kipp•punkt posts a comment on the related GitHub issue when a task moves to `failed`. If you configured `shutdownOnTaskFailed: true`, the orchestrator also shuts down gracefully — useful for CI-style setups where you want a hard stop on failure.

Beyond that, you can check task state at any time via the orchestrator API:

```bash
curl "$ORCHESTRATOR_URL/tasks"
```

## First recovery action

Check logs first. The orchestrator and agent logs typically contain the root cause — a network error, a permissions issue, a quota limit, or a harness timeout.

Identify whether the failure is:

- **Transient** (network blip, rate limit, temporary outage) — retry is likely enough.
- **Structural** (wrong token permissions, sandbox misconfiguration, exhausted quota) — fix the underlying cause before retrying.

## Retry behavior

To retry a failed task, tell the agent in the GitHub issue to retry. This resets the task's failure state and puts it back into the execution flow.

You do not need to restart the orchestrator. The retry happens within the running session.

## Choosing between retry and intervention

Retry is always available, but not always the right move. Use your judgment:

- If the failure looks transient, retry immediately.
- If the same failure repeats, investigate before retrying again. Check your agent setup, token permissions, sandbox configuration, and quota status.
- If the task consistently fails after multiple retries, the root cause is likely structural — fix permissions, configuration, or network access before trying again.
