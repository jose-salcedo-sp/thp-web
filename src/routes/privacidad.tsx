import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/privacidad')({
  head: () =>
    seo({
      title: 'Aviso de privacidad | Transformadora de Hules THP',
      description:
        'Consulta el aviso de privacidad de Transformadora de Hules y Plásticos en Zapopan, Jalisco, para el tratamiento de datos de cotizaciones.',
      path: '/privacidad',
    }),
  component: PrivacidadPage,
})

function PrivacidadPage() {
  return (
    <main id="top">
      <section class="hero hero--statement" data-enter="" aria-labelledby="privacidad-h">
        <div class="wrap">
          <div class="hero-text hero__in">
            <div>
              <h1 id="privacidad-h">
                Aviso de privacidad para clientes y proveedores de THP
              </h1>
              <p class="hero__lead">
                Transformadora de Hules y Plásticos, con domicilio en Las Flores
                1643, Colonia La Florida, Zapopan, Jalisco, es responsable del
                tratamiento de los datos personales que nos proporcionas al
                solicitar una cotización.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/">
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
