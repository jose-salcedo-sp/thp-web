import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { Loading } from 'solid-js'
import type { JSX } from '@solidjs/web'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { THEME_COLOR, jsonLd, organizationLd } from '../lib/seo'
import styleCss from '../styles.css?url'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { name: 'page-type', content: 'product' },
      { name: 'site-kind', content: 'other' },
      { name: 'theme-color', content: THEME_COLOR },
    ],
    links: [
      {
        rel: 'preload',
        href: '/fonts/albert-sans-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: '/kit/system.css' },
      { rel: 'stylesheet', href: '/kit/ui/cards.css' },
      { rel: 'stylesheet', href: '/kit/motion/motion.css' },
      { rel: 'stylesheet', href: '/kit/backgrounds/backgrounds.css' },
      { rel: 'stylesheet', href: '/kit/layout/layout.css' },
      { rel: 'stylesheet', href: '/kit/icons/icon.css' },
      { rel: 'stylesheet', href: styleCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'modulepreload', href: '/kit/moments/moments.js' },
      { rel: 'modulepreload', href: '/kit/moments/lib.js' },
      {
        rel: 'modulepreload',
        href: '/kit/moments/word-highlight/moment.js',
      },
      {
        rel: 'modulepreload',
        href: '/kit/moments/picture-develops/moment.js',
      },
    ],
    scripts: [
      {
        children:
          "if(location.pathname.endsWith('/index.html'))history.replaceState(history.state,'',location.pathname.slice(0,-10)+location.search+location.hash);document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)",
      },
      {
        children:
          "document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)",
      },
      jsonLd(organizationLd()),
    ],
  }),
  shellComponent: RootComponent,
})

function RootComponent(props: { children: JSX.Element }) {
  return (
    <html
      lang="es-MX"
      data-type="product"
      data-radius="soft"
      data-buttons="solid"
      data-motion=""
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteHeader />
        <Loading>{props.children}</Loading>
        <SiteFooter />
        <Scripts />
        <script type="module" src="/kit/system.js" />
        <script type="module" src="/kit/motion/motion.js" />
        <script type="module" src="/kit/layout/layout.js" />
      </body>
    </html>
  )
}
