import { createFileRoute } from '@tanstack/solid-router'
import { Toggle, ToggleGroup } from '@ui-sdk/solid/toggle'
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { Picture } from '../../components/Picture'
import { SwatchChip, SwatchDot } from '../../components/Swatch'
import {
  type CalidadFiltro,
  type ColorFiltro,
  type FierrajeFiltro,
  type GrabadoFiltro,
  type Producto,
  calidadLabels,
  calidades,
  colorLabels,
  colores,
  fierrajeLabels,
  fierrajes,
  filtrarProductos,
  grabadoLabels,
  grabados,
  productos,
} from '../../lib/catalogue'
import { breadcrumbLd, jsonLd, seo } from '../../lib/seo'

export type CatalogoSearch = {
  calidad?: Exclude<CalidadFiltro, 'todo'>
  grabado?: Exclude<GrabadoFiltro, 'todo'>
  fierraje?: Exclude<FierrajeFiltro, 'todo'>
  color?: Exclude<ColorFiltro, 'todo'>
}

const rowOneSkus = productos.slice(0, 2)
const rowTwoSkus = productos.slice(2, 5)

export const Route = createFileRoute('/catalogo/')({
  validateSearch: (search: Record<string, unknown>): CatalogoSearch => {
    const out: CatalogoSearch = {}
    if (
      typeof search.calidad === 'string' &&
      calidades.includes(search.calidad as CalidadFiltro) &&
      search.calidad !== 'todo'
    ) {
      out.calidad = search.calidad as Exclude<CalidadFiltro, 'todo'>
    }
    if (
      typeof search.grabado === 'string' &&
      grabados.includes(search.grabado as GrabadoFiltro) &&
      search.grabado !== 'todo'
    ) {
      out.grabado = search.grabado as Exclude<GrabadoFiltro, 'todo'>
    }
    const rawF =
      typeof search.fierraje === 'number'
        ? search.fierraje
        : typeof search.fierraje === 'string'
          ? Number(search.fierraje)
          : NaN
    if (
      !Number.isNaN(rawF) &&
      fierrajes.includes(rawF as FierrajeFiltro) &&
      rawF !== ('todo' as unknown)
    ) {
      out.fierraje = rawF as Exclude<FierrajeFiltro, 'todo'>
    }
    if (
      typeof search.color === 'string' &&
      colores.includes(search.color as ColorFiltro) &&
      search.color !== 'todo'
    ) {
      out.color = search.color as Exclude<ColorFiltro, 'todo'>
    }
    return out
  },
  head: () => ({
    ...seo({
      title: 'Catálogo de láminas de hule por calibre y color | THP',
      description:
        'Filtra nuestras 5 líneas de lámina de hule por calidad, grabado crepé o zig-zag, fierrajes 5, 6, 9 y 12 y colores ámbar, oscura, rojiza o negro.',
      path: '/catalogo',
      image: '/img/sanitizante2/1600.jpg',
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: 'Inicio', path: '/' },
          { name: 'Catálogo', path: '/catalogo' },
        ]),
      ),
    ],
  }),
  component: CatalogoPage,
})

const filterGroup =
  'col-span-full flex flex-col gap-1 sm:col-span-4 lg:col-span-3'

const filterPill =
  'inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-btn border border-line-strong bg-ground px-2.5 text-small leading-none font-medium text-ink transition-colors duration-(--dur) ease-(--ease) max-sm:text-label xl:px-3 hover:border-ink/35 hover:bg-ink/8 data-pressed:border-action data-pressed:bg-action data-pressed:text-action-ink'

const specRow =
  'flex items-baseline justify-between gap-2 text-body leading-[1.35]'
const specTerm = 'flex-none font-normal text-muted'
const specValue = 'm-0 text-right font-medium text-ink'

