import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  UtensilsCrossed,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";
import api from "../../lib/api";
import { FULL_MENU_SECTIONS } from "../../data/menuData";

const ALL_CATEGORIES = [
  "All Dishes",
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

const CATEGORY_META = {
  "Light Bites": { number: "01", eyebrow: "Crisp snacks, loaded fries & finger foods" },
  "Egg Delights": { number: "02", eyebrow: "Fresh farm eggs cooked to perfection" },
  "Sandwiches": { number: "03", eyebrow: "Freshly toasted gourmet breads" },
  "Pasta Favourites": { number: "04", eyebrow: "Italian pastas tossed in rich velvety scratch-made sauces" },
  "Crafted Burgers": { number: "05", eyebrow: "Loaded with homemade patties & secret sauces" },
  "Wrapped & Ready": { number: "06", eyebrow: "Toasted rolls & wraps loaded with fresh fillings" },
  "Hand Made Pizzas": { number: "07", eyebrow: "Freshly baked artisan crusts topped with mozzarella" },
  "House Special Momos": { number: "08", eyebrow: "Steamed, crispy, schezwan & afghani dumplings" },
  "Soups & Bowls": { number: "09", eyebrow: "Aromatic, comforting & warm bowls" },
  "Starters & Wok Delights": { number: "10", eyebrow: "Indo-Chinese sizzlers, tossed platters & seafood" },
  "Maggi Remixes": { number: "11", eyebrow: "Desi noodles tossed with gourmet cafe twists" },
  "Rice & Noodle Bowls": { number: "12", eyebrow: "Wok-tossed aromatic rice & oriental noodles" },
  "Hot Coffee Blends": { number: "13", eyebrow: "Aromatic espresso brews extracted from single-origin beans" },
  "Cold Coffee Creations": { number: "14", eyebrow: "Chilled espresso frappes, blended with cream" },
  "Chai Pe Charcha": { number: "15", eyebrow: "Fresh brewed Indian cutting chais & herbal teas" },
  "Iced Teas": { number: "16", eyebrow: "Refreshing brewed teas infused with fruit nectars" },
  "Milkshakes": { number: "17", eyebrow: "Thick creamy shakes blended with rich dairy & toppings" },
  "Mocktails & Coolers": { number: "18", eyebrow: "Sparkling sodas, citrus blends & colorful party coolers" },
  "Slushies": { number: "19", eyebrow: "Icy crushed coolers for instant tropical freshness" },
  "Desserts & Brownies": { number: "20", eyebrow: "Decadent cakes, warm brownies & ice creams" },
  "Add-Ons & Extras": { number: "21", eyebrow: "Customize your meals & beverages" },
};

export default function MenuList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 12,
  });
  const [dietFilter, setDietFilter] = useState("ALL"); // "ALL" | "VEG" | "NON_VEG"
  const listRef = useRef(null);

  const itemsPerPage = 12;

  // Fetch paginated menu items on category, page, or diet change
  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          sortBy: "displayOrder",
        };

        if (selectedCategory !== "All Dishes") {
          params.category = selectedCategory;
        }

        if (dietFilter === "VEG") params.isVegetarian = "true";
        if (dietFilter === "NON_VEG") params.isVegetarian = "false";

        const res = await api.getAllMenuItems(params);

        if (isMounted && res && res.data && Array.isArray(res.data)) {
          setItems(res.data);
          if (res.pagination) {
            setPagination(res.pagination);
          } else {
            setPagination({
              totalItems: res.data.length,
              totalPages: Math.ceil(res.data.length / itemsPerPage) || 1,
              currentPage,
              limit: itemsPerPage,
            });
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("API menu fetch error, using local fallback:", err.message);
      }

      // Offline Fallback slice
      if (isMounted) {
        let allFallbackItems = [];
        FULL_MENU_SECTIONS.forEach((s) => {
          s.items.forEach((it) => {
            allFallbackItems.push({
              name: it.name,
              category: s.title,
              sectionNumber: s.number,
              sectionEyebrow: s.subtitle,
              price: it.price,
              priceDisplay: it.price,
              description: it.badge ? `[${it.badge}] Freshly prepared to order.` : "Freshly crafted to order with premium ingredients.",
              image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
              isVegetarian: it.isVeg !== false && !it.isNonVeg,
              tags: it.badge ? [it.badge] : [],
            });
          });
        });

        if (selectedCategory !== "All Dishes") {
          allFallbackItems = allFallbackItems.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (dietFilter === "VEG") {
          allFallbackItems = allFallbackItems.filter((i) => i.isVegetarian);
        } else if (dietFilter === "NON_VEG") {
          allFallbackItems = allFallbackItems.filter((i) => !i.isVegetarian);
        }

        const totalItems = allFallbackItems.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        const startIndex = (currentPage - 1) * itemsPerPage;
        const sliced = allFallbackItems.slice(startIndex, startIndex + itemsPerPage);

        setItems(sliced);
        setPagination({
          totalItems,
          totalPages,
          currentPage,
          limit: itemsPerPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        });
        setLoading(false);
      }
    };

    fetchMenu();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, currentPage, dietFilter]);

  const handleCategorySelect = (catName) => {
    if (selectedCategory === catName) return;
    setSelectedCategory(catName);
    setCurrentPage(1);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeMeta = CATEGORY_META[selectedCategory] || {
    number: "ALL",
    eyebrow: "COMPLETE ARTISANAL COLLECTION",
  };

  // Generate page buttons array
  const getPageNumbers = () => {
    const total = pagination.totalPages;
    const current = currentPage;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, "...", total];
    }
    if (current >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <div ref={listRef} className="section-padding py-16 sm:py-24 bg-white text-[#1c1109]">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Sticky Category Pills Navigation */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md py-4 border-b border-[#e8ded3] overflow-x-auto no-scrollbar shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-max px-1">
              {ALL_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isSelected
                      ? "bg-[#c88242] text-white shadow-md scale-105"
                      : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3] hover:text-[#1c1109]"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Diet Switcher */}
            <div className="shrink-0 flex items-center bg-[#faf7f2] p-1 rounded-full border border-[#e8ded3]">
              <button
                onClick={() => { setDietFilter("ALL"); setCurrentPage(1); }}
                className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${dietFilter === "ALL" ? "bg-white text-[#1c1109] shadow-xs" : "text-[#6b5c54]"
                  }`}
              >
                All
              </button>
              <button
                onClick={() => { setDietFilter("VEG"); setCurrentPage(1); }}
                className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors flex items-center gap-1 ${dietFilter === "VEG" ? "bg-emerald-600 text-white shadow-xs" : "text-[#6b5c54]"
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                Veg
              </button>
              <button
                onClick={() => { setDietFilter("NON_VEG"); setCurrentPage(1); }}
                className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors flex items-center gap-1 ${dietFilter === "NON_VEG" ? "bg-red-600 text-white shadow-xs" : "text-[#6b5c54]"
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                Non-Veg
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-[#e8ded3] pb-4">
          <div>
            <span className="text-[10px] sm:text-xs tracking-[0.22em] text-[#c88242] uppercase font-bold block mb-1">
              {activeMeta.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1c1109]">
              {selectedCategory}
            </h2>
          </div>
          <div className="text-right">
            <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#c88242]/30 select-none block">
              {activeMeta.number}
            </span>
            <span className="text-[11px] font-semibold text-[#8c7a70]">
              {pagination.totalItems} {pagination.totalItems === 1 ? "dish" : "dishes"} available
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#c88242]" />
            <p className="text-sm text-[#6b5c54] font-medium">Fetching dishes fresh from the kitchen...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-[#faf7f2] rounded-3xl border border-[#e8ded3] p-8">
            <UtensilsCrossed className="w-10 h-10 text-[#c88242] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#1c1109] mb-1">No Dishes Found</h3>
            <p className="text-xs text-[#6b5c54]">
              There are no dishes matching this selection right now. Try switching the category or diet filter.
            </p>
          </div>
        ) : (
          /* 3-Column Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, i) => (
              <div
                key={item._id || item.slug || i}
                className="group rounded-3xl overflow-hidden bg-[#faf7f2] border border-[#e8ded3] hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative"
              >
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#1c1109] shadow-md flex items-center gap-1.5">
                    {item.priceDisplay || `${item.currency || "₹"}${item.price}`}
                  </div>

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-4 left-4 p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${item.isVegetarian ? "bg-emerald-600" : "bg-red-600"
                        }`}
                      title={item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                    />
                  </div>

                  {/* Special Badge */}
                  {(item.tags?.[0] || item.isSpecial) && (
                    <div className="absolute bottom-4 left-4 px-2.5 py-0.5 rounded-full bg-[#1c1109]/80 backdrop-blur-sm text-[10px] font-bold text-[#f4e4d2] tracking-wider uppercase">
                      {item.tags?.[0] || "Special"}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c88242]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#1c1109] group-hover:text-[#c88242] transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6b5c54] font-light leading-relaxed">
                    {item.description || item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Navigation Bar */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e8ded3]">
            <span className="text-xs text-[#6b5c54] font-medium">
              Showing{" "}
              <span className="font-bold text-[#1c1109]">
                {Math.min((currentPage - 1) * itemsPerPage + 1, pagination.totalItems)}
              </span>{" "}
              to{" "}
              <span className="font-bold text-[#1c1109]">
                {Math.min(currentPage * itemsPerPage, pagination.totalItems)}
              </span>{" "}
              of <span className="font-bold text-[#1c1109]">{pagination.totalItems}</span> dishes
            </span>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-[#e8ded3] bg-[#faf7f2] text-[#1c1109] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e8ded3] transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((num, idx) => {
                if (num === "...") {
                  return (
                    <span key={`dots-${idx}`} className="px-2 text-xs text-[#8c7a70]">
                      ...
                    </span>
                  );
                }
                const isCurrent = num === currentPage;
                return (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${isCurrent
                      ? "bg-[#c88242] text-white shadow-sm"
                      : "bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] hover:bg-[#e8ded3] hover:text-[#1c1109]"
                      }`}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="p-2 rounded-xl border border-[#e8ded3] bg-[#faf7f2] text-[#1c1109] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e8ded3] transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
