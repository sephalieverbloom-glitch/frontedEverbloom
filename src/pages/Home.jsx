import {
  HeroSection,
  HighlightsSection,
  AmbienceShowcase,
  FeaturedMenuSection,
  RatingSection,
  ReviewsSection,
  EventsPreview,
  VisitCTASection,
  SeoFaqSection,
} from "../components/Home";
import PageScrollProgress from "../components/ui/PageScrollProgress";
import SEOHead from "../components/SEOHead";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#faf7f2] relative">
      {/* Dynamic SEO Meta for Home */}
      <SEOHead
        title="Best Café in Bhubaneswar & Near SUM Ultimate Medicare"
        description="Everbloom Café is Bhubaneswar's top aesthetic café and coffee shop located near SUM Ultimate Medicare, K8 Kalinga Nagar. Serving single-origin artisanal coffee, stone-baked pizzas, loaded wraps, and fresh desserts."
        keywords="best cafe in bhubaneswar, best cafe near sum ultimate medicare, sum best cafe, best cafe near me, bhubaneswar best cafe, everbloom cafe bhubaneswar, top cafes in bhubaneswar, cafe in kalinga nagar"
      />

      {/* Global Reading Scroll Progress Bar at the top of the window */}
      <PageScrollProgress />

      {/* Hero Section */}
      <HeroSection />

      {/* Live Animated Counters & Everbloom Perks (Triggered on Scroll) */}
      <HighlightsSection />

      {/* Interactive 3-Space Ambience Showcase (Directional Scroll Reveals) */}
      <AmbienceShowcase />

      {/* Dynamic Filterable Featured Menu (Staggered Scroll Reveals) */}
      <FeaturedMenuSection />

      {/* Guest Reviews & 3D Interactive Rating Carousel Section */}
      <RatingSection />

      {/* Visual Moments Gallery Grid (Zoom & Fade Scroll Reveals) */}
      <ReviewsSection />

      {/* Live Acoustic & Weekend Gatherings (Sliding Scroll Reveals) */}
      <EventsPreview />

      {/* Bhubaneswar & SUM Ultimate Medicare Local Search SEO & FAQ Guide */}
      <SeoFaqSection />

      {/* Table Reservation Call-To-Action (Pulsing Scale Scroll Reveal) */}
      <VisitCTASection />
    </div>
  );
}

