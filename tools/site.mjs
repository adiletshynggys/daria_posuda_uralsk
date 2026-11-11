// Hero, about and social-share images, chosen in curation/site.json (Instagram post ids).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT, SRC_DIR } from './lib.mjs';

const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'curation', 'site.json'), 'utf8'));
const src = (id) => path.join(SRC_DIR, 'photos', id + '.jpg');
const out = (f) => path.join(ROOT, 'img', f);
fs.mkdirSync(path.join(ROOT, 'img'), { recursive: true });

// Instagram originals are 1080px wide, so the "1800" hero is a gentle upscale kept light with a lower quality.
await sharp(src(cfg.hero)).resize({ width: 900 }).webp({ quality: 72, effort: 6 }).toFile(out('hero-900.webp'));
await sharp(src(cfg.hero)).resize({ width: 1800, kernel: 'lanczos3' }).webp({ quality: 68, effort: 6 }).toFile(out('hero-1800.webp'));
await sharp(src(cfg.about)).resize(900, 1200, { fit: 'inside' }).webp({ quality: 78 }).toFile(out('about.webp'));
await sharp(src(cfg.og || cfg.hero)).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out('og.jpg'));
const m = await sharp(out('hero-1800.webp')).metadata();
console.log('hero', m.width + 'x' + m.height, '| about, og written');
