---
title: Run effective review loops
sidebar:
  order: 3
---

Review PRs from kipp•punkt the same way you'd review any other PR. The agent reacts to your feedback, pushes fixes, and explains its choices — but you decide when the code is ready to merge.

## What the kipp•punkt agent does

When a task reaches implementation, the agent opens a pull request. From there, it:

- Monitors file-thread comments where it is not the last commenter.
- Decides whether to reply with an explanation or push code changes in response.

The agent does not act on general PR-level comments — only comments left on specific files or code lines.

## How to provide feedback

Leave comments on files or code lines in the PR. This is the only input the agent consumes. General PR comments (the top-level comment box) are ignored.

If you want to address multiple concerns, leave them as separate file-thread comments rather than bundling everything into one message. This gives the agent a clearer signal for each issue.

## How to steer agent behavior

The agent interprets your comment tone to decide what to do:

- **Action-oriented comments** trigger code changes. Examples: `drop the last commit`, `rename this variable to userCount`, `extract this into a helper function`.
- **Discussion-oriented comments** trigger replies without code changes. Examples: `Question: why did you choose this approach?`, `Let's discuss!`, `Can you explain this logic?`.

Be direct. The clearer your intent, the fewer round-trips you need.

## What influences quality

Two factors drive iteration quality:

1. **Harness capability.** Different AI harnesses (Claude Code, Codex, etc.) vary in how well they handle nuanced feedback. Some push back on ambiguous instructions; others attempt best-effort fixes.
2. **Your agent instructions.** The context in `AGENTS.md` and any `pretext` you configure shape how the agent interprets your codebase and feedback. Better instructions mean better first-pass results and fewer review cycles.

## Merge-conflict behavior

By default, the agent auto-resolves merge conflicts only when actionable comments exist on the PR (`mergeConflictResolution: "withThreads"`). You can change this behavior in your [config file](/reference/configuration/):

- `"never"` — no automatic merge-conflict resolution.
- `"withThreads"` — resolve conflicts only when actionable threads exist (default).
- `"always"` — resolve conflicts even without pending threads.

## What you are expected to do

1. **Review outcomes.** Read the diff, check that acceptance criteria are met, and verify the implementation matches your intent.
2. **Decide when quality is acceptable.** You set the bar — the agent iterates until you're satisfied.
3. **Merge yourself.** Squash and merge is recommended to keep your history clean.

The agent never merges on its own. You are always the final gate.

## Merge boundary

PRs opened by the agent include `Closes: #<issue-id>` in the description. When you merge, the linked issue closes automatically. No extra cleanup needed.
