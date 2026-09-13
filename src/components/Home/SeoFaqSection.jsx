import { useState } from "react";
import { ChevronDown, MapPin, Sparkles, Coffee, Navigation, Star, Phone, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Which is the best café near SUM Ultimate Medicare in Bhubaneswar?",
      a: "Everbloom Café is ranked as Bhubaneswar's favorite artisanal café situated right near SUM Ultimate Medicare in K8 Kalinga Nagar. Located just 2 minutes from the hospital landmark, it offers artisanal espresso coffees, stone-baked pizzas, loaded gourmet wraps, burgers, cooling mocktails, and fresh desserts in both an air-conditioned indoor lounge and a leafy nature garden patio.",
      badge: "Top Rated Near SUM",
    },
    {
      q: "Why is Everbloom Café famous as one of the best cafés in Bhubaneswar?",
      a: "Guests love Everbloom Café for its aesthetic botanical atmosphere, hand-painted floral rose lady photo mural wall, 100% single-origin Arabica coffee beans, pocket-friendly gourmet menu (₹200–₹400 per person), fast WiFi for work or study, and warm hospitality.",
      badge: "Guest Favorite",
    },
    {
      q: "What are the operating hours and location of Everbloom Café?",
      a: "Everbloom Café is open 7 days a week from 1:00 PM to 10:15 PM. We are located at K-8/796, Near SUM Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar, Odisha 751029 with convenient parking.",
      badge: "Daily 1 PM – 11 PM",
    },
    {
      q: "Is Everbloom Café suitable for couples, remote work, birthdays, and family hangouts?",
      a: "Yes! Everbloom features dual ambience: a cozy, climate-controlled indoor AC lounge with work-friendly plug points and high-speed WiFi, plus a romantic, fairy-lit garden patio for dates, birthdays, and group celebrations.",
      badge: "Couples & Remote Work",
    },
    {
      q: "What are the must-try food items and drinks at Everbloom Café?",
      a: "Signature recommendations include our Spanish Latte, Iced Caramel Macchiato, Crispy Cottage Cheese Gourmet Wrap, Stone-Baked Truffle Mushroom Pizza, Classic Tiramisu, Loaded Nachos, and Nutella Frappé.",
      badge: "Chef's Recommendations",
    },
    {
      q: "How can I get directions or reserve a table at Everbloom Café?",
      a: "You can easily navigate to Everbloom Café using Google Maps or call us directly at +91 94371 64578 / +91 97787 95952 for table bookings, birthday reservations, or takeaway orders.",
      badge: "Easy Booking",
    },
  ];

  return (
    <section id="faq-guide" className="section-padding py-12 sm:py-16 lg:py-24 bg-[#faf7f2] relative overflow-hidden border-t border-[#e8ded3]/80">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-[#c88242]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="up" className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c88242]/15 text-[#c88242] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 border border-[#c88242]/20">
            <Sparkles className="w-3 h-3 text-[#c88242]" />
            <span>VISITOR GUIDE &amp; FAQs</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] mb-3 leading-snug">
            Bhubaneswar's Favorite Café <br className="hidden sm:inline" />
            <span className="text-[#c88242] italic font-serif">Near SUM Ultimate Medicare</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#6b5c54] font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about visiting Everbloom Café — your top destination for gourmet coffee, delicious bites, and aesthetic hangout vibes in Kalinga Nagar, Bhubaneswar.
          </p>
        </ScrollReveal>

        {/* Local Area Highlight Landmark Card - Fully Responsive */}
        <ScrollReveal variant="up" delay={100} className="mb-8 sm:mb-12">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#20120b] via-[#2a170e] to-[#1a0e08] text-white shadow-2xl border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#c88242]/20 flex items-center justify-center text-[#e29b5a] shrink-0 border border-[#c88242]/30 mt-0.5 shadow-inner">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#e29b5a] bg-[#c88242]/20 px-2.5 py-0.5 rounded-full border border-[#c88242]/30">
                    Prime Landmark
                  </span>
                  <div className="flex items-center text-amber-400 text-[11px] sm:text-xs font-bold gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.7 (169+ Google Reviews)</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-serif text-white mb-1.5 leading-snug">
                  Best Café in Kalinga Nagar · Near SUM Ultimate Medicare
                </h3>
                <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
                  Conveniently situated in K8 Kalinga Nagar, just minutes away from SUM Ultimate Medicare, Ghatikia, Khandagiri &amp; Patrapada.
                </p>
              </div>
            </div>

            {/* Direction & Call Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t border-white/10 md:border-none">
              <a
                href="https://maps.google.com/?q=Everbloom+Kalinga+Nagar+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#c87935] to-[#b36526] hover:from-[#d9853e] hover:to-[#be6f2d] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#c87935]/25 transition-all text-center whitespace-nowrap active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:09437164578"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 sm:px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 text-center whitespace-nowrap active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e29b5a]" />
                <span>Call Café</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs Accordion Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} variant="up" delay={idx * 50}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-[#c88242]/40 shadow-md"
                      : "bg-white/85 hover:bg-white border-[#e8ded3] shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-3.5 sm:p-5 sm:p-6 text-left flex items-center justify-between gap-3 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-[#c88242] text-white" : "bg-[#faf7f2] text-[#c88242] border border-[#e8ded3]"
                      }`}>
                        <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#c88242] block mb-0.5">
                          {faq.badge}
                        </span>
                        <h4 className="font-serif text-xs sm:text-base md:text-lg font-bold text-[#1c1109] leading-snug">
                          {faq.q}
                        </h4>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#8c7a70] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#c88242]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#5c4d44] leading-relaxed border-t border-[#f0e8e0] mt-1">
                      <div className="flex items-start gap-2 pt-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
