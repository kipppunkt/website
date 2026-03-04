---
title: How kipppunkt works
sidebar:
  order: 1
---

kipp•punkt turns GitHub issues into pull requests. You shape the idea, approve the requirement, and review the result. Everything in between is automated.

## The flow: issue to PR

When you create a GitHub issue and assign it to the bot account, the system picks it up automatically.

1. **Refine.** The refine agent engages on the issue thread. It asks clarifying questions, proposes scope adjustments, and produces a structured requirement. Nothing moves forward until you explicitly approve the requirement in a comment.
2. **Build.** Once approved, the orchestrator enqueues the task. An agent picks it up, creates a workspace, implements the requirement, and opens a PR.
3. **Review.** You review the PR as you would any other. Leave comments on files and code lines. The agent responds — pushing fixes or replying with explanations. You merge when satisfied.

For details on approval and merge boundaries, see [You stay in control](/concepts/you-stay-in-control/). For the day-to-day operating loop, see [Daily workflow](/guides/daily-workflow/).

## The orchestrator

The orchestrator is the central process that coordinates everything. It runs on your machine (or in a container) and manages the task lifecycle:

- **Polls GitHub** for new issues, comments, and PR activity at a configurable interval.
- **Assigns tasks** to agents based on priority and concurrency limits.
- **Tracks state** for every task: idle, in-progress, waiting for review, failed.
- **Persists state to disk** so nothing is lost on restart. If the process crashes or you stop it, it picks up exactly where it left off on next start.

The orchestrator does not run on a remote server. It runs wherever you start it — your laptop, a VM, a container. You control when it runs and when it stops.

## Agents and workspaces

Each task runs in its own isolated workspace — a separate working copy of your repository branched off `main`. This means:

- **No interference.** Multiple tasks can run concurrently without stepping on each other's branches or files.
- **Clean state.** Each agent starts from a fresh checkout. If a `postWorkspaceCreation` command is configured, it runs before the agent starts (e.g. `npm install`).
- **Harness-agnostic.** The orchestrator calls your chosen AI coding agent (Claude Code, Codex, OpenCode, or others) via a command template. kipp•punkt is not an AI model — it orchestrates whichever harness you provide.

The agent interacts with your repo through git and the GitHub API. It creates branches, commits code, opens PRs, and responds to review comments — all under the bot account you configure.

## Where state lives

All orchestrator state is persisted in a local directory (`.kipppunkt/` by default). This includes:

- **Task state** — which tasks are queued, in progress, or completed.
- **Workspace metadata** — which branches map to which tasks.

No state is stored on a remote server. If you delete the state directory, the orchestrator starts fresh.

## Crash recovery

The orchestrator is designed to resume cleanly:

- **Process restart.** State is written to disk after every transition. Stopping and restarting the orchestrator picks up where it left off.
- **Failed tasks.** If an agent exits with an error or a PR is closed without merge, the attempt is counted. After exceeding the configured retry limit (`maxFailedAttempts`), the task moves to `failed` and the orchestrator posts a comment on the issue. You can retry manually at any time.
- **No orphaned work.** Workspaces and branches are tied to task state. The orchestrator does not leave dangling branches or zombie processes.

<!-- TODO: Insert architecture diagram here (orchestrator + agents + GitHub + user). -->
<!-- The diagram will be provided separately and should be placed in this position. -->

## What runs where

| Component | Runs on | Talks to |
|---|---|---|
| Orchestrator | Your machine / container | GitHub API, local filesystem |
| Agent (harness) | Spawned by orchestrator | Git, GitHub API, your codebase |
| GitHub | GitHub servers | You, orchestrator, agent |
| You | Anywhere | GitHub (issues, PRs) |

The orchestrator and agents run locally. GitHub is the shared surface where you and the system interact.
