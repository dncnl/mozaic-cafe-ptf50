import { StarMark } from "@/components/icons/StarMark";

/**
 * The repeating name strip — mozaic's one reusable divider (mood board 2's
 * bottom band, translated). Static on purpose: it's a printed label, not a
 * ticker. The row is longer than any viewport and simply crops at the edges.
 * Decorative only.
 */

const WORDS = ["mozaic", "cafe", "kitchen", "bar"];

type BrandBandProps = {
  tone?: "blue" | "white";
  className?: string;
};

export default function BrandBand({ tone = "blue", className = "" }: BrandBandProps) {
  const isBlue = tone === "blue";
  const run = Array.from({ length: 6 }, () => WORDS).flat();

  return (
    <div
      aria-hidden
      className={`overflow-hidden ${
        isBlue ? "bg-moz-blue text-moz-white" : "bg-moz-white text-moz-blue"
      } ${className}`}
    >
      <div className="flex w-max items-center py-3.5">
        {run.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="px-5 font-display text-lg font-bold lowercase tracking-moz sm:text-xl">
              {word}
            </span>
            <StarMark className="h-3 w-3 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
