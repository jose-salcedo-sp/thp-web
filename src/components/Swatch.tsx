import { type Color, colorLabels } from '../lib/catalogue'

const swatchColor: Record<Color, string> = {
  ambar: 'bg-swatch-ambar border-ink/28',
  oscura: 'bg-swatch-oscura border-ink/28',
  rojiza: 'bg-swatch-rojiza border-ink/28',
  blanco: 'bg-swatch-blanco border-ink/45',
  cafe: 'bg-swatch-cafe border-ink/28',
  negro: 'bg-swatch-negro border-ink/28',
}

export function SwatchDot(props: { color: Color }) {
  return (
    <span
      class={`inline-block size-3.5 flex-none rounded-full border ${swatchColor[props.color]}`}
      aria-hidden="true"
    />
  )
}

export function SwatchChip(props: { color: Color }) {
  return (
    <span class="inline-flex items-center gap-1.5 text-body leading-[1.4] text-ink not-first:ml-2">
      <SwatchDot color={props.color} />
      {colorLabels[props.color]}
    </span>
  )
}
