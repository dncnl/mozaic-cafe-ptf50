// Run: npm run test:ai   (downloads the ~23 MB model on first run, then cached)
//
// Phase-2 tests: the AI half, with the REAL model and the committed
// menuEmbeddings.json. Expectations are deliberately loose (top-3 / tag-level,
// not exact order) so harmless re-tagging doesn't break them, but a broken
// model, stale index, or bad tag change does.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { menuItems } from "../lib/mockData.ts";
import { MODEL_DTYPE, MODEL_ID, menuHash } from "../lib/matcher/itemText.ts";
import { profileFor } from "../lib/matcher/menuTags.ts";
import { parseQuery } from "../lib/matcher/parseQuery.ts";
import { rankMenu } from "../lib/matcher/rank.ts";
import embeddings from "../lib/matcher/menuEmbeddings.json" with { type: "json" };

let extractor: FeatureExtractionPipeline;
const vectors = new Map(embeddings.items.map((e) => [e.id, e.v]));

before(async () => {
  extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: MODEL_DTYPE });
});

async function match(text: string) {
  const q = parseQuery(text);
  const out = await extractor(q.semantic, { pooling: "mean", normalize: true });
  return rankMenu(out.data as Float32Array, q, menuItems, vectors);
}
const tagged = (id: string, tag: string) => profileFor(menuItems.find((i) => i.id === id)!).tags.includes(tag);

test("embedding index is current (run `npm run embed` if this fails)", () => {
  assert.equal(embeddings.model, MODEL_ID);
  assert.equal(embeddings.menuHash, menuHash(menuItems));
  assert.equal(embeddings.items.length, menuItems.length);
});

test("'something refreshing' surfaces a spritz in the top 3", async () => {
  const r = await match("something refreshing");
  assert.ok(r.matches.slice(0, 3).some((m) => m.item.group === "Spritz"));
});

test("'I need caffeine to study' returns coffee", async () => {
  const r = await match("I need caffeine to study");
  assert.ok(r.matches.slice(0, 3).every((m) => tagged(m.item.id, "caffeine")));
});

test("'cocktails for a night out' returns cocktails", async () => {
  const r = await match("cocktails for a night out");
  assert.ok(r.matches.slice(0, 5).every((m) => tagged(m.item.id, "cocktail")));
});

test("'pulutan for 4 barkada, ₱800' returns shareable food and a basket within budget", async () => {
  const r = await match("pulutan for 4 barkada, ₱800");
  assert.ok(r.matches.slice(0, 3).every((m) => tagged(m.item.id, "shareable")));
  assert.ok(r.basket && r.basket.total <= 800);
});

test("'something healthy under ₱250' leads with a salad", async () => {
  const r = await match("something healthy under ₱250");
  assert.equal(r.matches[0].item.group, "Salad");
});

test("Taglish 'ulam para sa 4, walang baboy' returns pork-free rice meals", async () => {
  const r = await match("₱300, ulam para sa 4, walang baboy");
  assert.ok(r.matches.slice(0, 3).every((m) => m.item.group === "Rice Meals"));
  assert.ok(r.matches.every((m) => !tagged(m.item.id, "pork")));
});
