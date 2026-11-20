# Scaffold Notes (`redesign-2026`)

## Exact Installed Versions

- **Runtime / Package Manager**: Bun (`1.3.10`)
- **`solid-js`**: `2.0.3`
- **`@solidjs/web`**: `2.0.3`
- **`@solidjs/vite-plugin`**: `3.0.1`
- **`@tanstack/solid-start`**: `2.0.0-rc.10` (transitive `@tanstack/start-server-core@1.169.26`, `@tanstack/start-client-core@1.170.22`, `@tanstack/start-plugin-core@1.171.34`)
- **`@tanstack/solid-router`**: `2.0.0-rc.10` (transitive `@tanstack/router-core@1.171.22`)
- **`@ui-sdk/core` / `@ui-sdk/solid`**: `0.1.0-beta.13`
- **`tailwindcss` / `@tailwindcss/vite`**: `4.3.5`
- **`vite`**: `8.3.8`
- **`typescript`**: `6.0.3`

## What Fixed the Build

- **Root cause**: `@tanstack/solid-start@2.0.0-rc.11` (`dist/esm/createSolidStartHandler.js`) imports `@tanstack/start-server-core/request-scope`, which its pinned dependency `@tanstack/start-server-core@1.169.45` moved to `./internal-request-response.js` without exporting `./request-scope` in `package.json#exports`.
- **Fix**: Pinned `@tanstack/solid-start` and `@tanstack/solid-router` to `2.0.0-rc.10` (which uses the exported `@tanstack/start-server-core/request-response` subpath) and removed `@tanstack/solid-router-devtools` and `@tanstack/devtools-vite`.

## Scripts

- `bun run dev` — Vite dev server on `http://localhost:3000` (SSR enabled)
- `bun run build` — Builds client (`dist/client/`), SSR server (`dist/server/server.js`), and crawls/prerenders static pages
- `bun run preview` — Preview production build
- `bunx tsc --noEmit` — Typecheck

## Prerender Output Path

- Configured in `vite.config.ts` via `tanstackStart({ prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true } })`.
- Static HTML output is written to `dist/client/` (root index: `dist/client/index.html`; nested routes: `dist/client/<route>/index.html`).

## Solid 2.0 Gotchas

- `tsconfig.json` uses `"jsx": "preserve"` and `"jsxImportSource": "@solidjs/web"`.
- Imports moved from `solid-js/web` to `@solidjs/web`; store utilities live in `solid-js`.
- Renamed primitives: `Suspense` -> `Loading`, `ErrorBoundary` -> `Errored`, `onMount` -> `onSettled`, `mergeProps` -> `merge`, `splitProps` -> `omit`.
- `createEffect(compute, apply)` always takes two arguments.
- CSS layering in `src/styles.css` must keep `@layer ui-sdk;` first, followed by `@import "tailwindcss";` and `@import "@ui-sdk/core/web.css" layer(components);`.

## Adding a Route with `head()` Meta

Create `src/routes/<slug>.tsx` (or `src/routes/catalogo.$sku.tsx` for dynamic params). The Vite plugin regenerates `src/routeTree.gen.ts` automatically on `dev`/`build`:

```tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/suelas')({
  head: () => ({
    meta: [
      { title: 'Suelas de Hule | THP' },
      { name: 'description', content: 'Suelas de hule de alta resistencia.' },
    ],
  }),
  component: SuelasPage,
})

function SuelasPage() {
  return <main>...</main>
}
```

## Environment

- **Image Pipeline (`bun run images`)**: Runs `scripts/images.ts` via `sharp`. Reads original photos from `assets-src/photos/` (excluding logos, favicons, and unused stock), outputs responsive `.avif`, `.webp`, and `.jpg` variants at widths `[480, 768, 1080, 1600, 2400]` (without upscaling) to `public/img/<slug>/<width>.<ext>`, and generates the typed manifest `src/lib/images.gen.ts` (`{ slug, width, height, widths, lqip }`).
- **`<Picture>` Component (`src/components/Picture.tsx`)**: Solid 2 component rendering `<picture>` with AVIF/WebP `<source>` sets, JPEG fallback, explicit `width`/`height`, inline base64 WebP LQIP background, `loading="lazy"` + `decoding="async"` by default, and `fetchpriority="high"` + `loading="eager"` when `priority` is set. `slug` is typed against `ImageSlug`.
- **Videos**: drop sources in `assets-src/videos/`, run `bun run videos` then `bun run images` (posters). Use `<video muted playsinline loop preload="none" poster=...>` with webm source first, mp4 fallback, 720.mp4 via `media="(max-width: 767px)"`. A `<Video>` component gets built when the first real clip exists.
- **SEO & JSON-LD Kit (`src/lib/seo.ts`)**: `seo({ title, description, path, image? })` builds route `head()` `meta` + `links` (`… | THP Hules`, canonical under `SITE_URL = "https://thp.com.mx"`, Open Graph `es_MX`, Twitter `summary_large_image`). `jsonLd(obj)` emits `application/ld+json` script descriptors for `head().scripts`. Includes `organizationLd()` (wired into `src/routes/__root.tsx`) and `productLd(product)`.
- **Sitemap & Robots**: `vite.config.ts` enables `tanstackStart({ sitemap: { enabled: true, host: 'https://thp.com.mx' } })` to emit `dist/client/sitemap.xml` on build; `public/robots.txt` allows all crawlers and points to `https://thp.com.mx/sitemap.xml`.
- **Catalogue Data (`src/lib/catalogue.ts`)**: Typed const product data (`productos`, `calidades`, `colores`, `grabados`, `fierrajes`, `filtrarProductos`, `getProductoBySku`) with lowercase `sku` (`ProductSku`), no placeholder Lorem ipsum (`description?: string`), and honest filter/product types.
- **Standards & Gate (`bun run lint:standards`, `bun run check`, `bun run gate`)**:
  - `bun run lint:standards` (`scripts/check-standards.ts`): Fails on raw `<img` outside `Picture.tsx`, hex literals in `.tsx`, routes missing `head:`, or `solid-js/web` imports. See [`CODING_STANDARDS.md`](../../CODING_STANDARDS.md).
  - `bun run check`: Runs `bunx tsc --noEmit && bun run lint:standards && bun run build`.
  - `bun run gate`: Runs `design-taste-frontend`'s `gate.mjs` against `dist/client/index.html --root dist/client` (with kit assets in `public/assets` and contact waivers in `.taste-skill/waivers.json`).

