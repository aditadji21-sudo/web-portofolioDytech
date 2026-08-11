import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/getProducts";
import { ProductCard } from "@/features/produk/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedProducts() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.badge).concat(
    products.filter((p) => !p.badge).slice(0, 6 - products.filter((p) => p.badge).length)
  );

  return (
    <section className="relative px-4 sm:px-6 md:px-8 py-16 md:py-20 overflow-hidden bg-[#FFF8E8]">
      <div className="pointer-events-none absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-[#F6C623]/20 blur-[100px]" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal className="flex items-end justify-between mb-10 md:mb-12 gap-4">
          <div>
            <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#F0323B] rounded-full px-3 py-1 mb-3">
              TERLARIS
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight">
              Produk paling dicari
            </h2>
          </div>
          <Link
            href="/produk"
            className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#2F5CF0] hover:text-[#16266B] transition-colors shrink-0"
          >
            Lihat semua <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 6) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/produk"
          className="sm:hidden mt-8 inline-flex items-center justify-center gap-1.5 w-full font-body text-sm font-semibold text-[#2F5CF0] border border-[#2F5CF0]/30 rounded-full py-3"
        >
          Lihat semua produk <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
