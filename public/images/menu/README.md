# /public/images/menu

Photos for individual menu items, referenced from `lib/mockData.ts` via each
item's `image_url`.

Foodpanda's item photos for this listing aren't labeled by dish name in the
page markup and their vendor API requires an authenticated client, so they
can't be safely auto-matched to the right `menuItems` entry (mismatching a
photo to the wrong dish would be worse than no photo). The one image that
*could* be attributed with confidence — the restaurant's foodpanda listing
banner — was downloaded to `/public/images/foodpanda/elag-listing.jpg` and is
used as a generic "order on foodpanda" accent, not tied to a specific item.

To add real per-item photos: save them here using any filename, then update
the matching item's `image_url` in `lib/mockData.ts` (e.g.
`/images/menu/espresso.jpg`).

`MenuCard`/`ImagePlaceholder` gracefully fall back to a colored box with the
item name if an image is missing or fails to load — never a broken image icon.
