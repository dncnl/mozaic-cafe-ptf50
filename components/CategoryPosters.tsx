import { StarMark } from "./icons/StarMark";

/**
 * Poster construction minus the illustration — the menu page's room panel
 * renders this if a cafe/kitchen/bar artboard ever fails to load.
 * (The homepage poster grid that used to live here was retired in the
 * Nov 2026 art-direction pass; the posters now appear in the hero.)
 */
export function PosterFallback({ word }: { word: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <StarMark className="h-6 w-6 text-moz-white/80" />
      <span className="font-display text-5xl font-extrabold lowercase leading-none tracking-moz text-moz-white lg:text-6xl">
        {word}
      </span>
    </div>
  );
}
