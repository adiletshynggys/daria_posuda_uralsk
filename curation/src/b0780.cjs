// Review of posts 780–839.
const { X, NEW, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const products = [
  ...M(753, 789), ...M(55, 798), ...M(162, 800), ...M(426, 812), ...M(760, 821),
  { i: 780, c: 'other', t: 'servingset', b: 'Regent', n: { ru: 'Маслёнка Regent', kk: 'Regent масленицасы', en: 'Regent butter dish' }, d: { ru: 'Стеклянная вставка вынимается, удобно мыть.', kk: 'Ішіндегі әйнегі алынып салынады, жууға ыңғайлы.', en: 'The glass insert lifts out for easy washing.' } }, ...M(780, 781),
  { i: 790, c: 'trays', t: 'servingset', n: { ru: 'Хрустальная менажница с золотой каймой', kk: 'Алтын жиекті хрусталь менажница', en: 'Crystal sectioned dish with gold band' } },
  { i: 792, c: 'trays', t: 'stand', n: { ru: 'Этажерка «Ветка с птицами»', kk: '«Құстар қонған бұтақ» этажеркасы', en: '“Birds on a branch” tiered stand' }, d: { ru: 'Новое поступление, разные виды.', kk: 'Жаңа түсім, түрлері көп.', en: 'New delivery, several designs.' } }, ...M(792, 794, 795),
  { i: 799, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с каймой из золота 24К, 12 персон', kk: 'Жиегі 24К алтынмен әрленген жиынтық, 12 адамға', en: 'Dinner set with 24K gold rim, for 12' } },
  { i: 805, c: 'trays', t: 'fruitbowl', n: { ru: 'Высокая фруктовница', kk: 'Ең биік жеміс салғыш', en: 'Tall fruit stand' } },
  { i: 807, c: 'trays', t: 'cakestand', n: { ru: 'Мельхиоровые блюда на ножке', kk: 'Мельхиор ыдыстар', en: 'Nickel-silver footed platters' }, d: { ru: 'Новое поступление.', kk: 'Жаңа түсім.', en: 'New delivery.' } },
  { i: 808, c: 'trays', t: 'fruitbowl', n: { ru: 'Хрустальная фруктовница на золотой ножке', kk: 'Алтын аяқты хрусталь жеміс ыдысы', en: 'Crystal fruit bowl on a gold foot' }, d: NEW },
  { i: 829, c: 'trays', t: 'fruitbowl', b: 'Art Deco', o: 'it' },
  { i: 810, c: 'gifts', t: 'giftset', b: 'Elamina', n: { ru: 'Фарфор Elamina в подарочной коробке', kk: 'Сыйлық қорабындағы Elamina фарфоры', en: 'Elamina porcelain in a gift box' } }, ...M(810, 811),
  { i: 815, c: 'kettles', t: 'potset', o: 'tr', n: { ru: 'Набор кастрюль, Турция', kk: 'Түркия кастрюльдер жиынтығы', en: 'Cookware set, Turkey' } },
  { i: 818, c: 'plates', t: 'bowls', o: 'th', n: { ru: 'Фарфоровые креманки, Таиланд', kk: 'Тайланд фарфор креманкалары', en: 'Porcelain dessert bowls, Thailand' } },
  { i: 820, c: 'trays', t: 'stand', n: { ru: 'Менажница на золотой ножке', kk: 'Алтын аяқты менажница', en: 'Sectioned dish on a gold foot' } },
  { i: 822, c: 'plates', t: 'saladbowls', b: 'Elamina', n: { ru: 'Фарфоровые салатники Elamina', kk: 'Elamina фарфор салат ыдыстары', en: 'Elamina porcelain salad bowls' } },
  { i: 825, c: 'trays', t: 'footedbowl', o: 'th', n: { ru: 'Фарфоровая ваза на ножке, Таиланд', kk: 'Тайланд фарфорынан жасалған биік аяқты ыдыс', en: 'Porcelain footed bowl, Thailand' } },
  { i: 837, c: 'trays', t: 'trayset', n: { ru: 'Набор серебристых подносов, 3 в 1', kk: '3/1 күміс түстес подностар', en: 'Set of three silver-tone trays' } },
  { i: 838, c: 'other', t: 'decor', n: { ru: 'Хрустальные подсвечники', kk: 'Хрусталь шамдалдар', en: 'Crystal candlesticks' } },
];
const client = [791, 809, 813, 826, 833, 834, 835];
save('0780', 780, 840, [...products, ...X('client-video', ...client), ...X('personal-or-promo', ...rest(780, 840, products, client))]);
