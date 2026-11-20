import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { StarMark } from "./icons/StarMark";

/**
 * Our story — editorial: one dominant photograph, the copy beside it in
 * short readable blocks.
 *
 * The photo is the only real, text-free photograph of the room mozaic has
 * supplied (see docs/ASSETS_NEEDED.md for what would replace or join it).
 *
 * Copy is the owner's, verbatim — only re-broken: the story into two
 * paragraphs, and the "quality" paragraph's own list of four things pulled
 * out as a list. Nothing added.
 */

const STORY_LEAD =
  "Since its beginning, Mozaic Café, Bar + Kitchen has been built on one simple idea — bringing people together through good food, great drinks, and a welcoming space.";

const STORY_BODY =
  "What started as a cozy café quickly became a go-to spot where students, families, and friends gather to share meals, celebrate milestones, and unwind after a long day. Stop by and experience comfort dishes, quality coffee, and crafted drinks served fresh daily in a place that feels like your second home.";

const QUALITY_LEAD =
  "At Mozaic, quality comes first. Every dish is prepared with care, every drink crafted with intention, and every guest welcomed like family. We take pride in serving:";

const QUALITY_LIST = [
  "Freshly prepared comfort meals",
  "Handcrafted coffee and specialty drinks",
  "Signature cocktails and bar favorites",
  "A cozy, aesthetic atmosphere with friendly and attentive service",
];

const QUALITY_CLOSE =
  "Whether you're here for a quick bite, a study session, a business meeting, or a celebration, there's always a seat waiting for you.";

export default function About() {
  return (
    <section id="about" className="bg-moz-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-6 py-20 lg:grid-cols-[5fr_6fr] lg:gap-16 lg:py-28">
        <Reveal as="figure" className="lg:sticky lg:top-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--moz-radius-lg)] bg-moz-blue">
            <Image
              src="/images/pubmats/moz-interior-night.webp"
              alt="The mozaic team behind the bar on a night shift, under the blue shelf lights"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="moz-micro mt-3 flex items-center gap-2 text-moz-blue">
            <StarMark className="h-3 w-3" />
            Behind the bar, Dau
          </figcaption>
        </Reveal>

        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              label="Our story"
              title="a place that feels like your second home"
              star
            />
            <p className="mt-8 font-display text-2xl font-semibold leading-snug tracking-tight text-moz-blue">
              {STORY_LEAD}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-moz-ink">{STORY_BODY}</p>
          </Reveal>

          <Reveal delay={100} className="border-t-2 border-moz-blue pt-8">
            <h3 className="moz-h3 text-moz-blue">always fresh. always welcoming.</h3>
            <p className="mt-4 leading-relaxed text-moz-ink">{QUALITY_LEAD}</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {QUALITY_LIST.map((item) => (
                <li key={item} className="flex gap-3 leading-snug text-moz-ink">
                  <StarMark className="mt-1 h-3.5 w-3.5 shrink-0 text-moz-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-moz-ink">{QUALITY_CLOSE}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
