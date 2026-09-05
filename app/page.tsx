import { Hero } from "@/features/home/Hero";
import { Categories } from "@/features/home/Categories";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import { BrandsStrip } from "@/features/home/BrandsStrip";
import { CtaStrip } from "@/features/home/CtaStrip";
import { Testimonials } from "@/features/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Instagram Portrait Carousel */}
      <Hero />

      {/* Brands Strip with Infinite Marquee and Brand Transitions */}
      <BrandsStrip />

      {/* Categories & Product Discovery */}
      <div className="space-y-6 sm:space-y-10 md:space-y-16 py-6 sm:py-8">
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <CtaStrip />
      </div>
    </div>
  );
}