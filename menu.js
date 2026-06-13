// ============================================================
//  CARTE DES BOISSONS
// ============================================================
// Pour remplacer un emoji par TA photo de bouteille plus tard :
//   1. Mets la photo dans le dossier  img/  (ex: img/ricard.jpg)
//   2. Sur la boisson, ajoute  img: null
//   Exemple :  { id: "ricard", name: "Ricard", emoji: "🥃", img: null }
//   Tant qu'il n'y a pas d'img, l'emoji s'affiche. Rien d'autre à changer.
// ============================================================

window.MENU = [
  {
    universe: "Boissons",
    category: "Alcools forts & cocktails",
    key: "spirits",
    accent: "#9B5A2B",       // cognac
    accentSoft: "#EBD9C6",
    icon: "🥃",
    drinks: [
      { id: "chastel-banane",  name: "Chastel arrangé banane ananas flambée", emoji: "🍌", img: null },
      { id: "punch-coco",      name: "Punch Clément coco",                     emoji: "🥥", img: null },
      { id: "punch-mangue",    name: "Punch Clément mangue passion",           emoji: "🥭", img: null },
      { id: "gin-bombay",      name: "Gin Bombay",                             emoji: "🍸", img: null },
      { id: "ricard",          name: "Ricard",                                 emoji: "🥃", img: null },
      { id: "vodka",           name: "Vodka",                                  emoji: "🍸", img: null },
      { id: "baileys",         name: "Baileys",                                emoji: "🥛", img: null },
      { id: "diplomatico",     name: "Rhum Diplomatico",                       emoji: "🥃", img: null },
      { id: "jameson",         name: "Whisky Jameson",                         emoji: "🥃", img: null },
      { id: "aperol",          name: "Aperol Spritz",                          emoji: "🍹", img: null },
    ],
  },
  {
    universe: "Boissons",
    category: "Vins & bulles",
    key: "wine",
    accent: "#7E2B3D",       // bordeaux
    accentSoft: "#EAD2D7",
    icon: "🍷",
    drinks: [
      { id: "monbazillac",     name: "Monbazillac",            emoji: "🍷", img: null },
      { id: "lambrusco",       name: "Lambrusco Rosato",       emoji: "🥂", img: null },
      { id: "blanc-roses",     name: "Blanc Côte des Roses",   emoji: "🥂", img: null },
      { id: "rose-felse",      name: "Rosé Domaine de Felse",  emoji: "🌸", img: null },
      { id: "prosecco",        name: "Prosecco",               emoji: "🥂", img: null },
      { id: "rouge-rhone",     name: "Rouge Côtes du Rhône",   emoji: "🍷", img: null },
    ],
  },
  {
    universe: "Boissons",
    category: "Bières & cidre",
    key: "beer",
    accent: "#B58A1E",       // doré
    accentSoft: "#EEE2BE",
    icon: "🍺",
    drinks: [
      { id: "cidre",           name: "Cidre brut",              emoji: "🍏", img: null },
      { id: "heineken",        name: "Heineken",                emoji: "🍺", img: null },
      { id: "1664",            name: "1664 blanche",            emoji: "🍺", img: null },
      { id: "biere-yuzu",      name: "Bière citron yuzu",       emoji: "🍋", img: null },
      { id: "biere-framboise", name: "Bière framboise grenade", emoji: "🍓", img: null },
    ],
  },
  {
    universe: "Boissons",
    category: "Softs",
    key: "soft",
    accent: "#3E7C68",       // sauge
    accentSoft: "#D5E5DE",
    icon: "🥤",
    drinks: [
      { id: "coca-zero",       name: "Coca Zéro",              emoji: "🥤", img: null },
      { id: "pellegrino-peche",name: "San Pellegrino pêche",   emoji: "🍑", img: null },
      { id: "pellegrino-gren", name: "San Pellegrino grenade", emoji: "🔴", img: null },
      { id: "tourtel",         name: "Tourtel Twist citron",   emoji: "🍋", img: null },
      { id: "citronnade",      name: "Citronnade",             emoji: "🍋", img: null },
      { id: "limonade",        name: "Limonade",               emoji: "🥤", img: null },
      { id: "jus-banane",      name: "Jus de banane",          emoji: "🍌", img: null },
      { id: "jus-grenade",     name: "Jus de grenade",         emoji: "🔴", img: null },
      { id: "jus-pomme",       name: "Jus de pomme",           emoji: "🍎", img: null },
      { id: "jus-abricot",     name: "Jus d'abricot",          emoji: "🍑", img: null },
      { id: "jus-multi",       name: "Jus multivitaminé",      emoji: "🧃", img: null },
      { id: "eau-petillante",  name: "Eau pétillante",         emoji: "💧", img: null },
    ],
  },

  // ===========================  DESSERTS  ===========================
  {
    universe: "Desserts",
    category: "Boules de glace",
    key: "boules",
    accent: "#C06A8E",       // framboise
    accentSoft: "#F0DCE5",
    icon: "🍨",
    drinks: [
      { id: "boule-vanille",       name: "Boule vanille",            emoji: "🍦", img: null },
      { id: "boule-speculoos",     name: "Boule spéculoos",          emoji: "🍪", img: null },
      { id: "boule-stracciatella", name: "Boule stracciatella",      emoji: "🍫", img: null },
      { id: "boule-coco",          name: "Boule coco",               emoji: "🥥", img: null },
      { id: "boule-chocolat",      name: "Boule chocolat",           emoji: "🍫", img: null },
      { id: "boule-cookie",        name: "Boule cookie",             emoji: "🍪", img: null },
      { id: "boule-menthe-choco",  name: "Boule menthe / chocolat",  emoji: "🌿", img: null },
      { id: "boule-citron",        name: "Boule citron",             emoji: "🍋", img: null },
    ],
  },
  {
    universe: "Desserts",
    category: "Bâtonnets & glacés",
    key: "batonnets",
    accent: "#A6683B",       // caramel
    accentSoft: "#EFDDCB",
    icon: "🍫",
    drinks: [
      { id: "mini-magnum-classic", name: "Mini Magnum Classic",       emoji: "🍫", img: null },
      { id: "mini-magnum-blanc",   name: "Mini Magnum chocolat blanc",emoji: "🤍", img: null },
      { id: "mystere",             name: "Mystère",                   emoji: "🍦", img: null },
      { id: "snickers-glace",      name: "Snickers glacé",            emoji: "🥜", img: null },
    ],
  },
  {
    universe: "Desserts",
    category: "Fruits givrés",
    key: "givres",
    accent: "#4E8C9A",       // givré
    accentSoft: "#D9EAEE",
    icon: "🧊",
    drinks: [
      { id: "coco-givre",   name: "Coco givré",   emoji: "🥥", img: null },
      { id: "orange-givre", name: "Orange givré", emoji: "🍊", img: null },
      { id: "citron-givre", name: "Citron givré", emoji: "🍋", img: null },
    ],
  },
  {
    universe: "Desserts",
    category: "Toppings",
    key: "toppings",
    accent: "#B58A4A",       // doré
    accentSoft: "#ECE0C8",
    icon: "✨",
    drinks: [
      { id: "top-chantilly",        name: "Chantilly",          emoji: "🍦", img: null },
      { id: "top-caramel",          name: "Nappage caramel",    emoji: "🍯", img: null },
      { id: "top-chocolat",         name: "Nappage chocolat",   emoji: "🍫", img: null },
      { id: "top-cookies-cream",    name: "Cookies cream",      emoji: "🍪", img: null },
      { id: "top-sable-chocolat",   name: "Sablé chocolat",     emoji: "🍪", img: null },
      { id: "top-gaufrette-vanille",name: "Gaufrette vanille",  emoji: "🧇", img: null },
      { id: "top-mini-oreo",        name: "Mini Oréo",          emoji: "⚫", img: null },
      { id: "top-cookie-granola",   name: "Mini cookie granola",emoji: "🍪", img: null },
      { id: "top-gavottes",         name: "Gavottes",           emoji: "🥠", img: null },
      { id: "top-kitkat",           name: "KitKat",             emoji: "🍫", img: null },
    ],
  },
];

// Index pratique : id -> { drink, category, accent, icon }
window.MENU_INDEX = (function () {
  const idx = {};
  window.MENU.forEach((cat) => {
    cat.drinks.forEach((d) => {
      idx[d.id] = { ...d, category: cat.category, accent: cat.accent, accentSoft: cat.accentSoft, catIcon: cat.icon };
    });
  });
  return idx;
})();
