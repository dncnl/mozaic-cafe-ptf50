"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, PartyPopper, ShoppingBag, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";

type Tab = { href: string; label: string; match: string | null; icon: LucideIcon };

const tabs: Tab[] = [
  { href: "/", label: "Home", match: "/", icon: House },
  { href: "/menu", label: "Menu", match: "/menu", icon: UtensilsCrossed },
  // The AI matcher sits dead centre — the tab people reach for from the QR
  // code at the counter. Rendered as a raised blue sticker.
  { href: "/match", label: "Match", match: "/match", icon: Sparkles },
  { href: "/catering", label: "Events", match: "/catering", icon: PartyPopper },
  // Anchor into the homepage order section — never the "current page".
  { href: "/#order", label: "Order", match: null, icon: ShoppingBag },
];

/**
 * Tab bar in the sticker system: a white bar with a blue top rule, Lucide
 * icon over an 11px label. The active tab gets a solid blue pill behind its
 * icon (white icon on blue, 5.54:1); Match is always a raised blue sticker.
 */
export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      // pb via safe-area inset so the tabs clear the iOS home indicator.
      className="moz-glass fixed inset-x-0 bottom-0 z-30 border-t-2 border-moz-blue sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ href, label, match, icon: Icon }) => {
          const active = match !== null && pathname === match;
          const isMatch = href === "/match";

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 pt-1.5 pb-1 text-center font-display text-[11px] font-bold tracking-moz text-moz-blue"
            >
              {isMatch ? (
                <span
                  className={`-mt-6 mb-0.5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-moz-blue ${
                    active ? "bg-moz-white text-moz-blue" : "bg-moz-blue text-moz-white"
                  }`}
                  style={{ boxShadow: "0 0 0 4px var(--moz-white)" }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden />
                </span>
              ) : (
                <span
                  className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-moz-blue text-moz-white" : ""
                  }`}
                >
                  <Icon className="h-[20px] w-[20px]" strokeWidth={active ? 2.25 : 2} aria-hidden />
                </span>
              )}
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
