import { Hero } from "@/features/home/Hero";
import { Categories } from "@/features/home/Categories";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import { CtaStrip } from "@/features/home/CtaStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CtaStrip />
    </>
  );
}
