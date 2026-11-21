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

// A code in visible copy. href, value, src, slug and JSON-LD path/sku fields are stripped first.
const visibleCodeRe =
  /SKU\s*[{$]|SKU\s+[A-Z0-9]|\.sku\.toUpperCase\(\)|\bsku(?:\(\))?\.toUpperCase\(\)|\b(?:cla|cra|crn|CLA|CRA|CRN)0(?:cr|zg|CR|ZG)\b/

const hiddenAttrRe =
  /\b(?:href|value|src|slug|path|item|url|sku)\s*(?:=|:)\s*/g

function skipString(line: string, open: number): number {
  const q = line[open]
  for (let i = open + 1; i < line.length; i++) {
    if (line[i] === '\\') {
      i++
      continue
    }
    if (q === '`' && line[i] === '$' && line[i + 1] === '{') {
      i = skipBraces(line, i + 1) - 1
      continue
    }
    if (line[i] === q) return i + 1
  }
  return line.length
}

function skipBraces(line: string, open: number): number {
  let depth = 0
  for (let i = open; i < line.length; i++) {
    const c = line[i]
    if (c === '"' || c === "'" || c === '`') {
      i = skipString(line, i) - 1
      continue
    }
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return i + 1
    }
  }
  return line.length
}

function skipBare(line: string, start: number): number {
  let depth = 0
  for (let i = start; i < line.length; i++) {
    const c = line[i]
    if (c === '"' || c === "'" || c === '`') {
      i = skipString(line, i) - 1
      continue
    }
    if (c === '{' || c === '(') depth++
    else if (c === '}' || c === ')') depth = Math.max(0, depth - 1)
    else if (c === ',' && depth === 0) return i
  }
  return line.length
}

function stripHiddenCodeSlots(line: string): string {
  let out = ''
  let cursor = 0
  for (const match of line.matchAll(hiddenAttrRe)) {
    const start = match.index ?? 0
    if (start < cursor) continue
    out += line.slice(cursor, start)
    let next = start + match[0].length
    const c = line[next]
    if (c === '"' || c === "'" || c === '`') next = skipString(line, next)
    else if (c === '{') next = skipBraces(line, next)
    else next = skipBare(line, next)
    cursor = next
  }
  out += line.slice(cursor)
  return out
}

function showsCatalogueCode(line: string): boolean {
  const cleaned = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '')
  return visibleCodeRe.test(stripHiddenCodeSlots(cleaned))
}

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
    if (/\/catalogo\?sku=/i.test(line)) {
      errors.push(`${rel}:${lineNo} — Internal product link '/catalogo?sku=' forbidden; use '/catalogo/<sku>'`)
    }
    if (rel.endsWith('.tsx')) {
      const cleaned = line.replace(/\/\/.*$/, '')
      const matches = cleaned.match(hexRe)
      if (matches) {
        errors.push(`${rel}:${lineNo} — Hex color literal (${matches.join(', ')}) forbidden in .tsx; use CSS tokens`)
      }
      if (showsCatalogueCode(line)) {
        errors.push(
          `${rel}:${lineNo} — Catalogue code in visible text; name the product, and keep the code in href, value, or JSON-LD`,
        )
      }
    }
  })

  if (rel.startsWith('src/routes/') && rel.endsWith('.tsx') && !/\bhead\s*:/.test(text)) {
    errors.push(`${rel} — Route file is missing 'head:' metadata configuration (use seo() from src/lib/seo.ts)`)
  }
}

const sitemapPath = 'dist/client/sitemap.xml'
try {
  const sitemapXml = await readFile(sitemapPath, 'utf8')
  const withoutDecl = sitemapXml.replace(/^<\?xml[^?]*\?>\s*/i, '')
  if (/[?#]/.test(withoutDecl)) {
    errors.push(`${sitemapPath} — Sitemap must not contain URLs with '?' or '#'`)
  }
} catch {
  errors.push(`${sitemapPath} — Missing built sitemap (run 'bun run build' before 'bun run lint:standards')`)
}

if (errors.length > 0) {
  console.error('Coding standards check failed:\n' + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`Standards check passed (${files.length} files inspected).`)
