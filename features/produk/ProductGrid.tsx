"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/constants";
import { ProductCard } from "@/features/produk/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = ["Semua", ...CATEGORIES.map((c) => c.title)];
const PER_PAGE = 12; // 4 baris x 3 kolom di desktop, 6 baris x 2 kolom di mobile

export function ProductGrid({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Baca nilai kategori langsung dari URL (menjadi Single Source of Truth)
  const kategoriUrl = searchParams.get("kategori");
  
  // 2. Tentukan kategori aktif. Jika URL kosong atau tidak valid, kembali ke "Semua"
  const active = (kategoriUrl && FILTERS.includes(kategoriUrl)) ? kategoriUrl : "Semua";

  // 3. Halaman aktif dari URL, default 1
  const pageUrl = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageUrl) && pageUrl > 0 ? pageUrl : 1;

  // 4. Fungsi ini akan mengubah URL saat tombol filter biru diklik — kategori baru = balik ke halaman 1
  const handleCategoryClick = (f: string) => {
      if (f === "Semua") {
        router.push("/produk", { scroll: false });
      } else {
        // Kita bungkus f dengan encodeURIComponent agar simbol & aman dibaca URL
        router.push(`/produk?kategori=${encodeURIComponent(f)}`, { scroll: false });
      }
    };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    router.push(`/produk?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = active === "Semua" ? products : products.filter((p) => p.category === active);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-wrap gap-2.5 mb-8">
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => handleCategoryClick(f)}
                className={`font-body text-sm px-4 py-2 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2F5CF0] text-white border-[#2F5CF0]"
                    : "border-[#E1E4EF] bg-white text-[#667085] hover:text-[#12162A] hover:border-[#C6CADA]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {paginated.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 6) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-body text-sm text-[#8890A6] text-center py-16">
            Belum ada produk di kategori ini.
          </p>
        )}

        {filtered.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-12">
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage <= 1}
              aria-label="Halaman sebelumnya"
              className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-full border border-[#E1E4EF] text-[#667085] disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:border-[#2F5CF0] hover:not-disabled:text-[#2F5CF0] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-full font-body text-sm font-semibold transition-colors ${
                  p === safePage
                    ? "bg-[#2F5CF0] text-white"
                    : "text-[#667085] hover:bg-[#F3F5FB]"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage >= totalPages}
              aria-label="Halaman berikutnya"
              className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-full border border-[#E1E4EF] text-[#667085] disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:border-[#2F5CF0] hover:not-disabled:text-[#2F5CF0] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}