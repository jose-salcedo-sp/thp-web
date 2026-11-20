# THP Legacy Content, Asset & Brand Inventory

Source of truth: `master` branch (`git show master:<path>`) and `public/` directory assets.

---

## 1. THP Brand Palette

### 1.1 Custom Theme Colors (`tailwind.config.cjs`)

| Token | Hex | Role / Where Used |
|---|---|---|
| `thp-primary` | `#9F013B` | **Primary brand crimson/burgundy.** Used for section headings (`About.astro`: `text-thp-primary`), active filter buttons (`Filtros.tsx`: `bg-thp-primary`), product card & modal titles (`Producto.tsx`, `ProductDetailModal.tsx`: `text-thp-primary`), CTA buttons (`bg-thp-primary`), and footer headings/icons (`Footer.astro`: `text-thp-primary`, `fill-thp-primary`, `bg-thp-primary`). Commented out as hero overlay (`bg-thp-primary/80` in `Hero.astro`). |
| `thp-white` | `#FFFFFF` (`#FFF`) | **Brand white.** Used for hero text (`Hero.astro`, `Catalogo.tsx`: `text-thp-white`), filter button text (`Filtros.tsx`: `text-thp-white`), CTA button text (`text-thp-white`), and open mobile hamburger bars (`HamburgerMenu.tsx`: `bg-thp-white`). |
| `thp-black` | `#0C1221` | **Deep navy-black.** Used for inactive desktop filter buttons (`Filtros.tsx`: `bg-thp-black`) and subheadings ("Fierraje", "Colores") in `ProductDetailModal.tsx` (`text-thp-black`). |
| `thp-accent` | `#363636` | **Dark charcoal gray.** Used for desktop navbar links (`NavMenu.tsx`: `text-thp-accent`), closed mobile hamburger bars (`HamburgerMenu.tsx`: `bg-thp-accent`), desktop filter button borders (`Filtros.tsx`: `border-thp-accent`), product card/modal descriptions (`text-thp-accent`), and CTA button hover/focus states (`hover:bg-thp-accent`, `focus:ring-thp-accent`). |
| `thp-gray` | `#D9D9D9` | **Light industrial gray.** Used for sticky navbar background (`Navbar.tsx`: `bg-thp-gray`), product card background (`Producto.tsx`: `bg-thp-gray`), and site footer background (`Footer.astro`: `bg-thp-gray`). |

### 1.2 Global CSS & Inline / Utility Colors

- **`src/styles/globals.css`**: Contains only `@tailwind base; @tailwind components; @tailwind utilities;` (no custom hexes).
- **`src/layouts/Layout.astro`**:
  - Typography: Google Font `Poppins` (`https://fonts.googleapis.com/css2?family=Poppins&display=swap`), fallback `system-ui, sans-serif`.
  - Page background (`body`): `bg-gray-200` (`#E5E7EB`).
- **Inline / Default Tailwind Colors Across Components**:
  - `#000000` (`black`):
    - `Hero.astro`: `bg-black/80` (80% black hero overlay), `[text-shadow:_black_2px_2px;]`, unused `.outlined-header` style (`#000`).
    - `Catalogo.tsx`: `bg-black/80` (80% black hero overlay), `[text-shadow:_black_2px_2px;]`.
    - `WhyUs.astro`: `bg-black` (section background).
    - `Modal.tsx`: `bg-black/95` (mobile menu overlay).
    - `ProductDetailModal.tsx`: `bg-black/80` (modal backdrop), `text-black`, `border-black`.
    - `Dropdown.tsx`: `ring-black` (`ring-opacity-5`).
  - `#FFFFFF` (`white`):
    - `WhyUs.astro`, `Modal.tsx`: `text-white`.
    - `Footer.astro`: `fill-white`.
    - `Dropdown.tsx`, `ProductDetailModal.tsx`: `bg-white`.
  - Tailwind Grays (`About.astro`, `Dropdown.tsx`, `Layout.astro`):
    - `bg-gray-50`: `#F9FAFB` (dropdown button hover)
    - `bg-gray-100`: `#F3F4F6` (selected dropdown item bg)
    - `bg-gray-200`: `#E5E7EB` (`Layout.astro` body background)
    - `ring-gray-300` / `hover:bg-gray-300`: `#D1D5DB` (dropdown border & item hover)
    - `text-gray-400`: `#9CA3AF` (dropdown chevron icon)
    - `text-gray-700`: `#374151` (unselected dropdown item text)
    - `text-gray-800`: `#1F2937` (`About.astro` paragraph text)
    - `text-gray-900`: `#111827` (dropdown button & selected item text)

