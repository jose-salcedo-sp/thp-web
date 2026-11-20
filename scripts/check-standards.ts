import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.(ts|tsx)$/.test(e.name) && !e.name.endsWith('.gen.ts')) out.push(p)
  }
  return out
}

const files = await walk('src')
const errors: string[] = []
const hexRe = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g

for (const file of files) {
  const rel = file.replace(/\\/g, '/')
  const text = await readFile(file, 'utf8')
  const lines = text.split('\n')

  lines.forEach((line, idx) => {
    const lineNo = idx + 1
    if (/\bsolid-js\/web\b/.test(line)) {
      errors.push(`${rel}:${lineNo} — Forbidden import 'solid-js/web' (use '@solidjs/web' in Solid 2.0)`)
    }
    if (rel !== 'src/components/Picture.tsx' && /<img\b/.test(line)) {
      errors.push(`${rel}:${lineNo} — Raw <img> tag forbidden; use <Picture> from src/components/Picture.tsx`)
    }
    if (rel.endsWith('.tsx')) {
      const cleaned = line.replace(/\/\/.*$/, '')
      const matches = cleaned.match(hexRe)
      if (matches) {
        errors.push(`${rel}:${lineNo} — Hex color literal (${matches.join(', ')}) forbidden in .tsx; use CSS tokens`)
      }
    }
  })

  if (rel.startsWith('src/routes/') && rel.endsWith('.tsx') && !/\bhead\s*:/.test(text)) {
    errors.push(`${rel} — Route file is missing 'head:' metadata configuration (use seo() from src/lib/seo.ts)`)
  }
}

if (errors.length > 0) {
  console.error('Coding standards check failed:\n' + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`Standards check passed (${files.length} files inspected).`)
