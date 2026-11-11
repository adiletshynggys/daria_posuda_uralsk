// Review of posts 1012–1131.
const { X, NEW, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const RCP = 'Royal Czech Porcelain';
const products = [
  ...M(55, 1015, 1016, 1032, 1059), ...M(4, 1018), ...M(254, 1031), ...M(426, 1043, 1061), ...M(162, 1044, 1048), ...M(165, 1049),
  ...M(444, 1063), ...M(818, 1065), ...M(649, 1066), ...M(272, 1069), ...M(872, 1072), ...M(907, 1073, 1074, 1107), ...M(1058, 1078),
  ...M(973, 1079), ...M(825, 1081), ...M(248, 1090), ...M(964, 1095, 1105, 1108), ...M(673, 1102), ...M(962, 1109), ...M(303, 1112),
  { i: 1013, c: 'plates', t: 'dishes', b: 'Elamina', n: { ru: 'Фарфоровые блюда Elamina с золотой или серебристой каймой', kk: 'Elamina фарфор табақтары: алтын немесе күміс жиекті', en: 'Elamina porcelain dishes with gold or silver rim' } }, ...M(1013, 1017),
  { i: 1014, c: 'dinner', t: 'dinnerset', o: 'cz', n: { ru: 'Чешский сервиз люкс-качества', kk: 'Чехияның люкс сападағы жиынтығы', en: 'Luxury-grade Czech dinner set' } },
  { i: 1019, c: 'trays', t: 'fruitbowl', n: { ru: 'Мельхиоровые вазы для фруктов и конфет с камнями', kk: 'Тастармен безендірілген мельхиор жеміс ыдыстары', en: 'Stone-decorated nickel-silver stands for fruit and sweets' } },
  { i: 1020, c: 'plates', t: 'dish', n: { ru: 'Блюдо с ручками на подставке', kk: 'Құлағы бар табақ', en: 'Handled serving dish on a stand' }, d: { ru: 'Для куырдака, рыбы и других блюд.', kk: 'Қуырдақ, балық сияқты тағамдарға.', en: 'For kuyrdak, fish and other dishes.' } },
  { i: 1021, c: 'kettles', t: 'potset', o: 'tr', n: { ru: 'Набор кастрюль, Турция, белый с золотом', kk: 'Түріктің ақ-алтын кастрюль жиынтығы', en: 'Turkish cookware set, white with gold' } }, ...M(1021, 1037),
  { i: 1025, c: 'glass', t: 'wineglasses', b: 'Zepter' },
  { i: 1026, c: 'glass', t: 'wineglasses', o: 'cz', n: { ru: 'Цветные фужеры с золотом, Чехия', kk: 'Алтынмен әрленген түрлі-түсті чех фужерлері', en: 'Coloured Czech goblets with gold' }, d: { ru: 'Подходят к сервизам на 12 персон.', kk: '12 адамдық жиынтыққа үйлесім тапқан.', en: 'Made to match the 12-person dinner sets.' } }, ...M(1026, 1027),
  { i: 1028, c: 'tea', t: 'teapair', n: { ru: 'Чайные пары поштучно', kk: 'Жекелеп сатылатын шай жұптары', en: 'Cups and saucers sold individually' } }, ...M(1028, 1029, 1030),
  { i: 1033, c: 'other', t: 'vase', b: 'Bohemia', o: 'cz', n: { ru: 'Ваза для цветов Bohemia', kk: 'Bohemia гүл вазасы', en: 'Bohemia flower vase' }, d: { ru: 'В наличии.', kk: 'Сатылымда бар.', en: 'In stock.' } },
  { i: 1034, c: 'tea', t: 'bowls', n: { ru: 'Белый рельефный фарфор: пиалы и чайник', kk: 'Ақ бедерлі фарфор: кеселер мен шәйнек', en: 'White ribbed porcelain: tea bowls and teapot' } },
  { i: 1035, c: 'glass', t: 'glassset', n: { ru: 'Рельефные креманки и бокалы', kk: 'Бедерлі креманка мен бокалдар', en: 'Embossed coupes and glasses' } },
  { i: 1041, c: 'trays', t: 'cakestand', o: 'th', n: { ru: 'Фарфоровая тортница, Таиланд', kk: 'Тайланд фарфор тортницасы', en: 'Porcelain cake stand, Thailand' } },
  { i: 1042, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с кружевным рельефом, 12 персон', kk: 'Шілтер бедерлі жиынтық, 12 адамға', en: 'Dinner set with lace relief, for 12' } },
  { i: 1046, c: 'dinner', t: 'dinnerset', n: { ru: 'Сервиз с серо-голубым орнаментом', kk: 'Сұр-көк өрнекті жиынтық', en: 'Dinner set with grey-blue ornament' } },
  { i: 1052, c: 'kettles', t: 'teapot', o: 'th', n: { ru: 'Набор чайников, Таиланд', kk: 'Тайландтың чайник жиынтығы', en: 'Teapot set, Thailand' } },
  { i: 1053, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с золотым декором, 12 персон', kk: 'Алтын өрнекті жиынтық, 12 адамға', en: 'Dinner set with gold decor, for 12' } },
  { i: 1057, c: 'plates', t: 'plates', o: 'th', n: { ru: 'Фарфор Таиланд: тарелки и салатники', kk: 'Тайланд фарфоры: тәрелкелер мен салат ыдыстары', en: 'Thai porcelain: plates and salad bowls' } },
  { i: 1058, c: 'dinner', t: 'dinnerset', b: 'Zepter', p: 12, k: 63 },
  { i: 1060, c: 'dinner', t: 'dinnerset', b: 'Sterne', o: 'cz', n: { ru: 'Чешский фарфор Sterne, зелёный с золотом', kk: 'Sterne чех фарфоры, жасыл-алтын', en: 'Sterne Czech porcelain, green with gold' }, d: { ru: 'Ручная работа одного из лучших заводов Чехии.', kk: 'Чехияның ең үздік заводтарының бірінің қол өнімі.', en: 'Hand-made by one of the finest Czech factories.' } },
  { i: 1062, c: 'dinner', t: 'dinnerset', b: RCP, o: 'cz', n: { ru: 'Сервиз Royal Czech Porcelain, розовый с золотом', kk: 'Royal Czech Porcelain қызғылт-алтын сервизі', en: 'Royal Czech Porcelain set, pink with gold' } },
  { i: 1064, c: 'plates', t: 'saladbowls', n: { ru: 'Квадратные салатники', kk: 'Төртбұрышты салат ыдыстары', en: 'Square salad bowls' } },
  { i: 1075, c: 'trays', t: 'fruitbowl', n: { ru: 'Хрустальная фруктовница на мельхиоровой ножке', kk: 'Мельхиор аяқты хрусталь жеміс ыдысы', en: 'Crystal fruit bowl on a nickel-silver foot' }, d: { ru: 'Золотистая или серебристая.', kk: 'Алтын немесе күміс түсті.', en: 'In gold or silver tone.' } }, ...M(1075, 1076, 1077, 1096, 1097, 1106),
  { i: 1086, c: 'dinner', t: 'dinnerset', p: 12, k: 79, d: { ru: 'Новинка. Несколько вариантов декора.', kk: 'Жаңа түскен үлгі. Өрнегінің бірнеше түрі бар.', en: 'New arrival. Several designs.' } }, ...M(1086, 1082, 1083, 1084, 1085),
  { i: 1098, c: 'dinner', t: 'dinnerset', b: 'Zepter', n: { ru: 'Сервиз Zepter, синий с золотом', kk: 'Zepter көк-алтын сервизі', en: 'Zepter dinner set, navy with gold' } },
];
const promo = [1054, 1093];
const used = new Set(products.map((p) => p.i).concat(promo));
const client = []; for (let i = 1012; i < 1132; i++) if (!used.has(i)) client.push(i);
save('1012', 1012, 1132, [...products, ...X('promo', ...promo), ...X('client-video', ...client)]);
