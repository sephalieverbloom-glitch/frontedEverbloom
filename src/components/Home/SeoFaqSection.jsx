import { useState } from "react";
import { ChevronDown, MapPin, Sparkles, Coffee, Navigation, Star, Phone, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { ADDRESS, PHONE_PRIMARY } from "../../const";

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
      a: "Everbloom Café is open 7 days a week from 1:00 PM to 11:00 PM. We are located at K-8/796, Near SUM Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar, Odisha 751029 with convenient parking.",
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
    <section id="faq-guide" className="section-padding py-16 lg:py-24 bg-[#faf7f2] relative overflow-hidden border-t border-[#e8ded3]/80">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#c88242]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/15 text-[#c88242] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c88242]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#c88242]" />
            <span>LOCAL SEO &amp; VISITOR GUIDE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] mb-4">
            Bhubaneswar's Favorite Café <br className="hidden sm:inline" />
            <span className="text-[#c88242] italic">Near SUM Ultimate Medicare</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6b5c54] font-light leading-relaxed">
            Everything you need to know about visiting Everbloom Café — your top destination for gourmet coffee, delicious bites, and aesthetic hangout vibes in Kalinga Nagar, Bhubaneswar.
          </p>
        </ScrollReveal>

        {/* Local Area Highlight Card */}
        <ScrollReveal variant="up" delay={100} className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20120b] via-[#2d1b12] to-[#1c1109] text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c88242]/20 flex items-center justify-center text-[#e29b5a] shrink-0 border border-[#c88242]/30 mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e29b5a] bg-[#c88242]/20 px-2.5 py-0.5 rounded-full">Prime Landmark</span>
                  <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.7 (169+ Google Reviews)</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mb-1">
                  Best Café in Kalinga Nagar · Near SUM Ultimate Medicare
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
                  Conveniently situated in K8 Kalinga Nagar, just minutes away from SUM Ultimate Medicare, Ghatikia, Khandagiri &amp; Patrapada.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://maps.google.com/?q=Everbloom+Kalinga+Nagar+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-caramel py-3 px-5 text-xs font-bold gap-2 flex-1 md:flex-initial shadow-md"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
              <a
                href="tel:09437164578"
                className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all flex-1 md:flex-initial border border-white/20"
              >
                <Phone className="w-4 h-4 text-[#e29b5a]" /> Call Café
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs Accordion Grid */}
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} variant="up" delay={idx * 60}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-[#c88242]/40 shadow-lg"
                      : "bg-white/80 hover:bg-white border-[#e8ded3] shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-[#c88242] text-white" : "bg-[#faf7f2] text-[#c88242] border border-[#e8ded3]"
                      }`}>
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#c88242] block mb-0.5">
                          {faq.badge}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#1c1109]">
                          {faq.q}
                        </h4>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8c7a70] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#c88242]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5c4d44] leading-relaxed border-t border-[#f0e8e0] mt-1">
                      <div className="flex items-start gap-2.5 pt-2">
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
