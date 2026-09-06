import React, { forwardRef } from 'react';
import { Sparkles, Calendar, Coffee, Heart, Award, ArrowRight, MapPin, Compass } from 'lucide-react';

export interface MilestoneCardData {
  year: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  bgGradient: string;
  borderColor: string;
  rotation?: string;
  image?: string;
  icon?: any;
}

export const defaultMilestones: MilestoneCardData[] = [
  {
    year: '2023',
    badge: 'Inception & Vision',
    title: 'The Seed is Planted',
    description:
      'Envisioned by Sephali Swain as a peaceful botanical escape in Bhubaneswar where urban bustle gives way to rich single-origin espresso aromas and honest conversation.',
    highlight: 'Found our home near Sum Ultimate Medicare, Kalinga Nagar',
    bgGradient: 'from-[#2b1810] via-[#3a2217] to-[#1c1109]',
    borderColor: '#c88242',
    rotation: '-rotate-2 sm:-rotate-3',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    icon: Coffee,
  },
  {
    year: '2024',
    badge: 'Space & Artistry',
    title: 'Crafting the Botanical Sanctuary',
    description:
      'Commissioned our iconic hand-painted floral rose lady mural wall, built the sunlit AC lounge, and cultivated an open-air nature garden patio lit by gentle ambient fairy lights.',
    highlight: 'Dual-vibe zones: Chilled Indoor Lounge + Lush Outdoor Patio',
    bgGradient: 'from-[#1e2a22] via-[#2d3e33] to-[#141f17]',
    borderColor: '#52b788',
    rotation: 'rotate-1 sm:rotate-2',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles,
  },
  {
    year: '2025',
    badge: 'Official Launch',
    title: 'Doors Open (June 27, 2025)',
    description:
      'Everbloom Café officially opened on 27/06/2025. Introduced single-origin pour-overs, artisan loaded sourdough wraps, wood-fired thin pizzas, and signature Berry Blossom coolers.',
    highlight: 'Founded by Sephali Swain · 50+ handcrafted recipes',
    bgGradient: 'from-[#3a2016] via-[#4d2c1f] to-[#24130c]',
    borderColor: '#e29b5a',
    rotation: '-rotate-1 sm:-rotate-2',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    icon: Award,
  },
  {
    year: '2026 & Beyond',
    badge: 'Community Heart',
    title: 'A Thriving Gathering Sanctuary',
    description:
      'Welcoming guests daily for work, intimate dates, and family celebrations with a 4.7+ rating across Bhubaneswar. Where great food and good mood bloom together.',
    highlight: '169+ top Google Reviews & pocket-friendly gourmet dining',
    bgGradient: 'from-[#221711] via-[#332219] to-[#170e0a]',
    borderColor: '#d49748',
    rotation: 'rotate-0',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    icon: Heart,
  },
];

interface ScrollCardProps {
  cards?: MilestoneCardData[];
  heading?: string;
  subtitle?: string;
}

const ScrollCard = forwardRef<HTMLElement, ScrollCardProps>(
  (
    {
      cards = defaultMilestones,
      heading = 'How Everbloom Came to Bloom',
      subtitle = 'Every cup tells a chapter of our story. Scroll down to experience the journey that shaped our boutique sanctuary.',
    },
    ref
  ) => {
    return (
      <main
        ref={ref}
        className="w-full bg-[#120a07] text-white relative py-16 sm:py-24 lg:py-28 border-t border-white/10"
      >
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c88242]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16 lg:mb-20 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#fcd9b8] text-xs font-semibold tracking-wider uppercase mb-4 border border-white/15 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#e29b5a]" />
            <span>THE EVERBLOOM CHRONICLE</span>
            <Sparkles className="w-3.5 h-3.5 text-[#e29b5a]" />
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4 drop-shadow-md">
            {heading}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Responsive Stacking Scroll Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Sticky Guide (Desktop / Tablet) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e29b5a] mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Timeline Milestones</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  Our Blooming Chapters
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Founded by <strong className="text-white font-extrabold">Sephali Swain</strong> and established on <strong className="text-[#e29b5a] font-extrabold">June 27, 2025</strong>. Scroll down to browse through the landmark chapters of Everbloom Café.
                </p>

                {/* Progress Indicators */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  {cards.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <span className="font-serif font-bold text-[#fcd9b8]">{c.year}</span>
                      <span className="text-[11px] text-white/60 font-medium">{c.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stacking Cards List (Sticky on Scroll) */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16 pb-24">
              {cards.map((card, i) => {
                const IconComp = card.icon || Coffee;
                return (
                  <div
                    key={i}
                    className="sticky transition-all duration-300"
                    style={{
                      top: `calc(5.5rem + ${i * 22}px)`,
                      zIndex: i + 10,
                    }}
                  >
                    <div
                      className={`relative rounded-3xl p-6 sm:p-8 md:p-10 border shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.01] overflow-hidden bg-gradient-to-br ${card.bgGradient} ${card.rotation || ''}`}
                      style={{
                        borderColor: `${card.borderColor}50`,
                      }}
                    >
                      {/* Background Corner Glow */}
                      <div
                        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-40"
                        style={{ backgroundColor: card.borderColor }}
                      />

                      {/* Header Inside Card */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-serif text-3xl sm:text-4xl font-black tracking-tight drop-shadow"
                            style={{ color: card.borderColor }}
                          >
                            {card.year}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white shadow-sm">
                            {card.badge}
                          </span>
                        </div>

                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                          style={{ backgroundColor: `${card.borderColor}35` }}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Image + Content Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative z-10">
                        {/* Card Image */}
                        {card.image && (
                          <div className="sm:col-span-5 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg border border-white/10 relative group">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          </div>
                        )}

                        {/* Text Details */}
                        <div className={card.image ? 'sm:col-span-7 flex flex-col justify-between' : 'sm:col-span-12'}>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2.5 drop-shadow">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-4">
                            {card.description}
                          </p>
                          <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs font-semibold" style={{ color: card.borderColor }}>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            <span>{card.highlight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </main>
    );
  }
);

ScrollCard.displayName = 'ScrollCard';

export default ScrollCard;
