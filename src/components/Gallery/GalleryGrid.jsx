import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { photosApi } from "../../lib/api";

const galleryCategories = [
  { key: "all", label: "All Photos" },
  { key: "interior", label: "Interior & Wall Art" },
  { key: "outdoor", label: "Outdoor Patio" },
  { key: "food", label: "Food & Brews" },
];

const defaultGalleryImages = [
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146209/myheroimg.png",
    alt: "Iconic Blooming Roses Floral Wall Mural",
    category: "interior",
    desc: "Our signature hand-painted floral centerpiece with plush sage seating.",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149129/ed448c81-64a8-4b27-ad99-13e7dfafa61a.jpg",
    alt: "Warm Ambient AC Indoor Lounge",
    category: "interior",
    desc: "Cozy air-conditioned lounge with warm downlighting and acoustic music.",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146626/img2.png",
    alt: "Nature-Inspired Outdoor Garden Patio",
    category: "outdoor",
    desc: "Lush tropical plants and fairy string lights for evening chill.",
    span: "col-span-1 md:col-span-2",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149127/5711f2ca-09f2-49f2-9961-2b6b5d71e8b4.jpg",
    alt: "Signature Everbloom Berry & Citrus Coolers",
    category: "food",
    desc: "Refreshing handcrafted mocktails with fresh berries and mint.",
    span: "col-span-1 md:col-span-2",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149128/d3bb1a94-7486-4d37-8365-625e7484a6b2.jpg",
    alt: "Handcrafted Artisanal Pasta",
    category: "food",
    desc: "Al dente artisanal pastas tossed in rich savory sauces.",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146653/img3.png",
    alt: "Wood-Fired Margherita Pizza & Cheesecake",
    category: "food",
    desc: "Crispy thin crust and decadent sweet desserts.",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146605/myimg.png",
    alt: "Everbloom Aesthetic Floral Seating",
    category: "interior",
    desc: "Lush botanical floral seating and tranquil cafe vibe.",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149259/signature-coolers.jpg",
    alt: "Sparkling Refreshment Coolers",
    category: "food",
    desc: "Vibrant coolers crafted with citrus notes and effervescent fizz.",
    span: "",
  },
  {
    src: "/tacos.jpg",
    alt: "Loaded Wraps & Crispy Bites",
    category: "food",
    desc: "Spiced peri-peri chicken and paneer wraps with house dips.",
    span: "",
  },
  {
    src: "/iced-latte.jpg",
    alt: "Hazelnut Iced Frappe",
    category: "food",
    desc: "Rich espresso blended with hazelnut and creamy froth.",
    span: "",
  },
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [images, setImages] = useState(defaultGalleryImages);

  useEffect(() => {
    // Clear legacy localStorage cache if it contains broken local paths
    try {
      const stored = localStorage.getItem("everbloom_custom_photos");
      if (stored && (stored.includes("/everbloom/interior-") || stored.includes("/everbloom/outdoor-"))) {
        localStorage.removeItem("everbloom_custom_photos");
      }
    } catch {
      // ignore
    }

    const fetchPhotos = async () => {
      try {
        const res = await photosApi.getAll();
        if (res && res.success && res.data && res.data.length > 0) {
          const validApiPhotos = res.data
            .filter(
              (p) =>
                p &&
                (p.src || p.imageUrl) &&
                !p.src?.includes("/everbloom/interior-") &&
                !p.src?.includes("/everbloom/outdoor-")
            )
            .map((p) => ({
              ...p,
              src: p.src || p.imageUrl,
              alt: p.alt || p.title,
              category: p.category || "interior",
              desc: p.desc || p.description,
              span: p.span || "",
            }));

          // Merge: Put backend uploaded photos first, followed by default photos without duplicating URLs
          const existingSrcs = new Set(validApiPhotos.map((p) => p.src));
          const nonDuplicateDefaults = defaultGalleryImages.filter((d) => !existingSrcs.has(d.src));
          setImages([...validApiPhotos, ...nonDuplicateDefaults]);
        }
      } catch (err) {
        console.warn("Could not load dynamic photos, using defaults:", err);
      }
    };

    fetchPhotos();
  }, []);

  const displayedImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <section className="section-padding py-16 lg:py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${activeFilter === cat.key
                ? "bg-[#2b1810] text-white shadow-md"
                : "bg-white text-[#4a3b32] hover:bg-[#f5eee8] border border-[#e8ded3]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {displayedImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxImg(img)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md bg-[#180e09] border border-[#e8ded3] ${img.span || ""
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146209/myheroimg.png";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1">
                    {img.alt}
                  </h3>
                  {img.desc && (
                    <p className="text-xs text-white/75 line-clamp-2">{img.desc}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full bg-[#180e09] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-[#24150e] text-white">
              <h3 className="font-display text-xl font-bold mb-1">{lightboxImg.alt}</h3>
              {lightboxImg.desc && <p className="text-xs sm:text-sm text-white/70">{lightboxImg.desc}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
