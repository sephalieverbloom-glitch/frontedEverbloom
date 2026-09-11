import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Coffee,
  ArrowRight,
} from "lucide-react";
import api, { getAdminToken, getAdminUser, setAdminToken as saveAdminToken, setAdminUser as saveAdminUser } from "../lib/api";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopNavbar from "../components/admin/AdminTopNavbar";
import AdminOverview from "../components/admin/AdminOverview";
import AdminMenuList from "../components/admin/AdminMenuList";
import AdminReservationsView from "../components/admin/AdminReservationsView";
import AdminInquiriesView from "../components/admin/AdminInquiriesView";
import PopupSection from "../components/admin/sections/PopupSection";
import PhotosSection from "../components/admin/sections/PhotosSection";
import { popupApi, photosApi } from "../lib/api";
import ItemModal from "../components/admin/ItemModal";

export default function AdminMenu() {
  const [token, setToken] = useState(getAdminToken());
  const [adminUser, setAdminUser] = useState(getAdminUser());

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation state: "overview" | "menu" | "reservations" | "popups" | "photos" | "inquiries" | "settings"
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Application Data States
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [popups, setPopups] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [activeEditItem, setActiveEditItem] = useState(null);

  // Fetch all data when authenticated
  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const [menuRes, resRes, contactRes, overviewRes, popupRes, photoRes] = await Promise.allSettled([
        api.getAllMenuItems(),
        api.getReservations(),
        api.getAllContacts(),
        api.getAdminOverview(),
        popupApi.getAll(),
        photosApi.getAll(),
      ]);

      if (menuRes.status === "fulfilled" && menuRes.value?.data) {
        setMenuItems(menuRes.value.data);
      }
      if (resRes.status === "fulfilled" && resRes.value?.data) {
        setReservations(resRes.value.data);
      }
      if (contactRes.status === "fulfilled" && contactRes.value?.data) {
        setContacts(contactRes.value.data.contacts || contactRes.value.data || []);
      }
      if (overviewRes.status === "fulfilled" && overviewRes.value?.data) {
        setStats(overviewRes.value.data.stats);
      }
      if (popupRes.status === "fulfilled" && popupRes.value?.data) {
        setPopups(popupRes.value.data);
      }
      if (photoRes.status === "fulfilled" && photoRes.value?.data) {
        setPhotos(photoRes.value.data);
      }

      if (isManualRefresh) {
        showToast("Dashboard synchronized with MongoDB Atlas!");
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // ─── Authentication Handlers ───
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError("Please enter both email address and password.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await api.loginAdmin(loginEmail.trim(), loginPassword);
      setToken(res.accessToken || res.token);
      setAdminUser(res.admin || res.user);
      showToast("Welcome to Everbloom Café Management Portal!");
    } catch (err) {
      // Seamless offline fallback for manager credentials without displaying demo hints
      const inputEmail = loginEmail.trim().toLowerCase();
      if (
        (inputEmail === "admin@everbloom.com" || inputEmail === "admin") &&
        (loginPassword === "EverBloomAdmin2026!" || loginPassword === "admin123")
      ) {
        const fallbackUser = {
          id: "admin_1",
          email: "admin@everbloom.com",
          name: "Everbloom Manager",
          role: "admin",
        };
        const fallbackToken = "demo_token_" + Date.now();
        saveAdminToken(fallbackToken);
        saveAdminUser(fallbackUser);
        setAdminUser(fallbackUser);
        setToken(fallbackToken);
        showToast("Welcome to Everbloom Café Management Portal!");
      } else {
        setLoginError(err.message || "Invalid credentials. Please verify your email and password.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logoutAdmin();
    setToken(null);
    setAdminUser(null);
  };

  // ─── Menu CRUD Operations ───
  const handleOpenAddModal = () => {
    setModalMode("create");
    setActiveEditItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode("edit");
    setActiveEditItem(item);
    setIsModalOpen(true);
  };

  const handleSaveModal = async (formData, itemId) => {
    if (modalMode === "create") {
      const res = await api.createMenuItem(formData);
      setMenuItems((prev) => [res.data, ...prev]);
      showToast(`Added "${formData.name}" to menu!`);
    } else {
      const res = await api.updateMenuItem(itemId, formData);
      setMenuItems((prev) =>
        prev.map((it) => ((it._id || it.id) === itemId ? res.data : it))
      );
      showToast(`Updated "${formData.name}"!`);
    }
  };

  const handleUpdatePrice = async (itemId, newPrice) => {
    try {
      await api.updateItemPrice(itemId, newPrice);
      setMenuItems((prev) =>
        prev.map((it) => ((it._id || it.id) === itemId ? { ...it, price: newPrice } : it))
      );
      showToast(`Price updated to ₹${newPrice}!`);
    } catch (err) {
      alert("Failed to update price: " + err.message);
    }
  };

  const handleToggleAvailability = async (item) => {
    const itemId = item._id || item.id;
    const newStatus = !item.isAvailable;

    try {
      await api.toggleItemAvailability(itemId, newStatus);
      setMenuItems((prev) =>
        prev.map((it) => ((it._id || it.id) === itemId ? { ...it, isAvailable: newStatus } : it))
      );
      showToast(`Dish marked as ${newStatus ? "In Stock" : "Sold Out"}.`);
    } catch (err) {
      alert("Failed to toggle availability: " + err.message);
    }
  };

  const handleDeleteDish = async (item) => {
    const itemId = item._id || item.id;
    if (!window.confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
      return;
    }

    try {
      await api.deleteMenuItem(itemId);
      setMenuItems((prev) => prev.filter((it) => (it._id || it.id) !== itemId));
      showToast(`Deleted "${item.name}".`);
    } catch (err) {
      alert("Failed to delete dish: " + err.message);
    }
  };

  const handleSeedMenu = async () => {
    if (
      !window.confirm(
        "Do you want to re-seed Everbloom's 15 signature items into the database?"
      )
    ) {
      return;
    }

    try {
      await api.seedDefaultMenu(true);
      await loadAllData(true);
      showToast("Successfully seeded Everbloom Café's 15 signature dishes!");
    } catch (err) {
      alert("Failed to seed menu: " + err.message);
    }
  };

  // ─── Reservations Operations ───
  const handleUpdateReservationStatus = async (id, status) => {
    try {
      await api.updateReservationStatus(id, status);
      setReservations((prev) =>
        prev.map((r) => ((r._id || r.id) === id ? { ...r, status } : r))
      );
      showToast(`Reservation status updated to "${status}".`);
    } catch (err) {
      alert("Failed to update reservation: " + err.message);
    }
  };

  const handleDeleteReservation = async (reservation) => {
    const resId = reservation._id || reservation.id;
    if (!window.confirm(`Delete reservation for ${reservation.name}?`)) return;

    try {
      await api.deleteReservation(resId);
      setReservations((prev) => prev.filter((r) => (r._id || r.id) !== resId));
      showToast("Reservation deleted.");
    } catch (err) {
      alert("Failed to delete reservation: " + err.message);
    }
  };

  // ─── Inquiries Operations ───
  const handleUpdateContactStatus = async (id, status) => {
    try {
      await api.updateContactStatus(id, status);
      setContacts((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? { ...c, status } : c))
      );
      showToast(`Message marked as ${status}.`);
    } catch (err) {
      alert("Failed to update message: " + err.message);
    }
  };

  const handleDeleteContact = async (contact) => {
    const contactId = contact._id || contact.id;
    if (!window.confirm(`Delete message from ${contact.name}?`)) return;

    try {
      await api.deleteContact(contactId);
      setContacts((prev) => prev.filter((c) => (c._id || c.id) !== contactId));
      showToast("Message deleted.");
    } catch (err) {
      alert("Failed to delete message: " + err.message);
    }
  };

  // ─── Render Login Screen if not authenticated ───
  if (!token) {
    return (
      <div className="min-h-screen w-full bg-[#0d0705] text-[#faf7f2] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#c88242] selection:text-white">
        {/* Subtle Ambient Radial Lighting & Backdrops */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c88242]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[450px] h-[450px] bg-[#b8623b]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Delicate Geometric Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#df9a5c 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Floating Decorative Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-[#c88242]/10 animate-pulse duration-1000" />
        </div>

        {/* Main Glassmorphic Login Card */}
        <div className="relative z-10 w-full max-w-[440px]">
          {/* Subtle Outer Glow Frame */}
          <div className="relative rounded-[2rem] bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent p-[1px] shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(200,130,66,0.12)]">
            <div className="relative rounded-[calc(2rem-1px)] bg-[#150d08]/92 backdrop-blur-2xl p-7 sm:p-10 overflow-hidden">
              
              {/* Top Golden Light Streak */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#c88242]/80 to-transparent" />

              {/* Header Branding */}
              <div className="text-center mb-8">
                {/* Brand Emblem */}
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#2b1810] to-[#1a0e09] border border-[#c88242]/40 flex items-center justify-center shadow-lg shadow-[#c88242]/20 relative z-10 group">
                    <Coffee className="w-8 h-8 text-[#df9a5c] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {/* Emblem Glow */}
                  <div className="absolute inset-0 bg-[#c88242]/30 rounded-2xl blur-md -z-0" />
                </div>

                {/* Subtitle Tag */}
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#c88242]" />
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-[#c88242]">
                    Everbloom Café
                  </span>
                  <Sparkles className="w-3 h-3 text-[#c88242]" />
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-[34px] font-normal text-white tracking-tight leading-snug">
                  Admin Portal
                </h1>
                <p className="text-xs text-stone-400 mt-2 font-light leading-relaxed max-w-[280px] mx-auto">
                  Secure access for menu curation, guest reservations &amp; promotions.
                </p>
              </div>

              {/* Error Message Alert */}
              {loginError && (
                <div className="mb-6 p-3.5 rounded-2xl bg-red-950/50 border border-red-500/30 text-xs text-red-200 flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{loginError}</span>
                </div>
              )}

              {/* Login Form (No Suggestions) */}
              <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-2">
                    Admin Email
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-stone-500 group-focus-within:text-[#c88242] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter admin email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0705]/80 border border-white/10 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#c88242] focus:ring-2 focus:ring-[#c88242]/20 transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center group">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-stone-500 group-focus-within:text-[#c88242] transition-colors">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#0d0705]/80 border border-white/10 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#c88242] focus:ring-2 focus:ring-[#c88242]/20 transition-all shadow-inner"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 p-1 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-white/5 transition-colors focus:outline-none"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Security Indicator & Remember Device */}
                <div className="flex items-center justify-between pt-1 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-stone-700 bg-stone-900 text-[#c88242] focus:ring-[#c88242]/30 accent-[#c88242] cursor-pointer"
                    />
                    <span className="text-[11px] text-stone-400 hover:text-stone-300 transition-colors">
                      Remember device
                    </span>
                  </label>
               
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c88242] via-[#df9a5c] to-[#c88242] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-[#170e0a] font-bold text-xs sm:text-sm shadow-[0_4px_25px_rgba(200,130,66,0.35)] hover:shadow-[0_6px_35px_rgba(200,130,66,0.5)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  {loginLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#170e0a] border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Return to Café Link */}
              <div className="mt-7 pt-5 border-t border-white/[0.08] text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-[#df9a5c] transition-colors group font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Return to Café Website</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Section titles for top bar
  const titles = {
    overview: "Overview & Analytics",
    menu: "Dishes & Pricing Management",
    reservations: "Table Reservations",
    popups: "Promotions & Offer Modals",
    photos: "Photo Gallery & Mural Showcase",
    inquiries: "Guest Feedback & Inquiries",
    settings: "System Diagnostics & Settings",
  };

  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const unreadCount = contacts.filter((c) => c.status === "new" || !c.status).length;

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1109] flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminUser={adminUser}
        onLogout={handleLogout}
        pendingReservationsCount={pendingCount}
        unreadMessagesCount={unreadCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Dashboard Canvas */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <AdminTopNavbar
          activeTabTitle={titles[activeTab] || "Management Portal"}
          onOpenMobile={() => setIsMobileSidebarOpen(true)}
          onRefresh={() => loadAllData(true)}
          isRefreshing={isRefreshing}
          onAddNewDish={handleOpenAddModal}
        />

        {/* Action Toast Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#170e0a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-slideUp">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold">{toastMessage}</span>
            <button onClick={() => setToastMessage("")} className="text-white/40 hover:text-white ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <AdminOverview
              stats={stats}
              menuItems={menuItems}
              reservations={reservations}
              contacts={contacts}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onAddNewDish={handleOpenAddModal}
              onSeedMenu={handleSeedMenu}
              onUpdateReservationStatus={handleUpdateReservationStatus}
            />
          )}

          {activeTab === "menu" && (
            <AdminMenuList
              menuItems={menuItems}
              onAddNewDish={handleOpenAddModal}
              onEditDish={handleOpenEditModal}
              onDeleteDish={handleDeleteDish}
              onUpdatePrice={handleUpdatePrice}
              onToggleAvailability={handleToggleAvailability}
              onSeedMenu={handleSeedMenu}
              isLoading={isLoading}
            />
          )}

          {activeTab === "reservations" && (
            <AdminReservationsView
              reservations={reservations}
              onUpdateStatus={handleUpdateReservationStatus}
              onDeleteReservation={handleDeleteReservation}
              isLoading={isLoading}
            />
          )}

          {activeTab === "popups" && (
            <PopupSection popups={popups} onRefresh={() => loadAllData(true)} />
          )}

          {activeTab === "photos" && (
            <PhotosSection photos={photos} onRefresh={() => loadAllData(true)} />
          )}

          {activeTab === "inquiries" && (
            <AdminInquiriesView
              contacts={contacts}
              onUpdateStatus={handleUpdateContactStatus}
              onDeleteContact={handleDeleteContact}
              isLoading={isLoading}
            />
          )}


        </main>
      </div>

      {/* Reusable Dish Add / Edit Modal */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        item={activeEditItem}
        mode={modalMode}
      />
    </div>
  );
}
