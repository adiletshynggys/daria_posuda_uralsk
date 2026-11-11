# Daria Posuda — showcase site

Static, mobile-first catalogue for the Daria Posuda tableware boutique (Uralsk). Plain HTML/CSS/JS, no backend, deployable on GitHub Pages.

- Three languages (RU / ҚАЗ / EN) and three looks (Ivory & Gold, Midnight, Rose), both remembered per visitor.
- "My selection" (hearts) → one tap sends the list to the shop's WhatsApp (+7 747 081 7281).
- Every product has a deep link: `…/#product=<instagram post id>`.

## Folders

| Path | What it is |
| --- | --- |
| `index.html`, `assets/` | The site. All UI text lives in `assets/js/i18n.js`. |
| `data/products.json` | The catalogue the site loads (generated — do not edit by hand). |
| `data/dropped.json` | Posts left out of the catalogue, with the reason. |
| `img/thumb`, `img/card`, `img/full` | WebP photos (480 / 900 / 1600 px), generated. |
| `curation/` | The hand-made part: categories, names, descriptions (see below). |
| `tools/` | Node scripts that build the data and images. |
| `old/` | The previous one-page site, kept for reference. |

The raw Instagram export (`photos\`, `posts.jsonl`, `scrape.ps1`) stays in `Documents\daria-posuda` and is never modified. If it moves, set the `DARIA_SRC` environment variable to the new folder.

## Preview locally

```bash
npm install
npm run serve
```

Then open http://localhost:5173.

## Rebuild the data

```bash
npm run data
```

That runs, in order:

1. `tools/parse.mjs` — reads `posts.jsonl`, strips the "N likes…" prefix and hashtags, guesses date / price / set size / brand → `data/parsed.json`.
2. `tools/build.mjs` — merges those with `curation/` → `data/products.json` and `data/dropped.json`, and prints category counts.
3. `tools/images.mjs` — converts photos of kept products to WebP and makes the blurred placeholders (skips files already done; `--force` redoes all).
4. `tools/build.mjs` again, to pick up image sizes.

`node tools/site.mjs` regenerates the hero, about and share (Open Graph) images named in `curation/site.json`.

Prices are never invented: a price appears only if it was found in the caption or typed into the curation file. Otherwise the site shows "Price on request".

## Add or edit a product

The first full review of the Instagram feed lives in `curation/src/b*.cjs` (one file per ~120 posts, in feed order) and is compiled to `curation/batch-*.json`. You do not need to touch those: anything you put in `curation/catalog.json` overrides them.

Products are keyed by Instagram post id (the part after `/p/` in the post link). Add or change an entry in `curation/catalog.json`:

```json
{
  "DfjBq02DUSi": {
    "c": "dinner",
    "t": "dinnerset", "s": "Прага", "sEn": "Praga",
    "o": "cz", "b": null, "p": 12, "k": 72, "price": 450000,
    "d": { "ru": "…", "kk": "…", "en": "…" }
  }
}
```

| Key | Meaning |
| --- | --- |
| `c` | Category: `dinner`, `tea`, `plates`, `cutlery`, `kettles`, `glass`, `trays`, `bedding`, `gifts`, `other` |
| `t` | Product type from `curation/types.json`; the name is generated from it in all three languages |
| `s` / `sEn` | Series name (and its English spelling) |
| `n` | Full name override: `{ "ru": "…", "kk": "…", "en": "…" }` |
| `b`, `o` | Brand, origin (`cz`, `tr`, `ae`, `cn`, `it`, …) |
| `p`, `k` | Persons, number of pieces |
| `price` | Price in tenge (number). Leave out for "price on request" |
| `priceMax` | Optional upper price, shown as "22 000 – 24 000 ₸" |
| `d` | Description in three languages |
| `f` | Number; higher = shown earlier |
| `x` | Drop the post, with a reason: `{ "x": "review" }` |
| `mergeInto` | Post id of another product: this post's photo becomes an extra photo of it |

For a brand-new post: add its photo as `photos\<id>.jpg` and a line to `posts.jsonl` in the source folder (or rerun `scrape.ps1`), add the entry above, then `npm run data`.

## Deploy to GitHub Pages

1. Create a repository and push this folder (`node_modules/` is ignored).
2. Repository → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. `og:image` and `og:url` in `index.html` already point at `https://adiletshynggys.github.io/daria_posuda_uralsk/`. Update both if the site moves to another address, so link previews in WhatsApp keep showing the picture.

The site uses only relative paths, so it works from a sub-folder address without changes.
