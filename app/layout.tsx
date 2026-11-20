import type { Metadata } from "next";
import { League_Spartan, Poppins } from "next/font/google";
import "./globals.css";

// The brand style sheet names League Spartan (headers) and Poppins (body).
// It also names NATS for sub-headers — that face isn't in next/font/google's
// catalogue, so sub-headers use League Spartan's lighter weights instead,
// which sit in the same geometric register. Loading the variable axis gives
// the full 100–900 range the old fixed 500/600/700/800 set didn't have.
const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "mozaic — cafe, bar, & kitchen",
    template: "%s | mozaic",
  },
  description:
    "mozaic is a cafe, bar, & kitchen — coffee by day, cocktails by night.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
