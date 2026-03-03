---
title: Shape ideas effectively
sidebar:
  order: 3
---

The quality of your GitHub issue directly affects how well kipp•punkt refines and implements your idea. Better input leads to fewer refinement rounds and higher-quality pull requests.

That said, the refine agent exists specifically to help you get there. Even a rough idea works — the agent asks clarifying questions and guides you toward a well-formulated requirement through conversation. The tips below help you get better results faster, not gatekeep what you can submit.

## Write declarative issues

Describe **what** you want, not **how** to build it. Focus on the desired outcome, constraints, and acceptance criteria. Let the agent decide the implementation approach.

**Good:**

> Add a search field to the users page. Typing filters the displayed list by username. The current user should never appear in results.

**Avoid:**

> Create a React component called UserSearch with a useState hook for the query, add a useEffect that calls the /api/users endpoint with a debounced input, then filter out the current user by comparing IDs.

Declarative issues give the agent room to make implementation decisions based on your codebase — which often produces better results than prescribing steps.

## One feature per issue

Keep each issue focused on a single feature or change. When an issue covers too much ground, refinement conversations become unfocused and implementation PRs become hard to review.

If your idea is large, the refine agent may propose splitting it into sub-issues. You can also split proactively before submitting.

## Provide relevant context

Include anything that helps the agent understand the problem space:

- **Constraints** — performance requirements, compatibility needs, security considerations.
- **Related files or docs** — point to relevant code paths, design documents, or API specs.
- **Links** — reference designs, related issues, or external resources.
- **What not to do** — known approaches that won't work, or behavior to explicitly avoid.

You don't need to be exhaustive. The refine agent can inspect your codebase and ask follow-up questions. But starting with good context reduces back-and-forth.

## How issue quality affects the loop

The refine agent turns your issue into a structured requirement — the contract the build agent implements against. Every gap in the issue becomes either a refinement question (adding rounds) or an assumption (adding review churn).

Issues that are clear and scoped well tend to:

- Reach approval in fewer refinement rounds.
- Produce PRs that need less revision.
- Result in implementations that match your intent on the first pass.

## Common pitfalls

**Vague issues with no constraints.** "Make the app faster" gives the agent nothing concrete to refine against. Add specifics: which page, what metric, what's acceptable.

**Implementation instructions instead of goals.** Step-by-step coding instructions bypass the agent's ability to reason about your codebase. Describe the outcome and let the agent find the path.

**Multiple unrelated changes in one issue.** Bundling "add dark mode, fix the login bug, and update the footer" into a single issue produces unfocused requirements and messy PRs.

**Missing context that only you know.** If there's a non-obvious constraint — a legacy API quirk, a design decision from a previous PR, a platform limitation — mention it. The agent can read your code but not your mind.

## The refine agent has your back

You don't need to write a perfect issue every time. The refine agent is designed to:

- Ask clarifying questions when scope is unclear.
- Surface edge cases you may not have considered.
- Propose a structured requirement for your approval before anything gets built.

Think of the issue as the start of a conversation, not a finished spec. The better your starting point, the faster you reach a good requirement — but the agent meets you where you are.
