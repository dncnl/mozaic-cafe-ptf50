import type { ReactNode } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/types";

interface MenuCardProps {
  item: MenuItem;
  /** Optional extra line under the description (the matcher's "why"). */
  footnote?: ReactNode;
  /** Optional element before the name (rank star, room badge). */
  leading?: ReactNode;
}

/**
 * One menu item, as a row inside an inset grouped list (`.moz-group`).
 *
 * Apple-list shape: name and description stacked on the leading side, price
 * trailing, rows divided by inset hairlines that the parent group draws. The
 * row itself has no card, border, or hover animation.
 *
 * The photo is an enhancement rather than a reserved slot: every item still
 * has `image_url: null`, and reserving a thumbnail for each rendered ~98
 * identical placeholder tiles. No image means no box; supply a real photo and
 * the thumb returns automatically, so there's only one layout to maintain.
 */
export default function MenuCard({ item, footnote, leading }: MenuCardProps) {
  const hasPhoto = Boolean(item.image_url);

  return (
    <div className="moz-group-row flex items-start gap-3.5">
      {hasPhoto && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-moz-sm border-2 border-moz-blue sm:h-16 sm:w-16">
          <Image
            src={item.image_url as string}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-4">
          {/* Wraps rather than truncates — a clipped dish name is the one piece
              of text on this row that has to stay complete. */}
          <h3 className="flex items-baseline gap-2 font-sans text-[15px] font-semibold leading-snug text-moz-ink sm:text-base">
            {leading}
            {item.name}
          </h3>
          <span className="shrink-0 font-display text-lg font-extrabold leading-none tracking-moz text-moz-blue tabular-nums">
            ₱{item.price.toLocaleString("en-PH")}
          </span>
        </div>

        {item.description && (
          <p className="max-w-prose text-sm leading-relaxed text-moz-blue">
            {item.description}
          </p>
        )}

        {footnote}

        {!item.is_available && (
          <span className="moz-micro pt-1 text-moz-blue">Unavailable</span>
        )}
      </div>
    </div>
  );
}
