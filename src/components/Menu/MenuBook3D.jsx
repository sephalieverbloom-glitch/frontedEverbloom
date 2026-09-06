import React, { useState, useRef, useEffect } from "react";
import {
  Coffee,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Hand,
  ChevronRight,
  ChevronLeft,
  Flame,
  Star,
  Phone,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ADDRESS, PHONE_PRIMARY, PHONE_SECONDARY } from "../../const";

// Comprehensive Booklet Pages matching the official menu
const allMenuPages = [
  // Page 0: Front Cover
  {
    type: "cover",
    badge: "2026 OFFICIAL MENU",
    title: "EVERBLOOM",
    subtitle: "ARTISANAL CAFÉ & SANCTUARY",
    tagline: "Where good food and good mood bloom together",
    location: "Near SUM Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar",
    hint: "Swipe left with finger to open",
  },
  // Page 1: Coffee & Culinary Philosophy
  {
    type: "editorial",
    pageNumber: 1,
    eyebrow: "OUR PHILOSOPHY",
    title: "Crafted with Passion",
    quote: "Honest ingredients, single-origin coffees & comforting gourmet recipes.",
    text: "Every dish and beverage at Everbloom is prepared fresh to order. From our stone-baked crusts to artisanal espresso brews and secret-spiced wraps, we believe in great taste without compromise.",
    features: [
      "100% Single-Origin Arabica",
      "Freshly Toasted & Baked Daily",
      "Pocket-Friendly: ₹200–₹400",
      "Prep Time: 15–25 Minutes",
    ],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
  },
  // Page 2: Light Bites & Egg Delights
  {
    type: "menu",
    pageNumber: 2,
    category: "LIGHT BITES & EGGS",
    subtitle: "Crispy appetizers, garlic breads & fresh egg delights",
    items: [
      { name: "Cheese-Infused Garlic Bread (4pc)", price: "₹109", isVeg: true },
      { name: "Cheese-Infused Chicken Garlic Bread (4pc)", price: "₹149", isVeg: false, badge: "Special" },
      { name: "Peri Peri French Fries", price: "₹119", isVeg: true, badge: "Popular" },
      { name: "Nachos with Fresh House Salsa", price: "₹129", isVeg: true, badge: "Must Try" },
      { name: "Crispy Chicken Fingers", price: "₹149", isVeg: false },
      { name: "Everbloom Special Fish & Chips", price: "₹149", isVeg: false, badge: "Chef Pick" },
      { name: "Egg Masala Omelette", price: "₹79", isVeg: false, isEgg: true },
      { name: "Cheese Egg Omelette", price: "₹79", isVeg: false, isEgg: true },
    ],
  },
  // Page 3: Sandwiches
  {
    type: "menu",
    pageNumber: 3,
    category: "GOURMET SANDWICHES",
    subtitle: "Freshly toasted breads (Preparation: 15–25 mins)",
    items: [
      { name: "Garden Fresh Grilled Veg Sandwich", price: "₹99", isVeg: true },
      { name: "Melted Cheese & Corn Sandwich", price: "₹109", isVeg: true, badge: "Favorite" },
      { name: "Peri-Peri Paneer Sandwich", price: "₹129", isVeg: true },
      { name: "Paneer Tikka Sandwich", price: "₹139", isVeg: true, badge: "Popular" },
      { name: "Spiced Chicken Peri Sandwich", price: "₹139", isVeg: false },
      { name: "Smoky Tandoori Chicken Sandwich", price: "₹149", isVeg: false },
      { name: "Barbecue Glazed Chicken Sandwich", price: "₹159", isVeg: false, badge: "Signature" },
      { name: "Club Sandwich (Veg / Non-Veg)", price: "₹169 / ₹189", isVeg: true, badge: "Triple Decker" },
    ],
  },
  // Page 4: Pasta & Crafted Burgers
  {
    type: "menu",
    pageNumber: 4,
    category: "PASTAS & BURGERS",
    subtitle: "Velvety Italian sauces & handcrafted gourmet burgers",
    items: [
      { name: "Creamy White Sauce Pasta", price: "Veg: ₹199 | Non-Veg: ₹219", isVeg: true, badge: "Best Seller" },
      { name: "Slow-Simmered Red Sauce Pasta", price: "Veg: ₹219 | Non-Veg: ₹229", isVeg: true },
      { name: "Chef's Special Mixed Sauce Pasta", price: "Veg: ₹229 | Non-Veg: ₹239", isVeg: true, badge: "Special" },
      { name: "Special Chicken Carbonara Pasta", price: "₹280", isVeg: false, badge: "Must Try" },
      { name: "Classic Veg Burger / Chilli Potato", price: "₹109", isVeg: true },
      { name: "Grilled Paneer Delight Burger", price: "₹129", isVeg: true },
      { name: "Everbloom King Veg Burger", price: "₹149", isVeg: true, badge: "King Size" },
      { name: "Tandoori Chicken / BBQ Chicken Burger", price: "₹149 / ₹159", isVeg: false },
      { name: "Everbloom King Chicken Burger", price: "₹169", isVeg: false, badge: "Signature" },
    ],
  },
  // Page 5: Wraps & House Special Momos
  {
    type: "menu",
    pageNumber: 5,
    category: "WRAPS & SPECIAL MOMOS",
    subtitle: "Toasted wraps, parathas & house steamed/fried dumplings",
    items: [
      { name: "Malabar Paratha (2pc)", price: "₹35", isVeg: true },
      { name: "Rustic Aloo / Egg Mayo Wrap", price: "₹109 / ₹119", isVeg: true },
      { name: "Creamy Corn & Cheese Wrap", price: "₹139", isVeg: true, badge: "Cheesy" },
      { name: "Paneer Tikka / Chicken Keema Wrap", price: "₹139", isVeg: true },
      { name: "Barbeque Chicken / Tandoori Roll", price: "₹149", isVeg: false, badge: "Popular" },
      { name: "Steam Momo (Veg / Paneer / Chicken)", price: "₹69 / ₹79 / ₹79", isVeg: true },
      { name: "Crispy Fried Momo (Veg / P / Non-Veg)", price: "₹79 / ₹89 / ₹89", isVeg: true, badge: "Crunchy" },
      { name: "Schezwan & Afghani Momo", price: "₹89 / ₹99 / ₹109", isVeg: true },
      { name: "KFC Style Fried Momo", price: "₹129 / ₹139 / ₹139", isVeg: true, badge: "Must Try" },
    ],
  },
  // Page 6: Hand Made Pizzas
  {
    type: "menu",
    pageNumber: 6,
    category: "HAND MADE PIZZAS",
    subtitle: "Stone-baked thin crusts topped with mozzarella & herbs",
    items: [
      { name: "Classic Margherita", price: "₹179", isVeg: true, badge: "Classic" },
      { name: "Sweet Corn Delight", price: "₹199", isVeg: true },
      { name: "Paneer Makhni Fusion", price: "₹219", isVeg: true, badge: "Desi Fusion" },
      { name: "Supreme Veggie Overload", price: "₹239", isVeg: true, badge: "Best Seller" },
      { name: "Neapolitan Pizza (Veg / Non-Veg)", price: "₹239 / ₹259", isVeg: true },
      { name: "Peri Peri Mushroom / Chicken Medley", price: "₹249", isVeg: true },
      { name: "House Special Chicken Supreme", price: "₹249", isVeg: false, badge: "Special" },
      { name: "Chicken Tikka Masala / BBQ Pizza", price: "₹259", isVeg: false },
      { name: "Everbloom Special Pizza", price: "Veg: ₹299 | Non-Veg: ₹329", isVeg: true, badge: "Chef Choice" },
    ],
  },
  // Page 7: Starters, Soups & Maggi
  {
    type: "menu",
    pageNumber: 7,
    category: "STARTERS, SOUPS & MAGGI",
    subtitle: "Indo-Chinese wok dishes, warm soups & Maggi remixes",
    items: [
      { name: "Chilli Honey Potatoes", price: "₹159", isVeg: true, badge: "Sweet & Spicy" },
      { name: "Classic Chilli Paneer / Manchurian", price: "₹209", isVeg: true },
      { name: "Butter Garlic Chicken / Honey Glazed", price: "₹189", isVeg: false, badge: "Special" },
      { name: "Wok-Tossed Chilli Chicken (7pc)", price: "₹219", isVeg: false, badge: "Popular" },
      { name: "Fiery Dragon Chicken / Tangra Chicken", price: "₹219", isVeg: false },
      { name: "Chili Prawn With Trio Pepper", price: "₹250", isVeg: false, badge: "Seafood" },
      { name: "Sweet Corn / Manchow Soup", price: "₹119 / ₹129", isVeg: true },
      { name: "Creamy Chicken / Mushroom Soup", price: "₹139", isVeg: true },
      { name: "Cheese & Corn / Chicken Cheese Maggi", price: "₹99 / ₹129", isVeg: true },
    ],
  },
  // Page 8: Rice & Noodle Bowls
  {
    type: "menu",
    pageNumber: 8,
    category: "RICE & NOODLE BOWLS",
    subtitle: "Aromatic wok-tossed rice & oriental noodles",
    items: [
      { name: "Vegetable Fried Rice", price: "₹139", isVeg: true },
      { name: "Mixed Veg Fried Rice (Veg / Non-Veg)", price: "₹149 / ₹179", isVeg: true },
      { name: "Schezwan Fried Rice", price: "₹159", isVeg: true, badge: "Spicy" },
      { name: "South Indian Fried Rice", price: "Veg: ₹139 | Non-Veg: ₹159", isVeg: true },
      { name: "Egg & Chicken Fried Rice", price: "₹179", isVeg: false, badge: "Special" },
      { name: "Veg Noodles / Mixed Veg Noodles", price: "₹149", isVeg: true },
      { name: "Schezwan / Singapore Noodles", price: "₹149 / ₹179", isVeg: true },
      { name: "Thecha Noodles (Veg / Non-Veg)", price: "₹159 / ₹189", isVeg: true, badge: "Spicy Thecha" },
      { name: "Egg & Chicken Noodles", price: "₹189", isVeg: false, badge: "Best Seller" },
    ],
  },
  // Page 9: Coffee & Chai
  {
    type: "menu",
    pageNumber: 9,
    category: "HOT/COLD COFFEE & CHAI",
    subtitle: "Single-origin espresso brews, thick cold frappes & chai",
    items: [
      { name: "Bold Black Coffee / Classic Hot Coffee", price: "₹45 / ₹59", isVeg: true },
      { name: "Caramel Drizzle / Hazelnut Coffee", price: "₹79", isVeg: true, badge: "Popular" },
      { name: "Rich Hot Chocolate", price: "₹89", isVeg: true, badge: "Cozy" },
      { name: "Classic Cold Coffee", price: "₹119", isVeg: true, badge: "All-Time Fav" },
      { name: "Mocha Frappe / Vanilla Punch", price: "₹139", isVeg: true },
      { name: "Premium Hazelnut Cold Coffee", price: "₹139", isVeg: true, badge: "Top Pick" },
      { name: "Choco Walnut Frappe", price: "₹159", isVeg: true, badge: "Special" },
      { name: "Kadak Chai / Elaichi Kadak Chai", price: "₹45 / ₹49", isVeg: true },
      { name: "Herbal Green / Honey Lemon / Hibiscus Tea", price: "₹35 / ₹45", isVeg: true },
      { name: "Lemon / Peach / Mint Lemon Iced Tea", price: "₹79 / ₹89", isVeg: true },
    ],
  },
  // Page 10: Shakes, Mocktails & Slush
  {
    type: "menu",
    pageNumber: 10,
    category: "SHAKES, MOCKTAILS & SLUSH",
    subtitle: "Thick shakes, vibrant mocktails & icy crushed slushies",
    items: [
      { name: "Oreo Cookie / KitKat Swirl Milkshake", price: "₹119", isVeg: true, badge: "Bestseller" },
      { name: "Rich Chocolate / Blackcurrant Shake", price: "₹119", isVeg: true },
      { name: "Pulpy Jamun Crush Shake", price: "₹119", isVeg: true, badge: "Unique" },
      { name: "Strawberry Cream / Butterscotch Shake", price: "₹129", isVeg: true },
      { name: "Everbloom Special Milkshake", price: "₹149", isVeg: true, badge: "Signature" },
      { name: "Fresh Lime / Masala Soda", price: "₹69 / ₹79", isVeg: true },
      { name: "Virgin Mojito / Blue Lagoon", price: "₹99", isVeg: true, badge: "Cooler" },
      { name: "Guava Marry Me / Green Apple", price: "₹99", isVeg: true },
      { name: "Rainbow Mocktail (3-Layer)", price: "₹129", isVeg: true, badge: "Special" },
      { name: "Orange / Mango / Blue Heaven Slush", price: "₹89 / ₹99", isVeg: true },
    ],
  },
  // Page 11: Desserts, Brownies & Add-Ons
  {
    type: "menu",
    pageNumber: 11,
    category: "DESSERTS & ADD-ONS",
    subtitle: "Decadent cakes, warm brownies & meal extras",
    items: [
      { name: "Creamy Ice Cream Scoop (Vanilla / Choco)", price: "₹79 / ₹89", isVeg: true },
      { name: "Choco Lava Cake", price: "₹89", isVeg: true, badge: "Gooey" },
      { name: "Choco Walnut Brownie", price: "₹89", isVeg: true },
      { name: "KitKat Blast / Oreo Blast", price: "₹149", isVeg: true, badge: "Loaded" },
      { name: "Walnut Delight / Dark Magic", price: "₹149 / ₹159", isVeg: true },
      { name: "Sizzling Brownie with Ice Cream", price: "₹189", isVeg: true, badge: "Showstopper" },
      { name: "Extra Melted Cheese Add-On", price: "₹30", isVeg: true },
      { name: "Chocolate Sauce Extra", price: "₹25", isVeg: true },
      { name: "Extra Dip / Mayo", price: "₹10 / ₹20", isVeg: true },
      { name: "Packaged Mineral Water", price: "₹10 / ₹20", isVeg: true },
    ],
  },
  // Page 12: Back Cover (Inner)
  {
    type: "backCover",
    title: "THANK YOU · VISIT AGAIN",
    subtitle: "Where good food and good mood bloom together.",
    timings: "Open Daily: 1:00 PM – 11:00 PM",
    address: "K-8/796, Near SUM Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar 751029",
    phones: ["+91 70770 30566", "+91 97787 95952", "+91 94371 64578"],
    social: "Follow us on Instagram & Zomato",
    note: "100% Freshly Prepared · Pocket Friendly · Dine-In & Takeaway",
  },
  // Page 13: Back Cover (Outer)
  {
    type: "backCoverOuter",
    badge: "EVERBLOOM SANCTUARY",
    title: "Everbloom Café",
    location: "Kalinga Nagar, Bhubaneswar",
  },
];

