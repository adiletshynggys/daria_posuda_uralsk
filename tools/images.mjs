// Step 3: optimise photos for every product in data/products.json.
//   img/thumb/<id>.webp — max 480px, for the grid on phones
//   img/card/<id>.webp  — max 900px, for the grid on large / high-density screens
//   img/full/<id>.webp  — max 1600px, for the detail view
//   data/images.json    — width/height + tiny blurred base64 placeholder per photo
// Originals in the source folder are never modified. Already-converted files are skipped
// (pass --force to redo everything).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT, SRC_DIR } from './lib.mjs';

const force = process.argv.includes('--force');
const { products } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const metaFile = path.join(ROOT, 'data', 'images.json');
const meta = !force && fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};
for (const d of ['thumb', 'card', 'full']) fs.mkdirSync(path.join(ROOT, 'img', d), { recursive: true });

const ids = [...new Set(products.flatMap((p) => [p.id, ...p.photos.map((x) => path.basename(x.card, '.webp'))]))];
let done = 0, skipped = 0, failed = 0;

async function load(src) {
  // Reel covers often carry black letterbox bars: trim them when that keeps most of the picture.
  const base = sharp(src).rotate();
  const { width, height } = await base.metadata();
  try {
    const { data, info } = await sharp(src).rotate().trim({ threshold: 18 }).toBuffer({ resolveWithObject: true });
    if (info.width * info.height >= width * height * 0.35 && (info.width < width - 8 || info.height < height - 8)) return sharp(data);
  } catch { /* nothing to trim */ }
  return sharp(src).rotate();
}

for (const id of ids) {
  const src = path.join(SRC_DIR, 'photos', id + '.jpg');
  const thumb = path.join(ROOT, 'img', 'thumb', id + '.webp'), card = path.join(ROOT, 'img', 'card', id + '.webp'), full = path.join(ROOT, 'img', 'full', id + '.webp');
  if (!force && meta[id] && fs.existsSync(thumb) && fs.existsSync(card) && fs.existsSync(full)) { skipped++; continue; }
  if (!fs.existsSync(src)) { console.warn('missing original:', id); failed++; continue; }
  try {
    const im = await load(src);
    const buf = await im.toBuffer();
    const c = await sharp(buf).resize(900, 900, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(card);
    await sharp(buf).resize(480, 600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 70, effort: 5 }).toFile(thumb);
    await sharp(buf).resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(full);
    const lq = await sharp(buf).resize(16, 16, { fit: 'inside' }).blur(1).webp({ quality: 30 }).toBuffer();
    meta[id] = { w: c.width, h: c.height, lq: 'data:image/webp;base64,' + lq.toString('base64') };
    done++;
    if (done % 50 === 0) { console.log(`  ${done} converted…`); fs.writeFileSync(metaFile, JSON.stringify(meta)); }
  } catch (err) { console.warn('failed:', id, err.message); failed++; }
}
fs.writeFileSync(metaFile, JSON.stringify(meta));
console.log(`images: ${done} converted, ${skipped} up to date, ${failed} failed (of ${ids.length})`);
