import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { Loading } from 'solid-js'
import type { JSX } from '@solidjs/web'

import styleCss from '../styles.css?url'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Transformadora de Hules y Plásticos | Suelas y Láminas de Hule',
      },
      {
        name: 'description',
        content:
          'Fabricante mexicano de suelas de hule, láminas industriales y tapetes de alta resistencia.',
      },
      { name: 'theme-color', content: '#9F013B' },
    ],
    links: [
      { rel: 'stylesheet', href: styleCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootComponent,
})

function RootComponent(props: { children: JSX.Element }) {
  return (
    <html lang="es-MX">
      <head>
        <HeadContent />
      </head>
      <body>
        <Loading>{props.children}</Loading>
        <Scripts />
      </body>
    </html>
  )
}