export default function MenuBook3D() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const isMobile = windowWidth < 768;

  // Desktop 2-page spread state (spreads / leaves)
  const totalPages = allMenuPages.length; // 14 pages (0 to 13)
  const totalLeaves = Math.floor(totalPages / 2); // 7 leaves (0 to 6)
  const [flippedLeaves, setFlippedLeaves] = useState([]);
  
  // Mobile single-page state (pages: 0 to 13)
  const [mobilePage, setMobilePage] = useState(0);
  const [mobileDirection, setMobileDirection] = useState("next");

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const playFlipSound = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      }
    } catch (e) {
      // Audio context catch
    }
  };

  // Turn Forward
  const flipNext = () => {
    if (isMobile) {
      if (mobilePage < totalPages - 1) {
        playFlipSound();
        setMobileDirection("next");
        setMobilePage((prev) => prev + 1);
      }
    } else {
      const nextLeaf = flippedLeaves.length;
      if (nextLeaf < totalLeaves) {
        playFlipSound();
        setFlippedLeaves((prev) => [...prev, nextLeaf]);
      }
    }
  };

  // Turn Backward
  const flipPrev = () => {
    if (isMobile) {
      if (mobilePage > 0) {
        playFlipSound();
        setMobileDirection("prev");
        setMobilePage((prev) => prev - 1);
      }
    } else {
      if (flippedLeaves.length > 0) {
        playFlipSound();
        setFlippedLeaves((prev) => prev.slice(0, prev.length - 1));
      }
    }
  };

  // Jump to specific tab / section
  const jumpToSection = (targetIndex) => {
    playFlipSound();
    if (isMobile) {
      // Map tabs to mobile page indices
      const pageMap = [0, 2, 4, 6, 8, 10, 12];
      const targetPage = pageMap[targetIndex] !== undefined ? pageMap[targetIndex] : 0;
      setMobileDirection(targetPage > mobilePage ? "next" : "prev");
      setMobilePage(targetPage);
    } else {
      const newFlipped = [];
      for (let i = 0; i < targetIndex; i++) {
        newFlipped.push(i);
      }
      setFlippedLeaves(newFlipped);
    }
  };

  const resetBook = () => {
    playFlipSound();
    if (isMobile) {
      setMobileDirection("prev");
      setMobilePage(0);
    } else {
      setFlippedLeaves([]);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      bookRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Mobile Swipe Handler
  const handleMobileDragEnd = (_, info) => {
    const threshold = 35;
    const velocityThreshold = 150;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      flipNext(); // Swipe Left -> Next Page
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      flipPrev(); // Swipe Right -> Prev Page
    }
  };

  // Render individual page contents
  const renderPage = (data) => {
    if (!data) return null;

    // Cover Page
    if (data.type === "cover") {
      return (
        <div className="h-full w-full bg-[#180e08] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none shadow-2xl border-r-2 border-[#120a06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2c160c_0%,#120804_100%)] opacity-95" />

          {/* Gold Filigree Corners */}
          <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-[#c88242]/70" />
          <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-[#c88242]/70" />
          <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-[#c88242]/70" />
          <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-[#c88242]/70" />

          <div className="relative z-10 text-center pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c88242]/20 border border-[#c88242]/40 text-[#fcd9b8] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              <Sparkles className="w-3 h-3 text-[#e29b5a]" />
              {data.badge}
            </span>
          </div>

          <div className="relative z-10 text-center my-auto space-y-2 px-2">
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white">
              {data.title}
            </h1>
            <p className="font-serif italic text-xs sm:text-sm text-[#e29b5a] tracking-wider">
              {data.subtitle}
            </p>
            <div className="w-16 h-0.5 bg-[#c88242]/60 mx-auto my-3" />
            <p className="text-[11px] sm:text-xs text-[#d1bfb3] font-light max-w-xs mx-auto leading-relaxed">
              "{data.tagline}"
            </p>
          </div>

          <div className="relative z-10 text-center pt-2 border-t border-[#3b2216]">
            <p className="text-[9px] sm:text-[10px] text-[#a89387] font-medium tracking-wider uppercase mb-2">
              {data.location}
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c88242] text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
              <Hand className="w-3.5 h-3.5" />
              <span>Swipe Left to Open</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      );
    }

    // Back Cover (Inner Details)
    if (data.type === "backCover") {
      return (
        <div className="h-full w-full bg-[#180e08] text-white p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden select-none shadow-inner border-l-2 border-[#120a06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#26140c_0%,#120804_100%)] opacity-95" />

          <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-[#c88242]/40" />
          <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-[#c88242]/40" />
          <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-[#c88242]/40" />
          <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-[#c88242]/40" />

          <div className="relative z-10 text-center pt-1">
            <span className="text-[9px] tracking-[0.2em] text-[#c88242] uppercase font-bold">
              UNTIL NEXT TIME
            </span>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-white mt-0.5">
              {data.title}
            </h2>
          </div>

          <div className="relative z-10 text-center my-auto space-y-2 px-2">
            <p className="text-[11px] sm:text-xs text-[#baa79b] italic font-serif leading-relaxed">
              "{data.subtitle}"
            </p>

            <div className="py-2.5 border-y border-[#3a2217] space-y-1.5 text-xs text-[#ebd8ca]">
              <p className="font-semibold text-[#e29b5a] text-xs flex items-center justify-center gap-1">
                <span>{data.timings}</span>
              </p>
              <p className="text-[#a89588] text-[10px] sm:text-[11px] max-w-xs mx-auto leading-relaxed">
                <MapPin className="w-3 h-3 inline text-[#c88242] mr-1" />
                {data.address}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {data.phones?.map((p, idx) => (
                  <a
                    key={idx}
                    href={`tel:${p.replace(/\s+/g, "")}`}
                    className="font-mono text-[10px] sm:text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md"
                  >
                    {p}
                  </a>
                ))}
              </div>
              <p className="text-[#c88242] font-semibold text-[11px] pt-1">{data.social}</p>
            </div>

            <p className="text-[9px] text-[#7e695d]">{data.note}</p>
          </div>

          <div className="relative z-10 text-center pt-1">
            <button
              onClick={resetBook}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2b1810] text-[#e29b5a] hover:bg-[#3d2317] border border-[#c88242]/30 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Cover</span>
            </button>
          </div>
        </div>
      );
    }

    // Outer Back Cover
    if (data.type === "backCoverOuter") {
      return (
        <div className="h-full w-full bg-[#140a05] text-white p-6 sm:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden select-none border-l-2 border-[#0e0704]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#221008_0%,#0e0704_100%)] opacity-95" />
          <div className="relative z-10 space-y-2">
            <Coffee className="w-10 h-10 text-[#c88242] mx-auto opacity-70 mb-2" />
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wider">{data.title}</h2>
            <p className="text-xs text-[#a89588] tracking-widest uppercase">{data.badge}</p>
            <p className="text-[10px] text-[#7e695d] pt-4">{data.location}</p>
          </div>
        </div>
      );
    }

    // Editorial Philosophy Page
    if (data.type === "editorial") {
      return (
        <div className="h-full w-full bg-[#faf5ee] text-[#1c1109] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden select-none border-r border-[#e8ded3]">
          <div className="absolute inset-0 bg-[radial-gradient(#e8d8c8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          <div className="relative z-10 border-b border-[#e5d8c8] pb-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#c88242]">
                {data.eyebrow}
              </span>
              <span className="font-serif text-[10px] font-bold text-[#8c7a70]">
                PAGE {data.pageNumber}
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1c1109] mt-0.5">
              {data.title}
            </h2>
          </div>

          <div className="relative z-10 my-2 rounded-2xl overflow-hidden shadow-sm h-28 sm:h-36 bg-[#20120b] border border-[#e8ded3]">
            <img
              src={data.image}
              alt="Culinary Craft"
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-2 left-3 right-3 text-white text-[9px] sm:text-[11px] font-serif italic line-clamp-1">
              "{data.quote}"
            </p>
          </div>

          <div className="relative z-10 space-y-2">
            <p className="text-[11px] sm:text-xs text-[#615147] font-light leading-relaxed">
              {data.text}
            </p>

            <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-[#ebd8c8]">
              {data.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-[#2d1c13]">
                  <CheckCircle2 className="w-3 h-3 text-[#c88242] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Category Menu Page
    if (data.type === "menu") {
      return (
        <div className="h-full w-full bg-[#fdfaf5] text-[#1c1109] p-4 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border-l border-[#e8ded3]">
          <div className="absolute inset-0 bg-[radial-gradient(#e8d8c8_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />

          <div className="relative z-10 border-b border-[#e8ded3] pb-1.5">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-[#c88242]">
                {data.category}
              </span>
              <span className="font-serif text-[10px] font-bold text-[#8c7a70]">
                PAGE {data.pageNumber}
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-[#7a685e] italic font-serif truncate">
              {data.subtitle}
            </p>
          </div>

          <div className="relative z-10 my-auto space-y-1.5 sm:space-y-2 py-1 overflow-hidden">
            {data.items.map((item, idx) => (
              <div key={idx} className="group border-b border-[#f4ebe1] pb-1 last:border-b-0">
                <div className="flex items-baseline justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        item.isEgg
                          ? "bg-amber-500"
                          : item.isVeg
                          ? "bg-emerald-600"
                          : "bg-rose-600",
                      )}
                      title={item.isEgg ? "Contains Egg" : item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    />
                    <h3 className="font-serif text-[11px] sm:text-xs md:text-sm font-bold text-[#1c1109] group-hover:text-[#c88242] transition-colors truncate">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {item.badge && (
                      <span className="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#f4e4d2] text-[#8e5223] hidden sm:inline-block">
                        {item.badge}
                      </span>
                    )}
                    <span className="font-serif text-[11px] sm:text-xs md:text-sm font-bold text-[#c88242]">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-1 border-t border-[#f0e3d5] flex items-center justify-between text-[9px] text-[#917d72]">
            <span>Freshly Made to Order</span>
            <span className="font-serif italic text-[#c88242]">Everbloom Café</span>
          </div>
        </div>
      );
    }

    return null;
  };

  const navTabs = [
    { label: "Cover", index: 0 },
    { label: "Starters & Wraps", index: 1 },
    { label: "Pastas & Burgers", index: 2 },
    { label: "Pizzas & Wok", index: 3 },
    { label: "Rice & Noodles", index: 4 },
    { label: "Coffee & Drinks", index: 5 },
    { label: "Desserts & Info", index: 6 },
  ];

  return (
    <div
      ref={bookRef}
      className={cn(
        "w-full flex flex-col items-center justify-center select-none relative transition-all duration-500",
        isFullscreen ? "fixed inset-0 z-50 bg-[#0c0704] p-4 overflow-y-auto" : "py-4 sm:py-8",
      )}
    >
      {/* Top Controls Toolbar */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-2.5 mb-5 px-2">
        {/* Category Jump Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
          {navTabs.map((tab) => {
            const isActive = isMobile
              ? (tab.index === 0 && mobilePage === 0) ||
                (tab.index === 1 && (mobilePage === 2 || mobilePage === 3)) ||
                (tab.index === 2 && (mobilePage === 4 || mobilePage === 5)) ||
                (tab.index === 3 && (mobilePage === 6 || mobilePage === 7)) ||
                (tab.index === 4 && (mobilePage === 8 || mobilePage === 9)) ||
                (tab.index === 5 && (mobilePage === 10 || mobilePage === 11)) ||
                (tab.index === 6 && (mobilePage === 12 || mobilePage === 13))
              : flippedLeaves.length === tab.index;

            return (
              <button
                key={tab.index}
                onClick={() => jumpToSection(tab.index)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all uppercase whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-[#c88242] text-white shadow-md scale-105"
                    : "bg-white/85 text-[#6b5c54] hover:bg-white hover:text-[#1c1109] border border-[#e8ded3]",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2 rounded-xl bg-white/90 border border-[#e8ded3] text-[#6b5c54] hover:text-[#1c1109] shadow-xs cursor-pointer"
            title={isSoundEnabled ? "Mute Flip Sound" : "Enable Flip Sound"}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-[#c88242]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/90 border border-[#e8ded3] text-[#6b5c54] hover:text-[#1c1109] shadow-xs cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Menu Book"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 
        BOOK CONTAINER (Responsive for Mobile Single-Page & Desktop Dual-Spread)
      */}
      <div className="relative w-full max-w-4xl flex items-center justify-center px-1 sm:px-4 py-2 [perspective:2400px]">
        {/* Navigation Arrow Left */}
        <button
          onClick={flipPrev}
          disabled={isMobile ? mobilePage === 0 : flippedLeaves.length === 0}
          className={cn(
            "absolute left-0 sm:left-1 z-50 p-2 sm:p-3 rounded-full bg-white/95 text-[#1c1109] border border-[#e8ded3] shadow-xl hover:bg-[#c88242] hover:text-white transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none hover:scale-110",
          )}
          title="Turn Back (Swipe Right)"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* 
          MOBILE VIEW: Full Width 100% Single-Page Book with 3D Swipe Flip 
        */}
        {isMobile ? (
          <div className="w-full max-w-[340px] sm:max-w-[400px] h-[520px] sm:h-[560px] rounded-2xl relative shadow-2xl overflow-hidden border-2 border-[#3b2014] bg-[#1c0f0a]">
            {/* Leather Spine Crease on Left Edge */}
            <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/80 via-[#2d180f] to-transparent z-40 pointer-events-none" />

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleMobileDragEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`mobile-page-${mobilePage}`}
                  initial={{
                    opacity: 0,
                    rotateY: mobileDirection === "next" ? 35 : -35,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: mobileDirection === "next" ? -35 : 35,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full [transform-origin:left_center]"
                >
                  {renderPage(allMenuPages[mobilePage])}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* 
            DESKTOP VIEW: Open 2-Page Spread Book with Dual-Sided Leaves Stack
          */
          <div
            className={cn(
              "relative w-full max-w-4xl h-[540px] md:h-[580px] rounded-3xl transition-all duration-700 flex justify-center [transform-style:preserve-3d]",
            )}
          >
            {/* Book Base Underlay */}
            <div
              className="absolute inset-0 rounded-3xl bg-[#1c0f0a] border border-[#3b2014] shadow-2xl flex overflow-hidden pointer-events-none"
              style={{
                boxShadow: "0 25px 50px -12px rgba(20, 10, 5, 0.6), 0 0 0 1px rgba(200, 130, 66, 0.2)",
              }}
            >
              {/* Central Spine Shadow */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/50 via-black/10 to-black/50 z-30" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#4a2b1b] z-30" />
            </div>

            {/* Desktop 3D Leaves Stack */}
            <div className="relative w-full h-full [transform-style:preserve-3d]">
              {Array.from({ length: totalLeaves }).map((_, leafIndex) => {
                const isFlipped = flippedLeaves.includes(leafIndex);
                const zIndex = isFlipped ? 10 + leafIndex : 40 - leafIndex;

                const frontPageData = allMenuPages[leafIndex * 2];
                const backPageData = allMenuPages[leafIndex * 2 + 1];

                return (
                  <DesktopLeaf
                    key={leafIndex}
                    index={leafIndex}
                    isFlipped={isFlipped}
                    zIndex={zIndex}
                    frontData={frontPageData}
                    backData={backPageData}
                    onFlipNext={flipNext}
                    onFlipPrev={flipPrev}
                    renderPage={renderPage}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Arrow Right */}
        <button
          onClick={flipNext}
          disabled={isMobile ? mobilePage === totalPages - 1 : flippedLeaves.length === totalLeaves}
          className={cn(
            "absolute right-0 sm:right-1 z-50 p-2 sm:p-3 rounded-full bg-white/95 text-[#1c1109] border border-[#e8ded3] shadow-xl hover:bg-[#c88242] hover:text-white transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none hover:scale-110",
          )}
          title="Turn Forward (Swipe Left)"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Gesture & Audio Indicator */}
      <div className="flex flex-col items-center gap-2.5 mt-4 sm:mt-6">
        {/* Step Indicator dots */}
        <div className="flex items-center gap-1.5">
          {isMobile
            ? Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playFlipSound();
                    setMobileDirection(idx > mobilePage ? "next" : "prev");
                    setMobilePage(idx);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    mobilePage === idx ? "w-6 bg-[#c88242]" : "w-1.5 bg-[#d6c4b2]",
                  )}
                  title={`Page ${idx + 1}`}
                />
              ))
            : Array.from({ length: totalLeaves + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToSection(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    flippedLeaves.length === idx ? "w-8 bg-[#c88242]" : "w-2 bg-[#d6c4b2] hover:bg-[#b09d8c]",
                  )}
                  title={`Spread ${idx + 1}`}
                />
              ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#8c7a70] font-medium bg-[#f0e4d4]/70 px-3.5 py-1.5 rounded-full border border-[#deb88b]/30">
          <Hand className="w-3.5 h-3.5 text-[#c88242] animate-bounce shrink-0" />
          <span>Swipe left / right with your finger to turn pages naturally</span>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for Desktop 2-Page Spread Leaf
function DesktopLeaf({
  index,
  isFlipped,
  zIndex,
  frontData,
  backData,
  onFlipNext,
  onFlipPrev,
  renderPage,
}) {
  const handleDragEnd = (_, info) => {
    const threshold = 40;
    const velocityThreshold = 200;
    if (!isFlipped) {
      if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
        onFlipNext();
      }
    } else {
      if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
        onFlipPrev();
      }
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1],
      }}
      style={{
        zIndex,
        transformOrigin: "left center",
      }}
      className={cn(
        "absolute top-0 right-0 w-1/2 h-full [transform-style:preserve-3d] cursor-grab active:cursor-grabbing",
      )}
    >
      {/* FRONT FACE */}
      <div
        className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-r-2xl overflow-hidden shadow-lg"
        style={{
          boxShadow: isFlipped
            ? "none"
            : "5px 0 15px rgba(0,0,0,0.15), inset -2px 0 5px rgba(0,0,0,0.05)",
        }}
        onClick={() => !isFlipped && onFlipNext()}
      >
        {renderPage(frontData)}
      </div>

      {/* BACK FACE */}
      <div
        className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-l-2xl overflow-hidden shadow-lg [transform:rotateY(180deg)]"
        style={{
          boxShadow: isFlipped
            ? "-5px 0 15px rgba(0,0,0,0.15), inset 2px 0 5px rgba(0,0,0,0.05)"
            : "none",
        }}
        onClick={() => isFlipped && onFlipPrev()}
      >
        {renderPage(backData)}
      </div>
    </motion.div>
  );
}
