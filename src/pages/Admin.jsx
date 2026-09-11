import { useState, useEffect, useCallback } from "react";
import AdminLogin from "../components/admin/AdminLogin";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardSection from "../components/admin/sections/DashboardSection";
import PhotosSection from "../components/admin/sections/PhotosSection";
import ContactSection from "../components/admin/sections/ContactSection";
import PopupSection from "../components/admin/sections/PopupSection";
import MenuSection from "../components/admin/sections/MenuSection";
import { authApi, statsApi, photosApi, contactApi, popupApi, menuApi } from "../lib/api";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Data states
  const [stats, setStats] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [popups, setPopups] = useState([]);
  const [menu, setMenu] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("everbloom_admin_token");
      const savedUser = localStorage.getItem("everbloom_admin_user");

      if (!token) {
        setCheckingAuth(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await authApi.getMe();
        if (res && res.success && res.user) {
          setUser(res.user);
          setIsAuthenticated(true);
        } else if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.warn("Auth check error:", err);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch all admin data
  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    setRefreshing(true);

    try {
      const [statsRes, photosRes, msgRes, popupRes, menuRes] = await Promise.all([
        statsApi.getStats().catch(() => null),
        photosApi.getAll().catch(() => null),
        contactApi.getAll().catch(() => null),
        popupApi.getAll().catch(() => null),
        menuApi.getAll().catch(() => null),
      ]);

      if (statsRes?.success && statsRes.data) setStats(statsRes.data);
      if (photosRes?.success && photosRes.data) setPhotos(photosRes.data);
      if (msgRes?.success && msgRes.data) setMessages(msgRes.data);
      if (popupRes?.success && popupRes.data) setPopups(popupRes.data);
      if (menuRes?.success && menuRes.data) setMenu(menuRes.data);
    } catch (err) {
      console.error("Error loading admin collections:", err);
    } finally {
      setRefreshing(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("everbloom_admin_token");
    localStorage.removeItem("everbloom_admin_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#2b1810] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#6b5c54]">
            Initializing Everbloom Admin Suite...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const unreadMessagesCount = messages.filter((m) => m.status === "unread").length;
  const hasActivePopup = popups.some((p) => p.active);

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
      onLogout={handleLogout}
      stats={stats}
      unreadCount={unreadMessagesCount}
      activePopup={hasActivePopup}
      onRefresh={fetchData}
      refreshing={refreshing}
    >
      {activeTab === "dashboard" && (
        <DashboardSection
          stats={stats}
          setActiveTab={setActiveTab}
          onAddPhoto={() => setActiveTab("photos")}
          onAddMenuItem={() => setActiveTab("menu")}
          onAddPopup={() => setActiveTab("popup")}
        />
      )}

      {activeTab === "photos" && (
        <PhotosSection photos={photos} onRefresh={fetchData} />
      )}

      {activeTab === "contact" && (
        <ContactSection messages={messages} onRefresh={fetchData} />
      )}

      {activeTab === "popup" && (
        <PopupSection popups={popups} onRefresh={fetchData} />
      )}

      {activeTab === "menu" && (
        <MenuSection menu={menu} onRefresh={fetchData} />
      )}
    </AdminLayout>
  );
}
