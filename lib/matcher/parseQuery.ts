/**
 * Rule-based half of the matcher: pulls the HARD constraints out of what the
 * customer typed, and leaves the rest (the "vibe") for the AI model.
 *
 * Why split it? Embedding models are good at meaning ("something refreshing"
 * ≈ spritz, juice, iced drinks) but bad at negation and numbers: "no coffee"
 * embeds close to "coffee", and "under ₱150" carries no usable price signal.
 * So budget, party size, and exclusions are parsed here with plain rules, and
 * those phrases are REMOVED from the text the model sees.
 *
 * Understands English plus common Taglish ("ulam para sa 4, walang baboy").
 */

export interface ParsedQuery {
  raw: string;
  /** What the embedding model reads — the query minus its constraints. */
  semantic: string;
  /** Total budget in pesos, if one was given. */
  budget: number | null;
  /** Per-person budget, if phrased that way ("₱150 each"). */
  perPerson: number | null;
  party: number | null;
  /** Mentions a group/sharing without a number. */
  groupIntent: boolean;
  /** Tags to hide. Items with these as tags OR `maybe` tags are filtered out. */
  exclude: string[];
  /** Tags the customer asked for — small score bonus + the "why" line. */
  want: string[];
  allowAlcohol: boolean;
  allowBottles: boolean;
  /** Human-readable summary chips, e.g. "Under ₱150", "No coffee". */
  chips: string[];
}

// --- Taglish → English, so the (English-only) model can read it ------------
const TAGLISH: [RegExp, string][] = [
  [/\bmatamis\b/g, "sweet"],
  [/\bmalamig\b/g, "cold"],
  [/\bmaanghang\b/g, "spicy"],
  [/\bkape\b/g, "coffee"],
  [/\bbaboy\b/g, "pork"],
  [/\bbaka\b/g, "beef"],
  [/\bmanok\b/g, "chicken"],
  [/\bisda\b/g, "fish"],
  [/\bhipon\b/g, "shrimp"],
  [/\bkarne\b/g, "meat"],
  [/\bgatas\b/g, "milk"],
  [/\bpulutan\b/g, "bar snacks to share"],
  [/\bulam\b/g, "main dish with rice"],
  [/\bkanin\b/g, "rice"],
  [/\binuman\b/g, "alcoholic drinks"],
  [/\btagay\b/g, "shots"],
  [/\bbarkada\b/g, "group of friends"],
  [/\bbusog\b/g, "filling"],
  [/\bgutom\b/g, "hungry"],
  [/\btipid\b/g, "cheap"],
  [/\bmasarap\b/g, "tasty"],
  [/\bmerienda\b/g, "snack"],
  [/\bpara sa\b/g, "for"],
  [/\btao\b/g, "people"],
  [/\b(?:walang|wala|ayaw ng|ayoko ng|bawal ang|bawal)\b/g, "no"],
];

// --- Exclusions: the word after "no"/"without" → tags to hide ----------------
const MEAT = ["pork", "beef", "chicken", "seafood", "fish", "hotdog", "ribs", "steak"];
const NEGATABLE: Record<string, { tags: string[]; label: string }> = {
  coffee: { tags: ["coffee"], label: "No coffee" },
  caffeine: { tags: ["coffee", "caffeine", "energy-drink"], label: "No caffeine" },
  alcohol: { tags: ["alcohol"], label: "No alcohol" },
  alcoholic: { tags: ["alcohol"], label: "No alcohol" },
  booze: { tags: ["alcohol"], label: "No alcohol" },
  liquor: { tags: ["alcohol"], label: "No alcohol" },
  beer: { tags: ["beer"], label: "No beer" },
  pork: { tags: ["pork"], label: "No pork" },
  beef: { tags: ["beef", "steak"], label: "No beef" },
  chicken: { tags: ["chicken"], label: "No chicken" },
  seafood: { tags: ["seafood", "fish"], label: "No seafood" },
  fish: { tags: ["seafood", "fish"], label: "No seafood" },
  shrimp: { tags: ["seafood"], label: "No seafood" },
  meat: { tags: MEAT, label: "No meat" },
  dairy: { tags: ["milk", "cheesy", "creamy"], label: "No dairy" },
  milk: { tags: ["milk", "creamy"], label: "No milk" },
  lactose: { tags: ["milk", "cheesy", "creamy"], label: "No dairy" },
  cheese: { tags: ["cheesy"], label: "No cheese" },
  spicy: { tags: ["spicy"], label: "Not spicy" },
  sweet: { tags: ["sweet"], label: "Not sweet" },
  sugar: { tags: ["sweet"], label: "Not sweet" },
  fried: { tags: ["fried"], label: "Nothing fried" },
  nuts: { tags: ["hazelnut", "nutella"], label: "No nuts" },
  nut: { tags: ["hazelnut", "nutella"], label: "No nuts" },
  egg: { tags: ["egg"], label: "No egg" },
};

