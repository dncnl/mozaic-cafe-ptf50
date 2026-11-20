# Setup: what you need to do yourself

Everything in the code runs on free tools with no API keys. The steps below are the ones that need a person: accounts, the client, and real users.

## 1. Run it locally (5 minutes)

```bash
npm install          # Node 22+ (tested on Node 24)
npm run dev          # http://localhost:3000, and the matcher is at /match
```

`npm run dev` and `npm run build` first run `scripts/copy-ort.ts`, which copies the ONNX Runtime engine into `public/ort/`. That folder is gitignored and is regenerated on every build.

If `npm install` reports blocked install scripts (`onnxruntime-node`, `protobufjs`, `unrs-resolver`), nothing breaks. Those scripts only matter for optional GPU builds. If you want them anyway, run `npm install-scripts approve <package>`.

## 2. Confirm the menu tags with the owner (required before real users)

The matcher's knowledge of each dish lives in [`lib/matcher/menuTags.ts`](../lib/matcher/menuTags.ts). The tags are a draft, built only from the published menu names and descriptions.

Go through the file with the owner. Ask in particular about:

- **Pork.** Do these items contain pork: Moz's Nacho (hotdogs), Moz Rib Feast, Snack Platter Fiesta, Steak It Up Board (lasagna), Mozaic Beast, and Mozaic Rice Fusion? They are tagged `maybe: ["pork"]` for now, so "no pork" hides them.
- **Hot or iced.** Are the café drinks (coffee, matcha, milk) served hot, iced or both? No temperature tag exists yet, so "cold" queries currently favour spritz, frappes and juices.
- **Spritz.** Are they sparkling, and what flavours are they?
- **Vegetarian.** Are Fries Galore, Quattro Formaggio and Vinaigrette Berry Bliss vegetarian?
- **Wings and Boneless.** Which sauces are spicy?

Then:

1. Edit the tags.
2. Set `OWNER_REVIEWED = true`.
3. Run `npm run embed` to rebuild the AI index.
4. Run `npm test && npm run test:ai`.

Ask permission first, then take a photo of the review session for the report.

## 3. Deploy to Vercel (free Hobby plan)

1. Push the branch: `git push -u origin feature/ai-mood-matcher`.
2. On [vercel.com](https://vercel.com), go to **Add New → Project** and import the GitHub repo. Keep the defaults (Framework: Next.js; Build: `npm run build`).
3. You don't need any environment variables.
4. Once it's deployed, open `https://<project>.vercel.app/match` **in an incognito window on your phone**. The first visit downloads the model (about 23 MB plus a 3.7 MB engine). Later visits load it from the browser cache.
5. Make a QR code that points to `https://<project>.vercel.app/match` for the counter (this is the ₱100 "other expense" in `docs/COST.md`).

Vercel's free plan is for non-commercial use. If the café ever pays for the app, read Vercel's fair-use terms or move it to Netlify or GitHub Pages.

## 4. Create the feedback form (for user testing)

1. Make a free Google Form with the spec's 4 questions:
   1. Easy to use? (1–5)
   2. Was the AI suggestion helpful? (1–5)
   3. What confused you?
   4. One thing that would make it better?
2. Add a consent line, for example: "May we quote your answers in our class report? Yes / No."
3. Paste the form's public link into `FEEDBACK_FORM_URL` in [`lib/matcher/config.ts`](../lib/matcher/config.ts). A "Were these picks helpful?" link then appears under the results.
4. Run 3–5 testers and record the results in [`USER_TESTING.md`](USER_TESTING.md).

## 5. Before submission

- [ ] Every group member can explain filter → embed → cosine → rank (see `lib/matcher/rank.ts`'s header comment) and why "no X" is handled by rules rather than by the model.
- [ ] Add your own prompts to `docs/PROMPT_LOG.md`.
- [ ] Fill in names and hours in `docs/COST.md`.
- [ ] Check that both the GitHub link and the Vercel link open in an incognito window.
- [ ] Name the file `PTF50_GroupNo_MozaicMoodMatcher.pdf` and list the app, entity, members and both links on the cover.

## Useful commands

| Command | What it does |
|---|---|
| `npm test` | Rules tests: budget, "no X", alcohol and basket. No model needed. |
| `npm run test:ai` | Real-model tests (downloads the model once). |
| `npm run embed` | Rebuilds `lib/matcher/menuEmbeddings.json` after a menu or tag change. |
| `npm run try -- "pulutan for 4, ₱800"` | Runs one query in the terminal and prints the scores. Good for the demo. |
