# User testing (PTF50 §06-B)

**Target:** 3–5 testers, made up of Mozaic customers and at least one staff member, each on their own phone at `https://<project>.vercel.app/match`.

**Privacy (RA 10173):** Ask before taking photos or quoting anyone. Record first names or initials only, and only with consent. The matcher doesn't collect anything: queries stay on the device.

## Script (about 5 minutes per tester)

1. "Imagine it's your first time here. Use this to find something to order." Hand them the phone and say nothing else.
2. Watch and note where they hesitate, what they type, and whether they use the example prompts.
3. Ask them to try one group order, for example "for 4 people, ₱800".
4. Have them fill in the feedback form (the link appears under the results, set up in `docs/SETUP.md` step 4).

## Results

| Tester | Role | Easy to use (1–5) | AI helpful (1–5) | What confused them | One improvement | Consent to quote |
|---|---|---|---|---|---|---|
| T1 | | | | | | |
| T2 | | | | | | |
| T3 | | | | | | |
| T4 | | | | | | |
| T5 | | | | | | |

**Averages:** easy ___ / 5, helpful ___ / 5

## Observations

- What did they type? (Copy their real queries. They make the best new example prompts.)
- Did the first-visit download (about 30 s) put anyone off?
- Did any recommendation break a rule they stated, such as a budget or "no X"? If so, log the exact query: it's a bug.

## Improvement made (or planned)

| What we saw | What we changed | Commit or plan |
|---|---|---|
| | | |

Possible improvements to watch for:
- add temperature tags once the owner confirms which drinks are hot or iced
- add testers' own phrasings as example chips
- tune a negation the parser missed
- add a "cheapest first" toggle
