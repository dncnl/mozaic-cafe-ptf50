// Run: npm run try -- "sweet, cold, no coffee, under ₱150"
//
// Runs the full matcher (real model + rules) in Node and prints the result.
// Handy for tuning tags and for the demo's "how it works" walkthrough.
import { pipeline } from "@huggingface/transformers";
import { menuItems } from "../lib/mockData.ts";
import { MODEL_DTYPE, MODEL_ID } from "../lib/matcher/itemText.ts";
import { parseQuery } from "../lib/matcher/parseQuery.ts";
import { rankMenu } from "../lib/matcher/rank.ts";
import embeddings from "../lib/matcher/menuEmbeddings.json" with { type: "json" };

const queries = process.argv.slice(2);
if (queries.length === 0) {
  queries.push(
    "sweet, cold, no coffee, under ₱150",
    "pulutan for 4 barkada, ₱800",
    "something healthy under ₱250",
    "₱300, ulam para sa 4, walang baboy",
    "I need caffeine to study",
    "something refreshing",
    "comfort food after a long day",
    "cocktails for a night out"
  );
}

const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: MODEL_DTYPE });
const vectors = new Map(embeddings.items.map((e) => [e.id, e.v]));

for (const text of queries) {
  const q = parseQuery(text);
  const out = await extractor(q.semantic, { pooling: "mean", normalize: true });
  const r = rankMenu(out.data as Float32Array, q, menuItems, vectors);
  console.log(`\n"${text}"  →  model reads: "${q.semantic}"   [${q.chips.join(" | ")}]`);
  if (r.emptyHint) console.log(`  ${r.emptyHint}`);
  for (const m of r.matches) {
    console.log(`  ${m.score.toFixed(3)}  ${m.item.name.padEnd(28)} ₱${String(m.item.price).padEnd(5)} ${m.reasons.join(", ")}`);
  }
  if (r.basket) {
    console.log(`  basket ₱${r.basket.total}${r.basket.budget ? ` of ₱${r.basket.budget}` : ""}: ${r.basket.items.map((i) => i.name).join(" + ")}`);
  }
}
