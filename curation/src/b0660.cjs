// Review of posts 660–779.
const { X, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const products = [
  ...M(494, 668), ...M(140, 684, 686), ...M(4, 694), ...M(649, 745), ...M(162, 755, 756),
  { i: 660, c: 'plates', t: 'dishes', o: 'th', n: { ru: 'Фарфоровые блюда, Таиланд', kk: 'Тайланд фарфор табақтары', en: 'Porcelain serving dishes, Thailand' } },
  { i: 680, c: 'trays', t: 'stand', n: { ru: 'Хрустальная менажница на золотой ножке', kk: 'Алтын аяқты хрусталь менажница', en: 'Crystal tiered stand on a gold base' } }, ...M(680, 663),
  { i: 664, c: 'dinner', t: 'dinnerset', p: 12, k: 105, n: { ru: 'Сервиз с серым орнаментом, 12 персон, 105 предметов', kk: 'Сұр өрнекті жиынтық, 12 адамға, 105 зат', en: 'Dinner set with grey ornament, for 12, 105 pieces' } },
  { i: 666, c: 'trays', t: 'footedbowl', n: { ru: 'Вазы на золотой ножке, 15, 25 и 30 см', kk: 'Алтын аяқты ыдыстар: 15, 25 және 30 см', en: 'Bowls on a gold foot: 15, 25 and 30 cm' } }, ...M(666, 770, 772),
  { i: 673, c: 'gifts', t: 'giftset', o: 'tr', n: { ru: 'Сувениры и часы с аятами Корана', kk: 'Құран аяттары жазылған кәдесыйлар мен сағаттар', en: 'Souvenirs and clocks with Quran verses' }, d: { ru: 'Украшены камнями. Сделано в Турции.', kk: 'Әдемі тастармен безендірілген. Түркияда жасалған.', en: 'Decorated with stones. Made in Turkey.' } }, ...M(673, 672),
  { i: 687, c: 'trays', t: 'footedbowl', b: 'Murano', o: 'it', n: { ru: 'Вазы Murano ручной работы, Италия', kk: 'Қол еңбегімен жасалған Murano ыдыстары, Италия', en: 'Hand-made Murano footed bowls, Italy' } }, ...M(687, 698),
  { i: 688, c: 'trays', t: 'cakestand', n: { ru: 'Тортница на ножке, золотистая или серебристая', kk: 'Тортница: алтын немесе күміс түсті', en: 'Cake stand, in gold or silver tone' } }, ...M(688, 689, 690),
  { i: 693, c: 'plates', t: 'dish', n: { ru: 'Блюдо универсальное со съёмной стеклянной вставкой', kk: 'Әйнегі алынатын әмбебап ыдыс', en: 'All-purpose dish with removable glass insert' }, d: { ru: 'Стеклянная вставка вынимается, удобно мыть.', kk: 'Ішіндегі әйнегі алынып салынады, жууға ыңғайлы.', en: 'The glass insert lifts out for easy washing.' } },
  { i: 696, c: 'glass', t: 'glassset', b: 'Sonne Crystal', o: 'cz', n: { ru: 'Креманка Sonne Crystal', kk: 'Sonne Crystal креманкасы', en: 'Sonne Crystal dessert coupe' }, d: { ru: 'Небольшая — для талкана, варенья, сметаны.', kk: 'Шағын көлемді — талқан, тосап, қаймақ салуға.', en: 'A small one — for talkan, jam or cream.' } },
  { i: 702, c: 'trays', t: 'stand', n: { ru: 'Менажница «Лепестки»', kk: '«Жапырақша» менажницасы', en: '“Petals” sectioned dish' } },
  { i: 710, c: 'trays', t: 'stand', n: { ru: 'Высокая менажница с каллами', kk: 'Биік менажница', en: 'Tall sectioned stand with calla lilies' } },
  { i: 705, c: 'other', t: 'tablecloth', n: { ru: 'Скатерти, разные виды', kk: 'Дастархан түрлері', en: 'Tablecloths, various designs' } },
  { i: 706, c: 'trays', t: 'cakestand', n: { ru: 'Зеркальная тортница', kk: 'Айналы тортница', en: 'Mirror-top cake stand' } },
  { i: 707, c: 'dinner', t: 'dinnerset', b: 'Karosa', p: 12, k: 103, n: { ru: 'Чайно-столовый сервиз Karosa, 12 персон, 103 предмета', kk: 'Karosa чайно-столовый сервизі, 12 адамға, 103 зат', en: 'Karosa tea-and-dinner set, for 12, 103 pieces' } },
  { i: 714, c: 'other', t: 'vase', price: 22000, priceMax: 24000, n: { ru: 'Хрустальные вазы для цветов', kk: 'Гүл салатын хрусталь вазалар', en: 'Crystal flower vases' }, d: { ru: 'Цена за одну вазу.', kk: 'Бір данасының бағасы.', en: 'Price per vase.' } }, ...M(714, 713),
  { i: 718, c: 'glass', t: 'jugset', b: 'Regent' },
  { i: 719, c: 'trays', t: 'stand', n: { ru: 'Хрустальная этажерка', kk: 'Хрусталь этажерка', en: 'Crystal tiered stand' } }, ...M(719, 721),
  { i: 730, c: 'dinner', t: 'dinnerset', p: 6, k: 34, n: { ru: 'Сервиз с цветочным узором, 6 персон, 34 предмета', kk: 'Гүл өрнекті жиынтық, 6 адамға, 34 зат', en: 'Floral-pattern set, for 6, 34 pieces' }, d: { ru: 'Набор на каждый день.', kk: 'Күнделікті ас үйге арналған.', en: 'For everyday use.' } }, ...M(730, 728),
  { i: 732, c: 'cutlery', t: 'knifeset', b: 'Léevan', n: { ru: 'Набор ножей Léevan на магнитной подставке', kk: 'Léevan магнитті пышақ наборы', en: 'Léevan knife set on a magnetic block' } }, ...M(732, 731),
  { i: 733, c: 'cutlery', t: 'boards', b: 'Léevan', n: { ru: 'Набор из трёх разделочных досок Léevan', kk: 'Léevan үшеулік тақтайы', en: 'Léevan set of three cutting boards' } },
  { i: 753, c: 'dinner', t: 'dinnerset', p: 12, k: 103, n: { ru: 'Сервиз с широкой золотой каймой, 12 персон, 103 предмета', kk: 'Кең алтын жиекті сервиз, 12 адамға, 103 зат', en: 'Dinner set with wide gold band, for 12, 103 pieces' } }, ...M(753, 754),
  { i: 760, c: 'trays', t: 'trayset', n: { ru: 'Набор золотистых подносов, 3 в 1', kk: '3/1 алтын түстес подностар', en: 'Set of three gold-tone trays' } }, ...M(760, 763),
  { i: 766, c: 'trays', t: 'stand', n: { ru: 'Менажницы для орехов и сухофруктов', kk: 'Жаңғақ пен кепкен жеміске арналған менажницалар', en: 'Sectioned stands for nuts and dried fruit' } },
  { i: 777, c: 'dinner', t: 'dinnerset', b: 'Sterne', o: 'cz', p: 12, k: 72, d: { ru: 'Чешский сервиз люкс-качества.', kk: 'Люкс сападағы Чехия жиынтығы.', en: 'A luxury-grade Czech set.' } },
];
const client = [661, 662, 691, 692, 704, 737, 744, 774, 778];
const other = [665, 677, 679];
save('0660', 660, 780, [...products, ...X('client-video', ...client), ...X('other-author', ...other),
  ...X('personal-or-promo', ...rest(660, 780, products, client, other))]);
