---
title: Shape ideas effectively
sidebar:
  order: 2
---

The refinement stage is where a rough idea becomes an implementation-ready requirement. You collaborate with the refine agent in a GitHub issue thread until both sides agree on what should be built. This page explains how that collaboration works and how to get the best results from it.

## What the refine agent can do

The refine agent picks up issues assigned to the bot user (mentions in the issue body or comments also work). From there, it:

- Drives the conversation from a vague idea toward a well-scoped requirement.
- Asks clarifying questions when the intent is ambiguous.
- Inspects codebase context to ground its suggestions in the current state of your project.
- Proposes splitting large issues into smaller sub-issues when scope is too broad for a single implementation pass.
- Produces a structured requirement table — the handoff contract that the build agent implements against.

The agent adapts to ambiguity. You don't need a perfectly written issue to start — a rough sketch is enough. The conversation fills in the gaps.

## What the refine agent cannot do

- It does not enqueue a task without your explicit approval. You always decide when a requirement is ready for implementation.
- It does not use emoji reactions as triggers. Only comments drive the conversation.
- It does not react to edits on the issue title or body. If you update the issue description, mention the change in a comment so the agent picks it up.

## What you are expected to do

Your role during refinement is straightforward:

1. **Answer the agent's questions.** The agent asks because it needs clarity — your answers steer the requirement toward something implementable.
2. **Review the structured requirement table.** Before approving, check that acceptance criteria match your intent. Correct anything that doesn't look right.
3. **Add context where it helps.** File paths, links to related issues, design references, or notes about constraints all help the agent make better decisions. The more relevant context you provide, the fewer review cycles you'll need later.

:::tip
You don't have to follow every suggestion the agent makes. It's there to help you think through the problem — not to prescribe the solution. If you disagree, say so in the thread and the agent adjusts.
:::

## Approval boundaries

Two actions require your explicit approval in comments:

- **Enqueue for implementation.** The agent proposes requirements, but only you can approve them for the build queue.
- **Sub-issue creation.** If the agent suggests splitting work, it waits for your confirmation before creating new issues.

Nothing moves forward without your say-so.

## Why this matters

The structured requirement is the contract between you and the build agent. Acceptance criteria, scope, and context from this stage flow directly into implementation.

When refinement is thorough, the build agent produces closer-to-correct PRs on the first pass. When refinement is rushed, you pay for it in review churn — more back-and-forth, more iterations, more time spent on the PR instead of on the next idea.

Investing a few extra minutes in refinement is the highest-leverage thing you can do to speed up the overall loop.
