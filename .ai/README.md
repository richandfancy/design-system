# Design System
> Shared shadcn component registry powering all web apps

**Path:** `~/Apps/design-system`
**Status:** Active
**Stack:** React 19, TypeScript, Tailwind v4, shadcn CLI v4
**URLs:** https://github.com/richandfancy/design-system

## What This Is
A shadcn-compatible component registry (`@designsystem`) that extends shadcn/ui with custom components. Distributed via shadcn's native CLI — consumer apps install with `npx shadcn add @designsystem/X`. Components consume CSS design tokens so they adapt to each app's brand theme.

## Key Decisions
- shadcn registry (not npm package) — zero coupling, same workflow devs already know
- Token contract defines variable names, not values — brands own their identity
- Start with FloatingInput, grow organically as pain points emerge
- Repo must be public (raw.githubusercontent.com returns 404 for private repos)
- Branch is `master` — registry URLs use `master` not `main`
- Spec: `~/Apps/docs/superpowers/specs/2026-03-27-design-system.md`

## Session Log
| Date | Summary |
|------|---------|
| 2026-03-27 | Initial scaffold, FloatingInput, token contract, brand themes, DESIGN.md, Homebase wired as first consumer |
