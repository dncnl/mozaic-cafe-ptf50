import Link from "next/link";
import { ArrowUpRight, ChevronRight, Search, Sparkles } from "lucide-react";
import { StarMark } from "./icons/StarMark";

const PROMPTS = ["Sweet and cold, no coffee, under ₱150", "Pulutan for 4, ₱800", "Ulam para sa 2, walang baboy"];

const href = (q: string) => `/match?q=${encodeURIComponent(q)}`;

/**
 * Entry points into the AI matcher.
 *
 * `full` is the homepage's blue feature panel: its "search field" is a real
 * link styled as the input the customer will type into, and each sample
 * prompt opens the matcher with that query already running.
 * `compact` is the one-line nudge at the top of the menu page.
 */
export default function MatcherTeaser({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <Link
        href="/match"
        className={`moz-group moz-group-row flex items-center gap-3.5 sm:max-w-xl ${className}`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moz-blue text-moz-white">
          <Sparkles aria-hidden className="h-5 w-5" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-display text-lg font-bold tracking-moz text-moz-blue">Can&apos;t decide?</span>
          <span className="text-sm text-moz-ink">Describe what you want and the mood matcher picks.</span>
        </span>
        <ChevronRight aria-hidden className="h-5 w-5 shrink-0 text-moz-blue" strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <div className={`moz-panel moz-grain flex flex-col justify-between gap-10 p-7 sm:p-10 ${className}`}>
      <div className="relative z-10 flex flex-col items-start gap-4">
        <p className="moz-micro inline-flex items-center gap-2">
          <StarMark className="h-3.5 w-3.5" />
          Mood matcher
        </p>
        <h2 className="moz-h2 max-w-lg">not sure what to order?</h2>
        <p className="max-w-md text-lg leading-relaxed text-moz-white/90">
          Type your taste, budget, and who you&apos;re with. An AI that runs on your phone picks
          from all three menus.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <Link
          href="/match"
          className="moz-btn flex items-center gap-3 rounded-full bg-moz-white py-2 pr-2 pl-5 text-left text-moz-blue"
        >
          <Search aria-hidden className="h-5 w-5 shrink-0" strokeWidth={2.5} />
          <span className="flex-1 font-display text-lg font-bold tracking-moz">
            What are you craving?
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moz-blue text-moz-white">
            <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </Link>
        <ul className="flex flex-wrap gap-2">
          {PROMPTS.map((prompt) => (
            <li key={prompt}>
              <Link
                href={href(prompt)}
                className="moz-btn inline-flex items-center border-2 border-moz-white/70 px-4 py-2 text-sm font-medium hover:border-moz-white hover:bg-moz-white hover:text-moz-blue"
              >
                {prompt}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
