/* UI translations. Every visible string on the site comes from this dictionary
   (products come from data/products.json). Add a language by adding one more block. */
(function () {
  'use strict';
  var DICT = {
    ru: {
      'meta.title': 'Daria Posuda — элитная посуда и фарфор в Уральске',
      'meta.desc': 'Бутик элитной посуды в Уральске: столовые и чайные сервизы, фарфор из Чехии, Турции, Дубая и Китая, приданое невесты, подарки. Выберите и напишите в WhatsApp.',
      'skip': 'Перейти к каталогу',
      'nav.lang': 'Язык', 'nav.theme': 'Оформление', 'nav.selection': 'Моя подборка',
      'theme.ivory': 'Слоновая кость и золото', 'theme.midnight': 'Полночь', 'theme.rose': 'Роза',
      'hero.eyebrow': 'Уральск · Орал', 'hero.tagline': 'Элитная посуда • Сәнді сервиздер мен сапалы фарфор',
      'hero.browse': 'Смотреть коллекцию', 'hero.whatsapp': 'Написать в WhatsApp', 'hero.alt': 'Фарфоровый сервиз из коллекции Daria Posuda',
      'collection.eyebrow': 'Каталог', 'collection.title': 'Коллекция',
      'collection.lead': 'Отметьте сердечком то, что понравилось, и отправьте подборку в WhatsApp — так быстрее и удобнее обсудить.',
      'cat.all': 'Все', 'cat.dinner': 'Столовые сервизы', 'cat.tea': 'Чайные и кофейные наборы', 'cat.plates': 'Тарелки и блюда',
      'cat.cutlery': 'Ложки и приборы', 'cat.kettles': 'Чайники и кастрюли', 'cat.glass': 'Бокалы и стаканы',
      'cat.trays': 'Подносы и подставки', 'cat.bedding': 'Постельное бельё', 'cat.gifts': 'Подарки', 'cat.other': 'Другое',
      'origin.cz': 'Чехия', 'origin.tr': 'Турция', 'origin.ae': 'Дубай', 'origin.cn': 'Китай', 'origin.it': 'Италия',
      'origin.de': 'Германия', 'origin.jp': 'Япония', 'origin.ru': 'Россия', 'origin.uz': 'Узбекистан', 'origin.fr': 'Франция', 'origin.kr': 'Корея', 'origin.th': 'Таиланд', 'origin.pl': 'Польша',
      'filter.categories': 'Категории', 'filter.search': 'Поиск по названию', 'filter.filters': 'Фильтры',
      'filter.source': 'Бренд / страна', 'filter.anySource': 'Любой бренд и страна', 'filter.origins': 'Страна', 'filter.brands': 'Бренд',
      'filter.persons': 'Размер набора', 'filter.anyPersons': 'Любой размер', 'filter.personsN': 'на {n} персон',
      'filter.price': 'Цена, ₸', 'filter.priceFrom': 'от', 'filter.priceTo': 'до', 'filter.priceMin': 'Цена от', 'filter.priceMax': 'Цена до',
      'filter.sort': 'Сортировка', 'sort.new': 'Сначала новые', 'sort.priceAsc': 'Сначала дешевле', 'sort.priceDesc': 'Сначала дороже',
      'filter.reset': 'Сбросить', 'filter.count': 'Показано: {n}', 'filter.empty': 'Ничего не найдено. Попробуйте изменить фильтры или напишите нам — подскажем.',
      'grid.loading': 'Загружаем коллекцию…', 'grid.error': 'Не удалось загрузить каталог. Обновите страницу.', 'grid.more': 'Показать ещё',
      'price.onRequest': 'Цена по запросу', 'unit.persons': '{n} персон', 'unit.pieces': '{n} предм.',
      'card.add': 'Добавить в подборку', 'card.remove': 'Убрать из подборки', 'card.share': 'Поделиться', 'card.open': 'Открыть: {name}',
      'detail.brand': 'Бренд', 'detail.origin': 'Страна', 'detail.set': 'Набор', 'detail.category': 'Категория',
      'detail.add': 'В подборку', 'detail.added': 'В подборке', 'detail.ask': 'Спросить об этом товаре', 'detail.share': 'Поделиться',
      'detail.instagram': 'Смотреть в Instagram', 'detail.original': 'Текст из Instagram', 'detail.close': 'Закрыть',
      'detail.prev': 'Предыдущий товар', 'detail.next': 'Следующий товар', 'detail.photo': 'Фото {n}', 'detail.notFound': 'Этот товар больше не в каталоге.',
      'drawer.title': 'Моя подборка', 'drawer.fab': 'Моя подборка ({n})', 'drawer.empty': 'Пока пусто. Нажмите на сердечко у понравившихся товаров — они появятся здесь.',
      'drawer.send': 'Отправить в WhatsApp', 'drawer.clear': 'Очистить', 'drawer.remove': 'Убрать: {name}', 'drawer.close': 'Закрыть подборку',
      'drawer.hint': 'Откроется WhatsApp с готовым сообщением — останется только отправить.',
      'drawer.limit': 'В одно сообщение помещается {max} товаров. Отправим первые {max}, остальные лучше отправить вторым сообщением.',
      'msg.hello': 'Здравствуйте! Меня интересует:', 'msg.helloOne': 'Здравствуйте! Меня интересует этот товар:', 'msg.more': '…и ещё {n}',
      'msg.share': 'Посмотрите, что есть в Daria Posuda:',
      'share.title': 'Поделиться', 'share.copy': 'Скопировать ссылку', 'share.whatsapp': 'Отправить в WhatsApp', 'share.copied': 'Ссылка скопирована',
      'share.copyFail': 'Не удалось скопировать — выделите ссылку вручную', 'toast.added': 'Добавлено в подборку', 'toast.removed': 'Убрано из подборки',
      'about.eyebrow': 'О бутике', 'about.title': 'Красивый стол начинается с посуды',
      'about.text': 'Daria Posuda — бутик Дарии Турсунбаевой в Уральске. Изящные сервизы и качественный фарфор для дома, праздника и в подарок.',
      'about.f1.title': 'Чехия • Турция • Дубай • Китай', 'about.f1.text': 'Посуда и фарфор из разных стран — от классики до новинок.',
      'about.f2.title': 'Приданое невесты', 'about.f2.text': 'Қыз жасауы: поможем собрать посуду и всё для дома в одном месте.',
      'about.f3.title': 'Подарки', 'about.f3.text': 'Наборы в подарочной упаковке для близких и к торжеству.',
      'about.f4.title': 'Доставка', 'about.f4.text': 'Доставляем по Уральску. Напишите — обсудим удобный способ.',
      'about.alt': 'Дария Турсунбаева, владелица бутика Daria Posuda',
      'contact.eyebrow': 'Контакты', 'contact.title': 'Напишите нам', 'contact.text': 'Подскажем цену, наличие и поможем с выбором.',
      'contact.whatsapp': 'WhatsApp', 'contact.instagram': 'Instagram', 'contact.city': 'Уральск (Орал), Казахстан',
      'footer.rights': 'Daria Posuda. Фото и описания — из Instagram магазина.', 'wa.float': 'Написать в WhatsApp', 'wa.hello': 'Здравствуйте! Пишу с сайта Daria Posuda.'
    },
    kk: {
      'meta.title': 'Daria Posuda — Оралдағы сәнді ыдыс пен фарфор',
      'meta.desc': 'Оралдағы элиталық ыдыс бутигі: ас және шай сервиздері, Чехия, Түркия, Дубай мен Қытайдан фарфор, қыз жасауы, сыйлықтар. Таңдап, WhatsApp-қа жазыңыз.',
      'skip': 'Каталогқа өту',
      'nav.lang': 'Тіл', 'nav.theme': 'Безендіру', 'nav.selection': 'Менің таңдауым',
      'theme.ivory': 'Піл сүйегі мен алтын', 'theme.midnight': 'Түн ортасы', 'theme.rose': 'Раушан',
      'hero.eyebrow': 'Орал · Уральск', 'hero.tagline': 'Элитная посуда • Сәнді сервиздер мен сапалы фарфор',
      'hero.browse': 'Коллекцияны көру', 'hero.whatsapp': 'WhatsApp-қа жазу', 'hero.alt': 'Daria Posuda коллекциясындағы фарфор сервиз',
      'collection.eyebrow': 'Каталог', 'collection.title': 'Коллекция',
      'collection.lead': 'Ұнаған бұйымдарды жүрекшемен белгілеп, таңдауыңызды WhatsApp-қа жіберіңіз — осылай тезірек әрі ыңғайлы.',
      'cat.all': 'Барлығы', 'cat.dinner': 'Ас сервиздері', 'cat.tea': 'Шай және кофе жиынтықтары', 'cat.plates': 'Тәрелкелер мен табақтар',
      'cat.cutlery': 'Қасықтар мен ас құралдары', 'cat.kettles': 'Шәйнектер мен кастрюльдер', 'cat.glass': 'Фужерлер мен стақандар',
      'cat.trays': 'Подностар мен тұғырлар', 'cat.bedding': 'Төсек-орын', 'cat.gifts': 'Сыйлықтар', 'cat.other': 'Басқа',
      'origin.cz': 'Чехия', 'origin.tr': 'Түркия', 'origin.ae': 'Дубай', 'origin.cn': 'Қытай', 'origin.it': 'Италия',
      'origin.de': 'Германия', 'origin.jp': 'Жапония', 'origin.ru': 'Ресей', 'origin.uz': 'Өзбекстан', 'origin.fr': 'Франция', 'origin.kr': 'Корея', 'origin.th': 'Тайланд', 'origin.pl': 'Польша',
      'filter.categories': 'Санаттар', 'filter.search': 'Атауы бойынша іздеу', 'filter.filters': 'Сүзгілер',
      'filter.source': 'Бренд / ел', 'filter.anySource': 'Кез келген бренд пен ел', 'filter.origins': 'Ел', 'filter.brands': 'Бренд',
      'filter.persons': 'Жиынтық көлемі', 'filter.anyPersons': 'Кез келген көлем', 'filter.personsN': '{n} адамға',
      'filter.price': 'Бағасы, ₸', 'filter.priceFrom': 'бастап', 'filter.priceTo': 'дейін', 'filter.priceMin': 'Ең төменгі баға', 'filter.priceMax': 'Ең жоғарғы баға',
      'filter.sort': 'Сұрыптау', 'sort.new': 'Алдымен жаңалары', 'sort.priceAsc': 'Алдымен арзаны', 'sort.priceDesc': 'Алдымен қымбаты',
      'filter.reset': 'Тазалау', 'filter.count': 'Көрсетілді: {n}', 'filter.empty': 'Ештеңе табылмады. Сүзгілерді өзгертіп көріңіз немесе бізге жазыңыз — көмектесеміз.',
      'grid.loading': 'Коллекция жүктелуде…', 'grid.error': 'Каталогты жүктеу мүмкін болмады. Бетті жаңартыңыз.', 'grid.more': 'Тағы көрсету',
      'price.onRequest': 'Бағасын сұраңыз', 'unit.persons': '{n} адамға', 'unit.pieces': '{n} зат',
      'card.add': 'Таңдауға қосу', 'card.remove': 'Таңдаудан алып тастау', 'card.share': 'Бөлісу', 'card.open': 'Ашу: {name}',
      'detail.brand': 'Бренд', 'detail.origin': 'Ел', 'detail.set': 'Жиынтық', 'detail.category': 'Санат',
      'detail.add': 'Таңдауға қосу', 'detail.added': 'Таңдауда', 'detail.ask': 'Осы бұйым туралы сұрау', 'detail.share': 'Бөлісу',
      'detail.instagram': 'Instagram-да көру', 'detail.original': 'Instagram-дағы мәтін', 'detail.close': 'Жабу',
      'detail.prev': 'Алдыңғы бұйым', 'detail.next': 'Келесі бұйым', 'detail.photo': '{n}-фото', 'detail.notFound': 'Бұл бұйым каталогта жоқ.',
      'drawer.title': 'Менің таңдауым', 'drawer.fab': 'Менің таңдауым ({n})', 'drawer.empty': 'Әзірге бос. Ұнаған бұйымдардың жүрекшесін басыңыз — олар осында пайда болады.',
      'drawer.send': 'WhatsApp-қа жіберу', 'drawer.clear': 'Тазалау', 'drawer.remove': 'Алып тастау: {name}', 'drawer.close': 'Таңдауды жабу',
      'drawer.hint': 'Дайын хабарламасы бар WhatsApp ашылады — тек жіберу ғана қалады.',
      'drawer.limit': 'Бір хабарламаға {max} бұйым сыяды. Алғашқы {max} бұйымды жібереміз, қалғанын екінші хабарламамен жіберген дұрыс.',
      'msg.hello': 'Сәлеметсіз бе! Мені мына бұйымдар қызықтырады:', 'msg.helloOne': 'Сәлеметсіз бе! Мені мына бұйым қызықтырады:', 'msg.more': '…және тағы {n}',
      'msg.share': 'Қараңызшы, Daria Posuda-дан не таптым:',
      'share.title': 'Бөлісу', 'share.copy': 'Сілтемені көшіру', 'share.whatsapp': 'WhatsApp-қа жіберу', 'share.copied': 'Сілтеме көшірілді',
      'share.copyFail': 'Көшіру мүмкін болмады — сілтемені қолмен белгілеңіз', 'toast.added': 'Таңдауға қосылды', 'toast.removed': 'Таңдаудан алынды',
      'about.eyebrow': 'Бутик туралы', 'about.title': 'Әдемі дастархан ыдыстан басталады',
      'about.text': 'Daria Posuda — Дария Турсунбаеваның Оралдағы бутигі. Үйге, мерекеге және сыйлыққа арналған сәнді сервиздер мен сапалы фарфор.',
      'about.f1.title': 'Чехия • Түркия • Дубай • Қытай', 'about.f1.text': 'Әр елдің ыдысы мен фарфоры — классикадан жаңа үлгілерге дейін.',
      'about.f2.title': 'Қыз жасауы', 'about.f2.text': 'Ыдыс-аяқ пен үйге қажеттінің бәрін бір жерден таңдауға көмектесеміз.',
      'about.f3.title': 'Сыйлықтар', 'about.f3.text': 'Жақындарыңызға және тойға арналған сыйлық қорабындағы жиынтықтар.',
      'about.f4.title': 'Жеткізу', 'about.f4.text': 'Орал қаласы бойынша жеткіземіз. Жазыңыз — ыңғайлы жолын келісеміз.',
      'about.alt': 'Дария Турсунбаева, Daria Posuda бутигінің иесі',
      'contact.eyebrow': 'Байланыс', 'contact.title': 'Бізге жазыңыз', 'contact.text': 'Бағасын, қолда барын айтып, таңдауға көмектесеміз.',
      'contact.whatsapp': 'WhatsApp', 'contact.instagram': 'Instagram', 'contact.city': 'Орал (Уральск), Қазақстан',
      'footer.rights': 'Daria Posuda. Фотолар мен сипаттамалар дүкеннің Instagram парақшасынан алынған.', 'wa.float': 'WhatsApp-қа жазу', 'wa.hello': 'Сәлеметсіз бе! Daria Posuda сайтынан жазып тұрмын.'
    },
    en: {
      'meta.title': 'Daria Posuda — fine tableware and porcelain in Uralsk',
      'meta.desc': 'A tableware boutique in Uralsk, Kazakhstan: dinner and tea sets, porcelain from the Czech Republic, Turkey, Dubai and China, bridal dowry sets and gifts. Pick your favourites and message us on WhatsApp.',
      'skip': 'Skip to the collection',
      'nav.lang': 'Language', 'nav.theme': 'Look', 'nav.selection': 'My selection',
      'theme.ivory': 'Ivory & Gold', 'theme.midnight': 'Midnight', 'theme.rose': 'Rose',
      'hero.eyebrow': 'Uralsk · Oral', 'hero.tagline': 'Elite tableware • Elegant dinner sets and fine porcelain',
      'hero.browse': 'Browse the collection', 'hero.whatsapp': 'Write on WhatsApp', 'hero.alt': 'A porcelain set from the Daria Posuda collection',
      'collection.eyebrow': 'Catalogue', 'collection.title': 'The collection',
      'collection.lead': 'Tap the heart on anything you like, then send your selection on WhatsApp — the quickest way to talk it through.',
      'cat.all': 'All', 'cat.dinner': 'Dinner sets', 'cat.tea': 'Tea & coffee sets', 'cat.plates': 'Plates & dishes',
      'cat.cutlery': 'Spoons & cutlery', 'cat.kettles': 'Kettles & pots', 'cat.glass': 'Glassware',
      'cat.trays': 'Serving trays & stands', 'cat.bedding': 'Bedding', 'cat.gifts': 'Gifts', 'cat.other': 'Other',
      'origin.cz': 'Czech Republic', 'origin.tr': 'Turkey', 'origin.ae': 'Dubai', 'origin.cn': 'China', 'origin.it': 'Italy',
      'origin.de': 'Germany', 'origin.jp': 'Japan', 'origin.ru': 'Russia', 'origin.uz': 'Uzbekistan', 'origin.fr': 'France', 'origin.kr': 'Korea', 'origin.th': 'Thailand', 'origin.pl': 'Poland',
      'filter.categories': 'Categories', 'filter.search': 'Search by name', 'filter.filters': 'Filters',
      'filter.source': 'Brand / origin', 'filter.anySource': 'Any brand or origin', 'filter.origins': 'Origin', 'filter.brands': 'Brand',
      'filter.persons': 'Set size', 'filter.anyPersons': 'Any size', 'filter.personsN': 'for {n}',
      'filter.price': 'Price, ₸', 'filter.priceFrom': 'from', 'filter.priceTo': 'to', 'filter.priceMin': 'Minimum price', 'filter.priceMax': 'Maximum price',
      'filter.sort': 'Sort', 'sort.new': 'Newest first', 'sort.priceAsc': 'Price: low to high', 'sort.priceDesc': 'Price: high to low',
      'filter.reset': 'Reset', 'filter.count': 'Showing: {n}', 'filter.empty': 'Nothing found. Try changing the filters, or message us and we will help.',
      'grid.loading': 'Loading the collection…', 'grid.error': 'The catalogue could not be loaded. Please refresh the page.', 'grid.more': 'Show more',
      'price.onRequest': 'Price on request', 'unit.persons': 'for {n}', 'unit.pieces': '{n} pcs',
      'card.add': 'Add to selection', 'card.remove': 'Remove from selection', 'card.share': 'Share', 'card.open': 'Open: {name}',
      'detail.brand': 'Brand', 'detail.origin': 'Origin', 'detail.set': 'Set', 'detail.category': 'Category',
      'detail.add': 'Add to selection', 'detail.added': 'In your selection', 'detail.ask': 'Ask about this item', 'detail.share': 'Share',
      'detail.instagram': 'View on Instagram', 'detail.original': 'Original Instagram text', 'detail.close': 'Close',
      'detail.prev': 'Previous item', 'detail.next': 'Next item', 'detail.photo': 'Photo {n}', 'detail.notFound': 'This item is no longer in the catalogue.',
      'drawer.title': 'My selection', 'drawer.fab': 'My selection ({n})', 'drawer.empty': 'Nothing here yet. Tap the heart on the items you like and they will appear here.',
      'drawer.send': 'Send to WhatsApp', 'drawer.clear': 'Clear', 'drawer.remove': 'Remove: {name}', 'drawer.close': 'Close selection',
      'drawer.hint': 'WhatsApp opens with the message ready — you only need to press send.',
      'drawer.limit': 'One message fits {max} items. We will send the first {max}; please send the rest in a second message.',
      'msg.hello': 'Hello! I am interested in:', 'msg.helloOne': 'Hello! I am interested in this item:', 'msg.more': '…and {n} more',
      'msg.share': 'Look what I found at Daria Posuda:',
      'share.title': 'Share', 'share.copy': 'Copy link', 'share.whatsapp': 'Send via WhatsApp', 'share.copied': 'Link copied',
      'share.copyFail': 'Could not copy — please select the link manually', 'toast.added': 'Added to your selection', 'toast.removed': 'Removed from your selection',
      'about.eyebrow': 'About the boutique', 'about.title': 'A beautiful table begins with the tableware',
      'about.text': 'Daria Posuda is Daria Tursunbayeva’s boutique in Uralsk: elegant sets and fine porcelain for the home, for celebrations and for gifting.',
      'about.f1.title': 'Czech • Turkey • Dubai • China', 'about.f1.text': 'Tableware and porcelain from several countries, from classics to new arrivals.',
      'about.f2.title': 'Bridal dowry sets', 'about.f2.text': 'Қыз жасауы: we help put together tableware and home essentials in one place.',
      'about.f3.title': 'Gifts', 'about.f3.text': 'Sets in gift packaging for loved ones and special occasions.',
      'about.f4.title': 'Delivery', 'about.f4.text': 'We deliver within Uralsk. Message us and we will agree on what suits you.',
      'about.alt': 'Daria Tursunbayeva, owner of the Daria Posuda boutique',
      'contact.eyebrow': 'Contacts', 'contact.title': 'Write to us', 'contact.text': 'We will tell you the price and availability and help you choose.',
      'contact.whatsapp': 'WhatsApp', 'contact.instagram': 'Instagram', 'contact.city': 'Uralsk (Oral), Kazakhstan',
      'footer.rights': 'Daria Posuda. Photos and descriptions come from the shop’s Instagram.', 'wa.float': 'Write on WhatsApp', 'wa.hello': 'Hello! I am writing from the Daria Posuda website.'
    }
  };

  var LANGS = ['ru', 'kk', 'en'];
  var KEY = 'dp.lang';
  function detect() {
    try { var s = localStorage.getItem(KEY); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var list = navigator.languages || [navigator.language || 'ru'];
    for (var i = 0; i < list.length; i++) {
      var c = String(list[i]).toLowerCase().slice(0, 2);
      if (c === 'kk') return 'kk';
      if (c === 'ru') return 'ru';
      if (c === 'en') return 'en';
    }
    return 'ru';
  }
  var lang = detect();

  function t(key, vars) {
    var s = (DICT[lang] && DICT[lang][key]) || DICT.ru[key] || key;
    if (vars) for (var k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }
  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p[1]) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    if (root === document) {
      document.documentElement.lang = lang;
      document.title = t('meta.title');
      var set = function (sel, v) { var m = document.querySelector(sel); if (m) m.setAttribute('content', v); };
      set('meta[name="description"]', t('meta.desc'));
      set('meta[property="og:title"]', t('meta.title'));
      set('meta[property="og:description"]', t('meta.desc'));
      set('meta[property="og:locale"]', { ru: 'ru_RU', kk: 'kk_KZ', en: 'en_US' }[lang]);
      document.querySelectorAll('[data-lang]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
      });
    }
  }
  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    apply(document);
    document.dispatchEvent(new CustomEvent('dp:lang', { detail: l }));
  }

  window.I18N = { t: t, apply: apply, setLang: setLang, get lang() { return lang; }, langs: LANGS };
  apply(document); // runs before first paint (script sits at the end of <body>)
})();
