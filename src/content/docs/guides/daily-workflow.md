---
title: Daily workflow
sidebar:
  order: 1
---

This guide covers the repeatable loop for day-to-day work with kipp•punkt. It assumes you've already [shipped your first idea](/get-started/ship-your-first-idea/).

## Create issues freely

Open GitHub issues whenever ideas come up, from your desk or from your phone on the go. Assign them to the bot account, or @mention the bot in the issue body or a comment. Either triggers kipp•punkt to pick it up. The agent drives the refinement queue, so just keep feeding it.

## Approve carefully

The agent drives each issue toward a structured requirement table. Answer its questions and add context it can't infer, e.g. file paths, design links, related issues. If the scope is too broad, the agent may propose splitting the issue into sub-issues.

Before approving, verify the requirement table is specific enough to review a PR against: relevant context referenced, scope that fits a single PR, and no implicit dependencies on unmerged work.

:::tip
This is the most important step. Bad requirements lead to bad implementations. One extra round of refinement can save you many rounds of review.
:::

## Give feedback efficiently

Once the requirement is implemented, the agent opens a PR. Review it like any other.

:::note
General PR-level comments are not consumed by the agent. Use file or line-level comments instead.
:::

Batch your feedback into one review pass rather than leaving comments one by one. Each round-trip triggers a new agent cycle, so fewer passes means faster convergence and less tokens spent. 

The agent interprets your tone: instructions trigger code changes, questions trigger replies. You can nudge it in either direction by how you phrase your comment.

Merge when satisfied. The issue closes automatically.

## When things fail

If the agent fails repeatedly on the same task, kipp•punkt stops retrying and posts a comment on the issue. Check logs to identify the root cause, then either tell the agent to retry in the issue or fix the underlying problem first.

See [Handle blocked or failed tasks](/guides/handle-blocked-or-failed-tasks/) for details.

## Keep your context current

The single biggest factor in output quality is the context kipp•punkt works with. When you notice recurring review feedback correcting the same pattern, add it to `AGENTS.md`. After merging features that change architecture or APIs, update the context docs that reference them. After failed tasks that trace back to missing context, fix the source rather than just retrying.

If the requirements themselves turn out to be wrong, you have two options: tell the agent directly in the PR, or go back to the GitHub issue, continue refinement with the agent there, and have it update the task. Once updated, close the open PR. kipp•punkt starts a fresh implementation from the revised requirements.
