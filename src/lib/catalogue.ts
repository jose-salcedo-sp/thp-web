import type { ImageSlug } from './images.gen'

export const calidades = ['todo', 'crepe', 'crepe liga', 'crepe negro'] as const
export const colores = ['todo', 'ambar', 'oscura', 'rojiza', 'blanco', 'cafe', 'negro'] as const
export const grabados = ['todo', 'crepe', 'zig zag'] as const
export const fierrajes = ['todo', 5, 6, 9, 12] as const

export type CalidadFiltro = (typeof calidades)[number]
export type ColorFiltro = (typeof colores)[number]
export type GrabadoFiltro = (typeof grabados)[number]
export type FierrajeFiltro = (typeof fierrajes)[number]

export type Calidad = Exclude<CalidadFiltro, 'todo'>
export type Color = Exclude<ColorFiltro, 'todo'>
export type Grabado = Exclude<GrabadoFiltro, 'todo'>
export type Fierraje = Exclude<FierrajeFiltro, 'todo'>

export type ProductSku = Extract<
  ImageSlug,
  'cla0cr' | 'cra0cr' | 'cra0zg' | 'crn0cr' | 'crn0zg'
>

export type Producto = {
  readonly sku: ProductSku
  readonly calidad: Calidad
  readonly nombre: string
  readonly description: string
  readonly fichaDescription: string
  readonly seoTitle: string
  readonly seoDescription: string
  readonly alt: string
  readonly colores: readonly Color[]
  readonly grabado: Grabado
  readonly fierrajes: readonly Fierraje[]
  readonly img: string
}

export type Filtro = {
  calidad: CalidadFiltro
  color: ColorFiltro
  grabado: GrabadoFiltro
  fierraje?: FierrajeFiltro
}

export const calidadLabels: Record<CalidadFiltro, string> = {
  todo: 'Todo',
  crepe: 'Crepé',
  'crepe liga': 'Crepé liga',
  'crepe negro': 'Crepé negro',
}

export const grabadoLabels: Record<GrabadoFiltro, string> = {
  todo: 'Todo',
  crepe: 'Crepé',
  'zig zag': 'Zig-zag',
}

export const colorLabels: Record<ColorFiltro, string> = {
  todo: 'Todo',
  ambar: 'Ámbar',
  oscura: 'Oscura',
  rojiza: 'Rojiza',
  blanco: 'Blanco',
  cafe: 'Café',
  negro: 'Negro',
}

export const fierrajeLabels: Record<string, string> = {
  todo: 'Todo',
  '5': 'Calibre 5',
  '6': 'Calibre 6',
  '9': 'Calibre 9',
  '12': 'Calibre 12',
}

