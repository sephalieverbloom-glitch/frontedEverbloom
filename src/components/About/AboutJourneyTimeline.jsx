import React from "react";
import ScrollCard, { defaultMilestones } from "../ui/scroll-card";

// Custom milestones using images you provided (birthday party & cafe ambience)
const customMilestones = [
  {
    year: '2025',
    badge: 'Birthday Bash',
    title: 'Birthday Celebration',
    description: 'A vibrant birthday party with friends, music, and delicious treats at Everbloom Café.',
    highlight: 'Celebrated with a special cake and joyous ambience',
    bgGradient: 'from-[#4a2b1f] via-[#6b4c33] to-[#2c1a0f]',
    borderColor: '#c88242',
    rotation: 'rotate-0',
    image: '/everbloom/birthday-celebration-arch.jpg',
    icon: null,
  },
  {
    year: '2025',
    badge: 'Birthday Outdoor',
    title: 'Outdoor Birthday Setup',
    description: 'An outdoor birthday setup with fairy lights, balloons, and a beautiful garden backdrop.',
    highlight: 'Open-air celebration with nature vibes',
    bgGradient: 'from-[#3b4222] via-[#55673a] to-[#1c260e]',
    borderColor: '#e29b5a',
    rotation: '-rotate-1',
    image: '/everbloom/birthday-outdoor-setup.jpg',
    icon: null,
  },
  {
    year: '2025',
    badge: 'Cafe Ambience',
    title: 'Cozy Cafe Interior',
    description: 'Warm indoor dining area with plush seating, soft lighting, and aromatic coffee aromas.',
    highlight: 'Perfect spot for work and relaxation',
    bgGradient: 'from-[#2c180b] via-[#3e2918] to-[#1a0c05]',
    borderColor: '#c88242',
    rotation: 'rotate-0',
    image: '/everbloom/cafe-indoor-dining.jpg',
    icon: null,
  },
];

export default function AboutJourneyTimeline() {
  return (
    <section id="journey-chronicle" className="relative">
      <ScrollCard
        cards={customMilestones}
        heading="Everbloom Moments"
        subtitle="Celebrate our special events and the cozy ambience that makes every visit memorable."
      />
    </section>
  );
}
