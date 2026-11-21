import { createFileRoute } from '@tanstack/solid-router'
import { Picture } from '../components/Picture'
import { SITE_URL, jsonLd, seo } from '../lib/seo'

export const Route = createFileRoute('/laminas')({
  head: () => ({
    ...seo({
      title: 'Láminas de hule crepé y SBR para calzado | THP México',
      description:
        'Láminas de hule en calidades crepé, crepé liga y crepé negro con grabado crepé o zig-zag. Disponibles en fierrajes 5, 6, 9 y 12 para suela y troquel.',
      path: '/laminas',
      image: '/img/stand-calandra/1600.jpg',
    }),
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Láminas',
            item: `${SITE_URL}/laminas`,
          },
        ],
      }),
    ],
  }),
  component: LaminasPage,
})

const trioPanel =
  'panel [--p-h:172px] sm:[--p-h:220px] lg:[--p-h:148px] xl:[--p-h:224px]'

function LaminasPage() {
  return (
    <main id="top">
      <section
        class="hero hero--photo bg-ground max-[361px]:[--photo:16svh] min-[361px]:max-sm:[--photo:22svh]"
        id="laminas-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="laminas-h"
      >
        <Picture
          slug="stand-calandra"
          layout="hero"
          dataSource="library"
          alt="Calandra industrial de dos rodillos metálicos laminando láminas de hule crepé y SBR en planta"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker tabular-nums">
                <span class="dot" aria-hidden="true" />
                3 calidades de crepé · Fierrajes 5, 6, 9 y 12 · 2 grabados de
                prensa
              </p>
              <h1 id="laminas-h" class="max-w-[20ch]">
                Láminas de hule crepé y SBR para calzado
              </h1>
              <p class="hero__lead tabular-nums">
                Suministramos hojas de hule calibradas para corte, troquelado y
                armado de suela. Trabajamos tres calidades de crepé de línea en
                fierrajes 5, 6, 9 y 12 y laminamos lotes de polibutadieno
                estireno en colores vivos bajo pedido.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/contacto">
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="/catalogo">
                  Explorar las 5 referencias
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section [--h:1] [--hm:2]"
        id="calidades"
        aria-labelledby="calidades-h"
      >
        <div class="wrap">
          <div class="section-head lg:max-xl:mb-4">
            <h2 id="calidades-h">
              Tres calidades de hule para distintos pisos
            </h2>
            <p>
              Cada taller requiere un balance distinto entre flexibilidad,
              resistencia al desgaste y costo por par. Mantenemos tres
              formulaciones base para cubrir desde zapato casual hasta bota de
              trabajo.
            </p>
          </div>
          <div class="grid sm:max-lg:grid-cols-3">
            <article class="card card--row card--open span-5 sm:max-lg:col-auto">
              <h3>Elegir crepé para tonos claros y contraste</h3>
              <p>
                Ofrece acabado limpio en ámbar, blanco y negro, pensado para
                calzado casual donde el canto de la lámina queda a la vista.
              </p>
              <a class="card__link link" href="/catalogo/cra0cr">
                Ver ficha SKU CRA0CR
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="cra0cr"
                  layout="fill"
                  class="frame__img"
                  alt="Muestra macro de lámina de hule crepé en tono ámbar con huella crepé uniforme"
                  sizes="(max-width: 1023px) 480px, 768px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-4 sm:max-lg:col-auto lg:max-xl:col-span-4">
              <h3>Elegir crepé liga para elasticidad y tono cálido</h3>
              <p>
                Formulado en variantes ámbar, oscura y rojiza con textura crepé
                clásica para suelas cosidas o pegadas que exigen flexión
                constante.
              </p>
              <a class="card__link link" href="/catalogo/cla0cr">
                Ver ficha SKU CLA0CR
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="cla0cr"
                  layout="fill"
                  class="frame__img"
                  alt="Muestra macro de lámina de hule crepé liga en tono ámbar con grabado crepé granulado"
                  sizes="(max-width: 1023px) 480px, 768px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-3 sm:max-lg:col-auto">
              <h3>Elegir crepé negro para trabajo pesado</h3>
              <p>
                Compuesto cerrado en color negro para pisos de uso continuo
                donde se prioriza resistencia a la abrasión y uniformidad de
                lote.
              </p>
              <a class="card__link link" href="/catalogo/crn0cr">
                Ver ficha SKU CRN0CR
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="crn0cr"
                  layout="fill"
                  class="frame__img"
                  alt="Muestra macro de lámina de hule crepé negro con textura crepé cerrada para calzado de trabajo"
                  sizes="480px"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        class="section ground-brand [--h:1] [--hm:2] [--muted:var(--p-accent-ink)]"
        id="grabados"
        aria-labelledby="grabados-h"
      >
        <div class="wrap">
          <div class="section-head section-head--row mb-6 sm:mb-3 lg:mb-2 xl:mb-6">
            <div>
              <h2 id="grabados-h">
                Láminas con grabado de prensa y colores de línea
              </h2>
              <p class="sm:max-xl:text-body">
                Prensamos cada hoja con placas metálicas que definen el agarre
                de la suela antes del suajado. El grabado crepé deja una huella
                granulada omnidireccional, mientras que el grabado zig-zag forma
                canales en espiga para frenado en piso liso.
              </p>
            </div>
            <a class="link" href="/catalogo">
              Ver catálogo
            </a>
          </div>
          <div class="grid grid--top sm:max-lg:grid-cols-3">
            <div class="span-5 stack-2 sm:max-lg:col-auto">
              <p>
                Además de la carta crepé, laminamos hule polibutadieno estireno
                (SBR) en rojo, amarillo, azul, verde, naranja y blanco, así
                como cargas laminadas en rama y colores a la medida para
                colecciones que piden suelas o entresuelas de color sólido.
              </p>
              <ul class="rows rows--spec tabular-nums *:py-3 sm:*:py-2 lg:*:py-1 xl:*:py-3">
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo/cra0zg">
                      Crepé ámbar zig-zag (CRA0ZG)
                    </a>
                  </span>
                  <p>
                    Relieve en espiga en colores ámbar, negro y blanco en
                    fierrajes 5, 6, 9 y 12.
                  </p>
                </li>
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo/crn0zg">
                      Crepé negro zig-zag (CRN0ZG)
                    </a>
                  </span>
                  <p>
                    Tracción profunda en espiga en compuesto negro para suela de
                    trabajo.
                  </p>
                </li>
              </ul>
            </div>
            <figure
              class="span-4 m-0 h-[240px] overflow-hidden rounded-lg max-sm:mt-4 sm:h-[400px] sm:max-lg:col-auto lg:h-[210px] xl:h-[372px]"
              data-moment="picture-develops"
            >
              <Picture
                slug="laminas"
                layout="cover"
                class="frame__img"
                alt="Estiba de láminas de hule polibutadieno estireno SBR en colores rojo, amarillo, azul, blanco, verde y naranja"
                sizes="(max-width: 639px) 480px, 768px"
              />
            </figure>
            <figure class="pl-photo span-3 m-0 h-[200px] overflow-hidden rounded-lg max-sm:mt-4 sm:h-[400px] sm:max-lg:col-auto lg:h-[210px] xl:h-[372px]">
              <Picture
                slug="crn0zg"
                layout="cover"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé negro con grabado zig-zag en espiga"
                sizes="480px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        class="section [--h:1] [--hm:2]"
        id="especificaciones"
        aria-labelledby="especificaciones-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6 sm:max-lg:col-span-6">
            <div class="section-head mb-12 sm:mb-3 sm:max-lg:gap-1 lg:mb-2 xl:mb-6">
              <h2 id="especificaciones-h">
                Especificaciones de fierraje y estiba
              </h2>
              <p class="sm:max-xl:text-body">
                Laminamos en tren continuo con control de espesor por tarima y
                formulamos cargas laminadas en rama según la dureza que pide tu
                orden de trabajo.
              </p>
            </div>
            <ul class="rows rows--spec tabular-nums *:py-6 sm:*:py-2 lg:*:py-1 xl:*:py-3">
              <li>
                <span class="rows__name">Calidades en catálogo</span>
                <p>
                  Crepé (<a class="link" href="/catalogo/cra0cr">CRA0CR</a>,{' '}
                  <a class="link" href="/catalogo/cra0zg">CRA0ZG</a>), crepé liga (
                  <a class="link" href="/catalogo/cla0cr">CLA0CR</a>) y crepé negro (
                  <a class="link" href="/catalogo/crn0cr">CRN0CR</a>,{' '}
                  <a class="link" href="/catalogo/crn0zg">CRN0ZG</a>).
                </p>
              </li>
              <li>
                <span class="rows__name">Compuestos especiales</span>
                <p>
                  Hule polibutadieno estireno (SBR) multicolor y cargas
                  laminadas en rama.
                </p>
              </li>
              <li>
                <span class="rows__name">Fierrajes y marcajes</span>
                <p>
                  Fierrajes de catálogo 5, 6, 9 y 12 fierros; tarimas de
                  control en calibres 0.7, 0.9 y 1.2.
                </p>
              </li>
              <li>
                <span class="rows__name">Colores y venta</span>
                <p>
                  Ámbar, oscura, rojiza, blanco, café y negro, más igualación a
                  la medida.{' '}
                  <span data-assumed="">
                    Cotización directa por volumen y calibre.
                  </span>
                </p>
              </li>
            </ul>
            <p class="mt-8 sm:mt-3 lg:mt-2 xl:mt-4">
              <a class="link" href="/contacto">
                Cotizar lote de láminas en planta
              </a>
            </p>
          </div>
          <figure class="span-6 start-7 m-0 h-[360px] overflow-hidden rounded-lg max-sm:mt-8 sm:h-[min(560px,var(--ly-fit))] sm:max-lg:col-span-6 lg:h-[min(440px,var(--ly-fit))] xl:h-[min(500px,var(--ly-fit))]">
            <Picture
              slug="molino-laminador"
              layout="cover"
              class="frame__img"
              alt="Operador en planta alimentando lámina de hule color crema en el molino laminador industrial"
              sizes="(max-width: 639px) 480px, 768px"
            />
          </figure>
        </div>
      </section>
    </main>
  )
}
