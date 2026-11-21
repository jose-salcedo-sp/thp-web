# THP Redesign — Design Research & Architecture (`design-research.md`)

## 1. `design-taste-frontend` Classification & Rules

- **Business Kind:** **Product** (physical goods manufactured & sold B2B; nothing retail happens at the door).
  - `page-type`: `product` (`<html lang="es-MX" data-type="product">` + `<meta name="page-type" content="product">`)
  - `site-kind`: `other` (`<meta name="site-kind" content="other">`)
  - `kind` (for dealers/checkers): `product` (`--trade consumer-product`)
- **Strict Visual Boundaries (`site-kind: other`):**
  - **NO shader effects, WebGL scenes, CSS gradients, grain, glass/blur, or self-running card loops.**
  - **Photographs lead** (2–3 per screen on product sections). Flat CSS color tokens (`--g-main`, `--g-alt`, `--g-dark`, plus at most 1 `.ground-brand` or `.ground-inverse` contrasting band in the back half).
  - **Product-shown rule:** Whole product in the hero + at most 2 other sections (max 3 total). Remaining sections must show **use/context** (`planta.jpg`, `molino-laminador.jpg`, `cargas-laminadas.jpg`), **parts/ tooling** (`moldes.jpg`), **detail close-ups** (crepé/zig-zag textures), or **spec rows**. Never show the same image file, crop, or angle twice on a page (`photo-repeat` FAIL).
  - **No captions under visuals** (House Rule 1): product names, specs (`fierrajes`, `colores`, `grabado`), and CTAs sit inside card padding or spec rows, never as a caption below a bare image.

### Exact Deal Commands (Run Once During Build Phase)
Do **not** choose layout/type/moments by hand; run from the project root:
```bash
SKILL="$HOME/.agents/skills/design-taste-frontend"

# 1. Arm finish gate before building
node "$SKILL/scripts/gate.mjs" --start dist/client/index.html --root dist/client \
  --kind product --category "suelas y láminas de hule" --primary "Solicitar cotización"

# 2. Deal hero (product pages deal only product, photo, or film heroes)
node "$SKILL/assets/layout/deal.mjs" --type product --has photo \
  --history .taste-skill/layout-history.json

# 3. Deal type pairings (take first pairing; inspect with --types-only since THP keeps its brand palette)
node "$SKILL/scripts/start.mjs" deal --page product --trade consumer-product \
  --history .taste-skill/history.json

# 4. Generate CSS :root tokens with THP's existing palette (derived from legacy tailwind.config.cjs:
#    thp-primary #9F013B, thp-black #0C1221, thp-white #FFFFFF, thp-gray #D9D9D9, thp-accent #363636)
node "$SKILL/scripts/start.mjs" brand --page product \
  --bg "#FAF9F6" --surface "#F0EEE9" --ink "#0C1221" --muted "#4A4E58" --accent "#9F013B" \
  --type <dealt-type-id> --radius soft

# 5. Deal 1–2 photo/type moments (pool: photo-chapters, pinned-chapters, picture-develops, word-highlight)
node "$SKILL/scripts/moments.mjs" pick --page product --count 2 \
  --fits section,statement --photo --history .taste-skill/history.json

# 6. Deal structural chrome (nav | footer | close | rhythm | buttons | mark)
node -e 'for(const l of process.argv.slice(1)){const o=l.split("|");console.log(o[Math.floor(Math.random()*o.length)])}' \
  "nav-cards|nav-split|nav-mega" "footer-columns|footer-dark" \
  "close-photo|close-type|close-word" "dark-band|brand-band" \
  "arrow|solid|block|pill" "wordmark|initial|arc|ring|stack|dots"
```

