import { Menu as MenuIcon, RefreshCw, Plus, Sparkles, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminTopNavbar({
  activeTabTitle,
  onOpenMobile,
  onRefresh,
  isRefreshing,
  onAddNewDish,
}) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#e8ded3]/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-all shadow-sm">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="md:hidden p-2 rounded-2xl border border-[#e8ded3] bg-white text-[#2b1810] hover:bg-[#faf7f2] shadow-sm"
          aria-label="Open sidebar menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-extrabold tracking-wider text-[#c88242]">
            <span>EVERBLOOM CAFÉ</span>
            <ChevronRight className="w-3 h-3 text-[#6b5c54]/40" />
            <span className="text-[#6b5c54] font-semibold">PORTAL</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1109] leading-tight flex items-center gap-2">
            <span>{activeTabTitle}</span>
          </h1>
        </div>
      </div>

      {/* Right: Clock & Quick actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Clock Pill */}
        {currentTime && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf7f2] border border-[#e8ded3] text-[11px] font-bold text-[#6b5c54]">
            <Clock className="w-3.5 h-3.5 text-[#c88242]" />
            <span>{currentTime}</span>
          </div>
        )}

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2.5 rounded-2xl border border-[#e8ded3] bg-white hover:bg-[#faf7f2] text-[#6b5c54] hover:text-[#c88242] hover:border-[#c88242] transition-all shadow-sm disabled:opacity-50"
          title="Refresh All Realtime Data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#c88242]" : ""}`} />
        </button>

        {/* Add Dish Action Button */}
        <button
          onClick={onAddNewDish}
          className="bg-gradient-to-r from-[#c88242] to-[#a66a33] hover:from-[#a66a33] hover:to-[#8a5424] text-white px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#c88242]/20 hover:shadow-lg transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Signature Dish</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}

