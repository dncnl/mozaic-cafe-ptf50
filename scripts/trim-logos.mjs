/**
 * Trim the transparent canvas off the logo PNGs.
 *
 * Both source files hold identical 576x144 artwork, but inside differently
 * padded canvases:
 *
 *   mozaic-logo-white.png  615x188  -> 33px dead space above, 11px below
 *   mozaic-logo-blue.png   614x195  -> 21px above, 30px below
 *
 * So sizing by CSS height sizes the *padded box*: `h-9` (36px) rendered only
 * ~27.6px of actual wordmark, sitting low in its own box — and because the two
 * variants are padded in opposite directions, no single CSS rule could align
 * both. Trimming removes empty pixels only; the mark itself is untouched.
 *
 * Run:  node scripts/trim-logos.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "images", "logo");

const targets = [
  ["mozaic-logo-white.png", "mozaic-logo-white-trim.png"],
  ["mozaic-logo-blue.png", "mozaic-logo-blue-trim.png"],
];

for (const [from, to] of targets) {
  const src = path.join(dir, from);
  const out = path.join(dir, to);

  const before = await sharp(src).metadata();
  // threshold:1 so only fully-transparent pixels are considered trimmable.
  const info = await sharp(src).trim({ threshold: 1 }).toFile(out);

  console.log(
    `${from} ${before.width}x${before.height}  ->  ${to} ${info.width}x${info.height}`
  );
}
