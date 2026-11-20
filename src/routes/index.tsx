import { createFileRoute } from '@tanstack/solid-router'
import { Picture } from '../components/Picture'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'THP: Fabricante de láminas y suelas de hule en Zapopan',
      description:
        'Fabricamos láminas de hule crepé, suelas para calzado y desarrollos a la medida en Zapopan, Jalisco, con más de 50 años en planta. Fierrajes 5 al 12.',
      path: '/',
      image: '/img/antifatiga/1600.jpg',
    }),
  component: HomePage,
})

function HomePage() {
  return (
    <main id="top">
      <section
        class="hero hero--photo"
        id="inicio"
        data-enter=""
        data-calm="left"
        aria-labelledby="hero-h"
      >
        <Picture
          slug="antifatiga"
          pictureClass="hero__bg"
          alt="Textura macro de tapete industrial de hule negro antifatiga con celdas octagonales moldeadas en planta"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker">
                <span class="dot" aria-hidden="true" />
                Más de 50 años fabricando en Zapopan · Fierrajes 5, 6, 9 y 12
              </p>
              <h1 id="hero-h">
                Láminas y suelas de hule para calzado e industria
              </h1>
              <p class="hero__lead">
                Transformamos el hule en nuestra planta de Zapopan desde hace
                más de 50 años. Laminamos compuestos en fierrajes 5, 6, 9 y 12,
                moldeamos suelas y formulamos colores a la medida para talleres
                y fábricas.
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
                  Ver catálogo de láminas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="lineas"
        aria-labelledby="lineas-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="lineas-h">Líneas de producción en planta</h2>
            <p>
              Fabricamos artículos de hule y plástico con entrega directa desde
              Jalisco. Cada lote sale de nuestros molinos y prensas con el
              calibre, el grabado y el tono que pide la orden de trabajo.
            </p>
          </div>
          <div class="grid">
            <article class="card card--row card--open span-5">
              <h3>Laminar hojas de hule por calibre</h3>
              <p>
                Producimos láminas en calidades crepé, crepé liga y crepé negro,
                además de hule polibutadieno estireno en colores sólidos para
                troquelado de suela.
              </p>
              <a class="card__link link" href="/laminas">
                Ver línea de láminas
              </a>
              <div class="panel">
                <Picture
                  slug="laminas"
                  class="frame__img"
                  alt="Estiba de láminas de hule polibutadieno estireno en colores rojo, amarillo, azul, blanco, verde y naranja"
                  sizes="(max-width: 1023px) 100vw, 519px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-4">
              <h3>Moldear suelas y tapetes de uso rudo</h3>
              <p>
                Prensamos suelas para calzado deportivo y casual, así como
                tapetes antifatiga y sanitizantes moldeados en hule negro de
                alta densidad.
              </p>
              <a class="card__link link" href="/suelas">
                Ver línea de suelas
              </a>
              <div class="panel">
                <Picture
                  slug="suela"
                  class="frame__img"
                  alt="Suela de hule negro moldeada en prensa con relieve antiderrapante para calzado deportivo y casual"
                  sizes="(max-width: 1023px) 100vw, 410px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-3">
              <h3>Formular cargas y desarrollos a la medida</h3>
              <p>
                Asesoramos a cada fabricante para ajustar dureza, color o diseño
                de molde según el piso y la exigencia de su calzado.
              </p>
              <a class="card__link link" href="/contacto">
                Cotizar un desarrollo
              </a>
              <div class="panel">
                <Picture
                  slug="cargas-laminadas"
                  class="frame__img"
                  alt="Racks metálicos en planta con cargas laminadas de hule en rama listas para vulcanizado"
                  sizes="(max-width: 1023px) 100vw, 302px"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        class="section statement"
        id="proceso"
        data-moment="word-highlight"
        aria-labelledby="proceso-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="proceso-h">De la carga en rama a la lámina calibrada</h2>
          </div>
          <p class="mo-wh__text">
            El hule pasa por molienda, mezcla de pigmentos y laminado continuo
            antes de entrar a las prensas de grabado. Controlar{' '}
            <strong>todo el tren en una sola nave</strong> evita variaciones de
            espesor entre un pedido y el siguiente.
          </p>
        </div>
      </section>

      <section
        class="section"
        id="catalogo-home"
        aria-labelledby="catalogo-home-h"
      >
        <div class="wrap">
          <div class="section-head section-head--row">
            <div>
              <h2 id="catalogo-home-h">Catálogo de láminas de hule crepé</h2>
              <p>
                Cinco referencias de línea listas para cotizar por fierraje y
                color. Selecciona una referencia para revisar sus calibres o
                abrir su ficha técnica.
              </p>
            </div>
            <a class="link" href="/catalogo">
              Ver catálogo
            </a>
          </div>
          <div class="grid">
            <div class="span-6 stack-2">
              <p class="t-label">Grabado crepé · Fierrajes 5, 6, 9 y 12</p>
              <ul class="rows">
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo?sku=cla0cr">
                      Crepé liga grabado crepé
                    </a>
                  </span>
                  <span class="rows__value">SKU CLA0CR</span>
                  <p>
                    Calidad crepé liga con textura crepé tradicional en tonos
                    ámbar, oscura y rojiza.{' '}
                    <span data-assumed="">Precio según volumen.</span>
                  </p>
                </li>
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo?sku=cra0cr">
                      Crepé ámbar grabado crepé
                    </a>
                  </span>
                  <span class="rows__value">SKU CRA0CR</span>
                  <p>
                    Lámina de calidad crepé en colores ámbar, negro y blanco,
                    más variante{' '}
                    <a href="/catalogo?sku=crn0cr">crepé negro (SKU CRN0CR)</a>.
                  </p>
                </li>
              </ul>
            </div>
            <div class="span-6 stack-2">
              <p class="t-label">Grabado zig-zag · Fierrajes 5, 6, 9 y 12</p>
              <ul class="rows">
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo?sku=cra0zg">
                      Crepé ámbar grabado zig-zag
                    </a>
                  </span>
                  <span class="rows__value">SKU CRA0ZG</span>
                  <p>
                    Lámina de calidad crepé con relieve en espiga zig-zag en
                    tonos ámbar, negro y blanco.{' '}
                    <span data-assumed="">Precio según volumen.</span>
                  </p>
                </li>
                <li>
                  <span class="rows__name">
                    <a class="link" href="/catalogo?sku=crn0zg">
                      Crepé negro grabado zig-zag
                    </a>
                  </span>
                  <span class="rows__value">SKU CRN0ZG</span>
                  <p>
                    Lámina de crepé negro con grabado zig-zag de tracción
                    profunda en fierrajes 5, 6, 9 y 12.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid strip-grid">
            <a
              class="m-zoom pl-photo span-3"
              href="/catalogo?sku=cla0cr"
              aria-label="Ver ficha técnica de Crepé liga grabado crepé (SKU CLA0CR)"
            >
              <Picture
                slug="cla0cr"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé liga en tono ámbar con grabado crepé granulado"
                sizes="480px"
              />
            </a>
            <a
              class="m-zoom pl-photo span-3"
              href="/catalogo?sku=cra0cr"
              aria-label="Ver ficha técnica de Crepé ámbar grabado crepé (SKU CRA0CR)"
            >
              <Picture
                slug="cra0cr"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé ámbar con huella crepé uniforme"
                sizes="480px"
              />
            </a>
            <a
              class="m-zoom pl-photo span-3"
              href="/catalogo?sku=cra0zg"
              aria-label="Ver ficha técnica de Crepé ámbar grabado zig-zag (SKU CRA0ZG)"
            >
              <Picture
                slug="cra0zg"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé ámbar con relieve zig-zag en espiga"
                sizes="480px"
              />
            </a>
            <a
              class="m-zoom pl-photo span-3"
              href="/catalogo?sku=crn0zg"
              aria-label="Ver ficha técnica de Crepé negro grabado zig-zag (SKU CRN0ZG)"
            >
              <Picture
                slug="crn0zg"
                class="frame__img"
                alt="Muestra macro de lámina de hule crepé negro con grabado zig-zag de tracción profunda"
                sizes="480px"
              />
            </a>
          </div>
        </div>
      </section>

      <section
        class="section ground-brand"
        id="planta"
        aria-labelledby="planta-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6">
            <div class="section-head">
              <h2 id="planta-h">Planta de molienda y laminado en Zapopan</h2>
              <p>
                Entendemos nuestra permanencia en el mercado como resultado del
                trabajo diario basado en el respeto hacia el cliente y hacia el
                producto. Atendemos de manera directa en nuestra planta de la
                colonia La Florida sin distribuidores intermedios.
              </p>
            </div>
            <ul class="rows rows--spec">
              <li>
                <span class="rows__name">Operación continua</span>
                <p>Más de 50 años fabricando hule y plástico en Jalisco.</p>
              </li>
              <li>
                <span class="rows__name">Calibres de línea</span>
                <p>
                  Fierrajes 5, 6, 9 y 12 más espesores de planta en 0.7, 0.9 y
                  1.2.
                </p>
              </li>
              <li>
                <span class="rows__name">Compuestos y proceso</span>
                <p>
                  Hule crepé, crepé liga, crepé negro y polibutadieno estireno
                  (SBR) en molino laminador.
                </p>
              </li>
              <li>
                <span class="rows__name">Ubicación y horario</span>
                <p>
                  Las Flores 1643, Col. La Florida, 45234 Zapopan, Jalisco ·
                  Lunes a sábados de 7:00 a 15:00.
                </p>
              </li>
            </ul>
            <p class="planta-cta">
              <a class="link" href="/contacto">
                Ver ubicación y contacto de planta
              </a>
            </p>
          </div>
          <figure
            class="develop span-6 start-7"
            data-moment="picture-develops"
          >
            <Picture
              slug="planta"
              class="frame__img"
              alt="Nave de molienda y laminado de THP en Zapopan con tarimas de láminas de hule marcadas en calibres 0.7, 0.9 y 1.2"
              sizes="(max-width: 639px) 480px, 768px"
            />
          </figure>
        </div>
      </section>
    </main>
  )
}
