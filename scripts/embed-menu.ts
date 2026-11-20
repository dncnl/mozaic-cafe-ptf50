// Run: npm run embed
//
// Precomputes one embedding per menu item with the same model the browser
// uses, and writes lib/matcher/menuEmbeddings.json. The phone then only has to
// embed the customer's one sentence, not all ~100 menu items.
//
// Re-run whenever lib/mockData.ts or lib/matcher/menuTags.ts changes — the
// app compares the stored menuHash and warns in the console when stale.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { pipeline } from "@huggingface/transformers";
import { menuItems } from "../lib/mockData.ts";
import { MODEL_DTYPE, MODEL_ID, itemText, menuHash } from "../lib/matcher/itemText.ts";

const out = fileURLToPath(new URL("../lib/matcher/menuEmbeddings.json", import.meta.url));

console.log(`Loading ${MODEL_ID} (${MODEL_DTYPE})…`);
const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: MODEL_DTYPE });

const texts = menuItems.map(itemText);
const output = await extractor(texts, { pooling: "mean", normalize: true });
const vectors = output.tolist() as number[][];

const data = {
  model: MODEL_ID,
  dtype: MODEL_DTYPE,
  dims: vectors[0].length,
  menuHash: menuHash(menuItems),
  generatedAt: new Date().toISOString(),
  // 4 decimals is far below the model's own quantisation noise and keeps the
  // file small (~250 KB, ~90 KB gzipped). Loaded only on the /match page.
  items: menuItems.map((item, i) => ({ id: item.id, v: vectors[i].map((x) => Math.round(x * 1e4) / 1e4) })),
};

writeFileSync(out, JSON.stringify(data));
console.log(`Wrote ${data.items.length} × ${data.dims} embeddings → lib/matcher/menuEmbeddings.json (hash ${data.menuHash})`);
