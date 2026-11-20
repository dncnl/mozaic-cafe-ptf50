import type { MenuItem } from "../types";

/**
 * Attribute tags for every menu item — the matcher's knowledge of the menu.
 *
 * ⚠ OWNER REVIEW REQUIRED. These are a DRAFT, derived only from each item's
 * name, group, and published description (lib/mockData.ts) — nothing was
 * looked up or guessed from photos. Anything not stated on the menu is marked
 * `maybe` instead of asserted. Before the app is shown to customers, walk the
 * owner through this file (it doubles as client-engagement evidence for the
 * PTF50 report) and flip OWNER_REVIEWED to true. Allergen / pork / alcohol
 * tags especially must be confirmed: a wrong "no pork" answer is worse than
 * no answer.
 *
 * `tags`  — stated or unambiguous from the name ("Pork Katsu" → pork).
 * `maybe` — plausible but unconfirmed (a "loaded" pizza may have pork). The
 *           matcher treats a `maybe` tag as present when EXCLUDING ("no pork"
 *           also hides maybe-pork items) and absent when MATCHING — the safe
 *           direction both ways.
 */
export const OWNER_REVIEWED = false;

export interface ItemProfile {
  tags: string[];
  maybe: string[];
}

/** Defaults per menu group; items add to these. */
const GROUP_TAGS: Record<string, string[]> = {
  // cafe
  Coffee: ["drink", "coffee", "caffeine", "milk"],
  Matcha: ["drink", "matcha", "caffeine", "milk", "sweet"],
  "Moz Signatures": ["drink", "coffee", "caffeine", "sweet", "creamy", "signature"],
  Spritz: ["drink", "fruity", "refreshing", "sparkling", "cold", "non-alcoholic"],
  Milk: ["drink", "milk", "sweet", "creamy", "non-coffee"],
  Frappe: ["drink", "blended", "cold", "sweet", "creamy"],
  "Add-ons": ["add-on"],
  // kitchen
  Appetizer: ["food", "snack", "shareable"],
  Mains: ["food", "main", "hearty"],
  "Mozaic Samplers": ["food", "shareable", "platter", "hearty", "group"],
  Chicken: ["food", "chicken", "fried", "shareable", "snack"],
  Burger: ["food", "burger", "hearty", "fries"],
  Salad: ["food", "salad", "light", "veggie", "fresh"],
  Sides: ["food", "side"],
  Pasta: ["food", "pasta", "main"],
  Pizza: ["food", "pizza", "cheesy", "shareable", "main"],
  "Rice Meals": ["food", "rice", "main", "filling"],
  "Other Beverages": ["drink", "non-alcoholic", "cold"],
  // bar
  Beers: ["drink", "alcohol", "beer", "cold"],
  "Hard-Liquor": ["drink", "alcohol", "spirits", "bottle"],
  "Moz Cocktails": ["drink", "alcohol", "cocktail"],
};

