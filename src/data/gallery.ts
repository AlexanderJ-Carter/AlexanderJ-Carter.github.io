import type { Lang } from '../i18n/types';

export type GalleryCategory = { id: string; label: string };

export type GalleryItem = {
  id: number;
  category: string;
  image: string;
  copy: Record<Lang, { title: string; description: string }>;
};

export const galleryCategories: Record<Lang, GalleryCategory[]> = {
  "zh-CN": [
    {
      "id": "all",
      "label": "全部"
    },
    {
      "id": "landscape",
      "label": "风景"
    },
    {
      "id": "nature",
      "label": "自然"
    },
    {
      "id": "architecture",
      "label": "建筑"
    },
    {
      "id": "street",
      "label": "街拍"
    },
    {
      "id": "food",
      "label": "美食"
    }
  ],
  "zh-TW": [
    {
      "id": "all",
      "label": "全部"
    },
    {
      "id": "landscape",
      "label": "風景"
    },
    {
      "id": "nature",
      "label": "自然"
    },
    {
      "id": "architecture",
      "label": "建築"
    },
    {
      "id": "street",
      "label": "街拍"
    },
    {
      "id": "food",
      "label": "美食"
    }
  ],
  "en-GB": [
    {
      "id": "all",
      "label": "All"
    },
    {
      "id": "landscape",
      "label": "Landscape"
    },
    {
      "id": "nature",
      "label": "Nature"
    },
    {
      "id": "architecture",
      "label": "Architecture"
    },
    {
      "id": "street",
      "label": "Street"
    },
    {
      "id": "food",
      "label": "Food"
    }
  ],
  "fr": [
    {
      "id": "all",
      "label": "Tout"
    },
    {
      "id": "landscape",
      "label": "Paysage"
    },
    {
      "id": "nature",
      "label": "Nature"
    },
    {
      "id": "architecture",
      "label": "Architecture"
    },
    {
      "id": "street",
      "label": "Rue"
    },
    {
      "id": "food",
      "label": "Nourriture"
    }
  ],
  "ru": [
    {
      "id": "all",
      "label": "Все"
    },
    {
      "id": "landscape",
      "label": "Пейзаж"
    },
    {
      "id": "nature",
      "label": "Природа"
    },
    {
      "id": "architecture",
      "label": "Архитектура"
    },
    {
      "id": "street",
      "label": "Улица"
    },
    {
      "id": "food",
      "label": "Еда"
    }
  ]
};