### 1.3 Product Color Swatch Map (`color_conversion` in `src/utils/catalogue.ts`)

Used as inline `style={{ "background-color": color_conversion[color] }}` in `ProductDetailModal.tsx`:

| Key | Hex | Description |
|---|---|---|
| `ambar` | `#FFBF00` | Amber / golden yellow |
| `oscura` | `#5A5A5A` | Dark medium gray |
| `rojiza` | `#FF0000` | Pure red |
| `blanco` | `#FFFFFF` | Pure white |
| `cafe` | `#A52A2A` | Brown |
| `negro` | `#000000` | Pure black |
| `todo` | `""` | Empty string (all filter) |

### 1.4 Logo Color Inspection (`public/thp_logo.png`, `public/thp_logo_nl.png`, `public/thp_logo_nl.jpg`)

Exact pixel sampling from the uncompressed PNG IDAT streams of `public/thp_logo.png` (with wordmark) and `public/thp_logo_nl.png` (logomark only, no letters below):

- **Logo "T" Monogram & "TRANSFORMADORA DE HULES Y PLÁSTICOS" Wordmark (Cool Metallic Gray)**:
  - Dominant sampled hex: **`#8E959B`** (1,774 px in `thp_logo.png`, 1,453 px in `thp_logo_nl.png`)
  - Textured / anti-aliased range: `#8D949A`, `#8F969C`, `#8C9399`, `#90979D`, `#91989E`
- **Logo "HP" Monogram & Bottom Underline Rule (Crimson / Burgundy)**:
  - Dominant sampled hex: **`#A30039`** (383 px in `thp_logo.png`, 265 px in `thp_logo_nl.png`)
  - Textured / anti-aliased range: `#A40039`, `#A4013A`, `#A20039`, `#A00139`, `#9F0239` (closely matches `thp-primary` `#9F013B`)
- **Background**:
  - Transparent (`rgba(0,0,0,0)`) in `thp_logo.png` and `thp_logo_nl.png`
  - Solid white (`#FFFFFF`) in `thp_logo_nl.jpg`

---

## 2. Verbatim Site Copy (Spanish)

All text below is reproduced **verbatim** (including original punctuation, casing, and typos/placeholders).

### 2.1 Document Title (`src/pages/index.astro`, `src/pages/catalogue.astro`)
- Page `<title>`: `Transformadora de Hules y Plásticos`
- Note: `<html lang="en">` is set in `Layout.astro` even though all content is in Spanish.

### 2.2 Navigation (`src/components/NavMenu.tsx`, `src/components/Modal.tsx`)
- Desktop (`NavMenu.tsx`):
  - `Inicio` (links to `/#hero`)
  - `Nosotros` (links to `/#about`)
  - `Productos` (links to `/catalogue`)
  - `Contacto` (links to `/#contact`)
- Mobile Modal (`Modal.tsx`):
  - `Inicio` (links to `/#hero`)
  - `Nosotros` (links to `/#why` — *note discrepancy vs desktop `/#about`*)
  - `Productos` (links to `/catalogue`)
  - `Contacto` (links to `#contact`)

### 2.3 Home Hero (`src/components/Hero.astro`)
- **H1**:
  > TRANSFORMADORA DE HULES Y PLÁSTICOS
- **H3** (hidden on mobile via `hidden lg:block`):
  > Transformamos de manera innovadora el hule, ofreciendo productos a nuestros clientes del giro del calzado y otras aplicaciones, con una gran variedad en diseños y colores garantizados con 57 años de experiencia

### 2.4 About Section (`src/components/About.astro`)
- **H2**:
  > ¿Qué ofrecemos?
- **Paragraph**:
  > Como empresa orgullosamente mexicana nos dedicamos a la fabricación de artículos de hule y plástico desde hace más de 50 años.
  *(Note: Hero says "57 años de experiencia", About says "más de 50 años".)*

