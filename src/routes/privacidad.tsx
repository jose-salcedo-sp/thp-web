import { createFileRoute } from '@tanstack/solid-router'
import { For } from 'solid-js'
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

function PrivacidadPage() {
  return (
    <main id="top">
      <section
        class="hero hero--photo"
        id="privacidad-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="privacidad-h"
      >
        <Picture
          slug="stand-almacen"
          pictureClass="hero__bg"
          dataSource="library"
          alt="Almacén industrial con tarimas de láminas de hule y plástico en estantería metálica"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker tabular-nums">
                <span class="dot" aria-hidden="true" />
                Transformadora de Hules y Plásticos · LFPDPPP · Zapopan, Jalisco
              </p>
              <h1 id="privacidad-h">
                Aviso de privacidad de láminas y suelas
              </h1>
              <p class="hero__lead tabular-nums">
                Transformadora de Hules y Plásticos, con domicilio en Las Flores
                1643, Colonia La Florida, C.P. 45234, Zapopan, Jalisco, México,
                es responsable del tratamiento de los datos personales que nos
                proporcionas al solicitar una cotización.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/contacto">
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="#creditos">
                  Ver créditos fotográficos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="privacidad-uso"
        aria-labelledby="privacidad-uso-h"
      >
        <div class="wrap grid grid--top">
          <div class="span-6">
            <div class="section-head">
              <h2 id="privacidad-uso-h">
                Uso de datos de hule y derechos ARCO
              </h2>
              <p>
                Los datos recabados en nuestro formulario de contacto se
                utilizan únicamente para elaborar cotizaciones de láminas,
                suelas y artículos de hule, dar seguimiento comercial a tus
                órdenes y facturar pedidos autorizados.
              </p>
            </div>
            {/* TODO cliente: texto oficial LFPDPPP */}
            <ul class="rows rows--spec tabular-nums">
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
            class="develop span-6 start-7"
            data-moment="picture-develops"
          >
            <Picture
              slug="planta"
              class="frame__img"
              alt="Nave de molienda y laminado de THP en Zapopan con tarimas de láminas de hule marcadas en calibres 0.7, 0.9 y 1.2"
              sizes="768px"
            />
          </figure>
        </div>
      </section>

      <section
        class="section"
        id="creditos"
        aria-labelledby="creditos-h"
      >
        <div class="wrap grid grid--top creditos-grid">
          <div class="span-6 creditos-col">
            <div class="section-head">
              <h2 id="creditos-h">
                Créditos fotográficos de láminas y suelas
              </h2>
              <p>
                Atribución de las fotografías de apoyo industrial publicadas
                bajo licencias abiertas de Wikimedia Commons.
              </p>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Licencia</th>
                    <th scope="col">Fuente</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={[...photoCredits]}>
                    {(row) => (
                      <tr>
                        <td>{row.tema}</td>
                        <td>{row.autor}</td>
                        <td>
                          <a
                            class="link"
                            href={row.licenciaUrl}
                            rel="noopener noreferrer"
                          >
                            {row.licencia}
                          </a>
                        </td>
                        <td>
                          <a
                            class="link"
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
          <figure class="develop creditos-photo span-6 start-7">
            <Picture
              slug="stand-muestras-crepe"
              dataSource="library"
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