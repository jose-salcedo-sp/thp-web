import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/suelas')({
  head: () =>
    seo({
      title: 'Suelas de hule para calzado y tapetes | THP Zapopan',
      description:
        'Fabricación de suelas de hule para calzado deportivo y casual, moldes a la medida y tapetes de hule antifatiga y sanitizantes hechos en Zapopan.',
      path: '/suelas',
    }),
  component: SuelasPage,
})

function SuelasPage() {
  return (
    <main id="top">
      <section class="hero hero--statement" data-enter="" aria-labelledby="suelas-h">
        <div class="wrap">
          <div class="hero-text hero__in">
            <div>
              <h1 id="suelas-h">
                Suelas de hule y moldes a la medida para calzado
              </h1>
              <p class="hero__lead">
                Fabricamos suelas moldeadas para calzado deportivo y casual
                junto con tapetes industriales de hule en Zapopan.
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
