import { Link } from "react-router";
import ScrollReveal from "../ui/ScrollReveal";

export default function ReviewsSection() {
  const moments = [
    { src: "/everbloom/espresso-crema-macro.jpg", alt: "Artisanal Crema Espresso Extraction", span: "" },
    { src: "/everbloom/barista-latte-art.jpg", alt: "Velvety Rosetta Latte Art by Barista", span: "" },
    { src: "https://res.cloudinary.com/p2gsrga3/image/upload/v1789149128/d3bb1a94-7486-4d37-8365-625e7484a6b2.jpg", alt: "Botanical Garden Patio at Twilight", span: "" },
    { src: "/everbloom/signature-coolers.jpg", alt: "Signature Berry Blossom Coolers", span: "" },
  ];

  return (
    <section className="section-padding py-20 lg:py-28 bg-[#f5ede4]/75 text-[#1c1109] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Intro with Scroll Reveal */}
        <ScrollReveal variant="left" className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c88242] uppercase font-bold">
              VISUAL JOURNEY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] mb-6 text-[#1c1109]">
            Moments at Everbloom
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#6b5c54] font-light leading-relaxed mb-8 max-w-md">
            From sunlit afternoon coffee and gourmet bites to vibrant acoustic patio evenings under the stars — every corner tells a story.
          </p>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-bold text-[#1c1109] hover:text-[#c88242] transition-colors"
          >
            <span>VIEW FULL GALLERY</span>
            <span>→</span>
          </Link>
        </ScrollReveal>

        {/* Right 2x2 Photo Grid with Scroll Reveals */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
            {moments.map((img, i) => (
              <ScrollReveal
                key={i}
                variant="scale"
                delay={100 + i * 100}
                className="relative h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden group shadow-md bg-[#2b1810]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] sm:text-xs font-semibold drop-shadow-md truncate">
                    {img.alt}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


//hello how are you