---
title: Set up for team repositories
sidebar:
  order: 6
---

kipp•punkt is designed for a small number of high-performing people who cover the full value stream end-to-end. In team setups, optimize for clarity and control, not broad participation.

## Assume a small owner group

The best setup is one or just a few core owners who drive the full loop: refining issues, approving requirements, and merging PRs. Collaborate when it makes sense (strategic discussions, discovery, a second opinion on a tricky PR), but the default mode is autonomous: one person and the agent, from idea to shipped code.

## Control trigger permissions with `allowlist`

By default, everyone with repo access can trigger agent actions. Configure [`allowlist`](/reference/configuration/) to restrict this to specific users:

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

:::caution
Do not run multiple kipp•punkt runtimes against the same repository.
:::

Multiple runtimes cause collisions, duplicate reactions, and inconsistent state. If the agent needs to run on a shared server, coordinate who starts and stops it.

## Scale throughput by tuning one runtime

If you need more speed, scale the single runtime instead of adding more instances. Tune [`maxConcurrency`](/reference/configuration/) up and [`pollIntervalMinutes`](/reference/configuration/) down, while staying within GitHub rate limits:

```json
{
  "maxConcurrency": 3,
  "pollIntervalMinutes": 3
}
```

This gives you more parallel work without coordination chaos. See [Set up your repository](/guides/set-up-your-repository/#tune-the-key-config-fields) for more on tuning these fields together.
