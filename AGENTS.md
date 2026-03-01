# Agent Instructions

This repository contains the documentation website for kipppunkt.

For context, read:
- @context/kipppunkt-vision.md
- @context/kipppunkt-build-readme.md
- @context/docs-sitemap.md

This repo uses Astro with the starlight theme. You can use the `gh` CLI to fetch their docs:
- Astro docs: https://github.com/withastro/docs/tree/main/src/content/docs/en
- starlight docs: https://github.com/withastro/starlight/tree/main/docs/src/content/docs

This repo follows the Diataxis framework for documentation. You can use the `gh` CLI to fetch their docs: https://github.com/evildmp/diataxis-documentation-framework

## General

- When talking with the user, be extremely concise. Sacrifice grammar for the sake of concision.
- When writing code, prefer declarative solutions over imperative ones.
- When implementing solutions, understand the bigger picture they are part of.

## Production Design Guardrails (Hard Rules)

- Do not change production interfaces, control flow, or architecture to make tests easier.
- Any production-code change must be justified by runtime/product behavior, not test convenience.
- CRITICAL: If a change exists only to support tests (extra params, indirection, DI seams, toggles, wrappers), reject it.
- Keep production APIs minimal. No “future flexibility” abstractions without a concrete runtime requirement.
- Tests must adapt to production design, never the reverse.

## Commit guidelines

- When writing commit messages, follow these guidelines:
    - Brief commit message title that explains WHAT BEHAVIOR was changed (present tense).
    - Concise commit message body containing bullet points that explain in more detail WHAT was changed (past tense).
    - Do not include feature-codes, implementation details, or success messages.
    - Examples:
    ```
    # Good
    Implement error page for failing network requests

    - Added error page component displaying error message
    - Added error boundary around main page component

    # Bad
    F-034: Implement error page for failing network requests to improve maintainability and security # BAD: includes feature-code in title & title is too long with irrelevant info

    Added error page component displaying error message. Added error boundary. Wrote 25 unit tests. # BAD: doesn't use bullet points & includes irrelevant information (e.g. unit tests)
    All unit tests passing. No lint errors. # BAD: includes irrelevant success messages
    ```

## Code Quality

<!-- THIS SECTION IS EXTREMELY IMPORTANT!! -->
- Never loosen types (e.g. making parameters optional) just to make testing easier. Types in production code **MUST** be 100% semantically correct.
- **CRITICAL** You are **strictly forbidden** of making design choices on production code with the purpose of making it easier to write tests or with the purpose of preventing existing tests to break! THIS IS EXTREMELY IMPORTANT!!
    - You will write the production code without thinking about testing at all. All your design choices will only be concerned about what it is optimal for production code. Only later will you think about testing **and you will not change the production code for the sake of making testing easier**. Not adhering to this guideline will have severe negative consequences!
    - If introducing a change to production code would break existing tests **you will introduce the change while only being concerned about the production code**. If this causes existing tests to break, you will fix these tests later. Under no circumstances will you change production code just to make tests pass.
- SEPARATION OF CONCERNS means that the production code **MUST NEVER** be concerned about testing. Production code cares only about production code. Every design choice for production code **MUST ONLY** be concerned about what is optimal for production code.

## Testing Strategy

### Philosophy

- **80/20 approach**: Minimal tests for maximum confidence
- **Verify PRD requirements:** Every PRD requirement is tested
- **Integration over unit**: Test CLI as users would use it
- **Focus on critical paths only**: Happy path + key error scenarios. No obscure edge cases, no excessive mocking.

### Running Tests

```bash
npm test              # Build + run tests once
```

### Review tests

Once you're done writing tests, do a mandatory review step. Many tests you wrote will be redundant or useless. Delete them again.
