# Redesign notes (shared context for agents)

Branch: `redesign-2026`. Goal: redesign the THP site (Mexican manufacturer of rubber soles and "láminas"/rubber sheets).

Stack target: Bun, TanStack Start (Solid, 2.0 RC), Solid 2.0 signals, ui-sdk (`@ui-sdk/solid`, `@ui-sdk/core`), static prerender, optimized images/video, maximum SEO.

Design: `design-taste-frontend` skill (`~/.agents/skills/design-taste-frontend`), reviewed with `apple-design`, built with `ponytail` minimalism. Keep THP color palette. Mobile first, crisp on desktop. References: anthropic.com, apple.com, openai.com.

Legacy Astro site: read from git (`git show master:src/...`), assets in `public/` (or `legacy/` after scaffold).

| Note | Owner | Content |
|---|---|---|
| `content-inventory.md` | content agent | All copy, products, images, palette from legacy site |
| `design-research.md` | research agent | Design direction, skill deal results, page plan |
| `scaffold.md` | scaffold agent | Stack decisions, commands, gotchas |

## User decisions (2026-11-20)

- **Routes: multi-page** for SEO: `/` Inicio, `/suelas`, `/laminas`, `/catalogo`, `/catalogo/$sku` (one per product, Product JSON-LD), `/contacto` (quote form), plus `/privacidad`. Supersedes the single-page plan in design-research.md.
- **Contact: keep real THP data** (street, postcode, phones, email). Waive tasteskill house rule 9 in `.taste-skill/waivers.json` with reason "client's real business contact, required for LocalBusiness SEO".
- **Photo credits:** footer line must be Spanish: `Fotografías de apoyo: Wikimedia Commons` linking to `/privacidad#creditos`; `/privacidad` must render the full attribution table from docs/notes/photos.md in a `#creditos` section.

## Parallel work

Builds and gate runs write to `dist/`, so parallel agents each get their own worktree (`git worktree add ../thp-web-<name> -b redesign-<name>` then `bun install`). Route files are disjoint; on merge, regenerate `src/routeTree.gen.ts` with `bun run build` instead of hand-resolving it.

## Integration TODO

- Sitemap must exclude URLs containing `?` or `#` (filter in start plugin sitemap config); `lint:standards` should fail the build if `dist/client/sitemap.xml` contains either.
- Internal product links use `/catalogo/<sku>`, never `/catalogo?sku=`.

## Styling decision (2026-11-20, user)

- **Tailwind 4, not StyleX.** Tokens in `@theme` in `src/styles.css`; port only used kit CSS rules into the Vite pipeline; delete `public/kit`; kit JS bundled from `src/kit/`. Any StyleX work must be reverted.
- **Done (2026-11-20):** page styles are Tailwind utilities in the `.tsx` (`src/styles.css` holds only layers, fonts and tokens). The kit moved to `src/kit/`: its CSS is imported into the `kit` cascade layer under Tailwind's utilities, its JS loads from `src/client.tsx` after hydration (`src/kit/index.ts`), and `public/kit` is gone. Rules in `CODING_STANDARDS.md` section 4. Still open: pruning the unused kit CSS rules (about 200 kB unminified, 36 kB gzip).
