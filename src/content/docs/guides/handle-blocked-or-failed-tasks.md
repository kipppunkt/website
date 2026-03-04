---
title: Handle blocked or failed tasks
sidebar:
  order: 4
---

Sometimes tasks fail. The agent exits with an error, PR creation breaks, or a PR gets closed without merging. This guide covers how to detect failures, diagnose them, and recover.

## Know what counts as a failed attempt

A failed attempt is any execution cycle that does not produce a merged result. Common causes:

- **Network issues**: transient connectivity problems between the agent, GitHub, or your AI provider.
- **Incorrect agent setup**: the agent cannot reach GitHub due to sandbox restrictions, or the bot account has insufficient permissions.
- **Hitting your agent usage quota**: the AI provider rejects requests because your plan limit is reached.
- **PR closed by the user**: you (or a teammate) close the PR without merging.

Each of these increments the task's failed-attempt counter. When the count exceeds `maxFailedAttempts` (default: `3`, configurable in your [config file](/reference/configuration/)), the task transitions to `failed` and is no longer retried automatically.

## Detect failures

kipp•punkt posts a comment on the related GitHub issue when a task moves to `failed`. If you configured `shutdownOnTaskFailed: true`, the orchestrator also shuts down gracefully, useful for [requirements file ingress](/reference/requirements-file-ingress/) setups where you want a hard stop on failure.

You can also check task state at any time via the orchestrator API:

```bash
curl "$ORCHESTRATOR_URL/tasks"
```

## Diagnose and recover

Check logs first. The orchestrator and agent logs typically contain the root cause: a network error, a permissions issue, a quota limit, or a harness timeout.

Identify whether the failure is transient or structural:

- **Transient** (network blip, rate limit, temporary outage): retry is likely enough. Tell the agent in the GitHub issue to retry. This resets the task's failure state and puts it back into the execution flow. You do not need to restart the orchestrator.
- **Structural** (wrong token permissions, sandbox misconfiguration, exhausted quota): fix the underlying cause before retrying. Check your agent setup, token permissions, sandbox configuration, and quota status.

If the same failure repeats after retry, the cause is structural. Fix the root issue before trying again.
