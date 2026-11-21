import { createFileRoute, notFound } from '@tanstack/solid-router'
import { For, createMemo } from 'solid-js'
import { Picture } from '../../components/Picture'
import { SwatchChip } from '../../components/Swatch'
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

const crumbLink =
  'inline-flex min-h-11 items-center font-medium text-ink underline decoration-line-strong underline-offset-4'

const specTerm =
  'w-[42%] py-1.5 text-left align-top font-normal text-muted sm:max-xl:py-1 xl:pr-4'
const specValue =
  'py-1.5 text-right align-top font-medium text-ink sm:max-xl:py-1'

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
        class="hero hero--product max-sm:[--hgap:16px] max-sm:[--hpadb:16px]"
        id="ficha"
        data-enter=""
        aria-labelledby="sku-h"
      >
        <div class="wrap">
          <div class="hero-text hero__in">
            <div class="hero__head max-lg:*:col-span-full max-sm:gap-y-2">
              <div class="flex flex-col gap-1 sm:gap-2 lg:col-[1/span_7] lg:row-[1/span_2] lg:self-end lg:max-xl:col-[1/span_6] lg:[&>*+*]:mt-0">
                <nav class="mb-0" aria-label="Ruta de navegación">
                  <ol class="flex flex-wrap items-center gap-2 text-small text-muted">
                    <li>
                      <a class={crumbLink} href="/">
                        Inicio
                      </a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <a class={crumbLink} href="/catalogo">
                        Catálogo
                      </a>
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
                <h1
                  id="sku-h"
                  class="max-sm:text-[28px] max-sm:leading-[1.08] lg:text-[length:clamp(36px,2.5vw_+_22px,56px)]"
                >
                  {product().nombre} para suela de calzado
                </h1>
              </div>
              <p class="hero__lead max-sm:text-body max-sm:leading-[1.38]">
                {product().fichaDescription}
              </p>
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
            <div class="hero__stage mx-0 mt-3 mb-0 min-h-[112px] rounded-lg max-lg:flex-[1_1_0] max-sm:aspect-auto sm:mt-6 sm:min-h-[180px]">
              <Picture
                slug={product().sku}
                layout="fill"
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
        class="section [--h:1] [--hm:2]"
        id="especificaciones"
        aria-labelledby="specs-h"
      >
        <div class="wrap">
          <div class="section-head mb-3 sm:max-lg:gap-1 sm:max-xl:mb-2">
            <h2 id="specs-h">Ficha de lámina de hule {skuUpper()}</h2>
            <p class="sm:max-xl:text-body">{product().description}</p>
          </div>

          <div class="grid grid--top">
            <div class="span-6 sm:max-lg:col-span-6">
              <table
                class="w-full border-collapse text-body leading-[1.4]"
                aria-label={`Especificaciones técnicas de SKU ${skuUpper()}`}
              >
                <tbody class="[&>tr:first-child>*]:pt-0">
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Código de referencia</th>
                    <td class={[specValue, 'tabular-nums']}>SKU {skuUpper()}</td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Calidad de compuesto</th>
                    <td class={specValue}>{calidadLabels[product().calidad]}</td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Grabado de superficie</th>
                    <td class={specValue}>{grabadoLabels[product().grabado]}</td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Fierrajes disponibles</th>
                    <td class={[specValue, 'tabular-nums']}>
                      {product().fierrajes.join(', ')} fierros
                    </td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Colores de línea</th>
                    <td class={specValue}>
                      <For each={product().colores}>
                        {(col) => <SwatchChip color={col} />}
                      </For>
                    </td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Planta de fabricación</th>
                    <td class={specValue}>
                      Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco
                    </td>
                  </tr>
                  <tr class="border-b border-line">
                    <th scope="row" class={specTerm}>Condiciones comerciales</th>
                    <td class={specValue}>
                      <span data-assumed="">
                        Precio bajo cotización según fierraje y volumen
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="mt-4 flex flex-col gap-2 sm:mt-2 lg:mt-3 xl:mt-4">
                <p class="t-label text-muted">
                  Otras referencias de lámina en catálogo
                </p>
                <ul class="rows *:py-2 *:first:pt-0 sm:max-xl:*:py-1">
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
              class="span-6 start-7 m-0 h-[360px] overflow-hidden rounded-lg max-sm:mt-8 sm:h-[min(440px,var(--ly-fit))] sm:max-lg:col-span-6 xl:h-[min(420px,var(--ly-fit))]"
              data-moment="picture-develops"
            >
              <Picture
                slug="molino-laminador"
                layout="cover"
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
