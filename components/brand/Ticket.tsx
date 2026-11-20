import type { CSSProperties, ReactNode } from "react";

/**
 * Coupon-shaped surface (mood board 2): notches bitten from both long sides,
 * an optional stub above a dashed perforation. Used for hours, the delivery
 * CTA and the matcher's group basket.
 *
 * The notch sits at the perforation when there's a stub — set via
 * --moz-notch-at from the stub's height — otherwise mid-height.
 */

type TicketProps = {
  stub?: ReactNode;
  children: ReactNode;
  tone?: "blue" | "white";
  className?: string;
  /** Distance from the top to the perforation, e.g. "4.5rem". */
  notchAt?: string;
};

export default function Ticket({
  stub,
  children,
  tone = "blue",
  className = "",
  notchAt,
}: TicketProps) {
  const isBlue = tone === "blue";

  return (
    <div
      className={`moz-ticket ${
        isBlue ? "bg-moz-blue text-moz-white" : "bg-moz-white text-moz-blue"
      } ${className}`}
      style={notchAt ? ({ "--moz-notch-at": notchAt } as CSSProperties) : undefined}
    >
      {stub ? (
        <>
          <div className="px-6 pt-5 pb-4">{stub}</div>
          <div className="moz-perf mx-5" />
        </>
      ) : null}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
