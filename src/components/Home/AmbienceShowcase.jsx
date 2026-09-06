import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Trees, Wind, Camera, Wifi, Heart, Sparkles, Check } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function AmbienceShowcase() {
  const tabs = [
    {
      id: "patio",
      label: "Nature Garden Patio",
      icon: Trees,
      tag: "Open-Air Evening Vibe",
      heading: "Tranquil Garden Patio Under Fairy Lights",
      desc: "Our open-air nature patio is the soul of Everbloom Café. Surrounded by lush greenery, wooden textures, and warm twinkling string lights, it's the perfect sanctuary for peaceful evening dates, group laughter, and slow coffee sips.",
      image: "/everbloom/myimg.png",
      perks: ["Open-air garden breeze", "Warm evening fairy lights", "Pet-friendly outdoor seating", "Acoustic weekend sessions"],
    },
    {
      id: "lounge",
      label: "Indoor AC Lounge",
      icon: Wind,
      tag: "Climate Controlled Comfort",
      heading: "Chilled Botanical Indoor Lounge",
      desc: "Escape the midday sun in our cool, fully air-conditioned indoor lounge. Thoughtfully crafted with plush seating, warm amber lighting, and subtle coffee aroma — ideal for laptop work sessions, private meetings, or quiet reading.",
      image: "/everbloom/img2.png",
      perks: ["100% Climate controlled", "High-speed workstation WiFi", "Plush seating & power sockets", "Curated soft lo-fi music"],
    },
    {
      id: "mural",
      label: "Aesthetic Wall Mural",
      icon: Camera,
      tag: "Instagram Iconic Spot",
      heading: "The Blooming Floral Rose Lady Mural",
      desc: "No trip to Everbloom is complete without capturing a moment at our signature blooming floral wall mural. Designed by local artists, it offers a vibrant, elegant backdrop for your Instagram memories and celebratory photo moments.",
      image: "/MYHERO/myheroimg.png",
      perks: ["Bhubaneswar's iconic photo spot", "Warm studio-grade lighting", "Artisanal floral artwork", "Celebration photo ready"],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return <section className="section-padding py-20 lg:py-28 bg-[#180e0a] text-white relative overflow-hidden">
      {/* Dynamic Tab-Reactive Ambient Color Halos */}
      <div
        className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          activeTab.id === "patio"
            ? "bg-emerald-500/25"
            : activeTab.id === "lounge"
            ? "bg-teal-500/25"
            : "bg-rose-500/30"
        }`}
      />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Top Header with Scroll Reveal */}
        <ScrollReveal variant="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-teal-500/20 border border-white/20 text-amber-200 text-[11px] font-extrabold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>IMMERSIVE CAFE EXPERIENCE</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] mb-3 text-white">
            A Sanctuary of{" "}
            <span className="italic bg-gradient-to-r from-[#ffe4c4] via-[#ff9e7d] to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(251,158,125,0.5)]">
              Flavor &amp; Ambiance
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-normal max-w-lg mx-auto">
            Switch spaces below to explore our climate-controlled AC lounge, floral photo mural, and open garden patio.
          </p>
        </ScrollReveal>

        {/* Interactive Colorful Tab Selector Buttons */}
        <ScrollReveal variant="scale" delay={150} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab.id === tab.id;

            // Unique color styling per tab
            const tabColors = {
              patio: isSelected
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] border-emerald-400"
                : "hover:border-emerald-400/50 hover:text-emerald-300",
              lounge: isSelected
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-[0_0_25px_rgba(20,184,166,0.5)] border-teal-400"
                : "hover:border-teal-400/50 hover:text-teal-300",
              mural: isSelected
                ? "bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.5)] border-rose-400"
                : "hover:border-rose-400/50 hover:text-rose-300",
            };

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`px-5 sm:px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2.5 backdrop-blur-xl border ${
                  isSelected
                    ? `${tabColors[tab.id]} scale-105 shadow-xl`
                    : `bg-white/[0.08] text-white/85 border-white/15 hover:bg-white/[0.14] ${tabColors[tab.id]}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-amber-300"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </ScrollReveal>

        {/* Showcase Grid with Dual Directional Scroll Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Narrative */}
          <ScrollReveal variant="left" delay={200} className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className={`w-8 h-[2px] ${
                activeTab.id === "patio" ? "bg-emerald-400" : activeTab.id === "lounge" ? "bg-teal-400" : "bg-rose-400"
              }`} />
              <span className={`text-[11px] font-extrabold tracking-[0.2em] uppercase ${
                activeTab.id === "patio" ? "text-emerald-300" : activeTab.id === "lounge" ? "text-teal-300" : "text-rose-300"
              }`}>
                {activeTab.tag}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-white">
              {activeTab.heading}
            </h3>

            <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
              {activeTab.desc}
            </p>

            {/* Perks checklist with glowing glass tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeTab.perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs text-white/95 font-medium bg-white/[0.07] hover:bg-white/[0.12] p-3 rounded-2xl border border-white/15 backdrop-blur-md transition-all shadow-sm"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    activeTab.id === "patio"
                      ? "bg-emerald-500/25 text-emerald-300"
                      : activeTab.id === "lounge"
                      ? "bg-teal-500/25 text-teal-300"
                      : "bg-rose-500/25 text-rose-300"
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="py-3 sm:py-3.5 px-6 rounded-full font-bold text-xs gap-2 inline-flex items-center justify-center bg-gradient-to-r from-[#e07538] via-[#e88d44] to-[#cf6728] text-white shadow-[0_4px_25px_rgba(224,117,56,0.5)] hover:shadow-[0_8px_35px_rgba(224,117,56,0.7)] transition-all hover:scale-105"
              >
                <span>Reserve a Table in this Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/gallery"
                className="text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10"
              >
                View Photo Gallery →
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Large Image with Dynamic Glow Halo */}
          <ScrollReveal variant="right" delay={250} className="lg:col-span-6">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border transition-all duration-700 group p-2 bg-black/40 backdrop-blur-xl ${
              activeTab.id === "patio"
                ? "border-emerald-500/40 shadow-[0_10px_40px_rgba(16,185,129,0.25)]"
                : activeTab.id === "lounge"
                ? "border-teal-500/40 shadow-[0_10px_40px_rgba(20,184,166,0.25)]"
                : "border-rose-500/40 shadow-[0_10px_40px_rgba(244,63,94,0.25)]"
            }`}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  key={activeTab.id}
                  src={activeTab.image}
                  alt={activeTab.heading}
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 animate-fadeIn"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Floating Space Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] uppercase tracking-wider text-white font-bold border border-white/20 shadow-lg flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-ping ${
                      activeTab.id === "patio" ? "bg-emerald-400" : activeTab.id === "lounge" ? "bg-teal-400" : "bg-rose-400"
                    }`} />
                    {activeTab.label}
                  </span>

                  <span className="text-[10px] text-white/90 font-semibold bg-white/15 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                    Bhubaneswar
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
}
