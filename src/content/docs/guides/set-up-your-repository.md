---
title: Set up your repository
sidebar:
  order: 5
---

Before starting kipp•punkt, your repository needs minimal preparation. This page covers the initial state to start from, what kipp•punkt does once it's running, and the configuration fields that matter most for day-to-day operations.

## Start from a clean checkout

Start from a clean checkout on the latest `main` (or whichever branch you've configured as `baseBranch` in your [configuration](/reference/configuration/)). There should be no uncommitted local changes. kipp•punkt creates workspaces from the base branch, and uncommitted work won't be included.

```bash
git checkout main
git pull
```

No special directory structure or initialization command is needed.

## Keep working normally after start

Once kipp•punkt is running, it manages its own branches and workspaces. You can keep using your repository normally: switch branches, edit files, commit, push. kipp•punkt operates in isolated workspaces and won't interfere with your local work.

If you need to stop kipp•punkt, press `Ctrl+C`. State is persisted to disk and the orchestrator resumes where it left off on next start. See [CLI commands](/reference/cli-commands/) for details on the `start` command.

## Add project context

Nothing is strictly required, but an `AGENTS.md` file at the root of your repository is strongly recommended. This is the primary way you give the kipp•punkt agents project-specific instructions: coding conventions, architecture notes, technology choices, testing expectations.

The better your context, the better the output. If the agent keeps making the same mistake, the fix is almost always to update `AGENTS.md` or add a focused context document rather than to leave the same PR feedback again.

:::tip
You don't need to write `AGENTS.md` from scratch. Start with a few bullet points about your stack and conventions, then expand it over time as you notice patterns in agent output. See the [daily workflow](/guides/daily-workflow/) guide for more on context maintenance.
:::

## Tune the key config fields

The full field reference lives in the [configuration](/reference/configuration/) page. These are the fields that matter most for repository setup and operations:

### `maxConcurrency` and `pollIntervalMinutes`

These are your main throughput levers.

- **`maxConcurrency`** controls how many tasks are under active development simultaneously. Start with `1` until you're comfortable with the workflow, then increase if needed.
- **`pollIntervalMinutes`** controls how often the orchestrator checks for new work (PR comments, issue updates). Lower values mean faster reactions but more GitHub API calls.

Tune both together. High concurrency with aggressive polling can run into GitHub rate limits. If you notice rate-limit errors, back off `pollIntervalMinutes` first.

### `postWorkspaceCreation`

A shell command that runs in the workspace directory immediately after creation and before the kipp•punkt agent starts. Use this for setup steps your project needs:

```json
{
  "postWorkspaceCreation": "rm -rf node_modules && pnpm install"
}
```

Workspace creation copies your entire project folder (including `node_modules`, `venv`, `.env`) into the workspace as-is. Use this hook to reinstall dependencies, fix broken symlinks, or run any other workspace-specific bootstrap step.

## Start, stop, and resume

The intended operating model is simple: start kipp•punkt and leave it running. It polls for work, reacts to GitHub activity, and idles when there's nothing to do.

- **Start**: `kipppunkt-agent start --command "<template>"`. See [CLI commands](/reference/cli-commands/) for the full option set.
- **Stop**: `Ctrl+C`. The orchestrator shuts down gracefully and persists state.
- **Resume**: Run the same start command again. The orchestrator picks up where it left off.

You don't need to worry about losing progress on stop. Task state, attempt counters, and queue position are all persisted to the [state directory](/reference/configuration/).

## Secure your setup

:::tip[Keep your token out of shell history]
Your `GH_TOKEN` has repo-level permissions. Avoid leaving it in your shell history by [hiding exported variables from bash history](https://dev.to/epranka/hide-the-exported-env-variables-from-the-history-49ni), or use [direnv](https://direnv.net/) with a `.envrc` file for a persistent setup.
:::

:::caution[Run in a sandbox]
The kipp•punkt agent needs broad permissions to be effective. Running it directly on your host means it has access to your filesystem and network. Use a containerized environment to limit the blast radius. See [Using Docker Sandboxes](/reference/using-docker-sandboxes/) and [Safety for production use](/guides/safety-for-production-use/).
:::

For a full security checklist, see [Safety for production use](/guides/safety-for-production-use/).
