/* Daria Posuda — catalogue logic. No dependencies. */
(function () {
  'use strict';

  var CFG = {
    whatsapp: '77470817281',                       // +7 747 081 7281
    data: 'data/products.json',
    pageSize: 24,
    maxShare: 20,                                  // items per WhatsApp message
    maxUrl: 6000,                                  // keep wa.me links comfortably short
    cats: ['dinner', 'tea', 'plates', 'cutlery', 'kettles', 'glass', 'trays', 'bedding', 'gifts', 'other']
  };
  var T = window.I18N.t;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var store = {
    get: function (k, fb) { try { var v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var icon = function (id) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var S = {
    products: [], byId: {}, list: [], shown: 0, loaded: false,
    f: { cat: 'all', source: '', persons: '', min: '', max: '', q: '', sort: 'new' },
    wish: store.get('dp.wish', []),
    current: null, photoIdx: 0, openedByUi: false
  };
  if (!Array.isArray(S.wish)) S.wish = [];

  // ---------- helpers ----------
  var L = function (obj) { var l = window.I18N.lang; return (obj && (obj[l] || obj.ru || obj.kk || obj.en)) || ''; };
  var fmtPrice = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; };
  var priceStr = function (p) { return !p.price ? '' : p.priceMax ? fmtPrice(p.price).replace('\u00A0₸', '') + ' – ' + fmtPrice(p.priceMax) : fmtPrice(p.price); };
  var priceText = function (p) { return priceStr(p) || T('price.onRequest'); };
  var productUrl = function (id) { return location.origin + location.pathname + '#product=' + encodeURIComponent(id); };
  var waUrl = function (text, toShop) { return 'https://wa.me/' + (toShop ? CFG.whatsapp : '') + '?text=' + encodeURIComponent(text); };
  var originName = function (o) { return o ? T('origin.' + o) : ''; };
  function tagLine(p) {
    return [p.brand, originName(p.origin)].filter(Boolean).join(' · ');
  }
  function setLine(p) {
    return [p.persons && T('unit.persons', { n: p.persons }), p.pieces && T('unit.pieces', { n: p.pieces })].filter(Boolean).join(' · ');
  }
  function toast(msg) {
    var el = $('#toast');
    // A toast must stay visible above an open <dialog> (top layer), so it lives inside the topmost one.
    var host = $$('dialog[open]').pop() || document.body; if (el.parentNode !== host) host.appendChild(el);
    el.textContent = msg; void el.offsetWidth; el.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  // ---------- WhatsApp messages ----------
  function itemLine(p, i, compact) {
    var name = L(p.name);
    var cut = compact === 2 ? 18 : 34;
    if (compact && name.length > cut) name = name.slice(0, cut - 1).trim() + '…';
    var parts = [name];
    if (p.price) parts.push(priceStr(p)); else if (!compact) parts.push(T('price.onRequest'));
    parts.push(productUrl(p.id));
    return (i == null ? '' : (i + 1) + ') ') + parts.join(' — ');
  }
  function selectionMessage() {
    var items = S.wish.map(function (id) { return S.byId[id]; }).filter(Boolean);
    var send = items.slice(0, CFG.maxShare), rest = items.length - send.length;
    var build = function (compact) {
      var lines = [T('msg.hello')].concat(send.map(function (p, i) { return itemLine(p, i, compact); }));
      if (rest > 0) lines.push(T('msg.more', { n: rest }));
      return lines.join('\n');
    };
    var msg = build(false);
    if (waUrl(msg, true).length > CFG.maxUrl) msg = build(1);
    if (waUrl(msg, true).length > CFG.maxUrl) msg = build(2);
    return msg;
  }
  var askMessage = function (p) { return T('msg.helloOne') + '\n' + itemLine(p, null, false); };
  var shareMessage = function (p) { return T('msg.share') + '\n' + L(p.name) + (p.price ? ' — ' + priceStr(p) : '') + '\n' + productUrl(p.id); };

  // ---------- theme & language ----------
  function setTheme(name, save) {
    document.documentElement.setAttribute('data-theme', name);
    if (save) store.set('dp.theme', name);
    $$('[data-theme-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === name)); });
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  }
  function initHeader() {
    setTheme(document.documentElement.getAttribute('data-theme') || 'ivory', false);
    var btn = $('#themeBtn'), menu = $('#themeMenu');
    var close = function () { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden));
      if (!menu.hidden) $('[aria-pressed="true"]', menu).focus();
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('[data-theme-set]'); if (!b) return;
      setTheme(b.getAttribute('data-theme-set'), true); close(); btn.focus();
    });
    document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.theme')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); } });

    $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { window.I18N.setLang(b.getAttribute('data-lang')); }); });
    document.addEventListener('dp:lang', onLang);

    var header = $('#siteHeader'), hero = $('.hero'), media = $('#heroMedia'), ticking = false;
    var onScroll = function () {
      ticking = false;
      var y = window.scrollY, h = hero.offsetHeight;
      header.classList.toggle('solid', y > h - 80);
      if (!reduceMotion && y < h) media.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    $('#year').textContent = new Date().getFullYear();
  }
  function setGeneralLinks() {
    $$('[data-wa-general]').forEach(function (a) { a.href = waUrl(T('wa.hello'), true); });
  }

  // ---------- reveal on scroll ----------
  var revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }) : null;
  function reveal(els) { els.forEach(function (el) { if (revealIO) revealIO.observe(el); else el.classList.add('in'); }); }

  // ---------- filters ----------
  function matches(p, f, skipCat) {
    if (!skipCat && f.cat !== 'all' && p.category !== f.cat) return false;
    if (f.source) {
      var kind = f.source.slice(0, 2), val = f.source.slice(2);
      if (kind === 'o:' && p.origin !== val) return false;
      if (kind === 'b:' && p.brand !== val) return false;
    }
    if (f.persons && String(p.persons) !== f.persons) return false;
    if (f.min !== '' && !(p.price && p.price >= Number(f.min))) return false;
    if (f.max !== '' && !(p.price && p.price <= Number(f.max))) return false;
    if (f.q) {
      var words = f.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < words.length; i++) if (p._hay.indexOf(words[i]) < 0) return false;
    }
    return true;
  }
  function applyFilters() {
    var f = S.f;
    var list = S.products.filter(function (p) { return matches(p, f); });
    if (f.sort === 'priceAsc' || f.sort === 'priceDesc') {
      var dir = f.sort === 'priceAsc' ? 1 : -1;
      list.sort(function (a, b) { if (!a.price !== !b.price) return a.price ? -1 : 1; return ((a.price || 0) - (b.price || 0)) * dir; });
    }
    S.list = list; S.shown = 0;
    $('#grid').innerHTML = '';
    renderMore();
    renderChips();
    var active = (f.source ? 1 : 0) + (f.persons ? 1 : 0) + (f.min !== '' || f.max !== '' ? 1 : 0);
    var fc = $('#filterCount'); fc.hidden = !active; fc.textContent = active;
    $('#resetBtn').hidden = !(active || f.q || f.cat !== 'all' || f.sort !== 'new');
    $('#resultCount').textContent = T('filter.count', { n: list.length });
    var state = $('#gridState');
    state.hidden = list.length > 0; if (!list.length) state.textContent = T('filter.empty');
  }
  function renderChips() {
    var counts = { all: 0 };
    S.products.forEach(function (p) { if (matches(p, S.f, true)) { counts.all++; counts[p.category] = (counts[p.category] || 0) + 1; } });
    var totals = {}; S.products.forEach(function (p) { totals[p.category] = 1; });
    var keys = ['all'].concat(CFG.cats.filter(function (c) { return totals[c]; }));
    $('#chips').innerHTML = keys.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="' + (S.f.cat === c) + '">' + esc(T('cat.' + c)) + ' <small>' + (counts[c] || 0) + '</small></button>';
    }).join('');
  }
  function renderFilterOptions() {
    var origins = {}, brands = {}, persons = {}, priced = 0;
    S.products.forEach(function (p) {
      if (p.origin) origins[p.origin] = (origins[p.origin] || 0) + 1;
      if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1;
      if (p.persons) persons[p.persons] = 1;
      if (p.price) priced++;
    });
    var opt = function (v, label, sel) { return '<option value="' + esc(v) + '"' + (sel === v ? ' selected' : '') + '>' + esc(label) + '</option>'; };
    var byCount = function (o) { return Object.keys(o).sort(function (a, b) { return o[b] - o[a] || a.localeCompare(b); }); };
    var src = opt('', T('filter.anySource'), S.f.source);
    if (Object.keys(origins).length) src += '<optgroup label="' + esc(T('filter.origins')) + '">' + byCount(origins).map(function (o) { return opt('o:' + o, originName(o), S.f.source); }).join('') + '</optgroup>';
    if (Object.keys(brands).length) src += '<optgroup label="' + esc(T('filter.brands')) + '">' + byCount(brands).map(function (b) { return opt('b:' + b, b, S.f.source); }).join('') + '</optgroup>';
    $('#fSource').innerHTML = src;
    $('#fPersons').innerHTML = opt('', T('filter.anyPersons'), S.f.persons) + Object.keys(persons).map(Number).sort(function (a, b) { return a - b; })
      .map(function (n) { return opt(String(n), T('filter.personsN', { n: n }), S.f.persons); }).join('');
    // Price controls only make sense when some products actually carry a price.
    $('#priceField').hidden = priced === 0;
    $('#fSort').innerHTML = opt('new', T('sort.new'), S.f.sort) + (priced ? opt('priceAsc', T('sort.priceAsc'), S.f.sort) + opt('priceDesc', T('sort.priceDesc'), S.f.sort) : '');
    $('#sortField').hidden = priced === 0;
  }
  function initFilters() {
    $('#chips').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]'); if (!b) return;
      S.f.cat = b.getAttribute('data-cat'); applyFilters();
      var bar = $('#filterbar'), top = $('#collection').querySelector('.result-line').getBoundingClientRect().top;
      if (top < bar.offsetHeight) window.scrollTo({ top: window.scrollY + top - bar.offsetHeight - $('#siteHeader').offsetHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    var qT;
    $('#q').addEventListener('input', function (e) { clearTimeout(qT); var v = e.target.value.trim(); qT = setTimeout(function () { S.f.q = v; applyFilters(); }, 180); });
    $('#fSource').addEventListener('change', function (e) { S.f.source = e.target.value; applyFilters(); });
    $('#fPersons').addEventListener('change', function (e) { S.f.persons = e.target.value; applyFilters(); });
    $('#fSort').addEventListener('change', function (e) { S.f.sort = e.target.value; applyFilters(); });
    ['fMin', 'fMax'].forEach(function (id) {
      $('#' + id).addEventListener('input', function (e) { S.f[id === 'fMin' ? 'min' : 'max'] = e.target.value; clearTimeout(qT); qT = setTimeout(applyFilters, 250); });
    });
    var tg = $('#filterToggle'), panel = $('#filterPanel');
    tg.addEventListener('click', function () { var open = panel.classList.toggle('open'); tg.setAttribute('aria-expanded', String(open)); });
    $('#resetBtn').addEventListener('click', function () {
      S.f = { cat: 'all', source: '', persons: '', min: '', max: '', q: '', sort: 'new' };
      $('#q').value = ''; $('#fMin').value = ''; $('#fMax').value = '';
      renderFilterOptions(); applyFilters();
    });
    $('#moreBtn').addEventListener('click', renderMore);
  }

  // ---------- grid ----------
  function cardHTML(p) {
    var name = L(p.name), inSel = S.wish.indexOf(p.id) > -1, ph = p.photo, extra = p.photos ? p.photos.length : 0;
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card-media"' + (ph.lq ? ' style="background-image:url(' + ph.lq + ')"' : '') + '>' +
        '<img loading="lazy" decoding="async" src="' + esc(ph.thumb || ph.card) + '"' +
          (ph.thumb ? ' srcset="' + esc(ph.thumb) + ' 480w, ' + esc(ph.card) + ' 900w" sizes="(min-width:1000px) 23vw, (min-width:640px) 31vw, 46vw"' : '') +
          (ph.w ? ' width="' + ph.w + '" height="' + ph.h + '"' : '') + ' alt="' + esc(name) + '">' +
        (extra ? '<span class="card-count" aria-hidden="true">1/' + (extra + 1) + '</span>' : '') +
      '</div>' +
      '<div class="card-actions">' +
        '<button type="button" class="icon-btn heart" data-act="wish" aria-pressed="' + inSel + '" aria-label="' + esc(T(inSel ? 'card.remove' : 'card.add')) + '">' + icon('heart') + '</button>' +
        '<button type="button" class="icon-btn" data-act="share" aria-label="' + esc(T('card.share')) + '">' + icon('share') + '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<p class="card-tag">' + esc(tagLine(p)) + '</p>' +
        '<h3><a href="#product=' + encodeURIComponent(p.id) + '">' + esc(name) + '</a></h3>' +
        '<p class="card-price' + (p.price ? ' has' : '') + '">' + esc(priceText(p)) + '</p>' +
      '</div></article>';
  }
  function renderMore() {
    var grid = $('#grid'), next = S.list.slice(S.shown, S.shown + CFG.pageSize);
    if (next.length) {
      var tmp = document.createElement('div');
      tmp.innerHTML = next.map(cardHTML).join('');
      var cards = Array.prototype.slice.call(tmp.children);
      cards.forEach(function (c, i) {
        c.style.transitionDelay = (Math.min(i, 7) * 45) + 'ms';
        var img = $('img', c);
        var done = function () { img.classList.add('loaded'); };
        if (img.complete && img.naturalWidth) done(); else { img.addEventListener('load', done); img.addEventListener('error', done); }
        grid.appendChild(c);
      });
      reveal(cards);
      S.shown += next.length;
    }
    $('#moreBtn').hidden = S.shown >= S.list.length;
    grid.setAttribute('aria-busy', 'false');
  }
  var moreIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) {
    if (en[0].isIntersecting && S.loaded && S.shown < S.list.length) renderMore();
  }, { rootMargin: '700px 0px' }) : null;

  function initGrid() {
    $('#grid').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      e.preventDefault();
      var p = S.byId[b.closest('.card').getAttribute('data-id')];
      if (b.getAttribute('data-act') === 'wish') toggleWish(p.id); else share(p);
    });
    if (moreIO) moreIO.observe($('.more-wrap'));
  }

  // ---------- selection (wishlist) ----------
  function toggleWish(id, silent) {
    var i = S.wish.indexOf(id), added = i < 0;
    if (added) S.wish.push(id); else S.wish.splice(i, 1);
    store.set('dp.wish', S.wish);
    syncWish(id);
    if (!silent) { toast(T(added ? 'toast.added' : 'toast.removed')); }
    var fab = $('#selFab'); fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump');
  }
  function syncWish(id) {
    var n = S.wish.filter(function (x) { return S.byId[x]; }).length;
    var c = $('#wishCount'); c.hidden = !n; c.textContent = n;
    $('#wishBtn').setAttribute('data-has', n ? '1' : '0');
    $('#selFab').hidden = !n; $('#selFabText').textContent = T('drawer.fab', { n: n });
    $$('.card').forEach(function (card) {
      if (id && card.getAttribute('data-id') !== id) return;
      var on = S.wish.indexOf(card.getAttribute('data-id')) > -1, b = $('.heart', card);
      b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', T(on ? 'card.remove' : 'card.add'));
    });
    if (S.current && (!id || S.current.id === id)) syncDetailWish();
    if ($('#drawer').open) renderDrawer();
  }
  function renderDrawer() {
    var items = S.wish.map(function (id) { return S.byId[id]; }).filter(Boolean);
    var body = $('#drawerBody');
    if (!items.length) body.innerHTML = '<p class="drawer-empty">' + esc(T('drawer.empty')) + '</p>';
    else body.innerHTML = '<ul>' + items.map(function (p, i) {
      var name = L(p.name);
      return '<li class="sel-item' + (i >= CFG.maxShare ? ' over' : '') + '">' +
        '<img src="' + esc(p.photo.thumb || p.photo.card) + '" alt="" loading="lazy" width="64" height="80">' +
        '<div><a href="#product=' + encodeURIComponent(p.id) + '">' + esc(name) + '</a><small>' + esc(priceText(p)) + '</small></div>' +
        '<button type="button" class="icon-btn" data-remove="' + esc(p.id) + '" aria-label="' + esc(T('drawer.remove', { name: name })) + '">' + icon('trash') + '</button></li>';
    }).join('') + '</ul>';
    $('#drawerFoot').hidden = !items.length;
    var warn = $('#drawerWarn'); warn.hidden = items.length <= CFG.maxShare;
    warn.textContent = T('drawer.limit', { max: CFG.maxShare });
    if (items.length) $('#drawerSend').href = waUrl(selectionMessage(), true);
  }
  function openDrawer() { var d = $('#drawer'); renderDrawer(); if (!d.open) d.showModal(); }
  function initDrawer() {
    var d = $('#drawer');
    $('#wishBtn').addEventListener('click', openDrawer);
    $('#selFab').addEventListener('click', openDrawer);
    $('#drawerClose').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $('#drawerBody').addEventListener('click', function (e) {
      var r = e.target.closest('[data-remove]');
      if (r) { toggleWish(r.getAttribute('data-remove'), true); var nextBtn = $('[data-remove]', d) || $('#drawerClose'); nextBtn.focus(); return; }
      if (e.target.closest('a[href^="#product="]')) d.close();
    });
    $('#drawerClear').addEventListener('click', function () { S.wish = []; store.set('dp.wish', S.wish); syncWish(); $('#drawerClose').focus(); });
    window.addEventListener('storage', function (e) { if (e.key === 'dp.wish') { S.wish = store.get('dp.wish', []); syncWish(); } });
  }

  // ---------- share ----------
  function share(p) {
    var url = productUrl(p.id), name = L(p.name);
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      navigator.share({ title: name + ' — Daria Posuda', text: T('msg.share') + ' ' + name, url: url }).catch(function () {});
      return;
    }
    $('#shareName').textContent = name;
    $('#shareUrl').value = url;
    $('#shareWa').href = waUrl(shareMessage(p), false);
    var d = $('#shareDlg'); if (!d.open) d.showModal();
    $('#shareCopy').focus();
  }
  function initShare() {
    var d = $('#shareDlg');
    $('#shareClose').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $('#shareUrl').addEventListener('focus', function (e) { e.target.select(); });
    $('#shareCopy').addEventListener('click', function () {
      var input = $('#shareUrl'), ok = function () { toast(T('share.copied')); }, fail = function () { input.focus(); input.select(); toast(T('share.copyFail')); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(input.value).then(ok, function () { legacy(); });
      else legacy();
      function legacy() { input.focus(); input.select(); try { if (document.execCommand('copy')) ok(); else fail(); } catch (e) { fail(); } }
    });
  }

  // ---------- product detail ----------
  function hashId() { var m = location.hash.match(/^#product=(.+)$/); return m ? decodeURIComponent(m[1]) : null; }
  function allPhotos(p) { return [p.photo].concat(p.photos || []); }
  function syncDetailWish() {
    var b = $('#pdWish'); if (!b) return;
    var on = S.wish.indexOf(S.current.id) > -1;
    b.setAttribute('aria-pressed', String(on));
    $('span', b).textContent = T(on ? 'detail.added' : 'detail.add');
  }
  function renderDetail() {
    var p = S.current, name = L(p.name), desc = L(p.description), photos = allPhotos(p);
    var ph = photos[S.photoIdx] || photos[0];
    var idx = S.list.indexOf(p), hasNav = idx > -1 && S.list.length > 1;
    var specs = [
      p.brand && [T('detail.brand'), p.brand], p.origin && [T('detail.origin'), originName(p.origin)],
      setLine(p) && [T('detail.set'), setLine(p)], [T('detail.category'), T('cat.' + p.category)]
    ].filter(Boolean);
    var ig = (ph.instagramUrl || p.instagramUrl);
    $('#pdBox').innerHTML =
      '<div class="pd-top">' +
        '<div class="pd-navs">' + (hasNav ? '<button type="button" class="icon-btn pd-nav" data-nav="-1" aria-label="' + esc(T('detail.prev')) + '">' + icon('prev') + '</button>' +
          '<button type="button" class="icon-btn pd-nav" data-nav="1" aria-label="' + esc(T('detail.next')) + '">' + icon('next') + '</button>' : '') + '</div>' +
        '<button type="button" class="icon-btn" id="pdClose" aria-label="' + esc(T('detail.close')) + '">' + icon('close') + '</button>' +
      '</div>' +
      '<div class="pd-media">' +
        '<div class="pd-figure"' + (ph.lq ? ' style="background-image:url(' + ph.lq + ')"' : '') + '>' +
          '<img id="pdImg" src="' + esc(ph.full) + '"' + (ph.w ? ' width="' + ph.w + '" height="' + ph.h + '"' : '') + ' alt="' + esc(name) + '" decoding="async"></div>' +
        (photos.length > 1 ? '<div class="pd-thumbs">' + photos.map(function (x, i) {
          return '<button type="button" data-photo="' + i + '" aria-pressed="' + (i === S.photoIdx) + '" aria-label="' + esc(T('detail.photo', { n: i + 1 })) + '"><img src="' + esc(x.thumb || x.card) + '" alt="" loading="lazy"></button>';
        }).join('') + '</div>' : '') +
      '</div>' +
      '<div class="pd-info">' +
        '<p class="eyebrow">' + esc(tagLine(p) || T('cat.' + p.category)) + '</p>' +
        '<h2 id="pdTitle" tabindex="-1">' + esc(name) + '</h2>' +
        '<p class="pd-price' + (p.price ? ' has' : '') + '">' + esc(priceText(p)) + '</p>' +
        (desc ? '<p class="pd-desc">' + esc(desc) + '</p>' : '') +
        '<dl class="pd-specs">' + specs.map(function (s) { return '<dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd>'; }).join('') + '</dl>' +
        '<div class="pd-actions">' +
          '<a class="btn btn-wa" id="pdAsk" target="_blank" rel="noopener" href="' + esc(waUrl(askMessage(p), true)) + '">' + icon('wa') + '<span>' + esc(T('detail.ask')) + '</span></a>' +
          '<div class="row">' +
            '<button type="button" class="btn btn-line" id="pdWish" aria-pressed="false">' + icon('heart') + '<span></span></button>' +
            '<button type="button" class="btn btn-line" id="pdShare">' + icon('share') + '<span>' + esc(T('detail.share')) + '</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="pd-links"><a class="link-btn" href="' + esc(ig) + '" target="_blank" rel="noopener">' + esc(T('detail.instagram')) + '</a></div>' +
        (p.original ? '<details class="pd-original"><summary>' + esc(T('detail.original')) + '</summary><p>' + esc(p.original) + '</p></details>' : '') +
      '</div>';
    syncDetailWish();
  }
  function openProduct(id) {
    var p = S.byId[id], d = $('#pd');
    if (!p) { if (S.loaded) { toast(T('detail.notFound')); history.replaceState(null, '', location.pathname + location.search); } return; }
    if ($('#shareDlg').open) $('#shareDlg').close();
    S.current = p; S.photoIdx = 0;
    renderDetail();
    if (!d.open) d.showModal();
    $('#pdBox').scrollTop = 0; var info = $('.pd-info'); if (info) info.scrollTop = 0;
    $('#pdTitle').focus({ preventScroll: true });
  }
  function closeProduct() {
    var d = $('#pd'); if (d.open) d.close();
  }
  function step(dir) {
    var i = S.list.indexOf(S.current); if (i < 0) return;
    var n = S.list[(i + dir + S.list.length) % S.list.length];
    history.replaceState(null, '', '#product=' + encodeURIComponent(n.id)); openProduct(n.id);
  }
  function initDetail() {
    var d = $('#pd');
    window.addEventListener('hashchange', function () { var id = hashId(); if (id) openProduct(id); else closeProduct(); });
    document.addEventListener('click', function (e) { if (e.target.closest('a[href^="#product="]')) S.openedByUi = true; });
    d.addEventListener('close', function () {
      S.current = null;
      if (hashId()) { if (S.openedByUi && history.length > 1) history.back(); else history.replaceState(null, '', location.pathname + location.search); }
      S.openedByUi = false;
    });
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.closest('#pdClose')) { d.close(); return; }
      var nav = e.target.closest('[data-nav]'); if (nav) { step(Number(nav.getAttribute('data-nav'))); return; }
      var th = e.target.closest('[data-photo]');
      if (th) { S.photoIdx = Number(th.getAttribute('data-photo')); renderDetail(); $('[data-photo="' + S.photoIdx + '"]').focus(); return; }
      if (e.target.closest('#pdWish')) { toggleWish(S.current.id); return; }
      if (e.target.closest('#pdShare')) share(S.current);
    });
    d.addEventListener('keydown', function (e) {
      if (e.target.matches('input, textarea, select') || $('#shareDlg').open) return;
      if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
    });
    // swipe between items on touch screens
    var sx = 0, sy = 0;
    d.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    d.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8 && e.target.closest('.pd-figure')) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  // ---------- language change ----------
  function onLang() {
    setGeneralLinks();
    if (!S.loaded) return;
    renderFilterOptions();
    var shown = Math.max(S.shown, CFG.pageSize);
    applyFilters();
    while (S.shown < Math.min(shown, S.list.length)) renderMore();
    syncWish();
    if (S.current) renderDetail();
    if ($('#drawer').open) renderDrawer();
  }

  // ---------- boot ----------
  function boot() {
    initHeader(); setGeneralLinks(); initFilters(); initGrid(); initDrawer(); initShare(); initDetail();
    reveal($$('[data-reveal]'));
    fetch(CFG.data).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
      S.products = data.products || [];
      S.products.forEach(function (p) {
        S.byId[p.id] = p;
        p._hay = [p.name.ru, p.name.kk, p.name.en, p.description.ru, p.description.kk, p.description.en, p.brand, p.original].join(' ').toLowerCase();
      });
      S.loaded = true;
      renderFilterOptions(); applyFilters(); syncWish();
      var id = hashId(); if (id) openProduct(id);
    }).catch(function (err) {
      console.error(err);
      var st = $('#gridState'); st.hidden = false; st.textContent = T('grid.error');
      $('#grid').setAttribute('aria-busy', 'false');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
