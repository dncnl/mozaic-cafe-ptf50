import Image from "next/image";
import Link from "next/link";
import SocialButton from "./SocialButton";
import { LOCATION, SOCIAL_LINKS, TAGLINE } from "@/lib/social";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/match", label: "Mood matcher" },
  { href: "/catering", label: "Catering" },
];

/**
 * Footer: flat brand blue. Logo at its working size, the tagline, and three
 * plain columns — visit, find us, follow. The mobile bottom padding keeps the
 * fixed tab bar off the copyright line.
 */
export default function Footer() {
  return (
    <footer className="moz-field pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5 sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/mozaic-logo-white-trim.png"
              alt="mozaic"
              width={576}
              height={144}
              className="h-10 w-auto"
            />
            <p className="moz-h3 max-w-xs">{TAGLINE}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className="moz-micro mb-1 text-moz-white/80">Visit</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit font-display text-lg font-semibold tracking-moz underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className="moz-micro mb-1 text-moz-white/80">Find us</p>
            <p className="leading-relaxed text-moz-white/90">{LOCATION.address}</p>
            <p className="text-moz-white/90">{LOCATION.hours}</p>
            <a
              href={LOCATION.phoneHref}
              className="w-fit whitespace-nowrap font-display text-lg font-semibold tracking-moz underline decoration-2 underline-offset-4 hover:opacity-80"
            >
              {LOCATION.phone}
            </a>
            <div className="mt-3 flex items-center gap-3">
              <SocialButton platform="facebook" href={SOCIAL_LINKS.facebook} variant="icon" mono />
              <SocialButton platform="instagram" href={SOCIAL_LINKS.instagram} variant="icon" mono />
              <SocialButton platform="tiktok" href={SOCIAL_LINKS.tiktok} variant="icon" mono />
              <SocialButton platform="foodpanda" href={SOCIAL_LINKS.foodpanda} variant="icon" mono />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-1 border-t border-moz-white/30 pt-6 text-sm text-moz-white/80 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} mozaic cafe, bar &amp; kitchen</p>
          <p>Mabalacat, Pampanga</p>
        </div>
      </div>
    </footer>
  );
}
