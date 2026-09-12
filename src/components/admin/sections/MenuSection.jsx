import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Sparkles, 
  UtensilsCrossed, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { menuApi } from "../../../lib/api";

const menuCategories = [
  "All Items",
  "Light Bites",
  "Egg Delights",
  "Sandwiches",
  "Pasta Favourites",
  "Crafted Burgers",
  "Wrapped & Ready",
  "Hand Made Pizzas",
  "House Special Momos",
  "Soups & Bowls",
  "Starters & Wok Delights",
  "Maggi Remixes",
  "Rice & Noodle Bowls",
  "Hot Coffee Blends",
  "Cold Coffee Creations",
  "Chai Pe Charcha",
  "Iced Teas",
  "Milkshakes",
  "Mocktails & Coolers",
  "Slushies",
  "Desserts & Brownies",
  "Add-Ons & Extras",
];

export default function MenuSection({ menu = [], onRefresh }) {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Starters & Wraps");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [veg, setVeg] = useState(true);
  const [special, setSpecial] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const filteredMenu = menu.filter((item) => {
    const matchesCat =
      activeCategory === "All Items" || item.category === activeCategory;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setCategory(activeCategory === "All Items" ? "Starters & Wraps" : activeCategory);
    setPrice("");
    setDesc("");
    setImageUrl("");
    setSelectedFile(null);
    setPreviewUrl("");
    setVeg(true);
    setSpecial(false);
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setName(item.name || "");
    setCategory(item.category || "Starters & Wraps");
    setPrice(item.price ? item.price.replace("₹", "") : "");
    setDesc(item.desc || "");
    setImageUrl(item.image || "");
    setSelectedFile(null);
    setPreviewUrl(item.image || "");
    setVeg(item.veg ?? true);
    setSpecial(item.special ?? false);
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
    if (!name.trim() || !price.toString().trim()) {
      setError("Please fill in both item name and price.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("category", category);
      formData.append("price", price.toString().trim());
      formData.append("desc", desc.trim());
      formData.append("veg", veg);
      formData.append("special", special);

      if (selectedFile) {
        formData.append("image", selectedFile);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl.trim());
      }

      let res;
      if (editingItem) {
        res = await menuApi.update(editingItem.id, formData);
      } else {
        res = await menuApi.create(formData);
      }

      if (res && res.success) {
        setIsModalOpen(false);
        onRefresh();
      } else {
        setError(res.message || "Failed to save menu item.");
      }
    } catch (err) {
      console.error("Save menu item error:", err);
      setError("Error saving item to server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await menuApi.delete(id);
      if (res && res.success) {
        onRefresh();
      } else {
        alert(res.message || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete menu item error:", err);
      alert("Error deleting item.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#2b1810]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8ded3] rounded-3xl p-6 shadow-sm">
        <div>
          <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] text-[10px] font-bold tracking-widest uppercase mb-1">
            MENU MANAGEMENT
          </span>
          <h1 className="font-display text-2xl font-bold text-[#2b1810]">
            Manage Cafe Dishes & Pricing
          </h1>
          <p className="text-xs text-[#6b5c54] mt-0.5">
            Add new starters, pizzas, coffees, and refreshers, adjust prices, and upload appetizing pictures.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Menu Item
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat
                  ? "bg-[#2b1810] text-white shadow-sm"
                  : "bg-white hover:bg-[#faf7f2] text-[#4a3b32] border border-[#e8ded3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9ca3af] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810]"
          />
        </div>
      </div>

      {/* Menu Items Grid - Clean White */}
      {filteredMenu.length === 0 ? (
        <div className="py-16 text-center bg-white border border-[#e8ded3] rounded-3xl p-8 shadow-sm">
          <UtensilsCrossed className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-[#2b1810] mb-1">
            No menu items found
          </h3>
          <p className="text-xs text-[#6b5c54] mb-4 max-w-sm mx-auto">
            Add items to this category so cafe visitors can explore your culinary offerings.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#2b1810] text-white text-xs font-bold shadow-sm"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-[#e8ded3] hover:border-[#2b1810] rounded-3xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-44 sm:h-48 bg-[#f4ece2] overflow-hidden">
                <img
                  src={item.image || "/pasta.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dietary Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center border shadow-sm ${
                      item.veg
                        ? "bg-white border-emerald-600 text-emerald-600"
                        : "bg-white border-rose-600 text-rose-600"
                    }`}
                    title={item.veg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.veg ? "bg-emerald-600" : "bg-rose-600"
                      }`}
                    />
                  </span>

                  {item.special && (
                    <span className="badge-tag bg-[#2b1810] text-white text-[9px] px-2 py-0.5 flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5 text-[#c88242]" /> Special
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#2b1810] border border-[#e8ded3] shadow-sm">
                  {item.price}
                </div>

                {/* Quick actions overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="w-8 h-8 rounded-full bg-white text-[#2b1810] hover:bg-[#faf7f2] shadow-md flex items-center justify-center transition-colors border border-[#e8ded3]"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 shadow-md flex items-center justify-center transition-colors border border-rose-200 disabled:opacity-50"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold text-[#6b5c54] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#2b1810] mb-1.5 transition-colors">
                    {item.name}
                  </h3>
                  {item.desc && (
                    <p className="text-xs text-[#6b5c54] line-clamp-2 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0e8dc] flex items-center justify-between">
                  <span className="font-bold text-[#2b1810] text-sm">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="text-xs text-[#2b1810] hover:underline font-bold transition-colors"
                  >
                    Edit Dish →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Menu Item Modal - Clean White */}
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
                {editingItem ? "EDIT MENU ITEM" : "NEW MENU ITEM"}
              </span>
              <h2 className="font-display text-xl font-bold text-[#2b1810]">
                {editingItem ? "Edit Dish & Price" : "Add Dish to Cafe Menu"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-2">
                  Food / Drink Photo (Upload File or Enter URL)
                </label>

                {previewUrl ? (
                  <div className="relative h-40 rounded-2xl overflow-hidden border border-[#e8ded3] bg-[#faf7f2] mb-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
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
                      <X className="w-3 h-3" /> Change
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <label className="cursor-pointer border-2 border-dashed border-[#e8ded3] hover:border-[#2b1810] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors bg-[#faf7f2] hover:bg-[#f5ede3]">
                      <Upload className="w-5 h-5 text-[#2b1810] mb-1" />
                      <span className="text-xs font-bold text-[#2b1810]">Choose Food Pic</span>
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
                          placeholder="e.g. /pasta.jpg"
                          className="w-full pl-9 pr-3 py-2 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Dish / Beverage Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wood-Fired Margherita Pizza"
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  required
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  >
                    <option value="Starters & Wraps">Starters & Wraps</option>
                    <option value="Pizzas & Burgers">Pizzas & Burgers</option>
                    <option value="Pastas & Mains">Pastas & Mains</option>
                    <option value="Signature Coolers">Signature Coolers</option>
                    <option value="Coffee & Desserts">Coffee & Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 290"
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Description / Ingredients
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={2}
                  placeholder="e.g. San Marzano tomatoes, fresh mozzarella, and basil leaves on thin artisanal crust."
                  className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white resize-none"
                />
              </div>

              {/* Toggles: Veg & Chef's Special */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={veg}
                    onChange={(e) => setVeg(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-[#2b1810]">
                    Vegetarian Option
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={special}
                    onChange={(e) => setSpecial(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#2b1810]"
                  />
                  <span className="text-xs font-bold text-[#2b1810]">
                    Chef's Special Badge
                  </span>
                </label>
              </div>

              {/* Modal Buttons */}
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
                  {submitting ? "Saving..." : editingItem ? "Update Dish" : "Add to Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
