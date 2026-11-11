// Contact sheets for reviewing categories by eye: curation/sheets/sheet-NNN.jpg
// Each tile shows the photo, a running number, and the guessed category.
// Usage: node tools/sheets.mjs [startIndex] [endIndex]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT, SRC_DIR } from './lib.mjs';

const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'parsed.json'), 'utf8'));
const from = Number(process.argv[2] || 0), to = Number(process.argv[3] || posts.length);
const COLS = 6, ROWS = 5, W = 256, H = 320, LAB = 22;
const outDir = path.join(ROOT, 'curation', 'sheets');
fs.mkdirSync(outDir, { recursive: true });
const esc = (s) => s.replace(/[<>&]/g, '');

for (let i = from; i < to; i += COLS * ROWS) {
  const chunk = posts.slice(i, Math.min(i + COLS * ROWS, to));
  const comps = [];
  for (let k = 0; k < chunk.length; k++) {
    const p = chunk[k];
    const x = (k % COLS) * W, y = Math.floor(k / COLS) * (H + LAB);
    const file = path.join(SRC_DIR, 'photos', p.id + '.jpg');
    if (fs.existsSync(file)) {
      try {
        comps.push({ input: await sharp(file).resize(W - 4, H, { fit: 'contain', background: '#222' }).toBuffer(), left: x + 2, top: y + LAB });
      } catch { /* unreadable image */ }
    }
    const label = `${i + k} ${p.guess.nonProduct ? 'X ' : ''}${p.guess.cat || '?'}`;
    comps.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${LAB}"><rect width="100%" height="100%" fill="#000"/><text x="4" y="16" font-family="Arial" font-size="15" font-weight="bold" fill="#ffe36b">${esc(label)}</text></svg>`), left: x, top: y });
  }
  const name = `sheet-${String(i).padStart(4, '0')}.jpg`;
  await sharp({ create: { width: COLS * W, height: ROWS * (H + LAB), channels: 3, background: '#444' } })
    .composite(comps).jpeg({ quality: 72 }).toFile(path.join(outDir, name));
  console.log(name, chunk.length);
}
