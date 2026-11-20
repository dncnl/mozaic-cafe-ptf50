import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import ReviewMarquee from "@/components/ReviewMarquee";
import BrandFilters from "@/components/BrandFilters";
import BrandBand from "@/components/brand/BrandBand";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <BrandFilters />
      <a href="#main" className="moz-skip-link font-display font-bold">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex flex-1 flex-col pb-16 sm:pb-0">
        {children}
      </main>
      <ReviewMarquee />
      <BrandBand tone="white" className="border-y-2 border-moz-blue" />
      <Footer />
      <MobileTabBar />
    </>
  );
}
