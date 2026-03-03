---
title: Shape ideas effectively
sidebar:
  order: 3
---

Your issue is the starting signal for the whole loop:

`issue -> refine -> requirements -> build -> PR -> review`

You do not need a perfect issue to start. The refine agent is there to help you shape rough ideas into good requirements through conversation. These tips just help you get better results faster.

## 1. Describe the outcome declaratively

State what should be true when the work is done, not how to code it.

- Describe user-visible behavior.
- Add acceptance criteria you can verify from the outside.
- Avoid implementation instructions unless they are real constraints.

Good:

- "Users can archive a project from the project settings page."
- "Archived projects no longer appear in the active project list."

Weak:

- "Add an `archiveProject()` function in `ProjectService`."
- "Use React Query mutation with optimistic updates."

## 2. Keep one feature per issue

One issue should represent one feature-level outcome.

- Split unrelated changes into separate issues.
- If work depends on another feature, link the related issue.
- Keep each issue reviewable on its own.

This keeps refinement focused and prevents broad, low-signal requirements.

## 3. Include context and constraints that actually matter

Give the refine agent the information it needs to ask the right questions.

- Relevant context: current behavior, user role, affected workflow.
- Real constraints: compliance, performance bounds, compatibility needs, deadlines.
- Useful artifacts: screenshots, docs, prior decisions, related issues.

Skip noise. If context does not influence the requirement, leave it out.

## 4. Use refinement as the quality gate

After issue creation, refinement is where quality is made.

- Answer clarifying questions directly.
- Confirm edge cases and failure behavior.
- Resolve ambiguity before approving requirements.

The build agent implements against the approved requirements. If requirements are vague, implementation and review quality drop.

## Common pitfalls to avoid

- Bundling multiple features in one issue.
- Writing only technical steps instead of desired behavior.
- Hiding critical constraints in late comments.
- Leaving key terms undefined ("fast", "intuitive", "robust").
- Approving requirements before they clearly match your intent.

## Quick issue checklist

Before opening an issue, verify:

- The outcome is clear and user-facing.
- The issue contains one feature, not a batch.
- Acceptance criteria are concrete and testable.
- Relevant constraints and context are included.
- Unknowns are explicit so refinement can resolve them.

If you skip some of this, still start. The refine agent will guide you toward a solid requirement through follow-up questions. Better issue quality just shortens that path.
