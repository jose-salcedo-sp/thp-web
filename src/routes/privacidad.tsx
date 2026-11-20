import { createFileRoute } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { photoCredits } from '../lib/credits'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/privacidad')({
  head: () =>
    seo({
      title: 'Aviso de privacidad | Transformadora de Hules THP',
      description:
        'Consulta el aviso de privacidad de Transformadora de Hules y Plásticos en Zapopan, Jalisco, para el tratamiento de datos de cotizaciones.',
      path: '/privacidad',
    }),
  component: PrivacidadPage,
})

function PrivacidadPage() {
  return (
    <main id="top">
      <section class="section" aria-labelledby="privacidad-h">
        <div class="wrap stack-6">
          <div class="section-head">
            <h1 id="privacidad-h">Aviso de privacidad</h1>
            <p>
              Transformadora de Hules y Plásticos, con domicilio en Las Flores
              1643, Colonia La Florida, C.P. 45234, Zapopan, Jalisco, México, es
              responsable del tratamiento de los datos personales que nos
              proporcionas al solicitar una cotización.
            </p>
          </div>

          <section aria-labelledby="privacidad-uso-h">
            <h2 id="privacidad-uso-h">Uso de datos y derechos ARCO</h2>
            {/* TODO cliente: texto oficial LFPDPPP */}
            <div class="stack-4">
              <p>
                Los datos recabados en nuestro formulario de contacto (nombre,
                empresa, correo electrónico, teléfono y especificaciones de
                pedido) se utilizan únicamente para elaborar cotizaciones de
                láminas, suelas y artículos de hule, dar seguimiento comercial a
                tus órdenes y facturar pedidos autorizados.
              </p>
              <p>
                No transferimos tus datos personales a terceros ajenos a la
                operación comercial sin tu consentimiento, salvo las excepciones
                previstas en la Ley Federal de Protección de Datos Personales en
                Posesión de los Particulares (LFPDPPP).
              </p>
              <p>
                Para ejercer tus derechos de acceso, rectificación, cancelación
                u oposición (ARCO), o para revocar el consentimiento de uso de
                tus datos, envía una solicitud al correo{' '}
                <a href="mailto:info@thp.com.mx">info@thp.com.mx</a> o comunícate
                a los teléfonos (33) 3684-2909 y (33) 3684-3037 de lunes a
                sábados de 7:00 a 15:00.
              </p>
            </div>
          </section>

          <section id="creditos" aria-labelledby="creditos-h">
            <h2 id="creditos-h">Créditos fotográficos</h2>
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
                          <a href={row.licenciaUrl} rel="noopener noreferrer">
                            {row.licencia}
                          </a>
                        </td>
                        <td>
                          <a href={row.fuenteUrl} rel="noopener noreferrer">
                            Wikimedia Commons
                          </a>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}