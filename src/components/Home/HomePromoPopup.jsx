import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { popupApi } from "../../lib/api";

const DEFAULT_PROMO = {
  active: true,
  badge: "WEEKEND SPECIAL",
  title: "Weekend Artisanal Brew Tasting",
  subtitle: "Get 20% off on all signature hand-poured coffees & fresh berry coolers this Saturday & Sunday.",
  imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop",
  ctaText: "Explore Full Menu",
  ctaLink: "/menu"
};

export default function HomePromoPopup() {
  const [popup, setPopup] = useState(DEFAULT_PROMO);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    // Check if user dismissed the popup today
    const dismissedDate = localStorage.getItem("everbloom_popup_dismissed_date");
    const today = new Date().toDateString();

    if (dismissedDate === today) {
      return;
    }

    const fetchPopup = async () => {
      try {
        const res = await popupApi.getActive();
        if (res && res.success && res.data && res.data.active) {
          setPopup({
            ...res.data,
            badge: res.data.badge || "WEEKEND SPECIAL",
            ctaText: res.data.ctaText || "Explore Full Menu",
            ctaLink: res.data.ctaLink || "/menu"
          });
        }
      } catch (err) {
        console.log("Using default promo showcase:", err);
      } finally {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 900);
        return () => clearTimeout(timer);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem("everbloom_popup_dismissed_date", new Date().toDateString());
    }
    setIsOpen(false);
  };

  if (!isOpen || !popup) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] bg-[#1a0e08] text-white rounded-[22px] sm:rounded-[26px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col animate-fade-in-up my-auto transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Section */}
        <div className="relative h-36 sm:h-40 md:h-44 w-full overflow-hidden bg-[#120a06] shrink-0">
          <img
            src={popup.imageUrl || DEFAULT_PROMO.imageUrl}
            alt={popup.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />

          {/* Seamless bottom fade into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08] via-[#1a0e08]/60 to-black/25 pointer-events-none" />

          {/* Top Left Badge */}
          <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c87935] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-white animate-pulse" />
              <span>{popup.badge || "WEEKEND SPECIAL"}</span>
            </span>
          </div>

          {/* Top Right Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg transition-all active:scale-95"
            aria-label="Close Announcement"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0.5 flex flex-col justify-between">
          <div>
            {/* Headline Title */}
            <h3 className="font-display text-lg sm:text-xl md:text-[22px] font-bold text-white tracking-tight leading-snug mb-1.5">
              {popup.title}
            </h3>

            {/* Description / Subtitle */}
            <p className="text-xs sm:text-[13px] text-white/80 font-normal leading-relaxed mb-4">
              {popup.subtitle}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Primary Caramel Button */}
              <Link
                to={popup.ctaLink || "/menu"}
                onClick={handleClose}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c87935] to-[#b36526] hover:from-[#d9853e] hover:to-[#be6f2d] text-white font-bold text-xs sm:text-[13px] shadow-lg shadow-[#c87935]/25 transition-all hover:scale-[1.02] active:scale-95 text-center"
              >
                <span>{popup.ctaText || "Explore Full Menu"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Ghost Secondary Button */}
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                Maybe Later
              </button>
            </div>

            {/* Bottom Footer Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-white/60 gap-2">
              {/* Don't show today Checkbox */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-white/90 transition-colors">
                <input
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={(e) => setDontShowToday(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-white/10 border-white/20 text-[#c87935] focus:ring-[#c87935] accent-[#c87935] cursor-pointer shrink-0"
                />
                <span className="text-[10px] sm:text-[11px] text-white/70">Don't show again today</span>
              </label>

              {/* Cafe Branding */}
              <span className="text-[10px] font-bold text-[#c87935] tracking-widest uppercase shrink-0">
                EVERBLOOM CAFÉ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
