/**
 * The mozaic star.
 *
 * Appears in 6 of the 11 supplied pubmats — the most repeated non-logo element
 * in the set. It is used there as punctuation inside a headline, as a pointer
 * annotating a labelled drink, and as a standalone accent.
 *
 * Deliberately NOT a sunburst/ray badge: concave arms, sharp points, solid
 * fill, currentColor-driven like the rest of the icon set.
 */

type MarkProps = { className?: string };

export function StarMark({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Deep concave arms — the pubmat star is spiky, not a fat pentagram. */}
      <path d="M12 0.5 14.35 8.1 21.9 5.2 16.6 12 21.9 18.8 14.35 15.9 12 23.5 9.65 15.9 2.1 18.8 7.4 12 2.1 5.2 9.65 8.1Z" />
    </svg>
  );
}

/** Four-point sparkle variant (the anniversary pubmat). */
export function SparkMark({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 0.5C12 7 12.6 11.4 23.5 12 12.6 12.6 12 17 12 23.5 12 17 11.4 12.6 0.5 12 11.4 11.4 12 7 12 0.5Z" />
    </svg>
  );
}

export default StarMark;
