---
title: Safety for production use
sidebar:
  order: 7
---

The defaults are permissive to optimize for fast setup. In production, tighten them. This guide covers the four measures that matter most.

## Isolate the agent in a container

The agent harness executes shell commands as part of implementation. In production, those commands should not run on your host system. Use a containerized runtime (Docker or a similar isolation layer) so the agent's filesystem and network access are bounded to the container.

See [Using Docker Sandboxes](/reference/using-docker-sandboxes/) and [Sandbox with Docker on Linux](/reference/sandbox-with-docker-linux/) for setup details.

## Restrict who can trigger actions

By default, any GitHub user who can comment on an issue or PR can trigger agent actions. In production, that is too broad.

Set [`allowlist`](/reference/configuration/) to limit trigger permissions to approved usernames only:

```json
{
  "allowlist": ["alice", "bob"]
}
```

An empty allowlist means anyone can trigger actions, so always set it explicitly in production. If your repo has active discussion threads, also enable [`requireMention`](/reference/configuration/) so the agent only reacts when explicitly @mentioned. See [Set up for team repositories](/guides/set-up-for-team-repositories/#use-requiremention-to-separate-discussion-from-action) for more on both settings.

## Scope the GitHub token narrowly

The bot account token should have only `repo` scope. Do not grant broader permissions. The agent does not need admin, workflow, or org-level permissions to function. A narrowly scoped token limits the damage if the token leaks or if prompt injection causes unintended API calls.

## Limit agent runtime

Without explicit limits, a misbehaving agent can loop indefinitely, burning tokens and creating noise.

Pass `--max-turns` (or the equivalent flag for your harness) so the agent exits after a bounded number of iterations:

```bash
kipppunkt-agent start \
  --command "claude -p {prompt} --dangerously-skip-permissions --max-turns 50"
```

Combine this with [`maxFailedAttempts`](/reference/configuration/) (default: `3`) to cap how many times a failing task is retried:

```json
{
  "maxFailedAttempts": 5
}
```

These two settings prevent runaway loops at both the single-run and task-lifecycle level.
