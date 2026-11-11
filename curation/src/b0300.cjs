// Review of posts 300–419.
const { X, NEW, save } = require('./util.cjs');
const V = (i, p, k, extra) => ({ i, c: 'dinner', t: 'dinnerset', b: 'Villagio', p, k, ...extra });
const products = [
  { i: 303, c: 'cutlery', t: 'cutleryset', b: 'Elamina', p: 12, k: 36, d: { ru: 'Несколько вариантов узора, серебристые и золотистые.', kk: 'Өрнегінің бірнеше түрі бар: күміс және алтын түстес.', en: 'Several patterns, in silver and gold tones.' } },
  ...[304, 305, 306, 307, 308, 309].map((i) => ({ i, m: 303 })),
  V(320, 12, 109, { n: { ru: 'Столовый сервиз Villagio с золотой каймой, 12 персон, 109 предметов', kk: 'Villagio алтын жиекті ас сервизі, 12 адамға, 109 зат', en: 'Villagio dinner set with gold rim, for 12, 109 pieces' }, d: NEW }),
  V(321, 12, null, { n: { ru: 'Столовый сервиз Villagio с серебристой каймой, 12 персон', kk: 'Villagio күміс жиекті ас сервизі, 12 адамға', en: 'Villagio dinner set with silver rim, for 12' }, d: NEW }),
  V(322, 12, null, { n: { ru: 'Столовый сервиз Villagio, белый рельефный, 12 персон', kk: 'Villagio ақ бедерлі ас сервизі, 12 адамға', en: 'Villagio white embossed dinner set, for 12' }, d: NEW }),
  V(323, 12, null, { d: NEW }),
  { i: 329, c: 'kettles', t: 'pot', b: 'Elamina', n: { ru: 'Мантоварка Elamina, 30 см', kk: 'Elamina мантоваркасы, 30 см', en: 'Elamina steamer pot (mantovarka), 30 cm' }, d: { ru: 'В наличии.', kk: 'Сатылымда бар.', en: 'In stock.' } },
  { i: 336, c: 'glass', t: 'glassset', o: 'cz', n: { ru: 'Чешский хрусталь', kk: 'Чех хрустальдары', en: 'Czech crystal' }, d: { ru: 'В наличии.', kk: 'Сатылымда бар.', en: 'In stock.' } },
  { i: 350, m: 114 },
  { i: 351, c: 'glass', t: 'servingset', n: { ru: 'Посуда IVV (люкс-копия), итальянский дизайн', kk: 'IVV ыдыстары (LUX көшірме), италиялық дизайн', en: 'IVV-style tableware (luxury copy), Italian design' } },
  { i: 352, c: 'kettles', t: 'pots', n: { ru: 'Мантоварки, 30 см и 32 см', kk: '30 см және 32 см мантоваркалар', en: 'Steamer pots (mantovarka), 30 cm and 32 cm' } },
  { i: 361, m: 162 },
  { i: 377, c: 'kettles', t: 'pots', b: 'Elamina', n: { ru: 'Кастрюли Elamina поштучно', kk: 'Elamina жеке кастрюльдері', en: 'Elamina pots, sold individually' } },
  { i: 378, c: 'tea', t: 'teapair', b: 'Royal Czech Porcelain', o: 'cz', d: { ru: 'Чешский фарфор десятилетиями сохраняет первоначальный вид.', kk: 'Чех фарфоры 30–40 жыл бойы алғашқы қалпын сақтайды.', en: 'Czech porcelain keeps its original look for decades.' } },
  { i: 379, c: 'trays', t: 'tray', n: { ru: 'Поднос с ручками', kk: 'Тұтқалы поднос', en: 'Serving tray with handles' } },
  { i: 385, c: 'dinner', t: 'dinnerset', o: 'cz', p: 12, n: { ru: 'Чешский чайно-столовый сервиз, 12 персон', kk: 'Чех чайно-столовый сервизі, 12 адамға', en: 'Czech tea-and-dinner set, for 12' }, d: { ru: 'Новое поступление.', kk: 'Жаңадан түсілім.', en: 'New delivery.' } },
  { i: 390, c: 'glass', t: 'wineglasses', o: 'cz', n: { ru: 'Хрустальные фужеры, Чехия', kk: 'Чех хрусталь фужерлері', en: 'Czech crystal stemware' }, d: { ru: 'Ручная работа чешских мастеров.', kk: 'Чех шеберлерінің қол өнері.', en: 'Hand-made by Czech craftsmen.' } },
  { i: 394, m: 390 },
  { i: 399, c: 'dinner', t: 'dinnerset', b: 'Elamina', n: { ru: 'Сервиз Elamina с зелёным орнаментом', kk: 'Elamina жасыл өрнекті сервизі', en: 'Elamina dinner set with green ornament' } },
  { i: 406, c: 'tea', t: 'teaset', o: 'cz', n: { ru: 'Чешский фарфор с золотом 24К, красный', kk: '24К алтынмен әрленген қызыл чех фарфоры', en: 'Red Czech porcelain with 24K gold' }, d: { ru: 'Настоящий чешский фарфор тонкой работы, декор золотом 24К.', kk: 'Нағыз чехиялық фарфор, ерекше дизайн, 24К алтынмен әрленген.', en: 'Genuine Czech porcelain of fine workmanship, decorated with 24K gold.' } },
  { i: 408, m: 165 },
  { i: 410, c: 'other', t: 'decor', n: { ru: 'Подтарельники', kk: 'Подтарельник түрлері', en: 'Placemats / charger mats' } },
  { i: 418, c: 'dinner', t: 'dinnerset', b: 'Bernadotte', o: 'cz', d: { ru: 'Сочетание минимализма и роскоши.', kk: 'Минимализм мен сән-салтанаттың үйлесімі.', en: 'Minimalism and luxury combined.' } },
];
for (const p of products) if (p.k === null) delete p.k;
const kept = new Set(products.map((p) => p.i));
const client = [324, 325, 334, 335, 347, 348, 357, 360, 365, 366, 376, 386, 388, 389, 400, 401, 409, 413, 414, 416, 417];
const other = [301, 341, 343, 344, 345, 368];
const promo = [310, 313, 328, 353, 369, 373, 374, 403];
const rest = [];
for (let i = 300; i < 420; i++) if (!kept.has(i) && !client.includes(i) && !other.includes(i) && !promo.includes(i)) rest.push(i);
save('0300', 300, 420, [...products, ...X('client-video', ...client), ...X('other-author', ...other), ...X('promo', ...promo), ...X('personal', ...rest)]);