/** Per-item additions. Only what the name or description actually says. */
const ITEM_TAGS: Record<string, { add?: string[]; maybe?: string[] }> = {
  // --- cafe: coffee
  "cafe-americano": { add: ["black", "bitter", "strong"] },
  "cafe-latte": { add: ["creamy"] },
  "cafe-vanilla-latte": { add: ["sweet", "vanilla", "creamy"] },
  "cafe-white-mocha": { add: ["sweet", "chocolate", "creamy"] },
  "cafe-caramel-latte": { add: ["sweet", "caramel", "creamy"] },
  "cafe-spanish-latte": { add: ["sweet", "creamy"] },
  // --- cafe: matcha
  "cafe-pink-cloud-matcha": { maybe: ["fruity", "strawberry"] },
  "cafe-matcha-oat-latte": { add: ["oat-milk"], maybe: ["dairy-free"] },
  "cafe-matcha-dalgona": { add: ["creamy"] },
  // --- cafe: signatures
  "cafe-cloud-espresso": { add: ["strong"] },
  "cafe-dirty-biscoff": { add: ["biscoff", "cookie"] },
  "cafe-dirty-nutella": { add: ["nutella", "chocolate", "hazelnut"] },
  "cafe-seasalt-latte": { add: ["salty-sweet", "milk"] },
  "cafe-tiramisu": { add: ["dessert"] },
  "cafe-dalgona": { add: ["milk"] },
  // --- cafe: spritz (names only — flavours not published)
  "cafe-zesty-blossom": { add: ["citrus"] },
  "cafe-verdant-splash": { maybe: ["green-apple"] },
  "cafe-curapple-spark": { add: ["apple"] },
  // --- cafe: milk
  "cafe-milk-strawberry": { add: ["strawberry", "fruity"] },
  "cafe-milk-mango": { add: ["mango", "fruity"] },
  "cafe-milk-kiwi": { add: ["kiwi", "fruity"] },
  "cafe-milky-biscoff": { add: ["biscoff", "cookie"] },
  "cafe-milky-nutella": { add: ["nutella", "chocolate", "hazelnut"] },
  // --- cafe: frappe
  "cafe-mocha-frappe": { add: ["coffee", "caffeine", "chocolate"] },
  "cafe-caramel-frappe": { add: ["caramel"], maybe: ["coffee", "caffeine"] },
  "cafe-hershey-cream": { add: ["chocolate", "non-coffee"] },
  "cafe-strawberries-cream": { add: ["strawberry", "fruity", "non-coffee"] },
  "cafe-oreo-cream": { add: ["cookie", "non-coffee"] },

  // --- kitchen: appetizers
  "kitchen-catch-and-crunch": { add: ["fish", "seafood", "fried", "fries", "crispy"] },
  "kitchen-cheesy-beefadilla": { add: ["beef", "cheesy"] },
  "kitchen-moz-nacho": { add: ["cheesy", "hotdog"], maybe: ["pork"] },
  "kitchen-fries-galore": { add: ["fries", "fried", "crispy"], maybe: ["vegetarian"] },
  "kitchen-chili-cheddar-galore": { add: ["fries", "fried", "cheesy"], maybe: ["beef", "spicy"] },
  // --- kitchen: mains
  "kitchen-beefy-salpicao": { add: ["beef", "savory", "filipino"] },
  "kitchen-belly-fusion-salad": { add: ["pork", "grilled", "salad", "veggie"] },
  "kitchen-tomato-braised-beef-stew": { add: ["beef", "stew", "saucy", "comfort"] },
  "kitchen-parm-crusted-chicken": { add: ["chicken", "grilled", "cheesy"] },
  // --- kitchen: samplers
  "kitchen-snack-platter-fiesta": { add: ["snack"], maybe: ["pork", "fried"] },
  "kitchen-moz-rib-feast": { add: ["ribs", "fries", "pasta"], maybe: ["pork", "beef"] },
  "kitchen-steak-it-up-board": { add: ["beef", "steak", "fries", "pasta"], maybe: ["pork"] },
  // --- kitchen: chicken (sauces are a choice of one)
  "kitchen-wings": { add: ["wings", "saucy"], maybe: ["spicy"] },
  "kitchen-boneless": { add: ["boneless", "saucy"], maybe: ["spicy"] },
  // --- kitchen: burgers
  "kitchen-cheese-bliss-burger": { add: ["beef", "cheesy"] },
  "kitchen-crispy-chick-n-delight": { add: ["chicken", "fried", "crispy"] },
  // --- kitchen: salads
  "kitchen-vinaigrette-berry-bliss": { add: ["fruity"], maybe: ["vegetarian"] },
  "kitchen-caesar-garden": { add: ["chicken", "cheesy"] },
  // --- kitchen: sides
  "kitchen-mozaic-rice-fusion": { add: ["rice", "fried-rice", "savory"], maybe: ["pork"] },
  "kitchen-rice": { add: ["rice", "plain", "staple"] },
  // --- kitchen: pasta
  "kitchen-zesty-chicken-florentine": { add: ["chicken", "creamy", "spinach"] },
  "kitchen-ocean-aglio-e-olio": { add: ["seafood", "garlic"] },
  "kitchen-red-tide-marinara": { add: ["seafood", "tomato", "saucy"] },
  "kitchen-pesto-chicken-perfection": { add: ["chicken", "pesto", "grilled"] },
  "kitchen-stroganoff-twist": { add: ["beef", "creamy", "saucy"] },
  // --- kitchen: pizza
  "kitchen-mozaic-beast": { add: ["loaded", "hearty"], maybe: ["pork", "beef"] },
  "kitchen-quattro-formaggio": { maybe: ["vegetarian"] },
  "kitchen-moz-deep-za": { add: ["seafood"] },
  "kitchen-creamy-pesto-delight": { add: ["chicken", "pesto", "creamy"] },
  // --- kitchen: rice meals
  "kitchen-katsu-crunch": { add: ["chicken", "fried", "crispy", "japanese"] },
  "kitchen-pork-katsu-crunch": { add: ["pork", "fried", "crispy", "japanese"] },
  "kitchen-teriyaki-bliss": { add: ["chicken", "sweet", "saucy", "japanese"] },
  "kitchen-hickory-glazed-pork-ribs": { add: ["pork", "ribs", "smoky", "bbq"] },
  "kitchen-tender-roast-beef": { add: ["beef", "savory", "saucy"] },
  "kitchen-ribeye-steak": { add: ["beef", "steak", "veggie"] },
  "kitchen-boneless-inasal-grill": { add: ["chicken", "grilled", "filipino", "tangy"] },
  "kitchen-grilled-pork-belly": { add: ["pork", "grilled", "filipino", "tangy"] },
  // --- kitchen: beverages
  "kitchen-coke-coke-zero": { add: ["soda", "caffeine", "canned"] },
  "kitchen-sprite-royal": { add: ["soda", "sparkling", "canned"] },
  "kitchen-redbull": { add: ["energy-drink", "caffeine", "canned"] },
  "kitchen-mineral-water": { add: ["water", "plain", "staple"] },
  "kitchen-pineapple-juice": { add: ["juice", "fruity"] },
  "kitchen-mango-juice": { add: ["juice", "fruity", "mango"] },

  // --- bar
  "bar-san-mig-apple": { add: ["fruity", "apple"] },
  "bar-smirnoff": { add: ["vodka"] },
  "bar-jose-cuervo-gold": { add: ["tequila", "shots"] },
  "bar-absolut": { add: ["vodka", "shots"] },
  "bar-jagermeister": { add: ["shots"] },
  "bar-jack-daniels": { add: ["whiskey", "shots"] },
  "bar-jagerbomb": { add: ["energy-drink", "shots"] },
  "bar-daiquiri": { add: ["rum", "citrus", "sweet"] },
  "bar-blue-lagoon": { add: ["vodka", "citrus", "blue"] },
  "bar-long-island": { add: ["strong", "vodka", "rum", "tequila"] },
  "bar-margarita": { add: ["tequila", "citrus", "sour"] },
  "bar-tequila-sunrise": { add: ["tequila", "fruity", "sweet"] },
  "bar-amaretto-sour": { add: ["sour", "egg"] },
  "bar-blue-apple-bolt": { add: ["rum", "apple", "fruity", "blue"] },
  "bar-sour-grape-glow": { add: ["vodka", "sour", "fruity"] },
};