### 2.5 Why Us Section (`src/components/WhyUs.astro`)
1. **Block 1** (Image: `/planta.jpg`, alt: `Planta de laminado de hule Transformadora de Hules y Plasticos`):
   - **H2**: `Confiabilidad`
   - **Paragraph**: `Somos una empresa que entiende su permanencia en el mercado como resultado del trabajo diario basado en el respeto hacia el cliente y hacia el producto.`
2. **Block 2** (Image: `/suela.jpg`, alt: `Suela de hule para zapato de futbol`):
   - **H2**: `Calidad`
   - **Paragraph**: `Proporcionamos productos que responden a las cacterísticas específicas del mercado al que pertenecen.` *(Note verbatim typo: `cacterísticas` instead of `características`.)*
3. **Block 3** (Image: `/suelas.jpg`, alt: `Laminas de hule polibutadieno estireno de colores`):
   - **H2**: `Servicio`
   - **Paragraph**: `Atendemos a nuestros clientes de manera directa y personalizada.`
4. **Block 4** (Image: `/laminas.jpg`, alt: `Laminas de hule polibutadieno estireno de colores`):
   - **H2**: `Desarrollos a la medida`
   - **Paragraph**: `Asesoramos a nuestros clientes para desarrollar productos innovadores y así tener un mayor impacto en sus ventas.`

### 2.6 Catalogue Page (`src/pages/catalogue.astro`, `src/components/Catalogo.tsx`)
- **Hero H1**:
  > PRODUCTOS
- **Empty State Fallback**:
  > No items

### 2.7 Filters (`src/components/Filtros.tsx`, `src/components/Dropdown.tsx`)
- **Mobile Dropdown Titles**:
  - `calidad`
  - `color`
  - `grabado`
- **Desktop Filter Headings**:
  - `Calidad:`
  - `Color:`
  - `Grabado:`
- **Filter Option Values**:
  - Calidad: `todo`, `crepe`, `crepe liga`, `crepe negro`
  - Color: `todo`, `ambar`, `oscura`, `rojiza`, `blanco`, `cafe`, `negro`
  - Grabado: `todo`, `crepe`, `zig zag`

### 2.8 Product Card (`src/components/Producto.tsx`)
- **H5 (Title)**: `{props.producto.nombre}`
- **H6 (Description — placeholder)**:
  > Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, unde?
- **Button**:
  > Ver más

### 2.9 Product Detail Modal (`src/components/ProductDetailModal.tsx`)
- **H4 (Title)**: `{product()?.nombre}`
- **Paragraph (Description — placeholder)**:
  > Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, unde?
- **Subheading 1 (H5)**:
  > Fierraje
- **Subheading 2 (H5)**:
  > Colores
- **Button**:
  > Comprar

### 2.10 Footer & Contact Data (`src/components/Footer.astro`)
> **[FLAG — CONTACT DATA]** The following contact details are hardcoded in `src/components/Footer.astro`. Note also that the entire footer container has `class="hidden w-4/5 md:grid grid-cols-3 text-2xl"`, meaning the footer is completely hidden on mobile screens (`< 768px`) in the legacy site.

- **Column 2 Heading**:
  > ¡Contáctanos!
- **Phone 1** **[FLAG: Contact Phone]**:
  > `(33) 36842909`
- **Phone 2** **[FLAG: Contact Phone]**:
  > `(33) 36843037`
- **Email** **[FLAG: Contact Email]**:
  > `info@thp.com.mx` (`href="mailto: info@thp.com.mx"` — note space after `mailto:`)
- **Column 3 Heading**:
  > ¡Te esperámos! *(Note verbatim typo/accent: `esperámos` instead of `esperamos`.)*
- **Hours** **[FLAG: Business Hours]**:
  > `Lunes a sábados: 7am - 3pm`
- **Street Address** **[FLAG: Physical Address]**:
  > `Las Flores 1643 Col. La Florida`
- **Postal Code & City** **[FLAG: Physical Address]**:
  > `45234 Zapopan, Jalisco`
- **Social Links** **[FLAG: Social Media]**:
  > **None present** anywhere in the legacy codebase.

---

## 3. Full Product Catalogue Data (`src/utils/catalogue.ts`)

### 3.1 Schema & Filter Arrays
```ts
export const calidades = ["todo", "crepe", "crepe liga", "crepe negro"] as const;
export const colores = ["todo", "ambar", "oscura", "rojiza", "blanco", "cafe", "negro"] as const;
export const grabados = ["todo", "crepe", "zig zag"] as const;
export const fierrajes = ["todo", 5, 6, 9, 12] as const;
```
*(Note: `fierrajes` is exported and included in `filtros`, and displayed on product modals, but is not exposed as a filter control in `Filtros.tsx`.)*

