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

function LaminasPage() {
  return (
    <main id="top">
      <section
        class="hero hero--photo"
        id="laminas-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="laminas-h"
      >
        <Picture
          slug="stand-calandra"
          pictureClass="hero__bg"
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
              <h1 id="laminas-h">
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
        class="section"
        id="calidades"
        aria-labelledby="calidades-h"
      >
        <div class="wrap">
          <div class="section-head">
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
          <div class="grid">
            <article class="card card--row card--open span-5">
              <h3>Elegir crepé para tonos claros y contraste</h3>
              <p>
                Ofrece acabado limpio en ámbar, blanco y negro, pensado para
                calzado casual donde el canto de la lámina queda a la vista.
              </p>
              <a class="card__link link" href="/catalogo/cra0cr">
                Ver ficha SKU CRA0CR
              </a>
              <div class="panel">
                <Picture
                  slug="cra0cr"
                  class="frame__img"
                  alt="Muestra macro de lámina de hule crepé en tono ámbar con huella crepé uniforme"
                  sizes="(max-width: 1023px) 480px, 768px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-4">
              <h3>Elegir crepé liga para elasticidad y tono cálido</h3>
              <p>
                Formulado en variantes ámbar, oscura y rojiza con textura crepé
                clásica para suelas cosidas o pegadas que exigen flexión
                constante.
              </p>
              <a class="card__link link" href="/catalogo/cla0cr">
                Ver ficha SKU CLA0CR
              </a>
              <div class="panel">
                <Picture
                  slug="cla0cr"
                  class="frame__img"
                  alt="Muestra macro de lámina de hule crepé liga en tono ámbar con grabado crepé granulado"
                  sizes="(max-width: 1023px) 480px, 768px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-3">
              <h3>Elegir crepé negro para trabajo pesado</h3>
              <p>
                Compuesto cerrado en color negro para pisos de uso continuo
                donde se prioriza resistencia a la abrasión y uniformidad de
                lote.
              </p>
              <a class="card__link link" href="/catalogo/crn0cr">
                Ver ficha SKU CRN0CR
              </a>
              <div class="panel">
                <Picture
                  slug="crn0cr"
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
        class="section ground-brand"
        id="grabados"
        aria-labelledby="grabados-h"
      >
        <div class="wrap">
          <div class="section-head section-head--row">
            <div>
              <h2 id="grabados-h">
                Láminas con grabado de prensa y colores de línea
              </h2>
              <p>
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
          <div class="grid grid--top">
            <div class="span-5 stack-2">
              <p>
                Además de la carta crepé, laminamos hule polibutadieno estireno
                (SBR) en rojo, amarillo, azul, verde, naranja y blanco, así
                como cargas laminadas en rama y colores a la medida para
                colecciones que piden suelas o entresuelas de color sólido.
              </p>
              <ul class="rows rows--spec tabular-nums">
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
              class="develop span-4"
              data-moment="picture-develops"
            >
              <Picture
                slug="laminas"
                class="frame__img"
                alt="Estiba de láminas de hule polibutadieno estireno SBR en colores rojo, amarillo, azul, blanco, verde y naranja"
                sizes="(max-width: 639px) 480px, 768px"
              />
            </figure>
            <figure class="pl-photo span-3">
              <Picture
                slug="crn0zg"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé negro con grabado zig-zag en espiga"
                sizes="480px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="especificaciones"
        aria-labelledby="especificaciones-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6">
            <div class="section-head">
              <h2 id="especificaciones-h">
                Especificaciones de fierraje y estiba
              </h2>
              <p>
                Laminamos en tren continuo con control de espesor por tarima y
                formulamos cargas laminadas en rama según la dureza que pide tu
                orden de trabajo.
              </p>
            </div>
            <ul class="rows rows--spec tabular-nums">
              <li>
                <span class="rows__name">Calidades en catálogo</span>
                <p>
                  Crepé (<a href="/catalogo/cra0cr">CRA0CR</a>,{' '}
                  <a href="/catalogo/cra0zg">CRA0ZG</a>), crepé liga (
                  <a href="/catalogo/cla0cr">CLA0CR</a>) y crepé negro (
                  <a href="/catalogo/crn0cr">CRN0CR</a>,{' '}
                  <a href="/catalogo/crn0zg">CRN0ZG</a>).
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
            <p class="planta-cta">
              <a class="link" href="/contacto">
                Cotizar lote de láminas en planta
              </a>
            </p>
          </div>
          <figure class="develop span-6 start-7">
            <Picture
              slug="molino-laminador"
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
