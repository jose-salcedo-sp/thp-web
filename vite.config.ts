import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import solidPlugin from '@solidjs/vite-plugin'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ['@ui-sdk/core'] },
  plugins: [
    tailwindcss(),
    tanstackStart({
      pages: [
        { path: '/' },
        { path: '/laminas' },
        { path: '/suelas' },
        { path: '/catalogo' },
        { path: '/catalogo/cla0cr' },
        { path: '/catalogo/cra0cr' },
        { path: '/catalogo/cra0zg' },
        { path: '/catalogo/crn0cr' },
        { path: '/catalogo/crn0zg' },
        { path: '/contacto' },
        { path: '/privacidad' },
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: false,
        filter: (page) => {
          if (
            page.path.includes('?') ||
            page.path.includes('#') ||
            (page.path.length > 1 && page.path.endsWith('/'))
          ) {
            page.sitemap = { ...page.sitemap, exclude: true }
            return false
          }
          return true
        },
      },
      sitemap: {
        enabled: true,
        host: 'https://thp.com.mx',
      },
    }),
    solidPlugin({ ssr: true }),
  ],
})
