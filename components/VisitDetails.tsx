import { Clock, MapPin, Navigation, Phone, type LucideIcon } from "lucide-react";
import { LOCATION } from "@/lib/social";

/**
 * Address / hours / phone as an inset grouped list with leading icons — the
 * iOS contact-card shape. One component so the homepage "find us" card and
 * the catering page can't drift apart (they previously duplicated the markup
 * with slightly different line breaks).
 */

type Row = { icon: LucideIcon; label: string; value: string; href?: string };

const ROWS: Row[] = [
  { icon: MapPin, label: "Address", value: LOCATION.address },
  { icon: Clock, label: "Hours", value: LOCATION.hours },
  { icon: Phone, label: "Phone", value: LOCATION.phone, href: LOCATION.phoneHref },
];

export default function VisitDetails({
  showDirections = true,
  className = "",
}: {
  showDirections?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <ul className="moz-group">
        {ROWS.map(({ icon: Icon, label, value, href }) => {
          const body = (
            <>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moz-blue text-moz-white">
                <Icon aria-hidden className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="moz-micro text-moz-blue">{label}</span>
                <span
                  className={`text-[15px] leading-snug ${
                    href ? "font-display text-lg font-bold tracking-moz text-moz-blue" : "text-moz-ink"
                  }`}
                >
                  {value}
                </span>
              </span>
            </>
          );

          return (
            <li key={label} className="moz-group-row !p-0">
              {href ? (
                <a href={href} className="moz-group-row flex items-center gap-3.5">
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-3.5 px-[1.125rem] py-3.5">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      {showDirections ? (
        <a
          href={LOCATION.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="moz-btn inline-flex items-center justify-center gap-2 bg-moz-blue px-6 py-3.5 font-display text-base font-bold tracking-moz text-moz-white"
        >
          <Navigation aria-hidden className="h-4 w-4" strokeWidth={2.25} />
          Get directions
        </a>
      ) : null}
    </div>
  );
}
