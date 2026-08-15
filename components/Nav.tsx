"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/constants";
import { Logo } from "@/components/Logo";

function SearchBox({
  products,
  placeholder,
  compact = false,
  onNavigate,
}: {
  products: Product[];
  placeholder: string;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Klik di luar box search -> tutup dropdown saran
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const pool = category ? products.filter((p) => p.category === category) : products;
    return pool.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query, products, category]);

  const showDropdown = focused && query.trim().length > 0;

  const goToSearchResults = (q: string) => {
    const trimmed = q.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("cari", trimmed);
    if (category) params.set("kategori", category);
    const qs = params.toString();
    router.push(qs ? `/produk?${qs}` : "/produk");
    setFocused(false);
    onNavigate?.();
  };

  const goToProduct = (slug: string) => {
    router.push(`/produk/${encodeURIComponent(slug)}`);
    setFocused(false);
    setQuery("");
    onNavigate?.();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearchResults(query);
        }}
        className={
          compact
            ? "flex items-center bg-[#F3F5FB] rounded-full"
            : "w-full flex items-center bg-[#F3F5FB] rounded-full border border-transparent focus-within:border-[#2F5CF0]/40 focus-within:bg-white transition-colors"
        }
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={
            compact
              ? "w-full bg-transparent px-4 py-2.5 text-sm placeholder:text-[#8890A6] focus:outline-none"
              : "w-full bg-transparent px-5 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none"
          }
        />

        <div className="relative shrink-0 border-l border-[#E1E4EF]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Pilih kategori"
            className={
              compact
                ? "appearance-none bg-transparent pl-3 pr-6 py-2.5 font-body text-xs text-[#667085] focus:outline-none cursor-pointer max-w-[92px]"
                : "appearance-none bg-transparent pl-4 pr-7 py-2.5 font-body text-xs text-[#667085] focus:outline-none cursor-pointer max-w-[130px]"
            }
          >
            <option value="">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c.title} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8890A6]"
          />
        </div>

        <button
          type="submit"
          aria-label="Cari"
          className={
            compact
              ? "mr-4 text-[#8890A6]"
              : "mr-1.5 w-9 h-9 shrink-0 rounded-full bg-[#2F5CF0] text-white flex items-center justify-center hover:bg-[#16266B] transition-colors"
          }
        >
          <Search size={16} />
        </button>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#EAECF5] rounded-2xl shadow-[0_12px_32px_rgba(18,22,42,0.14)] overflow-hidden z-50">
          {matches.length > 0 ? (
            <>
              {matches.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => goToProduct(p.slug)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F3F5FB] transition-colors text-left"
                >
                  <div className="relative w-10 h-10 shrink-0 rounded-lg bg-[#F3F5FB] overflow-hidden">
                    {p.image && (
                      <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm text-[#12162A] truncate">{p.name}</p>
                    <p className="font-body text-xs text-[#8890A6]">{p.price}</p>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToSearchResults(query)}
                className="w-full text-left px-4 py-2.5 font-body text-xs font-semibold text-[#2F5CF0] hover:bg-[#F3F5FB] border-t border-[#EFF1F8] transition-colors"
              >
                Lihat semua hasil untuk &quot;{query}&quot;
              </button>
            </>
          ) : (
            <p className="px-4 py-3 font-body text-sm text-[#8890A6]">Tidak ada produk yang cocok.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function Nav({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(18,22,42,0.06)]">
      <div className="h-[3px] bg-gradient-to-r from-[#2F5CF0] via-[#F6C623] to-[#F0323B]" />
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-[72px] flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
        </Link>

        <div className="hidden md:flex flex-1 items-center">
          <SearchBox products={products} placeholder="Cari PC rakitan, laptop, aksesoris..." />
        </div>

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
          <SearchBox
            products={products}
            placeholder="Cari produk..."
            compact
            onNavigate={() => setOpen(false)}
          />

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
