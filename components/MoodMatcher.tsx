"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Ban,
  ChevronRight,
  LoaderCircle,
  MessageSquareText,
  Lock,
  Martini,
  RotateCw,
  Search,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import MenuCard from "./MenuCard";
import OrderButtons from "./OrderButtons";
import { StarMark } from "./icons/StarMark";
import Ticket from "./brand/Ticket";
import { ROOM_BY_CATEGORY } from "@/lib/rooms";
import { useMatcher, type MatcherOutcome } from "@/lib/matcher/useMatcher";
import { FEEDBACK_FORM_URL } from "@/lib/matcher/config";

const EXAMPLES = [
  "Sweet and cold, no coffee, under ₱150",
  "Pulutan for 4, ₱800",
  "Something healthy under ₱250",
  "Ulam para sa 2, walang baboy",
  "Caffeine to get through studying",
  "Cocktails for tonight",
];

function chipIcon(chip: string): LucideIcon {
  if (chip.startsWith("For")) return Users;
  if (chip.startsWith("No") || chip.startsWith("Not") || chip.startsWith("Nothing")) return Ban;
  if (chip.startsWith("Bar")) return Martini;
  return Wallet;
}

const mb = (bytes: number) => (bytes / 1_000_000).toFixed(1);

/**
 * The AI matcher UI. All the intelligence lives in lib/matcher — this file is
 * input, status, and results.
 */
export default function MoodMatcher({ header }: { header?: ReactNode }) {
  const { status, progress, error, prepare, match, retry } = useMatcher();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<MatcherOutcome | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  async function run(query: string) {
    const trimmed = query.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    setBusy(true);
    setFailed(null);
    try {
      const result = await match(trimmed);
      if (result) setOutcome(result);
    } catch (err) {
      setFailed(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  // Deep link: /match?q=pulutan+for+4 (homepage prompts, a QR poster at the
  // counter). Runs once on mount; read from location rather than
  // useSearchParams so the page can stay fully static without a Suspense
  // boundary around the whole matcher.
  const ranDeepLink = useRef(false);
  useEffect(() => {
    if (ranDeepLink.current) return;
    ranDeepLink.current = true;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) pickExample(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void run(text);
  }

  function pickExample(example: string) {
    setText(example);
    void run(example);
  }

  const pct = progress.total ? Math.min(100, Math.round((progress.loaded / progress.total) * 100)) : 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* ---- input: a white field on the blue ground ------------------- */}
      <section className="moz-field moz-grain relative overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 pt-10 pb-10 lg:pt-16 lg:pb-14">
        {header}
        <form onSubmit={onSubmit} role="search" className="relative lg:max-w-3xl">
          <label htmlFor={inputId} className="sr-only">
            Describe what you&apos;re craving
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-moz-blue"
          />
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            inputMode="text"
            enterKeyHint="search"
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={prepare}
            placeholder="e.g. sweet, cold, no coffee, under ₱150"
            className="w-full rounded-full bg-moz-white py-4 pr-16 pl-13 font-display text-lg font-bold tracking-moz text-moz-blue outline-none placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-moz-blue/70 sm:py-5 sm:text-xl"
          />
          <button
            type="submit"
            aria-label="Find matches"
            disabled={busy}
            className="moz-btn absolute top-1/2 right-2.5 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-moz-blue text-moz-white disabled:opacity-60"
          >
            {busy ? (
              <LoaderCircle aria-hidden className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowUp aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            )}
          </button>
        </form>

        {/* Example prompts: a horizontal rail on phones, wrapped on desktop. */}
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => pickExample(example)}
              className="moz-btn shrink-0 border-2 border-moz-white/70 px-4 py-2 font-sans text-sm font-medium text-moz-white hover:border-moz-white hover:bg-moz-white hover:text-moz-blue"
            >
              {example}
            </button>
          ))}
        </div>

        {/* Model status — honest about the one-time download. */}
        <div className="min-h-6 text-sm" aria-live="polite">
          {status === "loading" && (
            <div className="flex flex-col gap-2">
              <p className="text-moz-white">
                Getting the matcher ready
                {progress.total > 0 ? `: ${mb(progress.loaded)} of ${mb(progress.total)} MB` : "…"}
                <span className="text-moz-white/80"> (first visit only)</span>
              </p>
              <div className="h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-moz-white/25">
                <div className="h-full rounded-full bg-moz-white transition-[width] duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
          {status === "ready" && (
            <p className="flex items-center gap-1.5 text-moz-white/90">
              <Lock aria-hidden className="h-3.5 w-3.5" />
              Runs on your device. What you type never leaves it.
            </p>
          )}
          {status === "idle" && (
            <p className="text-moz-white/90">The matcher downloads about 23 MB when you start typing.</p>
          )}
          {status === "error" && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-moz-white">The matcher couldn&apos;t load. Check your connection and try again.</p>
              <button
                type="button"
                onClick={retry}
                className="moz-btn inline-flex items-center gap-1.5 bg-moz-white px-4 py-1.5 text-sm font-semibold text-moz-blue"
              >
                <RotateCw aria-hidden className="h-3.5 w-3.5" />
                Try again
              </button>
              {error ? <span className="sr-only">{error}</span> : null}
            </div>
          )}
        </div>
      </div>

      </section>

      {/* ---- results -------------------------------------------------- */}
      <section className="moz-paper flex-1">
      <div aria-live="polite" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:py-14">
        {failed && (
          <p className="text-moz-ink">
            Couldn&apos;t run that search. Try again, or{" "}
            <Link href="/menu" className="font-semibold text-moz-blue hover:underline">
              browse the full menu
            </Link>
            .
          </p>
        )}

        {outcome ? <Results outcome={outcome} /> : <HowItWorks />}

        {outcome && FEEDBACK_FORM_URL ? (
          <a
            href={FEEDBACK_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="moz-group-row moz-group inline-flex items-center gap-3 self-start !rounded-full !px-5 !py-3"
          >
            <MessageSquareText aria-hidden className="h-4 w-4 text-moz-blue" />
            <span className="text-sm text-moz-ink">
              Were these picks helpful? <span className="font-semibold text-moz-blue">Tell us in 4 questions</span>
            </span>
          </a>
        ) : null}
      </div>
      </section>
    </div>
  );
}

