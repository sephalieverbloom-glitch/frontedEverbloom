/**
 * Everbloom Café Client API Layer
 * Connects frontend components to the backend REST API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backendeverblo.vercel.app/api/v1";

export const getAdminToken = () => {
  return localStorage.getItem("everbloom_admin_token") || null;
};

export const setAdminToken = (token) => {
  if (token) {
    localStorage.setItem("everbloom_admin_token", token);
  } else {
    localStorage.removeItem("everbloom_admin_token");
  }
};

export const getAdminUser = () => {
  const userStr = localStorage.getItem("everbloom_admin_user");
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  if (user) {
    localStorage.setItem("everbloom_admin_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("everbloom_admin_user");
  }
};

/**
 * Generic API fetch wrapper with JSON parsing and error handling
 */
async function request(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = { ...options.headers };

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"] && options.method && options.method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401 && endpoint.includes("/admin/")) {
        setAdminToken(null);
        setAdminUser(null);
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

// ─── Menu API ───
export const api = {
  // Public Menu
  getGroupedMenu: async () => {
    return request("/menu/grouped");
  },

  getAllMenuItems: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/menu${query ? `?${query}` : ""}`);
  },

  getMenuItem: async (id) => {
    return request(`/menu/${id}`);
  },

  // Admin Menu CRUD
  createMenuItem: async (itemData) => {
    if (itemData instanceof FormData) {
      return request("/menu", {
        method: "POST",
        body: itemData,
      });
    }
    return request("/menu", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  },

  updateMenuItem: async (id, itemData) => {
    if (itemData instanceof FormData) {
      return request(`/menu/${id}`, {
        method: "PUT",
        body: itemData,
      });
    }
    return request(`/menu/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    });
  },

  updateItemPrice: async (id, price) => {
    return request(`/menu/${id}/price`, {
      method: "PATCH",
      body: JSON.stringify({ price: Number(price) }),
    });
  },

  toggleItemAvailability: async (id, isAvailable) => {
    return request(`/menu/${id}/availability`, {
      method: "PATCH",
      body: JSON.stringify({ isAvailable: Boolean(isAvailable) }),
    });
  },

  deleteMenuItem: async (id) => {
    return request(`/menu/${id}`, {
      method: "DELETE",
    });
  },

  seedDefaultMenu: async (force = false) => {
    return request("/menu/seed", {
      method: "POST",
      body: JSON.stringify({ force }),
    });
  },

  // Table Reservations
  createReservation: async (data) => {
    return request("/reservations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getReservations: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/reservations${query ? `?${query}` : ""}`);
  },

  updateReservationStatus: async (id, status) => {
    return request(`/reservations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  deleteReservation: async (id) => {
    return request(`/reservations/${id}`, {
      method: "DELETE",
    });
  },

  // Contact Messages
  submitContact: async (data) => {
    return request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getAllContacts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contact/admin/all${query ? `?${query}` : ""}`);
  },

  updateContactStatus: async (id, status) => {
    return request(`/contact/admin/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  deleteContact: async (id) => {
    return request(`/contact/admin/${id}`, {
      method: "DELETE",
    });
  },

  // Admin Authentication & Overview
  loginAdmin: async (email, password) => {
    const res = await request("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.accessToken || res.token) {
      const token = res.accessToken || res.token;
      setAdminToken(token);
      setAdminUser(res.admin || res.user);
    }
    return res;
  },

  logoutAdmin: async () => {
    try {
      await request("/admin/logout", { method: "POST" });
    } catch {
      // Ignore errors on logout
    }
    setAdminToken(null);
    setAdminUser(null);
  },

  getAdminOverview: async () => {
    return request("/admin/dashboard/overview");
  },

  checkHealth: async () => {
    return request("/health");
  },
};

// ─── Named API Modules for Specialized Components ───

export const authApi = {
  login: async (emailOrUsername, password) => {
    const payload = {
      email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
      username: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
      password,
    };
    const res = await request("/admin/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (res.accessToken || res.token) {
      const token = res.accessToken || res.token;
      const user = res.admin || res.user;
      setAdminToken(token);
      setAdminUser(user);
      return { success: true, token, user, ...res };
    }
    return res;
  },
  getMe: async () => {
    try {
      const res = await request("/admin/profile");
      return res;
    } catch {
      const user = getAdminUser();
      return user ? { success: true, user } : null;
    }
  },
  logout: () => api.logoutAdmin(),
};

export const statsApi = {
  getStats: async () => {
    try {
      return await request("/admin/dashboard-stats");
    } catch {
      return await request("/admin/dashboard/overview");
    }
  },
};

export const menuApi = {
  getAll: (params) => api.getAllMenuItems(params),
  getGrouped: () => api.getGroupedMenu(),
  get: (id) => api.getMenuItem(id),
  create: (data) => api.createMenuItem(data),
  update: (id, data) => api.updateMenuItem(id, data),
  updatePrice: (id, price) => api.updateItemPrice(id, price),
  toggleAvailability: (id, isAvail) => api.toggleItemAvailability(id, isAvail),
  delete: (id) => api.deleteMenuItem(id),
  seedDefault: (force) => api.seedDefaultMenu(force),
};

export const contactApi = {
  submit: (data) => api.submitContact(data),
  getAll: (params) => api.getAllContacts(params),
  updateStatus: (id, status) => api.updateContactStatus(id, status),
  delete: (id) => api.deleteContact(id),
};

// Client-side fallback storage for Popups & Photos if backend endpoints are unavailable
const LOCAL_STORAGE_POPUPS_KEY = "everbloom_custom_popups";
const LOCAL_STORAGE_PHOTOS_KEY = "everbloom_custom_photos";

export const popupApi = {
  getActive: async () => {
    try {
      return await request("/popups/active");
    } catch {
      const stored = localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY);
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const active = list.find((p) => p.active);
          if (active) return { success: true, data: active };
        } catch {
          // ignore
        }
      }
      return {
        success: true,
        data: {
          id: "default_promo_1",
          title: "Weekend Artisanal Brew Tasting",
          subtitle: "Get 20% off on all signature hand-poured coffees & fresh berry coolers this Saturday & Sunday.",
          badge: "Weekend Special",
          ctaText: "Explore Full Menu",
          ctaLink: "/menu",
          imageUrl: "/iced-latte.jpg",
          active: true,
        },
      };
    }
  },
  getAll: async () => {
    try {
      return await request("/popups");
    } catch {
      const stored = localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY);
      if (stored) {
        try {
          return { success: true, data: JSON.parse(stored) };
        } catch {
          // ignore
        }
      }
      return {
        success: true,
        data: [
          {
            id: "default_promo_1",
            title: "Weekend Artisanal Brew Tasting",
            subtitle: "Get 20% off on all signature hand-poured coffees & fresh berry coolers this Saturday & Sunday.",
            badge: "Weekend Special",
            ctaText: "Explore Full Menu",
            ctaLink: "/menu",
            imageUrl: "/iced-latte.jpg",
            active: true,
          },
        ],
      };
    }
  },
  create: async (formData) => {
    try {
      return await request("/popups", { method: "POST", body: formData });
    } catch {
      // Local fallback
      const newPopup = {
        id: "popup_" + Date.now(),
        title: formData.get ? formData.get("title") : formData.title,
        subtitle: formData.get ? formData.get("subtitle") : formData.subtitle,
        badge: formData.get ? formData.get("badge") : formData.badge,
        ctaText: formData.get ? formData.get("ctaText") : formData.ctaText,
        ctaLink: formData.get ? formData.get("ctaLink") : formData.ctaLink,
        imageUrl: formData.get ? formData.get("imageUrl") || "/iced-latte.jpg" : formData.imageUrl || "/iced-latte.jpg",
        active: true,
      };
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY) || "[]");
      stored.push(newPopup);
      localStorage.setItem(LOCAL_STORAGE_POPUPS_KEY, JSON.stringify(stored));
      return { success: true, data: newPopup };
    }
  },
  update: async (id, formData) => {
    try {
      return await request(`/popups/${id}`, { method: "PUT", body: formData });
    } catch {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY) || "[]");
      const index = stored.findIndex((p) => p.id === id);
      if (index !== -1) {
        stored[index] = {
          ...stored[index],
          title: formData.get ? formData.get("title") : formData.title,
          subtitle: formData.get ? formData.get("subtitle") : formData.subtitle,
          badge: formData.get ? formData.get("badge") : formData.badge,
          ctaText: formData.get ? formData.get("ctaText") : formData.ctaText,
          ctaLink: formData.get ? formData.get("ctaLink") : formData.ctaLink,
        };
        localStorage.setItem(LOCAL_STORAGE_POPUPS_KEY, JSON.stringify(stored));
      }
      return { success: true };
    }
  },
  toggleActive: async (id) => {
    try {
      return await request(`/popups/${id}/toggle`, { method: "PATCH" });
    } catch {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY) || "[]");
      const updated = stored.map((p) => (p.id === id ? { ...p, active: !p.active } : p));
      localStorage.setItem(LOCAL_STORAGE_POPUPS_KEY, JSON.stringify(updated));
      return { success: true };
    }
  },
  delete: async (id) => {
    try {
      return await request(`/popups/${id}`, { method: "DELETE" });
    } catch {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POPUPS_KEY) || "[]");
      const filtered = stored.filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_POPUPS_KEY, JSON.stringify(filtered));
      return { success: true };
    }
  },
};

export const photosApi = {
  getAll: async () => {
    try {
      return await request("/photos");
    } catch {
      const stored = localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY);
      if (stored) {
        try {
          return { success: true, data: JSON.parse(stored) };
        } catch {
          // ignore
        }
      }
      return {
        success: true,
        data: [
          {
            id: "photo_1",
            src: "/everbloom/interior-mural.png",
            alt: "Iconic Blooming Roses Floral Wall Mural",
            category: "interior",
            desc: "Our hand-painted floral centerpiece with plush sage seating.",
          },
          {
            id: "photo_2",
            src: "/everbloom/interior-wall-neon.png",
            alt: "Warm Ambient AC Indoor Lounge",
            category: "interior",
            desc: "Cozy air-conditioned lounge with warm downlighting and acoustic music.",
          },
          {
            id: "photo_3",
            src: "/everbloom/outdoor-patio.jpg",
            alt: "Nature-Inspired Outdoor Garden Patio",
            category: "outdoor",
            desc: "Lush tropical plants and fairy string lights for evening chill.",
          },
          {
            id: "photo_4",
            src: "/everbloom/signature-coolers.jpg",
            alt: "Signature Everbloom Berry & Citrus Coolers",
            category: "food",
            desc: "Refreshing handcrafted mocktails with fresh berries and mint.",
          },
        ],
      };
    }
  },
  create: async (formData) => {
    try {
      return await request("/photos", { method: "POST", body: formData });
    } catch {
      const newPhoto = {
        id: "photo_" + Date.now(),
        alt: formData.get ? formData.get("alt") : formData.alt,
        category: formData.get ? formData.get("category") : formData.category,
        desc: formData.get ? formData.get("desc") : formData.desc,
        src: formData.get ? formData.get("imageUrl") || "/everbloom/interior-mural.png" : formData.imageUrl,
      };
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY) || "[]");
      stored.push(newPhoto);
      localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(stored));
      return { success: true, data: newPhoto };
    }
  },
  update: async (id, formData) => {
    try {
      return await request(`/photos/${id}`, { method: "PUT", body: formData });
    } catch {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY) || "[]");
      const index = stored.findIndex((p) => p.id === id);
      if (index !== -1) {
        stored[index] = {
          ...stored[index],
          alt: formData.get ? formData.get("alt") : formData.alt,
          category: formData.get ? formData.get("category") : formData.category,
          desc: formData.get ? formData.get("desc") : formData.desc,
        };
        localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(stored));
      }
      return { success: true };
    }
  },
  delete: async (id) => {
    try {
      return await request(`/photos/${id}`, { method: "DELETE" });
    } catch {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY) || "[]");
      const filtered = stored.filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(filtered));
      return { success: true };
    }
  },
};

export default api;

