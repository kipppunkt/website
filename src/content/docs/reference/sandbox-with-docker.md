---
title: Sandbox with Docker on Linux
sidebar:
  order: 5
---

Rootless Docker lets you run kipppunkt inside a container with filesystem isolation — no root access required. This page covers setup for Linux.

:::caution[Network is not restricted]
Rootless Docker provides filesystem isolation only. The container retains **full network access**. Any process inside the container can reach the internet and your local network. Do not rely on rootless Docker to prevent data exfiltration or outbound traffic.
:::

## Prerequisites

- A Linux system with systemd
- Docker Engine (rootless setup — see below)
- A [bot GitHub account](/get-started/prerequisites/) with `GH_TOKEN` ready
- A kipppunkt license key (`KIPPPUNKT_LICENSE`) — optional, only needed for premium features

## Set up rootless Docker

### 1. Install dependencies

```bash
sudo apt install uidmap dbus-user-session
```

### 2. Configure subordinate UIDs and GIDs

```bash
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER
```

### 3. Install the rootless daemon

```bash
dockerd-rootless-setuptool.sh install
```

If the setup tool is not on your PATH, see the [Docker rootless documentation](https://docs.docker.com/engine/security/rootless/).

### 4. Set the Docker socket

Add this to your shell profile (e.g. `~/.bashrc`):

```bash
export DOCKER_HOST=unix:///run/user/$(id -u)/docker.sock
```

### 5. Enable persistence

```bash
systemctl --user enable docker
loginctl enable-linger $USER
```

This keeps the rootless daemon running after you log out.

## Build the container image

Create a `Dockerfile` in your project:

```dockerfile
FROM ubuntu:24.04

RUN apt-get update && apt-get install -y \
    curl git nodejs npm ripgrep jq \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | tee /etc/apt/sources.list.d/github-cli-stable.list > /dev/null \
    && apt-get update && apt-get install -y gh

# Install kipppunkt and the AI harness (e.g. Claude Code)
RUN npm install -g @kipppunkt/agent @anthropic-ai/claude-code

WORKDIR /workspace
```

Build it:

```bash
docker build -t kipppunkt-sandbox:latest .
```

Adapt the harness install line if you use a different agent (e.g. Codex, OpenCode).

## Log in to your AI harness

Create a named container and log in interactively. This persists credentials inside the container so kipppunkt can use them on subsequent runs.

```bash
docker create --name kipppunkt \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  -v "$(pwd)":/workspace:rw \
  -e GH_TOKEN="$GH_TOKEN" \
  -e KIPPPUNKT_LICENSE="$KIPPPUNKT_LICENSE" \
  kipppunkt-sandbox:latest \
  kipppunkt-agent start --command "claude -p {prompt} --dangerously-skip-permissions"
```

Run this from your project directory. Then start the container in interactive mode and follow your harness's login flow:

```bash
docker start -ai kipppunkt
```

Once login succeeds, stop the container with `Ctrl+C`. The credentials are now stored inside the named container.

## Launch kipppunkt

Start the container:

```bash
docker start kipppunkt
```

To follow logs:

```bash
docker logs -f kipppunkt
```

Stop with:

```bash
docker stop kipppunkt
```

### What the flags do

| Flag | Effect |
|---|---|
| `--cap-drop ALL` | Removes all Linux capabilities from the container. |
| `--security-opt no-new-privileges` | Prevents any process inside the container from gaining additional privileges. |
| `-v "$(pwd)":/workspace:rw` | Mounts your project directory as the only writable path. |

### Environment variables

| Variable | Purpose |
|---|---|
| `GH_TOKEN` | Authenticates the bot GitHub account for PR operations. |
| `KIPPPUNKT_LICENSE` | Activates your kipppunkt license inside the container. Optional — only needed for premium features. |

Both the orchestrator and the AI harness agent run inside the container. The host only provides the mounted project directory and forwarded environment variables.

## References

- [Docker rootless mode documentation](https://docs.docker.com/engine/security/rootless/)
- [Sandbox your GitHub Copilot CLI on Linux](https://georg.dev/blog/07-sandbox-your-github-copilot-cli-on-linux/) — the article that inspired this approach