### 3.2 Product Fields (`Producto` type)
- `calidad`: `"todo" | "crepe" | "crepe liga" | "crepe negro"`
- `nombre`: `string`
- `colores`: `Array<"todo" | "ambar" | "oscura" | "rojiza" | "blanco" | "cafe" | "negro">`
- `grabado`: `"todo" | "crepe" | "zig zag"`
- `fierrajes`: `Array<"todo" | 5 | 6 | 9 | 12>` (thickness gauge in "fierros", standard footwear unit where 1 fierro ≈ 0.5 mm)
- `img`: `string` (path under `/productos/...`)

### 3.3 All Products (5 Total)

| # | `nombre` | `calidad` | `grabado` | `colores` | `fierrajes` | `img` |
|---|---|---|---|---|---|---|
| 1 | `crepe-liga grabado crepe` | `crepe liga` | `crepe` | `["ambar", "oscura", "rojiza"]` | `[5, 6, 9, 12]` | `/productos/CLA0CR.JPG` |
| 2 | `crepe ambar grabado crepe` | `crepe` | `crepe` | `["ambar", "negro", "blanco"]` | `[5, 6, 9, 12]` | `/productos/CRA0CR.JPG` |
| 3 | `crepe ambar grabado zig-zag` | `crepe` | `zig zag` | `["ambar", "negro", "blanco"]` | `[5, 6, 9, 12]` | `/productos/CRA0ZG.JPG` |
| 4 | `crepe negro grabado crepe` | `crepe negro` | `crepe` | `[]` *(empty — disappears if any color filter other than "todo" is active!)* | `[5, 6, 9, 12]` | `/productos/CRN0CR.JPG` |
| 5 | `crepe negro grabado zig-zag` | `crepe negro` | `zig zag` | `[]` *(empty — disappears if any color filter other than "todo" is active!)* | `[5, 6, 9, 12]` | `/productos/CRN0ZG.JPG` |

*(Note: The color `"cafe"` is defined in `colores` and `color_conversion`, but no product in `productos` currently includes `"cafe"` in its `colores` array. Also, products 4 and 5 are named `crepe negro` but have `colores: []` instead of `["negro"]`, so filtering by `color: "negro"` only returns products 2 and 3!)*

---

## 4. Image Inventory (`public/`)

Total files in `public/`: **21 files** (20 raster images + 1 SVG icon; 16 in `public/` root, 5 in `public/productos/`).