function Results({ outcome }: { outcome: MatcherOutcome }) {
  const { query, matches, basket, emptyHint } = outcome;

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
      <div className="flex flex-col gap-4">
        {/* What the rules understood — shown so the customer can see why
            something was filtered out. */}
        {query.chips.length > 0 && (
          <ul aria-label="Filters applied" className="flex flex-wrap gap-2">
            {query.chips.map((chip) => {
              const Icon = chipIcon(chip);
              return (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-moz-blue bg-moz-white px-3 py-1 text-sm font-semibold text-moz-blue"
                >
                  <Icon aria-hidden className="h-3.5 w-3.5" />
                  {chip}
                </li>
              );
            })}
          </ul>
        )}

        {emptyHint ? (
          <div className="moz-group px-5 py-6">
            <p className="font-display text-2xl font-extrabold lowercase tracking-moz text-moz-blue">no match yet</p>
            <p className="mt-1 text-moz-ink">{emptyHint}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="moz-group">
              <div className="flex items-center justify-between gap-3 bg-moz-blue px-[1.125rem] py-3 text-moz-white">
                <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold lowercase leading-none tracking-moz">
                  <StarMark className="h-4 w-4 shrink-0" />
                  picked for you
                </h2>
                <span className="moz-micro">{matches.length} picks</span>
              </div>
              {matches.map((m, i) => (
                <MenuCard
                  key={m.item.id}
                  item={m.item}
                  leading={
                    i === 0 ? (
                      <span className="moz-micro inline-flex shrink-0 items-center gap-1 self-center rounded-full bg-moz-blue px-2 py-1 text-moz-white">
                        <StarMark className="h-2.5 w-2.5" />
                        Top pick
                      </span>
                    ) : null
                  }
                  footnote={
                    <p className="pt-0.5 text-[13px] text-moz-blue">
                      <span className="font-semibold text-moz-ink">{ROOM_BY_CATEGORY[m.item.category].label}</span>
                      {m.reasons.length > 0 ? `  ·  ${m.reasons.join(", ")}` : ""}
                    </p>
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24">
        {basket && (
          // The group plan as a coupon: the one thing on the page that's a
          // plan for the table, so it gets the ticket shape.
          <Ticket
            notchAt="3.6rem"
            stub={
              <p className="moz-micro flex items-center gap-1.5">
                <StarMark className="h-3.5 w-3.5" />
                {query.party ? `A spread for ${query.party}` : "A spread for the group"}
              </p>
            }
          >
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col divide-y-2 divide-dashed divide-moz-white/35">
                {basket.items.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span className="text-[15px] text-moz-white">{item.name}</span>
                    <span className="font-display font-extrabold tabular-nums text-moz-white">₱{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-between border-t-2 border-moz-white pt-3">
                <span className="font-display text-xl font-extrabold lowercase tracking-moz text-moz-white">total</span>
                <span className="font-display text-3xl font-extrabold tabular-nums text-moz-white">
                  ₱{basket.total.toLocaleString("en-PH")}
                </span>
              </div>
              {basket.budget !== null && (
                <p className="text-sm text-moz-white/90">
                  ₱{(basket.budget - basket.total).toLocaleString("en-PH")} left of your ₱
                  {basket.budget.toLocaleString("en-PH")} budget.
                </p>
              )}
            </div>
          </Ticket>
        )}

        {!emptyHint && (
          <div className="flex flex-col gap-3">
            <p className="px-1 text-sm text-moz-ink">Order these for delivery, or show this screen at the counter.</p>
            <OrderButtons />
            <Link
              href="/menu"
              className="inline-flex items-center gap-0.5 self-start px-1 font-sans text-sm font-semibold text-moz-blue hover:underline"
            >
              See the full menu
              <ChevronRight aria-hidden className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/** Shown before the first search: what the matcher does, in three steps. */
function HowItWorks() {
  const steps = [
    {
      title: "you describe it",
      body: "Taste, mood, budget, who you're with. English or Taglish both work.",
    },
    {
      title: "rules handle the limits",
      body: "Budget, group size, and anything you say no to (pork, coffee, alcohol) are applied exactly.",
    },
    {
      title: "the AI reads the rest",
      body: "A small language model on your phone compares what you wrote with every dish and drink by meaning, not keywords.",
    },
  ];

  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {steps.map((step, i) => (
        <li key={step.title} className="moz-panel-line flex flex-col gap-2 px-6 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moz-blue font-display text-base font-extrabold tabular-nums text-moz-white">{i + 1}</span>
          <p className="font-display text-2xl font-extrabold lowercase leading-none tracking-moz text-moz-blue">{step.title}</p>
          <p className="text-sm leading-relaxed text-moz-ink">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
