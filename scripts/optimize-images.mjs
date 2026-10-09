// Creates small WebP copies of every project screenshot so the site stays fast.
//
//   public/images/projects/<slug>/01.png
//     -> public/images/projects/<slug>/_opt/01-640.webp   (card thumbnails, gallery grid)
//     -> public/images/projects/<slug>/_opt/01-1600.webp  (gallery grid on retina, lightbox)
//
// Runs automatically before `npm run dev` and `npm run build` (also on Vercel).
// Files are only regenerated when the original is newer, so repeat runs are quick.
// The _opt folders are build output and are ignored by git.

import { readdir, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'public', 'images', 'projects')
const WIDTHS = [640, 1600]
const SOURCE = /\.(png|jpe?g|webp|avif)$/i

const mtime = async (file) => (await stat(file).catch(() => null))?.mtimeMs ?? 0

let made = 0
let skipped = 0

const slugs = await readdir(projectsDir, { withFileTypes: true }).catch(() => [])
for (const dir of slugs.filter((d) => d.isDirectory())) {
  const srcDir = path.join(projectsDir, dir.name)
  const outDir = path.join(srcDir, '_opt')
  const files = (await readdir(srcDir)).filter((f) => SOURCE.test(f))
  if (!files.length) continue
  await mkdir(outDir, { recursive: true })

  for (const file of files) {
    const input = path.join(srcDir, file)
    const base = file.replace(SOURCE, '')
    const srcTime = await mtime(input)
    for (const width of WIDTHS) {
      const output = path.join(outDir, `${base}-${width}.webp`)
      if ((await mtime(output)) >= srcTime) {
        skipped += 1
        continue
      }
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(output)
      made += 1
    }
  }
}

console.log(`optimize-images: ${made} created, ${skipped} up to date`)