| File Path | Dimensions (px) | File Size | What It Depicts | Where Used in Legacy Site | Hero Suitability Assessment |
|---|---|---|---|---|---|
| `public/antifatiga.JPG` | `4272 × 2848` | 4.3 MB (4,534,255 B) | Tight macro close-up of a matte black rubber anti-fatigue / non-slip mat with a grid of raised octagonal cells enclosing circular domes. | **Unused** in code | **HERO-CAPABLE (Texture/Macro):** Very high resolution (12.2 MP) and sharp, great for dark industrial texture/material hero or section backdrop, though it is a tight surface macro rather than a wide environmental shot. Needs WebP/AVIF compression (4.3 MB). |
| `public/cargas-laminadas.jpg` | `1600 × 1200` | 242 KB (247,636 B) | Industrial metal storage racks holding pale yellow-green raw rubber slabs/sheets in a dimly lit brick/wood-floor warehouse area. | **Unused** in code | **WEAK for Hero:** Adequate resolution for a process/factory card, but dim lighting, weathered racks, and soft compression make it unsuitable as a primary hero. |
| `public/favicon.svg` | `36 × 36` (SVG) | 873 B | Default Astro rocket logo SVG (`#000` with dark-mode invert). | **Unused** in code (`Layout.astro` uses `/thp_logo_nl.png` as favicon) | **N/A (Icon):** Default Astro boilerplate icon; should be replaced with a proper THP vector favicon. |
| `public/image.jpg` | `600 × 450` | 123 KB (125,865 B) | Close-up of a black rubber sanitizing mat with cylindrical nubs outdoors on concrete; embossed text shows `SANITIZANTE` and `thp.com.mx` branding. | **Unused** in code | **WEAK:** Very low resolution (`600×450`), unusable for hero. |
| `public/laminas.jpg` | `1600 × 1200` | 844 KB (863,944 B) | Angled close-up of stacked, colorful textured rubber sheets (red, yellow, deep blue, white, green, orange, lime) in bright sunlight. | `Catalogo.tsx` (Catalogue hero bg); `WhyUs.astro` Block 4 ("Desarrollos a la medida") | **USABLE / BORDERLINE HERO:** Good sharpness and vibrant color contrast at `1600×1200` (844 KB), works well as a secondary/catalogue hero or feature card, though slightly small for 4K full-bleed without upscaling or framing. |
| `public/moldes.jpg` | `1600 × 1200` | 341 KB (349,320 B) | Warehouse shelving stacked with metal molds/plates (used for pressing patterned rubber sheets/soles), with a clean chevron-patterned metal mold plate in the foreground. | **Unused** in code | **WEAK for Hero:** Good authentic factory/tooling photo for an "About / Manufacturing Process" card, but cluttered warehouse background and `1600×1200` compression make it weak as a hero. |
| `public/molino-laminador.jpg` | `1600 × 1200` | 149 KB (153,038 B) | Green industrial rolling mill (*molino laminador*) feeding a glossy cream/beige rubber sheet through metal rollers, with a gloved operator's hand visible. | **Unused** in code | **WEAK for Hero:** Heavy JPEG compression (149 KB at `1600×1200`) and harsh indoor lighting; great authentic process photo for a manufacturing step card, not a hero. |
| `public/planta.jpg` | `1600 × 1200` | 329 KB (336,499 B) | Wide shot of THP factory floor with pallets of stacked rubber sheets (labeled with thicknesses like `0.7`, `0.9`, `1.2`), green machinery, and workers in the background. | `Hero.astro` (Home hero bg); `WhyUs.astro` Block 1 ("Confiabilidad") | **MODERATE / WEAK for Unmasked Hero:** Authentic wide plant photo, but `1600×1200` at 329 KB shows noticeable compression if used unmasked at full viewport width. Legacy site masked it behind an 80% black overlay (`bg-black/80`). Better suited for an editorial plant section or darkened backdrop. |
| `public/russ-ward-659rz6bAks8-unsplash.jpg` | `3600 × 2394` | 1.5 MB (1,579,617 B) | Stock Unsplash photo of "SEASALT CARAMEL" fudge/soap bars on wooden boards in a display case. | **Unused** in code | **DO NOT USE (Irrelevant Stock Photo):** High-res (`3600×2394`), but depicts caramel confectionery/soap from Unsplash, completely unrelated to THP rubber manufacturing. |
| `public/sanitizante.JPG` | `4272 × 2848` | 4.5 MB (4,677,936 B) | Full shot of a black rubber sanitizing / bar mat with raised hemispherical nubs and a molded white label reading `THP FABRICADO EN MEXICO`, placed on a white tiled floor. | **Unused** in code | **MODERATE (Product Feature, Not Main Hero):** High resolution (`4272×2848`, 12.2 MP) and shows official THP branding on a real product, but the white floor tile background looks snapshot-like rather than studio-grade. Good if cropped/isolated for a product showcase. |
| `public/sanitizante2.jpg` | `4032 × 3024` | 996 KB (1,020,401 B) | Angled outdoor close-up of black rubber `SANITIZANTE` doormat with nubs and `thp.com.mx` embossing; has a camera date stamp `2020/6/17 11:51` burned into bottom-right corner. | **Unused** in code | **WEAK for Hero:** High pixel count (`4032×3024`), but outdoor concrete background and burned-in `2020/6/17 11:51` timestamp require cropping and make it unsuitable for a hero. |
| `public/suela.jpg` | `2048 × 1232` | 109 KB (112,074 B) | Close-up of a black molded athletic/casual rubber shoe outsole with multi-textured grip lugs and a metallic silver `Xtremo` badge on a light background. | `WhyUs.astro` Block 2 ("Calidad") | **MODERATE:** Decent resolution (`2048×1232`) and clean subject for a footwear/sole feature card, though heavy compression (109 KB) and third-party `Xtremo` mold branding make it better as a section image than the main site hero. |
| `public/suelas.jpg` | `1600 × 1200` | 304 KB (311,604 B) | Green plastic factory crate filled with black and red cleated soccer/athletic rubber soles bound with yellow rubber bands (with red labels visible). | `WhyUs.astro` Block 3 ("Servicio") | **WEAK for Hero:** `1600×1200` snapshot inside a plastic crate with third-party brand labels visible; avoid prominent hero placement. |
| `public/thp_logo.png` | `270 × 214` | 54 KB (55,602 B) | Official THP distressed stencil logo (`T` in gray `#8E959B`, `HP` in crimson `#A30039`) with `TRANSFORMADORA DE HULES Y PLÁSTICOS` wordmark and red underline on transparent background. | `Footer.astro` | **WEAK Resolution (Logo):** Only `270×214` px raster PNG. Needs vectorization (SVG) for crisp retina display. |
| `public/thp_logo_nl.jpg` | `270 × 214` | 10 KB (10,642 B) | THP distressed `THP` monogram without wordmark on a solid white background. | **Unused** in code | **WEAK Resolution (Logo):** Low-res (`270×214`) JPEG with compression artifacts. |
| `public/thp_logo_nl.png` | `270 × 214` | 41 KB (41,574 B) | THP distressed `THP` monogram without wordmark on a transparent background. | `Navbar.tsx` (header logo); `Layout.astro` (`<link rel="icon">`) | **WEAK Resolution (Logo):** Used in navbar and favicon, but only `270×214` px raster. Should be recreated/traced as clean SVG. |
| `public/productos/CLA0CR.JPG` | `1009 × 757` | 183 KB (187,614 B) | Macro swatch of `crepe-liga grabado crepe`: warm amber/light-brown granular crepe rubber texture. | `catalogue.ts` Product #1 (`crepe-liga grabado crepe`) | **SWATCH ONLY (Weak for Hero):** `1009×757` close-up material texture swatch for product cards/modals. |
| `public/productos/CRA0CR.JPG` | `933 × 700` | 73 KB (74,718 B) | Macro swatch of `crepe ambar grabado crepe`: light cream/amber crinkled crepe rubber surface texture. | `catalogue.ts` Product #2 (`crepe ambar grabado crepe`) | **SWATCH ONLY (Weak for Hero):** `933×700` close-up material swatch. |
| `public/productos/CRA0ZG.JPG` | `933 × 700` | 45 KB (46,408 B) | Macro swatch of `crepe ambar grabado zig-zag`: warm golden-amber rubber sheet with horizontal chevron/zig-zag embossing (slightly soft focus). | `catalogue.ts` Product #3 (`crepe ambar grabado zig-zag`) | **SWATCH ONLY (Weak for Hero):** `933×700` soft-focus material swatch (45 KB). |
| `public/productos/CRN0CR.JPG` | `525 × 700` | 150 KB (153,112 B) | Close-up of `crepe negro grabado crepe`: black rough-textured rubber layer folded over a light chevron-embossed base. | `catalogue.ts` Product #4 (`crepe negro grabado crepe`) | **SWATCH ONLY (Weak for Hero):** Portrait `525×700` close-up sample photo. |
| `public/productos/CRN0ZG.JPG` | `933 × 700` | 259 KB (265,153 B) | Sharp macro swatch of `crepe negro grabado zig-zag`: black rubber sheet with crisp raised chevron/zig-zag tread ridges. | `catalogue.ts` Product #5 (`crepe negro grabado zig-zag`) | **SWATCH ONLY (Good Swatch, Too Small for Hero):** Sharpest of the 5 product swatches, but `933×700` resolution limits it to product cards/detail views. |

