import type { Metadata } from "next";
import Image from "next/image";
import ContactButtons, { type ContactChannel } from "@/components/ContactButtons";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import VisitDetails from "@/components/VisitDetails";
import { InstagramIcon, MessengerIcon, WhatsappIcon } from "@/components/icons/BrandIcons";
import { StarMark } from "@/components/icons/StarMark";
import { LOCATION, SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
  title: "Catering & Private Events",
};

const CATERING_WHATSAPP_MESSAGE = `Hi mozaic! I'd like to inquire about catering for a private event.

Event type:
Preferred date:
Estimated guest count:

Details: `;

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    provider: "whatsapp",
    label: "Message us on WhatsApp",
    href: `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(CATERING_WHATSAPP_MESSAGE)}`,
    icon: WhatsappIcon,
    bgClass: "bg-brand-whatsapp",
  },
  {
    provider: "messenger",
    label: "Message us on Messenger",
    href: SOCIAL_LINKS.messenger,
    icon: MessengerIcon,
    bgClass: "bg-brand-messenger",
  },
  {
    provider: "instagram",
    label: "DM us on Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: InstagramIcon,
    bgClass: "bg-instagram-gradient",
  },
  {
    provider: "call",
    label: "Call us",
    href: LOCATION.phoneHref,
    bgClass: "bg-moz-blue",
  },
];

const INQUIRY_HINTS = [
  "Event type — birthday, corporate event, reunion, team building, or something else",
  "Preferred date (and an alternate, if you're flexible)",
  "Estimated guest count",
  "Any special requests — dietary needs, setup, specific dishes",
];

export default function CateringPage() {
  return (
    <>
      {/*
        Type on the blue field, with the pubmat BESIDE it — never behind it.

        This hero used to run mozaiccbk-catering.png full-bleed (fill +
        object-cover + duotone at 40%) under this same headline. That file isn't
        a photograph: it's a finished 4:5 pubmat whose own artwork already reads
        "moz gotchu! / message us / for private events & catering bookings".
        Stretching a portrait poster across a wide hero blew its baked type up
        and offset it, so the poster's headline ghosted through underneath the
        live <h1> repeating it word for word. Any text-bearing pubmat behind
        live copy does this — don't reinstate it, and don't try to veil it away.

        The lead image is now the "got an occasion?" pubmat, which ASKS the
        question this page's headline answers instead of restating it, and it
        renders at its native 1080x1351 so the baked headline, star, wordmark,
        and address block all survive intact.
      */}
      <section className="moz-field moz-grain relative overflow-hidden">
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          {/* moz-enter staggers via `> *`, so it stays on the direct parent of
              these three lines — not on the grid. */}
          <div className="moz-enter flex flex-col gap-4">
            <p className="moz-micro inline-flex w-fit items-center gap-2 text-moz-white">
              <StarMark className="h-3.5 w-3.5" />
              Catering &amp; private events
            </p>
            <p className="moz-h3 text-moz-white/90">moz gotchu!</p>
            <h1 className="moz-display text-moz-white">message us</h1>
            <p className="max-w-xl text-lg leading-relaxed text-moz-white/90">
              for private events &amp; catering bookings
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/images/gallery/mozaic-catering-home.jpg"
              alt={
                'mozaic pubmat — "got an occasion? we accept private events & catering", ' +
                "set over a full night at the mozaic bar"
              }
              width={1080}
              height={1351}
              priority
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="relative w-full rounded-[var(--moz-radius-lg)] border-[3px] border-moz-white"
            />
          </div>
        </div>
      </section>

      <div className="moz-paper">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
        <Reveal className="flex flex-col gap-8">
          <SectionHeading
            label="How it works"
            title="tell us the shape of it"
            subtitle="Birthdays, corporate gatherings, reunions, and everything in between — mozaic can bring the cafe, bar, and kitchen to your next event."
            star
          />

          <div className="moz-group">
            <div className="flex items-center gap-2 bg-moz-blue px-[1.125rem] py-3 text-moz-white">
              <StarMark className="h-4 w-4 shrink-0" />
              <h2 className="font-display text-2xl font-extrabold lowercase leading-none tracking-moz">
                when you message us
              </h2>
            </div>
            <ol>
              {INQUIRY_HINTS.map((hint, i) => (
                <li key={hint} className="moz-group-row flex gap-3.5 leading-relaxed text-moz-ink">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moz-blue font-display text-sm font-extrabold text-moz-white">
                    {i + 1}
                  </span>
                  <span>{hint}</span>
                </li>
              ))}
            </ol>
            <p className="border-t-2 border-dashed border-[var(--moz-hairline)] px-[1.125rem] py-3 text-sm text-moz-blue">
              WhatsApp pre-fills these for you — just fill in the blanks and send.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl font-extrabold lowercase tracking-moz text-moz-blue">
              visit or call us
            </h2>
            <VisitDetails />
          </div>
        </Reveal>

        {/* The channels are the conversion mechanism — no form, by decision.
            The "message us" pubmat heads them: its own baked line is the
            instruction, so it labels the buttons rather than repeating page
            copy.

            It's banner-cropped rather than shown whole. At its native 4:5 the
            poster had to be capped narrow (~256px) to keep the sticky column
            shorter than the viewport, which left it floating above a ~488px
            button stack looking like a stray tile. Cropping to 16/9 lets it run
            the column's full width — flush with the buttons — and lands ~274px
            tall, near-identical to the four pills below, so image mass and
            button mass balance. Nothing important is lost: the poster's whole
            "moz gotchu! / message us / for private events & catering bookings"
            stack sits at 43-60% of its height, well inside a centered crop, and
            the text renders ~1.9x larger than it did capped. Only the foot's
            small wordmark goes, which the navbar already carries.

            rounded-moz-lg is 28px — the pills' own corner radius at their
            height — so the card's corners rhyme with the stack instead of
            competing with it. */}
        <Reveal delay={140} className="flex flex-col gap-4 lg:sticky lg:top-28">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-moz-lg border-2 border-moz-blue">
            <Image
              src="/images/gallery/mozaiccbk-catering.png"
              alt={
                'mozaic pubmat — "moz gotchu! message us for private events & catering ' +
                'bookings", in blue duotone over the bar'
              }
              fill
              sizes="(min-width: 1024px) 30rem, 100vw"
              className="object-cover"
            />
          </div>
          <ContactButtons channels={CONTACT_CHANNELS} className="w-full" />
        </Reveal>
      </div>
      </div>
    </>
  );
}
