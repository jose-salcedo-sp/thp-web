import { unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE = 'public/thp-mark.webp'
const OUT_DIR = 'public'
const BG = '#FAF9F6'
const PADDING_RATIO = 0.12

const trimmed = await sharp(SOURCE).trim().png().toBuffer()

async function plainIcon(size: number, filename: string) {
  await sharp(trimmed)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(OUT_DIR, filename))
}

async function paddedIcon(size: number, filename: string) {
  const inner = Math.round(size * (1 - PADDING_RATIO * 2))
  const mark = await sharp(trimmed)
    .resize(inner, inner, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: BG,
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(OUT_DIR, filename))
}

await Promise.all([
  plainIcon(32, 'favicon-32.png'),
  plainIcon(16, 'favicon-16.png'),
  paddedIcon(180, 'apple-touch-icon.png'),
  paddedIcon(192, 'icon-192.png'),
  paddedIcon(512, 'icon-512.png'),
])

await unlink(path.join(OUT_DIR, 'favicon.svg')).catch(() => {})

const manifest = {
  name: 'THP Hules',
  short_name: 'THP',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: '#9F013B',
  background_color: BG,
  display: 'browser',
}

await writeFile(
  path.join(OUT_DIR, 'site.webmanifest'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)

console.log('Favicons written to public/')