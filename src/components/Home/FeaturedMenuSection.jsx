import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Star, Flame } from "lucide-react";
import api from "../../lib/api";
import ScrollReveal from "../ui/ScrollReveal";

const initialDishes = [
  {
    name: "Cheese-Infused Garlic Bread (4pc)",
    category: "Starters & Wraps",
    desc: "Toasted artisanal bread infused with melting mozzarella and fragrant garlic butter.",
    price: "₹109",
    image: "/tacos.jpg",
    isVegetarian: true,
    badge: "Popular",
  },
  {
    name: "Classic Margherita Pizza",
    category: "Pizzas & Burgers",
    desc: "San Marzano plum tomatoes, bubbling mozzarella, and aromatic basil on stone-baked crust.",
    price: "₹179",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800",
    isVegetarian: true,
    badge: "Classic",
  },
  {
    name: "Creamy White Sauce Pasta",
    category: "Pastas & Mains",
    desc: "Penne pasta enveloped in rich garlic-infused parmesan cream sauce with sauteed herbs.",
    price: "₹199",
    image: "/pasta.jpg",
    isVegetarian: true,
    badge: "Best Seller",
  },
  {
    name: "Virgin Mojito Magic",
    category: "Signature Coolers",
    desc: "Crushed mint leaves, fresh lime juice, cane sugar, and sparkling club soda over ice.",
    price: "₹99",
    image: "/everbloom/signature-coolers.jpg",
    isVegetarian: true,
    badge: "Refreshing",
  },
  {
    name: "Sizzling Brownie with Ice Cream",
    category: "Coffee & Desserts",
    desc: "Warm gooey dark chocolate brownie served on a smoking sizzler plate with vanilla scoop.",
    price: "₹189",
    image: "/cheesecake.jpg",
    isVegetarian: true,
    badge: "Showstopper",
  },
  {
    name: "Classic Cold Coffee",
    category: "Coffee & Desserts",
    desc: "Double espresso blended with chilled milk, vanilla cream, and rich micro-foam.",
    price: "₹119",
    image: "/iced-latte.jpg",
    isVegetarian: true,
    badge: "All-Time Fav",
  },
];

export default function FeaturedMenuSection() {
  const [dishes, setDishes] = useState(initialDishes);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    let isMounted = true;
    async function loadLiveMenu() {
      try {
        const res = await api.getAllMenuItems({ isAvailable: "true" });
        if (isMounted && res.data && res.data.length > 0) {
          const mapped = res.data.slice(0, 6).map((item) => ({
            name: item.name,
            category: item.category,
            desc: item.description,
            price: typeof item.price === "number" ? `₹${item.price}` : item.price,
            image: item.image,
            isVegetarian: item.isVegetarian !== false,
            badge: item.tags?.[0] || (item.isSpecial ? "Featured" : null),
          }));
          setDishes(mapped);
        }
      } catch (err) {
        console.warn("Using offline fallback featured dishes:", err.message);
      }
    }

    loadLiveMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["ALL", "Starters & Wraps", "Pizzas & Burgers", "Pastas & Mains", "Signature Coolers", "Coffee & Desserts"];

  const filteredDishes = dishes.filter((dish) => {
    if (activeFilter === "ALL") return true;
    return dish.category === activeFilter;
  });

  return (
    <section className="section-padding py-20 lg:py-28 bg-white text-[#1c1109] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Header with Scroll Reveal */}
        <ScrollReveal variant="up" className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c88242]/15 text-[#c88242] text-[10px] font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            CULINARY EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109] mb-3">
            Signature Café Dishes
          </h2>
          <p className="text-xs sm:text-sm text-[#6b5c54]">
            Handcrafted fresh to order with authentic ingredients and artisanal passion.
          </p>
        </ScrollReveal>

        {/* Filter Pills with Scroll Reveal */}
        <ScrollReveal variant="scale" delay={150} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isSelected
                    ? "bg-[#2b1810] text-white shadow-md scale-105"
                    : "bg-[#faf7f2] hover:bg-[#e8ded3] text-[#6b5c54] border border-[#e8ded3]"
                  }`}
              >
                {cat === "ALL" ? "All Signatures" : cat}
              </button>
            );
          })}
        </ScrollReveal>

        {/* 6 Animated Cards Grid with Staggered Scroll Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish, i) => {
            const delays = [100, 150, 200, 250, 300, 350];
            return (
              <ScrollReveal
                key={dish.name || i}
                variant="up"
                delay={delays[i] || 100}
                className="h-full"
              >
                <div className="group h-full rounded-3xl overflow-hidden bg-[#faf7f2] border border-[#e8ded3] hover:border-[#c88242]/60 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5">
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* Price Tag with Subtle Shadow */}
                    <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#1c1109] shadow-lg group-hover:scale-105 transition-transform">
                      {dish.price}
                    </div>

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-4 left-4 p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${dish.isVegetarian !== false ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        title={dish.isVegetarian !== false ? "Vegetarian" : "Non-Vegetarian"}
                      />
                    </div>

                    {/* Badge Tag if any */}
                    {dish.badge && (
                      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#2b1810]/80 backdrop-blur-md text-[10px] font-bold text-[#fcd9b8] uppercase tracking-wider shadow-md">
                        {dish.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#1c1109] group-hover:text-[#c88242] transition-colors mb-2">
                        {dish.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6b5c54] font-light leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#e8ded3] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#c88242]">
                        Freshly Prepared
                      </span>
                      <Link
                        to="/menu"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1c1109] group-hover:text-[#c88242] group-hover:translate-x-1 transition-all"
                      >
                        <span>View in Menu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View Full Menu CTA with Scroll Reveal */}
        <ScrollReveal variant="up" delay={200} className="text-center mt-14">
          <Link
            to="/menu"
            className="btn-espresso px-8 py-3.5 text-xs font-bold tracking-[0.14em] uppercase shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
          >
            <span>EXPLORE FULL CAFÉ MENU</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
