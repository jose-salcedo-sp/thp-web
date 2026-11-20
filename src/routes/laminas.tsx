import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/laminas')({
  head: () =>
    seo({
      title: 'Láminas de hule crepé y SBR para calzado | THP México',
      description:
        'Láminas de hule en calidades crepé, crepé liga y crepé negro con grabado crepé o zig-zag. Disponibles en fierrajes 5, 6, 9 y 12 para suela y troquel.',
      path: '/laminas',
    }),
  component: LaminasPage,
})

function LaminasPage() {
  return (
    <main id="top">
      <section class="hero hero--statement" data-enter="" aria-labelledby="laminas-h">
        <div class="wrap">
          <div class="hero-text hero__in">
            <div>
              <h1 id="laminas-h">
                Láminas de hule crepé y SBR para fabricantes de calzado
              </h1>
              <p class="hero__lead">
                Suministramos hojas de hule calibradas para corte, troquelado y
                armado de suela en fierrajes 5, 6, 9 y 12.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/contacto">
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
