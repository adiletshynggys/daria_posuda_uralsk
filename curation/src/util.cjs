// Helpers for the review batches in this folder.
const fs = require('fs');
const path = require('path');

// X('reason', 1, 2, 3) → drop entries
exports.X = (reason, ...is) => is.map((i) => ({ i, x: reason }));
exports.NEW = { ru: 'Новинка.', kk: 'Жаңа түскен үлгі.', en: 'New arrival.' };

// Checks that every index in [from, to) is covered exactly once, then writes curation/batch-<name>.json
exports.save = (name, from, to, entries) => {
  const seen = new Set();
  for (const e of entries) { if (seen.has(e.i)) throw new Error('duplicate index ' + e.i); seen.add(e.i); }
  const missing = []; for (let i = from; i < to; i++) if (!seen.has(i)) missing.push(i);
  const extra = [...seen].filter((i) => i < from || i >= to);
  if (missing.length) console.log('MISSING', missing.join(','));
  if (extra.length) console.log('OUT OF RANGE', extra.join(','));
  fs.writeFileSync(path.join(__dirname, '..', `batch-${name}.json`), '[\n' + entries.map((e) => JSON.stringify(e)).join(',\n') + '\n]\n');
  console.log(`batch-${name}: ${entries.length} entries, ${entries.filter((e) => e.c).length} products`);
};

// Indexes in [from, to) not covered by the given products / index lists.
exports.rest = (from, to, products, ...lists) => {
  const used = new Set([...products.map((p) => p.i), ...lists.flat()]);
  const out = []; for (let i = from; i < to; i++) if (!used.has(i)) out.push(i);
  return out;
};
