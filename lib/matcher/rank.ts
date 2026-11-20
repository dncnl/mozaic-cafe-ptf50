import type { MenuItem } from "../types";
import { profileFor } from "./menuTags.ts";
import type { ParsedQuery } from "./parseQuery.ts";

/**
 * The ranking half of the matcher. Given the query's embedding (from the AI
 * model, in the browser) and the precomputed embedding of every menu item:
 *
 *   1. FILTER  — drop items that break a hard rule (budget, "no pork",
 *                alcohol unless asked for, add-ons, unavailable).
 *   2. SCORE   — cosine similarity between query and item vectors (the AI
 *                part), plus a small bonus for each tag the customer asked
 *                for explicitly: score = similarity + 0.04 × matched tags
 *                (− 0.06 for canned drinks the customer didn't name).
 *   3. EXPLAIN — list the matched tags and the price fit as the "why".
 *   4. BASKET  — for groups, greedily fill the budget from the top matches,
 *                preferring variety (one item per menu group first).
 *
 * Pure functions, no model calls, so it's unit-testable with fake vectors.
 */

export type Vector = ArrayLike<number>;

export interface Match {
  item: MenuItem;
  score: number;
  similarity: number;
  /** Plain-language reasons, e.g. ["Sweet", "Served cold", "Fits ₱150"]. */
  reasons: string[];
}

export interface Basket {
  items: MenuItem[];
  total: number;
  budget: number | null;
}

export interface RankResult {
  matches: Match[];
  basket: Basket | null;
  /** Set when nothing passed the filters — what to tell the customer. */
  emptyHint: string | null;
}

const TAG_BONUS = 0.04;
const MAX_BONUS_TAGS = 3;
/** Canned drinks (Coke, Sprite, Redbull) sit just below mozaic's own drinks
 *  unless the customer names one — a recommender should lead with the house
 *  menu, not a can you can buy anywhere. */
const CANNED_PENALTY = 0.06;
const NAMES_CANNED = /(?:soda|softdrinks?|soft drinks?|coke|sprite|royal|redbull|red bull|energy drink)/i;

const REASON_LABEL: Record<string, string> = {
  sweet: "Sweet",
  cold: "Served cold",
  refreshing: "Refreshing",
  coffee: "Coffee",
  matcha: "Matcha",
  chocolate: "Chocolate",
  fruity: "Fruity",
  creamy: "Creamy",
  shareable: "Good for sharing",
  snack: "Snack",
  hearty: "Hearty",
  filling: "Filling",
  light: "Light",
  salad: "Salad",
  spicy: "Spicy option",
  cheesy: "Cheesy",
  fried: "Fried",
  crispy: "Crispy",
  rice: "With rice",
  pasta: "Pasta",
  pizza: "Pizza",
  burger: "Burger",
  beef: "Beef",
  chicken: "Chicken",
  pork: "Pork",
  seafood: "Seafood",
  steak: "Steak",
  filipino: "Filipino",
  comfort: "Comfort food",
  strong: "Strong",
  sour: "Sour",
  beer: "Beer",
  cocktail: "Cocktail",
  shots: "Shots",
  spirits: "By the bottle",
};

export function dot(a: Vector, b: Vector): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

/** Plain staples only show up when named ("rice", "water"). */
function isStapleHidden(item: MenuItem, tags: string[], raw: string) {
  if (!tags.includes("staple")) return false;
  const firstWord = item.name.toLowerCase().split(/\s+/)[0];
  return !raw.toLowerCase().includes(firstWord);
}

type FilterOutcome = "ok" | "budget" | "excluded" | "alcohol" | "hidden";

function check(item: MenuItem, q: ParsedQuery): FilterOutcome {
  const { tags, maybe } = profileFor(item);
  if (!item.is_available || tags.includes("add-on") || isStapleHidden(item, tags, q.raw)) return "hidden";
  if (tags.includes("alcohol") && !q.allowAlcohol) return "alcohol";
  if (tags.includes("spirits") && !q.allowBottles) return "alcohol";
  if (q.exclude.some((tag) => tags.includes(tag) || maybe.includes(tag))) return "excluded";
  const cap = q.perPerson ?? q.budget;
  if (cap !== null && item.price > cap) return "budget";
  return "ok";
}

export function rankMenu(
  queryVector: Vector,
  q: ParsedQuery,
  items: MenuItem[],
  vectors: Map<string, Vector>,
  limit = 6
): RankResult {
  const scored: Match[] = [];
  let budgetOnly: MenuItem[] = [];

  for (const item of items) {
    const vec = vectors.get(item.id);
    if (!vec) continue;
    const outcome = check(item, q);
    if (outcome === "budget") budgetOnly.push(item);
    if (outcome !== "ok") continue;

    const { tags } = profileFor(item);
    const matched = q.want.filter((tag) => tags.includes(tag));
    const similarity = dot(queryVector, vec);
    const canned = tags.includes("canned") && !NAMES_CANNED.test(q.raw) ? CANNED_PENALTY : 0;
    const score = similarity + TAG_BONUS * Math.min(matched.length, MAX_BONUS_TAGS) - canned;

    const reasons = matched.map((tag) => REASON_LABEL[tag]).filter(Boolean);
    const cap = q.perPerson ?? q.budget;
    if (cap !== null) reasons.push(`Fits ₱${cap.toLocaleString("en-PH")}`);

    scored.push({ item, score, similarity, reasons: [...new Set(reasons)] });
  }

  scored.sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    let emptyHint = "Nothing on the menu matches all of that. Try removing one of the filters above.";
    if (budgetOnly.length > 0) {
      budgetOnly = budgetOnly.sort((a, b) => a.price - b.price);
      const cheapest = budgetOnly[0];
      emptyHint = `Nothing fits that budget. The closest match is ${cheapest.name} at ₱${cheapest.price.toLocaleString("en-PH")}.`;
    }
    return { matches: [], basket: null, emptyHint };
  }

  const basket = q.groupIntent ? buildBasket(scored, q) : null;
  return { matches: scored.slice(0, limit), basket, emptyHint: null };
}

/**
 * Greedy budget fill. First pass takes the best match from each menu group
 * (variety: not three pizzas), second pass tops up with whatever fits.
 * Target size is about one dish per 1.5 people, minimum two.
 */
export function buildBasket(ranked: Match[], q: ParsedQuery): Basket | null {
  const target = Math.max(2, Math.ceil((q.party ?? 3) / 1.5));
  const budget = q.budget;
  const pool = ranked.slice(0, 24);
  const chosen: MenuItem[] = [];
  let total = 0;
  const fits = (item: MenuItem) => budget === null || total + item.price <= budget;

  const seenGroups = new Set<string>();
  for (const { item } of pool) {
    if (chosen.length >= target) break;
    if (seenGroups.has(item.group ?? item.id) || !fits(item)) continue;
    chosen.push(item);
    seenGroups.add(item.group ?? item.id);
    total += item.price;
  }
  for (const { item } of pool) {
    if (chosen.length >= target) break;
    if (chosen.includes(item) || !fits(item)) continue;
    chosen.push(item);
    total += item.price;
  }

  if (chosen.length < 2) return null;
  return { items: chosen, total, budget };
}
