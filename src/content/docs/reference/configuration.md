---
title: Configuration
sidebar:
  order: 2
---

kipp•punkt reads runtime configuration from an optional JSON file.

## Config file location

By default, the orchestrator looks for a config file at `.kipppunkt/config.json` relative to your repository root. To use a different path, pass `--config-path`:

```bash
kipppunkt-agent start --command "..." --config-path ./my-config.json
```

If no config file is found, the orchestrator uses sensible defaults for all fields.

## Config fields

### `baseBranch`

**Type:** `string` **Default:** `"main"`

Base branch used for orchestrator reset and merge-conflict instructions.

### `pollIntervalMinutes`

**Type:** `number` **Default:** `5`

Minutes between poll ticks. Must be positive.

### `maxConcurrency`

**Type:** `number` **Default:** `1`

Maximum number of tasks under active development simultaneously. Must be a positive integer.

### `maxFailedAttempts`

**Type:** `number` **Default:** `3`

Failed-attempt threshold before a task transitions to `failed`. Must be a positive integer.

### `stateDir`

**Type:** `string` **Default:** `"./.kipppunkt"`

Directory where the orchestrator persists `build-state.json` and `refine-state.json`.

### `logLevel`

**Type:** `"error"` | `"warn"` | `"info"` | `"debug"` **Default:** `"info"`

Log verbosity.

### `pretext`

**Type:** `string` **Default:** `""`

Project-wide instructions injected into every agent prompt.

### `postWorkspaceCreation`

**Type:** `string` **Default:** `""`

Shell command run in the workspace directory immediately after workspace creation and before the implementation agent runs.

### `allowlist`

**Type:** `string[]` **Default:** `[]`

GitHub usernames allowed to trigger agent reactions via PR comments. An empty list permits any user.

### `requireMention`

**Type:** `boolean` **Default:** `false`

When `true`, a thread is only actionable if the latest comment @mentions the bot. Useful to avoid reacting to every comment.

### `shutdownOnTaskFailed`

**Type:** `boolean` **Default:** `false`

When `true`, gracefully shut down when a task enters `failed` state.

### `mergeConflictResolution`

**Type:** `"never"` | `"withThreads"` | `"always"` **Default:** `"withThreads"`

Controls automatic merge-conflict resolution. `never`: no automatic resolution. `withThreads`: attempt resolution when actionable threads exist. `always`: invoke the agent for conflict resolution even without threads.

### `orchestratorUrl`

**Type:** `string` **Default:** `"http://localhost:2309"`

URL of the orchestrator API endpoint.

## Full example

```json
{
  "baseBranch": "main",
  "pollIntervalMinutes": 5,
  "maxConcurrency": 1,
  "maxFailedAttempts": 3,
  "stateDir": "./.kipppunkt",
  "logLevel": "info",
  "pretext": "Always use TypeScript",
  "postWorkspaceCreation": "rm -rf node_modules && pnpm install",
  "allowlist": ["alice", "bob"],
  "requireMention": false,
  "shutdownOnTaskFailed": false,
  "mergeConflictResolution": "withThreads",
  "orchestratorUrl": "http://localhost:2222"
}
```

:::tip
Most projects only need to set a few fields. Start with the defaults and override only what you need.
:::
