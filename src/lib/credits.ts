export type PhotoCredit = {
  readonly slug: string
  readonly tema: string
  readonly autor: string
  readonly licencia: string
  readonly licenciaUrl: string
  readonly fuenteUrl: string
}

export const photoCredits: readonly PhotoCredit[] = [
  {
    slug: 'stand-calandra',
    tema: 'Calandra de rodillos para laminado de hule',
    autor: 'Vis M',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    fuenteUrl:
      'https://commons.wikimedia.org/wiki/File:Rubber_sheet_roller_machine_2016_04.jpg',
  },
  {
    slug: 'stand-suelas',
    tema: 'Suelas de hule moldeadas sin marca',
    autor: 'Oto Zapletal',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Shoe_soles_07.jpg',
  },
  {
    slug: 'stand-laminas-crepe',
    tema: 'Láminas crepé en línea de secado',
    autor: 'Sivahari',
    licencia: 'CC BY-SA 3.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Rubber_sheet.JPG',
  },
  {
    slug: 'stand-muestras-crepe',
    tema: 'Muestras de crepé natural y coloreado',
    autor: 'Vis M',
    licencia: 'CC BY 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/4.0',
    fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Crepe_rubbers.jpg',
  },
  {
    slug: 'stand-hormas-calzado',
    tema: 'Hormas metálicas para suela de calzado',
    autor: 'R. Henrik Nilsson',
    licencia: 'CC BY 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/4.0',
    fuenteUrl:
      'https://commons.wikimedia.org/wiki/File:Shoemakers_metal_last_on_stand_pre_1950s_Gothenburg_Sweden.jpg',
  },
  {
    slug: 'stand-almacen',
    tema: 'Almacén industrial con tarimas en rack',
    autor: 'Axisadman',
    licencia: 'CC BY-SA 3.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    fuenteUrl:
      'https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg',
  },
] as const