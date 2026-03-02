---
title: Prerequisites
sidebar:
  order: 2
---

Before running kipppunkt for the first time, make sure you have the following in place.

## AI coding agent

kipppunkt needs an AI coding agent to do the actual implementation work. Install [Claude Code](https://docs.anthropic.com/en/docs/claude-code):

```bash
npm install -g @anthropic-ai/claude-code
```

## GitHub CLI

The [GitHub CLI (`gh`)](https://cli.github.com/) is required for creating and managing pull requests. Install it and authenticate:

```bash
gh auth login
```

## Bot GitHub account

Create a **separate GitHub account** for the agent. This keeps agent-authored PRs visually distinct from your own work.

:::tip
Most email providers let you reuse your existing address with a `+` suffix. For example, if your email is `alice@gmail.com`, you can sign up with `alice+bot@gmail.com` — no second inbox needed.
:::

Once created, invite the bot account as a collaborator to your repository and generate a [personal access token](https://github.com/settings/tokens) with **repo** permissions.

## Git with HTTPS

Git must be configured to authenticate over HTTPS. The bot's `GH_TOKEN` is used for both `gh` CLI auth and git credential auth, so HTTPS is the simplest setup.

Confirm your remote uses HTTPS:

```bash
git remote get-url origin
# should start with https://
```
