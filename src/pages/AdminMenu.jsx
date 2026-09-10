import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, X } from "lucide-react";
import api, { getAdminToken, getAdminUser } from "../lib/api";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopNavbar from "../components/admin/AdminTopNavbar";
import AdminOverview from "../components/admin/AdminOverview";
import AdminMenuList from "../components/admin/AdminMenuList";
import AdminReservationsView from "../components/admin/AdminReservationsView";
import AdminInquiriesView from "../components/admin/AdminInquiriesView";
import AdminSettingsView from "../components/admin/AdminSettingsView";
import ItemModal from "../components/admin/ItemModal";
import PopupSection from "../components/admin/sections/PopupSection";
import PhotosSection from "../components/admin/sections/PhotosSection";
import { popupApi, photosApi } from "../lib/api";

export default function AdminMenu() {
  const [token, setToken] = useState(getAdminToken());
  const [adminUser, setAdminUser] = useState(getAdminUser());

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
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
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await api.loginAdmin(loginEmail, loginPassword);
      setToken(res.accessToken);
      setAdminUser(res.admin);
      showToast("Welcome to Everbloom Café Management Portal!");
    } catch (err) {
      setLoginError(err.message || "Invalid credentials. Please verify email and password.");
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
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-[#120a07] via-[#1c1109] to-[#120a07] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Backlight Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c88242]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#c88242] to-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#c88242]/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-extrabold text-[#c88242]">
              EVERBLOOM CAFÉ
            </span>
            <h1 className="font-serif text-3xl font-normal text-[#1c1109] mt-1">
              Admin Portal
            </h1>
            <p className="text-xs text-[#6b5c54] mt-1.5 font-light">
              Authenticate to manage live dishes, table bookings &amp; promotions.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#2b1810] mb-1.5 block">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@everbloom.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] font-medium focus:outline-none focus:border-[#c88242] transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#2b1810] mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] font-medium focus:outline-none focus:border-[#c88242] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#c88242] to-[#a66a33] hover:from-[#a66a33] hover:to-[#8a5424] text-white text-xs font-bold shadow-lg shadow-[#c88242]/30 disabled:opacity-50 mt-2 transition-all active:scale-98"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <button
            type="button"
            onClick={() => {
              setLoginEmail("admin@everbloom.com");
              setLoginPassword("EverBloomAdmin2026!");
            }}
            className="w-full mt-5 p-3 rounded-2xl bg-[#faf7f2] hover:bg-[#f3ebe1] border border-[#e8ded3] text-center transition-colors cursor-pointer group"
          >
            <p className="text-[11px] text-[#6b5c54]">
              Click to autofill Demo: <span className="font-mono text-[#2b1810] font-bold group-hover:text-[#c88242]">admin@everbloom.com</span>
            </p>
          </button>

          <div className="mt-6 pt-5 border-t border-[#e8ded3] text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b5c54] hover:text-[#c88242] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Café Website
            </Link>
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

          {activeTab === "settings" && (
            <AdminSettingsView adminUser={adminUser} onSeedMenu={handleSeedMenu} />
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
