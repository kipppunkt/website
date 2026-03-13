---
title: Set up your bot account
sidebar:
  order: 3
---

kipp•punkt works through a separate GitHub account so its PRs and comments stay clearly distinct from yours.

This is a one-time setup: create the account, invite it to your repository, and generate one token.

:::tip
Most email providers let you reuse your existing address with a `+` suffix. For example, if your email is `alice@gmail.com`, you can sign up with `alice+bot@gmail.com`, no second inbox needed.
:::

## 1. Create the bot account

Create a **separate GitHub account** for the agent.

## 2. Invite it to your repository

Add the bot account as a collaborator to the repository where you want to run kipp•punkt.

## 3. Generate a personal access token

Log in as the bot account and generate a [personal access token](https://github.com/settings/tokens) with **repo** permissions.

You'll use this token as `GH_TOKEN` when starting kipp•punkt.

## Next step

With the bot user ready, continue with [Run the kipp•punkt agent](/get-started/run-the-kipppunkt-agent/).
