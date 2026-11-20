import type { Metadata } from "next";
import { Suspense } from "react";
import { menuItems } from "@/lib/mockData";
import MenuTabs from "@/components/MenuTabs";
import MenuTabsDeepLinked from "@/components/MenuTabsDeepLinked";
import MatcherTeaser from "@/components/MatcherTeaser";
import { StarMark } from "@/components/icons/StarMark";
import { LOCATION, TAGLINE } from "@/lib/social";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="flex-1">
      {/* Poster header: a blue band like the top of a printed menu card. */}
      <header className="moz-field moz-grain relative overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
          <div className="flex flex-col items-start gap-4">
            <p className="moz-micro inline-flex items-center gap-2">
              <StarMark className="h-3.5 w-3.5" />
              Cafe · Kitchen · Bar
            </p>
            <h1 className="moz-display">the menu</h1>
            <p className="text-lg text-moz-white/90">{TAGLINE}</p>
          </div>
          <dl className="hidden shrink-0 flex-col items-end gap-1 text-right sm:flex">
            <dt className="moz-micro text-moz-white/80">Open daily</dt>
            <dd className="font-display text-lg font-bold tracking-moz">{LOCATION.hoursShort}</dd>
          </dl>
        </div>
      </header>

      <div className="moz-paper">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:py-14">
          <MatcherTeaser variant="compact" />

          {/* Fallback renders the real menu on the default category, so the
              prerendered HTML is the full page rather than a placeholder. */}
          <Suspense fallback={<MenuTabs items={menuItems} />}>
            <MenuTabsDeepLinked items={menuItems} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
