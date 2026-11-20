# Coding Standards (`thp-web`)

## 1. Solid 2.0 Idioms (`node_modules/solid-js/CHEATSHEET.md`)
- **Imports**: DOM APIs live in `@solidjs/web` (never `solid-js/web`). Store APIs (`createStore`, `reconcile`, `snapshot`) live in `solid-js` (never `solid-js/store`). JSX uses `"jsxImportSource": "@solidjs/web"`.
- **Renamed APIs (1.x → 2.0)**: `Suspense` → `Loading`, `SuspenseList` → `Reveal`, `ErrorBoundary` → `Errored`, `onMount` → `onSettled`, `mergeProps` → `merge`, `splitProps` → `omit`, `unwrap` → `snapshot`, `createSelector` → `createProjection`, `Index` → `<For keyed={false}>`, `classList={{...}}` → `class={{...}}` or `class={[...]}`.
- **Removed APIs**: `createResource` (use async `createMemo` + `<Loading>`), `createComputed`, `batch` (microtask batching is default; use `flush()` when synchronous drain is needed), `produce` (store setters are draft-first by default), `use:` directives (use `ref={directive}`).
- **Effects**: `createEffect(compute, apply)` **always takes two arguments**. Single-arg `createEffect` is invalid.
- **Props & Tracking**: Never destructure `props` (`function Comp(props)` only). Pass values at JSX call sites (`<Comp v={count()} />`, not `<Comp v={count} />`). Never read signals/props at the top of a component body (`STRICT_READ_UNTRACKED`) or write signals inside owned scopes.
- **DOM Attributes**: Use lowercase HTML attribute names (`tabindex`, `fetchpriority`, `srcset`), and camelCase event handlers (`onClick`).

## 2. Routing, SEO & Semantics
- **Route `head()`**: Every route in `src/routes/*.tsx` MUST configure `head: () => seo({ title, description, path, image })` using `src/lib/seo.ts` (and `jsonLd(productLd(...))` on SKU routes).
- **Headings & Landmarks**: Exactly **one `<h1>` per route**. Wrap content in semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Static by Default**: Do not add client JS, effects, or signals for static content. Pages prerender to static HTML in `dist/client/`.

## 3. Media & Assets
- **No Raw `<img>`**: Every raster photograph/product image MUST render through `<Picture slug="..." alt="..." />` (`src/components/Picture.tsx`). Raw `<img` tags outside `Picture.tsx` fail `bun run lint:standards`.
- **Spanish `alt` Text**: Every `<Picture>` requires a descriptive Spanish `alt` naming the physical subject, material, and texture.

## 4. Styling, Responsive Design & Tokens
- **Mobile-First CSS**: Base rules target mobile (`320px–390px`); layer tablet/desktop adjustments upward with `md:` and `lg:`.
- **Tokens Only (No Hex Literals in `.tsx`)**: Define colors in `src/styles.css` (`@theme` / `:root` CSS variables) or data maps in `src/lib/*.ts`. Hex literals (`#...`) inside `.tsx` components fail `bun run lint:standards`.

## 5. `ui-sdk` (`@ui-sdk/solid` & `@ui-sdk/core`)
- Before using `ui-sdk`, follow `.agents/skills/ui-sdk/SKILL.md` and read `node_modules/@ui-sdk/solid/docs/llms.txt`.
- To build a custom primitive or behavior, search `node_modules/@ui-sdk/solid/docs/core.md` by heading and read `node_modules/@ui-sdk/solid/docs/rendering.md`.
