const footerList =
  'max-sm:gap-0 max-sm:text-label max-sm:leading-[1.25] max-sm:*:min-h-11 max-sm:[&_a]:min-h-11'

export function SiteFooter() {
  return (
    <footer
      class="footer closing footer--dark ground-inverse max-sm:pt-8 max-sm:pb-6"
      id="contact"
      aria-labelledby="close-h"
    >
      <div class="wrap max-sm:gap-y-2 sm:max-lg:gap-y-6">
        <div class="closing__cta close--type max-sm:gap-2">
          <div class="section-head max-sm:gap-1">
            <h2 id="close-h">
              Cotiza tu lote de láminas o suelas directo con fábrica
            </h2>
            <p>
              Dinos qué calidad de crepé, grabado o fierraje necesitas y
              preparamos tu cotización en nuestra planta de Zapopan.
            </p>
          </div>
          <a
            class="btn btn--primary btn--xl flex-none sm:max-lg:w-full lg:w-[min(100%,640px)]"
            href="/contacto"
          >
            Solicitar cotización
            <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
              <path class="m-arrow__stem" d="M1 6h8" />
              <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </a>
        </div>
        <div class="closing__links max-sm:gap-2 sm:max-lg:gap-4">
          <div class="grid max-sm:gap-y-2 sm:max-lg:gap-y-4">
            <div class="span-4 stack-2 max-sm:flex max-sm:items-baseline max-sm:justify-between max-sm:gap-3 max-sm:[&>*+*]:mt-0">
              <a class="footer__mark" href="/">
                THP
              </a>
              <p class="footer__lede max-sm:max-w-[24ch] max-sm:text-small">
                Fabricación de artículos de hule y plástico desde hace más de 50
                años en Zapopan, Jalisco.
              </p>
            </div>
            <div class="span-3 start-5 footer__col">
              <h3 class="max-sm:mb-1">Navegación</h3>
              <ul class={footerList}>
                <li>
                  <a href="/">Inicio</a>
                </li>
                <li>
                  <a href="/laminas">Láminas</a>
                </li>
                <li>
                  <a href="/suelas">Suelas</a>
                </li>
              </ul>
            </div>
            <div class="span-5 footer__col">
              <h3 class="max-sm:mb-1">Transformadora de Hules y Plásticos (THP)</h3>
              <ul class={footerList}>
                <li>
                  <a href="/catalogo">Catálogo</a> ·{' '}
                  <a href="/contacto">Contacto</a> ·{' '}
                  <a href="/privacidad">Privacidad</a>
                </li>
                <li>
                  Las Flores 1643, Col. La Florida, 45234 Zapopan · Lun–Sáb 7:00
                  a 15:00
                </li>
                <li>
                  Teléfonos: (33) 3684-2909 · (33) 3684-3037 ·{' '}
                  <a href="mailto:info@thp.com.mx">info@thp.com.mx</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer__legal max-sm:gap-x-3 max-sm:gap-y-0.5 max-sm:pt-1 max-sm:text-label max-sm:leading-[1.25] max-sm:[&_a]:min-h-11">
            <span>
              Transformadora de Hules y Plásticos © 2026 &nbsp;{' '}
              <a href="/privacidad">Aviso de privacidad</a>
            </span>
            <div class="socials" />
            <a class="credits" href="/privacidad#creditos">
              Fotografías de apoyo: Wikimedia Commons
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
