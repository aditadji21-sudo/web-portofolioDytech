"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, CATEGORIES, type Product } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import imgPc from "@/assets/product-pc.svg";
import imgLaptop from "@/assets/LAPTOP LOQ 15ARP10E.svg";
import imgAksesoris from "@/assets/product-aksesoris.svg";
import imgServis from "@/assets/product-servis.svg";

const CATEGORY_IMAGE: Record<string, typeof imgPc> = {
  "PC Rakitan": imgPc,
  Laptop: imgLaptop,
  Aksesoris: imgAksesoris,
  "Servis & Upgrade": imgServis,
};

const MAX_SUGGESTIONS = 6;

// Cari produk yang cocok di nama, kategori, atau spesifikasinya — dipakai
// bareng oleh dropdown desktop & mobile.
function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.some((s) => s.toLowerCase().includes(q))
    )
    .slice(0, MAX_SUGGESTIONS);
}

function SuggestionItem({ product, onSelect }: { product: Product; onSelect: () => void }) {
  const image = product.image || CATEGORY_IMAGE[product.category] || imgPc;

  return (
    <Link
      href={`/produk/${encodeURIComponent(product.slug)}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F3F5FB] transition-colors"
    >
      <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden bg-[#F3F5FB]">
        <Image src={image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="font-body text-[13px] text-[#12162A] leading-snug line-clamp-1">{product.name}</p>
        <p className="font-mono text-[11px] text-[#8890A6]">{product.price}</p>
      </div>
    </Link>
  );
}

function SuggestionDropdown({
  query,
  results,
  onSelect,
  onSeeAll,
}: {
  query: string;
  results: Product[];
  onSelect: () => void;
  onSeeAll: () => void;
}) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-[#EAECF5] shadow-[0_16px_40px_rgba(18,22,42,0.14)] overflow-hidden z-50">
      {results.length > 0 ? (
        <>
          <div className="py-1.5">
            {results.map((p) => (
              <SuggestionItem key={p.slug} product={p} onSelect={onSelect} />
            ))}
          </div>
          <button
            type="button"
            onClick={onSeeAll}
            className="w-full text-left px-4 py-3 border-t border-[#EFF1F8] font-body text-[13px] font-semibold text-[#2F5CF0] hover:bg-[#F3F5FB] transition-colors"
          >
            Lihat semua hasil untuk &quot;{query}&quot;
          </button>
        </>
      ) : (
        <div className="px-4 py-6 text-center font-body text-[13px] text-[#8890A6]">
          Tidak ada produk yang cocok dengan &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

export function Nav({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [showMobileSuggest, setShowMobileSuggest] = useState(false);
  const router = useRouter();
  const desktopFormRef = useRef<HTMLFormElement>(null);
  const mobileFormRef = useRef<HTMLFormElement>(null);

  const results = useMemo(() => searchProducts(products, query), [products, query]);
  const mobileResults = useMemo(() => searchProducts(products, mobileQuery), [products, mobileQuery]);

  // Tutup dropdown kalau klik di luar search bar.
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (desktopFormRef.current && !desktopFormRef.current.contains(e.target as Node)) {
        setShowSuggest(false);
      }
      if (mobileFormRef.current && !mobileFormRef.current.contains(e.target as Node)) {
        setShowMobileSuggest(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const runSearch = (q: string) => {
    const trimmed = q.trim();
    router.push(trimmed ? `/produk?cari=${encodeURIComponent(trimmed)}` : "/produk");
    setOpen(false);
    setShowSuggest(false);
    setShowMobileSuggest(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(18,22,42,0.06)]">
      <div className="h-[3px] bg-gradient-to-r from-[#2F5CF0] via-[#F6C623] to-[#F0323B]" />
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-[72px] flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
        </Link>

        <form
          ref={desktopFormRef}
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          className="hidden md:flex flex-1 items-center relative"
        >
          <div className="w-full flex items-center bg-[#F3F5FB] rounded-full border border-transparent focus-within:border-[#2F5CF0]/40 focus-within:bg-white transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              placeholder="Cari PC rakitan, laptop, aksesoris..."
              className="w-full bg-transparent px-5 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="mr-1.5 w-9 h-9 shrink-0 rounded-full bg-[#2F5CF0] text-white flex items-center justify-center hover:bg-[#16266B] transition-colors"
            >
              <Search size={16} />
            </button>
          </div>

          {showSuggest && query.trim() && (
            <SuggestionDropdown
              query={query}
              results={results}
              onSelect={() => setShowSuggest(false)}
              onSeeAll={() => runSearch(query)}
            />
          )}
        </form>

        <a
          href="https://wa.me/62881026014897"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F6C623] text-[#12162A] font-body text-sm font-semibold hover:bg-[#e8b70f] transition-colors shrink-0"
        >
          <MessageCircle size={15} /> Konsultasi
        </a>

        <button className="md:hidden ml-auto text-[#12162A]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* category strip */}
      <nav className="hidden md:block bg-[#2F5CF0]">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-11 flex items-center gap-7 font-body text-[13px] font-medium text-white/90 overflow-x-auto scroll-thin">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="shrink-0 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-white/25 shrink-0" />
          {CATEGORIES.map((c) => (
            <Link
              key={c.title}
              href={`/produk?kategori=${encodeURIComponent(c.title)}`}
              className="shrink-0 text-white/70 hover:text-white transition-colors"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white px-6 py-4 flex flex-col gap-4 font-body text-sm text-[#12162A]">
          <form
            ref={mobileFormRef}
            onSubmit={(e) => {
              e.preventDefault();
              runSearch(mobileQuery);
            }}
            className="relative"
          >
            <div className="flex items-center bg-[#F3F5FB] rounded-full">
              <input
                type="text"
                value={mobileQuery}
                onChange={(e) => {
                  setMobileQuery(e.target.value);
                  setShowMobileSuggest(true);
                }}
                onFocus={() => setShowMobileSuggest(true)}
                placeholder="Cari produk..."
                className="w-full bg-transparent px-4 py-2.5 text-sm placeholder:text-[#8890A6] focus:outline-none"
                autoComplete="off"
              />
              <button type="submit" aria-label="Cari" className="mr-4 text-[#8890A6]">
                <Search size={16} />
              </button>
            </div>

            {showMobileSuggest && mobileQuery.trim() && (
              <SuggestionDropdown
                query={mobileQuery}
                results={mobileResults}
                onSelect={() => {
                  setShowMobileSuggest(false);
                  setOpen(false);
                }}
                onSeeAll={() => runSearch(mobileQuery)}
              />
            )}
          </form>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#2F5CF0]" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}

          <div className="pt-1 border-t border-black/5">
            <p className="font-mono text-[10px] tracking-wide text-[#8890A6] mb-2.5 mt-3">KATEGORI</p>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.title}
                  href={`/produk?kategori=${encodeURIComponent(c.title)}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#2F5CF0]"
                  onClick={() => setOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.accent }} />
                  {c.title}
                </Link>
              ))}
            </div>
          </div>

          <a
            href="https://wa.me/62881026014897"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-center px-4 py-2.5 rounded-full bg-[#F6C623] text-[#12162A] font-semibold"
            onClick={() => setOpen(false)}
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