### Prescribed Product Page Section Plan (`sections.md`)
Every section is `main > section` with one `.wrap`, top-aligned `h2` first, and height `calc(var(--h, 1) * 100svh)` (`--h: 1` or `2`; content height `495–708px` for `1H` or `1320–1608px` for `2H` at `1440×900`):
1. **Nav (`header.nav`):** Fixed `72px` (`56px` mobile), opaque ground, `1px` bottom hairline, THP SVG/PNG logo left, 4–5 plain nouns, primary button (`Solicitar cotización`) right.
2. **Screen 1 — Hero (`--h: 1`):** Dealt `product` or `photo` hero. `h1` names category + buyer in 2–8 words (*"Láminas y suelas de hule para calzado e industria"*), 1 hard fact on screen 1 (*"57 años fabricando en Zapopan · Fierrajes 5, 6, 9 y 12"*), lead (15–30 words), primary CTA (`Solicitar cotización`) + secondary (`Ver catálogo`). Product image spans ≥80% of wrap or full-bleed layer.
3. **Screen 2 — Line-up / Catálogo interactivo (`--h: 2`):** Within first 3 sections. Interactive Solid 2.0 filter bar (`Calidad`: Crepé, Crepé Liga, Crepé Negro; `Grabado`: Crepé, Zig-Zag; `Color` swatches that dynamically swap the card image per Product Rule 5).
4. **Screen 3 — Feature 1 (`--h: 1`, dealt composition e.g. `tall-small` or `pair`):** **Láminas de hule y cargas laminadas** — `laminas.jpg` + `cargas-laminadas.jpg`. Specific benefit + thickness/fierraje range.
5. **Screen 4 — Feature 2 (`--h: 1`, dealt composition e.g. `trio` or `strip`, on `.ground-brand` `#9F013B` or `.ground-inverse` `#0C1221`):** **Suelas, moldes y desarrollos a la medida** — `suelas.jpg`, `suela.jpg`, `moldes.jpg` + `antifatiga.JPG` / `sanitizante.JPG`.
6. **Screen 5 — Specs & Planta (`--h: 1`, `split` or `rows--spec` + `dealt moment`):** Technical specification table (`rows--spec`: calidades, grabados, fierrajes 5/6/9/12 mm, colores, capacidad de molienda y laminado con `molino-laminador.jpg` / `planta.jpg`). No fact repeated from hero strip.
7. **Screen 6 — Cotización (`#cotizar`, `--h: 1`):** Order/quote split — 6 fields max (`Nombre`, `Empresa`, `Correo`, `Teléfono`, `Producto / Fierraje`, `Volumen estimado`), visible `<label for>`, inline `.field__error`, button `Solicitar cotización`.
8. **Screen 7 — Close + Footer (`footer.closing`, `--h: 1`):** Row 1 dealt close (`close-photo` or `close-type`); Row 2 directory (`footer-columns` or `footer-dark`), legal row.

### Running Check & Gate Scripts Against Static Build Output
All checker scripts serve local files over HTTP (`127.0.0.1`) and resolve root-relative asset paths (`/_build/...`, `/productos/...`) via `--root <build-dir>` (e.g., `dist/client` or `.output/public`):
```bash
BUILD="dist/client"
PROF=".taste-skill/chrome-check"

node "$SKILL/scripts/copy-lint.mjs" "$BUILD/index.html" --kind product
node "$SKILL/scripts/consistency.mjs" "$BUILD/index.html" --root "$BUILD" --profile "$PROF" \
  --widths 1440,1024,820,768,390 --rhythm-widths 1440,820,768,390 \
  --page product --category "suelas y láminas de hule" --primary "Solicitar cotización"
node "$SKILL/assets/layout/check.mjs" --url "$BUILD/index.html" --root "$BUILD" --profile "$PROF" \
  --sizes 1440x900,1024x768,820x1180,768x1024,390x844 --shots shots/layout
node "$SKILL/scripts/perf.mjs" "$BUILD/index.html" --root "$BUILD" --profile "$PROF"
node "$SKILL/scripts/gate.mjs" "$BUILD/index.html" --root "$BUILD"
```

---

## 2. `apple-design` Review Lenses (Web Application)

Per `apple-design/SKILL.md` (Step 1, Scope & Limits), web apps are audited against **Apple's 8 Design Principles** (*Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight*) and **5 Foundations Lenses**, omitting native iOS/macOS chrome conventions:

