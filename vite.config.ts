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
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: false,
      },
      sitemap: {
        enabled: true,
        host: 'https://thp.com.mx',
      },
    }),
    solidPlugin({ ssr: true }),
  ],
})
