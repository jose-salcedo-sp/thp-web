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
  readonly description?: string
  readonly colores: readonly Color[]
  readonly grabado: Grabado
  readonly fierrajes: readonly Fierraje[]
  readonly img: string
}

export type Filtro = {
  calidad: CalidadFiltro
  color: ColorFiltro
  grabado: GrabadoFiltro
}

// Legacy note (content-inventory 5.1 #5): crn0cr and crn0zg have empty `colores: []`
// in source data, and `cafe` is present in `colores` without a matching SKU yet.
export const productos: readonly Producto[] = [
  {
    sku: 'cla0cr',
    calidad: 'crepe liga',
    nombre: 'crepe-liga grabado crepe',
    colores: ['ambar', 'oscura', 'rojiza'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cla0cr/768.jpg',
  },
  {
    sku: 'cra0cr',
    calidad: 'crepe',
    nombre: 'crepe ambar grabado crepe',
    colores: ['ambar', 'negro', 'blanco'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cra0cr/768.jpg',
  },
  {
    sku: 'cra0zg',
    calidad: 'crepe',
    nombre: 'crepe ambar grabado zig-zag',
    colores: ['ambar', 'negro', 'blanco'],
    grabado: 'zig zag',
    fierrajes: [5, 6, 9, 12],
    img: '/img/cra0zg/768.jpg',
  },
  {
    sku: 'crn0cr',
    calidad: 'crepe negro',
    nombre: 'crepe negro grabado crepe',
    colores: ['negro'],
    grabado: 'crepe',
    fierrajes: [5, 6, 9, 12],
    img: '/img/crn0cr/480.jpg',
  },
  {
    sku: 'crn0zg',
    calidad: 'crepe negro',
    nombre: 'crepe negro grabado zig-zag',
    colores: ['negro'],
    grabado: 'zig zag',
    fierrajes: [5, 6, 9, 12],
    img: '/img/crn0zg/768.jpg',
  },
] as const

export function filtrarProductos(filtro: Filtro): Producto[] {
  return productos.filter(
    (prod) =>
      (filtro.calidad === 'todo' || prod.calidad === filtro.calidad) &&
      (filtro.grabado === 'todo' || prod.grabado === filtro.grabado) &&
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
