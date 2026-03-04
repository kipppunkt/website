---
title: Set up for team repositories
sidebar:
  order: 6
---

kipppunkt is not designed for large engineering org workflows. It is built for a small number of high-performing engineers who each cover the full value stream end-to-end — from idea to shipped code.

## Each engineer drives their own value stream

In a kipppunkt team, each engineer works independently: refining their own issues, reviewing their own PRs, and merging their own work. There is no handoff between "the person who refines" and "the person who reviews." Each person drives their issues from start to finish, with the agent doing the implementation in between.

You still collaborate when it makes sense — strategic discussions, discovery sessions, or pulling in a teammate for a second opinion on a tricky PR. But the default mode is autonomous: you and the agent, end-to-end.

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

Do not run multiple kipppunkt runtimes against the same repository. Multiple runtimes cause collisions, duplicate reactions, and inconsistent state. Treat this as a hard rule: one repo, one active kipppunkt runtime.

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

