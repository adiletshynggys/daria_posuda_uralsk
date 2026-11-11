// Review of posts 1132–1251.
const { X, NEW, save } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const GS = { ru: 'Золотистая или серебристая.', kk: 'Алтын немесе күміс түсті.', en: 'In gold or silver tone.' };
const products = [
  ...M(901, 1143), ...M(973, 1144), ...M(909, 1147), ...M(857, 1168, 1169, 1200, 1201, 1214, 1215, 1248), ...M(494, 1178),
  ...M(649, 1192, 1193, 1194, 1195, 1196, 1197), ...M(1075, 1211), ...M(702, 1218, 1219), ...M(792, 1220, 1221, 1231, 1232),
  ...M(719, 1229, 1230), ...M(907, 1235, 1236),
  { i: 1136, c: 'tea', t: 'teaset', o: 'pl', n: { ru: 'Польский фарфор', kk: 'Польша фарфоры', en: 'Polish porcelain' } }, ...M(1136, 1137, 1138),
  { i: 1140, c: 'other', t: 'decor', n: { ru: 'Подставка для зубочисток «Птицы»', kk: 'Құстар бейнеленген тісшұқығыш сауыты', en: '“Birds” toothpick holder' } },
  { i: 1145, c: 'trays', t: 'cakestand', n: { ru: 'Блюдо на ножке, золотистое или серебристое', kk: 'Биік аяқты табақ: алтын немесе күміс түсті', en: 'Footed platter in gold or silver tone' }, d: { ru: 'Новинка. Для фруктов, мясных блюд и сладкой выпечки.', kk: 'Жаңа түскен үлгі. Жеміс, піскен ет тағамдары, тәтті бәліш салуға.', en: 'New arrival. For fruit, meat dishes and sweet pastries.' } }, ...M(1145, 1146, 1149),
  { i: 1148, c: 'dinner', t: 'dinnerset', b: 'Zepter', n: { ru: 'Сервиз Zepter с золотой каймой', kk: 'Zepter алтын жиекті сервизі', en: 'Zepter dinner set with gold band' } },
  { i: 1152, c: 'cutlery', t: 'cutleryset', b: 'Elamina', p: 24, k: 96 },
  { i: 1153, c: 'trays', t: 'servingset', b: 'Elamina', n: { ru: 'Фарфор Elamina с золотой каймой: пирожницы, тортницы, блюда', kk: 'Elamina алтын жиекті фарфоры: пирожница, тортница, табақтар', en: 'Elamina gold-rimmed porcelain: pastry stands, cake stands, dishes' }, d: { ru: 'В красивой коробке, каждый предмет продаётся отдельно.', kk: 'Әдемі қорабымен, жеке-жеке сатылады.', en: 'In a presentation box; each piece is sold separately.' } }, ...M(1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162),
  { i: 1163, c: 'plates', t: 'dishes', o: 'th', n: { ru: 'Фарфоровые блюда и тортницы, Таиланд', kk: 'Тайланд фарфор табақтары мен тортницалары', en: 'Porcelain dishes and cake stands, Thailand' } }, ...M(1163, 1164, 1165, 1182),
  { i: 1166, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Белый сервиз с волнистым золотым краем, 12 персон', kk: 'Толқынды алтын жиекті ақ жиынтық, 12 адамға', en: 'White set with scalloped gold edge, for 12' } },
  { i: 1167, c: 'dinner', t: 'dinnerset', p: 6, k: 32, n: { ru: 'Матовый зелёный сервиз, 6 персон, 32 предмета', kk: 'Күңгірт жасыл жиынтық, 6 адамға, 32 зат', en: 'Matte green set, for 6, 32 pieces' } },
  { i: 1171, c: 'kettles', t: 'thermos', n: { ru: 'Термосы-чайники', kk: 'Термос шәйнектер', en: 'Thermos jugs' }, d: { ru: 'Много дизайнов: белые, золотистые, серебристые.', kk: 'Түрлері көп: ақ, алтын, күміс түсті.', en: 'Many designs in white, gold and silver.' } }, ...M(1171, 1172, 1173, 1174, 1175, 1176, 1177),
  { i: 1185, c: 'kettles', t: 'pan', b: 'Elamina', n: { ru: 'Кастрюли, сковороды и сотейники Elamina поштучно', kk: 'Elamina кастрюль, сковородка, сотейник — жекелеп', en: 'Elamina pots, pans and saucepans, sold individually' } },
  { i: 1191, c: 'trays', t: 'trayset', b: 'Elamina', n: { ru: 'Набор подносов Elamina, 3 в 1', kk: 'Elamina 3/1 подностары', en: 'Elamina set of three trays' } },
  { i: 1213, c: 'trays', t: 'fruitbowl', n: { ru: 'Ваза для фруктов и конфет со съёмной стеклянной чашей', kk: 'Әйнегі алынатын жеміс пен кәмпит ыдысы', en: 'Fruit and candy stand with removable glass bowl' }, d: GS }, ...M(1213, 1212, 1233, 1234),
  { i: 1217, c: 'trays', t: 'servingset', n: { ru: 'Менажница с крышкой', kk: 'Қақпақты менажница', en: 'Lidded sectioned dish' }, d: { ru: 'Керамическая вставка вынимается, удобно мыть. Золотистая или серебристая.', kk: 'Ішіндегі керамикасы алынады, жууға ыңғайлы. Алтын немесе күміс түсті.', en: 'The ceramic insert lifts out for easy washing. In gold or silver tone.' } }, ...M(1217, 1216, 1240, 1241, 1183),
  { i: 1223, c: 'trays', t: 'stand', n: { ru: 'Менажница «Ветка» с хрустальными чашами', kk: 'Хрусталь тостағанды «Бұтақ» менажницасы', en: '“Branch” stand with crystal bowls' }, d: GS }, ...M(1223, 1222),
  { i: 1224, c: 'trays', t: 'stand', n: { ru: 'Трёхъярусная фарфоровая этажерка', kk: 'Үш қабатты фарфор этажерка', en: 'Three-tier porcelain stand' }, d: GS }, ...M(1224, 1225, 1226),
  { i: 1228, c: 'trays', t: 'servingset', n: { ru: 'Хрустальная менажница на ножках', kk: 'Аяқты хрусталь менажница', en: 'Crystal sectioned dish on feet' }, d: GS }, ...M(1228, 1227),
  { i: 1237, c: 'other', t: 'decor', n: { ru: 'Салфетницы', kk: 'Салфетница түрлері', en: 'Napkin holders' } },
  { i: 1239, c: 'other', t: 'servingset', n: { ru: 'Хлебница с крышкой', kk: 'Қақпақты нан ыдысы', en: 'Lidded bread box' }, d: { ru: 'Акриловая вставка вынимается. Золотистая или серебристая.', kk: 'Ішіндегі акрил ыдысы алынады. Алтын немесе күміс түсті.', en: 'The acrylic insert lifts out. In gold or silver tone.' } }, ...M(1239, 1238),
  { i: 1242, c: 'dinner', t: 'dinnerset', p: 6, k: 32, n: { ru: 'Цветной сервиз на каждый день, 6 персон, 32 предмета', kk: 'Түрлі-түсті күнделікті жиынтық, 6 адамға, 32 зат', en: 'Coloured everyday set, for 6, 32 pieces' }, d: { ru: 'Несколько цветов: жёлтый, серо-зелёный, бирюзовый, белый.', kk: 'Бірнеше түсі бар: сары, сұр-жасыл, көгілдір, ақ.', en: 'Several colours: yellow, grey-green, teal, white.' } }, ...M(1242, 1243, 1244, 1245, 1246, 1247),
  { i: 1249, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Белый рельефный сервиз с каймой, 12 персон', kk: 'Жиекті ақ бедерлі жиынтық, 12 адамға', en: 'White ribbed set with rim, for 12' }, d: { ru: 'Платиновая или золотая кайма.', kk: 'Күміс немесе алтын жиекті.', en: 'Platinum or gold rim.' } }, ...M(1249, 1250, 1251),
];
const used = new Set(products.map((p) => p.i));
const rest = []; for (let i = 1132; i < 1252; i++) if (!used.has(i)) rest.push(i);
save('1132', 1132, 1252, [...products, ...X('client-video', ...rest)]);
