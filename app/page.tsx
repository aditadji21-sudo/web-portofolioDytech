import { Hero } from "@/features/home/Hero";
import { Categories } from "@/features/home/Categories";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import { BrandsStrip } from "@/features/home/BrandsStrip";
import { CtaStrip } from "@/features/home/CtaStrip";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Instagram Portrait Carousel */}
      <Hero />

      {/* Brands Strip with Infinite Marquee and Brand Transitions */}
      <BrandsStrip />

      {/* Categories & Product Discovery */}
      <div className="space-y-12 md:space-y-16 py-8">
        <Categories />
        <FeaturedProducts />
        <CtaStrip />
      </div>
    </div>
  );
}