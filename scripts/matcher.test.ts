// Run: npm test   (Node's built-in test runner + native TypeScript stripping)
//
// Phase-1 tests: the RULES half of the matcher, with fake vectors — no model
// needed. They pin the safety invariants that must never regress: budget is
// respected, "no X" never returns X (or maybe-X), alcohol only when asked.
import { test } from "node:test";
import assert from "node:assert/strict";
import { menuItems } from "../lib/mockData.ts";
import { parseQuery } from "../lib/matcher/parseQuery.ts";
import { rankMenu } from "../lib/matcher/rank.ts";
import { profileFor } from "../lib/matcher/menuTags.ts";

// Every item gets the same unit vector, so similarity is a constant and only
// the filters and tag bonus decide the outcome.
const unit = [1, 0, 0];
const vectors = new Map(menuItems.map((i) => [i.id, unit]));
const rank = (text: string, limit = 50) => rankMenu(unit, parseQuery(text), menuItems, vectors, limit);
const hasTag = (id: string, tag: string) => {
  const item = menuItems.find((i) => i.id === id)!;
  const p = profileFor(item);
  return p.tags.includes(tag) || p.maybe.includes(tag);
};

test("every menu item has a profile with at least one tag", () => {
  for (const item of menuItems) {
    assert.ok(profileFor(item).tags.length > 0, `${item.id} has no tags`);
  }
});

test("parses budget, exclusion and leaves the vibe for the model", () => {
  const q = parseQuery("sweet, cold, no coffee, under ₱150");
  assert.equal(q.budget, 150);
  assert.deepEqual(q.exclude, ["coffee"]);
  assert.ok(q.want.includes("sweet") && q.want.includes("cold"));
  assert.equal(q.semantic, "sweet cold");
  assert.deepEqual(q.chips, ["Under ₱150", "No coffee"]);
});

test("parses Taglish: ulam para sa 4, walang baboy, ₱300", () => {
  const q = parseQuery("₱300, ulam para sa 4, walang baboy");
  assert.equal(q.budget, 300);
  assert.equal(q.party, 4);
  assert.ok(q.exclude.includes("pork"));
  assert.match(q.semantic, /main dish with rice/);
});

test("per-person budget multiplies by party size", () => {
  const q = parseQuery("dinner for 3, 200 pesos each");
  assert.equal(q.perPerson, 200);
  assert.equal(q.party, 3);
  assert.equal(q.budget, 600);
});

test("budget is never exceeded", () => {
  for (const text of ["under ₱150", "something filling below 200 pesos", "₱100"]) {
    const cap = parseQuery(text).budget!;
    for (const m of rank(text).matches) assert.ok(m.item.price <= cap, `${m.item.name} ₱${m.item.price} > ₱${cap}`);
  }
});

test("'no X' never returns X or maybe-X", () => {
  const cases: [string, string[]][] = [
    ["no pork", ["pork"]],
    ["halal meal", ["pork"]],
    ["no coffee", ["coffee"]],
    ["vegetarian", ["pork", "beef", "chicken", "seafood", "fish"]],
    ["without seafood or chicken", ["seafood", "chicken"]],
  ];
  for (const [text, tags] of cases) {
    for (const m of rank(text).matches) {
      for (const tag of tags) assert.ok(!hasTag(m.item.id, tag), `"${text}" returned ${m.item.name} (${tag})`);
    }
  }
});

test("alcohol only when asked for; bottles only when named", () => {
  assert.ok(rank("something refreshing").matches.every((m) => !hasTag(m.item.id, "alcohol")));
  assert.ok(rank("a cocktail for tonight").matches.some((m) => hasTag(m.item.id, "alcohol")));
  assert.ok(rank("a cocktail for tonight").matches.every((m) => !hasTag(m.item.id, "spirits")));
  assert.ok(rank("a bottle of whiskey").matches.some((m) => hasTag(m.item.id, "spirits")));
  assert.ok(rank("non-alcoholic drinks for the bar").matches.every((m) => !hasTag(m.item.id, "alcohol")));
});

test("add-ons never recommended; plain rice only when named", () => {
  assert.ok(rank("anything").matches.every((m) => !hasTag(m.item.id, "add-on")));
  assert.ok(rank("anything").matches.every((m) => m.item.id !== "kitchen-rice"));
  assert.ok(rank("rice").matches.some((m) => m.item.id === "kitchen-rice"));
});

test("group basket stays within budget and has variety", () => {
  const r = rank("pulutan for 4, ₱800");
  assert.ok(r.basket, "expected a basket");
  assert.ok(r.basket.total <= 800);
  assert.ok(r.basket.items.length >= 2);
});

test("impossible budget explains itself", () => {
  const r = rank("a full meal under ₱20");
  assert.equal(r.matches.length, 0);
  assert.match(r.emptyHint ?? "", /closest match/);
});
