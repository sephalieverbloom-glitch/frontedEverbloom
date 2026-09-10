import React from 'react';
import { FinancialHero } from '@/components/ui/hero-section';

// Demo component to showcase the FinancialHero
const FinancialHeroDemo = () => {
  return (
    <div className="w-full bg-background">
      <FinancialHero
        title={
          <>
            Ready to Transform Your <br />
            <span className="text-primary">Experience?</span>
          </>
        }
        description="Discover artisanal specialty coffee, botanical aesthetics, and heartwarming handcrafted dishes in Bhubaneswar."
        buttonText="Explore Menu"
        buttonLink="/menu"
        imageUrl1="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop"
        imageUrl2="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
      />
    </div>
  );
};

export default FinancialHeroDemo;
