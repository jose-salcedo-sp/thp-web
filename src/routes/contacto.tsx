import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/contacto')({
  head: () =>
    seo({
      title: 'Cotizar láminas y suelas de hule en planta | THP',
      description:
        'Solicita cotización directa a la planta de THP en Las Flores 1643, Zapopan, Jalisco. Atención de lunes a sábados de 7:00 a 15:00 por teléfono o correo.',
      path: '/contacto',
    }),
  component: ContactoPage,
})

function ContactoPage() {
  return (
    <main id="top">
      <section class="hero hero--statement" data-enter="" aria-labelledby="contacto-h">
        <div class="wrap">
          <div class="hero-text hero__in">
            <div>
              <h1 id="contacto-h">
                Cotizar láminas, suelas o desarrollos de hule en planta
              </h1>
              <p class="hero__lead">
                Envíanos las especificaciones de tu pedido o comunícate directo
                a nuestras oficinas en la colonia La Florida, Zapopan.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="mailto:info@thp.com.mx">
                  Solicitar cotización
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
