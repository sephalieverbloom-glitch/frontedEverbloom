import { Link } from "react-router";
import { Sparkles, Calendar, Phone, ArrowRight, MapPin, Clock } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function VisitCTASection() {
  return (
    <section className="section-padding py-24 lg:py-32 bg-[#120a07] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[750px] h-[350px] md:h-[450px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c88242]/30 via-amber-600/10 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      <ScrollReveal variant="scale" className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c88242]/20 border border-[#c88242]/30 text-[#fcd9b8] text-[10px] font-extrabold uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3" />
          TABLE RESERVATIONS
        </span>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-4 text-white leading-tight">
          Reserve Your Everbloom Experience
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-white/75 font-light max-w-lg mx-auto mb-10 leading-relaxed">
          Planning a peaceful coffee date, evening dinner with family, or group celebration? Reserve your table in our AC lounge or nature garden patio.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10">
          <Link
            to="/booking"
            className="btn-caramel w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold gap-2 shadow-[0_4px_25px_rgba(200,130,66,0.5)] hover:shadow-[0_8px_35px_rgba(200,130,66,0.7)] animate-pulse-ring"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK A TABLE NOW</span>
          </Link>

          <a
            href="tel:09437164578"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#e29b5a]" />
            <span>Call: +91 94371 64578</span>
          </a>
        </div>

        {/* Info Strip */}
        <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#e29b5a]" />
            Open Daily: 1:00 PM –10:15 PM
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#e29b5a]" />
            Kalinga Nagar, Near Sum Ultimate, Bhubaneswar
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
