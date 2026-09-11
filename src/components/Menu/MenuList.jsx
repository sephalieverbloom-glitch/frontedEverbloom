import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sparkles, BookOpen } from "lucide-react";
import api from "../../lib/api";

const curatedSections = [
  {
    number: "01",
    eyebrow: "BEGIN YOUR JOURNEY",
    title: "Starters & Wraps",
    items: [
      {
        name: "Cheese-Infused Garlic Bread (4pc)",
        price: "₹109",
        desc: "Toasted artisanal bread infused with melting mozzarella and fragrant garlic butter.",
        image: "https://images.unsplash.com/photo-1619881589885-30040e3a6a16?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Crispy Chicken Fingers with Dip",
        price: "₹149",
        desc: "Golden crumbed tender chicken strips served with kasundi mustard mayo and sweet chili dip.",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800",
        isVegetarian: false,
      },
      {
        name: "Smoky Paneer Tikka Wrap",
        price: "₹139",
        desc: "Char-grilled cottage cheese cubes with mint coriander mayo, bell peppers, and crisp greens.",
        image: "/avocado-toast.jpg",
        isVegetarian: true,
      },
    ],
  },
  {
    number: "02",
    eyebrow: "SIGNATURE CREATIONS",
    title: "Pizzas & Burgers",
    items: [
      {
        name: "Classic Margherita Pizza",
        price: "₹179",
        desc: "San Marzano plum tomatoes, fresh bubbling mozzarella, and aromatic basil on thin stone-baked crust.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Supreme Veggie Overload Pizza",
        price: "₹239",
        desc: "Topped with sweet American corn, black olives, bell peppers, button mushrooms, and double mozzarella.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Everbloom King Chicken Burger",
        price: "₹169",
        desc: "Crispy fried chicken fillet topped with melted cheddar, pickled cucumber, and smoky sauce.",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800",
        isVegetarian: false,
      },
    ],
  },
  {
    number: "03",
    eyebrow: "ITALIAN CLASSICS",
    title: "Pastas & Sandwiches",
    items: [
      {
        name: "Creamy White Sauce Pasta",
        price: "₹199",
        desc: "Penne pasta enveloped in rich garlic-infused parmesan cream sauce with sauteed herbs.",
        image: "/pasta.jpg",
        isVegetarian: true,
      },
      {
        name: "Melted Cheese & Corn Sandwich",
        price: "₹109",
        desc: "Golden grilled crusty bread loaded with sweet American corn and melting mozzarella cheese.",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Special Chicken Carbonara Pasta",
        price: "₹280",
        desc: "Velvety egg yolk & parmesan sauce tossed with grilled chicken strips and cracked black pepper.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
        isVegetarian: false,
      },
    ],
  },
  {
    number: "04",
    eyebrow: "HOUSE REFRESHERS",
    title: "Signature Coolers & Shakes",
    items: [
      {
        name: "Virgin Mojito Magic",
        price: "₹99",
        desc: "Muddled fresh garden mint, lime wedges, cane sugar, and sparkling soda over crushed ice.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Everbloom Special Milkshake",
        price: "₹149",
        desc: "Our signature rich dessert shake blended with premium ice cream, cream, and crunchy crumbles.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800",
        isVegetarian: true,
      },
      {
        name: "Rainbow Mocktail (3-Layer)",
        price: "₹129",
        desc: "Spectacular 3-layer refreshing fruit mocktail crafted with tropical fruit syrups and soda.",
        image: "/everbloom/signature-coolers.jpg",
        isVegetarian: true,
      },
    ],
  },
  {
    number: "05",
    eyebrow: "SWEET FINALE & BREWS",
    title: "Coffee & Desserts",
    items: [
      {
        name: "Classic Cold Coffee",
        price: "₹119",
        desc: "Double espresso pulled over chilled milk, vanilla essence, and velvety froth.",
        image: "/iced-latte.jpg",
        isVegetarian: true,
      },
      {
        name: "Sizzling Brownie with Ice Cream",
        price: "₹189",
        desc: "Warm gooey walnut brownie served on a smoking sizzler plate with vanilla ice cream.",
        image: "/cheesecake.jpg",
        isVegetarian: true,
      },
      {
        name: "Choco Lava Cake",
        price: "₹89",
        desc: "Warm dark chocolate sponge cake with a luscious gooey molten chocolate center.",
        image: "/tiramisu.jpg",
        isVegetarian: true,
      },
    ],
  },
];

export default function MenuList() {
  const [sections, setSections] = useState(curatedSections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.getGroupedMenu();
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setSections(res.data);
        }
      } catch (err) {
        console.warn("Could not load dynamic menu, using fallback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="section-padding py-16 sm:py-24 bg-white text-[#1c1109]">
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {sections.map((sec, secIdx) => (
          <section key={sec.number || secIdx}>
            {/* Section Header with Number Watermark */}
            <div className="flex items-end justify-between border-b border-[#e8ded3] pb-4 mb-10 sm:mb-12">
              <div>
                <span className="text-[10px] sm:text-xs tracking-[0.22em] text-[#c88242] uppercase font-bold block mb-1">
                  {sec.eyebrow}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1c1109]">
                  {sec.title}
                </h2>
              </div>
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#c88242]/30 select-none">
                {sec.number}
              </span>
            </div>

            {/* 3 Column Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sec.items.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-3xl overflow-hidden bg-[#faf7f2] border border-[#e8ded3] hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative"
                >
                  <div className="relative h-60 sm:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#1c1109] shadow-md flex items-center gap-1.5">
                      {item.price}
                    </div>

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-4 left-4 p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.isVegetarian ? "bg-emerald-600" : "bg-red-600"
                        }`}
                        title={item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-normal text-[#1c1109] group-hover:text-[#c88242] transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6b5c54] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
