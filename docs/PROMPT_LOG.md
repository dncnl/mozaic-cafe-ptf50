# Prompt log

PTF50 §06-A asks every group to keep a log of the main prompts given to AI coding assistants and to include a few in the report's appendix. Add a row each time an AI assistant writes or changes something significant. Record what you checked yourself as well, because the spec says "test, don't trust."

| # | Date | Tool | Prompt (verbatim or close) | What it produced | How we checked it |
|---|---|---|---|---|---|
| 1 | 2026-11-20 | Claude Code | "Don't do any code changes, propose a refactor in adherence to PTF50 project specification" (with the spec PDF attached) | A refactor plan: add an embedding-based matcher, fix the CSP, cut the inert admin scaffold, and list the deliverables | Read it against the rubric and approved it |
| 2 | 2026-11-20 | Claude Code | "Provide an audit on the outdated design guidelines this site contains" | A list of stale CLAUDE.md and README claims (placeholder reviews, unused images, legacy CSS) | Checked each claim against the code |
| 3 | 2026-11-20 | Claude Code | "Commit the design overhaul using Remotion but keeping it light enough for mobile and PC viewing; keep branding but implement an Apple-like design system using simple recognizable icons; split and build in phases the AI functionality" | 6 commits: the design system, the Remotion hero and AI phases 1–4 | `npm test`, `npm run test:ai`, a production build, and headless Chrome e2e on mobile and desktop |
| 4 | 2026-11-20 | Claude Code | "Take note of the unused admin Supabase legacy code and omit it now" | Removed `/admin`, `/api/menu`, the fake auth, the Supabase client and its dependency, legacy CSS shims and env example; the site is now fully static | Production build route list has no `/admin` or `/api`; tests, lint and build pass |
| 5 | | | | | |

## Prompts worth quoting in the report

- **Why the matcher is hybrid.** Ask the assistant to explain why "no coffee" can't be left to the embedding model. The short answer is that negation embeds close to its opposite. Show the `npm run try` output.
- **A bug the AI introduced and we caught.** The first browser run failed with `Failed to fetch dynamically imported module: blob:…`. Transformers.js was loading the ONNX engine through a `blob:` URL, which our CSP blocks. The fix was `env.useWasmCache = false` in `lib/matcher/worker.ts`. This is a good "test, don't trust" example.
- **A design regression we caught.** An unlayered `a.moz-group-row { display: block }` rule overrode Tailwind's `flex`, which broke the list rows. We found it in screenshots and fixed it in `app/globals.css`.
