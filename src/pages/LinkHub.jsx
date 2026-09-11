import { Link } from "react-router";
import {
  Instagram, MapPin, Utensils, Calendar, Phone,
  ExternalLink, Sparkles
} from "lucide-react";

const links = [
  { id: "1", title: "Explore Our Full Menu", description: "Artisanal coffees, peri-peri wraps, pizzas & coolers", url: "/menu", icon: <Utensils className="w-5 h-5" /> },
  { id: "2", title: "Locate on Google Maps", description: "Near Sum Ultimate Medicare, Kalinga Nagar, Bhubaneswar", url: "https://maps.google.com/?q=Everbloom+Kalinga+Nagar+Bhubaneswar", icon: <MapPin className="w-5 h-5" /> },
  { id: "3", title: "Call & Contact Us", description: "Inquire about table availability & party bookings", url: "tel:09437164578", icon: <Phone className="w-5 h-5" /> },
  { id: "4", title: "Photo Gallery", description: "View hand-painted mural, AC lounge & nature patio", url: "/gallery", icon: <Sparkles className="w-5 h-5" /> },
  { id: "5", title: "Table Reservation", description: "Book seating for birthday parties & gatherings", url: "/booking", icon: <Calendar className="w-5 h-5" /> },
  { id: "6", title: "Follow on Instagram", description: "Tag @everbloomcafe in your stories and reels", url: "https://instagram.com", icon: <Instagram className="w-5 h-5" /> },
];

export default function LinkHub() {
  return (
    <div className="pt-24 min-h-screen bg-[#faf7f2]">
      <section className="section-padding py-16 lg:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-[#2b1810] flex items-center justify-center text-white mx-auto mb-4 p-3 shadow-lg">
              <img src="https://res.cloudinary.com/p2gsrga3/image/upload/v1789147635/logo.png" alt="Everbloom" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-[#2b1810] mb-2">Everbloom Café</h1>
            <p className="text-xs sm:text-sm text-[#6b5c54]">Where Good Food &amp; Good Mood Bloom · Bhubaneswar</p>
          </div>

          <div className="flex flex-col gap-3.5">
            {links.map((link) => {
              const isExternal = link.url.startsWith("http");
              const Component = isExternal ? "a" : Link;
              const props = isExternal
                ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
                : { to: link.url };

              return (
                <Component
                  key={link.id}
                  {...props}
                  className="group flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e8ded3]"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] group-hover:bg-[#2b1810] group-hover:text-white transition-all shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-[#2b1810] group-hover:text-[#c88242] transition-colors">{link.title}</h3>
                    <p className="text-xs text-[#6b5c54] truncate">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#c88242] transition-colors shrink-0" />
                </Component>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
