import { createFileRoute } from '@tanstack/solid-router'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Fabricante de Suelas y Láminas de Hule en Guadalajara',
      description:
        'Fabricamos láminas de hule crepé, suelas para calzado y desarrollos de hule a la medida en Zapopan, Jalisco.',
      path: '/',
    }),
  component: Home,
})

function Home() {
  return (
    <main class="p-8">
      <h1 class="text-2xl font-semibold">
        Transformadora de Hules y Plásticos
      </h1>
    </main>
  )
}
