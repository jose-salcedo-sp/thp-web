import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({
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
