---
title: Shape ideas effectively
sidebar:
  order: 2
---

You can open an issue with a rough idea or a concrete requirement. The agent adapts to both. This guide covers how to get the best results from refinement regardless of where you start.

## Start with the problem, not the solution

Describe what's wrong or missing. Don't write implementation steps.

A good starting point: *"Users can't find other users on the platform. We need a way to search for them."* The agent figures out the how (input fields, suggestion lists, filtering logic) during refinement.

A bad starting point: *"Add a text input that calls `/api/users?q=` on keypress and renders results in a dropdown."* Even though this will work as well, it skips refinement entirely. The agent has nothing to refine, so it implements exactly what you wrote and misses any edge cases that weren't discussed.

## Add context the agent can't infer

The agent can read your codebase, but it can't read your mind. Anything that isn't in the code (constraints, design intent, prior decisions) needs to come from you.

Useful context:
- File paths or modules the change should touch (or avoid).
- Links to designs, mockups, or related issues.
- Constraints: *"Must work without JavaScript"*, *"Don't add new dependencies."*
- Prior context: *"We tried X before and reverted it because Y."*

Not useful: restating what's already in `AGENTS.md`, pasting entire files, or linking to generic documentation the agent can find on its own.

## Keep scope small

A good issue fits in a single PR. If you find yourself listing multiple independent outcomes, split before refinement. Don't wait for the agent to suggest it.

Signs your issue is too broad:
- It has "and" in the title connecting unrelated things.
- Acceptance criteria span different areas of the codebase with no shared context.
- You can't imagine reviewing the resulting PR in one sitting.

When in doubt, go smaller. Two focused issues always produce better results than one sprawling one.

## Steer refinement, don't just answer

Refinement is a conversation, not a questionnaire. The agent proposes; you can redirect, disagree, add constraints, or change direction mid-thread.

If the agent suggests an approach you don't like, say so. If it's asking questions that miss the point, reframe the problem. If it scopes too broadly, tell it what to cut. The agent adjusts.

The agent always replies when your comment is the latest in the thread. If you want to pause or end the conversation, just stop replying.

If you update the issue description after refinement has started, mention the change in a comment. The agent doesn't react to title or body edits on their own.

## Know when to approve

When the agent proposes a requirement table, check three things before approving:

1. **Scope fits one PR.** If it doesn't, ask the agent to split.
2. **Acceptance criteria are specific enough to review against.** Vague criteria like "works correctly" will produce vague implementations.
3. **Relevant context is referenced.** File paths, constraints, and design links should be in the requirement, not just in your head.

If anything looks off, say so in the thread. One more round of refinement is cheaper than one more round of review.