export const galleryItems: GalleryItem[] = [
  {
    "id": 1,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-01.webp",
    "copy": {
      "zh-CN": {
        "title": "山间晨雾",
        "description": "清晨的山间，薄雾缭绕"
      },
      "zh-TW": {
        "title": "山間晨霧",
        "description": "清晨的山間，薄霧繚繞"
      },
      "en-GB": {
        "title": "Mountain Morning Mist",
        "description": "Misty morning in the mountains"
      },
      "fr": {
        "title": "Brume Matinale de Montagne",
        "description": "Matin brumeux dans les montagnes"
      },
      "ru": {
        "title": "Утренний Туман в Горах",
        "description": "Туманное утро в горах"
      }
    }
  },
  {
    "id": 2,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-02.webp",
    "copy": {
      "zh-CN": {
        "title": "海岸日落",
        "description": "夕阳西下，海天一色"
      },
      "zh-TW": {
        "title": "海岸日落",
        "description": "夕陽西下，海天一色"
      },
      "en-GB": {
        "title": "Coastal Sunset",
        "description": "Sunset over the ocean"
      },
      "fr": {
        "title": "Coucher de Soleil Côtier",
        "description": "Coucher de soleil sur l'océan"
      },
      "ru": {
        "title": "Прибрежный Закат",
        "description": "Закат над океаном"
      }
    }
  },
  {
    "id": 3,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-03.webp",
    "copy": {
      "zh-CN": {
        "title": "城市天际线",
        "description": "都市的繁华与宁静"
      },
      "zh-TW": {
        "title": "城市天際線",
        "description": "都市的繁華與寧靜"
      },
      "en-GB": {
        "title": "City Skyline",
        "description": "Urban beauty and serenity"
      },
      "fr": {
        "title": "Horizon de la Ville",
        "description": "Beauté et sérénité urbaines"
      },
      "ru": {
        "title": "Городской Пейзаж",
        "description": "Городская красота и спокойствие"
      }
    }
  },
  {
    "id": 4,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-04.webp",
    "copy": {
      "zh-CN": {
        "title": "星空银河",
        "description": "浩瀚星空，璀璨银河"
      },
      "zh-TW": {
        "title": "星空銀河",
        "description": "浩瀚星空，璀璨銀河"
      },
      "en-GB": {
        "title": "Starry Galaxy",
        "description": "Vast starry sky and Milky Way"
      },
      "fr": {
        "title": "Galaxie Étoilée",
        "description": "Vaste ciel étoilé et Voie Lactée"
      },
      "ru": {
        "title": "Звездная Галактика",
        "description": "Бескрайнее звездное небо"
      }
    }
  },
  {
    "id": 5,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-05.webp",
    "copy": {
      "zh-CN": {
        "title": "山谷云海",
        "description": "云雾翻腾，如梦如幻"
      },
      "zh-TW": {
        "title": "山谷雲海",
        "description": "雲霧翻騰，如夢如幻"
      },
      "en-GB": {
        "title": "Valley Cloud Sea",
        "description": "Rolling clouds, dreamlike scenery"
      },
      "fr": {
        "title": "Mer de Nuages de la Vallée",
        "description": "Nuages roulants, paysage onirique"
      },
      "ru": {
        "title": "Море Облаков в Долине",
        "description": "Катящиеся облака"
      }
    }
  },
  {
    "id": 6,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-06.webp",
    "copy": {
      "zh-CN": {
        "title": "湖光山色",
        "description": "湖水静谧，倒映青山"
      },
      "zh-TW": {
        "title": "湖光山色",
        "description": "湖水靜謐，倒映青山"
      },
      "en-GB": {
        "title": "Lake & Mountains",
        "description": "Tranquil lake reflecting peaks"
      },
      "fr": {
        "title": "Lac et Montagnes",
        "description": "Lac tranquille reflétant les sommets"
      },
      "ru": {
        "title": "Озеро и Горы",
        "description": "Спокойное озеро"
      }
    }
  },
  {
    "id": 7,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-07.webp",
    "copy": {
      "zh-CN": {
        "title": "雪域高原",
        "description": "皑皑白雪，壮丽雪山"
      },
      "zh-TW": {
        "title": "雪域高原",
        "description": "皚皚白雪，壯麗雪山"
      },
      "en-GB": {
        "title": "Snowy Plateau",
        "description": "Majestic snow-capped mountains"
      },
      "fr": {
        "title": "Plateau Enneigé",
        "description": "Montagnes majestueuses enneigées"
      },
      "ru": {
        "title": "Снежное Плоскогорье",
        "description": "Величественные горы"
      }
    }
  },
  {
    "id": 8,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-08.webp",
    "copy": {
      "zh-CN": {
        "title": "秋色斑斓",
        "description": "层林尽染，五彩秋光"
      },
      "zh-TW": {
        "title": "秋色斑斕",
        "description": "層林盡染，五彩秋光"
      },
      "en-GB": {
        "title": "Autumn Colours",
        "description": "Colourful fall foliage"
      },
      "fr": {
        "title": "Couleurs d'Automne",
        "description": "Feuillage coloré d'automne"
      },
      "ru": {
        "title": "Осенние Краски",
        "description": "Цветная осенняя листва"
      }
    }
  },
  {
    "id": 9,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-09.webp",
    "copy": {
      "zh-CN": {
        "title": "日出东方",
        "description": "旭日初升，霞光万丈"
      },
      "zh-TW": {
        "title": "日出東方",
        "description": "旭日初升，霞光萬丈"
      },
      "en-GB": {
        "title": "Sunrise East",
        "description": "Dawn breaking with golden rays"
      },
      "fr": {
        "title": "Lever du Soleil à l'Est",
        "description": "Aube avec des rayons dorés"
      },
      "ru": {
        "title": "Восход на Востоке",
        "description": "Рассвет с золотыми лучами"
      }
    }
  },
  {
    "id": 10,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-10.webp",
    "copy": {
      "zh-CN": {
        "title": "峡谷奇观",
        "description": "鬼斧神工，自然奇迹"
      },
      "zh-TW": {
        "title": "峽谷奇觀",
        "description": "鬼斧神工，自然奇蹟"
      },
      "en-GB": {
        "title": "Canyon Wonder",
        "description": "Nature's masterpiece"
      },
      "fr": {
        "title": "Merveille du Canyon",
        "description": "Chef-d'œuvre de la nature"
      },
      "ru": {
        "title": "Чудо Каньона",
        "description": "Шедевр природы"
      }
    }
  },
  {
    "id": 11,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-11.webp",
    "copy": {
      "zh-CN": {
        "title": "田园诗意",
        "description": "乡村美景，宁静祥和"
      },
      "zh-TW": {
        "title": "田園詩意",
        "description": "鄉村美景，寧靜祥和"
      },
      "en-GB": {
        "title": "Pastoral Beauty",
        "description": "Peaceful countryside scenery"
      },
      "fr": {
        "title": "Beauté Pastorale",
        "description": "Paysage campagnard paisible"
      },
      "ru": {
        "title": "Пасторальная Красота",
        "description": "Мирный сельский пейзаж"
      }
    }
  },
  {
    "id": 12,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-12.webp",
    "copy": {
      "zh-CN": {
        "title": "沙漠孤烟",
        "description": "大漠风光，苍凉壮美"
      },
      "zh-TW": {
        "title": "沙漠孤煙",
        "description": "大漠風光，蒼涼壯美"
      },
      "en-GB": {
        "title": "Desert Solitude",
        "description": "Vast desert landscape"
      },
      "fr": {
        "title": "Solitude du Désert",
        "description": "Vaste paysage désertique"
      },
      "ru": {
        "title": "Пустынное Уединение",
        "description": "Бескрайний пустынный пейзаж"
      }
    }
  },
  {
    "id": 13,
    "category": "landscape",
    "image": "/img/gallery-optimized/landscape-13.webp",
    "copy": {
      "zh-CN": {
        "title": "森林秘境",
        "description": "密林深处，神秘幽静"
      },
      "zh-TW": {
        "title": "森林秘境",
        "description": "密林深處，神秘幽靜"
      },
      "en-GB": {
        "title": "Forest Sanctuary",
        "description": "Deep in the mysterious woods"
      },
      "fr": {
        "title": "Sanctuaire Forestier",
        "description": "Au cœur des bois mystérieux"
      },
      "ru": {
        "title": "Лесной Святилище",
        "description": "В глубине таинственного леса"
      }
    }
  },
  {
    "id": 14,
    "category": "nature",
    "image": "/img/gallery-optimized/nature-flower-01.webp",
    "copy": {
      "zh-CN": {
        "title": "雨后花瓣",
        "description": "雨露滋润，花开正艳"
      },
      "zh-TW": {
        "title": "雨後花瓣",
        "description": "雨露滋潤，花開正豔"
      },
      "en-GB": {
        "title": "Petals After Rain",
        "description": "Dewdrops on blooming flowers"
      },
      "fr": {
        "title": "Pétales Après la Pluie",
        "description": "Gouttes de rosée sur fleurs"
      },
      "ru": {
        "title": "Лепестки После Дождя",
        "description": "Капли росы на цветах"
      }
    }
  },
  {
    "id": 15,
    "category": "nature",
    "image": "/img/gallery-optimized/nature-flower-02.webp",
    "copy": {
      "zh-CN": {
        "title": "晨光花影",
        "description": "晨曦初照，花影婆娑"
      },
      "zh-TW": {
        "title": "晨光花影",
        "description": "晨曦初照，花影婆娑"
      },
      "en-GB": {
        "title": "Morning Flower Shadow",
        "description": "Dawn light through petals"
      },
      "fr": {
        "title": "Ombre de Fleur Matinale",
        "description": "Lumière de l'aube à travers pétales"
      },
      "ru": {
        "title": "Утренняя Тень Цветка",
        "description": "Утренний свет сквозь лепестки"
      }
    }
  },
  {
    "id": 16,
    "category": "food",
    "image": "/img/gallery-optimized/food-01.webp",
    "copy": {
      "zh-CN": {
        "title": "精致甜点",
        "description": "甜蜜时光，味蕾盛宴"
      },
      "zh-TW": {
        "title": "精緻甜點",
        "description": "甜蜜時光，味蕾盛宴"
      },
      "en-GB": {
        "title": "Exquisite Dessert",
        "description": "Sweet moment, feast for senses"
      },
      "fr": {
        "title": "Dessert Exquis",
        "description": "Moment sucré, festin des sens"
      },
      "ru": {
        "title": "Изысканный Десерт",
        "description": "Сладкий момент"
      }
    }
  },
  {
    "id": 17,
    "category": "food",
    "image": "/img/gallery-optimized/food-02.webp",
    "copy": {
      "zh-CN": {
        "title": "传统美食",
        "description": "经典味道，传承文化"
      },
      "zh-TW": {
        "title": "傳統美食",
        "description": "經典味道，傳承文化"
      },
      "en-GB": {
        "title": "Traditional Cuisine",
        "description": "Classic taste, cultural heritage"
      },
      "fr": {
        "title": "Cuisine Traditionnelle",
        "description": "Goût classique, héritage culturel"
      },
      "ru": {
        "title": "Традиционная Кухня",
        "description": "Классический вкус"
      }
    }
  },
  {
    "id": 18,
    "category": "food",
    "image": "/img/gallery-optimized/food-03.webp",
    "copy": {
      "zh-CN": {
        "title": "创意料理",
        "description": "色香味俱全，艺术佳作"
      },
      "zh-TW": {
        "title": "創意料理",
        "description": "色香味俱全，藝術佳作"
      },
      "en-GB": {
        "title": "Creative Dish",
        "description": "Culinary art masterpiece"
      },
      "fr": {
        "title": "Plat Créatif",
        "description": "Chef-d'œuvre culinaire"
      },
      "ru": {
        "title": "Креативное Блюдо",
        "description": "Кулинарный шедевр"
      }
    }
  },
  {
    "id": 19,
    "category": "architecture",
    "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "现代建筑",
        "description": "线条简洁，光影交织"
      },
      "zh-TW": {
        "title": "現代建築",
        "description": "線條簡潔，光影交織"
      },
      "en-GB": {
        "title": "Modern Architecture",
        "description": "Clean lines, interwoven light"
      },
      "fr": {
        "title": "Architecture Moderne",
        "description": "Lignes épurées, lumière entrelacée"
      },
      "ru": {
        "title": "Современная Архитектура",
        "description": "Чистые линии, переплетённый свет"
      }
    }
  },
  {
    "id": 20,
    "category": "architecture",
    "image": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "古典韵味",
        "description": "历史沉淀，岁月痕迹"
      },
      "zh-TW": {
        "title": "古典韻味",
        "description": "歷史沉沉澱，歲月痕跡"
      },
      "en-GB": {
        "title": "Classical Charm",
        "description": "Historical depth, timeless beauty"
      },
      "fr": {
        "title": "Charme Classique",
        "description": "Profondeur historique, beauté intemporelle"
      },
      "ru": {
        "title": "Классическое Очарование",
        "description": "Историческая глубина, вечная красота"
      }
    }
  },
  {
    "id": 21,
    "category": "architecture",
    "image": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "城市轮廓",
        "description": "高楼林立，都市繁华"
      },
      "zh-TW": {
        "title": "城市輪廓",
        "description": "高樓林立，都市繁華"
      },
      "en-GB": {
        "title": "Urban Skyline",
        "description": "Towering buildings, city pulse"
      },
      "fr": {
        "title": "Horizon Urbain",
        "description": "Gratte-ciel, pouls de la ville"
      },
      "ru": {
        "title": "Городской Горизонт",
        "description": "Высотные здания, пульс города"
      }
    }
  },
  {
    "id": 22,
    "category": "architecture",
    "image": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "光影空间",
        "description": "建筑之美，光影之舞"
      },
      "zh-TW": {
        "title": "光影空間",
        "description": "建築之美，光影之舞"
      },
      "en-GB": {
        "title": "Light & Space",
        "description": "Architectural beauty, dancing light"
      },
      "fr": {
        "title": "Lumière & Espace",
        "description": "Beauté architecturale, lumière dansante"
      },
      "ru": {
        "title": "Свет и Пространство",
        "description": "Архитектурная красота, танцующий свет"
      }
    }
  },
  {
    "id": 23,
    "category": "street",
    "image": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "街头光影",
        "description": "光影交错，人间烟火"
      },
      "zh-TW": {
        "title": "街頭光影",
        "description": "光影交錯，人間煙火"
      },
      "en-GB": {
        "title": "Street Light",
        "description": "Light and shadow, daily life"
      },
      "fr": {
        "title": "Lumière de Rue",
        "description": "Ombres et lumières, vie quotidienne"
      },
      "ru": {
        "title": "Уличный Свет",
        "description": "Свет и тень, повседневная жизнь"
      }
    }
  },
  {
    "id": 24,
    "category": "street",
    "image": "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "都市节奏",
        "description": "人来人往，步履匆匆"
      },
      "zh-TW": {
        "title": "都市節奏",
        "description": "人來人往，步履匆匆"
      },
      "en-GB": {
        "title": "Urban Rhythm",
        "description": "Busy streets, hurried steps"
      },
      "fr": {
        "title": "Rythme Urbain",
        "description": "Rues animées, pas pressés"
      },
      "ru": {
        "title": "Городской Ритм",
        "description": "Оживлённые улицы, спешащие шаги"
      }
    }
  },
  {
    "id": 25,
    "category": "street",
    "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "夜色阑珊",
        "description": "霓虹闪烁，城市不眠"
      },
      "zh-TW": {
        "title": "夜色闌珊",
        "description": "霓虹閃爍，城市不眠"
      },
      "en-GB": {
        "title": "Night City",
        "description": "Neon glow, sleepless city"
      },
      "fr": {
        "title": "Ville Nocturne",
        "description": "Lueurs néon, ville insomniaque"
      },
      "ru": {
        "title": "Ночной Город",
        "description": "Неоновое свечение, бессонный город"
      }
    }
  },
  {
    "id": 26,
    "category": "street",
    "image": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "街角故事",
        "description": "平凡街角，生活百态"
      },
      "zh-TW": {
        "title": "街角故事",
        "description": "平凡街角，生活百態"
      },
      "en-GB": {
        "title": "Corner Stories",
        "description": "Ordinary corners, life stories"
      },
      "fr": {
        "title": "Histoires de Coin",
        "description": "Coins ordinaires, histoires de vie"
      },
      "ru": {
        "title": "Истории Уголков",
        "description": "Обычные углы, жизненные истории"
      }
    }
  },
  {
    "id": 27,
    "category": "nature",
    "image": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "雾中的湖",
        "description": "外来帧 · 水面把天空压成一层灰蓝"
      },
      "zh-TW": {
        "title": "霧中的湖",
        "description": "外來幀 · 水面把天空壓成一層灰藍"
      },
      "en-GB": {
        "title": "Lake in Mist",
        "description": "Guest frame · water flattens the sky to blue-grey"
      },
      "fr": {
        "title": "Lac dans la Brume",
        "description": "Cadre invité · l’eau aplatit le ciel en bleu-gris"
      },
      "ru": {
        "title": "Озеро в тумане",
        "description": "Гостевой кадр · вода сжимает небо в серо-синее"
      }
    }
  },
  {
    "id": 28,
    "category": "nature",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "雨后枝叶",
        "description": "外来帧 · 水珠把细节放大"
      },
      "zh-TW": {
        "title": "雨後枝葉",
        "description": "外來幀 · 水珠把細節放大"
      },
      "en-GB": {
        "title": "After Rain",
        "description": "Guest frame · droplets amplify detail"
      },
      "fr": {
        "title": "Après la Pluie",
        "description": "Cadre invité · les gouttes amplifient le détail"
      },
      "ru": {
        "title": "После дождя",
        "description": "Гостевой кадр · капли усиливают деталь"
      }
    }
  },
  {
    "id": 29,
    "category": "nature",
    "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    "copy": {
      "zh-CN": {
        "title": "金色麦浪",
        "description": "外来帧 · 侧光把纹理抬起来"
      },
      "zh-TW": {
        "title": "金色麥浪",
        "description": "外來幀 · 側光把紋理抬起來"
      },
      "en-GB": {
        "title": "Golden Field",
        "description": "Guest frame · side light lifts the texture"
      },
      "fr": {
        "title": "Champ Doré",
        "description": "Cadre invité · la lumière latérale relève la texture"
      },
      "ru": {
        "title": "Золотое поле",
        "description": "Гостевой кадр · боковой свет поднимает фактуру"
      }
    }
  }
];