1. **Lens 1 — Accessibility (Critical):**
   - Contrast computed from hex: body text `<18pt` ≥ `4.5:1` (`tasteskill` enforces `7:1` for `--ink` `#0C1221` on `#FAF9F6` = `17.8:1`; `--muted` `#4A4E58` = `7.8:1`; white on `#9F013B` = `8.3:1`).
   - Touch targets ≥ `44×44px` on mobile with ≥ `8–12px` spacing (`tap-size`).
   - Color never sole indicator: color swatches in the catalog must pair with visible Spanish text labels (*Ámbar, Oscura, Rojiza, Blanco, Café, Negro*) so color-blind B2B buyers can filter accurately.
   - `prefers-reduced-motion` freezes hero entrance and moments to their finished state.
2. **Lens 2 — Adaptive Layout & Safe Areas (High):**
   - Test across iPhone (`390×844`, `320×568`), iPad portrait (`768×1024`, `820×1180`), and desktop (`1024`, `1440`).
   - Defer compact view until needed; on mobile, `nav.actionbar` respects `env(safe-area-inset-bottom)` and hides when the hero or form CTA is visible on screen.
3. **Lens 3 — Visual Design & Craft (High/Medium):**
   - **Point of View check:** Avoid generic AI/SaaS templates. Ground the visual language in industrial rubber manufacturing: tactile macro photography of crepé/zig-zag textures, tabular specs (`font-variant-numeric: tabular-nums`), and THP's crimson `#9F013B` + deep navy-black `#0C1221`.
   - **Single accent rule:** `#9F013B` is reserved strictly for primary CTAs, focus rings, active filter indicators, and the single `.ground-brand` band (<3% of screen elsewhere).
   - **Zero card shadows:** Elevation comes from surface steps (`#FAF9F6` → `#F0EEE9`) and `1px` hairlines (`rgba(12,18,33,0.12)`).
4. **Lens 4 — Interaction & Data Entry (Medium):**
   - Catalog filters update immediately via Solid signals without page reload or layout shift; empty filter combinations show a clear reset action (*"Ninguna lámina coincide con este filtro — Mostrar todas"*).
   - Quote form offers structured choices (`fierrajes`, `calidad` pills) over free typing where possible, validates on submit (never while typing), and preserves input on error.
5. **Lens 5 — Writing & Language Patterns (Medium):**
   - Consistent **sentence case** across all Spanish headings, labels, and buttons (replaces legacy ALL-CAPS `TRANSFORMADORA DE HULES...` and `¡CONTÁCTANOS!`, which fail `copy-lint`).
   - Action labels keep exact wording throughout the flow (`Solicitar cotización` in nav, hero, product cards, and form submit).

---

## 3. Reference Sites Analysis (`anthropic.com`, `apple.com`, `openai.com`)

