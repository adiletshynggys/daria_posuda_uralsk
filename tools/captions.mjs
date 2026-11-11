// Print cleaned captions for a range of posts (review helper).
// Usage: node tools/captions.mjs <from> <to> [maxChars]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'parsed.json'), 'utf8'));
const [from, to, max] = [Number(process.argv[2] || 0), Number(process.argv[3] || posts.length), Number(process.argv[4] || 420)];
for (let i = from; i < Math.min(to, posts.length); i++) {
  const p = posts[i], g = p.guess;
  const meta = [g.brand, g.origin || (g.originTag && '#' + g.originTag), g.persons && g.persons + 'p', g.pieces && g.pieces + 'pc', g.price && g.price + '₸', p.author !== 'daria_posuda_uralsk' && '@' + p.author].filter(Boolean).join(' ');
  const t = p.text.replace(/\n+/g, ' / ').replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ');
  console.log(`${i} [${meta}] ${t.slice(0, max)}${t.length > max ? '…' : ''}`);
}
