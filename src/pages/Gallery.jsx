import { GalleryHero, GalleryGrid } from "../components/Gallery";
import SEOHead from "../components/SEOHead";

export default function Gallery() {
  return (
    <div>
      <SEOHead
        title="Photo Gallery & Ambience"
        description="View photos of Everbloom Café in Bhubaneswar. Explore our indoor AC lounge, hand-painted floral rose lady mural, outdoor garden patio & delicious gourmet dishes."
        keywords="everbloom cafe gallery, aesthetic cafe photos bhubaneswar, cafe photoshoot bhubaneswar"
      />
      <GalleryHero />
      <GalleryGrid />
    </div>
  );
}
