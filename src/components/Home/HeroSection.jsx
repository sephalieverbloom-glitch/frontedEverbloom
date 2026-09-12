import { Link } from "react-router";
import { Sparkles, MapPin, Wind, Trees, Camera, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#180e0a] text-white">
      {/* Real Cafe Hero Image (Replaced dark video with vibrant cafe interior) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="https://res.cloudinary.com/p2gsrga3/image/upload/v1789146209/myheroimg.png"
          alt="Everbloom Cafe Floral Mural Ambience"
          className="w-full h-full object-cover object-[center_35%] scale-100 filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 ease-out"
        />

        {/* Luminous Warm Vignettes - Balances text readability while preserving the vibrant floral colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-[#160c08]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(18,10,7,0.45)_80%,rgba(18,10,7,0.75)_100%)] pointer-events-none" />

        {/* Ambient Warm Rose & Golden Glow - Enhances the floral mural tones */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] md:w-[900px] h-[300px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-rose-500/15 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />
      </div>

      {/* Hero Content Center Stage */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 xs:pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-12 text-center flex flex-col items-center justify-center flex-1">

        {/* Live Pill Status with Real Ambiance Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/25 text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase mb-3.5 sm:mb-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_10px_#34d399]" />
          <span className="text-amber-200">🌸 Bhubaneswar's Floral Ambiance</span>
          <span className="text-white/40 hidden xs:inline">·</span>
          <span className="text-white/95">Open Daily 1 PM – 10:45 PM</span>
        </div>

        {/* Headline with Glowing Rose-Amber Bloom Gradient */}
        <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold mb-2.5 sm:mb-4 max-w-3xl leading-tight sm:leading-snug tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          <span className="block sm:inline">Where Good Food &amp; Coffee </span>
          <span className="font-serif italic font-normal bg-gradient-to-r from-[#ffe4c4] via-[#ff9e7d] to-[#f472b6] bg-clip-text text-transparent inline-block drop-shadow-[0_2px_25px_rgba(251,158,125,0.7)]">
            Bloom Together
          </span>
        </h1>

        {/* Subtitle - Crisp, Vibrant & Readable */}
        <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-xs sm:max-w-xl mb-6 sm:mb-8 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          <span className="sm:hidden">Handcrafted coffees, loaded wraps &amp; aesthetic floral mural in Bhubaneswar.</span>
          <span className="hidden sm:inline">Handcrafted espresso brews, loaded gourmet wraps, stone-baked pizzas &amp; soothing floral patio lounge in Bhubaneswar.</span>
        </p>

        {/* Quick Action Buttons with Glowing Warm Colors */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md mb-7 sm:mb-10">
          <Link
            to="/menu"
            className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold gap-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#e07538] via-[#e88d44] to-[#cf6728] hover:from-[#e88d44] hover:to-[#e07538] text-white shadow-[0_8px_30px_rgba(224,117,56,0.55)] hover:shadow-[0_12px_40px_rgba(224,117,56,0.75)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-200" /> Explore Menu
          </Link>

          <a
            href="https://maps.google.com/?q=Everbloom+Kalinga+Nagar+Bhubaneswar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold gap-2 inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl border border-white/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
          >
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-300" /> Directions
          </a>
        </div>

        {/* Mobile: Ultra-Sleek Colorful Glass Pills */}
        <div className="sm:hidden flex flex-wrap items-center justify-center gap-2 w-full max-w-sm text-[11px] font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-teal-950/70 backdrop-blur-xl border border-teal-400/40 text-teal-200 flex items-center gap-1.5 shadow-md">
            <Wind className="w-3 h-3 text-teal-300" /> Indoor AC
          </span>
          <span className="px-3 py-1.5 rounded-full bg-rose-950/70 backdrop-blur-xl border border-rose-400/40 text-rose-200 flex items-center gap-1.5 shadow-md">
            <Camera className="w-3 h-3 text-rose-300" /> Photo Mural
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-xl border border-emerald-400/40 text-emerald-200 flex items-center gap-1.5 shadow-md">
            <Trees className="w-3 h-3 text-emerald-300" /> Garden Patio
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-950/70 backdrop-blur-xl border border-amber-400/40 text-amber-200 flex items-center gap-1.5 shadow-md">
            <Clock className="w-3 h-3 text-amber-300" /> 1–11 PM
          </span>
        </div>

        {/* Tablet / Desktop: 4 Colorful Glass Cards Matching Real Cafe Colors */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 w-full max-w-4xl text-left">
          {/* Card 1: Teal Theme (Matching cafe chairs) */}
          <div className="flex items-center gap-2.5 bg-teal-950/50 hover:bg-teal-900/60 backdrop-blur-xl p-3.5 rounded-2xl border border-teal-400/35 transition-all duration-300 shadow-[0_6px_20px_rgba(13,148,136,0.15)] hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-xl bg-teal-500/25 flex items-center justify-center text-teal-300 shrink-0 border border-teal-400/40 shadow-[0_0_12px_rgba(45,212,191,0.25)]">
              <Wind className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Indoor AC</p>
              <p className="text-[10px] text-teal-200/80 leading-tight mt-0.5">Cool Lounge</p>
            </div>
          </div>

          {/* Card 2: Emerald Theme (Matching greenery) */}
          <div className="flex items-center gap-2.5 bg-emerald-950/50 hover:bg-emerald-900/60 backdrop-blur-xl p-3.5 rounded-2xl border border-emerald-400/35 transition-all duration-300 shadow-[0_6px_20px_rgba(16,185,129,0.15)] hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/25 flex items-center justify-center text-emerald-300 shrink-0 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]">
              <Trees className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Nature Patio</p>
              <p className="text-[10px] text-emerald-200/80 leading-tight mt-0.5">Garden Area</p>
            </div>
          </div>

          {/* Card 3: Rose Theme (Matching floral mural) */}
          <div className="flex items-center gap-2.5 bg-rose-950/50 hover:bg-rose-900/60 backdrop-blur-xl p-3.5 rounded-2xl border border-rose-400/35 transition-all duration-300 shadow-[0_6px_20px_rgba(244,63,94,0.15)] hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-xl bg-rose-500/25 flex items-center justify-center text-rose-300 shrink-0 border border-rose-400/40 shadow-[0_0_12px_rgba(251,113,133,0.25)]">
              <Camera className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Photo Wall</p>
              <p className="text-[10px] text-rose-200/80 leading-tight mt-0.5">Floral Mural</p>
            </div>
          </div>

          {/* Card 4: Amber Theme (Matching warm lanterns & timings) */}
          <div className="flex items-center gap-2.5 bg-amber-950/50 hover:bg-amber-900/60 backdrop-blur-xl p-3.5 rounded-2xl border border-amber-400/35 transition-all duration-300 shadow-[0_6px_20px_rgba(245,158,11,0.15)] hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-xl bg-amber-500/25 flex items-center justify-center text-amber-300 shrink-0 border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">1 PM – 11 PM</p>
              <p className="text-[10px] text-amber-200/80 leading-tight mt-0.5">Open Daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

