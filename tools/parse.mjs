// Step 1: read the raw Instagram export (posts.jsonl) and produce data/parsed.json
// with cleaned captions and machine-guessed fields (date, price, set size, brand, category).
// Human/Claude curation in curation/*.json overrides these guesses in build.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { SRC_DIR, ROOT, decodeEntities } from './lib.mjs';

const rows = fs.readFileSync(path.join(SRC_DIR, 'posts.jsonl'), 'utf8')
  .replace(/^﻿/, '').split(/\r?\n/).filter(Boolean)
  .map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);

const MONTHS = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
const DATE = '(January|February|March|April|May|June|July|August|September|October|November|December) (\\d{1,2}), (\\d{4})';

function splitCaption(raw) {
  let s = decodeEntities(decodeEntities(raw || '')).replace(/\r/g, '').trim();
  let author = null, date = null, text = '';
  // A: 12 likes, 3 comments - user on November 6, 2026: "TEXT".
  let m = s.match(new RegExp(`^[\\d,.KkMm]+ likes?, [\\d,.KkMm]+ comments? - ([\\w.]+) on ${DATE}(?:: "([\\s\\S]*)"\\.?)?\\s*$`));
  if (m) { author = m[1]; date = [m[4], MONTHS[m[2]], m[3]]; text = m[5] || ''; }
  else {
    // B: TEXT - @user on November 6, 2026
    m = s.match(new RegExp(`^([\\s\\S]*?)\\s*-\\s*@([\\w.]+) on ${DATE}\\s*$`));
    if (m) { text = m[1]; author = m[2]; date = [m[5], MONTHS[m[3]], m[4]]; }
    else text = s;
  }
  const iso = date ? `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}` : null;
  return { author, date: iso, text: text.trim() };
}

