import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import { PromoBanners2, PromoBanners3 } from '../components/PromoBanners';
import VideoCarousel from '../components/VideoCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandsSection from '../components/BrandsSection';
import OutdoorTips from '../components/OutdoorTips';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryGrid />
      <PromoBanners2 />
      <VideoCarousel />
      <FeaturedProducts />
      <PromoBanners3 />
      <BrandsSection />
      <OutdoorTips />
    </>
  );
}
