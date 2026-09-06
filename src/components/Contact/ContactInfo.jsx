import { MapPin, Phone, Clock, MessageCircle, Mail, User, Calendar } from "lucide-react";
import {
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  EMAIL,
  ADDRESS,
  OWNER_NAME,
  ESTABLISHED_DATE,
  ESTABLISHED_DISPLAY,
} from "../../const";


export default function ContactInfo() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <span className="badge-tag bg-[#2b1810]/10 text-[#2b1810] mb-3">
          Location &amp; Timings
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2b1810] mb-6">
          Come Hangout With Us
        </h2>

        <div className="flex flex-col gap-5 mb-8">
          {/* Address */}
          <div className="flex items-start gap-4 p-5 rounded-3xl glass-card border border-[#e8ded3]">
            <div className="w-11 h-11 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#2b1810] mb-1">Our Address</h3>
              <p className="text-xs text-[#6b5c54] leading-relaxed">
                {ADDRESS}
              </p>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="flex items-start gap-4 p-5 rounded-3xl glass-card border border-[#e8ded3]">
            <div className="w-11 h-11 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#2b1810] mb-1">Phone Numbers</h3>
              <p className="text-xs text-[#6b5c54] mb-2">Call or WhatsApp during café hours</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href="tel:09437164578"
                  className="text-sm font-bold text-[#2b1810] hover:text-[#c88242] transition-colors"
                >
                  {PHONE_PRIMARY}
                </a>
                <span className="text-[#c88242] font-bold">•</span>
                <a
                  href="tel:09778795952"
                  className="text-sm font-bold text-[#2b1810] hover:text-[#c88242] transition-colors"
                >
                  {PHONE_SECONDARY}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 p-5 rounded-3xl glass-card border border-[#e8ded3]">
            <div className="w-11 h-11 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#2b1810] mb-1">Official Email</h3>
              <a
                href={`mailto:${EMAIL}`}
                className="text-xs font-bold text-[#2b1810] hover:text-[#c88242] transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Owner & Starting Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-4 rounded-3xl glass-card border border-[#e8ded3]">
              <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-[#6b5c54] uppercase tracking-wider mb-0.5">Owner</h3>
                <p className="text-sm font-extrabold text-[#1c1109]">
                  {OWNER_NAME}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-3xl glass-card border border-[#e8ded3]">
              <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-[#6b5c54] uppercase tracking-wider mb-0.5">Starting Date</h3>
                <p className="text-sm font-extrabold text-[#1c1109]">
                  {ESTABLISHED_DATE} <span className="text-xs font-bold text-[#c88242]">({ESTABLISHED_DISPLAY})</span>
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4 p-5 rounded-3xl glass-card border border-[#e8ded3]">
            <div className="w-11 h-11 rounded-2xl bg-[#c88242]/15 flex items-center justify-center text-[#c88242] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#2b1810] mb-1">Operating Hours</h3>
              <p className="text-xs font-bold text-emerald-700">Open 7 Days a Week</p>
              <p className="text-xs text-[#6b5c54] mt-0.5">1:00 PM – 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <a
          href="https://wa.me/919437164578?text=Hi%20Everbloom%20Café%2C%20I%20have%20an%20inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-espresso py-3.5 text-xs font-bold gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-[#e29b5a]" /> WhatsApp Chat
        </a>

        <a
          href="https://maps.google.com/?q=Everbloom+Kalinga+Nagar+Bhubaneswar"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-caramel py-3.5 text-xs font-bold gap-2 shadow-md"
        >
          <MapPin className="w-4 h-4" /> Google Maps
        </a>
      </div>
    </div>
  );
}
