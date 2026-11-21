# Redesign round 2 (2026-11-20)

Client feedback on the built site (screenshots of /contacto, /catalogo):

1. The quote form's `<select>`s have no right padding: the chevron touches the right edge.
2. The catalogue view and its filters are not attractive (review with the `apple-design` skill).
3. Catalogue codes (`CLA0CR`, `CRA0ZG`...) mean nothing to buyers. They are internal: never shown as copy, titles, button labels or "SKU ..." chips. They stay in URLs (`/catalogo/cla0cr`), form values and JSON-LD.
4. The heroes carry too much information and do not capture anyone: fewer words, a stronger picture, one clear action.
5. The "Tabla comparativa" compares nothing. Either it compares the references on what a buyer decides by, or it goes.

## Rules for every agent

- Read first: `AGENTS.md`, `CODING_STANDARDS.md` (section 4: Tailwind utilities in the tsx, the kit is a cascade layer, `grid` is the kit's 12-column grid), `docs/notes/README.md`, `docs/notes/content-inventory.md`.
- Design: the `design-taste-frontend` skill (`~/.agents/skills/design-taste-frontend/SKILL.md`). This is a product page (page type `product`, site-kind `other`): photographs, flat grounds, no effects. Do not edit `src/kit/` to pass a check.
- Never invent facts, figures, prices or customer quotes. Comparisons use the data in `src/lib/catalogue.ts` and the real copy already on the site (for example the use of each quality on `/laminas`).
- Spanish (es-MX) copy, in the existing voice.
- Verify: `bun run check` must pass; `bun run build && bun run shots <pages>` writes screenshots to `shots/current/`. Look at every screenshot you produce at 1440, 820 and 390 before you finish.
- Work in your own worktree and branch; commit there with clear messages. Do not merge.

## Ownership (to keep merges clean)

- **Catalogue agent:** `src/routes/catalogo/index.tsx` except its hero `<section>`, `src/lib/catalogue.ts`, new files under `src/components/catalogo/`.
- **Hero and codes agent:** every hero `<section>` (all routes, including the catalogue hero), `src/routes/catalogo/$sku.tsx`, the other routes' copy that shows codes, `src/components/SiteHeader.tsx`, `src/components/QuoteForm.tsx`, `scripts/check-standards.ts`, `CODING_STANDARDS.md`.
