import type { Metadata } from "next";
import MoodMatcher from "@/components/MoodMatcher";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Mood Matcher",
  description:
    "Tell mozaic what you're craving, your budget, and who you're with, and an on-device AI picks from the menu.",
};

// Mobile-first: the main entry is a phone scanning the counter QR code, so the
// input sits right under the heading on the blue field, above the fold.
export default function MatchPage() {
  return (
    <div className="flex flex-1 flex-col">
      <MoodMatcher
        header={
          <SectionHeading
            as="h1"
            label="Mood matcher"
            title="what are you craving?"
            subtitle="Tell us your taste, budget, and who you're with, and we'll pick from the menu."
            tone="blue"
            star
          />
        }
      />
    </div>
  );
}
