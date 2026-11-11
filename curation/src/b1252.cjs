// Review of posts 1252–1399 (the oldest part of the feed).
const { X, save } = require('./util.cjs');
const M = (target, ...is) => is.map((i) => ({ i, m: target }));
const R = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k);
const GS = { ru: 'Золотистые и серебристые.', kk: 'Алтын және күміс түсті.', en: 'In gold and silver tones.' };
const products = [
  ...M(1249, 1252, 1257), ...M(1166, 1255), ...M(687, 1261, 1262), ...M(1163, ...R(1278, 1286), 1297, 1298, 1299),
  ...M(1237, 1290, 1305), ...M(1075, 1291, 1292, 1318, 1319), ...M(950, 1293, 1350, 1351), ...M(901, 1309, 1310),
  ...M(1217, 1312, 1313), ...M(1223, 1315, 1316, 1321), ...M(1171, ...R(1325, 1330)), ...M(1140, 1334), ...M(733, 1341),
  ...M(760, 1342, 1343, 1344, 1347, 1348, 1349), ...M(936, 1345, 1346), ...M(673, 1353), ...M(907, 1357, 1358, 1359, 1365, 1374, 1375),
  ...M(857, 1273, 1274, 1275, 1276, 1277),
  { i: 1256, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с нежным цветочным узором, 12 персон', kk: 'Нәзік гүл өрнекті жиынтық, 12 адамға', en: 'Dinner set with delicate floral pattern, for 12' } }, ...M(1256, 1259),
  { i: 1258, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Сервиз с золотым кружевным бортом, 12 персон', kk: 'Алтын шілтер жиекті жиынтық, 12 адамға', en: 'Dinner set with gold lace border, for 12' } },
  { i: 1260, c: 'dinner', t: 'dinnerset', p: 12, n: { ru: 'Белый сервиз с золотым пунктиром, 12 персон', kk: 'Алтын нүктелі ақ жиынтық, 12 адамға', en: 'White set with gold-dot rim, for 12' } },
  { i: 1263, c: 'kettles', t: 'kettles', o: 'tr', n: { ru: 'Набор чайников, Турция', kk: 'Түркия чайник наборы', en: 'Kettle set, Turkey' } }, ...M(1263, 1264),
  { i: 1267, c: 'kettles', t: 'potset', b: 'Evimsaray', o: 'tr' }, ...M(1267, 1268),
  { i: 1265, c: 'kettles', t: 'potset', n: { ru: 'Наборы кастрюль с гранитным покрытием', kk: 'Гранит жабынды кастрюль жиынтықтары', en: 'Granite-coated cookware sets' }, d: { ru: 'Несколько цветов.', kk: 'Бірнеше түсі бар.', en: 'Several colours.' } }, ...M(1265, 1266, 1269, 1270, 1271, 1272),
  { i: 1300, c: 'cutlery', t: 'cutleryset', p: 12, k: 36, n: { ru: 'Наборы столовых приборов Elamina и Alpenberg, 12 персон', kk: 'Elamina, Alpenberg қасық жиынтықтары, 12 адамға', en: 'Elamina and Alpenberg cutlery sets, for 12' } }, ...M(1300, 1301, 1302),
  { i: 1303, c: 'tea', t: 'teaset', n: { ru: 'Жёлтый чайный набор', kk: 'Сары шай жиынтығы', en: 'Yellow tea set' } },
  { i: 1306, c: 'kettles', t: 'potset', n: { ru: 'Набор: кастрюли, чайник и мантоварка', kk: 'Кастрюльдер, чайник және мантоварка жиынтығы', en: 'Set of pots, kettle and steamer' }, d: { ru: 'Несколько цветов.', kk: 'Бірнеше түсі бар.', en: 'Several colours.' } }, ...M(1306, 1307, 1308),
  { i: 1314, c: 'trays', t: 'stand', n: { ru: 'Менажница на три секции с ручкой', kk: 'Тұтқалы үш бөлікті менажница', en: 'Three-section dish with handle' }, d: { ru: 'Для восточных сладостей, сухофруктов, орехов. Золотистые и серебристые.', kk: 'Шығыс тәттілерін, кепкен жеміс, өрік, мейіз салуға. Алтын және күміс түсті.', en: 'For oriental sweets, dried fruit and nuts. In gold and silver tones.' } }, ...M(1314, 1311, 1317),
  { i: 1320, c: 'trays', t: 'stand', n: { ru: 'Менажница-карусель с фарфоровыми чашами', kk: 'Фарфор тостағанды менажница', en: 'Carousel stand with lidded porcelain bowls' } }, ...M(1320, 1322),
  { i: 1323, c: 'cutlery', t: 'cutleryset', n: { ru: 'Наборы кухонных принадлежностей на подставке', kk: 'Тұғырлы ас үй құралдары жиынтығы', en: 'Kitchen utensil sets on a stand' } }, ...M(1323, 1324),
  { i: 1331, c: 'glass', t: 'wineglasses', b: 'Bohemia', o: 'cz', n: { ru: 'Фужеры Bohemia с золотой каймой', kk: 'Bohemia алтын жиекті фужерлері', en: 'Bohemia goblets with gold band' } },
  { i: 1332, c: 'plates', t: 'plates', n: { ru: 'Подтарельники', kk: 'Подтарельник түрлері', en: 'Charger plates' } },
  { i: 1333, c: 'other', t: 'decor', n: { ru: 'Медовницы «Пчёлка»', kk: 'Бал салуға арналған ыдыс', en: '“Bee” honey pots' }, d: GS },
  { i: 1335, c: 'gifts', t: 'decor', n: { ru: 'Статуэтки и декор для дома', kk: 'Үйге қажетті сәнді мүсіндер', en: 'Figurines and home decor' } }, ...M(1335, 1336, 1337, 1338, 1339, 1340),
  { i: 1352, c: 'other', t: 'spiceset', n: { ru: 'Банки для чая, соли и перца', kk: 'Шәй, тұз, бұрыш салуға арналған сауыттар', en: 'Canisters for tea, salt and pepper' } },
  { i: 1362, c: 'trays', t: 'servingset', n: { ru: 'Мельхиоровые блюда-ладьи с фарфоровой вставкой', kk: 'Фарфор салмалы мельхиор ыдыстар', en: 'Nickel-silver boat dishes with porcelain insert' }, d: { ru: 'Очень высокое качество. Золотистые и серебристые.', kk: 'Сапа жағынан өте жоғары. Алтын және күміс түсті.', en: 'Very high quality. In gold and silver tones.' } }, ...M(1362, 1360, 1361, 1363, 1364, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373),
  { i: 1381, c: 'trays', t: 'fruitbowl', n: { ru: 'Мельхиоровые вазы для фруктов и торта', kk: 'Жеміс-жидек, торт салуға арналған мельхиор ыдыстар', en: 'Nickel-silver stands for fruit and cake' }, d: { ru: 'С ручкой-корзинкой или на ножке. Золотистые и серебристые.', kk: 'Тұтқалы немесе биік аяқты. Алтын және күміс түсті.', en: 'Basket-handled or footed. In gold and silver tones.' } }, ...M(1381, ...R(1382, 1394)),
  { i: 1396, c: 'trays', t: 'cakestand', n: { ru: 'Ажурная тортница', kk: 'Өрнекті тортница', en: 'Filigree cake stand' }, d: { ru: 'Стеклянная вставка вынимается, удобно мыть. Золотистая или серебристая.', kk: 'Ішіндегі әйнегі алынады, жууға ыңғайлы. Алтын және күміс түсті.', en: 'The glass insert lifts out for easy washing. In gold or silver tone.' } }, ...M(1396, 1395, 1397),
];
const used = new Set(products.map((p) => p.i));
const rest = R(1252, 1399).filter((i) => !used.has(i));
save('1252', 1252, 1400, [...products, ...X('client-video', ...rest)]);
