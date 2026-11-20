# /public/images/logo

The site logo is image-based only — no text wordmark, no placeholder box.

- `mozaic-logo-blue.png` — blue logo, transparent background. Used on
  light/white backgrounds (navbar, footer wordmark row is dark, so this one
  is navbar-only right now).
- `mozaic-logo-white.png` — white logo, transparent background. Used on the
  dark blue backgrounds (hero, footer).

Referenced directly via `next/image` in `components/Navbar.tsx`,
`components/Footer.tsx`, and `app/(site)/page.tsx` — no wrapper box, no
`ImagePlaceholder`, no duplicate text next to it.
