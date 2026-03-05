---
title: Run effective review loops
sidebar:
  order: 3
---

Review PRs from kipp•punkt the same way you'd review any other PR. The agent reacts to your feedback, pushes fixes, and explains its choices. You decide when the code is ready to merge.

## Use file-level comments

The agent only consumes comments left on specific files or code lines. General PR-level comments (the top-level comment box) are ignored.

If you want to address multiple concerns, leave them as separate file-thread comments rather than bundling everything into one message. This gives the agent a clearer signal for each issue.

## Be direct about what you want

The agent interprets your comment to decide whether to change code or just reply:

- **Instructions** trigger code changes: *"Rename this to `userCount`"*, *"Extract this into a helper"*, *"Drop the last commit."*
- **Questions** trigger explanations: *"Why this approach?"*, *"What happens if the input is empty?"*

Vague comments like *"This doesn't look right"* force a guessing round-trip. Say what's wrong and what you want instead: *"This silently swallows errors. Propagate the exception to the caller."*

## Batch your feedback

Each review pass triggers a new agent cycle. If you leave three comments across three separate passes, you get three cycles, each one burning tokens and time.

Instead, review the full diff once, leave all your comments, and submit them together as a single GitHub review. The agent processes all threads in one pass and pushes a single set of fixes.

## Know when to push back vs. start over

If the implementation is close but has specific issues, review comments are the right tool. The agent iterates well on concrete, scoped feedback.

If the implementation fundamentally misses the intent (wrong approach, wrong scope, wrong trade-offs), review comments won't fix it. Go back to the GitHub issue, continue refinement with the agent there, and have it update the task. Then close the PR. kipp•punkt starts a fresh implementation from the revised requirement.

## Let automated checks do the heavy lifting

Tests, linting, and preview deployments catch problems before you even open the diff. E2E tests are especially valuable here: they give you the most confidence that the feature actually works as intended.

Set up CI to run these checks on every PR. You can also instruct the agent (via `pretext` or `AGENTS.md`) to run all checks locally before committing, so broken code rarely makes it to the PR in the first place.

If your setup supports deploy previews (e.g. Vercel, Netlify, Cloudflare Pages), use them. Clicking through the result is often faster and more reliable than reading the diff.

## Merge conflicts

By default, the agent auto-resolves merge conflicts only when actionable comments exist on the PR (`mergeConflictResolution: "withThreads"`). You can change this in your [config](/reference/configuration/):

- `"never"`: no automatic conflict resolution.
- `"withThreads"`: resolve only when actionable threads exist (default).
- `"always"`: resolve even without pending threads.

## Merge when satisfied

You are always the final gate. The agent never merges on its own.

When you're satisfied, merge the PR. Squash and merge is recommended to keep history clean. Agent commits include `Closes: #<issue-id>`, so the linked issue closes automatically.
