import React from "react";
import {
  AboutHero,
  AboutStory,
  AboutJourneyTimeline,
  AboutCraftTeam,
  AboutSustainability,
  AboutGlimpses,
} from "../components/About";
import PageScrollProgress from "../components/ui/PageScrollProgress";
import SEOHead from "../components/SEOHead";

export default function About() {
  return (
    <div className="overflow-x-clip bg-[#faf7f2] relative">
      <SEOHead
        title="Our Story & Origins"
        description="Learn the story of Everbloom Café, founded by Sephali Swain in Bhubaneswar near SUM Ultimate Medicare. Single-origin artisanal coffees, botanical ambience & love for authentic food."
        keywords="about everbloom cafe, best aesthetic cafe in bhubaneswar, sephali swain everbloom, cafes in bhubaneswar odisha"
      />
      {/* Scroll Reading Progress */}
      <PageScrollProgress />

      {/* Hero Welcome Banner */}
      <AboutHero />

      {/* The Origin Story with Floral Mural */}
      <AboutStory />

      {/* Journey & Milestones Timeline */}
      <AboutJourneyTimeline />

      {/* Behind the Cup: Artisans & Culinary Team */}
      <AboutCraftTeam />

      {/* Sustainable Farm-to-Cup & Eco Pledge */}
      <AboutSustainability />

      {/* Atmospheric Photo Glimpses Grid */}
      <AboutGlimpses />
    </div>
  );
}