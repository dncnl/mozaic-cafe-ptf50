# Cost computation (PTF50 §07-B)

**Project:** Mozaic Mood Matcher, for Mozaic Cafe, Bar & Kitchen, Dau, Mabalacat

| Cost component | How we estimated it | Estimated cost |
|---|---|---|
| AI tools or API usage | Transformers.js runs the model (all-MiniLM-L6-v2) **on the customer's own phone**. There's no API, no key and no per-use fee. The model downloads free from the Hugging Face Hub. | ₱0 |
| Hosting or deployment | Vercel Hobby (free tier) | ₱0 |
| Domain name | Skipped; we use the free `*.vercel.app` link | ₱0 |
| Other expenses | Printing a QR code poster for the counter that links to `/match` | ₱100 |
| Development effort | ___ members × ___ hours × ₱60/hour (illustrative student rate) | ₱_____ |
| **Total estimated project cost** | | **₱_____** |
| Less: educational subsidy | Discount because this is a student prototype | (₱_____) |
| **Proposed client payment** (optional) | Only if the client volunteers; ₱500–₱1,000 is the spec's range | **₱_____** |

**Cash expenses: ₱100**, for the QR poster only. Every tool we used is free: Next.js, Tailwind, Transformers.js, Lucide icons, GitHub and Vercel Hobby. The development value above is an estimate of work, not money we spent.

**Recurring costs for the client: ₱0 per month**, as long as the app stays on a free tier. Updating the menu means editing `lib/mockData.ts` and running `npm run embed`. Tell the client honestly how long the group can support this after the semester.
