---
title: Shape ideas effectively
sidebar:
  order: 3
---

The quality of your GitHub issues directly shapes the quality of what gets built. A clear, well-scoped issue leads to a focused refinement conversation and a strong implementation. A vague one still works — the refinement agent will guide you — but you'll get there faster with better input.

## The refinement agent has your back

You don't need to write a perfect issue. The refinement agent picks up your issue, asks clarifying questions, surfaces edge cases, and drives toward a well-defined requirement. Even a rough sketch of an idea is enough to start.

The tips below help you skip unnecessary back-and-forth and reach approval faster. Think of them as shortcuts, not prerequisites.

## What makes a good issue

### Describe what, not how

Write declaratively. Describe the desired outcome and behavior, not the implementation steps. Let the agent decide how to build it.

```markdown
<!-- Good -->
Users can filter the dashboard by date range. The default range is the last 7 days.

<!-- Avoid -->
Add a DateRangePicker component. Import it in Dashboard.tsx.
Wire it to the API query params.
```

### One feature per issue

Keep each issue focused on a single feature or change. This keeps refinement conversations tight, PRs reviewable, and merges low-risk.

If your idea spans multiple features, split it into separate issues. The refinement agent may also suggest splits when scope is too large.

### Add relevant context

Help the agent understand constraints and background that aren't obvious from the description alone:

- **Files or modules** that are relevant (`src/auth/`, `lib/api-client.ts`)
- **Links** to designs, specs, or related issues
- **Constraints** like "must work without JavaScript" or "keep backward-compatible"
- **Non-obvious acceptance criteria** that go beyond the obvious happy path

You don't need all of these every time — just include what matters for the specific idea.

## How issue quality affects the loop

Your issue is the starting point for everything downstream:

1. **Refine** — The agent uses your issue to drive the refinement conversation. Clearer input means fewer rounds of clarification before requirements are ready for approval.
2. **Build** — The approved requirements become the spec the implementation agent works against. Gaps in the requirements lead to guesswork in the implementation.
3. **Review** — Well-scoped requirements produce focused PRs. Vague requirements produce PRs that need more review cycles to get right.

Getting the issue right is the highest-leverage step in the loop.

## Common pitfalls

- **Too vague**: "Improve the settings page" gives the agent nothing concrete to refine against. Add what specifically should change and why.
- **Too prescriptive**: Step-by-step implementation instructions constrain the agent unnecessarily. Describe the outcome, not the procedure.
- **Scope creep in one issue**: Bundling multiple unrelated changes into one issue leads to large PRs that are hard to review. Split early.
- **Missing context**: If there are constraints the agent can't discover from the codebase alone (design decisions, external dependencies, compatibility requirements), state them explicitly.
- **Assuming the agent knows your preferences**: If you care about a specific approach or tradeoff, say so. The agent optimizes for the information it has.
