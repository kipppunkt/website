---
title: Requirements file ingress
sidebar:
  order: 3
---

This is the [Ralph Wiggum loop](https://ghuntley.com/ralph/) workflow: load work from a local file into the orchestrator. It is supported, but secondary.

Use GitHub issue ingress as your primary path whenever possible. You get a better refine loop, clearer traceability from discussion to implementation, and easier team collaboration.

## Run ingress against a running orchestrator

Start the orchestrator first:

```bash
kipppunkt-build start \
  --command "codex exec {prompt} --dangerously-bypass-approvals-and-sandbox"
```

Then load your requirements file:

```bash
kipppunkt-build ingress \
  --requirements ./requirements.json \
  --url http://localhost:2309
```

## Requirements file format

The requirements file is a JSON array of requirement objects.

Only `id` is required (`string`). Every other field is user-defined context for the agent. Use fields that are clear to humans, for example `title`, `description`, `acceptance_criteria`, and `additional_context`.

You can phrase entries as requirements or short PRD items, as long as each item is explicit and actionable.

### Example

```json
[
  {
    "id": "F-001",
    "title": "Add user search",
    "description": "Let users search for other users from the header.",
    "acceptance_criteria": [
      "Search field is visible in the header",
      "Typing shows matching user suggestions",
      "The current user is never suggested"
    ],
    "additional_context": [
      "docs/search-behavior.md",
      "https://example.com/mockups/search-header.png"
    ]
  },
  {
    "id": "F-002",
    "title": "Add keyboard shortcut for search",
    "description": "Pressing Cmd+K (or Ctrl+K) focuses the search field.",
    "acceptance_criteria": [
      "Cmd+K focuses search on macOS",
      "Ctrl+K focuses search on Windows/Linux"
    ],
    "dependsOn": ["F-001"]
  },
  {
    "id": "F-003",
    "title": "Track search events",
    "description": "Emit analytics events for search open and result click.",
    "depends_on": ["F-001"]
  }
]
```

## Dependencies

Use `dependsOn` to declare prerequisite requirement IDs.

The alias `depends_on` is also accepted and behaves the same way. A requirement is only eligible to run after all listed dependencies are resolved.
