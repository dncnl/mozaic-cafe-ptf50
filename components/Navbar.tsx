"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { StarMark } from "./icons/StarMark";

const links = [
  { href: "/", label: "Home" },
  // About is a homepage section rather than a fourth route, so it's an anchor.
  { href: "/#about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/match", label: "Mood matcher" },
  { href: "/catering", label: "Catering" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    // Solid white bar with a blue rule. Fixed 64px height: MenuTabs' sticky offset depends on it
    // (top-[72px] = 64 + 8 gap).
    <header className="moz-glass sticky top-0 z-30 border-b-2 border-moz-blue">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center" aria-label="mozaic — home">
          <Image
            src="/images/logo/mozaic-logo-blue-trim.png"
            alt="mozaic — cafe, bar, & kitchen"
            width={577}
            height={144}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Text links are desktop-only in practice — MobileTabBar covers small
            screens, so duplicating them here just crowded the bar. */}
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`hidden items-center gap-1.5 px-3 py-2 font-display text-[0.95rem] font-semibold tracking-moz text-moz-blue underline-offset-[6px] sm:inline-flex ${
                  active ? "underline decoration-2" : "hover:underline"
                }`}
              >
                {active ? <StarMark className="h-2.5 w-2.5" /> : null}
                {link.label}
              </Link>
            );
          })}

          {/* Same target as the tab bar's Order tab: both delivery platforms. */}
          <Link
            href="/#order"
            className="moz-btn ml-3 inline-flex min-h-10 items-center rounded-full bg-moz-blue px-5 font-display text-base font-bold tracking-moz text-moz-white"
          >
            Order
          </Link>
        </nav>
      </div>
    </header>
  );
}
