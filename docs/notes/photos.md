# Stand-In Photographs & Asset Crops (`docs/notes/photos.md`)

## 1. Stand-In Photographs (`assets-src/photos/stand-*.jpg`)

All stand-in photographs were sourced via `node ~/.agents/skills/design-taste-frontend/scripts/photos.mjs search` from Wikimedia Commons (≥1920px wide, resampled to 2400px width in `assets-src/photos/` so `bun run images` emits all `[480, 768, 1080, 1600, 2400]` AVIF/WebP/JPG variants). Every candidate was visually inspected at full size to reject third-party brand logos, faces presented as THP staff, and off-topic imagery.

| Slug (`ImageSlug`) | Commons ID | Dimensions | Planned Slot / Subject | Source URL | Author | Licence | Credit Line Text |Client Shot to Replace It |
|---|---|---|---|---|---|---|---|---|
| `stand-calandra` | `f108479152` | `2400 × 1800` | **(a) `/laminas` hero** — Industrial two-roll rubber calender / rolling mill machine (`calandra de rodillos para laminado de hule`). | https://commons.wikimedia.org/wiki/File:Rubber_sheet_roller_machine_2016_04.jpg | Vis M | CC BY-SA 4.0 (`https://creativecommons.org/licenses/by-sa/4.0`) | `Vis M, CC BY-SA 4.0, via Wikimedia Commons` | Wide ≥2400px photograph of THP's calender rolling mill (`molino laminador`) or full-height stacked crepe/SBR rubber sheets in the Zapopan plant. |
| `stand-suelas` | `f54517618` | `2400 × 1800` | **(b) `/suelas` hero** — Pair of unbranded black molded rubber shoe outsoles on a wooden workbench showing traction lugs and mold gauge markings (`1173`, `9`). | https://commons.wikimedia.org/wiki/File:Shoe_soles_07.jpg | Oto Zapletal | CC BY-SA 4.0 (`https://creativecommons.org/licenses/by-sa/4.0`) | `Oto Zapletal, CC BY-SA 4.0, via Wikimedia Commons` | Studio or bench photograph (≥2400px) of THP's own vulcanized rubber outsoles without third-party mold badges. |
| `stand-laminas-crepe` | `f27265371` | `2400 × 1800` | **(c) Extra frame (rubber sheets / drying process)** — Row of natural yellowish-beige crepe rubber sheets (`láminas crepé`) hanging on a drying line showing porous crepe texture. | https://commons.wikimedia.org/wiki/File:Rubber_sheet.JPG | Sivahari | CC BY-SA 3.0 (`https://creativecommons.org/licenses/by-sa/3.0`) | `Sivahari, CC BY-SA 3.0, via Wikimedia Commons` | Natural amber crepe rubber sheets hanging or racked after rolling at the Col. La Florida plant. |
| `stand-muestras-crepe` | `f130893031` | `2400 × 3200` | **(c) Extra frame (rubber texture close-ups)** — Flat-lay specimens of natural rubber grades (`Sole Crepe`, `Estate Brown Crepe`, `Latex Crepe`, amber ribbed smoked sheet). | https://commons.wikimedia.org/wiki/File:Crepe_rubbers.jpg | Vis M | CC BY 4.0 (`https://creativecommons.org/licenses/by/4.0`) | `Vis M, CC BY 4.0, via Wikimedia Commons` | Overhead macro table shot of THP's 3 crepe formulations (`crepé`, `crepé liga`, `crepé negro`) across fierrajes 5, 6, 9, and 12. |
| `stand-hormas-calzado` | `f140544690` | `2400 × 3588` | **(c) Extra frame (footwear workshop / tooling)** — Cast-metal shoemaker's lasts and sole-pressing stand (`V-11-00`) used in footwear sole assembly. | https://commons.wikimedia.org/wiki/File:Shoemakers_metal_last_on_stand_pre_1950s_Gothenburg_Sweden.jpg | R. Henrik Nilsson | CC BY 4.0 (`https://creativecommons.org/licenses/by/4.0`) | `R. Henrik Nilsson, CC BY 4.0, via Wikimedia Commons` | Detail photograph of THP's steel press molds (`matricería`) and sole vulcanizing presses in Zapopan. |
| `stand-almacen` | `f9436500` | `2400 × 1870` | **(c) Extra frame (industrial warehouse)** — High-bay industrial warehouse interior with pallet rack storage system and shrink-wrapped palletized inventory. | https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg | Axisadman | CC BY-SA 3.0 (`https://creativecommons.org/licenses/by-sa/3.0`) | `Axisadman, CC BY-SA 3.0, via Wikimedia Commons` | Wide shot of THP's palletized sheet inventory and shipping bay in Zapopan, Jalisco. |

