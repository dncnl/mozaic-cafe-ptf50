// Single source of truth for mozaic's real external links.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/mozaic.cbk",
  instagram: "https://www.instagram.com/mozaic.cbk",
  tiktok: "https://www.tiktok.com/@mozaic.cbk",
  foodpanda: "https://www.foodpanda.ph/restaurant/elag/mozaic-cafe-bar-and-kitchen-lakandula",
  grabfood:
    "https://food.grab.com/ph/en/restaurant/mozaic-coffee-bar-kitchen-mabalacat-delivery/2-C663MFDYTJ2DE6?sourceID=20260819_215353_764F51EDF1174AF5AD1FF033DABCFAB5_MEXMPS",
  messenger: "https://m.me/mozaic.cbk",
  whatsapp: "https://wa.me/639208340425",
  googleMaps: "https://maps.app.goo.gl/hgtcJ11VabbjQv486",
} as const;

export const SOCIAL_HANDLE = "@mozaic.cbk";

const BUSINESS_NAME = "Mozaic Cafe, Bar & Kitchen";

// Corrected Aug 2026 (owner-supplied). Supersedes the earlier Brgy. Lakandula
// address, which came off the foodpanda listing schema. This wording matches
// the address line printed on the holiday-blends and sip-&-spins pubmats.
const address =
  "Mac Arthur High Way (near St. Mutien College), Dau, Mabalacat, Pampanga, Philippines 2010";

export const LOCATION = {
  address,
  // Name + address rather than raw coordinates. The old hardcoded pair
  // (15.1848885, 120.5851871) pointed at Lakandula, not Dau, and inventing
  // replacements isn't allowed — a name search always resolves to the real
  // listing and can't go stale when details change.
  mapsQuery: `${BUSINESS_NAME}, ${address}`,
  phone: "+63 920 834 0425",
  phoneHref: "tel:+639208340425",
  hours: "Mon–Sun, 10:00 AM – 12:00 AM",
  hoursShort: "10:00am – 12:00am, daily",
  directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS_NAME}, ${address}`
  )}`,
} as const;

export const TAGLINE = "blend, sip, and gather";

// Second line from mozaic's own live site — used where the short tagline needs
// backing up with what the place actually is.
export const TAGLINE_LONG =
  "Where comfort food meets crafted drinks and unforgettable nights.";
