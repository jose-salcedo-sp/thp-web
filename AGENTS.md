# Agent Instructions

## Package Manager & Tooling
- **Package manager is Bun** (`bun install`, `bun add`, `bun run dev`, `bun run build`). Do not use npm, yarn, or pnpm.
- **Shared agent notes** live in `docs/notes/` (`README.md`, `scaffold.md`, `content-inventory.md`, `design-research.md`). Read them before starting work.
- **Legacy site** in `legacy/` is **reference-only** (moved from the old Astro 1 + Yarn setup). Do not modify or build `legacy/`.

## ui-sdk (`@ui-sdk/solid` & `@ui-sdk/core`)
- Before using `ui-sdk`, follow the `ui-sdk` skill if it is installed, and read `node_modules/@ui-sdk/solid/docs/llms.txt`.
- To build a new component, also search `node_modules/@ui-sdk/solid/docs/core.md` by heading, and read `node_modules/@ui-sdk/solid/docs/rendering.md` next to it.

## Solid 2.0 Notes
- This project uses **Solid 2.0** (`solid-js@^2.0.3`, `@solidjs/web@^2.0.3`). Read `node_modules/solid-js/CHEATSHEET.md` before writing Solid components.
- Web JSX uses `"jsxImportSource": "@solidjs/web"`. Imports moved from `solid-js/web` to `@solidjs/web`, and `solid-js/store` into `solid-js`.
- `Suspense` is now `Loading`, `ErrorBoundary` is `Errored`, `onMount` is `onSettled`, `mergeProps` is `merge`, `splitProps` is `omit`, and `createEffect(compute, apply)` always takes two arguments.