---

## 5. Content & Technical Gaps (Client Questions)

The legacy site is a minimal prototype with placeholder text (`Lorem ipsum...`), only 5 crepe sheet SKUs, no technical datasheets, and unreferenced product photos in `public/` (anti-fatigue mats, sanitizing mats, footwear soles, custom compounds). Below are the critical gaps framed as questions for the client:

### 5.1 Product Catalogue & Technical Specifications
1. **Product Descriptions & Applications:** Every product card and detail modal currently displays `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, unde?"`. What is the real description, recommended use case (e.g., casual footwear, industrial boots, orthopedic soles), and value proposition for `Crepe`, `Crepe Liga`, and `Crepe Negro`?
2. **Additional Product Lines (Suelas, Tapetes, Compuestos):** The `public/` folder contains photos of molded shoe soles (`suela.jpg`, `suelas.jpg`), sanitizing mats (`sanitizante.JPG`, `sanitizante2.jpg`, `image.jpg`), anti-fatigue mats (`antifatiga.JPG`), and colored rubber sheets (`laminas.jpg`), yet the catalogue only lists 5 crepe sheets. Should the new catalogue include **Suelas (Molded Soles)**, **Tapetes (Sanitizing / Anti-Fatigue Mats)**, **Cargas / Compuestos Maquilados**, or other SBR/NBR/natural rubber sheet lines?
3. **Sheet Dimensions & Physical Specs:** What are the standard sheet dimensions (e.g., width × length in cm/meters, such as the `300/1200` seen on pallet labels in `planta.jpg`), weight per sheet, hardness (Shore A), density/specific gravity, abrasion resistance (DIN/NBS), and tensile/elongation specs for each product?
4. **Fierraje & Thickness Conversion:** All 5 products list `fierrajes: [5, 6, 9, 12]`. Do you offer other gauges (e.g., 3, 4, 7, 8, 10, 15 fierros), and should we display the millimeter equivalent alongside each fierraje (e.g., 1 fierro ≈ 0.53 mm) for non-footwear industrial buyers?
5. **Color Availability Bug in Catalogue:** `crepe negro grabado crepe` and `crepe negro grabado zig-zag` have empty `colores: []` arrays in code, and `"cafe"` is listed in the filter bar without any matching product. Which exact colors are available per quality/engraving, and do you have real swatch photos for each color (`ambar`, `oscura`, `rojiza`, `blanco`, `cafe`, `negro`, plus the bright colors shown in `laminas.jpg`)?

