// Review of posts 420–539.
const { X, NEW, save, rest } = require('./util.cjs');
const RCP = 'Royal Czech Porcelain';
const products = [
  { i: 425, m: 406 }, { i: 429, m: 4 }, { i: 457, m: 69 }, { i: 472, m: 275 }, { i: 507, m: 275 },
  { i: 426, c: 'dinner', t: 'dinnerset', s: 'Золотая лента', sEn: 'Zolotaya Lenta (Golden Ribbon)', b: RCP, o: 'cz', d: { ru: 'Чешский фарфор с широкой золотой каймой: минимализм и роскошь.', kk: 'Кең алтын жиекті чех фарфоры: минимализм мен сән-салтанат.', en: 'Czech porcelain with a wide gold band: minimalism and luxury.' } },
  { i: 483, m: 426 },
  { i: 444, c: 'dinner', t: 'dinnerset', s: 'Синий цветок', sEn: 'Siniy Tsvetok (Blue Flower)', b: RCP, o: 'cz', p: 12, k: 72, d: { ru: 'В составе только нужные предметы.', kk: 'Құрамына керекті ғана ыдыстар жинақталған.', en: 'Includes only the pieces you really need.' } },
  { i: 443, m: 444 },
  { i: 446, c: 'trays', t: 'trays', n: { ru: 'Подносы, золотистые и серебристые', kk: 'Поднос түрлері: алтын және күміс түстес', en: 'Serving trays in gold and silver tones' } },
  { i: 500, m: 446 },
  { i: 447, c: 'plates', t: 'plates', n: { ru: 'Стеклянные подтарельники', kk: 'Шыны подтарельниктер', en: 'Glass charger plates' } },
  { i: 455, c: 'dinner', t: 'dinnerset', p: 6, k: 32, n: { ru: 'Сервиз на каждый день с зелёным узором, 6 персон, 32 предмета', kk: 'Жасыл өрнекті күнделікті жиынтық, 6 адамға, 32 зат', en: 'Everyday set with green pattern, for 6, 32 pieces' } },
  { i: 463, c: 'other', t: 'vase', n: { ru: 'Вазы для цветов', kk: 'Гүл салатын вазалар', en: 'Flower vases' }, d: { ru: 'Много красивых видов.', kk: 'Әдемі түрлері көп.', en: 'Many attractive designs.' } },
  { i: 464, m: 463 },
  { i: 476, c: 'kettles', t: 'pan', b: 'Zepter', n: { ru: 'Посуда Zepter', kk: 'Zepter ыдыстары', en: 'Zepter cookware' } },
  { i: 494, c: 'kettles', t: 'thermos', b: 'Elamina', n: { ru: 'Термосы-чайники Elamina', kk: 'Elamina термос шәйнектері', en: 'Elamina thermos jugs' } },
  { i: 496, c: 'plates', t: 'dish', n: { ru: 'Стеклянное блюдо', kk: 'Шыны табақ', en: 'Glass serving dish' }, d: NEW },
  { i: 502, c: 'glass', t: 'footedbowl', b: 'RCR', o: 'it', n: { ru: 'Хрустальная ваза RCR, коллекция Laurus', kk: 'RCR хрусталь вазасы, Laurus коллекциясы', en: 'RCR crystal footed bowl, Laurus collection' } },
  { i: 501, m: 502 },
  { i: 511, c: 'dinner', t: 'dinnerset', p: 12, k: 101, d: { ru: 'Очень лёгкий фарфор, аккуратная золотая кайма.', kk: 'Фарфоры өте жеңіл, жиегіндегі алтыны ұқыпты боялған.', en: 'Very light porcelain with a neatly applied gold rim.' } },
  { i: 510, m: 511 },
  { i: 523, c: 'trays', t: 'candybowl', o: 'it', n: { ru: 'Конфетницы ручной работы, Италия', kk: 'Қол еңбегімен жасалған Италия кәмпит ыдыстары', en: 'Hand-made Italian candy bowls' } },
  { i: 525, c: 'trays', t: 'footedbowl', o: 'it', n: { ru: 'Ваза на ножке ручной работы, Италия', kk: 'Қол еңбегімен жасалған биік аяқты Италия вазасы', en: 'Hand-made Italian footed bowl' } },
  { i: 529, c: 'trays', t: 'cakestand', b: 'LD', n: { ru: 'Блюдо на ножке LD, мельхиор', kk: 'LD мельхиор биік аяқты табағы', en: 'LD nickel-silver footed platter' } },
  { i: 530, c: 'dinner', t: 'dinnerset', b: RCP, o: 'cz' },
  { i: 531, c: 'kettles', t: 'kettle', n: { ru: 'Чайник из нержавеющей стали', kk: 'Тот баспайтын болат шәйнек', en: 'Stainless-steel kettle' } },
];
const client = [420, 421, 422, 423, 435, 436, 438, 439, 440, 450, 451, 452, 453, 454, 459, 460, 461, 462, 479, 481, 493, 497, 498, 505, 534, 535];
const other = [456, 458];
save('0420', 420, 540, [...products, ...X('client-video', ...client), ...X('other-author', ...other),
  ...X('personal-or-promo', ...rest(420, 540, products, client, other))]);
