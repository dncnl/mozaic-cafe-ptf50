# /public/images/pubmats

mozaic's real promotional graphics. The site's whole visual system is derived
from these — palette, texture, type register, and the three-rooms structure all
trace back to something in this folder.

## What's here

| File | What it is | Used by |
|---|---|---|
| `moz-cafe.webp` | CAFE poster | Homepage three-rooms · menu Cafe panel |
| `moz-kitchen.webp` | KITCHEN poster | Homepage three-rooms · menu Kitchen panel |
| `moz-bar.webp` | BAR poster | Homepage three-rooms · menu Bar panel · hero |
| `moz-interior-night.webp` | Staff behind the bar, blue LED — **the only real photograph of the room** | About section |
| `moz-drinks.png` | "holiday blends" — real product photography | Order section |
| `moz-turns-one.png` | First-anniversary graphic | — |
| `moz-sip-spins.png` | "sip & spins" — DJ equipment, duotone | About section |
| `moz-night.png` | "we ain't mozaic…" night bar photo | unused, available |
| `moz-rnb-night.png` | "rnb moz night" — engraved hatch treatment | unused, available |
| `moz-valentines.png` | Valentine's collage — food, drinks, vendor list | unused, available |

Paths and copy for the poster trio live in `lib/rooms.ts`.

## Poster geometry — read before laying one out

The cafe/kitchen/bar artboards are **1600×2263 (1:√2 portrait)**. The wordmark
sits at the top, the illustration bleeds off the bottom, and the middle is
open field. **Never crop one to a wide box** — a 21:6 banner out of a 0.7:1
image renders a strip of empty blue and nothing else. Render at the native
ratio via `POSTER_ASPECT` in `lib/rooms.ts`, or don't render it.

Consumers fall back to the poster's own construction (blue field, star,
category word) if a file is missing, so nothing breaks mid-swap.

## What these established

- **Brand blue is `#3866bb`** — sampled off these artboards with sharp. Flat
  vector fill, all three posters agreeing within 2/255. This supersedes the
  `#3f66c8` an earlier pass read off a PDF rendering.
- **Two registers.** A bright-blue "day" register (these posters) and a
  near-black "night" register (the bar photos, rnb night). The site's section
  rhythm follows that split.
- **Grain**, not dot halftone, as background texture. Dots appear exactly once
  — as shading *inside* the BAR poster's citrus illustration, never as a field
  wash.
- **Blue duotone** photo treatment, so any phone photo lands on-brand.
- **No black keylines.** Everything is white-on-blue or blue-on-white.
- **All-lowercase headlines** with an italic subtitle line beneath.
- **The star** — 6 of 11 pieces, the most repeated non-logo element.

### Correction

An earlier pass claimed these posters carried a "thin white inset keyline" and
shipped a `.moz-frame` class for it. That was wrong — the white edge was the
margin of the PDF the pubmats were first reviewed in. Corner pixels here are
pure field blue. `.moz-frame` has been deleted; don't recreate it.
