import { For } from 'solid-js'
import { Picture } from '../Picture'
import { SwatchDot } from '../Swatch'
import { type Producto, colorLabels, unir } from '../../lib/catalogue'

export function ReferenciaCard(props: { producto: Producto; spanClass: string; moment: boolean }) {
  return (
    <a
      class={['card flex h-full flex-col p-0', props.spanClass]}
      href={`/catalogo/${props.producto.sku}`}
    >
      <div
        class="m-zoom relative aspect-[3/2] w-full flex-none overflow-clip bg-ground"
        data-moment={props.moment ? 'picture-develops' : undefined}
      >
        <Picture
          slug={props.producto.sku}
          layout="cover"
          class="frame__img"
          alt={props.producto.alt}
          sizes="(max-width: 639px) 90vw, 640px"
        />
      </div>
      <div class="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 class="text-title leading-[1.3] font-medium tracking-[-0.01em] text-ink">
          {props.producto.nombre}
        </h3>
        <p class="text-body leading-[1.45] text-ink">{props.producto.uso}</p>
        <dl class="m-0 flex flex-col gap-3 border-t border-line pt-3">
          <div>
            <dt class="text-body text-muted">Colores</dt>
            <dd class="m-0 mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5">
              <For each={props.producto.colores}>
                {(col) => (
                  <span class="inline-flex items-center gap-1.5 text-body text-ink">
                    <SwatchDot color={col} />
                    {colorLabels[col]}
                  </span>
                )}
              </For>
            </dd>
          </div>
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-body text-muted">Fierrajes</dt>
            <dd class="m-0 text-body font-medium text-ink tabular-nums">
              {unir(props.producto.fierrajes)}
            </dd>
          </div>
        </dl>
        <span class="mt-auto inline-flex min-h-11 items-center gap-2 pt-1 text-body font-medium text-ink">
          Ver la lámina
          <svg class="size-3 flex-none" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M1 6h8M4.5 2.5 8 6l-3.5 3.5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  )
}
