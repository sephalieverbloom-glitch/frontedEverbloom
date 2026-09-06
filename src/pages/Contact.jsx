import { ContactHero, ContactInfo, ContactForm } from "../components/Contact";
import SEOHead from "../components/SEOHead";

export default function Contact() {
  return (
    <div>
      <SEOHead
        title="Contact & Location | Near SUM Ultimate Medicare"
        description="Visit Everbloom Café at K-8/796, Near SUM Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar. Call +91 94371 64578 or get directions on Google Maps."
        keywords="everbloom cafe location, cafe near sum ultimate medicare, cafe near sum hospital bhubaneswar, everbloom cafe contact, cafes in kalinga nagar bhubaneswar"
      />
      <ContactHero />
      <section className="section-padding py-16 lg:py-24 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
