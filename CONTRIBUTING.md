# Contributing

This portfolio is treated as a **production product**. Changes should be
measurable, verified, and reversible. Do not invent career facts.

Full process: `docs/phase-18-continuous-improvement/`.

## Quick start

```bash
npm ci
npm run dev
```

Node **22+** (see `.nvmrc`).

## Before every PR

```bash
npm run release:check
```

That runs lint, TypeScript, Prettier, Content Engine validation, internal
link checks, and a production build.

## What belongs where

| Change type                      | Where                                        |
| -------------------------------- | -------------------------------------------- |
| Facts (jobs, projects, metrics)  | `src/content/**` only                        |
| Presentation / page composition  | `src/app/**`, `src/components/**`            |
| Site-wide constants (URL, email) | `src/config/site.ts`                         |
| Process / ops docs               | `docs/**`                                    |
| User-visible release notes       | `CHANGELOG.md` **and** `public/CHANGELOG.md` |

## Content rules

1. **No invented metrics, employers, dates, or quotes.**
2. Unknown facts → typed `todos` / `TodoNote`, never filler prose.
3. Prefer Content Engine loaders over hardcoding in pages.
4. Run `npx tsx scripts/inventory-todos.ts` when closing content gaps.

## Versioning

See `docs/phase-18-continuous-improvement/05-versioning-strategy.md`.

- Patch `1.0.x` — fixes, docs, ops
- Minor `1.x.0` — new verified case study / section content
- Major `x.0.0` — breaking IA or intentional redesign (rare)

Bump `package.json` version, update both changelog copies, ensure the
footer shows the new version after build.

## Pull requests

1. One clear objective per PR.
2. Note **why** in the description (not only what).
3. Include changelog fragment for user-visible changes.
4. Do not redesign pages unless there is a measured problem.

## Architecture decisions

Non-trivial structural choices → `docs/adr/` using the template.
