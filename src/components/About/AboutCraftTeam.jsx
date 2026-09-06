import React from "react";
import { Award, Coffee, Sparkles, ChefHat, Heart, Utensils } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function AboutCraftTeam() {
  const artisans = [
    {
      role: "Head Roaster & Barista Master",
      name: "Specialty Brewing Guild",
      badge: "Coffee Alchemy",
      desc: "Obsessed with extraction yields, tasting notes of bergamot and jasmine, and pouring silky swan latte art on every cup.",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    },
    {
      role: "Artisan Baker & Pastry Lead",
      name: "The Viennoiserie Atelier",
      badge: "French Craft",
      desc: "Laminating flaky, buttery layers by hand and proofing sourdough for 36 hours to create perfection in every bite.",
      icon: ChefHat,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
    },
    {
      role: "Culinary & Concept Kitchen",
      name: "Gourmet Kitchen Collective",
      badge: "Savory Delights",
      desc: "Crafting loaded avocado toasts, wood-fired artisanal flatbreads, and authentic gourmet pasta from scratch.",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section className="section-padding py-20 lg:py-28 bg-[#faf7f2] text-[#1c1109] relative overflow-hidden border-t border-[#e8ded3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal variant="up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0e3d2] text-[#8e5223] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#deb88b]/40 shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#c88242]" />
              <span>PASSION &amp; EXPERTISE</span>
              <Sparkles className="w-3.5 h-3.5 text-[#c88242]" />
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] leading-tight mb-4">
              The Artisans Behind Every Cup
            </h2>

            <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed max-w-2xl mx-auto">
              Behind our botanical walls is a team of dedicated coffee purists, bakers, and chefs who treat every plate and pour as a work of art.
            </p>
          </ScrollReveal>
        </div>

        {/* Team / Craft Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, idx) => {
            const IconComp = artisan.icon;
            return (
              <ScrollReveal
                key={idx}
                variant="up"
                delay={100 + idx * 100}
                className="h-full"
              >
                <div className="h-full bg-white rounded-3xl overflow-hidden border border-[#e8ded3] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                  {/* Photo Banner */}
                  <div className="relative h-60 overflow-hidden bg-[#24150e]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#1c1109] backdrop-blur-md shadow-md">
                        {artisan.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-[#c88242] flex items-center justify-center text-white shrink-0 shadow-md">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#f8ede3] drop-shadow">
                        {artisan.role}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1c1109] mb-3 group-hover:text-[#c88242] transition-colors">
                        {artisan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#66544a] font-light leading-relaxed">
                        {artisan.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#f0e6da] flex items-center justify-between text-xs text-[#8e5223] font-semibold">
                      <span>Everbloom Sanctuary</span>
                      <span>★ 100% In-House</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
