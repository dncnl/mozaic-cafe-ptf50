"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children once they scroll into view.
 *
 * Deliberately a small IntersectionObserver rather than a motion library or
 * `animation-timeline: view()` — the former isn't a dependency this project
 * needs, and the latter still isn't in Safari or Firefox. The actual transition
 * lives in globals.css (.moz-reveal / .is-in) so reduced-motion is handled in
 * one place alongside every other animation.
 *
 * Observes once and disconnects: these are entrances, not scroll-linked
 * effects, so there's nothing to keep watching.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger offset in ms, for siblings in a grid. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If it's already on screen at mount (above the fold), skip the observer
    // and show immediately — otherwise there's a frame of invisible content.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`moz-reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? ({ "--moz-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
