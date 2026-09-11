import { Link } from "react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  Megaphone,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldCheck,
  X,
  Coffee,
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  adminUser,
  onLogout,
  pendingReservationsCount = 0,
  unreadMessagesCount = 0,
  isMobileOpen = false,
  onCloseMobile = () => {},
}) {
  const navItems = [
    {
      id: "overview",
      label: "Dashboard",
      subtitle: "Analytics & Pulse",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "menu",
      label: "Menu & Pricing",
      subtitle: "Dishes & In-Stock",
      icon: UtensilsCrossed,
      badge: null,
    },
    {
      id: "reservations",
      label: "Table Bookings",
      subtitle: "Guest Reservations",
      icon: CalendarCheck,
      badge: pendingReservationsCount > 0 ? `${pendingReservationsCount} New` : null,
      badgeColor: "bg-amber-500 text-white animate-pulse",
    },
    {
      id: "popups",
      label: "Promo Popups",
      subtitle: "Offers & Announcements",
      icon: Megaphone,
      badge: null,
    },
    {
      id: "photos",
      label: "Photo Gallery",
      subtitle: "Murals & Ambience",
      icon: ImageIcon,
      badge: null,
    },
    {
      id: "inquiries",
      label: "Guest Inquiries",
      subtitle: "Contact Feedback",
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} Unread` : null,
      badgeColor: "bg-[#c88242] text-white",
    },
    {
      id: "settings",
      label: "System & Tools",
      subtitle: "Database & Reset",
      icon: Settings,
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#130a06] via-[#1c1109] to-[#120a07] text-white border-r border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#c88242]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-40 h-40 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#c88242] to-[#e29b5a] text-white flex items-center justify-center shadow-lg shadow-[#c88242]/30 font-serif font-bold text-lg border border-white/20">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight text-white">
                  Everbloom
                </span>
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#c88242]/30 text-[#fcd9b8] font-extrabold tracking-wider border border-[#c88242]/40">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-white/50">Café Hub &amp; Live Operations</p>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live System Indicator Pill */}
        <div className="mb-4 px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold text-white/80">Atlas Connected</span>
          </div>
          <span className="text-[10px] text-white/40 font-mono">Bhubaneswar</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-200 group text-left ${
                  isActive
                    ? "bg-gradient-to-r from-[#c88242] to-[#a66a33] text-white shadow-lg shadow-[#c88242]/30 translate-x-1 font-bold"
                    : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className={`text-xs leading-tight ${isActive ? "text-white font-bold" : "text-white/90"}`}>
                      {item.label}
                    </p>
                    <p className={`text-[10px] leading-tight ${isActive ? "text-white/80" : "text-white/40"}`}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {item.badge ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-opacity ${
                      isActive ? "text-white/80 opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick View Public Website Link */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <Link
            to="/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-white/80 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#e29b5a] group-hover:rotate-45 transition-transform" />
              Live Public Menu
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </Link>
        </div>
      </div>

      {/* Admin User Footer Card */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between mb-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c88242] to-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "E"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {adminUser?.name || "Everbloom Admin"}
              </p>
              <p className="text-[10px] text-white/50 truncate">
                {adminUser?.email || "admin@everbloom.com"}
              </p>
            </div>
          </div>

          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Super Admin Authenticated" />
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2 px-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out of Portal
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-full h-full z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

//dgdggdf