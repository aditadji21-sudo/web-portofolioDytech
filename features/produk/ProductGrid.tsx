"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchX, X } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/constants";
import { ProductCard } from "@/features/produk/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = ["Semua", ...CATEGORIES.map((c) => c.title)];
const PER_PAGE = 12; // 4 baris x 3 kolom di desktop, 6 baris x 2 kolom di mobile

// Urutan tier processor dari paling ringan ke paling kencang — dipakai buat
// nentuin urutan tombol filter & label tampilannya.
const TIER_ORDER = [
  "Dual Core / Celeron",
  "Core i3",
  "Core i5",
  "Core i7",
  "Core i9",
  "Ryzen 3",
  "Ryzen 5",
  "Ryzen 7",
  "Ryzen 9",
  "Lainnya",
];

// Deteksi tier processor dari teks specs (atau data processor terstruktur kalau ada).
// Ini bukan field terpisah di spreadsheet — sengaja "ditebak" dari teks yang sudah ada
// (mis. "Core i7-13650HX", "Ryzen 5 5600") supaya tidak perlu nambah kolom baru di sheet.
function detectTier(p: Product): string {
  const text = `${p.processor?.name ?? ""} ${p.specs.join(" ")}`.toLowerCase();
  if (/celeron|dual.?core|pentium/.test(text)) return "Dual Core / Celeron";
  if (/\bi9\b|core i9/.test(text)) return "Core i9";
  if (/\bi7\b|core i7/.test(text)) return "Core i7";
  if (/\bi5\b|core i5/.test(text)) return "Core i5";
  if (/\bi3\b|core i3/.test(text)) return "Core i3";
  if (/ryzen\s*9/.test(text)) return "Ryzen 9";
  if (/ryzen\s*7/.test(text)) return "Ryzen 7";
  if (/ryzen\s*5/.test(text)) return "Ryzen 5";
  if (/ryzen\s*3/.test(text)) return "Ryzen 3";
  return "Lainnya";
}

// Deteksi ada/tidaknya kartu grafis terpisah (VGA) dari teks specs.
function hasDedicatedGpu(p: Product): boolean {
  const text = p.specs.join(" ").toLowerCase();
  return /rtx|gtx|radeon rx|geforce|mx\d{3}/.test(text);
}

export function ProductGrid({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Baca nilai kategori langsung dari URL (menjadi Single Source of Truth)
  const kategoriUrl = searchParams.get("kategori");
  
  // 2. Tentukan kategori aktif. Jika URL kosong atau tidak valid, kembali ke "Semua"
  const active = (kategoriUrl && FILTERS.includes(kategoriUrl)) ? kategoriUrl : "Semua";

  // 3. Kata kunci pencarian dari URL (diisi lewat search bar di Nav)
  const searchQuery = (searchParams.get("cari") ?? "").trim();

  // 4. Sub-filter khusus Laptop: tier processor & VGA
  const tierUrl = searchParams.get("tier") ?? "";
  const vgaUrl = searchParams.get("vga") ?? ""; // "dedicated" | "integrated" | ""

  // 5. Halaman aktif dari URL, default 1
  const pageUrl = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageUrl) && pageUrl > 0 ? pageUrl : 1;

  // 6. Ganti kategori: reset ke halaman 1 & sub-filter laptop, TAPI kata kunci pencarian tetap dipertahankan
  const handleCategoryClick = (f: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("tier");
    params.delete("vga");
    if (f === "Semua") params.delete("kategori");
    else params.set("kategori", f);
    const qs = params.toString();
    router.push(qs ? `/produk?${qs}` : "/produk", { scroll: false });
  };

  const handleTierClick = (tier: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (!tier || tier === tierUrl) params.delete("tier");
    else params.set("tier", tier);
    router.push(`/produk?${params.toString()}`, { scroll: false });
  };

  const handleVgaClick = (vga: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (!vga || vga === vgaUrl) params.delete("vga");
    else params.set("vga", vga);
    router.push(`/produk?${params.toString()}`, { scroll: false });
  };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    router.push(`/produk?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cari");
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/produk?${qs}` : "/produk", { scroll: false });
  };

  let filtered = active === "Semua" ? products : products.filter((p) => p.category === active);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Sub-filter tier/VGA cuma berlaku kalau kategori aktifnya "Laptop"
  const isLaptopView = active === "Laptop";
  const availableTiers = isLaptopView
    ? TIER_ORDER.filter((t) => filtered.some((p) => detectTier(p) === t))
    : [];

  if (isLaptopView && tierUrl) {
    filtered = filtered.filter((p) => detectTier(p) === tierUrl);
  }
  if (isLaptopView && vgaUrl) {
    filtered = filtered.filter((p) => (vgaUrl === "dedicated" ? hasDedicatedGpu(p) : !hasDedicatedGpu(p)));
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        {searchQuery && (
          <Reveal className="flex items-center gap-2 mb-6 font-body text-sm text-[#667085]">
            <span>
              Hasil pencarian untuk <span className="font-semibold text-[#12162A]">&quot;{searchQuery}&quot;</span>{" "}
              ({filtered.length} produk)
            </span>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1 text-[#2F5CF0] hover:text-[#16266B] font-medium"
            >
              <X size={13} /> Hapus
            </button>
          </Reveal>
        )}

        <Reveal className="flex flex-wrap gap-2.5 mb-4">
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

        {isLaptopView && (availableTiers.length > 0 || filtered.length > 0) && (
          <Reveal className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-[#EAECF5]">
            {availableTiers.length > 0 && (
              <>
                <span className="font-mono text-[10px] tracking-wide text-[#8890A6] mr-1">PROCESSOR:</span>
                {availableTiers.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTierClick(t)}
                    className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      tierUrl === t
                        ? "bg-[#12162A] text-white border-[#12162A]"
                        : "border-[#E1E4EF] bg-white text-[#667085] hover:border-[#C6CADA]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
                <span className="w-px h-4 bg-[#E1E4EF] mx-1.5 hidden sm:inline-block" />
              </>
            )}

            <span className="font-mono text-[10px] tracking-wide text-[#8890A6] mr-1">GRAFIS:</span>
            {[
              { value: "dedicated", label: "VGA (Dedicated)" },
              { value: "integrated", label: "Non-VGA" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleVgaClick(opt.value)}
                className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  vgaUrl === opt.value
                    ? "bg-[#12162A] text-white border-[#12162A]"
                    : "border-[#E1E4EF] bg-white text-[#667085] hover:border-[#C6CADA]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </Reveal>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {paginated.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 6) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <SearchX size={28} className="mx-auto text-[#C6CADA] mb-3" />
            <p className="font-body text-sm text-[#8890A6]">
              {searchQuery
                ? `Tidak ada produk yang cocok dengan "${searchQuery}".`
                : "Belum ada produk yang cocok dengan filter ini."}
            </p>
          </div>
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
