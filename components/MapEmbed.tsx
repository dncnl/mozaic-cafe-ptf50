import { LOCATION } from "@/lib/social";

interface MapEmbedProps {
  query?: string;
  className?: string;
}

export default function MapEmbed({
  query = LOCATION.mapsQuery,
  className = "",
}: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div
      className={`relative h-[360px] w-full overflow-hidden rounded-[var(--moz-radius-lg)] border-2 border-moz-blue sm:h-[440px] lg:h-full lg:min-h-[520px] ${className}`}
    >
      <iframe
        src={src}
        title="mozaic location map"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
