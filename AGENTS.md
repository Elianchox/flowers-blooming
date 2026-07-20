## Stack

- **Astro 7** (SSG — no SSR adapter) + **TypeScript strict**
- **pnpm** (not npm) — use `pnpm add`, `pnpm remove`, etc.
- **Node >=22.12.0**

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server on `localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview production build |

### Background dev server

```
astro dev --background
astro dev stop        # stop a running background server
astro dev status      # check if running
astro dev logs        # view logs
```

## CodeGraph

This repo has a `.codegraph/` index. Use `codegraph explore` to understand code architecture instead of grep+Read loops.

## Agent tooling

- **Subagents** available: `coder`, `planificador`, `code-reviewer` (Spanish-language orchestrators)
- **Skills** available (under `.agents/skills/` and superpowers): accessibility, astro, frontend-design, nodejs-backend-patterns, nodejs-best-practices, seo, typescript-advanced-types, brainstorming, TDD, writing-plans, verification-before-completion
- **Engram** persistent memory enabled

## Code style

- No tests, linter, or formatter configured yet
- No comments in `.astro` frontmatter or component code
- Follow existing patterns in neighboring files

## Conventions

- `.opencode/`, `.agents/`, `.docs/` are gitignored — agent tooling lives outside source
- VSCode: install `astro-build.astro-vscode` extension