function stripTags(text) {
  const tags = [...text.matchAll(/#([\p{L}\p{N}_]+)/gu)].map((m) => m[1].toLowerCase());
  const clean = text
    .replace(/#[\p{L}\p{N}_]+[^\s#]*/gu, '')        // hashtags (with trailing emoji)
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();
  return { tags, clean };
}

// ---- field guesses -------------------------------------------------------
function guessPrice(t) {
  // 45 000 тг / 45.000₸ / 45000 тенге / 45 мың (тг)
  const s = t.replace(/8\s?7\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g, ' ').replace(/\+?7\s?7\d{2}[\s\d]{7,10}/g, ' ');
  let m = s.match(/(\d{1,3}(?:[ ., ]\d{3})+|\d{4,7})\s*(?:тг|тенге|теңге|тңг|₸|kzt)/i);
  if (m) return Number(m[1].replace(/[^\d]/g, ''));
  m = s.match(/(\d{1,3})\s*(?:мың|тыс)\.?\s*(?:тг|тенге|теңге|₸)/i);
  if (m) return Number(m[1]) * 1000;
  return null;
}
function guessPersons(t) {
  const m = t.match(/(\d{1,2})\s*[- ]?\s*(?:персон|перс\b|перс\.|адамға|кісілік|адамдық|person)/i);
  return m ? Number(m[1]) : null;
}
function guessPieces(t) {
  const m = t.match(/(\d{1,3})\s*[- ]?\s*(?:предмет|зат\b|заттан|дана|пр\b|пр\.)/i);
  return m ? Number(m[1]) : null;
}
const BRANDS = [
  ['Elamina', /elamina|эламина/i], ['Léevan', /l[eé]{1,2}van|леван/i], ['Dynex', /dynex|динекс/i],
  ['Zepter', /zepter|цептер/i], ['Bohemia', /bohemia|богемия|богемское/i], ['Thun', /\bthun\b|тхун/i],
  ['Leander', /leander|леандер/i], ['Bernadotte', /bernadotte|бернадот/i], ['Karaca', /karaca|карача/i],
  ['Korkmaz', /korkmaz|коркмаз/i], ['Pasabahce', /pa[sş]abah[cç]e|пашабахче/i], ['Emsan', /emsan|эмсан/i],
  ['Schafer', /sch[aä]fer|шафер/i], ['Luminarc', /luminarc|люминарк/i], ['Royal', /\broyal\b/i],
];
const ORIGINS = [
  ['cz', /чех|czech|check\b|прага|praga|prague|bohemia|богем/i], ['tr', /турци|түрки|turk|🇹🇷/i],
  ['ae', /дубай|dubai|🇦🇪/i], ['cn', /қытай|китай|china|🇨🇳/i], ['it', /итали|italy|🇮🇹/i],
  ['de', /герман|german|🇩🇪/i], ['jp', /япон|japan|🇯🇵/i], ['ru', /росси|ресей|🇷🇺/i], ['uz', /узбек|өзбек|🇺🇿/i],
];
// order matters: first hit wins
const CATS = [
  ['bedding', /постел|төсек|көрпе|одеял|плед|жамылғы|покрывал|подушк|жастық|сүлгі|полотенц/i],
  ['cutlery', /қасық|ложк|вилк|шанышқы|пышақ|нож|столов\w+ прибор|мельхиор прибор/i],
  ['kettles', /шәйнек|шайнек|шәйнег|чайник|кастр[юө]л|қазан|казан|сковород|таба\b|самауыр|самовар|термос|кофейник|турка/i],
  ['glass', /фужер|бокал|стакан|стақан|рюмк|графин|хрусталь|кувшин|құмыра/i],
  ['tea', /чайн\w+ (?:сервиз|набор|пар)|шай (?:сервиз|жиынты)|кесе|пиал|кружк|чашк|кофейн/i],
  ['dinner', /сервиз|персон|адамға арналған|столов\w+ набор/i],
  ['trays', /поднос|этажерк|фруктовниц|конфетниц|кәмпит|ваза|менажниц|подставк|тортниц|биік аяқты|жасау/i],
  ['plates', /тарел|табақ|блюд|салатниц|астау/i],
  ['gifts', /сыйлық|подар|набор/i],
];
const NONPRODUCT = /отзыв|пікір|розыгрыш|ұтыс|конкурс|мотивац|құттықтай|поздравля|туған күн|с днем|мереке|рахмет|алғыс|жеңімпаз|победител|гив|giveaway|бата|ән шашу|қонақтар|достығ/i;

const out = rows.map((r) => {
  const { author, date, text } = splitCaption(r.caption);
  const { tags, clean } = stripTags(text);
  const hay = clean + ' ' + tags.join(' ');
  const cat = (CATS.find(([, re]) => re.test(clean)) || [null])[0];
  const brand = (BRANDS.find(([, re]) => re.test(hay)) || [null])[0];
  const originText = (ORIGINS.find(([, re]) => re.test(clean)) || [null])[0];
  const originTag = (ORIGINS.find(([, re]) => re.test(tags.join(' '))) || [null])[0];
  return {
    id: r.id, url: r.url, image: r.image, author, date, text: clean, tags,
    guess: {
      cat, brand, origin: originText, originTag, price: guessPrice(clean),
      persons: guessPersons(clean), pieces: guessPieces(clean),
      nonProduct: (author && author !== 'daria_posuda_uralsk') || NONPRODUCT.test(clean) || (!cat && clean.length < 4),
    },
  };
});

fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data', 'parsed.json'), JSON.stringify(out, null, 1));
const count = (f) => out.reduce((a, p) => { const k = f(p) ?? '—'; a[k] = (a[k] || 0) + 1; return a; }, {});
console.log('posts:', out.length, '| with photo:', out.filter((p) => p.image).length, '| no date:', out.filter((p) => !p.date).length);
console.log('guessed category:', count((p) => p.guess.cat));
console.log('guessed non-product:', out.filter((p) => p.guess.nonProduct).length, '| price found:', out.filter((p) => p.guess.price).length);
console.log('brand:', count((p) => p.guess.brand), 'origin:', count((p) => p.guess.origin));
