// Review of posts 840–891.
const { X, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const products = [
  ...M(687, 841), ...M(114, 847, 848), ...M(111, 849),
  { i: 840, c: 'plates', t: 'dishes', b: 'Elamina', n: { ru: 'Фарфоровые блюда Elamina', kk: 'Elamina фарфор табақтары', en: 'Elamina porcelain serving dishes' } },
  { i: 843, c: 'tea', t: 'cups', b: 'Regent', n: { ru: 'Чашки Regent', kk: 'Regent шыныаяқтары', en: 'Regent cups' } },
  { i: 864, c: 'dinner', t: 'dinnerset', o: 'ae', p: 12, k: 105, d: { ru: 'Сделано в ОАЭ. Кайма — золото 24К. Хит продаж.', kk: 'Made in U.A.E. Жиегіндегі алтыны 24К. Хит болған жиынтық.', en: 'Made in the U.A.E. 24K gold rim. A bestseller.' } }, ...M(864, 854),
  { i: 857, c: 'trays', t: 'dishes', n: { ru: 'Мельхиоровые универсальные блюда', kk: 'Мельхиор универсальный ыдыстары', en: 'Nickel-silver all-purpose serving dishes' }, d: { ru: 'Для мяса, курицы, самсы, сладостей. Золотистые и серебристые.', kk: 'Піскен ет, тауық, самса, тәтті салуға болады. Алтын және күміс түсті.', en: 'For meat, chicken, samsa or sweets. In gold and silver tones.' } }, ...M(857, 860, 863),
  { i: 858, c: 'gifts', t: 'giftset', n: { ru: 'Подарочный сертификат', kk: 'Сыйлық сертификаты', en: 'Gift certificate' }, d: { ru: 'В Daria Posuda есть подарочные сертификаты.', kk: 'Daria Posuda-да сыйлық сертификаты бар.', en: 'Daria Posuda offers gift certificates.' } },
  { i: 868, c: 'plates', t: 'bowls', b: 'Elamina', k: 6, n: { ru: 'Набор розеток Elamina, 6 предметов', kk: 'Elamina шағын ыдыстар жиынтығы, 6 зат', en: 'Elamina set of small bowls, 6 pieces' }, d: { ru: 'Для сметаны, варенья, курта.', kk: 'Қаймақ, тосап, құрт салып қоюға арналған.', en: 'For cream, jam or kurt.' } },
  { i: 870, c: 'tea', t: 'teapair', n: { ru: 'Чайная пара с серебристой каймой', kk: 'Күміс жиекті шай жұбы', en: 'Cup and saucer with silver rim' } },
  { i: 872, c: 'trays', t: 'stand', b: 'Elamina', n: { ru: 'Фарфоровая этажерка Elamina', kk: 'Elamina фарфор этажеркасы', en: 'Elamina porcelain tiered stand' } },
  { i: 876, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с золотой каймой и рельефом, 12 персон', kk: 'Алтын жиекті бедерлі жиынтық, 12 адамға', en: 'Embossed dinner set with gold rim, for 12' } },
  { i: 877, c: 'trays', t: 'servingset', n: { ru: 'Фарфоровая менажница', kk: 'Фарфор менажница', en: 'Porcelain sectioned dish' } },
  { i: 878, c: 'trays', t: 'cakestand', n: { ru: 'Блюдо на золотой ножке, мельхиор', kk: 'Алтын түсті мельхиор ыдыс', en: 'Nickel-silver platter on a gold foot' } },
  { i: 880, c: 'trays', t: 'stand', n: { ru: 'Хрустальная этажерка, серебристая', kk: 'Күміс түсті хрусталь этажерка', en: 'Crystal tiered stand, silver tone' } },
  { i: 881, c: 'dinner', t: 'dinnerset', p: 12, k: 105, d: { ru: 'Несколько вариантов декора: золотая, платиновая кайма, серый узор.', kk: 'Өрнегінің бірнеше түрі бар: алтын, күміс жиекті, сұр өрнекті.', en: 'Several designs: gold rim, platinum rim, grey pattern.' } }, ...M(881, 882, 883, 884, 885),
  { i: 886, c: 'other', t: 'vase', n: { ru: 'Хрустальная ваза', kk: 'Хрусталь ваза', en: 'Crystal vase' } }, ...M(886, 887),
];
const client = [844, 845, 855, 856, 869, 889, 890];
save('0840', 840, 892, [...products, ...X('client-video', ...client), ...X('other-author', 888), ...X('personal-or-promo', ...rest(840, 892, products, client, [888]))]);
