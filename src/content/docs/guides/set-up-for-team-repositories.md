---
title: Set up for team repositories
sidebar:
  order: 6
---

kipp•punkt is not meant for big engineering org workflows. A single high-performing engineer with the right toolchain can ship what used to require a team. Small teams (2–5) are a natural extension, but the default unit is one person steering agents end-to-end.

## Assume a small owner group

The best setup is one or two core owners — someone who is product manager, architect, and engineer at once. Define clearly who refines issues, who approves enqueue, and who merges PRs. The human operates at the edges: shaping intent and approving results. Everything in between is automated.

Collaborate when it makes sense — strategic discussions, discovery, a second opinion on a tricky PR. But the default mode is autonomous: you and the agent, from idea to shipped code.

## Control trigger permissions with `allowlist`

By default, everyone with repo access can trigger agent actions. You can configure [`allowlist`](/reference/configuration/) to restrict this to specific users:

```json
{
  "allowlist": ["alice", "bob"]
}
```

This prevents drive-by comments from changing execution flow.

## Use `requireMention` to separate discussion from action

In shared issues and PRs, people often discuss ideas without wanting agent action on every message. With [`requireMention`](/reference/configuration/) set to `true`, the bot reacts only when explicitly @mentioned:

```json
{
  "requireMention": true
}
```

This keeps normal human discussion clean and makes bot activation intentional. Especially useful when issues have multiple participants who aren't all driving the agent.

## One runtime per repo

Do not run multiple kipp•punkt runtimes against the same repository. Multiple runtimes cause collisions, duplicate reactions, and inconsistent state. Treat this as a hard rule: one repo, one active kipp•punkt runtime.

If you need the agent running on a shared server, coordinate who starts and stops it. There is no built-in locking — the discipline is organizational.

## Scale throughput by tuning one runtime

If you need more speed, scale the single runtime instead of adding more instances. Tune [`maxConcurrency`](/reference/configuration/) up and [`pollIntervalMinutes`](/reference/configuration/) down, while staying within GitHub rate limits:

```json
{
  "maxConcurrency": 3,
  "pollIntervalMinutes": 3
}
```

This gives you more parallel work without coordination chaos. See [Set up your repository](/guides/set-up-your-repository/) for more on tuning these fields together.

## The worst setup

Broad trigger permissions plus multiple runtimes. That combination creates noisy loops, conflicting actions, and poor predictability. Lock down `allowlist`, run one runtime, and scale it.

