---
title: Using Docker Sandboxes
sidebar:
  order: 5
---

Docker Desktop 4.58+ includes an experimental Sandboxes feature that runs agents inside lightweight microVMs with full filesystem and network isolation. Each sandbox gets a private Docker daemon — the agent cannot access host files outside the mounted workspace or the host Docker daemon.

**Supported platforms:** Windows and macOS. Linux support is experimental — see the [Linux sandbox page](/reference/sandbox-with-docker-linux/) for a container-based alternative.

## Prerequisites

- Docker Desktop **4.58 or later** with Sandboxes enabled
- Windows or macOS
- A working kipppunkt setup (orchestrator running on the host)

## Launch a sandbox

Docker Sandboxes natively support known agents (Claude Code, Codex, Copilot CLI). To run kipppunkt inside a sandbox, use Shell mode:

```bash
docker sandbox run shell ~/my-project
```

This opens an interactive shell inside the sandbox with `~/my-project` mounted at the same absolute path.

## Configure the network allowlist

Sandboxes deny all outbound traffic by default. Allowlist the hosts your agent needs:

```bash
# GitHub API access (required)
docker sandbox network proxy my-sandbox \
  --policy deny \
  --allow-host "api.github.com" \
  --allow-host "*.github.com"

# LLM API access (example: Anthropic)
docker sandbox network proxy my-sandbox \
  --allow-host "api.anthropic.com"

# Orchestrator on the host
docker sandbox network proxy my-sandbox \
  --allow-host "host.docker.internal:2309"
```

Supported allowlist formats: exact host, `host:port`, `*.example.com` wildcards, and CIDR blocks.

To audit outbound requests:

```bash
docker sandbox network log my-sandbox
```

Network config persists per sandbox at `~/.docker/sandboxes/vm/<name>/proxy-config.json`. Defaults live at `~/.sandboxd/proxy-config.json`.

## Inject API keys

The sandbox proxy can inject API keys at the network layer so they are never exposed inside the sandbox environment. This prevents exfiltration even if the agent is compromised.

For keys that cannot be injected via proxy, pass them as environment variables inside the sandbox shell:

```bash
export GH_TOKEN="ghp_..."
export ANTHROPIC_API_KEY="sk-ant-..."
export KIPPPUNKT_LICENSE="..."
```

## Reach the orchestrator

The kipppunkt orchestrator runs on the host. Inside the sandbox, reach it via:

```
http://host.docker.internal:2309
```

Pass this as the `--orchestrator-url` flag or set it in your config file.

## Start kipppunkt inside the sandbox

Once inside the sandbox shell with network and env vars configured:

```bash
npx @kipppunkt/build start \
  --command "claude -p {prompt} --dangerously-skip-permissions" \
  --orchestrator-url http://host.docker.internal:2309
```

Adjust the `--command` template to match your harness. See [CLI commands](/reference/cli-commands/) for all options.
