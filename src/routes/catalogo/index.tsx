import { createFileRoute } from '@tanstack/solid-router'
import { Toggle, ToggleGroup, ToggleIcon } from '@ui-sdk/solid/toggle'
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { Comparacion } from '../../components/catalogo/Comparacion'
import { ReferenciaCard } from '../../components/catalogo/ReferenciaCard'
import { Picture } from '../../components/Picture'
import { SwatchDot } from '../../components/Swatch'
import {
  type CalidadFiltro,
  type ColorFiltro,
  type FierrajeFiltro,
  type GrabadoFiltro,
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

const filterPill =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-btn border-2 border-line bg-ground px-3 text-body leading-none font-medium whitespace-nowrap text-ink transition-colors duration-(--dur) ease-(--ease) hover:border-ink/40 data-pressed:border-ink data-pressed:bg-ink/8 data-pressed:font-semibold [&_[data-slot=toggle-icon]]:hidden data-pressed:[&_[data-slot=toggle-icon]]:inline-flex'

function cardSpan(index: number, count: number): string {
  const tablet =
    count % 2 === 1 && index === count - 1
      ? 'sm:max-lg:col-span-6 sm:max-lg:col-start-4'
      : 'sm:max-lg:col-span-6 sm:max-lg:col-start-auto'
  if (count === 5) {
    if (index < 3) return `span-4 ${tablet}`
    return index === 3 ? `span-4 start-3 ${tablet}` : `span-4 start-7 ${tablet}`
  }
  if (count === 3) return `span-4 ${tablet}`
  if (count === 1) return `span-4 start-5 ${tablet}`
  return `span-6 ${tablet}`
}

function Marca() {
  return (
    <ToggleIcon>
      <svg class="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3.5 8.5 6.5 11.5 12.5 4.5"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </ToggleIcon>
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

  const visibleProducts = createMemo(() =>
    productos.filter((prod) => matchedSkus().has(prod.sku)),
  )

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

      <section class="section h-auto min-h-0" id="referencias" aria-labelledby="referencias-h">
        <div class="wrap h-auto">
          <div class="section-head">
            <h2 id="referencias-h">Referencias de lámina de hule</h2>
            <p>
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
          </div>

          <div
            class="mb-8 rounded-lg border border-line bg-card p-4 sm:p-6"
            role="region"
            aria-label="Filtros de referencias"
          >
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                <span class="text-body font-medium text-ink sm:w-28 sm:shrink-0 sm:pt-2.5" id="lbl-calidad">
                  Calidad
                </span>
                <ToggleGroup
                  class="flex flex-1 flex-wrap gap-3"
                  aria-labelledby="lbl-calidad"
                  deselectable={false}
                  value={[calidad()]}
                  onValueChange={updateCalidad}
                >
                  <For each={calidades}>
                    {(cal) => (
                      <Toggle value={cal} class={filterPill}>
                        <Marca />
                        {calidadLabels[cal]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-start sm:gap-6">
                <span class="text-body font-medium text-ink sm:w-28 sm:shrink-0 sm:pt-2.5" id="lbl-grabado">
                  Grabado
                </span>
                <ToggleGroup
                  class="flex flex-1 flex-wrap gap-3"
                  aria-labelledby="lbl-grabado"
                  deselectable={false}
                  value={[grabado()]}
                  onValueChange={updateGrabado}
                >
                  <For each={grabados}>
                    {(grab) => (
                      <Toggle value={grab} class={filterPill}>
                        <Marca />
                        {grabadoLabels[grab]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-start sm:gap-6">
                <span class="text-body font-medium text-ink sm:w-28 sm:shrink-0 sm:pt-2.5" id="lbl-fierraje">
                  Fierraje
                </span>
                <ToggleGroup
                  class="flex flex-1 flex-wrap gap-3"
                  aria-labelledby="lbl-fierraje"
                  deselectable={false}
                  value={[String(fierraje())]}
                  onValueChange={updateFierraje}
                >
                  <For each={fierrajes}>
                    {(fier) => (
                      <Toggle value={String(fier)} class={[filterPill, 'tabular-nums']}>
                        <Marca />
                        {fierrajeLabels[String(fier)]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-start sm:gap-6">
                <span class="text-body font-medium text-ink sm:w-28 sm:shrink-0 sm:pt-2.5" id="lbl-color">
                  Color
                </span>
                <ToggleGroup
                  class="flex flex-1 flex-wrap gap-3"
                  aria-labelledby="lbl-color"
                  deselectable={false}
                  value={[color()]}
                  onValueChange={updateColor}
                >
                  <For each={colores}>
                    {(col) => (
                      <Toggle value={col} class={filterPill}>
                        <Marca />
                        {col !== 'todo' ? <SwatchDot color={col} /> : null}
                        {colorLabels[col]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>
            </div>
            <Show when={hasActiveFilter()}>
              <div class="mt-4 border-t border-line pt-4">
                <button type="button" class="btn btn--secondary" onClick={resetFilters}>
                  Limpiar filtros
                </button>
              </div>
            </Show>
          </div>

          <Show
            when={visibleCount() > 0}
            fallback={
              <div class="flex flex-col items-start gap-4 rounded-lg border border-line bg-card px-6 py-8">
                <p class="text-body text-ink">
                  Ninguna lámina coincide con esta combinación.
                </p>
                <button type="button" class="btn btn--secondary" onClick={resetFilters}>
                  Mostrar las 5 referencias
                </button>
              </div>
            }
          >
            <div class="grid items-start">
              <For each={visibleProducts()}>
                {(prod, index) => (
                  <ReferenciaCard
                    producto={prod}
                    spanClass={cardSpan(index(), visibleProducts().length)}
                    moment={prod.sku === productos[0].sku}
                  />
                )}
              </For>
            </div>
          </Show>
        </div>
      </section>

      <Comparacion />
    </main>
  )
}
