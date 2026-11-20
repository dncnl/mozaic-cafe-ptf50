import type { ComponentType } from "react";
import { FacebookIcon, InstagramIcon, TiktokIcon, FoodpandaIcon } from "./icons/BrandIcons";

export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "foodpanda";

const platforms: Record<
  SocialPlatform,
  { label: string; Icon: ComponentType<{ className?: string }>; className: string }
> = {
  facebook: {
    label: "Facebook",
    Icon: FacebookIcon,
    className: "bg-brand-facebook text-white",
  },
  instagram: {
    label: "Instagram",
    Icon: InstagramIcon,
    className: "bg-instagram-gradient text-white",
  },
  tiktok: {
    label: "TikTok",
    Icon: TiktokIcon,
    className: "bg-brand-tiktok text-white",
  },
  foodpanda: {
    label: "foodpanda",
    Icon: FoodpandaIcon,
    className: "bg-brand-foodpanda text-white",
  },
};

interface SocialButtonProps {
  platform: SocialPlatform;
  href: string;
  handle?: string;
  variant?: "tile" | "pill" | "icon";
  /** White sticker with a blue mark instead of the platform colour — for
   *  placements inside a blue brand panel (footer). */
  mono?: boolean;
  className?: string;
}

export default function SocialButton({
  platform,
  href,
  handle,
  variant = "pill",
  mono = false,
  className = "",
}: SocialButtonProps) {
  const { label, Icon, className: platformClass } = platforms[platform];
  const brandClass = mono ? "bg-moz-white text-moz-blue" : platformClass;

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={`moz-btn flex h-11 w-11 items-center justify-center ${brandClass} ${className}`}
      >
        <Icon className="h-5 w-5" />
      </a>
    );
  }

  if (variant === "tile") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // moz-lift rather than the old hover that translated the tile away
        // from a static hard shadow — the shadow now moves with it.
        className={`moz-lift flex flex-col items-center justify-center gap-3 rounded-moz-lg p-6 text-center lg:gap-4 lg:p-10 ${brandClass} ${className}`}
      >
        <Icon className="h-9 w-9 lg:h-12 lg:w-12" />
        <div>
          <p className="font-display text-lg font-bold tracking-moz lg:text-2xl">{label}</p>
          {handle && <p className="font-sans text-xs text-white/85 lg:text-sm">{handle}</p>}
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`moz-btn inline-flex items-center gap-2 px-4 py-2 font-display text-sm font-bold tracking-moz ${brandClass} ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
