---
title: Using Docker Sandboxes
sidebar:
  order: 5
---

[Docker Desktop Sandboxes](https://docs.docker.com/ai/sandboxes/) (4.58+) run coding agents inside lightweight microVMs with full filesystem and network isolation. Each sandbox gets a private Docker daemon — the agent cannot access host files outside the mounted workspace or the host Docker daemon.

In a kipp•punkt setup, the **orchestrator runs on the host** and spawns agent processes. Docker Sandboxes isolate those agent processes so a compromised agent cannot access the host beyond its mounted workspace.

**Supported platforms:** Windows and macOS. Linux support is experimental — see the [Linux sandbox page](/reference/sandbox-with-docker-linux/) for a container-based alternative.

## Prerequisites

- Docker Desktop **4.58 or later** with Sandboxes enabled
- Windows or macOS
- A working kipp•punkt setup on the host

## How it fits together

The kipp•punkt orchestrator runs on the host and uses `--command` to spawn agent processes. To sandbox those agents, wrap your harness command so it runs inside a Docker Sandbox. The orchestrator itself stays on the host.

## Create a sandbox

Docker Sandboxes [natively support known agents](https://docs.docker.com/ai/sandboxes/agents/) (Claude Code, Codex, Copilot CLI). To run kipp•punkt's agent command inside a sandbox, use the [Shell template](https://docs.docker.com/ai/sandboxes/agents/shell/):

```bash
docker sandbox create shell ~/my-project --name kp-sandbox
```

## Configure the network allowlist

Sandboxes deny all outbound traffic by default. Allowlist the hosts your agent needs:

```bash
docker sandbox network proxy kp-sandbox \
  --policy deny \
  --allow-host "api.github.com" \
  --allow-host "*.github.com" \
  --allow-host "api.anthropic.com" \
  --allow-host "host.docker.internal:2309"
```

The last entry allows the agent to reach the orchestrator on the host via `host.docker.internal`.

Supported allowlist formats: exact host, `host:port`, `*.example.com` wildcards, and CIDR blocks.

To audit outbound requests:

```bash
docker sandbox network log kp-sandbox
```

Network config persists per sandbox at `~/.docker/sandboxes/vm/<name>/proxy-config.json`. Defaults live at `~/.sandboxd/proxy-config.json`.

## Inject API keys

The sandbox proxy can [inject API keys at the network layer](https://docs.docker.com/ai/sandboxes/get-started/#inject-api-keys) so they are never exposed inside the sandbox environment. This prevents exfiltration even if the agent is compromised.

For keys that cannot be injected via proxy, pass them as environment variables when running commands inside the sandbox:

```bash
docker sandbox exec kp-sandbox -- bash -c 'export GH_TOKEN="ghp_..." && export ANTHROPIC_API_KEY="sk-ant-..." && your-agent-command'
```

## Start kipp•punkt

Run the orchestrator on the host. Use `docker sandbox exec` in your `--command` template so agent processes run inside the sandbox:

```bash
kipppunkt-build start \
  --command 'docker sandbox exec kp-sandbox -- claude -p {prompt} --dangerously-skip-permissions'
```

The orchestrator stays on the host and is reachable from inside the sandbox at `http://host.docker.internal:2309`.

Adjust the agent command to match your harness. See [CLI commands](/reference/cli-commands/) for all options.
