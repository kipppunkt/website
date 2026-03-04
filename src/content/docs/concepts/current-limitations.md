---
title: Current limitations
sidebar:
  order: 4
---

kipp•punkt is under active development. This page lists known boundaries and rough edges so you can plan around them.

## No native multi-repo support

You can run kipp•punkt for multiple repositories on the same machine, but each instance polls GitHub independently. As you add repos, this becomes inefficient against GitHub's API rate limits. A centralized multi-repo mode is on the [roadmap](/concepts/roadmap).

## Limited observability

When an agent run fails, diagnosing the root cause can be difficult. How much detail you get depends on your harness — some surface useful logs, others don't. There is no built-in dashboard or structured error reporting yet.

## No CI pipeline reaction

The agent does not react to CI pipeline outcomes. If your build or test suite fails after a PR is opened, the agent won't notice or attempt a fix on its own. You need to flag the failure in a review comment for the agent to act on it. For now, the best approach is to instruct the agent to run the relevant checks before committing — either in your `AGENTS.md` or via the `pretext` config property.

## No persistent memory across tasks

Each task starts from a blank slate. The agent does not carry learned context, preferences, or corrections from previous tasks into the next one. If it made a mistake on one PR and you corrected it in review, it may repeat the same mistake on the next task. Persistent memory is on the [roadmap](/concepts/roadmap).

## Insufficient harness sandboxes

Current AI harness sandboxes are either too restrictive, not restrictive enough, or not supported at all. In practice, this means you should run kipp•punkt inside a [Docker container](/reference/using-docker-sandboxes) to get a meaningful security boundary — or accept the risk of running the agent with full access to your machine.
