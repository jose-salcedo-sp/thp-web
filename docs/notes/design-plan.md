# THP Redesign — Design Plan (`docs/notes/design-plan.md`)

**Line 1 (Kind):** `product` (`<html lang="es-MX" data-type="product" data-radius="soft" data-buttons="solid">`, `<meta name="page-type" content="product">`, `<meta name="site-kind" content="other">`).
**Line 2 (Deal):** `hero: photo` · `palette: THP brand` (`start.mjs brand`: bg `#FAF9F6`, surface `#F0EEE9`, ink `#0C1221`, muted `#363636`, accent `#9F013B` — warm paper ground highlights natural amber/dark crepe rubber sheets while keeping THP's deep navy-black ink, charcoal secondary text, and industrial crimson press mark) · `type: albert` (`Albert Sans` 400 display / 400–500 text, `-0.025em` / `-0.035em` tracking) · `moments: word-highlight, picture-develops` (look `film`, `0/4` WebGL contexts) · `nav: nav-cards` · `footer: footer-dark` · `close: close-type` · `rhythm: brand-band` · `buttons: solid` · `mark: arc` (replaced by THP SVG/PNG logo `thp_logo_nl` / `thp_logo`) · `compositions: strip, pair, tall-small, split`.

---

## 1. Dealt Outputs & Verbatim `:root` CSS Block

- **`deal.mjs --type product --has photo --history .taste-skill/layout-history.json`**:
  - `hero: photo` (Full-bleed photograph, words in a solid box of page ground colour on the calm left 6 columns at 1440; on 390, 42svh top photograph layer with words below on page ground; `h1` `--ly-h1-xl` 80/44px, weight 400, max 3 lines / 32 chars).
- **`start.mjs deal --page product --trade consumer-product --history .taste-skill/history.json`**:
  - Dealt palettes (superseded by client's own colours via `start.mjs brand`): `1. white-signal-red`, `2. swap-pastels`, `3. blush-sage-slate`.
  - Dealt type pairings: `1. albert` (`Albert Sans`), `2. fraunces`, `3. bricolage` → selected first: **`albert`**.
- **`moments.mjs pick --page product --count 2 --fits section,statement --photo --history .taste-skill/history.json`**:
  - `seed 49bc68ee · page product · live WebGL contexts 0 of 4`
  - `1. word-highlight` (`scroll · statement · scroll`)
  - `2. picture-develops` (`transition · section/hero · enter · needs a photograph`, look `film`)
- **Product one-liner (`nav | footer | close | rhythm | buttons | mark`)**:
  - `nav-cards` · `footer-dark` · `close-type` · `brand-band` · `solid` · `arc`
- **Verbatim output from `start.mjs brand --page product --bg "#FAF9F6" --surface "#F0EEE9" --ink "#0C1221" --muted "#363636" --accent "#9F013B" --type albert --radius soft`**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/system.css">
<link rel="stylesheet" href="assets/ui/cards.css">
<link rel="stylesheet" href="assets/motion/motion.css">
<link rel="stylesheet" href="assets/backgrounds/backgrounds.css">
<link rel="stylesheet" href="assets/layout/layout.css">
<link rel="stylesheet" href="assets/icons/icon.css">
<!-- <html lang="en" data-radius="soft">; keep this <style> after the links: layout.css resets --ly-scale -->
<style>
:root {
  --p-bg: #faf9f6; --p-surface: #f0eee9; --p-ink: #0c1221; --p-muted: #363636;
  --p-accent: #9f013b; --p-accent-ink: #faf9f6; --p-action: #9f013b; --p-action-ink: #faf9f6;
  --p-inv-bg: #0c1221; --p-inv-surface: #191f2e; --p-inv-ink: #faf9f6; --p-inv-muted: #95989e;
  --p-inv-accent: #faf9f6; --p-inv-accent-ink: #0c1221; --p-inv-action: #faf9f6; --p-inv-action-ink: #0c1221;
  --font-display: "Albert Sans", system-ui, sans-serif;
  --font-text: "Albert Sans", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.025em;
  --display-tracking-xl: -0.035em;
}
</style>
```

---

## 2. Screen Plans by Route (Step 3)

Global chrome on every route: `header.nav` (`nav-cards`, fixed `72px` desktop / `56px` mobile, opaque `--p-bg`, `1px` bottom hairline, THP logo left, links `Inicio`, `Láminas`, `Suelas`, `Catálogo`, `Contacto`, primary solid CTA `Solicitar cotización` right; `nav-cards` panel uses SKU swatches `cla0cr`, `cra0zg`, `crn0zg` only on routes where those slugs are not in `main`, or degrades to `nav-split` without panel on `/catalogo` and `/catalogo/$sku` to avoid `photo-repeat`). Mobile `<640px` includes `nav.actionbar` (`Solicitar cotización`). Every route closes with `footer.closing` (`--h: 1`: Row 1 `close-type` + Row 2 `footer-dark` on `#0C1221`).

### Route 1: `/` (Inicio) — 6 screens (`main` 5 screens + `footer.closing` 1 screen)
- `sec-hero` (`hero--photo`, `data-enter`) | idea: Category + buyer (`Láminas y suelas de hule para calzado e industria`) + 50+ yr Zapopan fact + fierrajes 5/6/9/12 | picture: `antifatiga` (4272×2848 macro matte black rubber grid, full-bleed layer with solid `#FAF9F6` text box on left 6 cols; zero upscale) | kind: `object` (1/3) | screens: `1` (`1` at 768).
- `sec-lineas` (`trio` composition) | idea: Three plant lines (láminas por calibre, suelas/tapetes moldeados, cargas a la medida) | picture: `laminas` (span-5, 4:5), `suela` (span-4, 1:1), `cargas-laminadas` (span-3, 4:3) | kind: `object` (2/3) + `parts` | screens: `1` (`2` at 768).
- `sec-proceso` (`statement` moment) | idea: Full-train control in one Zapopan plant prevents gauge variance from raw slab to pressed sheet | picture: none (statement section) | kind: `type` | screens: `1` | moment: `word-highlight` (scrubbed word-by-word ink reveal as buyer scrolls from product lines to catalog preview).
- `sec-catalogo-home` (`strip` + interactive preview) | idea: Preview of the 5 crepe sheet SKUs with fierrajes 5, 6, 9, 12 and colour swatch switcher | picture: `cla0cr`, `cra0cr`, `cra0zg`, `crn0zg` (4× `1:1` detail strip on span-3; swatch click swaps preview) | kind: `parts` (close-up texture swatches) | screens: `1` (`2` at 768).
- `sec-planta` (`split` 6/6 on `.ground-brand` `#9F013B`) | idea: Direct factory service in Col. La Florida, Zapopan with spec rows (tenure, gauges, compounds, hours) | picture: `planta` (span-6, 4:3 factory floor with stacked sheets labeled 0.7, 0.9, 1.2) | kind: `use` (factory context) | screens: `1` (`2` at 768) | moment: `picture-develops` (look `film`, 1.6s developer-tray reveal of the Zapopan plant floor).
- `footer.closing` (`close-type` + `footer-dark`) | idea: Direct factory quote CTA + directory & real contact data | picture: none (`close-type`) | kind: `type` | screens: `1`.

### Route 2: `/laminas` — 5 screens (`main` 4 screens + `footer.closing` 1 screen)
- `sec-hero-laminas` (`hero--photo`, `data-enter`) | idea: Calibrated crepe and SBR rubber sheets for footwear cutting and die-punching | picture: `STAND-IN-1` (high-res ≥1920px rubber calendering/sheet stack stand-in; replaces 1600px `laminas` at full bleed to prevent `photo-upscale`) | kind: `object` (1/3) | screens: `1`.
- `sec-calidades` (`trio` composition) | idea: Three crepe formulations (`crepé`, `crepé liga`, `crepé negro`) matched to footwear sole requirements | picture: `cra0cr` (span-5), `cla0cr` (span-4), `crn0cr` (span-3) | kind: `parts` (macro formulation swatches) | screens: `1` (`2` at 768).
- `sec-grabados` (`tall-small` composition on `.ground-brand` `#9F013B`) | idea: Press-plate engravings (`crepé` vs `zig-zag`) and solid SBR colour runs | picture: `laminas` (tall 4:5 on span-6 showing multi-colour SBR stack) + `crn0zg` (small 1:1 on span-3 showing sharp chevron ridges) | kind: `object` (2/3) + `parts` | screens: `1` (`2` at 768) | moment: `picture-develops` (look `film` on `laminas`).
- `sec-specs-laminas` (`split` 6/6 with `rows--spec`) | idea: Technical table of gauges (fierrajes 5, 6, 9, 12; plant markings 0.7, 0.9, 1.2), 6 colours, and rolling mill process | picture: `molino-laminador` (span-6, 4:3 green rolling mill with operator feeding cream rubber sheet) | kind: `use` (manufacturing process) | screens: `1` (`2` at 768).
- `footer.closing` (`close-type` + `footer-dark`) | idea: Quote CTA for rubber sheets + footer directory | picture: none | kind: `type` | screens: `1`.

### Route 3: `/suelas` — 5 screens (`main` 4 screens + `footer.closing` 1 screen)
- `sec-hero-suelas` (`hero--photo`, `data-enter`) | idea: Molded rubber shoe outsoles, custom tooling, and industrial mats made in Zapopan | picture: `STAND-IN-2` (high-res ≥1920px rubber shoe outsole / footwear press stand-in; `suela.jpg` is 109 KB with third-party `Xtremo` badge) | kind: `object` (1/3) | screens: `1`.
- `sec-pisos` (`pair` composition) | idea: Athletic cleats and casual outsoles vulcanized for grip and clean trim | picture: `suela` (span-6, 4:3 molded black outsole) + `suelas` (span-6, 4:3 factory crate of black/red soccer soles) | kind: `object` (2/3) | screens: `1` (`2` at 768).
- `sec-matriceria` (`pair` composition on `.ground-brand` `#9F013B`) | idea: In-house metal mold library and custom rubber compound formulation | picture: `moldes` (span-6, 4:3 chevron metal press plate and mold racks) + `cargas-laminadas` (span-6, 4:3 raw compounded rubber slabs on racks) | kind: `parts` (tooling & raw compound) | screens: `1` (`2` at 768) | moment: `picture-develops` (look `film` on `moldes`).
- `sec-tapetes` (`split` 6/6) | idea: Molded anti-fatigue octagonal mats and `THP FABRICADO EN MEXICO` sanitizing mats | picture: `sanitizante` (span-6, 4:3 4272×2848 cropped tightly around the black mat and white `THP FABRICADO EN MEXICO` label) | kind: `object` (3/3) | screens: `1` (`2` at 768).
- `footer.closing` (`close-type` + `footer-dark`) | idea: Quote CTA for custom soles/molds + footer directory | picture: none | kind: `type` | screens: `1`.

### Route 4: `/catalogo` — 4 screens (`main` 3 screens + `footer.closing` 1 screen)
- `sec-hero-catalogo` (`hero--photo`, `data-enter`) | idea: Filterable B2B catalog of 5 rubber sheet SKUs across 3 qualities, 2 engravings, 4 gauges, and 6 colours | picture: `sanitizante2` (4032×3024 macro rubber texture cropped to top-left 3200×1800 to completely remove bottom-right `2020/6/17` date stamp) | kind: `parts` | screens: `1`.
- `sec-grid-catalogo` (`--h: 2`, interactive filter + 5 SKU cards) | idea: Live Solid 2.0 filter bar (`Calidad`, `Grabado`, `Color` with text labels + hex swatches) and 5 SKU cards where clicking a swatch updates the preview state and links to `/catalogo/$sku` | picture: `cla0cr`, `cra0cr`, `cra0zg`, `crn0cr`, `crn0zg` (each used once in its own SKU card) | kind: `object` (1/3) | screens: `2` (`2` at 768) | moment: `picture-develops` (look `film` on the featured first card frame).
- `sec-tabla-catalogo` (`rows--spec` comparison table) | idea: Side-by-side specification matrix of all 5 SKUs (`CLA0CR`, `CRA0CR`, `CRA0ZG`, `CRN0CR`, `CRN0ZG`) with direct quote pre-fill links (`/contacto?sku=...`) | picture: none (specs table allowed picture-less per `sections.md` §1) | kind: `type` | screens: `1`.
- `footer.closing` (`close-type` + `footer-dark`) | idea: Direct factory quote CTA + footer directory | picture: none | kind: `type` | screens: `1`.

### Route 5: `/catalogo/$sku` (5 prerendered pages: `cla0cr`, `cra0cr`, `cra0zg`, `crn0cr`, `crn0zg`) — 3 screens
- `sec-sku-main` (`split` 6/6 product stage, `data-enter`) | idea: H1 naming SKU + footwear application, interactive colour swatches (with visible Spanish names) and fierraje pills (`5`, `6`, `9`, `12`) that update the `/contacto?sku=$sku&fierraje=$f&color=$c` CTA | picture: `$sku` (`cla0cr`, `cra0cr`, `cra0zg`, `crn0cr`, or `crn0zg` framed on `--p-surface` `#F0EEE9` at native resolution ≤933px so it never upscales) | kind: `object` (1/3) | screens: `1` (`2` at 768) | moment: `picture-develops` (look `film`).
- `sec-sku-specs` (`split` 6/6 with `rows--spec` + context photo) | idea: Full technical specification sheet (SKU code, quality, engraving, gauges, colour hexes, Zapopan plant origin, Product JSON-LD in `<head>`) | picture: `molino-laminador` (span-6, 4:3 plant rolling mill context) | kind: `use` | screens: `1` (`2` at 768).
- `footer.closing` (`close-type` + `footer-dark`) | idea: Quote CTA pre-filled with current `$sku` + footer directory | picture: none | kind: `type` | screens: `1`.

### Route 6: `/contacto` — 3 screens (`main` 2 screens + `footer.closing` 1 screen)
- `sec-hero-contacto` (`hero--photo`, `data-enter`) | idea: Direct plant quoting and contact in Col. La Florida, Zapopan, Mon–Sat 7:00–15:00 | picture: `antifatiga` (4272×2848 macro rubber grid layer, left 6-col solid box) | kind: `parts` | screens: `1` | moment: `picture-develops` (look `film`).
- `sec-form-contacto` (`booking-form` 6/6 split) | idea: 6-field B2B quote form (`Nombre y apellido`, `Empresa o taller`, `Correo electrónico`, `Teléfono de contacto`, `Producto, calidad y fierraje` pre-filled via `?sku=`, `Volumen estimado`) beside direct plant address, phones, hours, and `planta` photo | picture: `planta` (span-6, 4:3 above plant details) | kind: `use` | screens: `1` (`2` at 768).
- `footer.closing` (`close-type` + `footer-dark`) | idea: Secondary phone/email directory + legal row | picture: none | kind: `type` | screens: `1`.

### Route 7: `/privacidad` — 2 screens (`main` 1 screen + `footer.closing` 1 screen)
- `sec-privacidad` (`--h: 1`, open legal text on `.wrap`) | idea: Mexican LFPDPPP Aviso de Privacidad for Transformadora de Hules y Plásticos (Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco; ARCO rights via `info@thp.com.mx` and `(33) 3684-2909`) | picture: none (legal disclosure page) | kind: `type` | screens: `1` | moment: `word-highlight` on opening responsibility statement.
- `footer.closing` (`close-type` + `footer-dark`) | idea: Return to home / quote CTA + footer directory | picture: none | kind: `type` | screens: `1`.

### Stand-In Photos & Asset Rules
- **Never use:** `russ-ward-659rz6bAks8-unsplash.jpg` (caramel fudge) or `image.jpg` (600×450 low-res).
- **Crop required:** `sanitizante2` must be cropped to exclude the bottom-right `2020/6/17 11:51` timestamp; `sanitizante` cropped tightly to the mat and `THP FABRICADO EN MEXICO` label.
- **Stand-ins needed (`photos.mjs search`, do not fetch yet):**
  1. `STAND-IN-1` (`/laminas` hero): `node ~/.agents/skills/design-taste-frontend/scripts/photos.mjs search "rubber sheet factory" --min 1920` or `"industrial calender machine"` / `"rubber manufacturing"` (replaces 1600×1200 `laminas.jpg` at full-bleed 1440×900 so `photo-upscale` passes).
  2. `STAND-IN-2` (`/suelas` hero): `node ~/.agents/skills/design-taste-frontend/scripts/photos.mjs search "shoe sole manufacturing" --min 1920` or `"rubber outsole"` / `"footwear factory"` (replaces 109 KB `suela.jpg` with third-party `Xtremo` badge at full-bleed hero scale).

---

## 3. Per-Route SEO Table (<60 char Title, <155 char Description)

| Route | `<title>` (<60 chars) | `<meta name="description">` (<155 chars) | Primary Keyword |
|---|---|---|---|
| `/` | `THP: Fabricante de láminas y suelas de hule en Zapopan` (55) | `Fabricamos láminas de hule crepé, suelas para calzado y desarrollos a la medida en Zapopan, Jalisco, con más de 50 años en planta. Fierrajes 5 al 12.` (151) | `fabricante de hule Zapopan` |
| `/laminas` | `Láminas de hule crepé y SBR para calzado \| THP México` (53) | `Láminas de hule en calidades crepé, crepé liga y crepé negro con grabado crepé o zig-zag. Disponibles en fierrajes 5, 6, 9 y 12 para suela y troquel.` (149) | `láminas de hule crepé` |
| `/suelas` | `Suelas de hule para calzado y tapetes \| THP Zapopan` (52) | `Fabricación de suelas de hule para calzado deportivo y casual, moldes a la medida y tapetes de hule antifatiga y sanitizantes hechos en Zapopan.` (148) | `suelas de hule para calzado` |
| `/catalogo` | `Catálogo de láminas de hule por calibre y color \| THP` (51) | `Filtra nuestras 5 líneas de lámina de hule por calidad, grabado crepé o zig-zag, fierrajes 5, 6, 9 y 12 y colores ámbar, oscura, rojiza o negro.` (146) | `catálogo de láminas de hule` |
| `/catalogo/$sku` | `[Nombre SKU] en fierrajes 5 a 12 \| THP Hule` (55–58) | `Lámina de hule [calidad] con grabado [grabado] en [colores]. Fierrajes 5, 6, 9 y 12 fabricados en nuestra planta de Zapopan, México.` (144–150) | `lámina de hule crepé [grabado]` |
| `/contacto` | `Cotizar láminas y suelas de hule en planta \| THP` (52) | `Solicita cotización directa a la planta de THP en Las Flores 1643, Zapopan, Jalisco. Atención de lunes a sábados de 7:00 a 15:00 por teléfono o correo.` (149) | `cotización de láminas y suelas de hule` |
| `/privacidad` | `Aviso de privacidad \| Transformadora de Hules THP` (48) | `Consulta el aviso de privacidad de Transformadora de Hules y Plásticos en Zapopan, Jalisco, para el tratamiento de datos de cotizaciones.` (140) | `aviso de privacidad THP` |

---

## 4. `apple-design` Pre-Check & Fixes Applied

1. **Lens 1 — Contrast Ratios (WCAG AAA/AA verified from hex):**
   - `ink #0C1221` on `bg #FAF9F6`: **`17.74:1`** (on `surface #F0EEE9`: **`16.11:1`**; on legacy `gray #D9D9D9`: **`13.23:1`**) — exceeds `7:1` AAA.
   - `muted/charcoal #363636` on `bg #FAF9F6`: **`11.48:1`** (on `surface #F0EEE9`: **`10.42:1`**) — exceeds `7:1` AAA.
   - `accent #9F013B` on `bg #FAF9F6`: **`7.85:1`** (on `surface #F0EEE9`: **`7.13:1`**; on `#FFFFFF`: **`8.26:1`**) — passes `7:1` AAA.
   - `white #FFFFFF` on `accent #9F013B`: **`8.26:1`** (`#FAF9F6` on `#9F013B`: **`7.85:1`**; `#FFFFFF` on logo `#A30039`: **`8.03:1`**) — passes `7:1` AAA on `.ground-brand` and primary buttons.
   - `inv-ink #FAF9F6` on `inv-bg #0C1221` (`footer-dark`): **`17.74:1`** (`inv-muted #95989E` on `#0C1221`: **`6.46:1`**).
   - **Plan Fix (Logo Metallic Gray `#8E959B`):** `#8E959B` on `#FAF9F6` is **`2.88:1`** (FAILS `<4.5:1` text and `<3:1` UI). On `inv-bg #0C1221` it is **`6.16:1`** (PASS). **Fix:** Never use `#8E959B` for text, borders, or icons on light grounds; restrict `#8E959B` to the graphic `T` in the logo mark (or render the header wordmark in `--p-ink` `#0C1221` + `#A30039`, and use the metallic `#8E959B` wordmark on `footer-dark` `#0C1221`).
   - **Plan Fix (Catalog Bug & Color-Alone):** Legacy `CRN0CR` and `CRN0ZG` had `colores: []` and disappeared when filtering by `"negro"`. Fix data to `colores: ["negro"]` and pair every colour swatch (`#FFBF00`, `#5A5A5A`, `#FF0000`, `#FFFFFF`, `#A52A2A`, `#000000`) with a visible Spanish label and `1px` border on `#FFFFFF` so colour is never the sole indicator.
2. **Lens 1 & 2 — Touch Targets & Adaptive Safe Areas:**
   - All buttons (`.btn`), filter pills, colour swatches, and fierraje selectors (`5, 6, 9, 12`) are `min-height: 44px; min-width: 44px` (`48px` on form inputs and mobile `nav.actionbar`) with `≥8px` (`--s-2` / `--s-3`) gap.
   - Mobile `nav.actionbar` pads bottom with `env(safe-area-inset-bottom)` and hides automatically when hero or form primary CTA is in viewport (`[action-repeat]`).
3. **Lens 3 & 5 — Typography & Copy Hygiene:**
   - Type minimums: body `16px/26px`, form inputs `16px` (prevents iOS Safari auto-zoom on focus), small meta `14px`, group labels `13px/500` sentence case. Zero text `<13px`, zero weights `>500` on headings (`--display-weight: 400`), `font-variant-numeric: tabular-nums` on all fierraje/gauge numbers.
   - `copy-lint.mjs docs/notes/copy.md --kind product`: **`0 FAIL, 0 WARN`** (2,352 words across 7 routes).

---

## 5. Build Status (Shell & `/`)

- **Shell components & paths:**
  - `src/routes/__root.tsx` — Root shell (`<html lang="es-MX" data-type="product" data-radius="soft" data-buttons="solid" data-motion>`, meta tags, self-hosted `Albert Sans` preload, `/kit/*.css` + `src/styles.css`, `organizationLd()` JSON-LD, `<SiteHeader />`, `<Loading>{props.children}</Loading>`, `<SiteFooter />`, and `/kit/*.js` runtime).
  - `src/components/SiteHeader.tsx` — Fixed `header.nav` (`nav-cards` panel on `Láminas`, skip link, `.mark--thp` logo, links `Inicio`, `Láminas`, `Suelas`, `Catálogo`, `Contacto`, primary CTA `Solicitar cotización` → `/contacto`, mobile full-screen sheet with `aria-expanded`).
  - `src/components/SiteFooter.tsx` — `footer.closing.footer--dark.ground-inverse` combining Row 1 (`close--type` CTA) and Row 2 (`footer--dark` directory, real contact data, legal row, and `.credits` line).
  - `public/kit/` (`424 KB`, replacing the 37 MB `public/assets/`) & `public/fonts/albert-sans-{latin,latin-ext}.woff2` (`54 KB` total).
- **How a new route reuses the shell:**
  - `SiteHeader` and `SiteFooter` are mounted globally in `src/routes/__root.tsx`. Each route file (`src/routes/<slug>.tsx`) only needs `head: () => seo({ title, description, path, image })` and a component returning `<main id="top"><section class="hero ..." data-enter>...</section><section class="section" id="...">...</section></main>`.
- **Gate & check results (`/`, `dist/client/index.html`):**
  - `bun run check`: PASS (`tsc --noEmit`, `lint:standards`, `vite build` prerendering 11 pages + `sitemap.xml`).
  - `copy-lint.mjs`: `0 FAIL, 0 WARN`.
  - `layout/check.mjs` (`1440x900,1024x768,820x1180,768x1024,390x844`): `0 findings`.
  - `perf.mjs` (`1440px` & `390px`): `0 FAIL, 0 WARN -> PASS` (CSS `71.7 KiB` / `10.28 kB` app CSS, JS `134.8 KiB` gz, fonts `62.9 KiB`, CLS `0.000`).
  - `bun run gate`: **`GATE: PASS`** (`0 open FAIL`, 4 waivers in `.taste-skill/waivers.json`).
- **Category routes (`/laminas` & `/suelas`):**
  - `src/routes/laminas.tsx` — 4 sections (`#laminas-hero` with `stand-calandra`, `#calidades` trio `cra0cr`/`cla0cr`/`crn0cr`, `#grabados` on `.ground-brand` with `laminas` + `crn0zg` and `picture-develops`, `#especificaciones` split with `molino-laminador`), `BreadcrumbList` JSON-LD, links to `/catalogo`, `/catalogo/{cla0cr,cra0cr,cra0zg,crn0cr,crn0zg}`, and `/contacto`.
  - `src/routes/suelas.tsx` — 4 sections (`#suelas-hero` with `stand-suelas`, `#pisos` pair `suelas`/`suela`, `#matriceria` on `.ground-brand` with `moldes` + `cargas-laminadas` and `picture-develops`, `#tapetes` split with `sanitizante`), `BreadcrumbList` JSON-LD, CTA `/contacto`.
  - Checks (`/laminas` & `/suelas`): `copy-lint.mjs` `0 FAIL, 0 WARN`; `layout/check.mjs` `0 findings` across all 5 viewports; `perf.mjs` `0 FAIL, 0 WARN -> PASS`; `gate.mjs` **`GATE: PASS`** on both routes (`0 open FAIL`, 0 new waivers).
- **Catalogue & product routes (`/catalogo`, `/catalogo/$sku`, and `/` `#catalogo-home`):**
  - `src/routes/catalogo/index.tsx` — Prerendered 5-SKU catalogue with `@ui-sdk/solid/toggle` (`ToggleGroup` / `Toggle`) filter island (`calidad`, `grabado`, `fierraje`, `color`) synced to URL search params via `validateSearch`, polite live region announcing result count, 44px targets, and comparison matrix. Island JS chunk: `50.16 kB` (`18.58 kB` gz; route entry `1.16 kB` / `0.63 kB` gz).
  - `src/routes/catalogo/$sku.tsx` — Prerendered product template for `cla0cr`, `cra0cr`, `cra0zg`, `crn0cr`, `crn0zg` with full-wrap product stage (`1080w` AVIF/WebP/JPG), tabular-nums specs table, `/contacto?sku=<SKU>` CTA, related SKUs, breadcrumb + `BreadcrumbList` and `Product` JSON-LD (no fake prices/offers).
  - `src/routes/index.tsx` (`#catalogo-home`) — Updated so all 5 SKU cards include their own `<Picture>` and link directly to `/catalogo/$sku`.
  - Gate & checks (`/`, `/catalogo`, `/catalogo/cla0cr`): `copy-lint` `0 FAIL, 0 WARN`; `layout/check.mjs` `0 findings` (`1440, 1024, 820, 768, 390`); `perf.mjs` `0 FAIL, 0 WARN -> PASS`; `gate.mjs` **`GATE: PASS`** on all three.