// Legacy note (content-inventory 5.1 #5): crn0cr and crn0zg had empty `colores: []`
// in source data; normalized to `['negro']` per design-plan.md.
export const productos: readonly Producto[] = [
  {
    sku: 'cla0cr',
    calidad: 'crepe liga',
    nombre: 'Crepé liga grabado crepé',
    description:
      'Calidad crepé liga con textura crepé tradicional en tonos ámbar, oscura y rojiza.',
    fichaDescription:
      'Lámina formulada en calidad crepé liga con acabado granulado crepé. Se fabrica en tonos ámbar, oscura y rojiza dentro de los fierrajes 5, 6, 9 y 12 para talleres que buscan flexibilidad y agarre clásico en piso de calzado.',
    seoTitle: 'Crepé liga grabado crepé en fierrajes 5 a 12 | THP Hule',
    seoDescription:
      'Lámina de hule crepé liga con grabado crepé en tonos ámbar, oscura y rojiza. Fierrajes 5, 6, 9 y 12 fabricados en nuestra planta de Zapopan, México.',
    alt: 'Muestra macro de lámina de hule crepé liga en tono ámbar con grabado crepé granulado',
    colores: ['ambar', 'oscura', 'rojiza'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cla0cr/1080.jpg',
  },
  {
    sku: 'cra0cr',
    calidad: 'crepe',
    nombre: 'Crepé ámbar grabado crepé',
    description:
      'Lámina de calidad crepé con huella crepé en colores ámbar, negro y blanco.',
    fichaDescription:
      'Lámina de calidad crepé con textura crepé uniforme. Disponible en colores ámbar, negro y blanco en fierrajes 5, 6, 9 y 12, pensada para suelas y entresuelas de calzado casual con cantos limpios.',
    seoTitle: 'Crepé ámbar grabado crepé en fierrajes 5 a 12 | THP Hule',
    seoDescription:
      'Lámina de hule crepé con grabado crepé en colores ámbar, negro y blanco. Calibres en fierrajes 5, 6, 9 y 12 para talleres y fábricas de calzado.',
    alt: 'Muestra macro de lámina de hule crepé ámbar con huella crepé uniforme',
    colores: ['ambar', 'negro', 'blanco'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cra0cr/1080.jpg',
  },
  {
    sku: 'cra0zg',
    calidad: 'crepe',
    nombre: 'Crepé ámbar grabado zig-zag',
    description:
      'Lámina de calidad crepé con relieve en espiga zig-zag en tonos ámbar, negro y blanco.',
    fichaDescription:
      'Lámina de calidad crepé prensada con placa de grabado zig-zag en espiga. Se entrega en colores ámbar, negro y blanco en fierrajes 5, 6, 9 y 12 para calzado que requiere mayor tracción longitudinal.',
    seoTitle: 'Crepé ámbar grabado zig-zag en fierrajes 5 a 12 | THP Hule',
    seoDescription:
      'Lámina de hule crepé con grabado zig-zag en colores ámbar, negro y blanco. Disponible en fierrajes 5, 6, 9 y 12 para corte de suela y piso de calzado.',
    alt: 'Muestra macro de lámina de hule crepé ámbar con relieve zig-zag en espiga',
    colores: ['ambar', 'negro', 'blanco'],
    grabado: 'zig zag',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cra0zg/1080.jpg',
  },
  {
    sku: 'crn0cr',
    calidad: 'crepe negro',
    nombre: 'Crepé negro grabado crepé',
    description:
      'Compuesto de crepé negro uniforme con acabado crepé para calzado de línea e industrial.',
    fichaDescription:
      'Lámina de calidad crepé negro con textura crepé cerrada en fierrajes 5, 6, 9 y 12. Diseñada para pisos de calzado e industria que piden color negro continuo y resistencia al roce diario.',
    seoTitle: 'Crepé negro grabado crepé en fierrajes 5 a 12 | THP Hule',
    seoDescription:
      'Lámina de hule crepé negro con grabado crepé en fierrajes 5, 6, 9 y 12. Compuesto de hule negro de planta para calzado e industria en Zapopan.',
    alt: 'Muestra macro de lámina de hule crepé negro con grabado crepé granulado sobre base de caucho',
    colores: ['negro'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/crn0cr/1080.jpg',
  },
  {
    sku: 'crn0zg',
    calidad: 'crepe negro',
    nombre: 'Crepé negro grabado zig-zag',
    description:
      'Lámina de crepé negro con grabado zig-zag de tracción profunda en fierrajes 5, 6, 9 y 12.',
    fichaDescription:
      'Lámina de calidad crepé negro con relieve zig-zag de huella marcada en fierrajes 5, 6, 9 y 12. Recomendada para suelas de trabajo, bota ligera y calzado de uso rudo con requerimiento antiderrapante.',
    seoTitle: 'Crepé negro grabado zig-zag en fierrajes 5 a 12 | THP Hule',
    seoDescription:
      'Lámina de hule crepé negro con grabado zig-zag en fierrajes 5, 6, 9 y 12. Tracción en espiga para suela de trabajo y calzado casual hecho en México.',
    alt: 'Muestra macro de lámina de hule crepé negro con grabado zig-zag de tracción profunda',
    colores: ['negro'],
    grabado: 'zig zag',
    fierrajes: [5, 6, 9, 12],
    img: '/img/crn0zg/1080.jpg',
  },
] as const

export function filtrarProductos(filtro: Filtro): Producto[] {
  return productos.filter(
    (prod) =>
      (filtro.calidad === 'todo' || prod.calidad === filtro.calidad) &&
      (filtro.grabado === 'todo' || prod.grabado === filtro.grabado) &&
      (!filtro.fierraje ||
        filtro.fierraje === 'todo' ||
        prod.fierrajes.includes(filtro.fierraje)) &&
      (filtro.color === 'todo' || prod.colores.includes(filtro.color)),
  )
}

export function getProductoBySku(sku: string): Producto | undefined {
  return productos.find((p) => p.sku === sku.toLowerCase())
}

export const color_conversion: Record<ColorFiltro, string> = {
  ambar: '#FFBF00',
  oscura: '#5A5A5A',
  rojiza: '#FF0000',
  blanco: '#FFFFFF',
  cafe: '#A52A2A',
  negro: '#000000',
  todo: '',
}
