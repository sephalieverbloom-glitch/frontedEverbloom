import React from "react";
import CarouselStacked from "@/components/ui/carousel-07";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Star,
  Sparkles,
  MoveHorizontal,
} from "lucide-react";

const cafeReviews = [
  {
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    title: "Artisanal Pour-Over",
    description:
      "\"The single-origin Ethiopian roast was sublime. Rich floral notes, silky crema, and warm hospitality!\"",
    badge: "5.0 ★ Coffee Lover",
    rating: 5,
    reviewer: "Priya Sharma",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80",
    title: "Almond Croissants",
    description:
      "\"Flakiest golden pastry in the city. You can literally taste the French butter in every crisp layer.\"",
    badge: "4.9 ★ Bakery Connoisseur",
    rating: 4.9,
    reviewer: "Marcus Vance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    title: "Botanical Glasshouse",
    description:
      "\"An absolute sanctuary in the heart of the city. Lush green monstera, ambient lighting & jazz.\"",
    badge: "5.0 ★ Ambiance Vibe",
    rating: 5,
    reviewer: "Aisha Kapoor",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    title: "Sourdough Avocado Brunch",
    description:
      "\"Poached eggs cooked to silky perfection over artisanal seeded sourdough. An absolute weekend ritual.\"",
    badge: "4.9 ★ Food Critic",
    rating: 4.9,
    reviewer: "Rohan Mehta",
  },
  {
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80",
    title: "Velvet Matcha Coolers",
    description:
      "\"Uji ceremonial grade matcha whipped with house-made vanilla bean oat milk. Outstanding!\"",
    badge: "5.0 ★ Signature Drink",
    rating: 5,
    reviewer: "Elena Torres",
  },
];

export default function RatingSection() {
  return (
    <section className="section-padding py-20 lg:py-28 bg-[#faf5ee] relative overflow-hidden border-y border-[#e8ded1]">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e0c2a2]/25 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c88242]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <ScrollReveal variant="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0e3d2] text-[#8e5223] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#deb88b]/40 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-[#c88242] text-[#c88242]" />
              <span>GUEST EXPERIENCES & RATINGS</span>
              <Sparkles className="w-3.5 h-3.5 text-[#c88242]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] leading-tight mb-4">
              Loved by Over <span className="italic font-normal text-[#c88242]">12,000+</span> Coffee Enthusiasts
            </h2>

            <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed max-w-2xl mx-auto">
              Every pour, pastry, and plate is crafted with mindful obsession.
              Discover what our cherished patrons celebrate about Everbloom Cafe.
            </p>
          </ScrollReveal>

          {/* Aggregate Rating Score Header Pill */}
          <ScrollReveal variant="scale" delay={150} className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#e5d8c8] shadow-sm">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <span className="font-serif text-lg font-bold text-[#1c1109]">4.95 / 5.0</span>
              <span className="text-xs text-[#8c7a70] border-l border-[#decbb7] pl-3">
                Over 1,850+ Verified Reviews
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive 3D Stacked Carousel */}
        <div className="relative my-4 sm:my-8">
          {/* Subtle Drag Instruction Indicator */}
          <div className="flex items-center justify-center gap-2 mb-2 text-xs font-medium text-[#9a8578] uppercase tracking-widest">
            <MoveHorizontal className="w-4 h-4 animate-pulse text-[#c88242]" />
            <span>Drag or swipe cards horizontally to explore</span>
          </div>

          <CarouselStacked slides={cafeReviews} />
        </div>
      </div>
    </section>
  );
}
