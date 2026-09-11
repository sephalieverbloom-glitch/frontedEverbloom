import { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  AlertCircle, 
  Check, 
  Utensils 
} from "lucide-react";

export const PRESET_CATEGORIES = [
  { name: "Starters & Wraps", sectionNumber: "01", eyebrow: "BEGIN YOUR JOURNEY" },
  { name: "Pizzas & Burgers", sectionNumber: "02", eyebrow: "SIGNATURE CREATIONS" },
  { name: "Pastas & Mains", sectionNumber: "03", eyebrow: "ITALIAN CLASSICS" },
  { name: "Signature Coolers", sectionNumber: "04", eyebrow: "HOUSE REFRESHERS" },
  { name: "Coffee & Desserts", sectionNumber: "05", eyebrow: "SWEET FINALE & BREWS" },
];

const SUGGESTED_TAGS = ["Bestseller", "Chef's Special", "Most Loved", "Must Try", "New", "Signature Brew"];

export default function ItemModal({ isOpen, onClose, onSave, item = null, mode = "create" }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 220,
    category: "Starters & Wraps",
    sectionNumber: "01",
    sectionEyebrow: "BEGIN YOUR JOURNEY",
    image: "",
    isVegetarian: true,
    isAvailable: true,
    isSpecial: false,
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (item && mode === "edit") {
      setFormData({
        name: item.name || "",
        description: item.description || item.desc || "",
        price: item.price || 0,
        category: item.category || "Starters & Wraps",
        sectionNumber: item.sectionNumber || "01",
        sectionEyebrow: item.sectionEyebrow || "CHEF RECOMMENDATION",
        image: item.image || "",
        isVegetarian: item.isVegetarian !== false,
        isAvailable: item.isAvailable !== false,
        isSpecial: Boolean(item.isSpecial),
        tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 220,
        category: "Starters & Wraps",
        sectionNumber: "01",
        sectionEyebrow: "BEGIN YOUR JOURNEY",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
        isAvailable: true,
        isSpecial: false,
        tags: "Must Try",
      });
    }
    setErrorMsg("");
  }, [item, mode, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (catName) => {
    const preset = PRESET_CATEGORIES.find((c) => c.name === catName);
    setFormData((prev) => ({
      ...prev,
      category: catName,
      sectionNumber: preset ? preset.sectionNumber : prev.sectionNumber,
      sectionEyebrow: preset ? preset.eyebrow : prev.sectionEyebrow,
    }));
  };

  const handleTagToggle = (tag) => {
    const currentTags = formData.tags
      ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    
    let newTags;
    if (currentTags.includes(tag)) {
      newTags = currentTags.filter((t) => t !== tag);
    } else {
      newTags = [...currentTags, tag];
    }
    setFormData((prev) => ({ ...prev, tags: newTags.join(", ") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Dish name is required.");
      return;
    }
    if (Number(formData.price) < 0 || isNaN(Number(formData.price))) {
      setErrorMsg("Please enter a valid price.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      const targetId = item ? (item._id || item.id) : null;
      await onSave(payload, targetId);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save dish.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e8ded3] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#1c1109] via-[#2c1910] to-[#1c1109] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c88242] text-white flex items-center justify-center shadow-lg shadow-[#c88242]/30">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e29b5a]">
                  EVERBLOOM MENU STUDIO
                </span>
              </div>
              <h2 className="font-serif text-xl font-normal text-white">
                {mode === "create" ? "Add New Signature Dish" : `Edit "${item?.name || "Dish"}"`}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="m-5 mb-0 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Dish Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                Dish Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Crispy Peri-Peri Chicken Wrap"
                className="w-full px-4 py-3 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] font-semibold focus:outline-none focus:border-[#c88242] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#c88242]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="240"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] font-bold focus:outline-none focus:border-[#c88242]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category Selector Pills */}
          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-2">
              Menu Category
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_CATEGORIES.map((cat) => {
                const isSelected = formData.category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#2b1810] text-white shadow-md scale-102"
                        : "bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] hover:border-[#c88242]"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
              Description &amp; Tasting Notes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Freshly prepared with authentic ingredients, spices, and artisanal touch..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] focus:outline-none focus:border-[#c88242]"
            />
          </div>

          {/* Image URL with Live Thumbnail */}
          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
              Image URL / Path
            </label>
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-[#e8ded3] overflow-hidden shrink-0 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/tacos.jpg";
                    }}
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/tacos.jpg or https://images.unsplash.com/..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] focus:outline-none focus:border-[#c88242]"
              />
            </div>
          </div>

          {/* Tag Quick Select */}
          <div>
            <label className="block text-xs font-bold text-[#2b1810] mb-1.5 flex items-center justify-between">
              <span>Feature Badges / Tags</span>
              <span className="text-[10px] text-[#6b5c54] font-normal">Click to toggle</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.map((tag) => {
                const isSelected = formData.tags?.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      isSelected
                        ? "bg-[#c88242] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggles: Veg / Available / Chef Special */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              onClick={() => setFormData({ ...formData, isVegetarian: !formData.isVegetarian })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                formData.isVegetarian
                  ? "bg-emerald-50/60 border-emerald-300 text-emerald-800"
                  : "bg-red-50/60 border-red-300 text-red-800"
              }`}
            >
              <div>
                <p className="text-xs font-extrabold">{formData.isVegetarian ? "Vegetarian" : "Non-Veg"}</p>
                <p className="text-[10px] opacity-75">Green/Red Indicator</p>
              </div>
              <div className={`w-3.5 h-3.5 rounded-full ${formData.isVegetarian ? "bg-emerald-600" : "bg-red-600"}`} />
            </div>

            <div
              onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                formData.isAvailable
                  ? "bg-amber-50/60 border-amber-300 text-amber-900"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              <div>
                <p className="text-xs font-extrabold">{formData.isAvailable ? "In Stock" : "Sold Out"}</p>
                <p className="text-[10px] opacity-75">Customer Visibility</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${formData.isAvailable ? "bg-amber-500 animate-pulse" : "bg-gray-400"}`} />
            </div>

            <div
              onClick={() => setFormData({ ...formData, isSpecial: !formData.isSpecial })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                formData.isSpecial
                  ? "bg-purple-50 border-purple-300 text-purple-800"
                  : "bg-gray-50 border-gray-200 text-gray-500"
              }`}
            >
              <div>
                <p className="text-xs font-extrabold">{formData.isSpecial ? "Chef Special ⭐" : "Standard"}</p>
                <p className="text-[10px] opacity-75">Highlighted Card</p>
              </div>
              <Sparkles className={`w-4 h-4 ${formData.isSpecial ? "text-purple-600" : "text-gray-300"}`} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#e8ded3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-[#e8ded3] text-xs font-bold text-[#6b5c54] hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c88242] hover:bg-[#a66a33] text-white px-7 py-2.5 rounded-2xl text-xs font-bold shadow-lg disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{mode === "create" ? "Add to Café Menu" : "Save Changes"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
