import { createSignal, onSettled } from 'solid-js'
import type { ProductSku } from '../lib/catalogue'
import { getProductoBySku, productos } from '../lib/catalogue'

const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim()

const FIERRAJE_OPTS = ['5', '6', '9', '12', 'no-se'] as const

const PRODUCTO_EXTRA = [
  { value: 'suelas', label: 'Suelas' },
  { value: 'otro', label: 'Otro' },
] as const

function productLabel(sku: ProductSku): string {
  const p = productos.find((x) => x.sku === sku)
  if (!p) return sku.toUpperCase()
  return `${sku.toUpperCase()} · ${p.nombre}`
}

export function QuoteForm(props: { initialSku?: string }) {
  const [status, setStatus] = createSignal('')

  let formEl!: HTMLFormElement

  const validSku = () => {
    const sku = props.initialSku?.toLowerCase()
    return sku && getProductoBySku(sku) ? sku : undefined
  }

  type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

  const fields = (): FormControl[] =>
    [
      formEl.querySelector('#cot-nombre'),
      formEl.querySelector('#cot-empresa'),
      formEl.querySelector('#cot-correo'),
      formEl.querySelector('#cot-telefono'),
      formEl.querySelector('#cot-producto'),
      formEl.querySelector('#cot-fierraje'),
      formEl.querySelector('#cot-cantidad'),
      formEl.querySelector('#cot-mensaje'),
      formEl.querySelector('#cot-privacidad'),
    ].filter((el): el is FormControl => el != null)

  const errEl = (el: HTMLElement) =>
    formEl.querySelector<HTMLElement>(`#${el.id}-err`)

  const validateField = (el: FormControl) => {
    const ok = el.checkValidity()
    const err = errEl(el)
    if (!err) return ok
    if (ok) {
      el.removeAttribute('aria-invalid')
      err.hidden = true
      return true
    }
    el.setAttribute('aria-invalid', 'true')
    err.textContent = err.dataset.text || el.dataset.error || el.validationMessage
    err.hidden = false
    return false
  }

  const mailtoFallback = () => {
    const fd = new FormData(formEl)
    const producto =
      formEl.querySelector<HTMLSelectElement>('#cot-producto')?.selectedOptions[0]?.text ??
      String(fd.get('producto') ?? '')
    const lines = [
      ['Nombre', fd.get('nombre')],
      ['Empresa', fd.get('empresa')],
      ['Correo', fd.get('correo')],
      ['Teléfono', fd.get('telefono')],
      ['Producto', fd.get('producto')],
      ['Fierraje', fd.get('fierraje')],
      ['Cantidad aproximada', fd.get('cantidad')],
      ['Mensaje', fd.get('mensaje')],
    ]
      .filter(([, v]) => v != null && String(v).trim() !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    const subject = encodeURIComponent(`Cotización ${producto}`)
    const body = encodeURIComponent(lines)
    window.location.href = `mailto:info@thp.com.mx?subject=${subject}&body=${body}`
  }

  onSettled(() => {
    fields().forEach((el) => {
      const ev = el.matches('select') ? 'change' : 'input'
      el.addEventListener(ev, () => {
        if (el.getAttribute('aria-invalid') === 'true') validateField(el)
      })
    })

    formEl.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setStatus('')
        const bad = fields().filter((el) => !validateField(el))
        if (bad.length) {
          setStatus(
            bad.length === 1
              ? 'Hay 1 campo por corregir.'
              : `Hay ${bad.length} campos por corregir.`,
          )
          bad[0].focus()
          return
        }

        if (!FORM_ENDPOINT) {
          mailtoFallback()
          return
        }

        const button = formEl.querySelector<HTMLButtonElement>('[type="submit"]')
        const wait = window.setTimeout(
          () => setStatus('Enviando solicitud...'),
          300,
        )
        if (button) {
          button.disabled = true
          button.setAttribute('aria-busy', 'true')
        }
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: new FormData(formEl),
            headers: { Accept: 'application/json' },
          })
          if (!res.ok) throw new Error(String(res.status))
          window.clearTimeout(wait)
          formEl.reset()
          setStatus(
            'Tu solicitud de cotización fue enviada. Te responderemos desde info@thp.com.mx dentro de nuestro horario de planta.',
          )
        } catch {
          window.clearTimeout(wait)
          setStatus(
            'No pudimos enviar la solicitud. Intenta de nuevo o escribe a info@thp.com.mx.',
          )
        } finally {
          if (button) {
            button.disabled = false
            button.removeAttribute('aria-busy')
          }
        }
      },
      { capture: true },
    )
  })

  return (
    <form
      ref={formEl}
      class="form"
      method="post"
      action={FORM_ENDPOINT || undefined}
      novalidate
      aria-label="Formulario de cotización"
    >
      <div class="field">
        <label for="cot-nombre">Nombre y apellido</label>
        <input
          id="cot-nombre"
          name="nombre"
          type="text"
          autocomplete="name"
          required
          data-error="Escribe tu nombre para dirigir la cotización."
          aria-describedby="cot-nombre-err"
        />
        <p id="cot-nombre-err" class="field__error" data-text="Escribe tu nombre para dirigir la cotización." hidden />
      </div>
      <div class="field">
        <label for="cot-empresa">Empresa o taller</label>
        <input
          id="cot-empresa"
          name="empresa"
          type="text"
          autocomplete="organization"
          data-error="Escribe el nombre de tu empresa o taller."
          aria-describedby="cot-empresa-err"
        />
        <p id="cot-empresa-err" class="field__error" data-text="Escribe el nombre de tu empresa o taller." hidden />
      </div>
      <div class="field">
        <label for="cot-correo">Correo electrónico</label>
        <input
          id="cot-correo"
          name="correo"
          type="email"
          autocomplete="email"
          inputmode="email"
          required
          data-error="Escribe un correo electrónico válido con @."
          aria-describedby="cot-correo-err"
        />
        <p id="cot-correo-err" class="field__error" data-text="Escribe un correo electrónico válido con @." hidden />
      </div>
      <div class="field">
        <label for="cot-telefono">Teléfono de contacto</label>
        <input
          id="cot-telefono"
          name="telefono"
          type="tel"
          autocomplete="tel"
          inputmode="tel"
          data-error="Escribe un número telefónico de 10 dígitos."
          aria-describedby="cot-telefono-err"
        />
        <p id="cot-telefono-err" class="field__error" data-text="Escribe un número telefónico de 10 dígitos." hidden />
      </div>
      <div class="field field--full">
        <label for="cot-producto">Producto</label>
        <select
          id="cot-producto"
          name="producto"
          required
          data-error="Selecciona o indica la lámina, suela o fierraje que necesitas."
          aria-describedby="cot-producto-err"
        >
          <option value="">Selecciona un producto</option>
          {productos.map((p) => (
            <option value={p.sku} selected={validSku() === p.sku}>
              {productLabel(p.sku)}
            </option>
          ))}
          {PRODUCTO_EXTRA.map((o) => (
            <option value={o.value}>{o.label}</option>
          ))}
        </select>
        <p
          id="cot-producto-err"
          class="field__error"
          data-text="Selecciona o indica la lámina, suela o fierraje que necesitas."
          hidden
        />
      </div>
      <div class="field">
        <label for="cot-fierraje">Fierraje</label>
        <select id="cot-fierraje" name="fierraje" aria-describedby="cot-fierraje-err">
          <option value="">Elige un fierraje</option>
          {FIERRAJE_OPTS.map((f) => (
            <option value={f}>{f === 'no-se' ? 'No sé' : `Calibre ${f}`}</option>
          ))}
        </select>
        <p id="cot-fierraje-err" class="field__error" hidden />
      </div>
      <div class="field">
        <label for="cot-cantidad">Cantidad aproximada</label>
        <input
          id="cot-cantidad"
          name="cantidad"
          type="text"
          autocomplete="off"
          data-error="Indica la cantidad aproximada de láminas, pares o kilos a cotizar."
          aria-describedby="cot-cantidad-err"
        />
        <p
          id="cot-cantidad-err"
          class="field__error"
          data-text="Indica la cantidad aproximada de láminas, pares o kilos a cotizar."
          hidden
        />
      </div>
      <div class="field field--full">
        <label for="cot-mensaje">Mensaje</label>
        <textarea
          id="cot-mensaje"
          name="mensaje"
          required
          data-error="Escribe las especificaciones o el volumen de tu pedido."
          aria-describedby="cot-mensaje-err"
        />
        <p
          id="cot-mensaje-err"
          class="field__error"
          data-text="Escribe las especificaciones o el volumen de tu pedido."
          hidden
        />
      </div>
      <div class="field field--full">
        <input
          id="cot-privacidad"
          name="privacidad"
          type="checkbox"
          class="m-check"
          value="acepto"
          required
          data-error="Acepta el aviso de privacidad para enviar la cotización."
          aria-describedby="cot-privacidad-err"
          aria-labelledby="cot-privacidad-label"
        />
        <label id="cot-privacidad-label" for="cot-privacidad">
          Acepto el{' '}
          <a class="link" href="/privacidad">
            aviso de privacidad
          </a>
        </label>
        <p
          id="cot-privacidad-err"
          class="field__error"
          data-text="Acepta el aviso de privacidad para enviar la cotización."
          hidden
        />
      </div>
      <div class="btn-row field--full">
        <button type="submit" class="btn btn--primary">
          Solicitar cotización
        </button>
      </div>
      <p class="form__status" role="status" aria-live="polite">
        {status()}
      </p>
    </form>
  )
}