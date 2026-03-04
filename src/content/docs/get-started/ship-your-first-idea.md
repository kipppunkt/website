---
title: Ship your first idea
sidebar:
  order: 4
---

With the kipp•punkt agent [up and running](/get-started/run-kipppunkt/), you're ready to ship your first idea.

## 1. Create a GitHub issue

Open an issue describing what you want to build. Write it like you'd explain the idea to a colleague: what it should do and any constraints worth mentioning.

Assign the issue to your bot GitHub account. This is what triggers kipp•punkt to pick it up.

<!-- screenshot of a newly created GitHub issue -->

## 2. Refine the idea

Once kipp•punkt picks up the issue on its next poll cycle, it starts a refinement conversation in the comments, clarifying questions, edge cases, and proposed requirements. This may take a few minutes depending on your `pollIntervalMinutes` setting.

<!-- screenshot of refinement comments on the issue -->

Answer at your own pace. The agent waits for your input before moving on.

## 3. Approve requirements

Once the agent has enough information, it presents final requirements for your approval. These are the acceptance criteria it will implement against.

Read them carefully and make sure everything is according to your liking. Give the agent your approval via a comment if you're happy with the result.

<!-- screenshot of the requirements approval prompt -->

## 4. Let it implement

The kipp•punkt agent creates its own workspace, starts a new branch, implements the requirements, and opens a pull request. This runs autonomously in the background and can take some time.

<!-- screenshot of the opened pull request -->

## 5. Review and iterate

Once the agent opened the PR, review it as you would any other. Leave comments and request changes. The agent responds and pushes follow-up commits.

<!-- screenshot of a review comment on the PR -->

:::tip
Specific, actionable feedback leads to better iterations. Point to exact behavior and describe what you expect instead.
:::

## 6. Merge

Once satisfied, merge the PR. The issue closes automatically.

<!-- screenshot of the merged PR -->

## You're set

You just went from idea to implemented feature without writing a single line of code, and you could have done all of this from your mobile. Now imagine running five of these at once, on different repositories, 24/7.

From here, explore the guides to get the most out of kipp•punkt, from [shaping ideas effectively](/guides/shape-ideas-effectively/) to [running productive review loops](/guides/run-effective-review-loops/).
