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
  // Liste d'exemples — dis-moi tes vrais desserts et je remplace.
  {
    universe: "Desserts",
    category: "Pâtisseries",
    key: "patisseries",
    accent: "#A6683B",       // caramel
    accentSoft: "#EFDDCB",
    icon: "🍰",
    drinks: [
      { id: "tiramisu",        name: "Tiramisu",            emoji: "🍮", img: null },
      { id: "fondant-choco",   name: "Fondant au chocolat", emoji: "🍫", img: null },
      { id: "cheesecake",      name: "Cheesecake",          emoji: "🍰", img: null },
      { id: "macarons",        name: "Macarons",            emoji: "🌈", img: null },
    ],
  },
  {
    universe: "Desserts",
    category: "Glaces & fruits",
    key: "glaces",
    accent: "#C06A8E",       // framboise
    accentSoft: "#F0DCE5",
    icon: "🍨",
    drinks: [
      { id: "glace-vanille",   name: "Glace vanille",       emoji: "🍦", img: null },
      { id: "salade-fruits",   name: "Salade de fruits",    emoji: "🍓", img: null },
      { id: "cafe-gourmand",   name: "Café gourmand",       emoji: "☕", img: null },
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
