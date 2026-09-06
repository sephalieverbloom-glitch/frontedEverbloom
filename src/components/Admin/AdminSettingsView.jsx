import { useState, useEffect } from "react";
import {
  Server,
  Database,
  CheckCircle2,
  RefreshCw,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import api from "../../lib/api";

export default function AdminSettingsView({ adminUser, onSeedMenu }) {
  const [healthStatus, setHealthStatus] = useState(null);
  const [latencyMs, setLatencyMs] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsChecking(true);
    const start = performance.now();
    try {
      const res = await api.checkHealth();
      const end = performance.now();
      setLatencyMs(Math.round(end - start));
      setHealthStatus(res);
    } catch (err) {
      setHealthStatus({ success: false, message: err.message });
      setLatencyMs(null);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* System Health Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#e8ded3] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 text-[#c88242] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-[#1c1109]">
                System Health &amp; Cloud Connection
              </h3>
              <p className="text-xs text-[#6b5c54]">
                API Server, Serverless Function &amp; MongoDB Atlas Status
              </p>
            </div>
          </div>

          <button
            onClick={runDiagnostics}
            disabled={isChecking}
            className="px-4 py-2 rounded-full border border-[#e8ded3] text-xs font-bold text-[#6b5c54] hover:text-[#2b1810] flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? "animate-spin text-[#c88242]" : ""}`} />
            Run Ping Test
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8ded3]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54] block mb-1">
              API Connection
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-xs text-[#1c1109]">
                {healthStatus?.success ? "Operational (200 OK)" : "Checking..."}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8ded3]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54] block mb-1">
              Roundtrip Latency
            </span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#c88242]" />
              <span className="font-bold text-xs text-[#1c1109]">
                {latencyMs !== null ? `${latencyMs} ms` : "Calculating..."}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8ded3]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6b5c54] block mb-1">
              Database Cluster
            </span>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-xs text-[#1c1109]">MongoDB: EverBloomCafe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Maintenance & Seeder */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e8ded3] mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-normal text-[#1c1109]">
              Menu Seeding &amp; Reset Tools
            </h3>
            <p className="text-xs text-[#6b5c54]">
              Populate or re-synchronize the 15 signature Everbloom Café menu dishes
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#faf7f2] border border-[#e8ded3]">
          <div>
            <h4 className="font-bold text-xs text-[#1c1109]">Restore 15 Signature Café Dishes</h4>
            <p className="text-[11px] text-[#6b5c54] mt-0.5">
              Inserts Starters, Pizzas &amp; Burgers, Pastas, Coolers, and Desserts with canonical prices.
            </p>
          </div>
          <button
            onClick={onSeedMenu}
            className="btn-caramel px-5 py-2.5 text-xs font-bold shrink-0"
          >
            Seed Menu Now
          </button>
        </div>
      </div>

      {/* Café Contact & Location Reference */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-sm">
        <h3 className="font-serif text-xl font-normal text-[#1c1109] pb-4 border-b border-[#e8ded3] mb-6">
          Everbloom Café Information Reference
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 text-[#2b1810]">
            <MapPin className="w-4 h-4 text-[#c88242] shrink-0" />
            <span>K-8/796, Near Sum Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar, Odisha 751029</span>
          </div>

          <div className="flex items-center gap-3 text-[#2b1810]">
            <Phone className="w-4 h-4 text-[#c88242] shrink-0" />
            <span>Primary: +91 94371 64578 &nbsp;|&nbsp; Secondary: +91 97787 95952</span>
          </div>

          <div className="flex items-center gap-3 text-[#2b1810]">
            <Clock className="w-4 h-4 text-[#c88242] shrink-0" />
            <span>Open Daily: 1:00 PM – 11:00 PM (Air-Conditioned Indoor &amp; Nature Garden Patio)</span>
          </div>

          <div className="flex items-center gap-3 text-[#2b1810]">
            <ShieldCheck className="w-4 h-4 text-[#c88242] shrink-0" />
            <span>Official Email: <strong>everbloombbsr@gmail.com</strong> &nbsp;|&nbsp; Owner: <strong>Sephali Swain</strong> &nbsp;|&nbsp; Est.: <strong>June 27, 2025</strong></span>
          </div>

          <div className="flex items-center gap-3 text-[#2b1810] pt-2 border-t border-[#f0e6dc]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Logged in as Administrator: {adminUser?.email || "admin@everbloom.com"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
