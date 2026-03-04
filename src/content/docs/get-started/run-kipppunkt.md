---
title: "Run the kipp•punkt agent"
sidebar:
  order: 3
---

With the [prerequisites](/get-started/prerequisites/) in place, you're ready to start the agent.

## Set `GH_TOKEN`

Export the bot account's personal access token in the shell where you'll run kipp•punkt:

```bash
export GH_TOKEN=ghp_your_bot_token_here
```

## Start kipp•punkt

Run the orchestrator with [Codex](https://github.com/openai/codex) as the AI harness:

```bash
npx @kipppunkt/agent start \
  --command "codex exec {prompt} --dangerously-bypass-approvals-and-sandbox"
```

:::note
Other harnesses work too — Claude Code, OpenCode, and Copilot CLI are all supported. See the [CLI commands](/reference/cli-commands/) reference for the full list of harness command templates.
:::

:::caution
The `--dangerously-bypass-approvals-and-sandbox` flag is fine for a quick test run, but for any permanent setup you should run the agent in a sandbox. See [Using Docker Sandboxes](/reference/using-docker-sandboxes/) and [Sandbox with Docker on Linux](/reference/sandbox-with-docker-linux/) for recommended configurations.
:::

## Verify it's running

Once started, the orchestrator logs its status to stdout. You should see output indicating it is polling for work:

```
[INFO] Orchestrator API: http://localhost:2309
```

You can also query the orchestrator API to confirm it's up:

```bash
curl http://localhost:2309/tasks
```

This should return a JSON array of tasks (or an empty array if no requirements have been loaded yet).

## Next steps

With the agent running, head to [Ship your first idea](/get-started/ship-your-first-idea/) to walk through the full issue-to-merge workflow.
