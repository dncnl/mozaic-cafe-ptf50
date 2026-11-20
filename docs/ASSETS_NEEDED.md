# Asset audit and photography still needed

Audit from the Nov 2026 art-direction pass. The site deliberately does not fill gaps with stock photos or guessed dish photos (see CLAUDE.md hard rules).

## What exists

| File | Size | What it really is | Where it's used | Verdict |
|---|---|---|---|---|
| `pubmats/moz-cafe.webp`, `moz-kitchen.webp`, `moz-bar.webp` | 1600×2263 | Vector-derived room posters, crisp | Home hero (fanned trio), menu room panel | **Keep.** Best assets in the repo |
| `pubmats/moz-interior-night.webp` | 933×1350 | Only text-free photo of the room; dark, mid-res | About (single dominant image) | **Keep for now, replace when possible.** Under the ~1200px guideline for a large editorial image |
| `gallery/mozaic-catering-home.jpg` | 1080×1351 | Pubmat ("got an occasion?") with baked-in text | Catering hero, shown whole as a poster | Keep as artwork, never as photography |
| `gallery/mozaiccbk-catering.png` (really WebP) | 1020×1276 | Pubmat ("moz gotchu! message us") | Catering body, shown whole | Keep as artwork |
| `gallery/mozaic-delivery.jpg` | 1080×1351 | Pubmat ("your coffee, delivered") | **Removed from home**, because it was being cropped as a photo | Unused |
| `pubmats/moz-sip-spins.png` | 647×870 | Event pubmat, low-res | **Removed from About** | Unused |
| `pubmats/moz-drinks.png`, `moz-night.png`, `moz-rnb-night.png`, `moz-turns-one.png`, `moz-valentines.png` | ~650–700px wide | Event pubmats with text, low-res | — | Unused. Not suitable as site photography |

## What would most improve the site (ask the owner)

Phone photos are fine if they're sharp, well lit and in landscape **and** portrait. Send the original files, not screenshots from Instagram or Messenger.

1. **The room by day**, wide, with natural light: hero option and About lead (≥1920px wide).
2. **The bar at night**, a brighter, sharper version of `moz-interior-night` (≥1200px).
3. **3–6 signature drinks and dishes**, shot on a plain surface: menu thumbnails (set `image_url` in `lib/mockData.ts`) and the home rooms section (≥800px).
4. **People at a table / an event**, used only with the people's consent: About support image, catering page.
5. **Takeaway bag / packaging without text overlay**, for the delivery section.

When these land: put them under `public/images/` (e.g. `atmosphere/interior/`, `food/`, `drinks/`), export as WebP, and give each one descriptive alt text.
