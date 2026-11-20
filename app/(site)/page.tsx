import Link from "next/link";
import Image from "next/image";
import MapEmbed from "@/components/MapEmbed";
import SocialFeed from "@/components/SocialFeed";
import SocialButton from "@/components/SocialButton";
import OrderButtons from "@/components/OrderButtons";
import SectionHeading from "@/components/SectionHeading";
import About from "@/components/About";
import Reveal from "@/components/Reveal";
import { ArrowRight, Phone } from "lucide-react";
import VisitDetails from "@/components/VisitDetails";
import MatcherTeaser from "@/components/MatcherTeaser";
import { StarMark } from "@/components/icons/StarMark";
import { ROOMS } from "@/lib/rooms";
import { LOCATION, SOCIAL_HANDLE, SOCIAL_LINKS, TAGLINE, TAGLINE_LONG } from "@/lib/social";

// Fanned like three printed posters laid on the counter. Kitchen sits in
// front; cafe and bar tuck behind it either side.
const FAN = [
  { room: "cafe", className: "left-0 top-[6%] z-0 -rotate-6" },
  { room: "bar", className: "right-0 top-[6%] z-0 rotate-6" },
  { room: "kitchen", className: "left-1/2 top-0 z-10 -translate-x-1/2" },
] as const;

export default function HomePage() {
  return (
    <>
      {/*
        Hero. One focal point: mozaic's own cafe / kitchen / bar posters, the
        three menus under one roof, fanned as a single object. Copy on the
        left carries the tagline and the two CTAs; a facts rail along the
        bottom answers "when / where / can I order" at a glance.
      */}
      <section className="moz-field moz-grain overflow-hidden">
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-12 pb-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-20 lg:pb-16">
          <div className="moz-enter flex flex-col items-start gap-6">
            <p className="moz-micro inline-flex items-center gap-2 text-moz-white">
              <StarMark className="h-3.5 w-3.5" />
              Cafe · Kitchen · Bar
            </p>

            <h1 className="moz-display max-w-[11ch] text-moz-white">
              <span className="sr-only">mozaic — </span>
              {TAGLINE}
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-moz-white/90">{TAGLINE_LONG}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/menu" className="moz-btn moz-btn-base moz-btn-white">
                See the menu
                <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
              </Link>
              <Link href="/#order" className="moz-btn moz-btn-base moz-btn-white-line">
                Order delivery
              </Link>
            </div>
          </div>

          {/* Posters render at their native 1:√2 ratio — never cropped. */}
          <div aria-hidden className="relative mx-auto aspect-[1.25/1] w-full max-w-[480px] lg:mr-0">
            {FAN.map(({ room, className }) => {
              const r = ROOMS.find((x) => x.category === room)!;
              return (
                <div
                  key={room}
                  className={`absolute aspect-[1/1.414] w-[48%] overflow-hidden rounded-[var(--moz-radius)] border-[3px] border-moz-white bg-moz-blue ${className}`}
                >
                  <Image
                    src={r.src}
                    alt=""
                    fill
                    priority={room === "kitchen"}
                    sizes="(min-width: 1024px) 230px, 46vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Facts rail */}
        <div className="relative z-10 border-t border-moz-white/30">
          <dl className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-moz-white/30 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { k: "Open daily", v: "10am – 12mn" },
              { k: "Find us", v: "Mac Arthur Hwy, Dau, Mabalacat" },
              { k: "Delivery", v: "GrabFood & foodpanda" },
            ].map(({ k, v }, i) => (
              <div
                key={k}
                className={`flex items-baseline justify-between gap-4 py-4 sm:flex-col sm:justify-start sm:gap-1 sm:py-5 ${
                  i > 0 ? "sm:pl-6" : ""
                }`}
              >
                <dt className="moz-micro text-moz-white/80">{k}</dt>
                <dd className="font-display text-lg font-bold tracking-moz text-moz-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* One space, three menus — typographic index, the posters already
          carry the imagery above. Each row deep-links to its menu tab. */}
      <section className="moz-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              label="What we are"
              title="one space, three menus"
              subtitle="Cafe by morning, kitchen all day, bar by night — one room off Mac Arthur Highway that does all three."
              star
            />
          </Reveal>

          <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-16">
            {ROOMS.map((room, i) => (
              <Reveal as="li" key={room.category} delay={i * 90}>
                <Link
                  href={`/menu?c=${room.category}`}
                  className="group flex h-full flex-col gap-4 border-t-2 border-moz-blue pt-5"
                >
                  <span className="moz-micro text-moz-blue">0{i + 1}</span>
                  <span className="font-display text-6xl font-extrabold lowercase leading-none tracking-moz text-moz-blue lg:text-7xl">
                    {room.word}
                  </span>
                  <span className="leading-relaxed text-moz-ink">{room.blurb}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-display text-base font-bold tracking-moz text-moz-blue">
                    See the {room.word} menu
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Matcher + hours + socials */}
      <section className="bg-moz-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-6 py-20 lg:grid-cols-3 lg:py-28">
          <Reveal className="lg:col-span-2">
            <MatcherTeaser className="h-full" />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={80} className="flex">
              <div className="moz-panel-line flex w-full flex-col gap-4 p-6 sm:p-7">
                <p className="moz-micro text-moz-blue">Business hours</p>
                <p className="moz-h3 text-moz-blue">
                  10:00am – 12:00am
                </p>
                <p className="-mt-2 text-moz-ink">Monday to Sunday</p>
                <a
                  href={LOCATION.phoneHref}
                  className="moz-btn moz-btn-base moz-btn-line mt-auto w-fit"
                >
                  <Phone aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                  {LOCATION.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={140} className="flex">
              <div className="moz-panel-line flex w-full flex-col gap-4 p-6 sm:p-7">
                <p className="moz-micro text-moz-blue">Follow along</p>
                <p className="moz-h3 text-moz-blue">{SOCIAL_HANDLE}</p>
                <p className="-mt-2 text-moz-ink">New drops, DJ sets, late-night vibes.</p>
                <div className="mt-auto flex items-center gap-2.5">
                  <SocialButton platform="facebook" href={SOCIAL_LINKS.facebook} variant="icon" />
                  <SocialButton platform="instagram" href={SOCIAL_LINKS.instagram} variant="icon" />
                  <SocialButton platform="tiktok" href={SOCIAL_LINKS.tiktok} variant="icon" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Real posts only — renders nothing until one has an image. */}
          <div className="lg:col-span-3">
            <SocialFeed variant="wall" />
          </div>
        </div>
      </section>

      {/* Order + events. id="order" — the tab bar's Order tab anchors here. */}
      <section id="order" className="moz-paper scroll-mt-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-0 lg:py-28">
          <Reveal className="flex flex-col items-start gap-5 lg:border-r-2 lg:border-moz-blue lg:pr-14">
            <p className="moz-micro text-moz-blue">Delivery</p>
            <h2 className="moz-h2 text-moz-blue">can&apos;t make it in?</h2>
            <p className="max-w-md text-lg leading-relaxed text-moz-ink">
              The full kitchen and cafe menu goes out on both platforms, daily.
            </p>
            <OrderButtons className="mt-2" />
          </Reveal>

          <Reveal delay={100} className="flex flex-col items-start gap-5 lg:pl-14">
            <p className="moz-micro text-moz-blue">Private events</p>
            <h2 className="moz-h2 text-moz-blue">planning something?</h2>
            <p className="max-w-md text-lg leading-relaxed text-moz-ink">
              Birthdays, corporate nights, reunions, and private buyouts — message us and
              let&apos;s talk details.
            </p>
            <Link href="/catering" className="moz-btn moz-btn-base moz-btn-solid mt-2">
              Plan your event
              <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <About />

      {/* Find us */}
      <section id="find-us" className="moz-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              label="Location"
              title="find us"
              subtitle="Right off Mac Arthur Highway in Dau, near St. Mutien College."
              star
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr] lg:gap-6">
            <Reveal>
              <VisitDetails />
            </Reveal>
            <Reveal delay={140} className="flex">
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
