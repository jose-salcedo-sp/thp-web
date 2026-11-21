import type { Producto } from './catalogue'

export const SITE_URL = 'https://thp.com.mx'
export const THEME_COLOR = '#faf9f6'

export type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
}

export function seo({ title, description, path, image }: SeoInput) {
  const fullTitle = /\bTHP\b/i.test(title) ? title : `${title} | THP Hules`
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const url = `${SITE_URL}${cleanPath}`
  const relImg = image ?? '/img/antifatiga/1600.jpg'
  const imgUrl = relImg.startsWith('http')
    ? relImg
    : `${SITE_URL}${relImg.startsWith('/') ? relImg : `/${relImg}`}`

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: 'THP Hules' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_MX' },
      { property: 'og:image', content: imgUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imgUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export function jsonLd(obj: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(obj),
  }
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Manufacturer'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Transformadora de Hules y Plásticos (THP)',
    alternateName: 'THP Hules',
    url: SITE_URL,
    logo: `${SITE_URL}/thp_logo.png`,
    image: `${SITE_URL}/img/planta/1600.jpg`,
    email: 'info@thp.com.mx',
    telephone: '(33) 3684-2909',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '(33) 3684-2909',
        contactType: 'sales',
        areaServed: 'MX',
        availableLanguage: 'es',
      },
      {
        '@type': 'ContactPoint',
        telephone: '(33) 3684-3037',
        contactType: 'sales',
        areaServed: 'MX',
        availableLanguage: 'es',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Las Flores 1643',
      addressLocality: 'Col. La Florida, Zapopan',
      addressRegion: 'Jalisco',
      postalCode: '45234',
      addressCountry: 'MX',
    },
    openingHours: 'Mo-Sa 07:00-15:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '07:00',
        closes: '15:00',
      },
    ],
  }
}

export function productLd(product: Producto) {
  const url = `${SITE_URL}/catalogo/${product.sku}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product.sku.toUpperCase(),
    name: product.nombre,
    description:
      product.fichaDescription ??
      product.description ??
      `Lámina de hule ${product.calidad} con grabado ${product.grabado}, fierrajes ${product.fierrajes.join(', ')}.`,
    image: `${SITE_URL}${product.img}`,
    url,
    brand: {
      '@type': 'Brand',
      name: 'THP Hules',
    },
    manufacturer: {
      '@id': `${SITE_URL}/#organization`,
    },
    material: 'Hule',
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Calidad', value: product.calidad },
      { '@type': 'PropertyValue', name: 'Grabado', value: product.grabado },
      {
        '@type': 'PropertyValue',
        name: 'Fierrajes',
        value: product.fierrajes.join(', '),
      },
      ...(product.colores.length
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Colores',
              value: product.colores.join(', '),
            },
          ]
        : []),
    ],
  }
}

export function breadcrumbLd(
  items: readonly { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  }
}
