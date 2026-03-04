---
title: Set up for team repositories
sidebar:
  order: 6
---

kipppunkt is not designed for large engineering org workflows. The product vision is a small number of high-performing people who cover the full value stream end-to-end — from idea to shipped code. In team setups, optimize for clarity and control, not broad participation.

## Assume a small owner group

The best setup is a few core owners, or one engineer plus one stakeholder. Define clearly who drives issue refinement, who gives approval for enqueue, and who merges PRs.

Ambiguity here is the root cause of most team friction. If everyone can approve and merge, nobody owns quality. Pick your owners explicitly before starting kipppunkt.

## Control trigger permissions with `allowlist`

In team repos, not everyone should be able to trigger agent actions. Configure [`allowlist`](/reference/configuration/) so only intended users can trigger refine actions and approvals:

```json
{
  "allowlist": ["alice", "bob"]
}
```

This prevents drive-by comments from changing execution flow. Without an allowlist, any GitHub user with repo access can trigger the agent — fine for solo use, risky in a team.

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

## Main failure mode to avoid

The worst team setup is broad trigger permissions combined with multiple runtimes. That combination creates noisy loops, conflicting agent actions, and poor predictability. To stay safe:

- Set `allowlist` to a small, explicit set of users.
- Enable `requireMention` so the agent only acts when addressed.
- Run exactly one kipppunkt runtime per repository.
- Scale throughput by tuning concurrency, not by adding instances.