export const gallerySourceUi: Record<
  Lang,
  {
    title: string;
    all: string;
    local: string;
    remote: string;
    localTag: string;
    remoteTag: string;
    note: string;
  }
> = {
  "zh-CN": {
    "title": "图片来源策略",
    "all": "全部来源",
    "local": "仅本站素材",
    "remote": "包含外部图源",
    "localTag": "本地",
    "remoteTag": "外部",
    "note": "优先展示本站自有素材；外部图源来自 Unsplash，仅作展示参考。"
  },
  "zh-TW": {
    "title": "圖片來源策略",
    "all": "全部來源",
    "local": "僅本站素材",
    "remote": "包含外部圖源",
    "localTag": "本地",
    "remoteTag": "外部",
    "note": "優先展示本站自有素材；外部圖源來自 Unsplash，僅作展示參考。"
  },
  "en-GB": {
    "title": "Image Source Policy",
    "all": "All sources",
    "local": "Local assets only",
    "remote": "Include external sources",
    "localTag": "Local",
    "remoteTag": "External",
    "note": "Local assets are prioritised; external images are from Unsplash for showcase reference."
  },
  "fr": {
    "title": "Politique des sources",
    "all": "Toutes les sources",
    "local": "Ressources locales",
    "remote": "Inclure sources externes",
    "localTag": "Local",
    "remoteTag": "Externe",
    "note": "Les ressources locales sont prioritaires ; les images externes proviennent d’Unsplash."
  },
  "ru": {
    "title": "Политика источников",
    "all": "Все источники",
    "local": "Только локальные",
    "remote": "Включая внешние",
    "localTag": "Локальные",
    "remoteTag": "Внешние",
    "note": "Локальные изображения в приоритете; внешние источники — Unsplash."
  }
};

export function getGalleryCategories(lang: Lang): GalleryCategory[] {
  return galleryCategories[lang] ?? galleryCategories['en-GB'];
}

export function getGalleryItems(lang: Lang) {
  return galleryItems.map((item) => ({
    id: item.id,
    category: item.category,
    image: item.image,
    title: item.copy[lang]?.title ?? item.copy['en-GB'].title,
    description: item.copy[lang]?.description ?? item.copy['en-GB'].description,
  }));
}

export function getGallerySourceUi(lang: Lang) {
  return gallerySourceUi[lang] ?? gallerySourceUi['en-GB'];
}