| Dimension | `anthropic.com` | `apple.com` | `openai.com` | Transferable Pattern for THP | Conflict (`tasteskill` Wins) |
|---|---|---|---|---|---|
| **Type Scale** | Hero `88px`, Section `48–90px` (weight `400`, `-0.03em`), Body `18–24px`, Label `12–16px` | Hero `56px/600` (`lh 1.07`, `-0.005em`), H2 `40px`, Lead `21–28px`, Body `17px` (`lh 1.47`) | Hero `48px/500` (`lh 1.16`, `-0.03em`), H2 `22–32px`, Body `16–18px`, Label `13–14px/500` | Tight negative tracking (`-0.02em` to `-0.035em`) on large display heads; weight `400` display + `400/500` body; `tabular-nums` on all fierraje/spec numbers. | Apple uses `600` headlines & `10–12px` legal text. **Skill wins:** display weight `400` on product pages (never `700/800`), minimum `13px` everywhere (`16px+` body). |
| **Spacing & Grid** | `8px` base (`4..96px`); `96px` vertical section pad; `32px` card pad. | `8px` base; `80px` section pad (`48px` mobile); `20–24px` grid gutter; `24px` card pad. | `4px/8px` scale (`8, 12, 32, 64px`); generous white air around media frames. | `1280px` max `.wrap` (`80px` desktop gutter, `24px` mobile), 12-col grid (`24px` gap desktop, `12px` mobile), `--padt: 120px` (`96px` mobile). | Anthropic varies container width per section (`640px` vs full-bleed). **Skill wins:** every section shares one `.wrap` (`x=80` to `1360` at `1440`) for equal left/right edges. |
| **Nav Behavior** | Quiet top bar, warm paper ground, 1 primary dark pill CTA right. | `44px` global nav + `52px` sticky blurred sub-nav (`backdrop-filter: blur(20px)`). | Minimal horizontal bar, left wordmark, quiet text links, pill CTA. | Fixed `72px` (`56px` mobile) bar on `.wrap` edges, logo left, 4–5 plain nouns, 1 filled CTA (`Solicitar cotización`) right. | Apple uses translucent `backdrop-filter` blur & 2 stacked navs. **Skill wins:** 1 opaque fixed `header.nav` with `1px` hairline, zero blur/transparency. |
| **Hero Composition** | Left-aligned statement + structured right column on warm `#FAF9F5` paper. | Product centered/anchor-scale (80%+ width) below concise headline & 2 CTAs. | High-contrast media frame (`16:9`/`21:9`) with minimal text and clear CTA. | `product` hero: `h1` cols 1–7, lead + 2 buttons cols 9–12, edge-to-edge or anchor-scale product stage down to `24px` above fold. | Apple centers hero stacks and uses dark heroes on hardware. **Skill wins:** left-aligned `h1` on light ground (`#FAF9F6`), whole hero strictly `100svh` (`--h: 1`). |
| **Product Imagery** | Flush-edged or `16px` radius frames on warm cream/oat surfaces, no drop shadows. | Cut-outs & macro shots at anchor scale; colour swatches swap the live image; zero UI card shadows. | Crisp aspect-ratio crops (`1:1`, `4:3`, `16:9`), no borders/frames inside frames. | Show rubber grain (`crepé`, `zig-zag`) at large scale; interactive color swatches swap `CLA0CR`/`CRA0CR`/`CRA0ZG`/`CRN0CR`/`CRN0ZG` photos; max 2 boxes deep. | Legacy THP site used circular `rounded-full` crops on grey cards with `shadow-md` and `bg-black/80` scrims. **Skill wins:** rectangular/soft-radius frames, zero scrims, zero shadows, no captions. |
| **Section Rhythm** | Warm cream `#FAF9F5` alternating with one bold `#000000` full-bleed band; zero divider lines. | Edge-to-edge color shifts (`#FFFFFF` ↔ `#F5F5F7` ↔ `#272729`) act as dividers without borders. | Mostly uniform light ground parted by vertical air and subtle surface cards. | 60%+ on `--g-main` (`#FAF9F6`), `--g-alt` (`#F0EEE9`) for cards/panels, and **one** contrasting band (`.ground-brand` `#9F013B` or `.ground-inverse` `#0C1221`) mid-to-late page. | Reference sites have variable-height sections. **Skill wins:** every section is strictly `1H` or `2H` (`100svh`/`200svh`), no neighbour peeking in. |
| **Motion Restraint** | Quiet surface/border shifts on hover; editorial calm. | `scale(0.95)` press feedback; smooth media swaps. | Subtle image zoom (`1.02–1.03`) inside `overflow: hidden` masks on card hover. | Three places only: (1) `1.1s` hero line-by-line entrance (`data-enter`), (2) 1–2 dealt photo/type moments, (3) hover layer (`2px` card lift, `1.03` photo zoom, `1px` button step). | Anthropic/Apple use scroll-triggered fade-ins across multiple sections. **Skill wins:** zero scroll-reveal on cards/rows; scrolling moves **only** the dealt `[data-moment]` section. |
| **Footer** | Multi-column directory on dark/surface ground, quiet legal row at foot. | Dense multi-column directory on `#F5F5F7`, relaxed link leading, `1px` rules. | Structured columns + large brand wordmark at the bottom edge. | `footer.closing` (`--h: 1`): Row 1 dealt close (`close-type` or `close-photo`), Row 2 columns + legal row (`THP © 2026`, Privacidad, Términos, 1-line photo credits). | Legacy THP hid footer on mobile (`hidden md:grid`) and used exclamation marks. **Skill wins:** visible at all widths, plain declarative copy. |

---

## 4. Lean Page Map (Ponytail + `tasteskill`)

