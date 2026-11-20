export function SiteFooter() {
  return (
    <footer
      class="footer closing footer--dark ground-inverse"
      id="contact"
      aria-labelledby="close-h"
    >
      <div class="wrap">
        <div class="closing__cta close--type">
          <div class="section-head">
            <h2 id="close-h">
              Cotiza tu lote de láminas o suelas directo con fábrica
            </h2>
            <p>
              Dinos qué calidad de crepé, grabado o fierraje necesitas y
              preparamos tu cotización en nuestra planta de Zapopan.
            </p>
          </div>
          <a class="btn btn--primary btn--xl" href="/contacto">
            Solicitar cotización
            <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
              <path class="m-arrow__stem" d="M1 6h8" />
              <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </a>
        </div>
        <div class="closing__links">
          <div class="grid">
            <div class="span-4 stack-2">
              <a class="footer__mark" href="/">
                THP
              </a>
              <p class="footer__lede">
                Fabricación de artículos de hule y plástico desde hace más de 50
                años en Zapopan, Jalisco.
              </p>
            </div>
            <div class="span-3 start-5 footer__col">
              <h3>Navegación</h3>
              <ul>
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
              <h3>Transformadora de Hules y Plásticos (THP)</h3>
              <ul>
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
          <div class="footer__legal">
            <span>
              Transformadora de Hules y Plásticos © 2026 &nbsp;{' '}
              <a href="/privacidad">Aviso de privacidad</a>
            </span>
            <div class="socials" />
            <p class="credits">
              Fotografías de planta y producto por Transformadora de Hules y
              Plásticos; fotografías adicionales vía Wikimedia Commons.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