// Positive phrasings that imply an exclusion.
const IMPLIED_EXCLUSIONS: [RegExp, string][] = [
  [/\b(?:vegetarian|veggie only|meatless|meat-free|plant-based|vegan)\b/, "meat"],
  [/\b(?:non-alcoholic|non alcoholic|virgin|mocktails?|sober|not drinking)\b/, "alcohol"],
  [/\b(?:decaf|caffeine-free|caffeine free)\b/, "caffeine"],
  [/\b(?:lactose intolerant|dairy-free|dairy free)\b/, "dairy"],
  [/\b(?:halal|muslim)\b/, "pork"],
];

const NEGATION = /\b(?:no|without|not|non|hold the|avoid|except|allergic to|minus)\s+([a-z-]+)(?:\s*(?:,|or|and|\/)\s*([a-z-]+))?/g;

// --- What the customer asked for (score bonus + reasons) ---------------------
const WANTS: [RegExp, string[]][] = [
  [/\b(?:sweet|dessert|sugary|treat)\b/, ["sweet"]],
  [/\b(?:cold|iced|ice|chilled|refreshing|cool down|hot day)\b/, ["cold", "refreshing"]],
  [/\b(?:coffee|espresso|latte|caffeine|awake|puyat)\b/, ["coffee"]],
  [/\bmatcha\b/, ["matcha"]],
  [/\b(?:chocolate|choco|chocolatey)\b/, ["chocolate"]],
  [/\b(?:fruit|fruity)\b/, ["fruity"]],
  [/\b(?:creamy|milky)\b/, ["creamy"]],
  [/\b(?:share|sharing|group|friends|platter|snacks to share)\b/, ["shareable"]],
  [/\b(?:snack|snacks|munch|light bite)\b/, ["snack"]],
  [/\b(?:hungry|starving|filling|hearty|heavy)\b/, ["hearty", "filling"]],
  [/\b(?:light|healthy|diet|fresh)\b/, ["light"]],
  [/\b(?:salad|greens)\b/, ["salad"]],
  [/\b(?:spicy|hot sauce)\b/, ["spicy"]],
  [/\b(?:cheese|cheesy)\b/, ["cheesy"]],
  [/\b(?:crispy|fried|crunchy)\b/, ["fried", "crispy"]],
  [/\b(?:rice|main dish with rice)\b/, ["rice"]],
  [/\b(?:pasta|spaghetti)\b/, ["pasta"]],
  [/\bpizza\b/, ["pizza"]],
  [/\bburger\b/, ["burger"]],
  [/\bbeef\b/, ["beef"]],
  [/\bchicken\b/, ["chicken"]],
  [/\bpork\b/, ["pork"]],
  [/\b(?:seafood|fish|shrimp)\b/, ["seafood"]],
  [/\b(?:steak|ribeye)\b/, ["steak"]],
  [/\b(?:filipino|pinoy)\b/, ["filipino"]],
  [/\bcomfort\b/, ["comfort"]],
  [/\b(?:strong|bold|kick)\b/, ["strong"]],
  [/\b(?:sour)\b/, ["sour"]],
  [/\b(?:beer|beers)\b/, ["beer"]],
  [/\b(?:cocktail|cocktails)\b/, ["cocktail"]],
  [/\b(?:shots?)\b/, ["shots"]],
  [/\b(?:bottles?|whiske?y|vodka|tequila|brandy|liquor)\b/, ["spirits"]],
];

const ALCOHOL_INTENT = /\b(?:alcohol|alcoholic|beers?|cocktails?|booze|liquor|shots?|inuman|tagay|bar|vodka|rum|tequila|gin|whiske?y|happy hour|lasing|night out|drunk)\b/;
const BOTTLE_INTENT = /\b(?:bottles?|bote|liquor|whiske?y|vodka|tequila|brandy|jack daniels|absolut|jagermeister|fundador)\b/;
const GROUP_INTENT = /\b(?:barkada|group|friends|family|team|party|celebrat\w*|sharing|share)\b/;

const NUMBER_WORDS: Record<string, number> = {
  two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  dalawa: 2, tatlo: 3, apat: 4, lima: 5, anim: 6,
};

const money = (s: string) => Number(s.replace(/,/g, ""));

