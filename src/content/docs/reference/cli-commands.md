---
title: CLI commands
sidebar:
  order: 1
---

kipp•punkt provides two CLI commands: `start` to launch the orchestrator, and `ingress` to load tasks into a running orchestrator.

## `start`

Starts the main orchestrator. On launch, it begins polling for work and assigning tasks to agents.

```bash
kipppunkt-agent start --command "<template>" [options]
```

Stop with <kbd>Ctrl+C</kbd>. The orchestrator persists state and resumes on next start.

### Options

#### `--command` (required)

Agent command template. See [AI harness commands](#ai-harness-commands).

#### `--config-path`

**Default:** `.kipppunkt/config.json`

Path to the [configuration](/reference/configuration/) file.

#### `--log-level`

**Default:** `info`

Log verbosity: `error`, `warn`, `info`, or `debug`.

#### `--retry-failed`

**Default:** `false`

Reset all failed tasks to idle on startup.

#### `--orchestrator-url`

**Default:** `http://localhost:2309`

URL of the orchestrator API endpoint.

#### `--shutdown-on-task-failed`

**Default:** `false`

Gracefully shut down when a task enters `failed` state.

### AI harness commands

The `--command` flag accepts a template string with a `{prompt}` placeholder that the orchestrator replaces at runtime.

| Harness | Command template |
|---|---|
| Codex | `codex exec {prompt} --dangerously-bypass-approvals-and-sandbox` |
| Claude Code | `claude -p {prompt} --dangerously-skip-permissions` |
| OpenCode | `opencode run {prompt}` |
| Copilot CLI | `copilot -p {prompt}` |

:::note
When using Claude Code, you must additionally set the `IS_SANDBOX=1` environment variable for the process:

```bash
IS_SANDBOX=1 kipppunkt-agent start \
  --command "claude -p {prompt} --dangerously-skip-permissions"
```
:::

:::caution
The commands in this section run the agent **unsandboxed**. For a more permanent and secure setup, see [Using Docker Sandboxes](/reference/using-docker-sandboxes/) and [Sandbox with Docker on Linux](/reference/sandbox-with-docker-linux/).
:::

## `ingress`

Loads tasks into a running orchestrator from a requirements JSON file. The orchestrator must already be running.

```bash
kipppunkt-agent ingress --requirements <requirements.json> [options]
```

### Options

#### `--requirements` (required)

Path to the requirements JSON file.

#### `--url`

**Default:** `http://localhost:2309`

URL of the orchestrator API endpoint.

See [Requirements file ingress](/reference/requirements-file-ingress/) for details on the file format.
