// Review of posts 540–659.
const { X, NEW, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const products = [
  ...M(55, 601, 621), ...M(140, 624), ...M(476, 604), ...M(172, 630), ...M(109, 632), ...M(253, 641), ...M(4, 646),
  { i: 541, c: 'trays', t: 'cakestand', n: { ru: 'Хрустальное блюдо на ножке', kk: 'Биік аяқты хрусталь табақ', en: 'Crystal footed platter' }, d: NEW }, ...M(541, 553),
  { i: 557, c: 'kettles', t: 'potset', n: { ru: 'Набор больших кастрюль: 9, 13 и 19 л', kk: 'Үлкен кастрюльдер жиынтығы: 9, 13 және 19 л', en: 'Set of large stockpots: 9, 13 and 19 L' }, d: NEW },
  { i: 564, c: 'kettles', t: 'kettle', b: 'Elamina' },
  { i: 567, c: 'glass', t: 'wineglasses', n: { ru: 'Фужеры и рюмки с золотой каймой', kk: 'Алтын жиекті фужер мен рюмкалар', en: 'Goblets and shot glasses with gold rim' } },
  { i: 572, c: 'dinner', t: 'dinnerset', p: 6, n: { ru: 'Сервиз с голубым мраморным узором, 6 персон', kk: 'Көгілдір мәрмәр өрнекті жиынтық, 6 адамға', en: 'Set with blue marbled pattern, for 6' }, d: { ru: 'Хит продаж.', kk: 'Хит болған жиынтық.', en: 'A bestseller.' } },
  { i: 576, c: 'other', t: 'vase', o: 'it', n: { ru: 'Ваза и конфетница с крышкой, Италия', kk: 'Италия вазасы мен қақпақты кәмпит ыдысы', en: 'Italian vase and lidded candy bowl' } },
  { i: 579, c: 'trays', t: 'stand', n: { ru: 'Менажница «Роза»', kk: '«Раушан» менажницасы', en: '“Rose” sectioned serving stand' }, d: { ru: 'Хит продаж.', kk: 'Хит болған менажница.', en: 'A bestseller.' } }, ...M(579, 580),
  { i: 581, c: 'glass', t: 'glassset', b: 'RCR', o: 'it', n: { ru: 'Фужеры и стаканы RCR', kk: 'RCR фужер, стакан түрлері', en: 'RCR stemware and tumblers' }, d: { ru: 'Коллекции Laurus, Timeless, Melodia, Opera, Adagio.', kk: 'Laurus, Timeless, Melodia, Opera, Adagio коллекциялары.', en: 'Laurus, Timeless, Melodia, Opera and Adagio collections.' } },
  { i: 592, c: 'kettles', t: 'potset', b: 'Elamina', d: { ru: 'Набор высшего качества.', kk: 'Ең жоғары сапалы жиынтық.', en: 'Top-quality set.' } }, ...M(592, 588, 593),
  { i: 599, c: 'trays', t: 'cakestand', b: 'Sonne Crystal', o: 'cz', n: { ru: 'Хрустальное блюдо на ножке Sonne Crystal', kk: 'Sonne Crystal биік аяқты хрусталь табағы', en: 'Sonne Crystal footed platter' } }, ...M(599, 620),
  { i: 600, c: 'glass', t: 'footedbowl', b: 'RCR', o: 'it', n: { ru: 'Хрустальное блюдо на ножке RCR', kk: 'RCR биік аяқты хрусталь табағы', en: 'RCR crystal footed platter' }, d: { ru: 'Итальянский хрусталь, в тренде.', kk: 'Қазіргі трендтегі Италия хрусталі.', en: 'Italian crystal, currently in trend.' } },
  { i: 609, c: 'trays', t: 'stand', d: NEW },
  { i: 614, c: 'plates', t: 'dish', n: { ru: 'Блюдо универсальное, 25×25 см', kk: 'Әмбебап табақ, 25×25 см', en: 'All-purpose square dish, 25×25 cm' } },
  { i: 616, c: 'trays', t: 'candybowl', o: 'it', n: { ru: 'Креманка на ножке, Италия', kk: 'Италия креманкасы', en: 'Italian footed dessert bowl' } },
  { i: 619, c: 'dinner', t: 'dinnerset', p: 6, k: 34, n: { ru: 'Фарфоровый сервиз с серым орнаментом, 6 персон, 34 предмета', kk: 'Сұр өрнекті фарфор жиынтығы, 6 адамға, 34 зат', en: 'Porcelain set with grey ornament, for 6, 34 pieces' }, d: { ru: 'Набор на каждый день. Не керамика, а настоящий фарфор.', kk: 'Күнделікті ас үйге арналған. Керамика емес, нағыз фарфор.', en: 'For everyday use. Real porcelain, not ceramic.' } }, ...M(619, 603),
  { i: 653, c: 'trays', t: 'stand', n: { ru: 'Двухъярусная этажерка', kk: 'Екі қабатты этажерка', en: 'Two-tier serving stand' }, d: NEW }, ...M(653, 625),
  { i: 643, c: 'trays', t: 'stand', n: { ru: 'Трёхъярусная этажерка', kk: 'Үш қабатты этажерка', en: 'Three-tier serving stand' }, d: { ru: 'Для сухофруктов, конфет, орехов.', kk: 'Өрік, мейіз, кәмпит, жаңғақ салуға арналған.', en: 'For dried fruit, sweets and nuts.' } },
  { i: 644, c: 'trays', t: 'servingset', b: 'Regent', n: { ru: 'Менажница Regent', kk: 'Regent менажницасы', en: 'Regent sectioned dish' } },
  { i: 651, c: 'kettles', t: 'pots', b: 'Elamina', n: { ru: 'Большие кастрюли Elamina, до 38,8 л', kk: 'Elamina үлкен кастрюльдері, 38,8 л-ге дейін', en: 'Elamina large stockpots, up to 38.8 L' } }, ...M(651, 627, 628),
  { i: 631, c: 'trays', t: 'stand', n: { ru: 'Этажерка необычного дизайна', kk: 'Дизайны ерекше этажерка', en: 'Tiered stand of unusual design' } },
  { i: 636, c: 'plates', t: 'saladbowl', n: { ru: 'Салатница со съёмной фарфоровой чашей', kk: 'Фарфоры алынатын салатница', en: 'Salad bowl with removable porcelain insert' }, d: { ru: 'Хит продаж: фарфоровая чаша вынимается, удобно мыть.', kk: 'Хит болған түрі: ішіндегі фарфоры алынады, жууға ыңғайлы.', en: 'A bestseller: the porcelain insert lifts out for easy washing.' } },
  { i: 639, c: 'dinner', t: 'dinnerset', s: 'Бернадот', sEn: 'Bernadotte', o: 'cz', p: 12, k: 72, d: { ru: 'Долгожданный чешский сервиз снова в продаже.', kk: 'Көптен күткен чех сервизі қайтадан сатылымда.', en: 'The long-awaited Czech set is back in stock.' } },
  { i: 649, c: 'trays', t: 'footedbowl', b: 'Elamina', n: { ru: 'Вазы на ножке Elamina «Мейсенский букет»', kk: 'Elamina «Мейсонский букет» биік аяқты ыдыстары', en: 'Elamina “Meissen Bouquet” footed bowls' } }, ...M(649, 648),
  { i: 654, c: 'kettles', t: 'kettles', b: 'Elamina', d: { ru: 'Медицинская сталь: не ржавеет, не темнеет, тяжёлая и толстая. Набор: чайник 2,7 л и заварочный 1 л.', kk: 'Мед. сталь: тот баспайды, қараймайды, өзі ауыр, қалың. Жиынтық: 2,7 л шәйнек пен 1 л демдеме шәйнек.', en: 'Surgical steel: rust-free, does not darken, heavy and thick. Set: 2.7 L kettle and 1 L teapot.' } }, ...M(654, 655),
  { i: 659, c: 'glass', t: 'glassset', b: 'Astra Gold', o: 'cz', n: { ru: 'Хрусталь Astra Gold', kk: 'Astra Gold хрусталь ыдыстары', en: 'Astra Gold crystal' } },
];
const client = [544, 545, 546, 547, 558, 561, 574, 589, 590, 596, 608, 610, 618, 658];
const other = [617];
save('0540', 540, 660, [...products, ...X('client-video', ...client), ...X('other-author', ...other),
  ...X('personal-or-promo', ...rest(540, 660, products, client, other))]);
