import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define the props for the component
export interface FinancialHeroProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl1: string;
  imageUrl2: string;
  className?: string;
}

// Reusable animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const cardsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

/**
 * A responsive hero section component with animated text and card images.
 */
export const FinancialHero = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl1,
  imageUrl2,
  className,
}: FinancialHeroProps) => {
  // Inline style for the grid background to easily use CSS variables
  const gridBackgroundStyle = {
    backgroundImage:
      'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)',
    backgroundSize: '3rem 3rem',
  };

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background text-foreground',
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />

      <motion.div
        className="relative container mx-auto flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] items-center justify-between px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:flex-row flex-col gap-12 sm:gap-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2 z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right: Card Images */}
        <motion.div
          className="relative lg:w-1/2 h-72 sm:h-96 md:h-[420px] lg:h-[480px] w-full flex items-center justify-center max-w-lg mx-auto"
          variants={cardsVariants}
        >
          {/* Back Card */}
          <motion.img
            src={imageUrl2}
            alt="Hero Card Back"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
            className="absolute h-44 sm:h-64 md:h-72 lg:h-80 w-auto max-w-[70%] sm:max-w-none rounded-2xl shadow-2xl object-cover transform rotate-[-6deg] translate-x-8 sm:translate-x-16 md:translate-x-24 border-2 border-white/40"
          />
          {/* Front Card */}
          <motion.img
            src={imageUrl1}
            alt="Hero Card Front"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: 5, transition: { duration: 0.3 } }}
            className="absolute h-44 sm:h-64 md:h-72 lg:h-80 w-auto max-w-[70%] sm:max-w-none rounded-2xl shadow-2xl object-cover transform rotate-[6deg] -translate-x-8 sm:-translate-x-12 md:-translate-x-16 border-2 border-white/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
export default FinancialHero;
