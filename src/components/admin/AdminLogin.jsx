import { useState } from "react";
import { Lock, User, Eye, EyeOff, Sparkles, Coffee, AlertCircle, ArrowRight } from "lucide-react";
import { authApi } from "../../lib/api";

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await authApi.login(username.trim(), password);
      if (res && res.success && res.token) {
        localStorage.setItem("everbloom_admin_token", res.token);
        localStorage.setItem("everbloom_admin_user", JSON.stringify(res.user));
        onLoginSuccess(res.user);
      } else {
        setError(res.message || "Invalid login credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login attempt failed:", err);
      // Fallback check if server offline but demo credentials entered
      if (username.trim() === "admin" && password === "admin123") {
        const dummyUser = { id: "admin_1", username: "admin", name: "Everbloom Manager", role: "admin" };
        localStorage.setItem("everbloom_admin_token", "demo_token_" + Date.now());
        localStorage.setItem("everbloom_admin_user", JSON.stringify(dummyUser));
        onLoginSuccess(dummyUser);
      } else {
        setError("Unable to connect to server. Please check your connection or use demo credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2b1810] flex items-center justify-center p-4 sm:p-6 relative">
      {/* Clean White Card */}
      <div className="relative w-full max-w-md bg-white border border-[#e8ded3] rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#2b1810]/5 z-10">
        {/* Cafe Logo Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] p-0.5 mx-auto mb-4 flex items-center justify-center text-[#2b1810] shadow-sm">
            <Coffee className="w-7 h-7" />
          </div>
          <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] mb-2 font-bold tracking-widest text-[10px]">
            MANAGEMENT PORTAL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2b1810] tracking-tight">
            Everbloom Admin
          </h1>
          <p className="text-xs text-[#6b5c54] mt-1">
            Sign in to manage gallery photos, menu, promos & inquiries
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-[#9ca3af] pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-11 pr-4 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs sm:text-sm text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-[#9ca3af] pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-11 pr-11 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs sm:text-sm text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#9ca3af] hover:text-[#2b1810] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-4 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Security Badge */}
        <div className="mt-6 pt-5 border-t border-[#e8ded3] text-center">
          <p className="text-[11px] text-[#6b5c54]">
            Everbloom Café Management System • Secure Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}
