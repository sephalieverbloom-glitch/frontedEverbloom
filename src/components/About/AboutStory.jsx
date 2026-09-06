import React from "react";
import { Sparkles, CheckCircle2, Coffee, MapPin } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function AboutStory() {
  return (
    <section className="py-20 lg:py-28 bg-[#faf7f2] text-[#1c1109] relative overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c88242]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story & Genesis (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6">
            <ScrollReveal variant="left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0e3d2] text-[#8e5223] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#deb88b]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#c88242]" />
                <span>THE EVERBLOOM ORIGIN</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] leading-[1.2] mb-6">
                Where City Life Slows Down &amp; <span className="text-[#c88242] italic font-serif">Good Mood Blooms</span>
              </h2>

              <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed mb-6">
                Everbloom Café was envisioned and founded by <strong className="font-extrabold text-[#1c1109]">Sephali Swain</strong> on <strong className="font-extrabold text-[#1c1109]">June 27, 2025 (27/06/2025)</strong> out of a heartfelt aspiration: to build a sanctuary in Bhubaneswar where you can escape the rush of urban life and savor the purest single-origin brews alongside honest, scratch-made gourmet recipes.
              </p>

              <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed mb-8">
                Tucked quietly near Sum Ultimate Medicare in Kalinga Nagar, every corner is designed with intention — from our aromatic specialty beans to our lush greenery, warm ambient jazz, and iconic hand-painted floral rose lady mural wall.
              </p>

              {/* Editorial Highlights Points */}
              <div className="space-y-3 pt-4 border-t border-[#e8ded3]">
                <div className="flex items-center gap-3 text-sm text-[#2b1810]">
                  <CheckCircle2 className="w-4 h-4 text-[#c88242] shrink-0" />
                  <span>Founded by <strong className="font-bold text-[#1c1109]">Sephali Swain</strong> on <strong className="font-bold text-[#1c1109]">June 27, 2025 (27/06/2025)</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#2b1810]">
                  <CheckCircle2 className="w-4 h-4 text-[#c88242] shrink-0" />
                  <span>100% Single-Origin Arabica beans roasted to precision</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#2b1810]">
                  <CheckCircle2 className="w-4 h-4 text-[#c88242] shrink-0" />
                  <span>Pocket-friendly gourmet dining (₹200–₹400 average cost)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#2b1810]">
                  <CheckCircle2 className="w-4 h-4 text-[#c88242] shrink-0" />
                  <span>Work-friendly laptop tables with high-speed WiFi</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6">
            <ScrollReveal variant="right" delay={150}>
              <div className="relative">
                {/* Main Large Photo */}     
                <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#e8ded3] bg-[#20120b]">
                  <img
                    src="/everbloom/myimg.png"
                    alt="Everbloom Iconic Hand-Painted Rose Lady Mural"
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-[#f5c38e] font-bold mb-1">THE ICONIC WALL</p>
                    <p className="font-serif text-lg sm:text-xl font-bold">Hand-Painted Floral Rose Lady Mural</p>
                  </div>
                </div>

                {/* Floating Small Top Accent Card */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#e8ded3] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1c1109]">Est. 2025</p>
                    <p className="text-[10px] text-[#8c7a70]">Founded June 27, 2025</p>
                  </div>
                </div>

                {/* Floating Small Bottom Accent Card */}
                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#e8ded3] flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/15 flex items-center justify-center text-emerald-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-xs text-[#1c1109]">Sanctuary Vibe</p>
                    <p className="text-[10px] text-[#8c7a70]">Cozy &amp; Welcoming</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
