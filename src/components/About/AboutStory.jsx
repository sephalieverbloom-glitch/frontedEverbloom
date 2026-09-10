import React from "react";
import { FinancialHero } from "@/components/ui/hero-section";

export default function AboutStory() {
  return (
    <div className="w-full relative">
      <FinancialHero
        title={
          <>
            Where City Life Slows Down &{" "}
            <span className="text-[#c88242] italic font-serif">
              Good Mood Blooms
            </span>
          </>
        }
        description="Founded by Sephali Swain on June 27, 2025 near SUM Ultimate Medicare in Bhubaneswar. A botanical sanctuary crafted with 100% single-origin Arabica roasts, peaceful ambient greenery, and honest scratch-made gourmet recipes."
        buttonText="Explore Our Menu"
        buttonLink="/menu"
        imageUrl1="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
        imageUrl2="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
        className="bg-transparent"
      />
    </div>
  );
}
