"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const router = useRouter();

  const runSearch = (q: string) => {
    const trimmed = q.trim();
    router.push(trimmed ? `/produk?cari=${encodeURIComponent(trimmed)}` : "/produk");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(18,22,42,0.06)]">
      <div className="h-[3px] bg-gradient-to-r from-[#2F5CF0] via-[#F6C623] to-[#F0323B]" />
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-[72px] flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          className="hidden md:flex flex-1 items-center"
        >
          <div className="w-full flex items-center bg-[#F3F5FB] rounded-full border border-transparent focus-within:border-[#2F5CF0]/40 focus-within:bg-white transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari PC rakitan, laptop, aksesoris..."
              className="w-full bg-transparent px-5 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="mr-1.5 w-9 h-9 shrink-0 rounded-full bg-[#2F5CF0] text-white flex items-center justify-center hover:bg-[#16266B] transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
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
            onSubmit={(e) => {
              e.preventDefault();
              runSearch(mobileQuery);
            }}
            className="flex items-center bg-[#F3F5FB] rounded-full"
          >
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-transparent px-4 py-2.5 text-sm placeholder:text-[#8890A6] focus:outline-none"
            />
            <button type="submit" aria-label="Cari" className="mr-4 text-[#8890A6]">
              <Search size={16} />
            </button>
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
