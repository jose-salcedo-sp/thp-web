import { createFileRoute } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { Hero } from '../components/Hero'
import { Picture } from '../components/Picture'
import { photoCredits } from '../lib/credits'
import { breadcrumbLd, jsonLd, seo } from '../lib/seo'

export const Route = createFileRoute('/privacidad')({
  head: () => ({
    ...seo({
      title: 'THP: Aviso de privacidad de láminas y suelas de hule',
      description:
        'Consulta el aviso de privacidad de Transformadora de Hules y Plásticos en Zapopan, Jalisco, para el tratamiento de datos de cotizaciones.',
      path: '/privacidad',
      image: '/img/planta/1600.jpg',
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: 'Inicio', path: '/' },
          { name: 'Aviso de privacidad', path: '/privacidad' },
        ]),
      ),
    ],
  }),
  component: PrivacidadPage,
})

const cell =
  'border-b border-line-strong px-1 py-2 text-left align-top max-sm:align-middle max-sm:[overflow-wrap:anywhere] sm:px-2 sm:py-1.5 xl:px-3 xl:py-2'
const headCell = `${cell} font-medium text-muted`
const cellLink = 'link max-sm:inline-flex max-sm:min-h-11 max-sm:items-center'

function PrivacidadPage() {
  return (
    <main id="top">
      <Hero
        id="privacidad-hero"
        headingId="privacidad-h"
        title="Aviso de privacidad"
        line="Planta en Zapopan, Jalisco."
        href="/contacto"
        slug="stand-almacen"
        source="library"
        alt="Almacén industrial con tarimas de láminas de hule y plástico en estantería metálica"
      />

      <section
        class="section [--h:1] [--hm:2]"
        id="privacidad-uso"
        aria-labelledby="privacidad-uso-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6 sm:max-lg:col-span-6">
            <div class="section-head mb-12 sm:mb-3 lg:mb-2 xl:mb-6">
              <h2 id="privacidad-uso-h">
                Uso de datos de hule y derechos ARCO
              </h2>
              <p class="sm:max-xl:text-body">
                Los datos recabados en nuestro formulario de contacto se
                utilizan únicamente para elaborar cotizaciones de láminas,
                suelas y artículos de hule, dar seguimiento comercial a tus
                órdenes y facturar pedidos autorizados.
              </p>
            </div>
            {/* TODO cliente: texto oficial LFPDPPP */}
            <ul class="rows rows--spec tabular-nums *:py-6 sm:*:py-2 lg:*:py-1 xl:*:py-3">
              <li>
                <span class="rows__name">Responsable y domicilio</span>
                <p>
                  Transformadora de Hules y Plásticos en Las Flores 1643, Col.
                  La Florida, 45234 Zapopan, Jalisco.
                </p>
              </li>
              <li>
                <span class="rows__name">Datos recabados</span>
                <p>
                  Nombre, empresa o taller, correo electrónico, teléfono y
                  especificaciones técnicas de pedido.
                </p>
              </li>
              <li>
                <span class="rows__name">Transferencias y LFPDPPP</span>
                <p>
                  No transferimos datos personales a terceros sin tu
                  consentimiento, salvo las excepciones previstas en la LFPDPPP.
                </p>
              </li>
              <li>
                <span class="rows__name">Derechos ARCO y revocación</span>
                <p>
                  Solicita acceso, rectificación, cancelación u oposición en{' '}
                  <a class="link" href="mailto:info@thp.com.mx">
                    info@thp.com.mx
                  </a>{' '}
                  o en los teléfonos (33) 3684-2909 y (33) 3684-3037 de lunes a
                  sábados de 7:00 a 15:00.
                </p>
              </li>
            </ul>
          </div>
          <figure
            class="span-6 start-7 m-0 h-[360px] overflow-hidden rounded-lg max-sm:mt-8 sm:h-[min(560px,var(--ly-fit))] sm:max-lg:col-span-6 lg:h-[min(440px,var(--ly-fit))] xl:h-[min(600px,var(--ly-fit))]"
            data-moment="picture-develops"
          >
            <Picture
              slug="planta"
              layout="cover"
              class="frame__img"
              alt="Nave de molienda y laminado de THP en Zapopan con tarimas de láminas de hule marcadas en calibres 0.7, 0.9 y 1.2"
              sizes="768px"
            />
          </figure>
        </div>
      </section>

      <section
        class="section [--h:1] [--hm:2]"
        id="creditos"
        aria-labelledby="creditos-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6 sm:max-lg:col-span-6">
            <div class="section-head mb-4 sm:max-lg:mb-2 lg:max-xl:mb-1 lg:max-xl:gap-1">
              <h2 id="creditos-h">
                Créditos fotográficos de láminas y suelas
              </h2>
              <p class="sm:max-xl:text-body">
                Atribución de las fotografías de apoyo industrial publicadas
                bajo licencias abiertas de Wikimedia Commons.
              </p>
            </div>
            <div class="overflow-x-auto [-webkit-overflow-scrolling:touch] max-sm:overflow-x-clip">
              <table class="w-full border-collapse text-small leading-[1.4] max-sm:table-fixed max-sm:text-label max-sm:leading-[1.3]">
                <thead>
                  <tr>
                    <th scope="col" class={headCell}>Imagen</th>
                    <th scope="col" class={headCell}>Autor</th>
                    <th scope="col" class={headCell}>Licencia</th>
                    <th scope="col" class={headCell}>Fuente</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={[...photoCredits]}>
                    {(row) => (
                      <tr>
                        <td class={cell}>{row.tema}</td>
                        <td class={cell}>{row.autor}</td>
                        <td class={cell}>
                          <a
                            class={cellLink}
                            href={row.licenciaUrl}
                            rel="noopener noreferrer"
                          >
                            {row.licencia}
                          </a>
                        </td>
                        <td class={cell}>
                          <a
                            class={cellLink}
                            href={row.fuenteUrl}
                            rel="noopener noreferrer"
                          >
                            Wikimedia Commons
                          </a>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
          <figure class="span-6 start-7 m-0 h-[500px] overflow-hidden rounded-lg max-sm:mt-6 sm:h-[min(440px,var(--ly-fit))] sm:max-lg:col-span-6 lg:h-[min(640px,var(--ly-fit))]">
            <Picture
              slug="stand-muestras-crepe"
              dataSource="library"
              layout="cover"
              class="frame__img"
              alt="Muestras de hule crepé natural y coloreado en distintos acabados de laminado"
              sizes="768px"
            />
          </figure>
        </div>
      </section>
    </main>
  )
}