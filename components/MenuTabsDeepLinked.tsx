"use client";

import { useSearchParams } from "next/navigation";
import MenuTabs from "./MenuTabs";
import { isMenuCategory } from "@/lib/rooms";
import type { MenuItem } from "@/lib/types";

/**
 * Reads the ?c= deep link the homepage posters point at (/menu?c=bar) and
 * hands it to MenuTabs as the opening category.
 *
 * Split out on purpose: useSearchParams opts a statically-prerendered route
 * into a Suspense boundary, so only this thin reader sits inside it. The
 * boundary's fallback renders the full menu on the default category, which
 * means the prerendered HTML is complete rather than a spinner.
 */
export default function MenuTabsDeepLinked({ items }: { items: MenuItem[] }) {
  const param = useSearchParams().get("c");

  return (
    <MenuTabs items={items} initialCategory={isMenuCategory(param) ? param : "cafe"} />
  );
}
