// Step 2: merge data/parsed.json with the curation files into data/products.json.
//   curation/catalog.json   — one entry per kept product (keyed by Instagram post id)
//   curation/batch-*.json   — review batches (keyed by post index), folded in automatically
//   curation/types.json     — product-type names in ru/kk/en (used to generate names)
//   curation/snippets.json  — reusable description blocks (e.g. set composition)
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const read = (p, fb) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fb);
const C = (f) => path.join(ROOT, 'curation', f);
const posts = read(path.join(ROOT, 'data', 'parsed.json'));
const types = read(C('types.json'), {});
const snippets = read(C('snippets.json'), {});
const images = read(path.join(ROOT, 'data', 'images.json'), {});
const CATS = ['dinner', 'tea', 'plates', 'cutlery', 'kettles', 'glass', 'trays', 'bedding', 'gifts', 'other'];
const LANGS = ['ru', 'kk', 'en'];

// ---- collect curation entries, keyed by post id --------------------------
const cur = new Map();
for (const f of fs.readdirSync(C('.')).filter((f) => /^batch-\d+\.json$/.test(f)).sort()) {
  for (const e of read(C(f))) {
    const p = posts[e.i];
    if (!p) { console.warn(`${f}: index ${e.i} not in parsed.json`); continue; }
    const { i, m, ...rest } = e;
    cur.set(p.id, { ...rest, ...(m !== undefined ? { mergeInto: posts[m]?.id } : {}) });
  }
}
for (const [id, e] of Object.entries(read(C('catalog.json'), {}))) cur.set(id, e); // manual edits win

// ---- helpers --------------------------------------------------------------
const ruPieces = (n) => {
  const a = n % 10, b = n % 100;
  return `${n} ${a === 1 && b !== 11 ? 'предмет' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'предмета' : 'предметов'}`;
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function makeName(e) {
  if (e.n && LANGS.every((l) => e.n[l])) return e.n;
  const t = types[e.t];
  if (!t) throw new Error(`no name and unknown type "${e.t}"`);
  const sEn = e.sEn || e.s;
  const name = {
    ru: [t.ru, e.b, e.s && `«${e.s}»`].filter(Boolean).join(' '),
    kk: cap([e.b, e.s && `«${e.s}»`, t.kk].filter(Boolean).join(' ')),
    en: cap([e.b, sEn, t.en].filter(Boolean).join(' ')),
  };
  if (e.p) { name.ru += `, ${e.p} персон`; name.kk += `, ${e.p} адамға`; name.en += `, for ${e.p}`; }
  if (e.k) { name.ru += `, ${ruPieces(e.k)}`; name.kk += `, ${e.k} зат`; name.en += `, ${e.k} pieces`; }
  return { ...name, ...(e.n || {}) };
}
function makeDesc(e) {
  const d = { ru: '', kk: '', en: '' };
  for (const l of LANGS) d[l] = [e.d?.[l], e.comp && snippets[e.comp]?.[l]].filter(Boolean).join(' ');
  return d;
}
const img = (id) => ({ thumb: `img/thumb/${id}.webp`, card: `img/card/${id}.webp`, full: `img/full/${id}.webp`, ...(images[id] || {}) });

// ---- build ----------------------------------------------------------------
const products = [], dropped = [], pending = [], errors = [];
const byId = new Map();
for (const p of posts) {
  const e = cur.get(p.id);
  if (!e) { pending.push(p.id); continue; }
  if (e.x) { dropped.push({ id: p.id, url: p.url, reason: e.x, date: p.date, text: p.text.slice(0, 140) }); continue; }
  if (e.mergeInto) continue; // handled below
  try {
    if (!CATS.includes(e.c)) throw new Error(`bad category "${e.c}"`);
    if (!p.image) throw new Error('no photo downloaded');
    const price = e.price ?? null; // only a price confirmed by hand from the caption — never guessed
    const prod = {
      id: p.id, category: e.c, type: e.t || null,
      brand: e.b || null, origin: e.o || null,
      price: Number.isFinite(price) ? price : null,
      priceMax: Number.isFinite(price) && Number.isFinite(e.priceMax) ? e.priceMax : null, // for "22 000 – 24 000 ₸" ranges
      persons: e.p || null, pieces: e.k || null,
      date: p.date, featured: e.f || 0,
      photo: img(p.id), photos: [],
      instagramUrl: p.url,
      name: makeName(e), description: makeDesc(e),
      original: p.text,
    };
    products.push(prod); byId.set(p.id, prod);
  } catch (err) { errors.push(`${p.id}: ${err.message}`); }
}
for (const p of posts) {
  const e = cur.get(p.id);
  if (!e?.mergeInto) continue;
  const main = byId.get(e.mergeInto);
  if (!main) { errors.push(`${p.id}: merge target ${e.mergeInto} is not a product`); continue; }
  if (p.image) main.photos.push({ ...img(p.id), instagramUrl: p.url });
}
products.sort((a, b) => (b.featured - a.featured) || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

const out = { generated: new Date().toISOString().slice(0, 10), count: products.length, products };
fs.writeFileSync(path.join(ROOT, 'data', 'products.json'), JSON.stringify(out));
fs.writeFileSync(path.join(ROOT, 'data', 'dropped.json'), JSON.stringify(dropped, null, 1));

const tally = (arr, f) => arr.reduce((a, x) => { const k = f(x) ?? '—'; a[k] = (a[k] || 0) + 1; return a; }, {});
console.log(`posts ${posts.length} | products ${products.length} (+${products.reduce((n, p) => n + p.photos.length, 0)} extra photos) | dropped ${dropped.length} | not reviewed yet ${pending.length}`);
console.log('by category:', Object.fromEntries(CATS.map((c) => [c, products.filter((p) => p.category === c).length])));
console.log('dropped by reason:', tally(dropped, (d) => d.reason));
console.log('with price:', products.filter((p) => p.price).length, '| brands:', tally(products, (p) => p.brand), '| origins:', tally(products, (p) => p.origin));
if (errors.length) { console.error('ERRORS:\n' + errors.join('\n')); process.exitCode = 1; }
