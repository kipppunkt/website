---
title: You stay in control
sidebar:
  order: 2
---

kipp•punkt automates implementation, but every decision that matters stays with you. Three explicit boundaries ensure the agent never acts beyond what you've approved.

## Approval boundary

Nothing gets implemented until you say so. When you create an issue and the refine agent produces a structured requirement, that requirement sits idle until you explicitly approve it in a comment. The agent does not enqueue work on its own, does not interpret silence as approval, and does not start implementing based on partial input.

This means you control what enters the pipeline. If a requirement isn't scoped well enough, you reject or revise it before any code is written.

## Review boundary

Every implementation produces a pull request. The agent opens it, you review it — the same way you'd review any human-written PR. You leave comments on files and code lines, and the agent responds: pushing fixes or replying with explanations depending on your feedback.

There is no auto-approval step. The agent does not mark its own work as ready. You decide when the output meets your standards.

## Merge boundary

The agent never merges. It cannot close the loop on its own. You review the PR, and when you're satisfied, you merge it yourself. The linked issue closes automatically on merge — but that merge action is always yours.

This is a hard boundary, not a default you can toggle off. kipp•punkt is designed so that shipping code always requires a human decision.

## What the agent does autonomously

Between these boundaries, the agent operates without intervention. It:

- Drives refinement conversations on issues.
- Creates working branches and workspaces.
- Implements requirements and opens PRs.
- Responds to your review comments with code changes or replies.
- Retries failed attempts up to the configured limit.
- Resolves merge conflicts when configured to do so.

All of this happens within the boundaries above. The agent works continuously, but it never advances work past a checkpoint you haven't approved.
