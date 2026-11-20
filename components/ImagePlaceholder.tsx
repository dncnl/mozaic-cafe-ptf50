"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePlaceholderProps {
  src?: string | null;
  alt: string;
  label?: string;
  aspectRatio?: string;
  variant?: "brand" | "dark" | "light";
  className?: string;
  /** For small thumbnails where the full label can't legibly fit — shows a single initial instead. */
  compact?: boolean;
}

// "No photo yet" is the common case on this site, not the edge case — every
// menu item and social post currently lands here. The fallback is styled as
// the poster template (blue field + grain), so it reads as a designed state
// rather than a gap waiting to be filled.
const variantClasses: Record<NonNullable<ImagePlaceholderProps["variant"]>, string> = {
  brand: "moz-field moz-grain",
  dark: "bg-moz-ink text-moz-white",
  light: "moz-paper text-moz-blue",
};

export default function ImagePlaceholder({
  src,
  alt,
  label,
  aspectRatio = "aspect-[4/3]",
  variant = "brand",
  className = "",
  compact = false,
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div
      className={`relative overflow-hidden rounded-moz-sm ${aspectRatio} ${className}`}
    >
      {showFallback ? (
        <div
          className={`relative flex h-full w-full items-center justify-center text-center ${
            compact ? "p-1" : "p-4"
          } ${variantClasses[variant]}`}
        >
          {compact ? (
            <span className="font-display font-extrabold text-xl lowercase leading-none tracking-moz sm:text-2xl">
              {(label ?? alt).charAt(0)}
            </span>
          ) : (
            <span className="font-display text-sm font-bold lowercase leading-tight tracking-moz sm:text-base">
              {label ?? alt}
            </span>
          )}
        </div>
      ) : (
        <Image
          src={src as string}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
