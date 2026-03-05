---
title: Roadmap
sidebar:
  order: 6
---

kipp•punkt is under active development. Here is what's planned next.

## Task-specific short-term memory

Agents currently start each task from scratch. Short-term memory gives an agent context about what it already tried within a single task, so it avoids repeating mistakes and builds on prior attempts.

## Collective long-term memory

Learnings from one task should carry over to future tasks. Long-term memory captures patterns, preferences, and recurring feedback across the full history of a repository, so agents get better over time without you repeating yourself.

## Multi-repo orchestration

Running separate kipp•punkt instances per repository works but scales poorly against GitHub rate limits. A centralized orchestrator that manages multiple repositories from a single process will remove this bottleneck.

## Periodic refactoring agent

After several features land, codebases accumulate drift. A refactoring agent that runs every *n* cycles reviews recent changes, identifies structural debt, and opens cleanup PRs automatically.

## Improved dependency scheduling

Today, task ordering is mostly manual. Better dependency scheduling will let the orchestrator reason about which tasks block others and sequence work accordingly, especially in multi-agent setups.

## Voice calls on GitHub issues

Complex ideas are easier to talk through than type out. The goal is to let you start a voice conversation with the kipp•punkt agent directly from a GitHub issue, using your existing call infrastructure, for faster refinement on topics where text is too slow.
