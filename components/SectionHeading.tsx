import { StarMark } from "@/components/icons/StarMark";

/**
 * The standard section header — the type system in one place:
 * utility label (star + small caps) → display/h2 headline → body subtitle.
 *
 * tone: "dark" = on white/cream (blue type), "light"/"blue" = on a blue
 * ground (white type).
 */

type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "dark" | "light" | "blue";
  star?: boolean;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  star = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone !== "dark";

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {label ? (
        <p
          className={`moz-micro inline-flex items-center gap-2 ${
            isLight ? "text-moz-white" : "text-moz-blue"
          }`}
        >
          {star ? <StarMark className="h-3.5 w-3.5" /> : null}
          {label}
        </p>
      ) : null}

      <Tag
        className={`${Tag === "h1" ? "moz-display" : "moz-h2"} max-w-4xl ${
          isLight ? "text-moz-white" : "text-moz-blue"
        }`}
      >
        {title}
      </Tag>

      {subtitle ? (
        <p
          className={`max-w-xl text-lg leading-relaxed ${
            isLight ? "text-moz-white/90" : "text-moz-ink"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
