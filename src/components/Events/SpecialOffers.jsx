import { Link } from "react-router";
import { Percent, MapPin, ArrowRight } from "lucide-react";

const offers = [
  { title: "Student Treat", discount: "10% Off", desc: "Show your college or university student ID for 10% off on all beverages", icon: <Percent className="w-5 h-5" /> },
  { title: "Combo Special", discount: "Save ₹60", desc: "Order any wrap or pizza with a signature cooler and save instantly", icon: <Percent className="w-5 h-5" /> },
  { title: "Birthday Gathering", discount: "Free Dessert", desc: "Complimentary cheesecake slice for group celebrations of 6+", icon: <Percent className="w-5 h-5" /> },
  { title: "Weekend Cooler Deal", discount: "Buy 2 Get 10%", desc: "Enjoy 10% off when ordering 2 or more signature iced coolers", icon: <Percent className="w-5 h-5" /> },
];

export default function SpecialOffers() {
  return (
    <>
      <section className="section-padding py-20 lg:py-28 bg-[#f5ede4]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-tag bg-[#c88242]/20 text-[#c88242] mb-3">
              Special Deals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#2b1810] font-extrabold">Current Offers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-[#e8ded3]">
                <div className="w-12 h-12 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] mx-auto mb-4 group-hover:bg-[#2b1810] group-hover:text-white transition-all">
                  {offer.icon}
                </div>
                <p className="font-display text-2xl font-black text-[#c88242] mb-1">{offer.discount}</p>
                <h3 className="font-display text-base font-bold text-[#2b1810] mb-1.5">{offer.title}</h3>
                <p className="text-xs text-[#6b5c54] leading-relaxed">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-[#2b1810] font-extrabold mb-4">Join Us This Week</h2>
          <p className="text-sm sm:text-base text-[#6b5c54] mb-8 leading-relaxed max-w-2xl mx-auto">
            Drop in anytime from 1:00 PM till 10:15 PM daily at Kalinga Nagar, Bhubaneswar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-caramel px-6 py-3 text-xs font-bold gap-2">
              Reserve a Table <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline-espresso px-6 py-3 text-xs font-bold gap-2">
              <MapPin className="w-4 h-4" /> Find Us on Maps
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