Legacy THP has 5 product SKUs (`CLA0CR`, `CRA0CR`, `CRA0ZG`, `CRN0CR`, `CRN0ZG`), 7 plant/category photos (`planta.jpg`, `molino-laminador.jpg`, `cargas-laminadas.jpg`, `laminas.jpg`, `suelas.jpg`, `suela.jpg`, `moldes.jpg`, `antifatiga.JPG`, `sanitizante.JPG`), and 3 value props. Splitting into 6 thin routes would violate **ponytail** (no pages without content) and **tasteskill** (no repeated photos across sections, no sparse screens `<495px`, no placeholder text).

| Route | Purpose | Primary Action | Content & Asset Allocation |
|---|---|---|---|
| `/` (`index.html`) | Complete B2B product & manufacturing showcase: Hero (`laminas.jpg`), Interactive Catálogo & Swatch Filter (`5 SKUs`, replacing legacy `Lorem ipsum` with real specs: calidad, grabado, fierrajes `5, 6, 9, 12`, colores), Suelas y Especialidades (`suelas.jpg`, `suela.jpg`, `moldes.jpg`, `antifatiga.JPG`, `sanitizante.JPG`), Planta y Capacidad (`planta.jpg`, `molino-laminador.jpg`, `cargas-laminadas.jpg` + spec rows), and Quote Form (`#cotizar`). | `Solicitar cotización` (scrolls to `#cotizar` form / submits quote request) | All 14 unique client photographs used once each; zero stock needed. Nav links (`#catalogo`, `#suelas`, `#planta`, `#especificaciones`, `#cotizar`) jump cleanly to `1H`/`2H` screen tiles. |
| `/catalogo` (`catalogo/index.html`) *(Optional prerendered deep-link route or alias)* | Direct entry for returning B2B buyers searching specific rubber sheets/soles by `calidad`, `grabado`, `color`, and `fierraje`, with deep-linkable URL query params (`?calidad=crepe&grabado=zig-zag`) and instant quote pre-fill. | `Solicitar cotización` (pre-fills selected SKU + fierraje in `#cotizar`) | Uses the 5 SKU images + spec comparison table (`rows--spec`) and direct quote form. *(Note: Can be served as the `#catalogo` anchor on `/` for maximum ponytail simplicity, or prerendered as a 3-screen dedicated route if separate URL indexing is desired).* |
| `/privacidad` & `/terminos` | Lean static legal pages required by `tasteskill` wiring checks (`links` check fails `#` or missing legal targets) and Mexican B2B compliance (Aviso de Privacidad LFPDPPP). | `Volver al inicio` / `Solicitar cotización` | Plain text legal disclosures on `.wrap` layout. |

*Conflict Note on Contact Details:* Legacy `Footer.astro` has real company data (`Las Flores 1643 Col. La Florida, 45234 Zapopan, Jalisco`, `(33) 36842909`, `(33) 36843037`, `info@thp.com.mx`). `tasteskill` House Rule 9 (`street-number`, `postcode`, `phone-number`) flags street numbers, postcodes, and phone numbers unless passed via `--address-allow "Las Flores 1643|45234|(33) 36842909|(33) 36843037"` in `consistency.mjs` or waived in `.taste-skill/waivers.json` (max 5 waivers).

---

## 5. SEO & Performance Plan (`es-MX` B2B Industrial)

### Per-Route Metadata (`<head>`)
- **`/` (Inicio):**
  - `<title>`: `THP: Fabricante de suelas y láminas de hule en Guadalajara, México` *(names brand, category, and place; distinct from meta description per `[page-meta]`)*.
  - `<meta name="description">`: `Fabricamos láminas de hule crepé, suelas para calzado, tapetes antifatiga y desarrollos de hule a la medida en Zapopan, Jalisco. Fierrajes 5, 6, 9 y 12 con envío nacional.`
- **`/catalogo` (if separate route):**
  - `<title>`: `Catálogo de láminas de hule crepé y suelas | THP México`
  - `<meta name="description">`: `Consulta especificaciones de láminas de hule crepé natural, crepé liga y crepé negro en grabados crepé y zig-zag, disponibles en 6 colores y 4 grosores.`
