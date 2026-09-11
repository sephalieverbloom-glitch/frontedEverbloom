import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function AboutGlimpses() {
  const glimpses = [
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146209/myheroimg.png", alt: "Floral Rose Wall Mural", span: "md:col-span-2 md:row-span-2" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146626/img2.png", alt: "Warm Ambient AC Lounge", span: "" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149127/5711f2ca-09f2-49f2-9961-2b6b5d71e8b4.jpg", alt: "Artisanal Berry Coolers", span: "" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149129/ed448c81-64a8-4b27-ad99-13e7dfafa61a.jpg", alt: "Nature-Inspired Outdoor Patio", span: "md:col-span-2" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149128/d3bb1a94-7486-4d37-8365-625e7484a6b2.jpg", alt: "Handcrafted Pasta", span: "" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146653/img3.png", alt: "Blueberry Cheesecake", span: "" },
  ];

  return (
    <section className="section-padding py-20 lg:py-28 bg-gradient-to-b from-[#faf7f2] via-[#f7eee3] to-[#f4ebe0] text-[#1c1109] border-t border-[#e8ded3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c88242]/15 border border-[#c88242]/30 text-[#b8623b] text-xs font-bold uppercase tracking-wider mb-3">
            Glimpses
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1109]">
            Inside Everbloom Café
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {glimpses.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-3xl overflow-hidden group shadow-lg ${img.span || ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-xs sm:text-sm font-bold">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/gallery" className="btn-caramel px-8 py-3.5 text-sm font-bold inline-flex items-center gap-2">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
