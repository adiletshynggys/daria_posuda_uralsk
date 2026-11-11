// Review of posts 892–1011.
const { X, NEW, save, rest } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const products = [
  ...M(886, 897), ...M(829, 903), ...M(792, 913, 940), ...M(144, 917), ...M(42, 918), ...M(253, 923), ...M(252, 926), ...M(705, 932, 982),
  ...M(55, 933, 945, 959), ...M(162, 946), ...M(426, 948), ...M(760, 939), ...M(837, 938), ...M(815, 941), ...M(818, 966, 967),
  ...M(673, 977), ...M(69, 978), ...M(732, 997), ...M(825, 1003),
  { i: 919, c: 'other', t: 'tablecloth', o: 'tr', n: { ru: 'Плейсматы, кольца для салфеток и скатерти, Турция', kk: 'Плейсмат, сулық сақинасы, дастархан — Түркия', en: 'Placemats, napkin rings and tablecloths, Turkey' }, d: NEW }, ...M(919, 894),
  { i: 899, c: 'dinner', t: 'dinnerset', o: 'ae', p: 12, n: { ru: 'Сервиз с серебристой каймой, ОАЭ, 12 персон', kk: 'Жиегі күмісті жиынтық, БАӘ, 12 адамға', en: 'Dinner set with silver rim, U.A.E., for 12' } },
  { i: 909, c: 'dinner', t: 'dinnerset', p: 12, k: 105, n: { ru: 'Сервиз с серебристой каймой, 12 персон, 105 предметов', kk: 'Күміс жиекті жиынтық, 12 адамға, 105 зат', en: 'Dinner set with silver rim, for 12, 105 pieces' } }, ...M(909, 974),
  { i: 901, c: 'gifts', t: 'giftset', n: { ru: 'Шкатулка для Корана', kk: 'Құран кітабына арналған қобдиша', en: 'Box for the Quran' }, d: { ru: 'Есть и деревянный вариант.', kk: 'Ағаштан жасалған түрі де бар.', en: 'A wooden version is also available.' } }, ...M(901, 900, 942),
  { i: 904, c: 'glass', t: 'glasses', n: { ru: 'Стаканы с цветочным декором', kk: 'Гүл өрнекті стакандар', en: 'Glasses with floral decor' }, d: { ru: 'Хит продаж, в наличии.', kk: 'Хит болған стакандар, сатылымда.', en: 'A bestseller, in stock.' } },
  { i: 905, c: 'glass', t: 'jug', n: { ru: 'Графины, разные виды', kk: 'Графин түрлері', en: 'Decanters, various designs' } },
  { i: 907, c: 'trays', t: 'dish', n: { ru: 'Мельхиоровые блюда со съёмной фарфоровой вставкой', kk: 'Фарфоры алынатын мельхиор ыдыстар', en: 'Nickel-silver dishes with removable porcelain insert' }, d: { ru: 'Размер 25×25 см, есть другие формы. Фарфор вынимается, удобно мыть.', kk: 'Диаметрі 25×25 см, басқа түрлері де бар. Ішіндегі фарфоры алынады, жууға ыңғайлы.', en: '25×25 cm, other shapes available. The porcelain lifts out for easy washing.' } }, ...M(907, 910, 914, 915, 916),
  { i: 908, c: 'trays', t: 'cakestand', n: { ru: 'Мельхиоровое блюдо на ножке, 25 см', kk: 'Универсальный мельхиор ыдыс, диаметрі 25 см', en: 'Nickel-silver footed platter, 25 cm' }, d: { ru: 'Для фруктов, торта, мяса, курицы и рыбы.', kk: 'Жеміс-жидек, торт, піскен ет, тауық, балық тағамдарына.', en: 'For fruit, cake, meat, chicken or fish.' } }, ...M(908, 911),
  { i: 920, c: 'cutlery', t: 'cutleryset', b: 'Elamina', n: { ru: 'Набор кухонных принадлежностей Elamina', kk: 'Elamina ас үй құралдары жиынтығы', en: 'Elamina kitchen utensil set' } },
  { i: 921, c: 'dinner', t: 'dinnerset', o: 'ae', p: 12, n: { ru: 'Сервиз с сине-золотой каймой, Дубай, 12 персон', kk: 'Көк-алтын жиекті жиынтық, Дубай, 12 адамға', en: 'Dinner set with blue-and-gold rim, Dubai, for 12' } },
  { i: 925, c: 'trays', t: 'stand', n: { ru: 'Менажница на пять секций, золотистая или серебристая', kk: 'Бес бөлікті менажница: алтын немесе күміс түсті', en: 'Five-section serving stand, gold or silver tone' }, d: { ru: 'Для сухофруктов, орехов, конфет, жента и сахара.', kk: 'Кепкен жеміс, орех, кәмпит, жент, қант салуға болады.', en: 'For dried fruit, nuts, sweets and sugar.' } }, ...M(925, 924),
  { i: 936, c: 'trays', t: 'tray', n: { ru: 'Поднос на ножках', kk: 'Аяқты поднос', en: 'Footed serving tray' }, d: { ru: 'Высокое качество; удобно подавать суповые кесе. Золотистый и серебристый.', kk: 'Жоғары сапа; сорпа кеселерді салуға ыңғайлы. Алтын және күміс түсті.', en: 'High quality; handy for carrying soup bowls. In gold and silver tones.' } }, ...M(936, 937),
  { i: 950, c: 'cutlery', t: 'spoons', n: { ru: 'Щипцы для сервировки, золотистые и серебристые', kk: 'Қысқыштар: алтын және күміс түсті', en: 'Serving tongs in gold and silver tones' } },
  { i: 960, c: 'tea', t: 'cups', o: 'th', n: { ru: 'Чашки, тарелки и пиалы поштучно, Таиланд', kk: 'Тайланд чашка, тарелка, пиаласы — жекелеп сатылады', en: 'Cups, plates and tea bowls sold individually, Thailand' } },
  { i: 962, c: 'trays', t: 'saladbowl', n: { ru: 'Салатник на мельхиоровой подставке', kk: 'Мельхиор тұғырлы салат ыдысы', en: 'Salad bowl on a nickel-silver base' }, d: NEW }, ...M(962, 961),
  { i: 963, c: 'trays', t: 'candybowl', n: { ru: 'Хрустальная конфетница с каллой', kk: 'Калла гүлді хрусталь кәмпит ыдысы', en: 'Crystal candy bowl with calla lily' }, d: NEW },
  { i: 964, c: 'trays', t: 'dish', n: { ru: 'Овальное хрустальное блюдо на золотой подставке', kk: 'Алтын тұғырлы сопақ хрусталь табақ', en: 'Oval crystal dish on a gold base' }, d: NEW },
  { i: 965, c: 'plates', t: 'bowls', b: 'Elamina', n: { ru: 'Креманки Elamina с золотой каймой', kk: 'Elamina алтын жиекті креманкалары', en: 'Elamina dessert bowls with gold rim' } },
  { i: 968, c: 'glass', t: 'glassset', o: 'tr', k: 4, n: { ru: 'Креманки с золотой каймой, Турция, 4 шт.', kk: 'Түркия креманкалары, жиынтықта 4 дана', en: 'Dessert coupes with gold rim, Turkey, set of 4' } },
  { i: 969, c: 'trays', t: 'stand', n: { ru: 'Хрустальная менажница, 5 предметов', kk: 'Хрусталь менажница, 5 дана', en: 'Crystal sectioned stand, 5 pieces' } },
  { i: 973, c: 'dinner', t: 'dinnerset', b: 'Zepter', n: { ru: 'Фарфор Zepter', kk: 'Zepter фарфоры', en: 'Zepter porcelain' } },
  { i: 979, c: 'kettles', t: 'potset', b: 'Acar', o: 'tr' },
  { i: 993, c: 'tea', t: 'teapair', n: { ru: 'Керамическая чайная пара', kk: 'Керамика шай жұбы', en: 'Ceramic cup and saucer' } },
  { i: 994, c: 'other', t: 'spiceset', b: 'Léevan', n: { ru: 'Банки для хранения Léevan', kk: 'Léevan сақтау ыдыстары', en: 'Léevan storage canisters' } },
  { i: 995, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Белый рельефный сервиз, 12 персон', kk: 'Ақ бедерлі жиынтық, 12 адамға', en: 'White ribbed dinner set, for 12' } },
  { i: 996, c: 'dinner', t: 'dinnerset', p: 6, k: 32, n: { ru: 'Сервиз с зелёно-белым мраморным узором, 6 персон, 32 предмета', kk: 'Жасыл-ақ мәрмәр өрнекті жиынтық, 6 адамға, 32 зат', en: 'Green-and-white marbled set, for 6, 32 pieces' }, d: { ru: 'Под заказ, на ваш выбор.', kk: 'Сіздің таңдауыңыз бойынша, тапсырыспен.', en: 'Made to order, your choice of design.' } },
  { i: 998, c: 'plates', t: 'bowls', o: 'th', k: 6, n: { ru: 'Набор розеток, Таиланд, 6 предметов', kk: 'Тайланд шағын ыдыстары, жиынтықта 6 дана', en: 'Set of small bowls, Thailand, 6 pieces' }, d: { ru: 'Удобно для сметаны и варенья.', kk: 'Қаймақ, тосап салуға өте ыңғайлы.', en: 'Handy for cream and jam.' } }, ...M(998, 999),
  { i: 1000, c: 'dinner', t: 'dinnerset', o: 'ae', p: 12, k: 79, d: { ru: 'Качественный фарфор из Дубая.', kk: 'Дубайдың сапалы фарфор жиынтығы.', en: 'Quality porcelain from Dubai.' } },
  { i: 1001, c: 'dinner', t: 'dinnerset', o: 'cz', p: 12, k: 73, n: { ru: 'Чешский сервиз с золотом 24К, 12 персон, 73 предмета', kk: 'Жиегі 24К алтынмен әрленген чех жиынтығы, 12 адамға, 73 зат', en: 'Czech set with 24K gold rim, for 12, 73 pieces' }, d: { ru: 'Очень лёгкий фарфор люкс-качества.', kk: 'Фарфоры жеп-жеңіл, люкс сападағы ыдыстар.', en: 'Very light, luxury-grade porcelain.' } },
];
const client = [902, 929, 947, 952, 953, 954, 955, 956, 957, 958, 970, 971, 972, 975, 980, 981, 983, 984, 986, 987, 988, 989, 990, 991, 992, 1002, 1004, 1005, 1006, 1007, 1008, 1009, 1010];
const other = [985, 1011];
save('0892', 892, 1012, [...products, ...X('client-video', ...client), ...X('other-author', ...other),
  ...X('personal-or-promo', ...rest(892, 1012, products, client, other))]);
