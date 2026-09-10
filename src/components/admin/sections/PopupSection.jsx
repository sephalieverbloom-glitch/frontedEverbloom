import { useState } from "react";
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  Power, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Sparkles, 
  Eye, 
  Check,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { popupApi } from "../../../lib/api";

export default function PopupSection({ popups = [], onRefresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("Weekend Special");
  const [ctaText, setCtaText] = useState("Explore Our Menu");
  const [ctaLink, setCtaLink] = useState("/menu");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const activePopup = popups.find((p) => p.active);

  const handleOpenAdd = () => {
    setEditingPopup(null);
    setTitle("");
    setSubtitle("");
    setBadge("Weekend Special");
    setCtaText("Explore Our Menu");
    setCtaLink("/menu");
    setImageUrl("");
    setSelectedFile(null);
    setPreviewUrl("");
    setActive(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pop) => {
    setEditingPopup(pop);
    setTitle(pop.title || "");
    setSubtitle(pop.subtitle || "");
    setBadge(pop.badge || "Weekend Special");
    setCtaText(pop.ctaText || "Explore Our Menu");
    setCtaLink(pop.ctaLink || "/menu");
    setImageUrl(pop.imageUrl || "");
    setSelectedFile(null);
    setPreviewUrl(pop.imageUrl || "");
    setActive(pop.active);
    setError("");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide an announcement title.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subtitle", subtitle.trim());
      formData.append("badge", badge.trim());
      formData.append("ctaText", ctaText.trim());
      formData.append("ctaLink", ctaLink.trim());
      formData.append("active", active);

      if (selectedFile) {
        formData.append("image", selectedFile);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl.trim());
      }

      let res;
      if (editingPopup) {
        res = await popupApi.update(editingPopup.id, formData);
      } else {
        res = await popupApi.create(formData);
      }

      if (res && res.success) {
        setIsModalOpen(false);
        onRefresh();
      } else {
        setError(res.message || "Failed to save popup.");
      }
    } catch (err) {
      console.error("Save popup error:", err);
      setError("Error communicating with server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id) => {
    setTogglingId(id);
    try {
      const res = await popupApi.toggleActive(id);
      if (res && res.success) {
        onRefresh();
      } else {
        alert(res.message || "Failed to toggle popup.");
      }
    } catch (err) {
      console.error("Toggle popup error:", err);
      alert("Error toggling popup status.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promo popup?")) {
      return;
    }

    try {
      const res = await popupApi.delete(id);
      if (res && res.success) {
        onRefresh();
      } else {
        alert(res.message || "Failed to delete popup.");
      }
    } catch (err) {
      console.error("Delete popup error:", err);
      alert("Error deleting popup.");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-[#2b1810]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8ded3] rounded-3xl p-6 shadow-sm">
        <div>
          <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] text-[10px] font-bold tracking-widest uppercase mb-1">
            HOME PAGE PROMO POPUP (ADD POPUP)
          </span>
          <h1 className="font-display text-2xl font-bold text-[#2b1810]">
            Homepage Announcement & Ad Popup
          </h1>
          <p className="text-xs text-[#6b5c54] mt-0.5">
            Upload picture ads and offers that automatically greet customers when they open your homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Promo Popup
        </button>
      </div>

      {/* Live Preview Box of Active Popup - Clean White */}
      <div className="bg-white border border-[#e8ded3] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-[#2b1810]" />
            <h2 className="font-display text-lg font-bold text-[#2b1810]">
              Live Homepage Preview Simulation
            </h2>
          </div>
          <span className="text-xs text-[#6b5c54] font-medium">
            {activePopup ? "🟢 Currently Active on Website" : "⚪ No active popup right now"}
          </span>
        </div>

        {activePopup ? (
          <div className="max-w-[360px] mx-auto bg-[#1a0e08] text-white rounded-[22px] overflow-hidden border border-white/10 shadow-2xl">
            {activePopup.imageUrl && (
              <div className="relative h-40 w-full bg-[#120a06] overflow-hidden">
                <img
                  src={activePopup.imageUrl}
                  alt={activePopup.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08] via-[#1a0e08]/60 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c87935] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" />
                    {activePopup.badge || "WEEKEND SPECIAL"}
                  </span>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 backdrop-blur-md">
                  <X className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            <div className="p-4 sm:p-5">
              {!activePopup.imageUrl && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c87935] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  {activePopup.badge || "ANNOUNCEMENT"}
                </span>
              )}
              <h3 className="font-display text-lg font-bold text-white mb-1.5 leading-snug">
                {activePopup.title}
              </h3>
              {activePopup.subtitle && (
                <p className="text-xs text-white/80 font-normal leading-relaxed mb-4">
                  {activePopup.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2.5">
                <div className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#c87935] to-[#b36526] text-white text-xs font-bold shadow-md shadow-[#c87935]/25 pointer-events-none">
                  <span>{activePopup.ctaText || "Explore Full Menu"}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <span className="text-xs text-white/60">Maybe Later</span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <input type="checkbox" readOnly checked className="accent-[#c87935] w-3 h-3 rounded" />
                  Don't show again today
                </span>
                <span className="text-[10px] font-bold text-[#c87935] tracking-widest uppercase">
                  EVERBLOOM CAFÉ
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-[#e8ded3] rounded-2xl p-6 bg-[#faf7f2]">
            <Megaphone className="w-10 h-10 text-[#9ca3af] mx-auto mb-2" />
            <p className="text-xs text-[#6b5c54]">
              No active popup is currently enabled. Activate one below to display it on the homepage.
            </p>
          </div>
        )}
      </div>

      {/* Popups List Table - Clean White */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display text-base font-bold text-[#2b1810]">
            Configured Popups ({popups.length})
          </h3>
        </div>

        {popups.map((pop) => (
          <div
            key={pop.id}
            className={`group bg-white border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              pop.active
                ? "border-emerald-500 bg-[#f8fdf9]"
                : "border-[#e8ded3] hover:border-[#2b1810]"
            }`}
          >
            {/* Image & Title */}
            <div className="flex items-center gap-4">
              {pop.imageUrl ? (
                <img
                  src={pop.imageUrl}
                  alt={pop.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#e8ded3] shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#faf7f2] text-[#2b1810] border border-[#e8ded3] flex items-center justify-center shrink-0">
                  <Megaphone className="w-6 h-6" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      pop.active
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3]"
                    }`}
                  >
                    {pop.active ? "LIVE ON HOME" : "INACTIVE"}
                  </span>
                  <span className="text-[10px] font-bold text-[#6b5c54]">
                    Tag: {pop.badge}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-[#2b1810] line-clamp-1">
                  {pop.title}
                </h4>
                <p className="text-xs text-[#6b5c54] line-clamp-1">
                  {pop.subtitle || "No subtitle"} • Link: {pop.ctaLink}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleActive(pop.id)}
                disabled={togglingId === pop.id}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  pop.active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#2b1810] border border-[#e8ded3]"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {pop.active ? "Active" : "Set Active"}
              </button>

              <button
                onClick={() => handleOpenEdit(pop)}
                className="w-9 h-9 rounded-2xl bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#2b1810] border border-[#e8ded3] flex items-center justify-center transition-colors"
                title="Edit Popup"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(pop.id)}
                className="w-9 h-9 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center transition-colors"
                title="Delete Popup"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Popup Modal - Clean White */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-[#e8ded3] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#2b1810] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] text-[10px] font-bold uppercase mb-1">
                {editingPopup ? "EDIT PROMO POPUP" : "NEW PROMO POPUP"}
              </span>
              <h2 className="font-display text-xl font-bold text-[#2b1810]">
                {editingPopup ? "Edit Announcement Details" : "Create Homepage Promo / Ad Popup"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Promo Banner Image Upload */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-2">
                  Promo Flyer / Picture (Upload File or Enter URL)
                </label>

                {previewUrl ? (
                  <div className="relative h-40 rounded-2xl overflow-hidden border border-[#e8ded3] bg-[#faf7f2] mb-3">
                    <img
                      src={previewUrl}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setImageUrl("");
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove Picture
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <label className="cursor-pointer border-2 border-dashed border-[#e8ded3] hover:border-[#2b1810] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors bg-[#faf7f2] hover:bg-[#f5ede3]">
                      <Upload className="w-5 h-5 text-[#2b1810] mb-1" />
                      <span className="text-xs font-bold text-[#2b1810]">Upload Banner</span>
                      <span className="text-[10px] text-[#6b5c54]">PNG, JPG, WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <div className="flex flex-col justify-center gap-1.5">
                      <span className="text-[11px] text-[#6b5c54] font-medium">Or Image URL:</span>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 w-3.5 h-3.5 text-[#9ca3af] pointer-events-none top-3" />
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setPreviewUrl(e.target.value);
                          }}
                          placeholder="/everbloom/signature-coolers.jpg"
                          className="w-full pl-9 pr-3 py-2 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Headline Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekend Artisanal Brew & Dessert Special!"
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  required
                />
              </div>

              {/* Subtitle / Details */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Subtitle / Offer Details
                </label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows={2}
                  placeholder="e.g. Complimentary handcrafted pastry with any 2 signature beverages."
                  className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white resize-none"
                />
              </div>

              {/* Badge & CTA text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                    Highlight Badge Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Weekend Special, Happy Hours"
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                    Action Button Label
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Explore Our Menu"
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  />
                </div>
              </div>

              {/* CTA Link & Active toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                    Target Route / URL
                  </label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="/menu, /booking, /contact"
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  />
                </div>

                <div className="pt-4 sm:pt-6 flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#2b1810]"
                    />
                    <span className="text-xs font-bold text-[#2b1810]">
                      Set as Live Home Popup
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8ded3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#6b5c54] text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  {submitting ? "Saving..." : editingPopup ? "Update Popup" : "Publish Popup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
