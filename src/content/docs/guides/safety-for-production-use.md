---
title: Safety for production use
sidebar:
  order: 7
---

Running kipp•punkt in production means an AI agent has access to your codebase, your GitHub account, and potentially your network. The defaults are permissive by design — they optimize for fast setup, not for hardened deployment. This guide covers the measures that matter most when the stakes are real.

## Run in a containerized environment

The agent harness executes shell commands as part of implementation. In production, those commands should not run on your host system. Use a containerized runtime — Docker or a similar isolation layer — so the agent's filesystem and network access are bounded to the container.

This reduces blast radius if the agent executes something unexpected. Even with a well-behaved harness, defense in depth applies: assume the agent will eventually run a command you didn't anticipate.

See [Sandbox with Docker](/reference/sandbox-with-docker/) and [Sandboxing by harness](/reference/sandboxing-by-harness/) for setup details.

## Restrict who can trigger actions

By default, any GitHub user who can comment on an issue or PR can trigger agent actions. In production, that is too broad.

Set `allowlist` in your [config file](/reference/configuration/) to limit trigger permissions to approved usernames only. An empty allowlist means anyone can trigger actions — so always set it explicitly in production.

If your repo has active discussion threads where not every comment should trigger the agent, also enable `requireMention` so the agent only reacts when explicitly mentioned.

## Use minimal GitHub token scope

The bot account token should have only `repo` scope. Do not grant broader permissions.

A narrowly scoped token limits the damage if the token leaks or if prompt injection tricks the agent into making unintended API calls. The agent does not need admin, workflow, or org-level permissions to function.

## Bound agent runtime

Without explicit limits, a misbehaving agent can loop indefinitely — burning tokens, creating noise, or worse.

Pass `--max-turns` (or the equivalent flag for your harness) so the agent exits after a bounded number of iterations. Combine this with `maxFailedAttempts` in config to cap how many times a failing task is retried before it stops.

Together, these two settings prevent runaway loops at both the single-run and task-lifecycle level.

## The main failure mode

The worst production setup combines broad trigger permissions, no containerization, and no runtime limits. In that scenario, any GitHub user can trigger unbounded agent execution on your host system with a repo-scoped token.

Avoid this by applying all four measures above: container isolation, restricted triggers, minimal token scope, and bounded runtime. Each layer is simple on its own — the risk comes from skipping them in combination.

See [Security and sandbox flags](/reference/security-and-sandbox-flags/) for a detailed matrix of recommended versus risky flag configurations.
