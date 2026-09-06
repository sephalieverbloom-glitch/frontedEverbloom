import React from "react";
import { Target, Eye, Compass, Sparkles, Heart, Leaf, Coffee, Users, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function AboutMissionVision() {
  const pillars = [
    {
      title: "Artisanal Purity",
      desc: "100% single-origin Arabica beans, precision brewing ratios, and fresh small-batch roasts.",
      icon: Coffee,
      badge: "Pure Craft",
    },
    {
      title: "Botanical Serenity",
      desc: "Lush tropical green nooks designed to soothe the senses and filter out bustling city noise.",
      icon: Leaf,
      badge: "Green Space",
    },
    {
      title: "Warm Inclusivity",
      desc: "Pet-friendly outdoor garden, ergonomic laptop nooks, and cozy corners for family dates.",
      icon: Users,
      badge: "All Welcome",
    },
    {
      title: "Fair-Priced Gourmet",
      desc: "Pocket-friendly luxury (₹200–₹400) crafted with transparent, preservative-free ingredients.",
      icon: Heart,
      badge: "Honest Hospitality",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#f4ebe1] text-[#1c1109] relative overflow-hidden border-y border-[#e5d8c8]">
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c88242]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split: Mission & Vision with Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          
          {/* Left: Mission & Vision Editorial Typography */}
          <div className="lg:col-span-6 space-y-10">
            <ScrollReveal variant="left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8dacb] text-[#8e5223] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#deb88b]/40">
                <Compass className="w-3.5 h-3.5 text-[#c88242]" />
                <span>PURPOSE &amp; PHILOSOPHY</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] leading-[1.2]">
                Our Mission &amp; <span className="text-[#c88242] italic font-serif">Future Horizon</span>
              </h2>

              <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed mt-4">
                We believe a great cafe is more than just coffee and food — it is a sanctuary where human connection, creativity, and inner peace flourish.
              </p>
            </ScrollReveal>

            {/* Mission Statement */}
            <ScrollReveal variant="up" delay={100} className="pl-6 border-l-2 border-[#c88242]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c88242] mb-1">
                <Target className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1109] mb-2">
                Cultivating Everyday Joy &amp; Pure Craft
              </h3>
              <p className="text-xs sm:text-sm text-[#66544a] font-light leading-relaxed">
                To serve pure single-origin artisanal brews, honest scratch-made gourmet recipes, and provide a welcoming botanical haven where every guest in Bhubaneswar feels refreshed and valued.
              </p>
            </ScrollReveal>

            {/* Vision Statement */}
            <ScrollReveal variant="up" delay={200} className="pl-6 border-l-2 border-emerald-600">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
                <Eye className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1109] mb-2">
                East India's Benchmark for Botanical Cafes
              </h3>
              <p className="text-xs sm:text-sm text-[#66544a] font-light leading-relaxed">
                To stand as the gold standard for specialty coffee excellence, sustainable mindful dining, and cultural community gatherings in Odisha.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Layered Visual Photo Gallery */}
          <div className="lg:col-span-6">
            <ScrollReveal variant="right" delay={150}>
              <div className="relative">
                {/* Main Photo: Barista Craft */}
                <div className="relative h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#e8ded3] bg-[#24150e]">
                  <img
                    src="/everbloom/barista-latte-art.jpg"
                    alt="Barista Crafting Rosetta Latte Art"
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-[#c88242] px-3 py-1 rounded-full text-white inline-block mb-2 shadow">
                      THE ART OF EXTRACTION
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-bold">Pouring Passion Into Every Single Cup</p>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#e8ded3] hidden sm:flex items-center gap-3.5 max-w-xs">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600/15 flex items-center justify-center text-emerald-700 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1c1109]">Zero Compromises</p>
                    <p className="text-[11px] text-[#78665c] leading-tight">100% natural, farm-fresh &amp; small batch roasted</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 4 Guiding Pillars in Clean Horizontal Flow (No Heavy Boxes) */}
        <div className="pt-12 border-t border-[#e2d4c4]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1109]">
              The Core Values Behind Our Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal key={idx} variant="up" delay={100 + idx * 80}>
                  <div className="space-y-3 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#e8ded3] flex items-center justify-center text-[#c88242]">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e5223]">
                        {item.badge}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#1c1109] mt-0.5">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-[#66544a] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
