# kipppunkt — Product Vision

## The Shift

Software engineering is undergoing a paradigm shift. AI agents have already moved coding out of the IDE — engineers now spend most of their time prompting agents in TUIs. But that's just an intermediary step.

If agents are good enough to write code by themselves, the human part of engineering shifts elsewhere: **refining ideas into specs** and **reviewing outcomes**. A new engineering role emerges — someone who is product manager, architect, and engineer at once, steering an army of AI agents instead of writing code by hand.

Teams of tens of engineers become a thing of the past. A single high-performing engineer with the right toolchain can ship what used to require a team.

## What kipppunkt Is

kipppunkt is a toolchain that covers the full AI-assisted engineering loop: from fuzzy idea to shipped code. Three products, one flow.

### kipppunkt/refine

**Upstream — turn ideas into requirements.**

An AI-driven sparring partner for idea refinement. Tag it on a GitHub Issue and an agent discusses the problem with you, asks clarifying questions, and helps shape a vague idea into a well-defined requirement. Once you approve, the requirement is handed off for implementation.

Future: voice-based refinement sessions. Join a call on Teams, Zoom, or whatever you already use, and talk through your idea with the agent directly from a GitHub Issue. No new app — existing infrastructure, new capability.

### kipppunkt/agent

**Core — autonomous implementation.**

Takes requirements, implements them, creates PRs, and incorporates feedback from code review. Runs 24/7. Today this is the most mature product in the toolchain.

### kipppunkt/review (exploratory)

**Downstream — close the feedback loop.**

The least defined piece. The conviction: PRs as a handoff mechanism will go away. What replaces them is unclear.

Possibilities range from a review assistant that helps humans spot issues in PRs, to a long-term memory system that learns from human feedback over time and incorporates it *before* the PR is even created. This area stays exploratory until the real need crystallizes.

## The Flow

```
idea → refine → requirement → build → outcome → (review/learn) → merge
```

The human operates at the edges: shaping intent and approving results. Everything in between is automated.

## Philosophy

**All the right tools already exist.** We know how to write requirements, display diffs, review code, and hold refinement meetings. AI doesn't change any of that. Nothing needs to be reinvented.

kipppunkt integrates with the tools you already use — GitHub, your terminal, your video call platform — as smoothly as possible. No new UIs unless truly necessary. Features first, chrome later.

Ease of installation/setup and discoverability are imperative.

## Audience

High-performing engineers, founders, and indie devs. People who can think across product, architecture, and implementation. kipppunkt amplifies that kind of person.

Small teams (2-5) are a natural extension but not the initial focus.

## Terminology

- **Requirement** — the atomic unit of work. A well-defined spec that an agent can implement. Not "PRD item," not "ticket." Just a requirement.

## Monetization

Closed source, freemium model. Three tiers:

- **Free** — sufficient for hobbyists working on weeknight projects. Single agent, rate-limited.
- **Premium** — unlocks all features (concurrency, faster polling, no rate limits). For indie devs, founders, and teams.
- **Open Source** — free for maintainers of large open source projects.
