import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SRC_DIR = 'assets-src/videos'
const OUT_DIR = 'public/video'
const POSTER_DIR = 'assets-src/photos'
const MANIFEST_PATH = 'src/lib/videos.gen.ts'
const VIDEO_EXT = /\.(mp4|mov|m4v|webm)$/i

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      files.push(...(await collectFiles(full)))
    } else if (VIDEO_EXT.test(e.name)) {
      files.push(full)
    }
  }
  return files.sort()
}

async function ffprobe(file: string): Promise<{ width: number; height: number; duration: number }> {
  const proc = Bun.spawn(
    [
      'ffprobe',
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height',
      '-show_entries',
      'format=duration',
      '-of',
      'json',
      file,
    ],
    { stdout: 'pipe', stderr: 'pipe' },
  )
  const code = await proc.exited
  if (code !== 0) {
    const err = await new Response(proc.stderr).text()
    throw new Error(`ffprobe failed for ${file}: ${err}`)
  }
  const json = JSON.parse(await new Response(proc.stdout).text()) as {
    streams: { width: number; height: number }[]
    format: { duration?: string }
  }
  const stream = json.streams[0]
  const duration = parseFloat(json.format.duration ?? '0')
  return { width: stream.width, height: stream.height, duration }
}

function scaledSize(iw: number, ih: number, maxW: number): { width: number; height: number } {
  const width = Math.min(maxW, iw)
  let height = Math.round((ih * width) / iw)
  if (height % 2 !== 0) height -= 1
  return { width, height }
}

async function isStale(outPath: string, srcMtime: Date): Promise<boolean> {
  try {
    const outStat = await stat(outPath)
    return outMtimeNotAfter(outStat.mtime, srcMtime)
  } catch {
    return true
  }
}

function outMtimeNotAfter(out: Date, src: Date): boolean {
  return out.getTime() <= src.getTime()
}

async function ffmpeg(args: string[], label: string): Promise<void> {
  const proc = Bun.spawn(['ffmpeg', '-hide_banner', '-loglevel', 'error', ...args], {
    stdout: 'pipe',
    stderr: 'pipe',
  })
  const code = await proc.exited
  if (code !== 0) {
    const err = await new Response(proc.stderr).text()
    throw new Error(`${label} failed (${code}): ${err}`)
  }
}

async function transcode(
  input: string,
  outPath: string,
  scaleMax: number,
  codecArgs: string[],
  srcMtime: Date,
  label: string,
): Promise<void> {
  if (!(await isStale(outPath, srcMtime))) return
  await mkdir(path.dirname(outPath), { recursive: true })
  await ffmpeg(
    [
      '-y',
      '-i',
      input,
      '-an',
      '-vf',
      `scale='min(${scaleMax},iw)':-2`,
      ...codecArgs,
      outPath,
    ],
    label,
  )
}

await mkdir(SRC_DIR, { recursive: true })

const files = await collectFiles(SRC_DIR)

const manifest: Record<string, { width: number; height: number; duration: number }> = {}

if (files.length === 0) {
  console.log(`No source videos in ${SRC_DIR} — skipping transcode.`)
} else {
  for (const file of files) {
    const slug = path.basename(file, path.extname(file)).toLowerCase()
    const srcStat = await stat(file)
    const srcMtime = srcStat.mtime
    const probe = await ffprobe(file)
    const { width, height } = scaledSize(probe.width, probe.height, 1280)

    const outSlugDir = path.join(OUT_DIR, slug)
    const posterPath = path.join(POSTER_DIR, `video-${slug}.jpg`)

    await transcode(
      file,
      path.join(outSlugDir, '1280.webm'),
      1280,
      ['-c:v', 'libsvtav1', '-crf', '34', '-preset', '6'],
      srcMtime,
      `${slug} 1280.webm`,
    )
    await transcode(
      file,
      path.join(outSlugDir, '1280.mp4'),
      1280,
      [
        '-c:v',
        'libx264',
        '-crf',
        '23',
        '-preset',
        'slow',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
      ],
      srcMtime,
      `${slug} 1280.mp4`,
    )
    await transcode(
      file,
      path.join(outSlugDir, '720.mp4'),
      720,
      [
        '-c:v',
        'libx264',
        '-crf',
        '23',
        '-preset',
        'slow',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
      ],
      srcMtime,
      `${slug} 720.mp4`,
    )

    if (await isStale(posterPath, srcMtime)) {
      await mkdir(POSTER_DIR, { recursive: true })
      await ffmpeg(
        ['-y', '-ss', '1', '-i', file, '-frames:v', '1', '-q:v', '2', posterPath],
        `${slug} poster`,
      )
    }

    manifest[slug] = { width, height, duration: probe.duration }
  }
  console.log(`Processed ${files.length} source video(s) -> ${OUT_DIR}`)
}

const sortedEntries = Object.keys(manifest)
  .sort()
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(manifest[k])},`)
  .join('\n')

const code = `// Auto-generated by scripts/videos.ts — do not edit manually.
export const videos = {
${sortedEntries}
} as const

export type VideoSlug = keyof typeof videos
`

await mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
await writeFile(MANIFEST_PATH, code)