import { useLocation } from '@tanstack/solid-router'
import { createSignal } from 'solid-js'
import { Picture } from './Picture'

export function SiteHeader() {
  const location = useLocation()
  const [open, setOpen] = createSignal(false)
  const [expanded, setExpanded] = createSignal(false)

  const closeMenu = () => {
    setOpen(false)
    setExpanded(false)
    if (typeof document !== 'undefined') {
      document.body.classList.remove('nav-locked')
    }
  }

  const toggleMenu = () => {
    const next = !open()
    setOpen(next)
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('nav-locked', next)
    }
  }

  const isInnerCurrent = (href: string) => {
    const p = location().pathname
    if (href === '/' || p === '/') return undefined
    return p === href || p.startsWith(`${href}/`) ? ('page' as const) : undefined
  }

  const showPanel = () => {
    const p = location().pathname
    return !p.startsWith('/catalogo')
  }

  return (
    <header class={{ nav: true, 'is-open': open() }}>
      <div class="wrap nav__bar">
        <a class="skip-link" href="#top">
          Saltar al contenido
        </a>
        <a class="nav__logo" href="/" onClick={closeMenu}>
          <span class="mark mark--thp" aria-hidden="true" />
          THP
        </a>
        <nav class="nav__links" aria-label="Principal">
          <div class="nav__item">
            <a class="nav__link" href="/" onClick={closeMenu}>
              Inicio
            </a>
          </div>
          <div class={{ nav__item: true, 'is-expanded': expanded() }}>
            <a
              class="nav__link"
              href="/laminas"
              aria-current={isInnerCurrent('/laminas')}
              onClick={closeMenu}
            >
              Láminas
              {showPanel() ? (
                <svg class="chev" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M3 4.5l3 3 3-3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : null}
            </a>
            {showPanel() ? (
              <>
                <button
                  class="nav__expand"
                  type="button"
                  aria-label="Mostrar enlaces de Láminas"
                  aria-expanded={expanded() ? 'true' : 'false'}
                  onClick={() => setExpanded((v) => !v)}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M4 6l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div class="nav__menu">
                  <div class="wrap grid">
                    <a
                      class="menu-card span-4"
                      href="/laminas"
                      onClick={closeMenu}
                    >
                      <div class="panel">
                        <Picture
                          slug="cla0cr"
                          class="frame__img"
                          alt="Muestra macro de lámina de hule crepé liga con grabado crepé"
                          sizes="410px"
                        />
                      </div>
                      <span class="t-card">Láminas de hule crepé</span>
                      <span class="t-small muted">
                        Calidades crepé, crepé liga y crepé negro en fierrajes 5 a 12
                      </span>
                    </a>
                    <a
                      class="menu-card span-4"
                      href="/suelas"
                      onClick={closeMenu}
                    >
                      <div class="panel">
                        <Picture
                          slug="cra0zg"
                          class="frame__img"
                          alt="Muestra macro de lámina de hule crepé ámbar con grabado zig-zag"
                          sizes="410px"
                        />
                      </div>
                      <span class="t-card">Suelas y tapetes moldeados</span>
                      <span class="t-small muted">
                        Pisos para calzado deportivo, casual y tapetes de uso rudo
                      </span>
                    </a>
                    <a
                      class="menu-card span-4"
                      href="/catalogo"
                      onClick={closeMenu}
                    >
                      <div class="panel">
                        <Picture
                          slug="crn0zg"
                          class="frame__img"
                          alt="Muestra macro de lámina de hule crepé negro con grabado zig-zag"
                          sizes="410px"
                        />
                      </div>
                      <span class="t-card">Muestrario por referencia</span>
                      <span class="t-small muted">
                        Cinco referencias de línea filtrables por calibre y color
                      </span>
                    </a>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div class="nav__item">
            <a
              class="nav__link"
              href="/suelas"
              aria-current={isInnerCurrent('/suelas')}
              onClick={closeMenu}
            >
              Suelas
            </a>
          </div>
          <div class="nav__item">
            <a
              class="nav__link"
              href="/catalogo"
              aria-current={isInnerCurrent('/catalogo')}
              onClick={closeMenu}
            >
              Catálogo
            </a>
          </div>
          <div class="nav__item">
            <a
              class="nav__link"
              href="/contacto"
              aria-current={isInnerCurrent('/contacto')}
              onClick={closeMenu}
            >
              Contacto
            </a>
          </div>
        </nav>
        <div class="nav__actions">
          <a class="btn btn--primary" href="/contacto" onClick={closeMenu}>
            Solicitar cotización
          </a>
        </div>
        <button
          class="nav__toggle"
          type="button"
          aria-expanded={open() ? 'true' : 'false'}
          aria-label="Menú"
          onClick={toggleMenu}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {open() ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            ) : (
              <path
                d="M2 5h14M2 13h14"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}
