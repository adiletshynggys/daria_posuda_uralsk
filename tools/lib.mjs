import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Raw Instagram export (photos\ + posts.jsonl). Override with DARIA_SRC=... if it moves.
export const SRC_DIR = process.env.DARIA_SRC || path.join(os.homedir(), 'Documents', 'daria-posuda');

const NAMED = { amp: '&', quot: '"', lt: '<', gt: '>', apos: "'", nbsp: ' ' };
export function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(amp|quot|lt|gt|apos|nbsp);/g, (_, n) => NAMED[n]);
}
