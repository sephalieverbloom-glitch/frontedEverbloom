import { useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  Check,
  X,
  LayoutGrid,
  List,
  Sparkles,
  UtensilsCrossed,
  Filter,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { PRESET_CATEGORIES } from "./ItemModal";

export default function AdminMenuList({
  menuItems = [],
  onAddNewDish,
  onEditDish,
  onDeleteDish,
  onUpdatePrice,
  onToggleAvailability,
  onSeedMenu,
  isLoading = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDiet, setSelectedDiet] = useState("ALL"); // "ALL" | "VEG" | "NON_VEG"
  const [selectedStock, setSelectedStock] = useState("ALL"); // "ALL" | "IN_STOCK" | "OUT_OF_STOCK"
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"

  // Inline price editing state
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState("");

  const handleStartEditPrice = (item) => {
    setEditingPriceId(item._id || item.id);
    setTempPrice(item.price);
  };

  const handleSavePrice = async (itemId) => {
    const num = Number(tempPrice);
    if (isNaN(num) || num < 0) return;
    await onUpdatePrice(itemId, num);
    setEditingPriceId(null);
  };

  const handleKeyDownPrice = (e, itemId) => {
    if (e.key === "Enter") {
      handleSavePrice(itemId);
    } else if (e.key === "Escape") {
      setEditingPriceId(null);
    }
  };

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDiet =
      selectedDiet === "ALL" ||
      (selectedDiet === "VEG" && item.isVegetarian !== false) ||
      (selectedDiet === "NON_VEG" && item.isVegetarian === false);

    const matchesStock =
      selectedStock === "ALL" ||
      (selectedStock === "IN_STOCK" && item.isAvailable !== false) ||
      (selectedStock === "OUT_OF_STOCK" && item.isAvailable === false);

    return matchesCategory && matchesSearch && matchesDiet && matchesStock;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Control Panel Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded3] shadow-sm space-y-4">
        {/* Top Row: Search & Action Buttons */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#6b5c54] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] focus:outline-none focus:border-[#c88242]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {/* View Switcher */}
            <div className="flex items-center bg-[#faf7f2] border border-[#e8ded3] p-1 rounded-2xl">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-white text-[#2b1810] shadow-sm font-bold"
                    : "text-[#6b5c54] hover:text-[#2b1810]"
                }`}
                title="Table View (Compact)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === "cards"
                    ? "bg-white text-[#2b1810] shadow-sm font-bold"
                    : "text-[#6b5c54] hover:text-[#2b1810]"
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onSeedMenu}
              className="px-3.5 py-2.5 rounded-2xl border border-[#e8ded3] text-xs font-bold text-[#6b5c54] hover:text-[#2b1810] bg-[#faf7f2] flex items-center gap-1.5 transition-colors"
              title="Restore initial 15 signature items"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Seed Menu</span>
            </button>

            <button
              onClick={onAddNewDish}
              className="btn-caramel px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e8ded3]/60 text-xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${
                selectedCategory === "ALL"
                  ? "bg-[#2b1810] text-white shadow-sm"
                  : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
              }`}
            >
              All Categories ({menuItems.length})
            </button>

            {PRESET_CATEGORIES.map((c) => {
              const count = menuItems.filter((i) => i.category === c.name).length;
              const isSelected = selectedCategory === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${
                    isSelected
                      ? "bg-[#c88242] text-white shadow-sm"
                      : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Diet & Stock Quick Selectors */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-3 py-1 rounded-xl bg-[#faf7f2] border border-[#e8ded3] text-[11px] font-semibold text-[#6b5c54] focus:outline-none"
            >
              <option value="ALL">All Diets</option>
              <option value="VEG">Vegetarian Only</option>
              <option value="NON_VEG">Non-Veg Only</option>
            </select>

            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="px-3 py-1 rounded-xl bg-[#faf7f2] border border-[#e8ded3] text-[11px] font-semibold text-[#6b5c54] focus:outline-none"
            >
              <option value="ALL">All Stock</option>
              <option value="IN_STOCK">In Stock Only</option>
              <option value="OUT_OF_STOCK">Sold Out Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Table View OR Visual Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#6b5c54]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#c88242] mb-2" />
          Loading dishes from database...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e8ded3]">
          <UtensilsCrossed className="w-12 h-12 text-[#c88242]/40 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-normal text-[#1c1109]">No dishes match your filters</h3>
          <p className="text-xs text-[#6b5c54] mt-1 mb-6">
            Try clearing filters or search to view all dishes.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedDiet("ALL");
              setSelectedStock("ALL");
            }}
            className="btn-caramel px-6 py-2.5 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-[#e8ded3] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#e8ded3] bg-[#faf7f2] text-[10px] uppercase tracking-wider text-[#6b5c54] font-bold">
                  <th className="py-4 px-6">Dish</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price (Inline Edit)</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8ded3]">
                {filteredItems.map((item) => {
                  const itemId = item._id || item.id;
                  const isEditingPrice = editingPriceId === itemId;

                  return (
                    <tr key={itemId} className="hover:bg-[#faf7f2]/60 transition-colors">
                      {/* Dish Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.image || "/everbloom/signature-coolers.jpg"}
                            alt={item.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-[#e8ded3] shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  item.isVegetarian !== false ? "bg-emerald-600" : "bg-red-600"
                                }`}
                                title={item.isVegetarian !== false ? "Vegetarian" : "Non-Vegetarian"}
                              />
                              <span className="font-serif text-base font-normal text-[#1c1109]">
                                {item.name}
                              </span>
                              {item.isSpecial && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#c88242]/15 text-[#c88242] uppercase tracking-wider">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#6b5c54] line-clamp-1 max-w-sm mt-0.5">
                              {item.description || item.desc}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#faf7f2] border border-[#e8ded3] text-[11px] font-semibold text-[#6b5c54]">
                          {item.category}
                        </span>
                      </td>

                      {/* Live Inline Price Edit */}
                      <td className="py-4 px-4">
                        {isEditingPrice ? (
                          <div className="flex items-center gap-1.5 animate-fadeIn">
                            <span className="font-bold text-xs text-[#c88242]">₹</span>
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              onKeyDown={(e) => handleKeyDownPrice(e, itemId)}
                              className="w-20 px-2 py-1 rounded-lg border border-[#c88242] text-xs font-bold focus:outline-none"
                              autoFocus
                              min={0}
                            />
                            <button
                              onClick={() => handleSavePrice(itemId)}
                              className="p-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                              title="Save Price (Enter)"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                              title="Cancel (Esc)"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEditPrice(item)}
                            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all text-left"
                            title="Click to modify price directly"
                          >
                            <span className="font-bold text-[#1c1109] group-hover:text-[#c88242] text-sm">
                              ₹{item.price}
                            </span>
                            <Edit2 className="w-3 h-3 text-[#6b5c54]/40 group-hover:text-[#c88242]" />
                          </button>
                        )}
                      </td>

                      {/* 1-Click Availability Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => onToggleAvailability(item)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                            item.isAvailable !== false
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                          title="Click to toggle In-Stock / Sold Out"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isAvailable !== false ? "bg-emerald-600" : "bg-red-600"
                            }`}
                          />
                          {item.isAvailable !== false ? "In Stock" : "Sold Out"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditDish(item)}
                            className="p-2 rounded-xl border border-[#e8ded3] hover:border-[#c88242] text-[#6b5c54] hover:text-[#c88242] bg-white transition-colors"
                            title="Edit Full Dish Details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDeleteDish(item)}
                            className="p-2 rounded-xl border border-[#e8ded3] hover:border-red-300 text-[#6b5c54] hover:text-red-600 bg-white transition-colors"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VISUAL CARDS GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const itemId = item._id || item.id;
            const isEditingPrice = editingPriceId === itemId;

            return (
              <div
                key={itemId}
                className="bg-white rounded-3xl border border-[#e8ded3] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                  <img
                    src={item.image || "/everbloom/signature-coolers.jpg"}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                      item.isAvailable === false ? "grayscale brightness-75" : ""
                    }`}
                  />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#1c1109] shadow-sm flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isVegetarian !== false ? "bg-emerald-600" : "bg-red-600"
                      }`}
                    />
                    {item.category}
                  </div>

                  {/* Sold out tag */}
                  {item.isAvailable === false && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-600 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-serif text-lg font-normal text-[#1c1109] leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#6b5c54] line-clamp-2 leading-relaxed mb-4">
                      {item.description || item.desc}
                    </p>
                  </div>

                  {/* Price & Status Controls */}
                  <div className="pt-3 border-t border-[#e8ded3] flex items-center justify-between">
                    {/* Price with Inline Edit */}
                    <div>
                      {isEditingPrice ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-[#c88242]">₹</span>
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            onKeyDown={(e) => handleKeyDownPrice(e, itemId)}
                            className="w-16 px-1.5 py-0.5 rounded border border-[#c88242] text-xs font-bold"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(itemId)}
                            className="p-1 rounded bg-emerald-600 text-white"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEditPrice(item)}
                          className="font-bold text-base text-[#1c1109] hover:text-[#c88242] flex items-center gap-1"
                          title="Click to edit price"
                        >
                          ₹{item.price}
                          <Edit2 className="w-3 h-3 text-gray-400 hover:text-[#c88242]" />
                        </button>
                      )}
                    </div>

                    {/* Stock & Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleAvailability(item)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.isAvailable !== false
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.isAvailable !== false ? "In Stock" : "Sold Out"}
                      </button>

                      <button
                        onClick={() => onEditDish(item)}
                        className="p-1.5 rounded-lg border border-[#e8ded3] hover:border-[#c88242] text-[#6b5c54]"
                        title="Edit Dish"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteDish(item)}
                        className="p-1.5 rounded-lg border border-[#e8ded3] hover:border-red-300 text-red-500"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
