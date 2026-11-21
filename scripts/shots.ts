// bun run shots [page ...] [--widths 1440,820,390] [--out shots/current]
// Full-page screenshots of the built site (run `bun run build` first). Pages are route paths: / /catalogo /catalogo/cla0cr
import { spawnSync } from 'node:child_process'
import { homedir } from 'node:os'
import { mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const flag = (name: string, fallback: string) => {
  const i = args.indexOf(name)
  return i >= 0 ? args.splice(i, 2)[1] : fallback
}
const widths = flag('--widths', '1440,1100,820,390').split(',')
const out = flag('--out', 'shots/current')
const pages = args.length
  ? args
  : ['/', '/laminas', '/suelas', '/catalogo', '/catalogo/cla0cr', '/contacto', '/privacidad']
const shoot = `${homedir()}/.agents/skills/design-taste-frontend/scripts/shoot.mjs`

mkdirSync(out, { recursive: true })
for (const page of pages) {
  const name = page === '/' ? 'index' : page.slice(1).replaceAll('/', '-')
  for (const w of widths) {
    const file = `${out}/${name}-${w}.png`
    const r = spawnSync('node', [shoot, '--url', `dist/client${page === '/' ? '' : page}`, '--root', 'dist/client', '--w', w, '--out', file, '--profile', '.taste-skill/chrome-shots', '--no-tiles', '--reduced'], { stdio: 'ignore' })
    console.log(r.status === 0 ? file : `FAILED ${file}`)
  }
}
