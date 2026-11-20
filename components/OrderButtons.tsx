import { FoodpandaIcon, GrabfoodIcon } from "./icons/BrandIcons";
import LinkButtonRow, { type LinkChannel } from "./LinkButtonRow";
import { SOCIAL_LINKS } from "@/lib/social";

// Add a new delivery platform here — no component changes needed.
const DELIVERY_PROVIDERS: LinkChannel[] = [
  {
    provider: "foodpanda",
    label: "Order delivery on foodpanda",
    href: SOCIAL_LINKS.foodpanda,
    icon: FoodpandaIcon,
    bgClass: "bg-brand-foodpanda",
  },
  {
    provider: "grabfood",
    label: "Order delivery on GrabFood",
    href: SOCIAL_LINKS.grabfood,
    icon: GrabfoodIcon,
    bgClass: "bg-brand-grabfood",
  },
];

export default function OrderButtons({ className = "" }: { className?: string }) {
  return <LinkButtonRow channels={DELIVERY_PROVIDERS} className={className} />;
}
