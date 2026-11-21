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
- **Tailwind Utilities in Markup**: Style elements with Tailwind 4 utilities in the `.tsx`, not new rules in `src/styles.css`. Repeated class lists become a `const` in the file or a small component (`Swatch.tsx`), never `@apply`.
- **The Kit Is a Layer**: The design kit lives in `src/kit/` and is imported into the `kit` cascade layer, under Tailwind's utilities, so a utility always overrides a kit rule. Keep the kit's component classes (`section`, `card`, `panel`, `rows`, `span-6`, `start-7`) and adjust them with utilities. Pictures inside kit slots take `<Picture layout="cover" | "fill" | "hero">`.
- **`grid` Is the Kit's Grid**: The class `grid` also matches the kit's 12-column `.grid`. Use `flex flex-col` for a plain stack.
- **Mobile-First CSS**: Base utilities target mobile (`320px–390px`); layer tablet/desktop adjustments upward with `sm:` (640), `lg:` (1024) and `xl:` (1280), the kit's breakpoints. Use a range (`sm:max-lg:`) only to leave the kit's own value in place outside it.
- **Tokens Only (No Hex Literals in `.tsx`)**: Define colors in `src/styles.css` (`@theme`, or `@theme inline` for the kit's live tokens such as `ink`, `muted`, `line`, `ground`) or data maps in `src/lib/*.ts`. Hex literals (`#...`) inside `.tsx` components fail `bun run lint:standards`.

## 5. `ui-sdk` (`@ui-sdk/solid` & `@ui-sdk/core`)
- Before using `ui-sdk`, follow `.agents/skills/ui-sdk/SKILL.md` and read `node_modules/@ui-sdk/solid/docs/llms.txt`.
- To build a custom primitive or behavior, search `node_modules/@ui-sdk/solid/docs/core.md` by heading and read `node_modules/@ui-sdk/solid/docs/rendering.md`.