function SkuCard(props: {
  producto: Producto
  spanClass: string
  hidden: boolean
  withMoment?: boolean
}) {
  return (
    <a
      class={[
        'card flex flex-col gap-2 border-line p-4 sm:max-lg:p-3 lg:max-xl:gap-1.5 lg:max-xl:px-3 lg:max-xl:py-2',
        props.spanClass,
      ]}
      href={`/catalogo/${props.producto.sku}`}
      hidden={props.hidden}
    >
      <div
        class="m-zoom relative aspect-[4/3] max-h-[292px] flex-none overflow-clip rounded-md bg-ground lg:max-xl:max-h-[210px]"
        data-moment={props.withMoment ? 'picture-develops' : undefined}
      >
        <Picture
          slug={props.producto.sku}
          layout="cover"
          class="frame__img"
          alt={props.producto.alt}
          sizes="(max-width: 639px) 480px, 628px"
        />
      </div>
      <div class="flex flex-none flex-col gap-1">
        <div class="flex items-baseline justify-between gap-2 max-sm:flex-wrap max-sm:gap-y-0.5">
          <h3 class="text-title leading-[1.3] font-medium tracking-[-0.01em] text-ink max-sm:text-body">
            {props.producto.nombre}
          </h3>
          <span class="flex-none text-label font-medium text-muted tabular-nums">
            SKU {props.producto.sku.toUpperCase()}
          </span>
        </div>
        <p class="text-body leading-[1.4] text-ink">
          {props.producto.description}
        </p>
        <dl class="m-0 mt-1 flex flex-col gap-1 border-t border-line pt-2">
          <div class={specRow}>
            <dt class={specTerm}>Calidad y grabado</dt>
            <dd class={specValue}>
              {calidadLabels[props.producto.calidad]} ·{' '}
              {grabadoLabels[props.producto.grabado]}
            </dd>
          </div>
          <div class={specRow}>
            <dt class={specTerm}>Fierrajes</dt>
            <dd class={[specValue, 'tabular-nums']}>
              {props.producto.fierrajes.join(', ')} fierros
            </dd>
          </div>
          <div class={specRow}>
            <dt class={specTerm}>Colores</dt>
            <dd class={specValue}>
              <For each={props.producto.colores}>
                {(col) => <SwatchChip color={col} />}
              </For>
            </dd>
          </div>
        </dl>
        <span class="mt-1 inline-flex items-center gap-2 text-body font-medium text-ink underline decoration-line-strong underline-offset-4 after:content-['→']">
          Ver ficha {props.producto.sku.toUpperCase()}
        </span>
      </div>
    </a>
  )
}

function CatalogoPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const [calidad, setCalidad] = createSignal<CalidadFiltro>('todo')
  const [grabado, setGrabado] = createSignal<GrabadoFiltro>('todo')
  const [fierraje, setFierraje] = createSignal<FierrajeFiltro>('todo')
  const [color, setColor] = createSignal<ColorFiltro>('todo')

  createEffect(
    () =>
      [
        search().calidad ?? 'todo',
        search().grabado ?? 'todo',
        search().fierraje ?? 'todo',
        search().color ?? 'todo',
      ] as const,
    ([nextCal, nextGrab, nextFier, nextCol]) => {
      setCalidad(nextCal)
      setGrabado(nextGrab)
      setFierraje(nextFier)
      setColor(nextCol)
    },
  )

  const syncSearch = (next: {
    calidad: CalidadFiltro
    grabado: GrabadoFiltro
    fierraje: FierrajeFiltro
    color: ColorFiltro
  }) => {
    void navigate({
      to: '/catalogo',
      search: {
        calidad: next.calidad === 'todo' ? undefined : next.calidad,
        grabado: next.grabado === 'todo' ? undefined : next.grabado,
        fierraje: next.fierraje === 'todo' ? undefined : next.fierraje,
        color: next.color === 'todo' ? undefined : next.color,
      },
      replace: true,
      resetScroll: false,
    })
  }

  const updateCalidad = (vals: CalidadFiltro[]) => {
    const next = vals[0] ?? 'todo'
    setCalidad(next)
    syncSearch({
      calidad: next,
      grabado: grabado(),
      fierraje: fierraje(),
      color: color(),
    })
  }

  const updateGrabado = (vals: GrabadoFiltro[]) => {
    const next = vals[0] ?? 'todo'
    setGrabado(next)
    syncSearch({
      calidad: calidad(),
      grabado: next,
      fierraje: fierraje(),
      color: color(),
    })
  }

  const updateFierraje = (vals: string[]) => {
    const raw = vals[0] ?? 'todo'
    const next: FierrajeFiltro =
      raw === 'todo' ? 'todo' : (Number(raw) as FierrajeFiltro)
    setFierraje(next)
    syncSearch({
      calidad: calidad(),
      grabado: grabado(),
      fierraje: next,
      color: color(),
    })
  }

  const updateColor = (vals: ColorFiltro[]) => {
    const next = vals[0] ?? 'todo'
    setColor(next)
    syncSearch({
      calidad: calidad(),
      grabado: grabado(),
      fierraje: fierraje(),
      color: next,
    })
  }

  const resetFilters = () => {
    setCalidad('todo')
    setGrabado('todo')
    setFierraje('todo')
    setColor('todo')
    syncSearch({
      calidad: 'todo',
      grabado: 'todo',
      fierraje: 'todo',
      color: 'todo',
    })
  }

  const matchedSkus = createMemo(() => {
    const list = filtrarProductos({
      calidad: calidad(),
      grabado: grabado(),
      fierraje: fierraje(),
      color: color(),
    })
    return new Set(list.map((p) => p.sku))
  })

  const visibleCount = createMemo(() => matchedSkus().size)

  const hasActiveFilter = createMemo(
    () =>
      calidad() !== 'todo' ||
      grabado() !== 'todo' ||
      fierraje() !== 'todo' ||
      color() !== 'todo',
  )

  const statusText = createMemo(() => {
    const count = visibleCount()
    if (!hasActiveFilter()) {
      return `Mostrando las ${productos.length} referencias en catálogo`
    }
    if (count === 0) {
      return '0 referencias coinciden con los filtros seleccionados'
    }
    return count === 1
      ? 'Mostrando 1 de 5 referencias en catálogo'
      : `Mostrando ${count} de ${productos.length} referencias en catálogo`
  })

  return (
    <main id="top">
      <section
        class="hero hero--photo bg-ground max-sm:[--photo:31svh]"
        id="catalogo-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="catalogo-h"
      >
        <Picture
          slug="sanitizante2"
          layout="hero"
          alt="Textura macro de tapete y lámina de hule negro vulcanizado en la planta de THP en Zapopan"
          priority
          sizes="100vw"
        />
        <div class="wrap">
          <div class="hero-text">
            <div class="hero__text">
              <p class="hero__kicker">
                <span class="dot" aria-hidden="true" />5 referencias de línea ·
                4 fierrajes (5, 6, 9 y 12) · 6 tonos de muestrario
              </p>
              <h1 id="catalogo-h" class="max-w-[20ch]">
                Catálogo de láminas de hule por calibre y color
              </h1>
              <p class="hero__lead">
                Revisa nuestras 5 referencias de lámina de hule crepé y filtra
                por calidad, tipo de grabado, fierraje o color. Todas las
                referencias se fabrican en fierrajes 5, 6, 9 y 12 en nuestra
                planta de Zapopan.
              </p>
              <div class="btn-row">
                <a class="btn btn--primary" href="/contacto">
                  Solicitar cotización
                  <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path class="m-arrow__stem" d="M1 6h8" />
                    <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a class="btn btn--secondary" href="#referencias">
                  Filtrar referencias
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class={[
          'section h-auto min-h-[calc(var(--h,1)*100svh)] max-sm:min-h-[calc(var(--hm,var(--h,1))*100lvh)]',
          hasActiveFilter() ? '[--h:1] [--hm:1]' : '[--h:2] [--hm:2]',
        ]}
        id="referencias"
        aria-labelledby="referencias-h"
      >
        <div class={['wrap h-auto', { 'flex flex-col gap-6': hasActiveFilter() }]}>
          <div class="section-head mb-3 lg:max-xl:mb-2 lg:max-xl:gap-1">
            <h2 id="referencias-h">Filtrar referencias de lámina de hule</h2>
            <p class="lg:max-xl:text-body">
              Combina calidad, grabado, fierraje y color para ubicar el
              material de tu corrida.{' '}
              <span
                class="font-medium text-ink tabular-nums"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {statusText()}.
              </span>
            </p>
            <Show when={hasActiveFilter()}>
              <div class="btn-row">
                <button
                  type="button"
                  class="btn btn--secondary"
                  onClick={resetFilters}
                >
                  Limpiar filtros
                </button>
              </div>
            </Show>
          </div>

          <div
            class="mb-4 grid grid-cols-12 gap-2 sm:gap-x-(--gutter) lg:max-xl:mb-3 lg:max-xl:gap-x-3 lg:max-xl:gap-y-1.5"
            role="region"
            aria-label="Filtros de referencias"
          >
            <div class={filterGroup}>
              <span class="t-label text-ink" id="lbl-calidad">
                Calidad
              </span>
              <ToggleGroup
                class="flex flex-wrap gap-2"
                aria-labelledby="lbl-calidad"
                deselectable={false}
                value={[calidad()]}
                onValueChange={updateCalidad}
              >
                <For each={calidades}>
                  {(cal) => (
                    <Toggle value={cal} class={filterPill}>
                      {calidadLabels[cal]}
                    </Toggle>
                  )}
                </For>
              </ToggleGroup>
            </div>

            <div class={filterGroup}>
              <span class="t-label text-ink" id="lbl-grabado">
                Grabado
              </span>
              <ToggleGroup
                class="flex flex-wrap gap-2"
                aria-labelledby="lbl-grabado"
                deselectable={false}
                value={[grabado()]}
                onValueChange={updateGrabado}
              >
                <For each={grabados}>
                  {(grab) => (
                    <Toggle value={grab} class={filterPill}>
                      {grabadoLabels[grab]}
                    </Toggle>
                  )}
                </For>
              </ToggleGroup>
            </div>

            <div class="col-span-full flex flex-col gap-1 sm:col-span-4 lg:col-span-6">
              <span class="t-label text-ink" id="lbl-fierraje">
                Fierraje
              </span>
              <ToggleGroup
                class="flex flex-wrap gap-2"
                aria-labelledby="lbl-fierraje"
                deselectable={false}
                value={[String(fierraje())]}
                onValueChange={updateFierraje}
              >
                <For each={fierrajes}>
                  {(fier) => (
                    <Toggle
                      value={String(fier)}
                      class={[filterPill, 'tabular-nums']}
                    >
                      {fierrajeLabels[String(fier)]}
                    </Toggle>
                  )}
                </For>
              </ToggleGroup>
            </div>

            <div class="col-span-full flex flex-col gap-1">
              <span class="t-label text-ink" id="lbl-color">
                Color
              </span>
              <ToggleGroup
                class="flex flex-wrap gap-2"
                aria-labelledby="lbl-color"
                deselectable={false}
                value={[color()]}
                onValueChange={updateColor}
              >
                <For each={colores}>
                  {(col) => (
                    <Toggle value={col} class={filterPill}>
                      {col !== 'todo' ? <SwatchDot color={col} /> : null}
                      {colorLabels[col]}
                    </Toggle>
                  )}
                </For>
              </ToggleGroup>
            </div>
          </div>

          <div class="grid gap-y-4">
            <For each={rowOneSkus}>
              {(prod, idx) => (
                <SkuCard
                  producto={prod}
                  spanClass="span-6 sm:max-lg:col-span-6"
                  hidden={!matchedSkus().has(prod.sku)}
                  withMoment={idx() === 0}
                />
              )}
            </For>
          </div>
          <div class="grid mt-4 gap-y-4">
            <For each={rowTwoSkus}>
              {(prod) => (
                <SkuCard
                  producto={prod}
                  spanClass="span-4 sm:max-lg:col-span-4"
                  hidden={!matchedSkus().has(prod.sku)}
                />
              )}
            </For>
          </div>

          <div
            class="flex flex-col items-start gap-4 rounded-lg border border-line bg-card p-8"
            hidden={visibleCount() > 0}
          >
            <p>Ninguna lámina coincide con esta combinación.</p>
            <button
              type="button"
              class="btn btn--secondary"
              onClick={resetFilters}
            >
              Mostrar las 5 referencias
            </button>
          </div>
        </div>
      </section>

      <section
        class="section [--h:1] [--hm:2]"
        id="tabla-catalogo"
        aria-labelledby="tabla-h"
      >
        <div class="wrap">
          <div class="section-head mb-8 sm:mb-2 xl:mb-4">
            <h2 id="tabla-h">Tabla comparativa de referencias en catálogo</h2>
            <p class="sm:max-xl:text-body">
              Compara las cinco formulaciones de línea por compuesto, grabado
              de prensa y calibres disponibles en nuestra planta de Zapopan.
            </p>
          </div>
          <div class="grid grid--top">
            <ul class="rows rows--spec span-6 *:py-6 sm:*:py-1 sm:*:first:pt-0 sm:max-lg:col-span-6 xl:*:py-2">
              <For each={productos}>
                {(prod) => (
                  <li>
                    <span class="rows__name">
                      <a class="link" href={`/catalogo/${prod.sku}`}>
                        {prod.nombre}
                      </a>
                    </span>
                    <span class="rows__value">
                      <a
                        class="link"
                        href={`/contacto?sku=${prod.sku.toUpperCase()}`}
                      >
                        Cotizar {prod.sku.toUpperCase()}
                      </a>
                    </span>
                    <p class="col-span-full">
                      SKU {prod.sku.toUpperCase()} ·{' '}
                      {calidadLabels[prod.calidad]} · Fierrajes{' '}
                      <span class="tabular-nums">
                        {prod.fierrajes.join(', ')}
                      </span>{' '}
                      · <span data-assumed="">Precio según volumen</span>
                    </p>
                  </li>
                )}
              </For>
            </ul>
            <figure class="span-6 start-7 m-0 h-[460px] overflow-hidden rounded-lg max-sm:mt-8 sm:h-[min(460px,var(--ly-fit))] sm:max-lg:col-span-6 lg:h-[min(440px,var(--ly-fit))]">
              <Picture
                slug="molino-laminador"
                layout="cover"
                class="frame__img"
                alt="Molino laminador de rodillos en la planta de THP en Zapopan procesando lámina de hule crepé"
                sizes="(max-width: 639px) 480px, 768px"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}
