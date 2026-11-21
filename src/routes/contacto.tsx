import { createFileRoute } from '@tanstack/solid-router'
import { Picture } from '../components/Picture'
import { QuoteForm } from '../components/QuoteForm'
import { getProductoBySku } from '../lib/catalogue'
import { breadcrumbLd, jsonLd, seo } from '../lib/seo'

type ContactoSearch = {
  sku?: string
}

export const Route = createFileRoute('/contacto')({
  validateSearch: (search: Record<string, unknown>): ContactoSearch => {
    const raw = search.sku
    if (typeof raw !== 'string' || !raw.trim()) return {}
    const sku = raw.trim().toLowerCase()
    if (getProductoBySku(sku)) return { sku }
    return {}
  },
  head: () => ({
    ...seo({
      title: 'THP: Cotizar láminas y suelas de hule en planta',
      description:
        'Solicita cotización directa a la planta de THP en Las Flores 1643, Zapopan, Jalisco. Atención de lunes a sábados de 7:00 a 15:00 por teléfono o correo.',
      path: '/contacto',
      image: '/img/planta/1600.jpg',
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: 'Inicio', path: '/' },
          { name: 'Contacto', path: '/contacto' },
        ]),
      ),
    ],
  }),
  component: ContactoPage,
})

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Calle+Las+Flores+La+Florida+Zapopan'

function ContactoPage() {
  const search = Route.useSearch()

  return (
    <main id="top">
      <section
        class="hero hero--photo bg-ground max-[361px]:[--photo:16svh] min-[361px]:max-sm:[--photo:22svh]"
        id="contacto-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="contacto-h"
      >
        <Picture
          slug="stand-laminas-crepe"
          layout="hero"
          dataSource="library"
          alt="Láminas de hule crepé natural en línea de secado y enfriamiento en planta"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker tabular-nums">
                <span class="dot" aria-hidden="true" />
                Las Flores 1643, Zapopan · Teléfonos (33) 3684-2909 y (33)
                3684-3037
              </p>
              <h1 id="contacto-h" class="max-w-[20ch]">
                Cotizar láminas y suelas de hule en planta
              </h1>
              <p class="hero__lead tabular-nums">
                Envíanos las especificaciones de tu pedido o comunícate directo
                a nuestras oficinas en la colonia La Florida, Zapopan. Atendemos
                solicitudes de talleres de calzado y compradores industriales de
                lunes a sábados de 7:00 a 15:00.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="#cotizacion">
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="/catalogo">
                  Ver catálogo de láminas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section [--h:1] [--hm:2]"
        id="cotizacion"
        aria-labelledby="cotizacion-h"
      >
        <div class="wrap">
          <div class="section-head mb-4 sm:mb-2 lg:mb-1 lg:max-xl:gap-1 xl:mb-3">
            <h2 id="cotizacion-h">
              Formulario de cotización y datos de planta
            </h2>
            <p class="sm:max-xl:text-body">
              Completa los campos para preparar tu cotización. Si llegaste desde
              una referencia del catálogo, el producto queda prellenado para
              agilizar la respuesta.
            </p>
          </div>
          <div class="grid grid--top">
            <div class="span-6 sm:max-lg:col-span-6">
              <QuoteForm initialSku={search().sku} />
            </div>
            <aside class="span-6 start-7 flex flex-col gap-3 max-sm:mt-6 sm:max-lg:col-span-6">
              <figure
                class="m-0 h-[260px] overflow-hidden rounded-lg sm:h-[220px] lg:h-[184px] xl:h-[224px]"
                data-moment="picture-develops"
              >
                <Picture
                  slug="planta"
                  layout="cover"
                  class="frame__img"
                  alt="Nave de molienda y laminado de THP en Zapopan con tarimas de láminas de hule marcadas en calibres 0.7, 0.9 y 1.2"
                  sizes="(max-width: 639px) 480px, 768px"
                />
              </figure>
              <ul class="rows rows--spec tabular-nums *:py-2 *:first:pt-0 sm:*:py-1 xl:*:py-2">
                <li>
                  <span class="rows__name">Dirección de planta</span>
                  <p>
                    Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco,
                    México.
                  </p>
                </li>
                <li>
                  <span class="rows__name">Teléfonos directos</span>
                  <p>(33) 3684-2909 · (33) 3684-3037</p>
                </li>
                <li>
                  <span class="rows__name">Correo y horario</span>
                  <p>
                    <a class="link" href="mailto:info@thp.com.mx">
                      info@thp.com.mx
                    </a>{' '}
                    · Lunes a sábado: 7:00 a 15:00
                  </p>
                </li>
              </ul>
              <p class="m-0">
                <a
                  class="link"
                  href={MAPS_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cómo llegar
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}