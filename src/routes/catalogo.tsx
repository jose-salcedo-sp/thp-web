import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/catalogo')({
  head: () =>
    seo({
      title: 'Catálogo de láminas de hule por calibre y color | THP',
      description:
        'Filtra nuestras 5 líneas de lámina de hule por calidad, grabado crepé o zig-zag, fierrajes 5, 6, 9 y 12 y colores ámbar, oscura, rojiza o negro.',
      path: '/catalogo',
    }),
  component: CatalogoPage,
})

function CatalogoPage() {
  return (
    <main id="top">
      <section class="hero hero--statement" data-enter="" aria-labelledby="catalogo-h">
        <div class="wrap">
          <div class="hero-text hero__in">
            <div>
              <h1 id="catalogo-h">
                Catálogo de láminas de hule por calidad, grabado y fierraje
              </h1>
              <p class="hero__lead">
                Revisa nuestras 5 referencias de lámina de hule crepé y filtra
                por calidad, tipo de grabado o color.
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