- **Language & Canonical:** `<html lang="es-MX">`, `<link rel="canonical" href="https://thp.com.mx/">`. No `hreflang` alternates needed unless an English export route is added later (if single-language, omit `hreflang` to avoid self-only bloat).
- **Open Graph & Share Image:** `og:title`, `og:description`, `og:type="website"`, `og:locale="es_MX"`, `og:image="https://thp.com.mx/share.jpg"` (`1200×630` or `shoot.mjs` hero tile `tiles/desktop-sec-01-a.jpg`), `twitter:card="summary_large_image"`.

### Structured Data (`application/ld+json`)
Embed a single `@graph` JSON-LD script in `<head>` containing:
1. **`Organization` + `LocalBusiness` (`Manufacturer`):**
   - `name`: `"Transformadora de Hules y Plásticos (THP)"`, `foundingDate`: `"1966"` (57+ years), `url`: `"https://thp.com.mx"`, `logo`: `"https://thp.com.mx/thp_logo_nl.png"`, `telephone`: `["+52-33-3684-2909", "+52-33-3684-3037"]`, `email`: `"info@thp.com.mx"`.
   - `address`: `{"@type": "PostalAddress", "streetAddress": "Las Flores 1643, Col. La Florida", "addressLocality": "Zapopan", "addressRegion": "Jalisco", "postalCode": "45234", "addressCountry": "MX"}`.
   - `openingHoursSpecification`: `Monday–Saturday 07:00–15:00`.
2. **`ItemList` of `Product` entities (5 Catalog SKUs + Suelas/Cargas Laminadas):**
   - Each SKU (`Crepé Liga Grabado Crepé`, `Crepé Ámbar Grabado Crepé`, `Crepé Ámbar Grabado Zig-Zag`, `Crepé Negro Grabado Crepé`, `Crepé Negro Grabado Zig-Zag`) with `sku` (`CLA0CR`, `CRA0CR`, `CRA0ZG`, `CRN0CR`, `CRN0ZG`), `image`, `brand: "THP"`, `material: "Hule / Caucho"`, `additionalProperty` (`Fierrajes: 5, 6, 9, 12`, `Grabado`, `Colores`), and `offers: {"@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "MXN", "priceSpecification": {"@type": "PriceSpecification", "valueAddedTaxIncluded": false}}` (B2B quote-based).

### Technical SEO & Asset Hygiene
- **`public/robots.txt`:** `User-agent: * / Allow: / / Sitemap: https://thp.com.mx/sitemap.xml`.
- **`public/sitemap.xml`:** Static XML listing canonical URLs (`/`, `/catalogo`, `/privacidad`, `/terminos`) with `<lastmod>`.
- **Image Alt Policy (`[img-alt]`):** Every content `<img>` must have a descriptive Spanish `alt` naming the physical subject, material, and texture (e.g., `"Lámina de hule crepé ámbar con grabado zig-zag en fierrajes 5 a 12"`, `"Molino laminador de hule en la planta de THP en Zapopan"`). Fix legacy copy-paste errors (legacy `WhyUs.astro` had `"Laminas de hule..."` as the alt on `suelas.jpg`, and `"product image"` on all catalog cards). Decorative layers use `alt=""` + `aria-hidden="true"`.

### Core Web Vitals & `perf.mjs` Targets
- **LCP < 1.8s (field) / < 2.5s (CPU `perf.mjs`):** Convert legacy `public/*.jpg` / `*.JPG` (some are large raw camera JPEGs) to responsive AVIF/WebP `srcset` (`780w` mobile `4:5`, `1200w`, `1920w`/`2400w` desktop). Hero image `< 400 KiB` with `fetchpriority="high"` and `loading="eager"`; all below-fold images `< 250 KiB` with `loading="lazy"` and `decoding="async"`. Total page image weight `< 1,200 KiB` (WARN threshold; `2,400 KiB` FAIL).
- **CLS = 0.00 (`< 0.1`):** Explicit `width` and `height` (or CSS `aspect-ratio`) on every `<img>`; max 4 font files preloaded with `font-display: swap`; reserved space for `nav.actionbar`.
- **INP < 100ms / TBT = 0ms:** Static prerendering via TanStack Start (Solid 2.0), zero WebGL contexts (`0/4`), zero scroll listeners outside the dealt moment, JS bundle `< 150 KiB` parsed.
