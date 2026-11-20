import { createFileRoute } from '@tanstack/solid-router'
import { Picture } from '../components/Picture'
import { SITE_URL, jsonLd, seo } from '../lib/seo'

export const Route = createFileRoute('/suelas')({
  head: () => ({
    ...seo({
      title: 'Suelas de hule para calzado y tapetes | THP Zapopan',
      description:
        'Fabricación de suelas de hule para calzado deportivo y casual, moldes a la medida y tapetes de hule antifatiga y sanitizantes hechos en Zapopan.',
      path: '/suelas',
      image: '/img/stand-suelas/1600.jpg',
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
            name: 'Suelas',
            item: `${SITE_URL}/suelas`,
          },
        ],
      }),
    ],
  }),
  component: SuelasPage,
})

function SuelasPage() {
  return (
    <main id="top">
      <section
        class="hero hero--photo"
        id="suelas-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="suelas-h"
      >
        <Picture
          slug="stand-suelas"
          pictureClass="hero__bg"
          dataSource="library"
          alt="Par de suelas de hule negro moldeadas con dibujo de tracción sobre banco de madera en taller"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker tabular-nums">
                <span class="dot" aria-hidden="true" />
                Más de 50 años en planta · Suelas deportivas, casuales y tapetes
                industriales
              </p>
              <h1 id="suelas-h">
                Suelas de hule y moldes para calzado
              </h1>
              <p class="hero__lead tabular-nums">
                Fabricamos suelas moldeadas para calzado deportivo y casual
                junto con tapetes industriales de hule en Zapopan. Desarrollamos
                compuestos y matricería propia desde hace más de 50 años para
                marcas que buscan tracción y durabilidad en cada par.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/contacto">
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="#matriceria">
                  Ver matricería y desarrollos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="pisos"
        aria-labelledby="pisos-h"
      >
        <div class="wrap">
          <div class="section-head section-head--row">
            <div>
              <h2 id="pisos-h">Suelas para cancha, calle y uso diario</h2>
              <p>
                Prensamos pisos con dibujo de tracción multidireccional, tacos
                para fútbol y relieves de agarre para zapato casual. Cada
                corrida se vulcaniza vigilando tiempos de prensa y desmolde para
                evitar rebabas o deformaciones en el enfraje.
              </p>
            </div>
            <a class="link" href="/contacto">
              Cotizar suelas
            </a>
          </div>
          <div class="grid pisos-grid">
            <figure class="pl-photo span-6">
              <Picture
                slug="suelas"
                class="frame__img"
                alt="Caja de planta con lotes de suelas de hule negro y rojo con tacos para calzado de fútbol"
                sizes="(max-width: 639px) 480px, 768px"
              />
            </figure>
            <figure class="pl-photo span-6">
              <Picture
                slug="suela"
                class="frame__img"
                alt="Suela de hule negro moldeada en prensa con zonas de tracción multidireccional para calzado deportivo y casual"
                sizes="(max-width: 639px) 480px, 768px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        class="section ground-brand"
        id="matriceria"
        aria-labelledby="matriceria-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="matriceria-h">
              Moldes y desarrollos de suela a la medida
            </h2>
            <p>
              Cuando un modelo nuevo necesita una huella propia, trabajamos con
              el área de diseño del cliente desde la carga laminada hasta la
              placa o molde metálico. Ajustamos la formulación del hule para
              responder a las características específicas del mercado al que
              pertenece su calzado.
            </p>
          </div>
          <div class="grid">
            <article class="card card--row card--open span-6">
              <h3>Desarrollar placas y moldes propios</h3>
              <p>
                Contamos con acervo de moldes y placas de grabado en planta
                para producir corridas repetibles temporada tras temporada.
              </p>
              <a class="card__link link" href="/contacto">
                Cotizar molde o placa
              </a>
              <div class="panel" data-moment="picture-develops">
                <Picture
                  slug="moldes"
                  class="frame__img"
                  alt="Estantería de matricería en planta con moldes metálicos y placa de grabado en espiga para suelas de hule"
                  sizes="(max-width: 639px) 480px, 768px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-6">
              <h3>Ajustar la formulación de hule en molino</h3>
              <p>
                Mezclamos cargas en rama para alcanzar la dureza y flexibilidad
                que pide el prototipo antes de pasar a prensa.
              </p>
              <a class="card__link link" href="/laminas">
                Ver cargas y láminas
              </a>
              <div class="panel">
                <Picture
                  slug="cargas-laminadas"
                  class="frame__img"
                  alt="Racks metálicos en planta con cargas laminadas de hule en rama formuladas para prensado de suelas"
                  sizes="(max-width: 639px) 480px, 768px"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="tapetes"
        aria-labelledby="tapetes-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6">
            <div class="section-head">
              <h2 id="tapetes-h">
                Tapetes de hule antifatiga y sanitizantes en México
              </h2>
              <p>
                El mismo dominio del hule moldeado nos permite fabricar tapetes
                industriales con sello THP hecho en México para estaciones de
                trabajo y accesos.
              </p>
            </div>
            <ul class="rows rows--spec">
              <li>
                <span class="rows__name">Tapete antifatiga octagonal</span>
                <p>
                  Moldeado en hule negro con retícula de celdas octagonales y
                  domos circulares de amortiguación para estaciones de trabajo
                  de pie.
                </p>
              </li>
              <li>
                <span class="rows__name">Tapete sanitizante con pines</span>
                <p>
                  Charola de hule negro con pines limpiadores en relieve, borde
                  de contención y grabado SANITIZANTE thp.com.mx.
                </p>
              </li>
              <li>
                <span class="rows__name">Identificación de planta</span>
                <p>
                  Piezas vulcanizadas con etiqueta moldeada THP FABRICADO EN
                  MEXICO para uso industrial y comercial.
                </p>
              </li>
            </ul>
            <p class="planta-cta">
              <a class="link" href="/contacto">
                Solicitar cotización de suelas o tapetes
              </a>
            </p>
          </div>
          <figure class="develop span-6 start-7">
            <Picture
              slug="sanitizante"
              class="frame__img"
              alt="Tapete sanitizante de hule negro moldeado con pines limpiadores y sello blanco THP FABRICADO EN MEXICO"
              sizes="(max-width: 639px) 480px, 768px"
            />
          </figure>
        </div>
      </section>
    </main>
  )
}
