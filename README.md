# mozaic: cafe, bar & kitchen

Website and **Mood Matcher** for Mozaic Cafe, Bar & Kitchen (Dau, Mabalacat, Pampanga), built as a PTF50 final project: an AI web app for a real client.

- **Site:** the full priced menu (cafe, kitchen, bar), delivery links, catering inquiries through direct chat, location and reviews.
- **Mood Matcher (`/match`):** a customer types *"sweet and cold, no coffee, under ₱150"* or *"pulutan for 4, ₱800"* (English or Taglish), and an AI model **running on their own phone** picks from the menu. There is no API key and no server, and it costs ₱0.

## How the matcher works

```
"pulutan for 4, ₱800"
        │
        ▼
 parseQuery (rules)      budget ₱800 · party 4 · exclusions · alcohol only if asked
        │  leaves: "bar snacks to share"
        ▼
 Web Worker              Transformers.js + all-MiniLM-L6-v2 → 384-number vector
        │
        ▼
 rankMenu                filter by rules → cosine vs precomputed item vectors
                         + 0.04 per requested tag → top 6 + "why" + budget basket
```

Rules handle numbers and "no X", because embeddings are bad at negation. The model handles meaning, which rules can't do. The code is in [`lib/matcher/`](lib/matcher), and each file's header explains its part.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm test               # rules tests (no model)
npm run test:ai        # real-model tests
npm run embed          # rebuild the AI index after menu/tag edits
npm run try -- "cocktails for tonight"   # one query in the terminal
npm run build
```

## Stack

Next.js 16 (App Router, Turbopack) · Tailwind v4 · TypeScript · Transformers.js 4 (ONNX Runtime Web, self-hosted at `/ort`) · Remotion 4 (hero animation, lazy-loaded) · Lucide icons · Vercel.

## Docs

| | |
|---|---|
| [docs/SETUP.md](docs/SETUP.md) | The steps you do yourself: owner tag review, deploy, feedback form, video render |
| [docs/PROPOSAL.md](docs/PROPOSAL.md) | PTF50 deliverable 1 (draft) |
| [docs/USER_TESTING.md](docs/USER_TESTING.md) | PTF50 deliverable 4 (template + script) |
| [docs/COST.md](docs/COST.md) | PTF50 deliverable 5 |
| [docs/PROMPT_LOG.md](docs/PROMPT_LOG.md) | AI-assistant prompt log (spec §06-A) |
| [CLAUDE.md](CLAUDE.md) | Project facts, design system and hard rules |

## Image assets

| Folder | Purpose |
| --- | --- |
| `public/images/logo/` | Logo. Use the `-trim` variants (see CLAUDE.md). |
| `public/images/pubmats/` | Mozaic's own pubmats: the cafe/kitchen/bar posters, interior photo and event graphics |
| `public/images/gallery/` | Delivery and catering images used on the homepage and the catering page |
| `public/images/menu/` | Real dish photos (none yet). Set an item's `image_url` in `lib/mockData.ts` and its menu row shows a thumbnail. |
| `public/images/social/` | Real social post images. The homepage post wall stays hidden until one exists. |