### 5.2 Commercial Model, Ordering & Lead Times
6. **CTA Action ("Comprar" vs. "Cotizar"):** The product modal currently has a `"Comprar"` button that simply closes the modal, with no cart, pricing, or checkout. Since THP is an industrial B2B manufacturer, should this CTA be **"Solicitar Cotización" / "Pedir Muestra"** (routing to WhatsApp / pre-filled quote form with selected product, fierraje, and color)?
7. **Minimum Order Quantities (MOQ) & Logistics:** What are the minimum order quantities (by sheet, roll, pair of soles, or kg/ton), typical production lead times, and shipping coverage (local Zapopan/Guadalajara, León/Guanajuato footwear corridor, national across Mexico, or export)?

### 5.3 Company History, Capacity & Certifications
8. **Founding Year / Years of Experience:** The hero states **"57 años de experiencia"** while the About section states **"más de 50 años"**. What was the exact founding year of THP (e.g., ~1966) so we can calculate or state the exact tenure consistently in 2026?
9. **Certifications, Standards & Lab Testing:** Does THP hold any ISO certifications (e.g., ISO 9001), footwear/industrial laboratory test compliance (e.g., CIATEC, NOM-113-STPS for safety footwear, ASTM/DIN standards), or environmental/recycling credentials (e.g., recycled rubber content)?
10. **Industries Served & Custom Development ("Desarrollos a la medida"):** Beyond calzado (footwear), which specific industries does THP serve (e.g., automotive, construction, gym/sports flooring, agriculture, foodservice/industrial matting)? What is the process and minimum volume for a client requesting a custom rubber compound, custom color match, or custom mold (`moldes.jpg`)?

### 5.4 Brand Assets, Contact & Legal Compliance
11. **Vector Logo & Brand Guidelines:** The logo files in `public/` (`thp_logo.png`, `thp_logo_nl.png`) are only `270 × 214` px raster images. Do you have the original vector file (`.ai`, `.eps`, `.svg`, or high-res `.pdf`) of the THP logo?
12. **Contact Channels, WhatsApp & Social Media:** Are the two landline numbers `(33) 3684-2909` and `(33) 3684-3037`, the email `info@thp.com.mx`, the address `Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco`, and hours `Lunes a sábados: 7am - 3pm` still accurate? Is there a **WhatsApp Business** number, Google Maps pin, or active social media (LinkedIn, Facebook, Instagram) we should link?
13. **Legal Name & Privacy Notice (Aviso de Privacidad):** What is the full legal entity name (e.g., *Transformadora de Hules y Plásticos, S.A. de C.V.*) for copyright and what is the official **Aviso de Privacidad** text required under Mexican law (LFPDPPP) if we add a contact/quote form?
