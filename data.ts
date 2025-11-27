import { MenuItem, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', nameFr: 'Tout', nameAr: 'الكل', icon: 'Utensils', image: '/images/1.png' },
  { id: 'appetizers', nameFr: 'Entrées et Salades', nameAr: 'مقبلات و سلطات', icon: 'Salad', image: '/images/10.png' },
  { id: 'grills', nameFr: 'Grillades', nameAr: 'مشاوي', icon: 'Drumstick', image: '/images/22.png' },
  { id: 'rice', nameFr: 'Riz & Fatta', nameAr: 'أرز وفتة', icon: 'Utensils', image: '/images/35.png' },
  { id: 'pizza', nameFr: 'Pizzas', nameAr: 'بيتزا', icon: 'Pizza', image: '/images/43.png' },
  { id: 'sandwiches', nameFr: 'Sandwichs', nameAr: 'سندويشات', icon: 'Sandwich', image: '/images/54.png' },
  { id: 'pastries', nameFr: 'Pâtisseries', nameAr: 'معجنات', icon: 'Scroll', image: '/images/73.png' },
  { id: 'desserts', nameFr: 'Desserts', nameAr: 'حلويات', icon: 'IceCream', image: '/images/82.png' },
  { id: 'drinks', nameFr: 'Boissons', nameAr: 'مشروبات', icon: 'CupSoda', image: '/images/89.png' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- Entrées et Salades (Appetizers) ---
  {
    id: '1',
    category: 'appetizers',
    nameFr: 'Pommes de terre (Frites)',
    nameAr: 'بطاطا مقلية',
    price: 150,
    image: '/images/1.png'
  },
  {
    id: '2',
    category: 'appetizers',
    nameFr: 'Baba Ghanoush',
    nameAr: 'بابا غنوج',
    price: 100,
    image: '/images/2.png'
  },
  {
    id: '3',
    category: 'appetizers',
    nameFr: 'Batata Harra (Pommes de terre épicées)',
    nameAr: 'بطاطا حرة',
    price: 200,
    image: '/images/3.png'
  },
  {
    id: '4',
    category: 'appetizers',
    nameFr: 'Yalangi (Feuilles de vigne)',
    nameAr: 'يالنجي',
    price: 200,
    image: '/images/4.png'
  },
  {
    id: '5',
    category: 'appetizers',
    nameFr: 'Chou-fleur frit',
    nameAr: 'زهرة مقلية',
    price: 200,
    image: '/images/5.png'
  },
  {
    id: '6',
    category: 'appetizers',
    nameFr: 'Frites épicées',
    nameAr: 'بطاطا حرة',
    price: 200,
    image: '/images/6.png'
  },
  {
    id: '7',
    category: 'appetizers',
    nameFr: 'Houmous à l\'huile',
    nameAr: 'حمص بالزيت',
    price: 100,
    image: '/images/7.png'
  },
  {
    id: '8',
    category: 'appetizers',
    nameFr: 'Houmous Viande',
    nameAr: 'حمص باللحمة',
    price: 250,
    image: '/images/8.png'
  },
  {
    id: '9',
    category: 'appetizers',
    nameFr: 'Ras Asfour',
    nameAr: 'راس عصفور',
    price: 200,
    image: '/images/9.png'
  },
  {
    id: '10',
    category: 'appetizers',
    nameFr: 'Salade Thon',
    nameAr: 'سلطة تونة',
    price: 200,
    image: '/images/10.png'
  },
  {
    id: '11',
    category: 'appetizers',
    nameFr: 'Salade Poulet',
    nameAr: 'سلطة دجاج',
    price: 200,
    image: '/images/11.png'
  },
  {
    id: '12',
    category: 'appetizers',
    nameFr: 'Salade Arabe',
    nameAr: 'سلطة عربية',
    price: 150,
    image: '/images/12.png'
  },
  {
    id: '13',
    category: 'appetizers',
    nameFr: 'Fattouche',
    nameAr: 'فتوش',
    price: 200,
    image: '/images/13.png'
  },
  {
    id: '14',
    category: 'appetizers',
    nameFr: 'Falafel (Assiette)',
    nameAr: 'صحن فلافل',
    price: 100,
    image: '/images/14.png'
  },
  {
    id: '15',
    category: 'appetizers',
    nameFr: 'Salade Feta',
    nameAr: 'سلطة فيتا',
    price: 200,
    image: '/images/15.png'
  },
  {
    id: '16',
    category: 'appetizers',
    nameFr: 'Kebbe Grillée',
    nameAr: 'كبة مشوية',
    price: 80,
    image: '/images/16.png'
  },
  {
    id: '17',
    category: 'appetizers',
    nameFr: 'Kebbe Frit (1pc)',
    nameAr: 'كبة مقلية',
    price: 80,
    image: '/images/17.png'
  },
  {
    id: '18',
    category: 'appetizers',
    nameFr: 'Labana (Labneh)',
    nameAr: 'لبنة',
    price: 100,
    image: '/images/18.png'
  },
  {
    id: '19',
    category: 'appetizers',
    nameFr: 'Moutabal / Aubergine',
    nameAr: 'متبل باذنجان',
    price: 100,
    image: '/images/19.png'
  },
  {
    id: '20',
    category: 'appetizers',
    nameFr: 'Muhammara',
    nameAr: 'محمرة',
    price: 200,
    image: '/images/20.png'
  },

  // --- Plats Principaux & Grillades (Grills) ---
  {
    id: '21',
    category: 'grills',
    nameFr: 'Box Shawarma Arabe (Poulet/Viande)',
    nameAr: 'بوكس شاورما عربي (دجاج/لحم)',
    price: 500,
    image: '/images/21.png'
  },
  {
    id: '22',
    category: 'grills',
    nameFr: 'Poulet Grillé (Demi)',
    nameAr: 'دجاج مشوي (نص)',
    price: 400,
    image: '/images/22.png'
  },
  {
    id: '23',
    category: 'grills',
    nameFr: 'Shawarma de Viande (Assiette)',
    nameAr: 'صحن شاورما لحم',
    price: 500,
    image: '/images/23.png'
  },
  {
    id: '24',
    category: 'grills',
    nameFr: 'Kebab Poulet (Plat)',
    nameAr: 'كباب دجاج',
    price: 500,
    image: '/images/24.png'
  },
  {
    id: '25',
    category: 'grills',
    nameFr: 'Kebab Viande (Plat)',
    nameAr: 'كباب لحم',
    price: 500,
    image: '/images/25.png'
  },
  {
    id: '26',
    category: 'grills',
    nameFr: 'Grillade Mixte (1kg)',
    nameAr: 'مشاوي مشكل (كيلو)',
    price: 1000,
    image: '/images/26.png'
  },
  {
    id: '27',
    category: 'grills',
    nameFr: 'Poulet au charbon à la syrienne',
    nameAr: 'دجاج مشوي على الفحم سوري',
    price: 700,
    image: '/images/27.png'
  },
  {
    id: '28',
    category: 'grills',
    nameFr: 'Grillade Mixte (4 personnes)',
    nameAr: 'مشاوي مشكل (4 أشخاص)',
    price: 2000,
    image: '/images/28.png'
  },
  {
    id: '29',
    category: 'grills',
    nameFr: 'Brochettes Mixte (4 personnes)',
    nameAr: 'مشاوي مشكلة (4 أشخاص)',
    price: 1400,
    image: '/images/29.png'
  },
  {
    id: '30',
    category: 'grills',
    nameFr: 'Brochettes Poulet (Plat)',
    nameAr: 'بروشيت دجاج',
    price: 150,
    image: '/images/30.png'
  },
  {
    id: '31',
    category: 'grills',
    nameFr: 'Toshka Poulet',
    nameAr: 'طوشكا دجاج',
    price: 150,
    image: '/images/31.png'
  },
  {
    id: '32',
    category: 'grills',
    nameFr: 'Toshka Viande',
    nameAr: 'طوشكا لحم',
    price: 150,
    image: '/images/32.png'
  },
  {
    id: '33',
    category: 'grills',
    nameFr: 'Broasted (5 pcs)',
    nameAr: 'بروستد 5 قطع',
    price: 300,
    image: '/images/33.png'
  },

  // --- Riz et Fatta (Rice) ---
  {
    id: '34',
    category: 'rice',
    nameFr: 'Une demi-poule avec Riz',
    nameAr: 'نصف دجاجة مع رز',
    price: 350,
    image: '/images/34.png'
  },
  {
    id: '35',
    category: 'rice',
    nameFr: 'Shawarma de viande (Plat)',
    nameAr: 'شاورما لحم',
    price: 300,
    image: '/images/35.png'
  },
  {
    id: '36',
    category: 'rice',
    nameFr: 'Shawarma Poulet avec Riz',
    nameAr: 'شاورما دجاج مع رز',
    price: 150,
    image: '/images/36.png'
  },
  {
    id: '37',
    category: 'rice',
    nameFr: 'Fata Shawarma Poulet',
    nameAr: 'فتة شاورما دجاج',
    price: 150,
    image: '/images/37.png'
  },
  {
    id: '38',
    category: 'rice',
    nameFr: 'Fata Shawarma Viande',
    nameAr: 'فتة شاورما لحم',
    price: 200,
    image: '/images/38.png'
  },
  {
    id: '39',
    category: 'rice',
    nameFr: 'Crispy avec Riz',
    nameAr: 'كريسبي مع رز',
    price: 150,
    image: '/images/39.png'
  },
  {
    id: '40',
    category: 'rice',
    nameFr: 'Shawarma Viande avec Riz',
    nameAr: 'شاورما لحم مع رز',
    price: 200,
    image: '/images/40.png'
  },

  // --- Pizzas ---
  {
    id: '41',
    category: 'pizza',
    nameFr: 'Pizza Pepperoni',
    nameAr: 'بيتزا بيروني',
    price: 250,
    image: '/images/41.png'
  },
  {
    id: '42',
    category: 'pizza',
    nameFr: 'Pizza Thon',
    nameAr: 'بيتزا تون',
    price: 200,
    image: '/images/42.png'
  },
  {
    id: '43',
    category: 'pizza',
    nameFr: 'Pizza Légume',
    nameAr: 'بيتزا خضار',
    price: 200,
    image: '/images/43.png'
  },
  {
    id: '44',
    category: 'pizza',
    nameFr: 'Pizza Poulet',
    nameAr: 'بيتزا دجاج',
    price: 200,
    image: '/images/44.png'
  },
  {
    id: '45',
    category: 'pizza',
    nameFr: 'Pizza Shawarma Viande',
    nameAr: 'بيتزا شاورما لحم',
    price: 250,
    image: '/images/45.png'
  },
  {
    id: '46',
    category: 'pizza',
    nameFr: 'Pizza Shish Taouk',
    nameAr: 'بيتزا شيش طاووق',
    price: 250,
    image: '/images/46.png'
  },
  {
    id: '47',
    category: 'pizza',
    nameFr: 'Pizza Crevette',
    nameAr: 'بيتزا كرافت (روبيان)',
    price: 350,
    image: '/images/47.png'
  },
  {
    id: '48',
    category: 'pizza',
    nameFr: 'Pizza Crispy',
    nameAr: 'بيتزا كريسبي',
    price: 250,
    image: '/images/48.png'
  },
  {
    id: '49',
    category: 'pizza',
    nameFr: 'Pizza Viande Hachée',
    nameAr: 'بيتزا لحم مفروم',
    price: 200,
    image: '/images/49.png'
  },
  {
    id: '50',
    category: 'pizza',
    nameFr: 'Pizza Shawarma Poulet',
    nameAr: 'بيتزا شاورما دجاج',
    price: 250,
    image: '/images/50.png'
  },
  {
    id: '51',
    category: 'pizza',
    nameFr: 'Pizza Margherita',
    nameAr: 'بيتزا مارغريتا',
    price: 200,
    image: '/images/51.png'
  },
  {
    id: '52',
    category: 'pizza',
    nameFr: 'Tarte (Viande/Poulet)',
    nameAr: 'فطيرة (لحم/دجاج)',
    price: 150,
    image: '/images/52.png'
  },

  // --- Sandwichs, Burgers & Tacos ---
  {
    id: '53',
    category: 'sandwiches',
    nameFr: 'Sandwich Brochettes Poulet',
    nameAr: 'ساندوتش بروشيت دجاج',
    price: 100,
    image: '/images/53.png'
  },
  {
    id: '54',
    category: 'sandwiches',
    nameFr: 'Sandwich Poulet Grillé',
    nameAr: 'ساندوتش دجاج مشوي',
    price: 100,
    image: '/images/54.png'
  },
  {
    id: '55',
    category: 'sandwiches',
    nameFr: 'Sandwich Shawarma Poulet',
    nameAr: 'شاورما دجاج',
    price: 100,
    image: '/images/55.png'
  },
  {
    id: '56',
    category: 'sandwiches',
    nameFr: 'Sandwich Shawarma Viande',
    nameAr: 'شاورما لحم',
    price: 100,
    image: '/images/56.png'
  },
  {
    id: '57',
    category: 'sandwiches',
    nameFr: 'Sandwich Kebab Poulet',
    nameAr: 'كباب دجاج',
    price: 100,
    image: '/images/57.png'
  },
  {
    id: '58',
    category: 'sandwiches',
    nameFr: 'Sandwich Kebab Viande',
    nameAr: 'كباب لحم',
    price: 100,
    image: '/images/58.png'
  },
  {
    id: '59',
    category: 'sandwiches',
    nameFr: 'Sandwich Falafel',
    nameAr: 'ساندوتش فلافل',
    price: 100,
    image: '/images/59.png'
  },
  {
    id: '60',
    category: 'sandwiches',
    nameFr: 'Sandwich Crispy',
    nameAr: 'ساندوتش كريسبي',
    price: 200,
    image: '/images/60.png'
  },
  {
    id: '61',
    category: 'sandwiches',
    nameFr: 'Sandwich Fahita',
    nameAr: 'ساندوتش فاهيتا',
    price: 200,
    image: '/images/61.png'
  },
  {
    id: '62',
    category: 'sandwiches',
    nameFr: 'Sandwich au Saucisse',
    nameAr: 'ساندوتش سجق',
    price: 200,
    image: '/images/62.png'
  },
  {
    id: '63',
    category: 'sandwiches',
    nameFr: 'Sandwich Steak (Poulet/Viande)',
    nameAr: 'ساندوتش ستيك (دجاج او لحم)',
    price: 200,
    image: '/images/63.png'
  },
  {
    id: '64',
    category: 'sandwiches',
    nameFr: 'Sandwich Syrien au poulet',
    nameAr: 'ساندوتش سوري دجاج',
    price: 150,
    image: '/images/64.png'
  },
  {
    id: '65',
    category: 'sandwiches',
    nameFr: 'Burger Viande',
    nameAr: 'برجر لحم',
    price: 150,
    image: '/images/65.png'
  },
  {
    id: '66',
    category: 'sandwiches',
    nameFr: 'Burger Fromage',
    nameAr: 'تشيز برجر',
    price: 200,
    image: '/images/66.png'
  },
  {
    id: '67',
    category: 'sandwiches',
    nameFr: 'Burger Poulet',
    nameAr: 'برجر دجاج',
    price: 150,
    image: '/images/67.png'
  },
  {
    id: '68',
    category: 'sandwiches',
    nameFr: 'Burger Crispy',
    nameAr: 'برجر كريسبي',
    price: 200,
    image: '/images/68.png'
  },
  {
    id: '69',
    category: 'sandwiches',
    nameFr: 'Tacos Crispy',
    nameAr: 'تاكوس كريسبي',
    price: 200,
    image: '/images/69.png'
  },
  {
    id: '70',
    category: 'sandwiches',
    nameFr: 'Tacos Viande',
    nameAr: 'تاكوس لحم',
    price: 150,
    image: '/images/70.png'
  },
  {
    id: '71',
    category: 'sandwiches',
    nameFr: 'Tacos au Poulet',
    nameAr: 'تاكوس دجاج',
    price: 150,
    image: '/images/71.png'
  },

  // --- Pâtisseries & Pâtes (Pastries) ---
  {
    id: '72',
    category: 'pastries',
    nameFr: 'Sambousek Sapanikh (Épinards)',
    nameAr: 'سمبوسك سبانخ',
    price: 50,
    image: '/images/72.png'
  },
  {
    id: '73',
    category: 'pastries',
    nameFr: 'Nid du Rossignol',
    nameAr: 'عش البلبل',
    price: 80,
    image: '/images/73.png'
  },
  {
    id: '74',
    category: 'pastries',
    nameFr: 'Rouleaux Fromage',
    nameAr: 'رولات جبنة',
    price: 50,
    image: '/images/74.png'
  },
  {
    id: '75',
    category: 'pastries',
    nameFr: 'Fatayer Viande / Fromage',
    nameAr: 'فطائر لحم / جبنة',
    price: 50,
    image: '/images/75.png'
  },
  {
    id: '76',
    category: 'pastries',
    nameFr: 'Bourak Viande',
    nameAr: 'بوراك لحم',
    price: 50,
    image: '/images/76.png'
  },
  {
    id: '77',
    category: 'pastries',
    nameFr: 'Sambousek Viande',
    nameAr: 'سمبوسك لحم',
    price: 50,
    image: '/images/77.png'
  },
  {
    id: '78',
    category: 'pastries',
    nameFr: 'Fettuccine',
    nameAr: 'فيتوتشيني',
    price: 300,
    image: '/images/78.png'
  },
  {
    id: '79',
    category: 'pastries',
    nameFr: 'Pâtes Bolognaises',
    nameAr: 'معكرونة بولونيز',
    price: 300,
    image: '/images/79.png'
  },
  {
    id: '80',
    category: 'pastries',
    nameFr: 'Salade de Pâtes',
    nameAr: 'سلطة معكرونة',
    price: 300,
    image: '/images/80.png'
  },

  // --- Desserts ---
  {
    id: '81',
    category: 'desserts',
    nameFr: 'Salade de Fruits',
    nameAr: 'سلطة فواكه',
    price: 100,
    image: '/images/81.png'
  },
  {
    id: '82',
    category: 'desserts',
    nameFr: 'Copher (Gaufre)',
    nameAr: 'غوفر',
    price: 150,
    image: '/images/82.png'
  },
  {
    id: '83',
    category: 'desserts',
    nameFr: 'Kashtota',
    nameAr: 'قشطوطة',
    price: 150,
    image: '/images/83.png'
  },
  {
    id: '84',
    category: 'desserts',
    nameFr: 'Crêpe Chocolat',
    nameAr: 'كريب شوكولا',
    price: 150,
    image: '/images/84.png'
  },
  {
    id: '85',
    category: 'desserts',
    nameFr: 'Crêpe Loutas',
    nameAr: 'كريب لوتس',
    price: 150,
    image: '/images/85.png'
  },
  {
    id: '86',
    category: 'desserts',
    nameFr: 'Kunafa',
    nameAr: 'كنافة',
    price: 150,
    image: '/images/86.png'
  },
  {
    id: '87',
    category: 'desserts',
    nameFr: 'Riz au Lait / Mahalayya',
    nameAr: 'رز بحليب / مهلبية',
    price: 100,
    image: '/images/87.png'
  },

  // --- Boissons (Drinks) ---
  {
    id: '88',
    category: 'drinks',
    nameFr: 'Espresso / Café',
    nameAr: 'اسبريسو',
    price: 100,
    image: '/images/88.png'
  },
  {
    id: '89',
    category: 'drinks',
    nameFr: 'Cappuccino',
    nameAr: 'كابتشينو',
    price: 150,
    image: '/images/89.png'
  },
  {
    id: '90',
    category: 'drinks',
    nameFr: 'Cocktails',
    nameAr: 'كوكتيل',
    price: 100,
    image: '/images/90.png'
  },
  {
    id: '91',
    category: 'drinks',
    nameFr: 'Mojito',
    nameAr: 'موهيتو',
    price: 100,
    image: '/images/91.png'
  },
  {
    id: '92',
    category: 'drinks',
    nameFr: 'Milkshake',
    nameAr: 'ميلك شيك',
    price: 100,
    image: '/images/92.png'
  },
  {
    id: '93',
    category: 'drinks',
    nameFr: 'Boissons Gazeuses',
    nameAr: 'مشروبات غازية',
    price: 50,
    image: '/images/93.png'
  }
];