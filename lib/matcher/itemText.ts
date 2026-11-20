import type { MenuItem } from "../types";
import { TAG_PHRASES, profileFor } from "./menuTags.ts";

/** The embedding model. Change it here and re-run `npm run embed`. */
export const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
export const MODEL_DTYPE = "q8";

const ROOM_WORDS: Record<MenuItem["category"], string> = {
  cafe: "cafe drink",
  kitchen: "kitchen food",
  bar: "bar drink",
};

/**
 * The sentence the model reads for one menu item. Name + group + room +
 * published description, plus a phrase per confirmed tag (never `maybe`
 * tags — the model shouldn't be told an item is pork when we don't know).
 */
export function itemText(item: MenuItem): string {
  const { tags } = profileFor(item);
  const phrases = tags.map((t) => TAG_PHRASES[t]).filter(Boolean);
  return [
    `${item.name}.`,
    `${item.group ?? ""} from the mozaic ${ROOM_WORDS[item.category]} menu.`,
    item.description,
    phrases.length ? `${phrases.join(", ")}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * FNV-1a over every item's id + text. Stamped into menuEmbeddings.json by the
 * embed script; the browser recomputes it and warns when the menu or tags
 * changed without re-running `npm run embed`.
 */
export function menuHash(items: MenuItem[]): string {
  let h = 0x811c9dc5;
  const input = items.map((i) => `${i.id}|${itemText(i)}`).join("\n");
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}
