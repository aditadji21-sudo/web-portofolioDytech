"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MessageCircle, ChevronDown } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";

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
        className="w-full flex items-center rounded-full bg-[#EFF2FA] border border-[#DBE1FF]/60 focus-within:border-[#2F5CF0]/40 transition-colors"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent px-4 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none"
        />

        <div className="relative shrink-0 border-l border-[#DBE1FF]/60">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Pilih kategori"
            className="appearance-none bg-transparent pl-3.5 pr-7 py-2.5 font-body text-xs text-[#667085] focus:outline-none cursor-pointer max-w-[130px]"
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
          className="mr-1.5 w-8 h-8 shrink-0 rounded-full bg-[#2F5CF0] hover:bg-[#244bd6] text-white flex items-center justify-center transition-colors"
        >
          <Search size={14} />
        </button>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_8px_24px_rgba(18,22,42,0.12)] overflow-hidden z-50">
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
                className="w-full text-left px-4 py-2.5 font-body text-xs text-[#2F5CF0] hover:bg-[#F3F5FB] border-t border-[#E2E8F0] transition-colors"
              >
                Lihat semua hasil untuk &quot;{query}&quot; →
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
  const scrolled = useScroll(20);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "md:pt-2.5 md:px-4" : "pt-0 px-0"
      )}
    >
      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
          scrolled
            ? "max-w-5xl mx-auto rounded-2xl bg-white/90 supports-[backdrop-filter]:bg-white/85 backdrop-blur-xl border border-black/[0.06] shadow-[0_4px_24px_rgba(18,22,42,0.08)]"
            : "w-full bg-white border-b border-black/[0.05]"
        )}
      >
        {/* Top Gradient Brand Accent Line */}
        <div
          className={cn(
            "h-[2px] bg-gradient-to-r from-[#2F5CF0] via-[#F6C623] to-[#F0323B] transition-all duration-500",
            scrolled ? "rounded-t-2xl" : ""
          )}
        />

        {/* Main Navbar Row */}
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "max-w-5xl px-3 sm:px-4 md:px-5 gap-3 sm:gap-4 h-14"
              : "max-w-6xl px-4 sm:px-6 md:px-8 gap-4 sm:gap-6 md:gap-8 h-16 sm:h-[68px]"
          )}
        >
          {/* Logo with Link */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 select-none hover:opacity-90 transition-opacity">
            <Logo size={scrolled ? "sm" : "md"} />
          </Link>

          {/* Search Box on Desktop */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center">
            <SearchBox products={products} placeholder="Cari PC rakitan, laptop, aksesoris..." />
          </div>

          {/* Quick Nav Links on Larger Screens */}
          <nav
            className={cn(
              "hidden lg:flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled ? "gap-0.5" : "gap-2"
            )}
          >
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative font-montserrat font-medium rounded-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    scrolled
                      ? "text-[12.5px] px-2.5 py-1.5"
                      : "text-[13px] px-4 py-2",
                    isActive
                      ? "text-[#12162A] bg-[#F3F5FB]"
                      : "text-[#667085] hover:text-[#12162A] hover:bg-[#F3F5FB]/60"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#2F5CF0] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/62881026014897"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "hidden sm:inline-flex items-center gap-2 rounded-full bg-[#F6C623] hover:bg-[#FFE169] text-[#12162A] font-montserrat font-semibold text-xs px-4 py-2 transition-colors border-0"
              )}
            >
              <MessageCircle size={14} className="text-[#12162A]" /> Konsultasi
            </a>

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              className="lg:hidden rounded-lg border-black/10 bg-transparent hover:bg-[#F3F5FB] text-[#12162A] w-10 h-10 sm:w-9 sm:h-9"
            >
              <MenuToggleIcon open={open} className="size-[18px] sm:size-4" duration={300} />
            </Button>
          </div>
        </div>

        {/* Category Strip — collapses smoothly on scroll */}
        <div
          className={cn(
            "hidden md:block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-12 opacity-100"
          )}
        >
          <div className="bg-[#2F5CF0]">
            <div className="max-w-6xl mx-auto px-6 md:px-8 h-10 flex items-center gap-5 md:gap-7 lg:gap-8 font-montserrat text-[13px] font-medium text-white/90 overflow-x-auto scroll-thin">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="shrink-0 hover:text-white transition-colors py-1">
                  {l.label}
                </Link>
              ))}
              <span className="w-px h-3.5 bg-white/30 shrink-0" />
              {CATEGORIES.map((c) => (
                <Link
                  key={c.title}
                  href={`/produk?kategori=${encodeURIComponent(c.title)}`}
                  className="shrink-0 text-white/70 hover:text-white transition-colors py-1"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "bg-white/98 supports-[backdrop-filter]:bg-white/95 backdrop-blur-xl fixed right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto border-t border-black/5 lg:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "top-14 md:top-[calc(3.5rem+0.625rem)]" : "top-16 sm:top-[68px]",
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2"
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-5 p-5 sm:p-6 max-w-lg mx-auto">
          <div className="space-y-5">
            {/* Mobile Search */}
            <SearchBox
              products={products}
              placeholder="Cari PC rakitan, laptop, aksesoris..."
              compact
              onNavigate={() => setOpen(false)}
            />

            {/* Navigation Links */}
            <div className="grid gap-1.5 pt-1">
              <p className="font-montserrat text-[10px] font-bold tracking-wider text-[#8890A6] uppercase px-3 mb-0.5">
                Menu Utama
              </p>
              {NAV_LINKS.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "flex items-center px-4 py-3.5 rounded-xl font-montserrat text-[15px] font-medium transition-all duration-200",
                      isActive
                        ? "text-[#12162A] bg-[#EBF0FF] shadow-[inset_0_0_0_1px_rgba(47,92,240,0.12)]"
                        : "text-[#4A5568] active:bg-[#F3F5FB] hover:text-[#12162A]"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {isActive && (
                      <span className="w-1 h-5 bg-[#2F5CF0] rounded-full mr-3 shrink-0" />
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {/* Kategori Produk */}
            <div className="pt-4 border-t border-black/[0.06]">
              <p className="font-montserrat text-[10px] font-bold tracking-wider text-[#8890A6] uppercase px-3 mb-2.5">
                Kategori Produk
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.title}
                    href={`/produk?kategori=${encodeURIComponent(c.title)}`}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-[13px] font-medium text-[#4A5568] active:bg-[#F3F5FB] hover:text-[#12162A] transition-all duration-200 bg-[#F9FAFC] border border-transparent hover:border-[#E2E8F0]"
                    onClick={() => setOpen(false)}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white shadow-sm" style={{ backgroundColor: c.accent }} />
                    <span className="truncate">{c.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-4 border-t border-black/[0.06] flex flex-col gap-3 pb-[env(safe-area-inset-bottom,0px)]">
            <a
              href="https://wa.me/62881026014897"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full rounded-2xl bg-[#F6C623] hover:bg-[#FFE169] text-[#12162A] font-montserrat font-semibold text-[15px] py-4 justify-center border-0 shadow-[0_4px_16px_rgba(246,198,35,0.3)] active:scale-[0.97] transition-all duration-200"
              )}
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={18} className="mr-2.5" /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
