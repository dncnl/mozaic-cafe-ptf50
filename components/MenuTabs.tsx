"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Coffee, Martini, UtensilsCrossed, type LucideIcon } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { PosterFallback } from "@/components/CategoryPosters";
import { StarMark } from "@/components/icons/StarMark";
import Ticket from "@/components/brand/Ticket";
import { ROOMS, ROOM_BY_CATEGORY, POSTER_ASPECT } from "@/lib/rooms";
import type { MenuCategory, MenuItem } from "@/lib/types";

// One plain, recognizable glyph per room for the segmented control.
const ROOM_ICONS: Record<MenuCategory, LucideIcon> = {
  cafe: Coffee,
  kitchen: UtensilsCrossed,
  bar: Martini,
};

function groupItems(items: MenuItem[]) {
  const groups = new Map<string, MenuItem[]>();
  for (const item of items) {
    const key = item.group ?? "";
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return [...groups.entries()];
}

/**
 * The active room's poster, as a portrait panel alongside its description.
 *
 * Rendered with key={category} by the caller so switching rooms remounts it and
 * clears `failed` — one missing export can't suppress the artwork for the
 * other two.
 */
function RoomPanel({ category }: { category: MenuCategory }) {
  const room = ROOM_BY_CATEGORY[category];
  const [failed, setFailed] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      {/* Native 1:root-2 — the artboards put the wordmark at the top and let
          the illustration bleed off the bottom, so a wide crop would show a
          strip of empty blue field. Hidden on mobile where it'd cost a screen. */}
      <div
        className="moz-poster relative hidden w-full lg:block"
        style={{ aspectRatio: POSTER_ASPECT }}
      >
        {room.src && !failed ? (
          <Image
            src={room.src}
            alt={`mozaic ${room.word}`}
            fill
            sizes="260px"
            priority
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <PosterFallback word={room.word} />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p className="moz-micro inline-flex w-fit items-center gap-1.5 rounded-full bg-moz-blue px-3 py-1.5 text-moz-white">
          <StarMark className="h-3 w-3" />
          {room.label}
        </p>
        <p className="font-display text-5xl font-extrabold lowercase leading-[0.9] tracking-moz text-moz-blue sm:text-6xl">
          {room.word}
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-moz-ink">{room.blurb}</p>
      </div>
    </div>
  );
}

export default function MenuTabs({
  items,
  initialCategory = "cafe",
}: {
  items: MenuItem[];
  /** Deep link from the homepage posters — see MenuTabsDeepLinked. */
  initialCategory?: MenuCategory;
}) {
  const [active, setActive] = useState<MenuCategory>(initialCategory);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectCategory(next: MenuCategory) {
    setActive(next);
    // Keep the URL shareable without pushing a history entry per tab click.
    const url = new URL(window.location.href);
    url.searchParams.set("c", next);
    window.history.replaceState(null, "", url);
  }

  // Roving arrow-key navigation — the tablist had none, so keyboard users could
  // reach it but not move within it as a tablist is expected to behave.
  function onKeyDown(event: React.KeyboardEvent) {
    const current = ROOMS.findIndex((room) => room.category === active);
    let next = current;

    if (event.key === "ArrowRight") next = (current + 1) % ROOMS.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + ROOMS.length) % ROOMS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ROOMS.length - 1;
    else return;

    event.preventDefault();
    selectCategory(ROOMS[next].category);
    tabRefs.current[next]?.focus();
  }

  const groups = groupItems(items.filter((item) => item.category === active));
  const activeIndex = ROOMS.findIndex((room) => room.category === active);
  const addOns = groups.find(([name]) => name === "Add-ons");
  const listGroups = groups.filter(([name]) => name !== "Add-ons");

  return (
    <div className="flex flex-col gap-12">
      {/* White strip under the navbar so the control stays legible over the
          lists scrolling beneath it. Mobile docks flush to the 64px navbar;
          sm+ floats 8px below it (top-[72px]). */}
      <div className="moz-glass-light sticky top-16 z-20 -mx-6 border-b-2 border-moz-blue px-6 py-2 sm:top-[72px] sm:mx-0 sm:w-full sm:max-w-xl sm:rounded-full sm:border-b-0 sm:p-0">
        <div
          role="tablist"
          aria-label="Menu categories"
          onKeyDown={onKeyDown}
          className="moz-segmented w-full"
          style={
            {
              "--moz-seg-index": activeIndex,
              "--moz-seg-count": ROOMS.length,
            } as React.CSSProperties
          }
        >
          {/* One thumb, slid by --moz-seg-index (see .moz-segmented-thumb). */}
          <span aria-hidden className="moz-segmented-thumb" />
          {ROOMS.map((room, index) => {
            const isActive = active === room.category;
            const Icon = ROOM_ICONS[room.category];
            return (
              <button
                key={room.category}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`menu-tab-${room.category}`}
                aria-selected={isActive}
                aria-controls={`menu-panel-${room.category}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectCategory(room.category)}
                className={`relative z-10 flex min-h-[42px] items-center justify-center gap-2 rounded-full px-3 font-display text-base font-bold tracking-moz transition-colors duration-300 ${
                  isActive ? "text-moz-white" : "text-moz-blue"
                }`}
              >
                <Icon
                  aria-hidden
                  className="h-4 w-4"
                  strokeWidth={2.25}
                />
                {room.label}
              </button>
            );
          })}
        </div>
      </div>

      <section
        role="tabpanel"
        id={`menu-panel-${active}`}
        aria-labelledby={`menu-tab-${active}`}
        tabIndex={0}
        className="flex flex-col gap-12"
      >
        <RoomPanel key={active} category={active} />

        {/* Groups flow into two columns on desktop — each group is one inset
            list (iOS Settings shape), so the page reads as a set of short,
            scannable lists instead of one long one. break-inside-avoid keeps a
            group from splitting across the column gap. */}
        <div className="gap-8 lg:columns-2">
          {listGroups.map(([groupName, groupItemsList]) => (
            <div key={groupName} className="mb-8 break-inside-avoid">
              <div className="moz-group">
                {/* Group header as the blue label strip off a pastry box
                    (mood board 2's "TOAST" band). */}
                {groupName && (
                  <div className="flex items-center justify-between gap-3 bg-moz-blue px-[1.125rem] py-3 text-moz-white">
                    <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold lowercase leading-none tracking-moz">
                      <StarMark className="h-4 w-4 shrink-0" />
                      {groupName}
                    </h2>
                    <span className="moz-micro">{groupItemsList.length} items</span>
                  </div>
                )}
                {groupItemsList.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modifiers don't need a description column — a dense two-column
            price list reads better. */}
        {addOns ? (
          <div className="moz-group">
            <div className="flex items-center justify-between gap-3 bg-moz-blue px-[1.125rem] py-3 text-moz-white">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold lowercase leading-none tracking-moz">
                <StarMark className="h-4 w-4 shrink-0" />
                add-ons
              </h2>
              <span className="moz-micro">{addOns[1].length} items</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {addOns[1].map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-[var(--moz-hairline)] px-[1.125rem] py-3 font-sans text-[15px] text-moz-ink"
                >
                  <span>{item.name}</span>
                  <span className="font-display font-extrabold tabular-nums text-moz-blue">
                    +₱{item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {active === "bar" && (
          <Ticket
            className="w-full max-w-sm -rotate-1 self-start"
            notchAt="3.1rem"
            stub={
              <p className="moz-micro flex items-center gap-1.5">
                <StarMark className="h-3.5 w-3.5" />
                Happy hour · 5–9PM
              </p>
            }
          >
            <p className="font-display text-4xl font-extrabold lowercase leading-none tracking-moz">
              30% off cocktails
            </p>
          </Ticket>
        )}
      </section>
    </div>
  );
}
