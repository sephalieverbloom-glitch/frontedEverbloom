import { BookingHero, BookingForm } from "../components/Booking";
import SEOHead from "../components/SEOHead";

export default function Booking() {
  return (
    <div className="pt-24 min-h-screen bg-[#faf7f2]">
      <SEOHead
        title="Reserve a Table | Café in Bhubaneswar"
        description="Book a table or private celebration at Everbloom Café near SUM Ultimate Medicare, Bhubaneswar. Perfect for birthdays, date nights, and group hangouts."
        keywords="book cafe table bhubaneswar, cafe reservations bhubaneswar, birthday celebration cafe near sum hospital"
      />
      <BookingHero />
      <BookingForm />
    </div>
  );
}
