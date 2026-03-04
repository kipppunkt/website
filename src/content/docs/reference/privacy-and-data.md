---
title: Privacy and data
sidebar:
  order: 6
---

kipppunkt runs entirely on your machine. It does not transfer, collect, or store any of your data remotely. Your code, requirements, state files, and configuration never leave your local environment.

## License validation

The only outbound network request kipppunkt makes is a single license-validation call to the `validate/` endpoint at session start. This call checks whether your license key is valid and returns a pass/fail response — no project data is included in the request.

If you do not have a license (free tier), this request is skipped entirely. kipppunkt makes zero outbound calls in that case.

## AI harness data handling

kipppunkt invokes your configured AI harness (Claude Code, Codex, OpenCode, etc.) as a subprocess. The harness itself may send data to its own cloud APIs according to its own privacy policy. That data handling is outside kipppunkt's scope and control.

Since kipppunkt is AI provider agnostic, it natively supports self-hosted AIs.
