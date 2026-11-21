import { createFileRoute, notFound } from '@tanstack/solid-router'
import { For, createMemo } from 'solid-js'
import { Hero } from '../../components/Hero'
import { Picture } from '../../components/Picture'
import { SwatchChip } from '../../components/Swatch'
import {
  calidadLabels,
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
              name: product.nombre,
              path: `/catalogo/${product.sku}`,
            },
          ]),
        ),
      ],
    }
  },
  component: ProductDetailPage,
})

const specTerm =
  'w-[42%] py-1.5 text-left align-top font-normal text-muted sm:max-xl:py-1 xl:pr-4'
const specValue =
  'py-1.5 text-right align-top font-medium text-ink sm:max-xl:py-1'

function ProductDetailPage() {
  const params = Route.useParams()
  const product = createMemo(
    () => getProductoBySku(params().sku) ?? productos[0],
  )
  const relatedProducts = createMemo(() =>
    productos.filter((p) => p.sku !== product().sku),
  )

  return (
    <main id="top">
      <Hero
        id="ficha"
        headingId="sku-h"
        title={product().nombre}
        line="En fierrajes 5, 6, 9 y 12."
        href={`/contacto?sku=${product().sku}`}
        slug={product().sku}
        alt={product().alt}
      />

      <section
        class="section [--h:1] [--hm:2]"
        id="especificaciones"
        aria-labelledby="specs-h"
      >
        <div class="wrap">
          <div class="section-head mb-3 sm:max-lg:gap-1 sm:max-xl:mb-2">
            <h2 id="specs-h">Especificaciones de la lámina</h2>
            <p class="sm:max-xl:text-body">{product().description}</p>
          </div>

          <div class="grid grid--top">
            <div class="span-6 sm:max-lg:col-span-6">
              <table
                class="w-full border-collapse text-body leading-[1.4]"
                aria-label={`Especificaciones de ${product().nombre}`}
              >
                <tbody class="[&>tr:first-child>*]:pt-0">
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
