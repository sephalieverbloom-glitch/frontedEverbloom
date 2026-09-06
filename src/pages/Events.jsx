import { EventsHero, LiveEvents, SpecialOffers } from "../components/Events";
import SEOHead from "../components/SEOHead";

export default function Events() {
  return (
    <div className="pt-24 min-h-screen bg-[#faf7f2]">
      <SEOHead
        title="Live Acoustic Nights & Events"
        description="Join live acoustic music sessions, open mic gatherings, and weekend offers at Everbloom Café in Bhubaneswar near SUM Ultimate Medicare."
        keywords="live music cafe bhubaneswar, acoustic nights bhubaneswar, cafe events bhubaneswar"
      />
      <EventsHero />
      <LiveEvents />
      <SpecialOffers />
    </div>
  );
}
