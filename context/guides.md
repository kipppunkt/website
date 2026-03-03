# Guides

## Daily workflow

This page defines the repeatable day-to-day loop for serious usage.

### Core flow

1. **Start a loop**: Create a GitHub issue and assign it to the bot user (primary trigger); mentioning the agent in issue body/comments is also supported and makes it discoverable.
2. **Refine until approved**: The refine agent responds whenever your comment is the latest and drives the issue toward implementation-ready scope; if scope is too large, it may propose splitting into sub-issues; when ready, it proposes a structured requirement table, which you review and explicitly approve for enqueue in a comment.
3. **Implement, review, merge**: After approval, the task is queued and implemented; a PR is opened; you review and leave feedback; the agent responds and/or pushes fixes; you merge when satisfied, and the issue closes automatically.
4. **Main failure mode**: Weak context engineering; keep `AGENTS.md` and focused context docs current so refine/build decisions stay aligned.

### Sidenote: What this guide should add on top of "Ship your first idea"

1. **Issue triage rules**: Defines which issues to start now, defer, or split before refine.
2. **WIP limits**: Defines how many active issues/PRs to run in parallel.
3. **Cadence**: Defines when to check issue threads, review PRs, and merge.
4. **Approval policy**: Defines a concrete checklist before approving enqueue.
5. **Feedback policy**: Defines how to batch PR feedback to reduce iteration cycles.
6. **Failure protocol**: Defines what to do when refine stalls, implementation fails, or PR loops thrash.
7. **Context maintenance**: Defines when/how to update `AGENTS.md` and context docs from recurring mistakes.

## Shape ideas effectively

1. **What the issue agent can do**: It discovers assigned issues (mentions are also supported), drives refinement from rough idea to implementation-ready scope, adapts to ambiguity, can inspect codebase context before enqueue, may propose splitting into sub-issues, and produces the structured requirement handoff.
2. **What the issue agent cannot do**: It does not enqueue without explicit approval, does not use reactions as triggers, and does not act on issue title/body edits alone.
3. **What you are expected to do**: Answer refinement questions, review and correct the structured requirement table, and add explicit context where needed (`notes`, file paths, links, related issues).
4. **Approval boundaries**: Enqueue and sub-issue creation require explicit user approval in comments.
5. **Why this matters**: The structured requirement is the handoff contract for implementation; if this stage is sloppy, review churn increases later.

## Run effective review loops

Review PRs as you would review any other PR.

1. **What the implementation/PR agent does**: It opens the PR, reacts to file-thread comments where it is not the last commenter, and decides whether to reply only or push code changes.
2. **How to provide feedback**: Leave comments on files or code lines; general PR comments are not consumed by the bot.
3. **How to steer agent behavior**: Use action-oriented comments for code changes (for example, `drop the last commit`) and discussion-oriented comments when you want explanation only (for example, `Question: ...` or `Let's discuss!`).
4. **What influences quality**: Iteration quality depends on harness capability and your agent instructions; some agents may push back on ambiguous feedback.
5. **Merge-conflict behavior**: By default, merge conflicts are auto-resolved only when actionable comments exist; configure via `mergeConflictResolution`.
6. **What you are expected to do**: Review outcomes, decide when quality is acceptable, and merge yourself (recommended: `Squash and merge`).
7. **Merge boundary**: The agent never merges by itself; PRs include `Closes: #<issue-id>`, so merge closes the linked issue.

## Handle blocked or failed tasks

1. **What counts as a failed attempt**: A failed attempt includes cases like agent exits with an error, PR creation fails, or an opened PR gets closed without merge.
2. **When a task becomes `failed`**: Each failed attempt increments the counter. When failed attempts exceed `maxFailedAttempts` (config), the task is moved to `failed` and is no longer retried automatically.
3. **How you detect it**: kipppunkt posts a comment on the related GitHub issue when the task fails.
4. **First recovery action**: Check logs first to identify the likely root cause.
5. **Retry behavior**: If you want to retry, tell the agent in the GitHub issue to retry; this resets task failure state and puts it back into execution flow.
6. **Operator guidance**: Retry is always available; choosing immediate retry vs additional clarification is an operator decision.

## Set up your repository for kipp•punkt

1. **Initial repo state before starting**: Start from a clean checkout on latest `main` with no local changes.
2. **What happens after start**: Once kipppunkt is running, you can keep using your repo normally: switch branches, edit files, commit, and continue your own work.
3. **Context expectations**: Nothing is strictly required, but `AGENTS.md` is strongly recommended. Better context improves refine/build output quality.
4. **Config fields that matter most in operations**:
   - `maxConcurrency` + `pollIntervalMinutes`: your main throughput levers; tune carefully to avoid GitHub rate-limit pressure.
   - `postWorkspaceCreation`: useful for workspace bootstrap steps and fixing path/link issues right after workspace creation.
5. **Start/stop operating model**: Start kipppunkt and leave it running. You can stop it at any time; state is persisted and resumed on next start.
6. **Main setup/ops guidance**: No critical failure mode called out here; primary operational focus is sane throughput tuning and good context hygiene.

## Set up for team repositories

kipppunkt is not meant for big engineering org workflows.
The product vision is a small number of high-performing people who cover the full value stream end-to-end.
So in team setups, optimize for clarity and control, not broad participation.

1. **Assume a small owner group**: The best setup is a few core owners (or one engineer plus one stakeholder). Define clearly who is driving issue refinement, who gives approval for enqueue, and who merges PRs.
2. **Control trigger permissions with `allowlist`**: In team repos, not everyone should be able to trigger agent actions. Configure `allowlist` so only intended users can trigger refine actions and approvals. This prevents random drive-by comments from changing execution flow.
3. **Use `requireMention` to separate discussion from action**: In shared issues and PRs, people often discuss ideas without wanting agent action on every message. With `requireMention=true`, the bot reacts only when explicitly mentioned. This keeps normal human discussion clean and makes bot activation intentional.
4. **Do not run multiple kipppunkt runtimes on one repo**: Running multiple agents/runtimes against the same repo causes collisions, duplicate reactions, and inconsistent behavior. Treat "one repo -> one active kipppunkt runtime" as a hard rule.
5. **Increase throughput by tuning one runtime**: If you need more speed, scale the single runtime instead of adding more instances. Tune `maxConcurrency` up and `pollIntervalMinutes` down (while staying within GitHub allowance/rate limits). This gives more parallel work without coordination chaos.
6. **Biggest team failure mode to avoid**: The worst setup is broad trigger permissions plus multiple runtimes. That combination creates noisy loops, conflicting actions, and poor predictability.

## Safety for production use

1. **Run in a containerized environment**: Use a containerized runtime for kipppunkt in production to reduce host-level blast radius (see container sandboxing page).
2. **Restrict who can trigger actions**: Set `allowlist` in config so only approved users can trigger agent actions.
3. **Use minimal GitHub token scope**: Use a bot account token with only `repo` scope to limit prompt-injection impact.
4. **Bound agent runtime**: Use limits like `--max-turns` so the harness exits instead of running in endless loops.
5. **Main safety failure mode**: Running with broad permissions, broad trigger access, and no runtime limits.
