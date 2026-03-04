---
title: Prerequisites
sidebar:
  order: 2
---

kipp•punkt orchestrates AI agents that turn your ideas into pull requests. It runs locally on your machine and uses a bot GitHub account to open PRs and respond to reviews. Before running it for the first time, make sure you have the following in place.

## Install an AI coding agent

kipp•punkt works with any AI coding agent CLI, such as [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex](https://github.com/openai/codex), or [OpenCode](https://github.com/sst/opencode). Install whichever agent you prefer and make sure it is available on your `PATH`.

## Install the GitHub CLI

The [GitHub CLI (`gh`)](https://cli.github.com/) is required for creating and managing pull requests. Install it and make sure it is available on your `PATH`.

## Create a bot GitHub account

Create a **separate GitHub account** for the agent. This keeps agent-authored PRs visually distinct from your own work.

:::tip
Most email providers let you reuse your existing address with a `+` suffix. For example, if your email is `alice@gmail.com`, you can sign up with `alice+bot@gmail.com`, no second inbox needed.
:::

Once created, invite the bot account as a collaborator to your repository and generate a [personal access token](https://github.com/settings/tokens) with **repo** permissions.

## Use Git with HTTPS

Git must be configured to authenticate over HTTPS. The bot's `GH_TOKEN` is used for both `gh` CLI auth and git credential auth, so HTTPS is the simplest setup.

Confirm your remote uses HTTPS:

```bash
git remote get-url origin
# should start with https://
```