---

## 2. Source Crops & Unusable Asset Notes

1. **`sanitizante2` (`assets-src/photos/sanitizante2.jpg`) — CROPPED:**
   - **Original:** `4032 × 3024` px with a camera timestamp `"2020/6/17 11:51"` burned into the bottom-right corner.
   - **Crop applied (`sharp.extract`):** `{ left: 0, top: 0, width: 3464, height: 2600 }` (exact `4:3` aspect ratio, `3464 × 2600` px). Completely removes the bottom-right date stamp while preserving the raised cylindrical rubber pins, embossed THP monogram, `"SANITIZANTE"`, and `"thp.com.mx"` mark, and keeping full `2400` width generation.
2. **`suela` (`assets-src/photos/suela.jpg`) — CROPPED FOR DETAIL CARDS / UNUSABLE AS FULL-BLEED HERO:**
   - **Original:** `2048 × 1232` px (109 KB heavy JPEG compression) showing a silver oval third-party `"Xtremo"` badge on the left (medial arch) side of the black outsole.
   - **Crop applied (`sharp.extract`):** `{ left: 750, top: 0, width: 1298, height: 1232 }` (`1298 × 1232` px). Cleanly removes the third-party `"Xtremo"` badge on the left while preserving the multi-zone molded rubber tread lugs and dot-grid grip pattern for `1:1` / `4:3` feature cards (`480`, `768`, `1080` widths).
   - **Limitation:** Because cropping out the `"Xtremo"` badge reduces the width to `1298` px (and the original 109 KB file is heavily compressed), `suela` is **unusable as a full-bleed hero** (`stand-suelas` replaces it for `/suelas` hero).
3. **Permanently Unusable Legacy Files (Never Render):**
   - `russ-ward-659rz6bAks8-unsplash.jpg`: Irrelevant Unsplash stock photo of `"SEASALT CARAMEL"` fudge/soap bars (already excluded by `SKIP` in `scripts/images.ts`).
   - `image.jpg` (`slug: "image"`): `600 × 450` px low-resolution duplicate snapshot of the sanitizing mat; too small for any desktop/tablet slot (use `sanitizante` or cropped `sanitizante2` instead).

---

## 3. Footer Credit Line & Credits List (`photos.mjs credits`)

Paste this **single footer credit line** inside the legal row of `footer.closing` (never one link per photograph in the footer):

```html
<a class="credits" href="/privacidad#credits">Photographs via Wikimedia Commons</a>
```

*(Or verbatim from `photos.mjs credits`: `<a class="credits" href="credits.html">Photographs via Wikimedia Commons</a>` / Spanish UI text if localized on the legal page.)*

### Full Credits Block (for `/privacidad#credits` or `credits.html`)

```html
<section class="credits-list" id="credits" aria-labelledby="credits-h">
  <h2 id="credits-h">Photograph credits</h2>
  <ul>
    <li><a href="https://commons.wikimedia.org/wiki/File:Rubber_sheet.JPG">Sivahari</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a></li>
    <li><a href="https://commons.wikimedia.org/wiki/File:Crepe_rubbers.jpg">Vis M</a>, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a></li>
    <li><a href="https://commons.wikimedia.org/wiki/File:Rubber_sheet_roller_machine_2016_04.jpg">Vis M</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a></li>
    <li><a href="https://commons.wikimedia.org/wiki/File:Shoe_soles_07.jpg">Oto Zapletal</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a></li>
    <li><a href="https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg">Axisadman</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a></li>
    <li><a href="https://commons.wikimedia.org/wiki/File:Shoemakers_metal_last_on_stand_pre_1950s_Gothenburg_Sweden.jpg">R. Henrik Nilsson</a>, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a></li>
  </ul>
</section>
```
