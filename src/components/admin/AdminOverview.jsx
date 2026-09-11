import {
  UtensilsCrossed,
  CheckCircle2,
  CalendarCheck,
  MessageSquare,
  Plus,
  RefreshCw,
  ExternalLink,
  Clock,
  User,
  Phone,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Megaphone,
  Coffee,
  HeartHandshake,
  Check,
  Flame,
} from "lucide-react";

export default function AdminOverview({
  stats,
  menuItems = [],
  reservations = [],
  contacts = [],
  onNavigateTab,
  onAddNewDish,
  onSeedMenu,
  onUpdateReservationStatus,
}) {
  const totalItems = menuItems.length;
  const inStockCount = menuItems.filter((i) => i.isAvailable !== false).length;
  const inStockPercent = totalItems > 0 ? Math.round((inStockCount / totalItems) * 100) : 100;
  
  const pendingReservations = reservations.filter((r) => r.status === "pending");
  const confirmedReservations = reservations.filter((r) => r.status === "confirmed" || r.status === "seated");
  const newInquiries = contacts.filter((c) => c.status === "new" || !c.status);

  // Group dish count by category
  const categories = [
    { name: "Starters & Wraps", count: menuItems.filter((i) => i.category === "Starters & Wraps").length, color: "bg-amber-500" },
    { name: "Pizzas & Burgers", count: menuItems.filter((i) => i.category === "Pizzas & Burgers").length, color: "bg-red-500" },
    { name: "Pastas & Mains", count: menuItems.filter((i) => i.category === "Pastas & Mains").length, color: "bg-orange-500" },
    { name: "Signature Coolers", count: menuItems.filter((i) => i.category === "Signature Coolers").length, color: "bg-emerald-500" },
    { name: "Coffee & Desserts", count: menuItems.filter((i) => i.category === "Coffee & Desserts").length, color: "bg-[#c88242]" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c1109] via-[#2c1910] to-[#170e0a] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c88242]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#fcd9b8] text-[11px] font-extrabold uppercase tracking-wider mb-3 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#e29b5a]" />
              <span>EVERBLOOM LIVE OPERATIONS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-2">
              Welcome back to <span className="text-[#fcd9b8] font-serif italic">Everbloom Hub</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Real-time kitchen availability, live table reservations, guest inquiries, and seasonal promotional controls for Bhubaneswar café.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onAddNewDish}
              className="bg-gradient-to-r from-[#c88242] to-[#a66a33] hover:from-[#a66a33] hover:to-[#8a5424] text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#c88242]/30 hover:scale-102 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Dish</span>
            </button>
            <button
              onClick={() => onNavigateTab("reservations")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#fcd9b8]" />
              <span>View Bookings ({reservations.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Dishes */}
        <div
          onClick={() => onNavigateTab("menu")}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded3] shadow-sm hover:shadow-xl hover:border-[#c88242] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54]">
              Active Dishes
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 text-[#c88242] flex items-center justify-center group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl font-normal text-[#1c1109]">{totalItems}</span>
            <span className="text-[11px] font-bold text-[#c88242] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div className="text-[11px] text-[#6b5c54] flex items-center justify-between">
            <span>5 Core Categories</span>
            <span className="font-bold text-emerald-600">{inStockCount} In Stock</span>
          </div>
        </div>

        {/* Card 2: Kitchen Stock Rate */}
        <div
          onClick={() => onNavigateTab("menu")}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded3] shadow-sm hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54]">
              Kitchen Stock Rate
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl font-normal text-emerald-700">
              {inStockPercent}%
            </span>
            <span className="text-xs font-bold text-gray-400">
              {inStockCount}/{totalItems}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${inStockPercent}%` }}
            />
          </div>
        </div>

        {/* Card 3: Pending Reservations */}
        <div
          onClick={() => onNavigateTab("reservations")}
          className={`rounded-3xl p-5 sm:p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
            pendingReservations.length > 0
              ? "bg-amber-50/50 border-amber-300 hover:border-amber-500"
              : "bg-white border-[#e8ded3] hover:border-[#c88242]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54]">
              Table Bookings
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl font-normal text-[#1c1109]">
              {reservations.length}
            </span>
            {pendingReservations.length > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                {pendingReservations.length} Pending
              </span>
            ) : (
              <span className="text-[11px] font-bold text-emerald-600">All Handled</span>
            )}
          </div>
          <p className="text-[11px] text-[#6b5c54] truncate">
            {pendingReservations.length > 0
              ? "Action required: Confirm pending seats"
              : `${confirmedReservations.length} confirmed bookings`}
          </p>
        </div>

        {/* Card 4: Guest Inquiries */}
        <div
          onClick={() => onNavigateTab("inquiries")}
          className={`rounded-3xl p-5 sm:p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
            newInquiries.length > 0
              ? "bg-rose-50/50 border-rose-300 hover:border-rose-500"
              : "bg-white border-[#e8ded3] hover:border-[#c88242]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54]">
              Guest Inquiries
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 text-[#c88242] flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl font-normal text-[#1c1109]">
              {contacts.length}
            </span>
            {newInquiries.length > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                {newInquiries.length} New
              </span>
            ) : (
              <span className="text-[11px] font-bold text-[#6b5c54]">Inbox Clear</span>
            )}
          </div>
          <p className="text-[11px] text-[#6b5c54] truncate">
            {newInquiries.length > 0
              ? "Unread messages awaiting reply"
              : "All feedback answered"}
          </p>
        </div>
      </div>

      {/* Main 2-Column Split: Menu Breakdown & Live Reservations Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Category Breakdown & Quick Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Menu Category Breakdown Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ded3] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#1c1109]">
                  Menu Category Distribution
                </h3>
                <p className="text-xs text-[#6b5c54]">
                  Active dish counts across Everbloom's 5 core culinary sections
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("menu")}
                className="text-xs font-bold text-[#c88242] hover:underline flex items-center gap-1"
              >
                Manage Menu <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {categories.map((cat) => {
                const percent = totalItems > 0 ? Math.round((cat.count / totalItems) * 100) : 0;
                return (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2b1810]">{cat.name}</span>
                      <span className="text-[#6b5c54] font-semibold">
                        {cat.count} items ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${cat.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Power Actions Bar */}
          <div className="bg-gradient-to-r from-[#faf7f2] to-[#f4ebe1] rounded-3xl p-6 border border-[#e8ded3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c88242]/20 text-[#c88242] flex items-center justify-center shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-normal text-[#1c1109]">
                  Instant Signature Menu Reset
                </h4>
                <p className="text-xs text-[#6b5c54]">
                  Re-seed all 15 authentic Everbloom café signature dishes into database.
                </p>
              </div>
            </div>

            <button
              onClick={onSeedMenu}
              className="bg-[#2b1810] hover:bg-[#1a0e09] text-white px-5 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase shrink-0 shadow-md hover:shadow-lg transition-all"
            >
              Seed 15 Dishes
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Recent Table Bookings Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ded3] shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#c88242]" />
                  <h3 className="font-serif text-xl font-normal text-[#1c1109]">
                    Recent Bookings
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateTab("reservations")}
                  className="text-xs font-bold text-[#c88242] hover:underline"
                >
                  View All
                </button>
              </div>

              {reservations.length === 0 ? (
                <div className="py-10 text-center text-[#6b5c54]">
                  <CalendarCheck className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-xs font-bold">No table bookings yet.</p>
                  <p className="text-[11px]">Bookings made on the website will appear here in real time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reservations.slice(0, 4).map((res) => {
                    const resId = res._id || res.id;
                    const isPending = res.status === "pending";

                    return (
                      <div
                        key={resId}
                        className={`p-4 rounded-2xl border transition-all ${
                          isPending
                            ? "bg-amber-50/60 border-amber-200"
                            : "bg-[#faf7f2] border-[#e8ded3]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-xs font-bold text-[#2b1810] flex items-center gap-1.5">
                              <span>{res.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-semibold text-[#6b5c54] border border-[#e8ded3]">
                                {res.guests} Guests
                              </span>
                            </p>
                            <p className="text-[11px] text-[#6b5c54] flex items-center gap-2 mt-0.5">
                              <span>📅 {res.date}</span>
                              <span>⏰ {res.time}</span>
                            </p>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              isPending
                                ? "bg-amber-500 text-white"
                                : res.status === "confirmed"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>

                        {/* Quick Confirm action if pending */}
                        {isPending && (
                          <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-amber-800">
                              Guest waiting for confirmation
                            </span>
                            <button
                              onClick={() => onUpdateReservationStatus(resId, "confirmed")}
                              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors"
                            >
                              <Check className="w-3 h-3" /> Confirm Table
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#e8ded3] text-center">
              <button
                onClick={() => onNavigateTab("reservations")}
                className="w-full py-2.5 rounded-2xl bg-[#faf7f2] hover:bg-[#e8ded3] text-xs font-bold text-[#2b1810] transition-colors"
              >
                Go to Reservation Center →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
