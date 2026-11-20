import Image from "next/image";
import { GoogleIcon } from "./icons/BrandIcons";
import SectionHeading from "./SectionHeading";
import { reviews } from "@/lib/mockData";
import { SOCIAL_LINKS } from "@/lib/social";
import type { Review } from "@/lib/types";

function StarIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.5l2.9 6.06 6.6.79-4.87 4.6 1.28 6.55L12 17.3l-5.91 3.2 1.28-6.55-4.87-4.6 6.6-.79z"
        fill={filled ? "var(--color-star)" : "none"}
        stroke={filled ? "none" : "var(--color-star)"}
        strokeWidth={filled ? 0 : 1.5}
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} className="h-3.5 w-3.5" />
      ))}
    </div>
  );
}

function ReviewAvatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  if (photoUrl) {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image src={photoUrl} alt={name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moz-blue font-display text-sm font-bold text-moz-white">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function ReviewCard({
  review,
  hidden = false,
}: {
  review: Review;
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden}
      className="flex w-80 shrink-0 flex-col gap-3 rounded-[var(--moz-radius-lg)] bg-moz-white p-6 sm:w-96"
    >
      <div className="flex items-center gap-3">
        <ReviewAvatar name={review.name} photoUrl={review.photo_url} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold tracking-moz text-moz-blue">
            {review.name}
          </p>
          <StarRating rating={review.rating} />
        </div>
      </div>
      {/* Not clamped to a fixed height — real reviews vary a lot in length and
          the placeholders here are all short. */}
      <p className="line-clamp-6 text-sm leading-relaxed text-moz-ink">{review.text}</p>
      <p className="moz-micro mt-auto text-moz-blue">{review.date}</p>
    </div>
  );
}

/**
 * Every entry in lib/mockData.ts -> reviews is still a literal
 * "REPLACE WITH REAL ..." placeholder, and this strip renders on every page.
 * Shipping placeholder-shaped review cards would read as real testimonials, so
 * the section renders nothing until actual reviews are transcribed from the
 * Google listing. The component stays wired — it lights up on its own the
 * moment real content lands.
 */
function hasRealReviews() {
  return reviews.some((review) => !/^REPLACE WITH/i.test(review.name.trim()));
}

export default function ReviewMarquee() {
  if (!hasRealReviews()) return null;

  return (
    <section className="moz-field moz-grain overflow-hidden py-20 lg:py-24">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading label="Reviews" title="what people are saying" star tone="blue" />
          <a
            href={SOCIAL_LINKS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="moz-btn moz-btn-base moz-btn-white shrink-0"
          >
            <GoogleIcon className="h-4 w-4" />
            All reviews on Google
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-10" role="region" aria-label="Customer reviews">
        <div className="animate-marquee flex w-max gap-5 px-6">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} hidden={i >= reviews.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
