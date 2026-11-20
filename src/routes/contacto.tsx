import { createFileRoute } from '@tanstack/solid-router'
import { Picture } from '../components/Picture'
import { QuoteForm } from '../components/QuoteForm'
import { getProductoBySku } from '../lib/catalogue'
import { seo } from '../lib/seo'

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
  head: () =>
    seo({
      title: 'Cotizar láminas y suelas de hule en planta | THP',
      description:
        'Solicita cotización directa a la planta de THP en Las Flores 1643, Zapopan, Jalisco. Atención de lunes a sábados de 7:00 a 15:00 por teléfono o correo.',
      path: '/contacto',
    }),
  component: ContactoPage,
})

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Las+Flores+1643+La+Florida+Zapopan'

function ContactoPage() {
  const search = Route.useSearch()

  return (
    <main id="top">
      <section
        class="hero hero--photo"
        id="contacto-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="contacto-h"
      >
        <Picture
          slug="antifatiga"
          pictureClass="hero__bg"
          alt="Textura macro de tapete industrial de hule negro antifatiga con celdas octagonales moldeadas en planta"
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker">
                <span class="dot" aria-hidden="true" />
                Las Flores 1643, Zapopan · Teléfonos (33) 3684-2909 y (33)
                3684-3037
              </p>
              <h1 id="contacto-h">
                Cotizar láminas, suelas o desarrollos de hule en planta
              </h1>
              <p class="hero__lead">
                Envíanos las especificaciones de tu pedido o comunícate directo
                a nuestras oficinas en la colonia La Florida, Zapopan. Atendemos
                solicitudes de talleres de calzado y compradores industriales de
                lunes a sábados de 7:00 a 15:00.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="cotizacion"
        aria-labelledby="cotizacion-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="cotizacion-h">
              Formulario de cotización y datos de planta
            </h2>
            <p>
              Completa los campos para preparar tu cotización. Si llegaste desde
              una referencia del catálogo, el producto queda prellenado para
              agilizar la respuesta.
            </p>
          </div>
          <div class="grid grid--top">
            <div class="span-6">
              <QuoteForm initialSku={search().sku} />
            </div>
            <aside class="span-6 start-7 stack-4">
              <figure class="m-zoom">
                <Picture
                  slug="planta"
                  class="frame__img"
                  alt="Nave de molienda y laminado de THP en Zapopan con tarimas de láminas de hule marcadas en calibres 0.7, 0.9 y 1.2"
                  sizes="(max-width: 639px) 480px, 768px"
                />
              </figure>
              <ul class="rows rows--spec">
                <li>
                  <span class="rows__name">Dirección de planta</span>
                  <p>
                    Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco,
                    México.
                  </p>
                </li>
                <li>
                  <span class="rows__name">Teléfonos directos</span>
                  <p>
                    <a href="tel:+523336842909">(33) 3684-2909</a>
                    {' · '}
                    <a href="tel:+523336843037">(33) 3684-3037</a>
                  </p>
                </li>
                <li>
                  <span class="rows__name">Correo electrónico</span>
                  <p>
                    <a href="mailto:info@thp.com.mx">info@thp.com.mx</a>
                  </p>
                </li>
                <li>
                  <span class="rows__name">Horario de atención</span>
                  <p>Lunes a sábado: 7:00 a 15:00</p>
                </li>
              </ul>
              <p>
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