"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  rating?: number;
  reviewer?: string;
}

const defaultSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    title: "Artisanal Pour Over",
    description: "★ 5.0 · \"Best single-origin roast in town with rich velvety notes.\" — Priya S.",
    badge: "5.0 ★ Top Rated",
    rating: 5,
    reviewer: "Priya S.",
  },
  {
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    title: "Flaky Croissants",
    description: "★ 4.9 · \"Golden, buttery perfection freshly baked every morning.\" — Marcus V.",
    badge: "4.9 ★ Bakery",
    rating: 4.9,
    reviewer: "Marcus V.",
  },
  {
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    title: "Botanical Ambiance",
    description: "★ 5.0 · \"Breathtaking green aesthetic, soothing jazz & serene vibes.\" — Aisha K.",
    badge: "5.0 ★ Ambiance",
    rating: 5,
    reviewer: "Aisha K.",
  },
  {
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    title: "Signature Brunch",
    description: "★ 4.9 · \"Sourdough toasted to crisp bliss with fresh microgreens.\" — Rohan M.",
    badge: "4.9 ★ Culinary",
    rating: 4.9,
    reviewer: "Rohan M.",
  },
  {
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    title: "Velvet Matcha Latte",
    description: "★ 5.0 · \"Ceremonial grade matcha blended with silky oat milk.\" — Elena T.",
    badge: "5.0 ★ Beverages",
    rating: 5,
    reviewer: "Elena T.",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export interface CarouselStackedProps {
  slides?: Slide[];
  className?: string;
}

const CarouselStacked = ({
  slides = defaultSlides,
  className,
}: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-8 md:py-12 bg-transparent overflow-hidden select-none",
        className,
      )}
    >
      <div className="relative w-full max-w-7xl h-80 sm:h-96 md:h-112 lg:h-128 flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
          title="Swipe or drag left/right to browse reviews"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-muted group pointer-events-none shadow-2xl border border-white/20",
        "w-48 h-64 sm:w-60 sm:h-80 md:w-68 md:h-96 lg:w-72 lg:h-104",
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.5, 0.2, 0, 0.2, 0.5],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

      <Badge className="absolute top-3 right-3 sm:top-5 sm:right-5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/90 text-white backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg border-none">
        {slide.badge}
      </Badge>

      <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-5 sm:right-5 text-white text-center sm:text-left">
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-base sm:text-lg lg:text-xl font-serif font-bold leading-tight mb-1 drop-shadow-md text-amber-100"
        >
          {slide.title}
        </motion.p>
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-xs sm:text-xs md:text-sm text-white/90 line-clamp-3 font-normal leading-relaxed drop-shadow"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
