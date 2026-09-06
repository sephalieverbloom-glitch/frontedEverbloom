import React from "react";
import { Leaf, Recycle, HeartHandshake, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function AboutSustainability() {
  const commitments = [
    {
      icon: Leaf,
      title: "Direct-From-Estate Coffee",
      desc: "Our Arabica beans are ethically sourced from sustainable high-altitude estates in Chikmagalur and Coorg, ensuring fair remuneration for farmers.",
    },
    {
      icon: Recycle,
      title: "100% Eco-Conscious Packaging",
      desc: "All takeaway cups, wooden stirrers, meal containers, and paper bags are fully biodegradable and plastic-neutral.",
    },
    {
      icon: HeartHandshake,
      title: "Zero Preservatives & Additives",
      desc: "Fresh daily baking and sauce preparation without artificial flavor enhancers, chemical stabilizers, or high-fructose corn syrups.",
    },
    {
      icon: ShieldCheck,
      title: "Pet & Green Sanctuary Pledge",
      desc: "Our garden patio is maintained using non-toxic botanical treatments, creating a safe oasis for pets and floral biodiversity.",
    },
  ];

  return (
    <section className="section-padding py-20 lg:py-28 bg-gradient-to-b from-[#f2f8f4] via-[#eaf4ee] to-[#f4f7f4] text-[#1a2e22] relative overflow-hidden border-y border-emerald-100">
      {/* Ambient botanical garden glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Description */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4 border border-emerald-300/60 shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>ECO-CONSCIOUS &amp; MINDFUL</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-6 text-[#1a2e22]">
                Mindful Sourcing, <br />
                <span className="italic font-serif bg-gradient-to-r from-emerald-700 via-[#c88242] to-[#b8623b] bg-clip-text text-transparent">
                  Gentle Footprint
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#4a6353] font-normal leading-relaxed mb-8">
                We believe true hospitality honors the planet as much as our patrons. From ethical harvest relations to compostable service goods, every choice at Everbloom is made with deep environmental reverence.
              </p>

              <div className="p-6 rounded-3xl bg-white/90 border border-emerald-200/80 shadow-md backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2e22]">Our Green Promise</h4>
                </div>
                <p className="text-xs text-[#4a6353] leading-relaxed pl-10">
                  100% of our daily organic coffee grounds are repurposed as nutrient-rich compost for local botanical gardens across Bhubaneswar.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column 2x2 Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commitments.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal
                    key={idx}
                    variant="up"
                    delay={100 + idx * 80}
                    className="h-full"
                  >
                    <div className="h-full p-6 sm:p-7 rounded-3xl bg-white/95 hover:bg-white border border-emerald-100/90 shadow-md hover:shadow-xl hover:border-emerald-400/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 border border-emerald-200/60 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1a2e22] mb-2.5 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4a6353] font-normal leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
