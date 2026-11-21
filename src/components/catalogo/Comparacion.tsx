import { For } from 'solid-js'
import { SwatchDot } from '../Swatch'
import {
  type Producto,
  calidadLabels,
  colorLabels,
  grabadoLabels,
  productos,
  unir,
} from '../../lib/catalogue'

const filas = [
  { id: 'calidad', label: 'Calidad' },
  { id: 'grabado', label: 'Grabado' },
  { id: 'fierrajes', label: 'Fierrajes' },
  { id: 'colores', label: 'Colores' },
  { id: 'uso', label: 'Uso' },
] as const

type FilaId = (typeof filas)[number]['id']

const labelCell =
  'sticky left-0 z-10 border-r border-line bg-inherit px-3 py-3 text-left align-top text-body font-medium text-ink'
const valueCell = 'px-3 py-3 align-top text-body text-ink'

function valor(id: FilaId, producto: Producto): string {
  if (id === 'calidad') return calidadLabels[producto.calidad]
  if (id === 'grabado') return grabadoLabels[producto.grabado]
  if (id === 'fierrajes') return unir(producto.fierrajes)
  return producto.uso
}

export function Comparacion() {
  return (
    <section class="section h-auto min-h-0" id="tabla-catalogo" aria-labelledby="tabla-h">
      <div class="wrap">
        <div class="section-head">
          <h2 id="tabla-h">Comparación de las cinco referencias</h2>
          <p>
            Calidad, grabado, fierrajes, colores y el uso de cada lámina.
          </p>
        </div>
        <p class="mb-3 text-body text-ink xl:hidden">
          Desliza para ver las cinco referencias.
        </p>
        <div
          class="w-full min-w-0 overflow-x-auto"
          tabindex="0"
          role="region"
          aria-label="Comparación de las cinco referencias"
        >
          <table class="w-full min-w-[64rem] border-collapse text-left">
            <caption class="sr-only">
              Calidad, grabado, fierrajes, colores y uso de cada lámina
            </caption>
            <colgroup>
              <col class="w-[9.5rem]" />
              <For each={productos}>{() => <col />}</For>
            </colgroup>
            <thead>
              <tr class="border-b border-line-strong bg-ground">
                <th class="sticky left-0 z-10 border-r border-line bg-inherit px-3 py-3" scope="col">
                  <span class="sr-only">Atributo</span>
                </th>
                <For each={productos}>
                  {(prod) => (
                    <th class="px-3 py-3 align-bottom font-normal" scope="col">
                      <a class="link min-h-11 text-body" href={`/catalogo/${prod.sku}`}>
                        {prod.nombre}
                      </a>
                    </th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={filas}>
                {(fila) => (
                  <tr class="border-b border-line even:bg-ground odd:bg-card">
                    <th class={labelCell} scope="row">
                      {fila.label}
                    </th>
                    <For each={productos}>
                      {(prod) => (
                        <td class={[valueCell, fila.id === 'fierrajes' ? 'tabular-nums' : '']}>
                          {fila.id === 'colores' ? (
                            <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
                              <For each={prod.colores}>
                                {(col) => (
                                  <li class="inline-flex items-center gap-2">
                                    <SwatchDot color={col} />
                                    {colorLabels[col]}
                                  </li>
                                )}
                              </For>
                            </ul>
                          ) : fila.id === 'uso' ? (
                            <span class="font-medium">{valor(fila.id, prod)}</span>
                          ) : (
                            valor(fila.id, prod)
                          )}
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        <div class="mt-6">
          <a class="btn btn--primary" href="/contacto">
            Solicitar cotización
            <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
              <path class="m-arrow__stem" d="M1 6h8" />
              <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
