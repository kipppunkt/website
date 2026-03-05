---
title: Requirements file ingress
sidebar:
  order: 3
---

File-based ingress is the [Ralph Wiggum loop](https://georg.dev/blog/06-the-ralph-wiggum-loop/) of kipp•punkt: define requirements in a JSON file, feed them into the orchestrator, and let the agent work through them.

This is a **secondary workflow**. For most projects, [creating GitHub Issues and letting the kipp•punkt agent pick them up](/get-started/ship-your-first-idea/) is the recommended path. It gives you a better refinement loop, full traceability, and easier collaboration. File ingress is useful when you already have a batch of well-defined requirements or prefer to manage specs outside of GitHub Issues.

## Requirements file format

The requirements file is a JSON array of requirement objects. The only required field is `id` (a string). Everything else is up to you: add whatever context helps the agent produce better results.

Common fields include `title`, `description`, `acceptance_criteria`, and `additional_context`. Any structure works.

### Example

```json
[
  {
    "id": "F-001",
    "title": "User search",
    "description": "Provide a search field to find other users on the platform.",
    "acceptance_criteria": [
      "Search field is visible on the page",
      "Text input displays a list of user suggestions",
      "The current user is never suggested"
    ],
    "additional_context": [
      "docs/user-search.md",
      "https://my-awesome-ux.designs/user-search.png"
    ]
  },
  {
    "id": "F-002",
    "title": "Dark mode",
    "description": "Add a dark mode toggle to the application settings."
  }
]
```

## Dependencies

You can declare dependencies between requirements using the `dependsOn` field (an array of requirement IDs). The alias `depends_on` is also accepted. A requirement will not start until all its dependencies are resolved.

```json
[
  {
    "id": "F-001",
    "title": "User search"
  },
  {
    "id": "F-002",
    "title": "Dark mode",
    "dependsOn": ["F-001"]
  }
]
```

In a single-agent setup (`maxConcurrency: 1`), ordering requirements correctly in the array is usually sufficient. Dependencies become important when running multiple agents concurrently.

## Loading requirements

Use the [`ingress`](/reference/cli-commands/#ingress) command to load a requirements file into a running orchestrator:

```bash
kipppunkt-agent ingress --requirements requirements.json
```

If the orchestrator runs on a non-default URL, pass `--url`:

```bash
kipppunkt-agent ingress --requirements requirements.json --url http://localhost:3000
```

The orchestrator must already be running via [`start`](/reference/cli-commands/#start) before you run `ingress`.
