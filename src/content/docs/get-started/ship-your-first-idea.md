---
title: Ship your first idea
sidebar:
  order: 4
---

With kipppunkt [up and running](/get-started/run-kipppunkt/), you're ready to ship your first idea. This page walks through the full cycle — from opening a GitHub issue to merging the finished pull request.

## 1. Create a GitHub issue

Open a new issue in your repository describing what you want to build. Write it the way you'd explain the idea to a colleague: what the feature should do, who it's for, and any constraints worth mentioning. Don't worry about formatting it perfectly — kipppunkt will help you refine it.

<!-- TODO: screenshot of a newly created GitHub issue -->

:::tip
Short, focused ideas work best. One feature per issue keeps implementation and review manageable.
:::

## 2. kipppunkt refines the issue

Once the issue is created, kipppunkt picks it up and starts a refinement conversation directly in the issue comments. It asks clarifying questions, surfaces edge cases you may not have considered, and proposes concrete requirements.

<!-- TODO: screenshot of kipppunkt refinement comments on the issue -->

This back-and-forth continues until the requirements are clear enough to implement. You can answer at your own pace — kipppunkt waits for your input before moving on.

## 3. Approve the requirements

When refinement is complete, kipppunkt presents a final set of requirements for your approval. Review them carefully — these are the acceptance criteria the agent will implement against.

<!-- TODO: screenshot of the final requirements summary and approval prompt -->

Once you approve, kipppunkt moves the issue into implementation.

## 4. kipppunkt implements and opens a PR

kipppunkt creates a branch, implements the requirements, and opens a pull request against your base branch. The PR description references the original issue and lists the requirements that were implemented.

<!-- TODO: screenshot of the opened pull request -->

This step runs autonomously. Depending on the scope of the idea, it may take a few minutes. You don't need to stay at your desk — kipppunkt works in the background.

## 5. Review the PR

Review the pull request as you would any other. Read the diff, leave comments, and request changes if something isn't right.

<!-- TODO: screenshot of a review comment on the PR -->

kipppunkt responds to your review comments and pushes follow-up commits. This review loop continues until you're satisfied with the result.

:::tip
Specific, actionable feedback leads to better iterations. Instead of "this doesn't look right," point to the exact behavior you'd like changed and describe what you expect instead.
:::

## 6. Merge

Once the PR meets your standards, merge it. The issue closes automatically.

<!-- TODO: screenshot of the merged PR -->

That's it — your idea went from a GitHub issue to shipped code without leaving the GitHub workflow you already know.

## What's next

Now that you've shipped your first idea, explore the [guides](/guides/) for tips on shaping ideas effectively and running productive review loops.