export function parseQuery(raw: string): ParsedQuery {
  const lowerRaw = raw.toLowerCase().normalize("NFKC");
  let t = ` ${lowerRaw} `;
  for (const [re, en] of TAGLISH) t = t.replace(re, en);

  // ---- budget -------------------------------------------------------------
  let budget: number | null = null;
  let perPerson: number | null = null;
  const budgetPatterns = [
    /\b(?:under|below|less than|max(?:imum)?|budget(?: of| is)?|within|up to|at most|hanggang|not more than)\s*(?:₱|php|p)?\s*(\d[\d,]*)\s*(?:pesos?|php)?/,
    /(?:₱|\bphp\s?)(\d[\d,]*)/,
    /\b(\d[\d,]*)\s*(?:pesos?|php)\b/,
  ];
  for (const re of budgetPatterns) {
    const m = t.match(re);
    if (m) {
      const amount = money(m[1]);
      const after = t.slice((m.index ?? 0) + m[0].length, (m.index ?? 0) + m[0].length + 18);
      if (/^\s*(?:each|per (?:person|head|pax)|\/\s*pax|a head|apiece)/.test(after)) {
        perPerson = amount;
        t = t.replace(m[0], " ").replace(/\b(?:each|per (?:person|head|pax)|\/\s*pax|a head|apiece)\b/, " ");
      } else {
        budget = amount;
        t = t.replace(m[0], " ");
      }
      break;
    }
  }

  // ---- party size ---------------------------------------------------------
  let party: number | null = null;
  const partyNum =
    t.match(/\b(?:for|good for)\s+(\d{1,2}|two|three|four|five|six|seven|eight|nine|ten|dalawa|tatlo|apat|lima|anim)\b(?:\s*(?:people|persons|pax|of us|friends|guests))?/) ??
    t.match(/\b(\d{1,2}|two|three|four|five|six|seven|eight|nine|ten)\s*(?:people|persons|pax|of us|friends|guests)\b/);
  if (partyNum) {
    const n = NUMBER_WORDS[partyNum[1]] ?? Number(partyNum[1]);
    if (n >= 1 && n <= 30) {
      party = n;
      t = t.replace(partyNum[0], " ");
    }
  }
  if (perPerson !== null && party !== null) budget = perPerson * party;
  const groupIntent = GROUP_INTENT.test(t) || (party ?? 0) >= 2;

  // ---- exclusions ---------------------------------------------------------
  const exclude = new Set<string>();
  const excludeLabels = new Set<string>();
  const addExclusion = (word: string) => {
    const hit = NEGATABLE[word] ?? NEGATABLE[word.replace(/s$/, "")];
    if (!hit) return false;
    hit.tags.forEach((tag) => exclude.add(tag));
    excludeLabels.add(hit.label);
    return true;
  };
  for (const [re, word] of IMPLIED_EXCLUSIONS) {
    if (re.test(t)) {
      addExclusion(word);
      t = t.replace(re, " ");
    }
  }
  t = t.replace(NEGATION, (whole, a: string, b?: string) => {
    const gotA = addExclusion(a);
    const gotB = b ? addExclusion(b) : false;
    return gotA || gotB ? " " : whole;
  });

  // ---- intents ------------------------------------------------------------
  const allowAlcohol = !exclude.has("alcohol") && ALCOHOL_INTENT.test(lowerRaw);
  const allowBottles = allowAlcohol && BOTTLE_INTENT.test(lowerRaw);

  const want = new Set<string>();
  for (const [re, tags] of WANTS) if (re.test(t)) tags.forEach((tag) => want.add(tag));
  for (const tag of exclude) want.delete(tag);

  // ---- semantic text --------------------------------------------------------
  let semantic = t
    .replace(/[,;:!?()]+/g, " ")
    .replace(/\b(?:and|or|something|anything|pls|please|po|lang|naman|i want|i'd like|give me|recommend)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (semantic.replace(/[^a-z]/g, "").length < 3) {
    semantic = groupIntent ? "food to share with a group" : "a popular favorite";
  }

  // ---- chips --------------------------------------------------------------
  const chips: string[] = [];
  if (perPerson !== null) chips.push(`₱${perPerson.toLocaleString("en-PH")} each`);
  else if (budget !== null) chips.push(party && party > 1 ? `₱${budget.toLocaleString("en-PH")} total` : `Under ₱${budget.toLocaleString("en-PH")}`);
  if (party !== null) chips.push(`For ${party}`);
  else if (groupIntent) chips.push("For a group");
  excludeLabels.forEach((label) => chips.push(label));
  if (allowAlcohol) chips.push("Bar menu included");

  return {
    raw,
    semantic,
    budget,
    perPerson,
    party,
    groupIntent,
    exclude: [...exclude],
    want: [...want],
    allowAlcohol,
    allowBottles,
    chips,
  };
}
