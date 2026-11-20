import { createFileRoute, notFound } from '@tanstack/solid-router'
import { For, createMemo } from 'solid-js'
import { Picture } from '../../components/Picture'
import {
  calidadLabels,
  colorLabels,
  getProductoBySku,
  grabadoLabels,
  productos,
} from '../../lib/catalogue'
import { breadcrumbLd, jsonLd, productLd, seo } from '../../lib/seo'

export const Route = createFileRoute('/catalogo/$sku')({
  loader: ({ params }) => {
    const product = getProductoBySku(params.sku)
    if (!product) throw notFound()
    return product
  },
  head: ({ params }) => {
    const product = getProductoBySku(params.sku)
    if (!product) {
      return {
        meta: [
          { title: 'Referencia no encontrada (404) | THP Hules' },
          {
            name: 'description',
            content:
              'La referencia solicitada no existe en el catálogo de láminas de hule de THP.',
          },
          { name: 'robots', content: 'noindex, nofollow' },
        ],
      }
    }
    const baseSeo = seo({
      title: product.seoTitle,
      description: product.seoDescription,
      path: `/catalogo/${product.sku}`,
      image: product.img,
    })
    return {
      ...baseSeo,
      scripts: [
        jsonLd(productLd(product)),
        jsonLd(
          breadcrumbLd([
            { name: 'Inicio', path: '/' },
            { name: 'Catálogo', path: '/catalogo' },
            {
              name: `${product.nombre} (SKU ${product.sku.toUpperCase()})`,
              path: `/catalogo/${product.sku}`,
            },
          ]),
        ),
      ],
    }
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const params = Route.useParams()
  const product = createMemo(
    () => getProductoBySku(params().sku) ?? productos[0],
  )
  const skuUpper = createMemo(() => product().sku.toUpperCase())
  const relatedProducts = createMemo(() =>
    productos.filter((p) => p.sku !== product().sku),
  )
  const coloresText = createMemo(() =>
    product()
      .colores.map((c) => colorLabels[c].toLowerCase())
      .join(', '),
  )

  return (
    <main id="top">
      <section
        class="hero hero--product sku-hero"
        id="ficha"
        data-enter=""
        aria-labelledby="sku-h"
      >
        <div class="wrap">
          <div class="hero-text hero__in">
            <div class="hero__head">
              <div class="sku-hero__title-col">
                <nav
                  class="sku-breadcrumb"
                  aria-label="Ruta de navegación"
                >
                  <ol>
                    <li>
                      <a href="/">Inicio</a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <a href="/catalogo">Catálogo</a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page">SKU {skuUpper()}</li>
                  </ol>
                </nav>
                <p class="hero__kicker tabular-nums">
                  <span class="dot" aria-hidden="true" />
                  SKU {skuUpper()} · Fierrajes 5, 6, 9 y 12 · Colores{' '}
                  {coloresText()}
                </p>
                <h1 id="sku-h">
                  {product().nombre} para suela de calzado
                </h1>
              </div>
              <p class="hero__lead">{product().fichaDescription}</p>
              <div class="btn-row">
                <a
                  class="btn btn--primary"
                  href={`/contacto?sku=${skuUpper()}`}
                >
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="/catalogo">
                  Volver al catálogo
                </a>
              </div>
            </div>
            <div class="hero__stage sku-stage">
              <Picture
                slug={product().sku}
                class="frame__img"
                alt={product().alt}
                priority
                sizes="(max-width: 1023px) 100vw, 1280px"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="especificaciones"
        aria-labelledby="specs-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="specs-h">Ficha de lámina de hule {skuUpper()}</h2>
            <p>{product().description}</p>
          </div>

          <div class="grid grid--top sku-specs-grid">
            <div class="span-6 sku-specs-col">
              <table
                class="sku-specs-table"
                aria-label={`Especificaciones técnicas de SKU ${skuUpper()}`}
              >
                <tbody>
                  <tr>
                    <th scope="row">Código de referencia</th>
                    <td class="tabular-nums">SKU {skuUpper()}</td>
                  </tr>
                  <tr>
                    <th scope="row">Calidad de compuesto</th>
                    <td>{calidadLabels[product().calidad]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Grabado de superficie</th>
                    <td>{grabadoLabels[product().grabado]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fierrajes disponibles</th>
                    <td class="tabular-nums">
                      {product().fierrajes.join(', ')} fierros
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Colores de línea</th>
                    <td class="sku-swatches-cell">
                      <For each={product().colores}>
                        {(col) => (
                          <span class="swatch-chip">
                            <span
                              class="swatch-dot"
                              data-swatch={col}
                              aria-hidden="true"
                            />
                            {colorLabels[col]}
                          </span>
                        )}
                      </For>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Planta de fabricación</th>
                    <td>
                      Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Condiciones comerciales</th>
                    <td>
                      <span data-assumed="">
                        Precio bajo cotización según fierraje y volumen
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="sku-related">
                <p class="t-label sku-related__label">
                  Otras referencias de lámina en catálogo
                </p>
                <ul class="rows sku-related__rows">
                  <For each={relatedProducts()}>
                    {(rel) => (
                      <li>
                        <span class="rows__name">
                          <a class="link" href={`/catalogo/${rel.sku}`}>
                            {rel.nombre}
                          </a>
                        </span>
                        <span class="rows__value tabular-nums">
                          SKU {rel.sku.toUpperCase()}
                        </span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </div>

            <figure
              class="develop sku-context-photo span-6 start-7"
              data-moment="picture-develops"
            >
              <Picture
                slug="molino-laminador"
                class="frame__img"
                alt="Molino laminador de rodillos en la planta de THP en Zapopan procesando lámina de hule crepé"
                sizes="768px"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}
