import { For } from 'solid-js'
import { Picture } from '../Picture'
import { SwatchDot } from '../Swatch'
import { type Producto, colorLabels, unir } from '../../lib/catalogue'

export function ReferenciaCard(props: { producto: Producto; spanClass: string; moment: boolean }) {
  return (
    <a
      class={['card flex flex-col self-start p-0', props.spanClass]}
      href={`/catalogo/${props.producto.sku}`}
    >
      <div
        class="m-zoom relative aspect-[2/1] w-full overflow-clip bg-ground"
        data-moment={props.moment ? 'picture-develops' : undefined}
      >
        <Picture
          slug={props.producto.sku}
          layout="fill"
          class="frame__img"
          alt={props.producto.alt}
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 420px"
        />
      </div>
      <div class="flex flex-col gap-2 p-4">
        <h3 class="text-title leading-[1.25] font-medium tracking-[-0.01em] text-ink">
          {props.producto.nombre}
        </h3>
        <p class="min-h-[2lh] text-body leading-[1.4] text-ink">{props.producto.uso}</p>
        <dl class="m-0 flex flex-col gap-2 border-t border-line pt-2">
          <div>
            <dt class="text-body text-muted">Colores</dt>
            <dd class="m-0 mt-1 flex flex-wrap gap-x-3 gap-y-1">
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
        <span class="inline-flex items-center gap-2 text-body font-medium text-ink">
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
