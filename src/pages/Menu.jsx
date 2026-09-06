import React from "react";
import { MenuHero, MenuList, MenuBook3D } from "../components/Menu";
import PageScrollProgress from "../components/ui/PageScrollProgress";
import ScrollReveal from "../components/ui/ScrollReveal";
import { BookOpen, Sparkles } from "lucide-react";
import SEOHead from "../components/SEOHead";

export default function Menu() {
  return (
    <div className="overflow-hidden bg-[#faf7f2] text-[#1c1109] min-h-screen relative">
      <SEOHead
        title="Food & Drinks Menu"
        description="Explore Everbloom Café's menu in Bhubaneswar near SUM Ultimate Medicare. Single-origin espresso, cold brews, loaded wraps, stone-baked pizzas, burgers & handcrafted desserts (₹200–₹400)."
        keywords="everbloom cafe menu, best coffee in bhubaneswar, cafe menu kalinga nagar, pizzas and burgers near sum hospital bhubaneswar, best cafe food bhubaneswar"
      />
      {/* Top Scroll Indicator */}
      <PageScrollProgress />

      {/* Menu Hero Title */}
      <MenuHero />

      {/* Main Classic Menu List (Exact original layout as before) */}
      <MenuList />

      {/* 3D Interactive Menu Book Section at the Bottom */}
      <section id="interactive-book" className="py-20 lg:py-28 bg-[#f5ede4]/90 border-t border-[#e5d8c8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <ScrollReveal variant="up">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8dacb] text-[#8e5223] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#deb88b]/40">
                <BookOpen className="w-3.5 h-3.5 text-[#c88242]" />
                <span>INTERACTIVE 3D BOOKLET</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c88242]" />
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1c1109] mb-3">
                Flip Through Our <span className="text-[#c88242] italic font-serif">Menu Book</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#6b5c54] font-light">
                Turn pages like a real restaurant booklet with gesture flips, category jump tabs, and audio cues.
              </p>
            </ScrollReveal>
          </div>

          {/* 3D Menu Book Component */}
          <MenuBook3D />
        </div>
      </section>
    </div>
  );
}
