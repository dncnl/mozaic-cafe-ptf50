import type { MenuCategory } from "./types";

/**
 * The three sides — mozaic's own cafe / kitchen / bar posters.
 *
 * These are three menus served out of ONE room, not three separate rooms;
 * customer-facing copy must not imply the cafe, kitchen, and bar are
 * different addresses or spaces.
 *
 * Shared by the homepage 3-up and the menu page's poster panel so the artwork,
 * wording, and ordering can't drift apart.
 *
 * The artboards are 1600x2263 (1:root-2 portrait) with the wordmark at the top
 * and the illustration bleeding off the bottom edge, so they must be rendered
 * at their native ratio — cropping them to a wide box yields a strip of empty
 * blue field. POSTER_ASPECT is that ratio, kept here next to the paths.
 */
export const POSTER_ASPECT = "1 / 1.414";

export interface Room {
  category: MenuCategory;
  word: string;
  label: string;
  blurb: string;
  src: string;
}

// Blurbs are mozaic's own copy, taken from their live site — not written here.
export const ROOMS: Room[] = [
  {
    category: "cafe",
    word: "cafe",
    label: "Cafe",
    blurb:
      "From handcrafted coffee to sweet pastries and light bites, our café is your go-to spot for study sessions, catch-ups, or quiet mornings.",
    src: "/images/pubmats/moz-cafe.webp",
  },
  {
    category: "kitchen",
    word: "kitchen",
    label: "Kitchen",
    blurb:
      "Craving Filipino comfort food or modern favorites? Our kitchen serves hearty meals made to satisfy — from lunch rush to late-night cravings.",
    src: "/images/pubmats/moz-kitchen.webp",
  },
  {
    category: "bar",
    word: "bar",
    label: "Bar",
    blurb:
      "Unwind with signature cocktails, curated drinks, and good vibes. Whether it's a chill night or a celebration, the bar is always ready.",
    src: "/images/pubmats/moz-bar.webp",
  },
];

export const ROOM_BY_CATEGORY: Record<MenuCategory, Room> = Object.fromEntries(
  ROOMS.map((room) => [room.category, room])
) as Record<MenuCategory, Room>;

export function isMenuCategory(value: string | null): value is MenuCategory {
  return value === "cafe" || value === "kitchen" || value === "bar";
}