export function profileFor(item: MenuItem): ItemProfile {
  const base = GROUP_TAGS[item.group ?? ""] ?? [];
  const extra = ITEM_TAGS[item.id] ?? {};
  const tags = [...new Set([...base, ...(extra.add ?? [])])];
  const maybe = (extra.maybe ?? []).filter((t) => !tags.includes(t));
  return { tags, maybe };
}

/**
 * Short phrases appended to each item's text before embedding, so the model
 * has something to read for items whose published description is empty
 * (most of the cafe menu). One phrase per tag that carries meaning.
 */
export const TAG_PHRASES: Record<string, string> = {
  coffee: "coffee espresso drink",
  matcha: "matcha green tea",
  milk: "made with milk",
  "non-coffee": "no coffee",
  sweet: "sweet treat",
  creamy: "creamy and rich",
  chocolate: "chocolate",
  caramel: "caramel",
  fruity: "fruity",
  refreshing: "light and refreshing",
  sparkling: "sparkling fizzy",
  cold: "served cold, iced and chilled",
  blended: "blended frappe with ice",
  dessert: "dessert-like",
  cookie: "cookies and cream",
  strong: "strong and bold",
  bitter: "black and bitter",
  snack: "snack to munch on",
  shareable: "good for sharing with a group of friends, pulutan",
  platter: "big sampler platter",
  group: "for a group or barkada",
  hearty: "hearty and filling",
  filling: "filling meal",
  main: "main dish",
  rice: "served with rice, ulam",
  pasta: "pasta",
  pizza: "pizza",
  burger: "burger with fries",
  salad: "salad",
  light: "light and healthy",
  veggie: "with vegetables",
  vegetarian: "meat-free",
  fresh: "fresh greens",
  fried: "fried",
  crispy: "crispy and crunchy",
  cheesy: "cheesy",
  saucy: "saucy",
  grilled: "grilled",
  beef: "beef",
  pork: "pork",
  chicken: "chicken",
  seafood: "seafood",
  fish: "fish",
  steak: "steak",
  ribs: "ribs",
  filipino: "Filipino comfort food",
  comfort: "comfort food",
  japanese: "Japanese style",
  alcohol: "alcoholic drink for a night out",
  beer: "beer",
  cocktail: "cocktail",
  spirits: "hard liquor by the bottle",
  shots: "shots",
  sour: "sour",
  citrus: "citrus lemon lime",
  soda: "soft drink soda",
  juice: "fruit juice",
  "energy-drink": "energy drink",
  water: "plain water",
};
