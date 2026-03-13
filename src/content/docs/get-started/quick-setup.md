---
title: Quick setup
sidebar:
  order: 2
---

kipp•punkt helps you refine your ideas, implements them, and reacts to your PR reviews.
So you stay in control from idea to merge.

In this guide, you'll set it up locally and ship your first idea with kipp•punkt.

Start with these three quick checks.

## Have an AI coding CLI ready

kipp•punkt works with any AI coding agent CLI, such as [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex](https://github.com/openai/codex), or [OpenCode](https://github.com/sst/opencode). Make sure the one you use is available on your `PATH`.

## Install the GitHub CLI

The [GitHub CLI (`gh`)](https://cli.github.com/) is required for creating and managing pull requests. Install it and make sure it is available on your `PATH`.

## Check your Git remote

Clone the repository you want kipp•punkt to work on. Git must be configured to authenticate over HTTPS. The bot's `GH_TOKEN` is used for both `gh` CLI auth and git credential auth, so HTTPS is the simplest setup.

Confirm your remote uses HTTPS:

```bash
git remote get-url origin
# should start with https://
```

## Next step

Once these three checks are in place, continue with [Set up your bot account](/get-started/set-up-your-bot-account/).
