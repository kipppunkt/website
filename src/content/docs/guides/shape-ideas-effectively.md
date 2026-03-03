---
title: Shape ideas effectively
sidebar:
  order: 3
---

Your issue starts the loop:

`issue -> refine -> requirements -> build -> PR -> review`

In kipppunkt, you do not need a perfect issue up front. You can start with a rough idea, and the refine agent will guide you to a clear, implementable requirement through comments.

:::tip
The recommendations below are speed and quality levers, not prerequisites. If your issue is still rough, open it anyway and refine with the agent.
:::

## Start with outcome, not implementation

Describe what should be true when the feature is done. Focus on user-visible behavior and concrete acceptance criteria, not code-level instructions.

If you already know technical constraints, include them. If not, keep it declarative and let refinement shape the details.

## Keep scope to one feature

One issue should target one feature-level outcome. If a request is too broad, the refine agent will call that out and suggest splitting it into sub-issues so each requirement stays coherent and implementable.

This keeps refinement focused and avoids weak, blended requirements that slow implementation and review.

## Add context that changes decisions

Share only context that affects the requirement: current behavior, hard constraints, and domain rules. The refine agent will autonomously inspect the codebase when needed, but you can speed this up by pointing to relevant files or folders, for example `docs/`, `src/billing/`, or a related issue.

## Refine in back-and-forth until intent is exact

After issue creation, the refine agent asks clarifying questions, surfaces ambiguities, and proposes requirement wording. Your job is to confirm, correct, and sharpen intent until the requirement matches what you actually want built.

Typical flow:

- You open an issue with a rough idea.
- The refine agent asks focused follow-up questions.
- You answer, add missing constraints, and confirm edge-case behavior.
- The refine agent produces a final requirement for approval.
- The build agent implements against that approved requirement.

Issue quality directly impacts build quality: clear requirements produce cleaner implementations and faster review loops.

## Avoid common pitfalls

Avoid packing multiple features into one issue, hiding key constraints in late comments, or using vague terms like "fast" without a measurable meaning. Also avoid approving requirements before the wording clearly matches your intent.
