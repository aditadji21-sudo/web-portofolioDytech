import { Hero } from "@/features/home/Hero";
import { Categories } from "@/features/home/Categories";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import { BrandsStrip } from "@/features/home/BrandsStrip";
import { CtaStrip } from "@/features/home/CtaStrip";

export default function HomePage() {
  return (
    // Tambahkan flex-col dan gap-12 (atau angka lain seperti gap-8, gap-16)
    <main className="flex flex-col gap-12">
      <Hero />
      <BrandsStrip />
      <Categories />
      <FeaturedProducts />
      <CtaStrip />
    </main>
  );
}