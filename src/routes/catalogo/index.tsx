import { createFileRoute } from '@tanstack/solid-router'
import { Toggle, ToggleGroup } from '@ui-sdk/solid/toggle'
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { Picture } from '../../components/Picture'
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

function SkuCard(props: {
  producto: Producto
  spanClass: string
  hidden: boolean
  withMoment?: boolean
}) {
  return (
    <a
      class={`card cat-card ${props.spanClass}`}
      href={`/catalogo/${props.producto.sku}`}
      hidden={props.hidden}
    >
      <div
        class="cat-card__media m-zoom"
        data-moment={props.withMoment ? 'picture-develops' : undefined}
      >
        <Picture
          slug={props.producto.sku}
          class="frame__img"
          alt={props.producto.alt}
          sizes="(max-width: 639px) 480px, 628px"
        />
      </div>
      <div class="cat-card__body">
        <div class="cat-card__head">
          <h3>{props.producto.nombre}</h3>
          <span class="cat-card__sku tabular-nums">
            SKU {props.producto.sku.toUpperCase()}
          </span>
        </div>
        <p class="cat-card__desc">{props.producto.description}</p>
        <dl class="cat-card__specs">
          <div>
            <dt>Calidad y grabado</dt>
            <dd>
              {calidadLabels[props.producto.calidad]} ·{' '}
              {grabadoLabels[props.producto.grabado]}
            </dd>
          </div>
          <div>
            <dt>Fierrajes</dt>
            <dd class="tabular-nums">
              {props.producto.fierrajes.join(', ')} fierros
            </dd>
          </div>
          <div>
            <dt>Colores</dt>
            <dd class="cat-card__swatches">
              <For each={props.producto.colores}>
                {(col) => (
                  <span class="swatch-chip">
                    <span
                      class="swatch-dot"
                      data-swatch={col}
                      aria-hidden="true"
                    />
                    {colorLabels[col]}
                  </span>
                )}
              </For>
            </dd>
          </div>
        </dl>
        <span class="cat-card__cta">
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
        class="hero hero--photo"
        id="catalogo-hero"
        data-enter=""
        data-calm="left"
        aria-labelledby="catalogo-h"
      >
        <Picture
          slug="sanitizante2"
          pictureClass="hero__bg"
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
              <h1 id="catalogo-h">
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
        class={{
          section: true,
          g2: !hasActiveFilter(),
          'catalogo-section': true,
          'is-filtered': hasActiveFilter(),
        }}
        id="referencias"
        aria-labelledby="referencias-h"
      >
        <div class="wrap">
          <div class="group catalogo-group-top">
            <div class="section-head">
              <h2 id="referencias-h">Filtrar referencias de lámina de hule</h2>
              <p>
                Combina calidad, grabado, fierraje y color para ubicar el
                material de tu corrida.{' '}
                <span
                  class="catalogo-status tabular-nums"
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
              class="catalogo-filters"
              role="region"
              aria-label="Filtros de referencias"
            >
              <div class="filter-group">
                <span class="t-label filter-group__label" id="lbl-calidad">
                  Calidad
                </span>
                <ToggleGroup
                  class="filter-pills"
                  aria-labelledby="lbl-calidad"
                  deselectable={false}
                  value={[calidad()]}
                  onValueChange={updateCalidad}
                >
                  <For each={calidades}>
                    {(cal) => (
                      <Toggle value={cal} class="filter-pill">
                        {calidadLabels[cal]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="filter-group">
                <span class="t-label filter-group__label" id="lbl-grabado">
                  Grabado
                </span>
                <ToggleGroup
                  class="filter-pills"
                  aria-labelledby="lbl-grabado"
                  deselectable={false}
                  value={[grabado()]}
                  onValueChange={updateGrabado}
                >
                  <For each={grabados}>
                    {(grab) => (
                      <Toggle value={grab} class="filter-pill">
                        {grabadoLabels[grab]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="filter-group">
                <span class="t-label filter-group__label" id="lbl-fierraje">
                  Fierraje
                </span>
                <ToggleGroup
                  class="filter-pills"
                  aria-labelledby="lbl-fierraje"
                  deselectable={false}
                  value={[String(fierraje())]}
                  onValueChange={updateFierraje}
                >
                  <For each={fierrajes}>
                    {(fier) => (
                      <Toggle
                        value={String(fier)}
                        class="filter-pill tabular-nums"
                      >
                        {fierrajeLabels[String(fier)]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="filter-group filter-group--color">
                <span class="t-label filter-group__label" id="lbl-color">
                  Color
                </span>
                <ToggleGroup
                  class="filter-pills"
                  aria-labelledby="lbl-color"
                  deselectable={false}
                  value={[color()]}
                  onValueChange={updateColor}
                >
                  <For each={colores}>
                    {(col) => (
                      <Toggle value={col} class="filter-pill">
                        {col !== 'todo' ? (
                          <span
                            class="swatch-dot"
                            data-swatch={col}
                            aria-hidden="true"
                          />
                        ) : null}
                        {colorLabels[col]}
                      </Toggle>
                    )}
                  </For>
                </ToggleGroup>
              </div>
            </div>

            <div class="grid catalogo-grid">
              <For each={rowOneSkus}>
                {(prod, idx) => (
                  <SkuCard
                    producto={prod}
                    spanClass="span-6"
                    hidden={!matchedSkus().has(prod.sku)}
                    withMoment={idx() === 0}
                  />
                )}
              </For>
            </div>
          </div>

          <div class="group catalogo-group-bottom">
            <div class="grid catalogo-grid">
              <For each={rowTwoSkus}>
                {(prod) => (
                  <SkuCard
                    producto={prod}
                    spanClass="span-4"
                    hidden={!matchedSkus().has(prod.sku)}
                  />
                )}
              </For>
            </div>

            <div class="catalogo-empty" hidden={visibleCount() > 0}>
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
        </div>
      </section>

      <section
        class="section"
        id="tabla-catalogo"
        aria-labelledby="tabla-h"
      >
        <div class="wrap">
          <div class="section-head">
            <h2 id="tabla-h">Tabla comparativa de referencias en catálogo</h2>
            <p>
              Compara las cinco formulaciones de línea por compuesto, grabado
              de prensa y calibres disponibles en nuestra planta de Zapopan.
            </p>
          </div>
          <div class="grid grid--top">
            <ul class="rows rows--spec catalogo-matrix span-6">
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
                    <p>
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
            <figure class="develop catalogo-table-photo span-6 start-7">
              <Picture
                slug="molino-laminador"
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
