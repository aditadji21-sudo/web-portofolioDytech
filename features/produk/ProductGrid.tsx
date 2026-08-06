"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/features/produk/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = ["Semua", ...CATEGORIES.map((c) => c.title)];

export function ProductGrid() {
  const [active, setActive] = useState("Semua");

  // Sinkron dengan ?kategori=... dari link kategori di Nav/Beranda,
  // tanpa useSearchParams supaya tidak perlu Suspense boundary.
  useEffect(() => {
    const kategori = new URLSearchParams(window.location.search).get("kategori");
    if (kategori && FILTERS.includes(kategori)) setActive(kategori);
  }, []);

  const filtered = active === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-wrap gap-2.5 mb-8">
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
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
      </div>
    </section>
  );
}
