---
title: "Run the kipp•punkt agent"
sidebar:
  order: 4
---

With [quick setup](/get-started/quick-setup/) and [your bot account set up](/get-started/set-up-your-bot-account/), you're ready to start kipp•punkt.

## 1. Set environment variables

Export the bot account's personal access token in the shell where you'll run kipp•punkt:

```bash
export GH_TOKEN=ghp_your_bot_token_here
```

:::tip[Premium unlocked, limited time]
kipp•punkt offers a free tier and a premium tier. For a limited time, you can unlock all premium features (parallel agents, faster response times) with the license code `EARLY-ADOPTER`. No account or credit card needed.

```bash
export KIPPPUNKT_LICENSE=EARLY-ADOPTER
```
:::

## 2. Start kipp•punkt

From the root of your cloned repository, run the orchestrator with [Codex](https://github.com/openai/codex) as the AI harness:

```bash
npx @kipppunkt/agent start \
  --command "codex exec {prompt} --dangerously-bypass-approvals-and-sandbox"
```

When it starts successfully, kipp•punkt logs its API endpoint to stdout:

```
[INFO] Orchestrator API: http://localhost:2309
```

:::note
Other harnesses work too. Claude Code, OpenCode, and Copilot CLI are all supported. See the [CLI commands](/reference/cli-commands/) reference for the full list of harness command templates.
:::

:::caution
The `--dangerously-bypass-approvals-and-sandbox` flag is fine for a quick test run, but for any permanent setup you should [install kipp•punkt](/reference/installation/) and run the agent in a sandbox. See [Using Docker Sandboxes](/reference/using-docker-sandboxes/) and [Sandbox with Docker on Linux](/reference/sandbox-with-docker-linux/) for recommended configurations.
:::

## Next steps

With the agent running, head to [Ship your first idea](/get-started/ship-your-first-idea/) to walk through the full issue-to-merge workflow.
