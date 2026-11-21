import { createFileRoute } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { Hero } from '../components/Hero'
import { Picture } from '../components/Picture'
import { calidadLabels, grabadoLabels, productos } from '../lib/catalogue'
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

const trioPanel =
  'panel [--p-h:172px] sm:[--p-h:220px] lg:[--p-h:148px] xl:[--p-h:224px]'

const skuCard =
  'card flex flex-col gap-1.5 border-line px-3 py-2 sm:p-3 lg:gap-2 xl:gap-3 xl:p-4'

function HomePage() {
  return (
    <main id="top">
      <Hero
        id="inicio"
        headingId="hero-h"
        title="Láminas y suelas de hule"
        line="Más de 50 años fabricándolas en Zapopan."
        href="/contacto"
        slug="antifatiga"
        alt="Textura macro de tapete industrial de hule negro antifatiga con celdas octagonales moldeadas en planta"
      />

      <section
        class="section [--h:1] [--hm:2]"
        id="lineas"
        aria-labelledby="lineas-h"
      >
        <div class="wrap">
          <div class="section-head lg:max-xl:mb-4">
            <h2 id="lineas-h">Líneas de producción en planta</h2>
            <p>
              Fabricamos artículos de hule y plástico con entrega directa desde
              Jalisco. Cada lote sale de nuestros molinos y prensas con el
              calibre, el grabado y el tono que pide la orden de trabajo.
            </p>
          </div>
          <div class="grid sm:max-lg:grid-cols-3">
            <article class="card card--row card--open span-5 sm:max-lg:col-auto">
              <h3>Laminar hojas de hule por calibre</h3>
              <p>
                Producimos láminas en calidades crepé, crepé liga y crepé negro,
                además de hule polibutadieno estireno en colores sólidos para
                troquelado de suela.
              </p>
              <a class="card__link link" href="/laminas">
                Ver línea de láminas
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="laminas"
                  layout="fill"
                  class="frame__img"
                  alt="Estiba de láminas de hule polibutadieno estireno en colores rojo, amarillo, azul, blanco, verde y naranja"
                  sizes="(max-width: 1023px) 100vw, 519px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-4 sm:max-lg:col-auto lg:max-xl:col-span-4">
              <h3>Moldear suelas y tapetes de uso rudo</h3>
              <p>
                Prensamos suelas para calzado deportivo y casual, así como
                tapetes antifatiga y sanitizantes moldeados en hule negro de
                alta densidad.
              </p>
              <a class="card__link link" href="/suelas">
                Ver línea de suelas
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="suela"
                  layout="fill"
                  class="frame__img"
                  alt="Suela de hule negro moldeada en prensa con relieve antiderrapante para calzado deportivo y casual"
                  sizes="(max-width: 1023px) 100vw, 410px"
                />
              </div>
            </article>

            <article class="card card--row card--open span-3 sm:max-lg:col-auto">
              <h3>Formular cargas y desarrollos a la medida</h3>
              <p>
                Asesoramos a cada fabricante para ajustar dureza, color o diseño
                de molde según el piso y la exigencia de su calzado.
              </p>
              <a class="card__link link" href="/contacto">
                Cotizar un desarrollo
              </a>
              <div class={trioPanel}>
                <Picture
                  slug="cargas-laminadas"
                  layout="fill"
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
          <p class="mo-wh__text max-w-[54ch] text-h3 leading-[1.35]">
            El hule pasa por molienda, mezcla de pigmentos y laminado continuo
            antes de entrar a las prensas de grabado. Controlar{' '}
            <strong>todo el tren en una sola nave</strong> evita variaciones de
            espesor entre un pedido y el siguiente.
          </p>
        </div>
      </section>

      <section
        class="section h-auto min-h-[calc(var(--h,1)*100svh)] [--h:2] [--hm:2] max-sm:min-h-[calc(var(--hm,var(--h,1))*100lvh)] sm:max-lg:[--h:1]"
        id="catalogo-home"
        aria-labelledby="catalogo-home-h"
      >
        <div class="wrap h-auto">
          <div class="section-head section-head--row mb-3 xl:mb-6">
            <div>
              <h2 id="catalogo-home-h">Catálogo de láminas de hule crepé</h2>
              <p class="sm:max-xl:text-body">
                Cinco referencias de línea listas para cotizar por fierraje y
                color. Selecciona una referencia para revisar sus calibres o
                abrir su ficha técnica.
              </p>
            </div>
            <a class="link" href="/catalogo">
              Ver catálogo
            </a>
          </div>
          <div class="grid gap-y-2 sm:gap-y-3 lg:gap-y-4 xl:gap-y-6">
            <For each={productos.slice(0, 3)}>
              {(prod) => (
                <a
                  class={[skuCard, 'span-4 sm:max-lg:col-span-4']}
                  href={`/catalogo/${prod.sku}`}
                >
                  <div class="m-zoom relative aspect-[4/3] overflow-clip rounded-md bg-ground max-sm:max-h-[132px] sm:max-lg:max-h-[120px]">
                    <Picture
                      slug={prod.sku}
                      layout="cover"
                      class="frame__img"
                      alt={prod.alt}
                      sizes="(max-width: 639px) 480px, 410px"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <h3 class="text-body leading-[1.35] font-medium tracking-[-0.01em] text-ink">
                      {prod.nombre}
                    </h3>
                    <p class="text-body leading-[1.45] text-ink sm:max-lg:leading-[1.35]">
                      {calidadLabels[prod.calidad]} · Grabado{' '}
                      {grabadoLabels[prod.grabado].toLowerCase()} · Fierrajes{' '}
                      <span class="tabular-nums">5, 6, 9 y 12</span> ·{' '}
                      <span data-assumed="">Precio según volumen</span>
                    </p>
                  </div>
                </a>
              )}
            </For>
          </div>
          <div class="grid mt-2 gap-y-2 sm:mt-3 sm:gap-y-3 lg:mt-4 lg:gap-y-4 xl:mt-6 xl:gap-y-6">
            <For each={productos.slice(3, 5)}>
              {(prod) => (
                <a
                  class={[skuCard, 'span-6 sm:max-lg:col-span-6']}
                  href={`/catalogo/${prod.sku}`}
                >
                  <div class="m-zoom relative aspect-[4/3] overflow-clip rounded-md bg-ground max-sm:max-h-[132px] sm:max-lg:max-h-[120px]">
                    <Picture
                      slug={prod.sku}
                      layout="cover"
                      class="frame__img"
                      alt={prod.alt}
                      sizes="(max-width: 639px) 480px, 628px"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <h3 class="text-body leading-[1.35] font-medium tracking-[-0.01em] text-ink">
                      {prod.nombre}
                    </h3>
                    <p class="text-body leading-[1.45] text-ink sm:max-lg:leading-[1.35]">
                      {calidadLabels[prod.calidad]} · Grabado{' '}
                      {grabadoLabels[prod.grabado].toLowerCase()} · Fierrajes{' '}
                      <span class="tabular-nums">5, 6, 9 y 12</span> ·{' '}
                      <span data-assumed="">Precio según volumen</span>
                    </p>
                  </div>
                </a>
              )}
            </For>
          </div>
        </div>
      </section>

      <section
        class="section ground-brand [--h:1] [--hm:2] [--muted:var(--p-accent-ink)]"
        id="planta"
        aria-labelledby="planta-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6 sm:max-lg:col-span-6">
            <div class="section-head mb-12 sm:mb-3 lg:mb-2 xl:mb-6">
              <h2 id="planta-h">Planta de molienda y laminado en Zapopan</h2>
              <p class="sm:max-xl:text-body">
                Entendemos nuestra permanencia en el mercado como resultado del
                trabajo diario basado en el respeto hacia el cliente y hacia el
                producto. Atendemos de manera directa en nuestra planta de la
                colonia La Florida sin distribuidores intermedios.
              </p>
            </div>
            <ul class="rows rows--spec tabular-nums *:py-6 sm:*:py-2 lg:*:py-1 xl:*:py-3">
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
            <p class="mt-8 sm:mt-3 lg:mt-2 xl:mt-4">
              <a class="link" href="/contacto">
                Ver ubicación y contacto de planta
              </a>
            </p>
          </div>
          <figure
            class="span-6 start-7 m-0 h-[360px] overflow-hidden rounded-lg max-sm:mt-8 sm:h-[min(560px,var(--ly-fit))] sm:max-lg:col-span-6 lg:h-[min(500px,var(--ly-fit))]"
            data-moment="picture-develops"
          >
            <Picture
              slug="planta"
              layout="cover"
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
