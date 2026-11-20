import type { ComponentType } from "react";

/**
 * One primitive for the site's stacked brand-colored CTA buttons.
 *
 * OrderButtons and ContactButtons were byte-identical apart from an optional
 * icon; both now render through this. Keeps the config-array-driven pattern —
 * adding a delivery platform or contact channel stays a one-entry data change,
 * never a component edit.
 */

export interface LinkChannel {
  provider: string;
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  bgClass: string;
}

interface LinkButtonRowProps {
  channels: LinkChannel[];
  className?: string;
}

/**
 * tel: and mailto: are handled by the OS, not a browser tab — opening them
 * with target="_blank" leaves a stranded blank tab behind on desktop. The old
 * ContactButtons applied it to every channel including the "Call us" tel: link.
 */
function isExternalHttp(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function LinkButtonRow({
  channels,
  className = "",
}: LinkButtonRowProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {channels.map(({ provider, label, href, icon: Icon, bgClass }) => {
        const external = isExternalHttp(href);

        return (
          <a
            key={provider}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`moz-btn flex items-center justify-center gap-3 ${bgClass} px-8 py-4 text-center font-display text-base font-bold tracking-moz text-moz-white`}
          >
            {Icon ? <Icon className="h-7 w-7 shrink-0" /> : null}
            {label}
          </a>
        );
      })}
    </div>
  );
}
