"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import type { Product } from "@/lib/constants";
import { CATEGORIES, STORE_INFO } from "@/lib/constants";
import { ALL_PRODUCTS } from "@/lib/all-products";
import { ProductCard } from "@/features/produk/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
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

function accentFor(category: string) {
  return CATEGORIES.find((c) => c.title === category)?.accent ?? "#2F5CF0";
}

// Kalau deskripsi belum diisi manual di data produk, susun paragraf singkat
// otomatis dari spesifikasi supaya halaman tetap enak dibaca.
function fallbackDescription(product: Product) {
  const specText = product.specs.join(", ");
  return `${product.name} dari kategori ${product.category} ini dibekali ${specText}. Unit siap dipesan di DYTECH Computer, konsultasikan kebutuhan atau spesifikasi tambahan lewat WhatsApp sebelum melakukan pembelian.`;
}

export function ProductDetail({ product }: { product: Product }) {
  const accent = accentFor(product.category);
  const mainImage = product.image || CATEGORY_IMAGE[product.category] || imgPc;
  const gallery = product.images && product.images.length > 0 ? product.images : [mainImage as string];
  const [activeImage, setActiveImage] = useState<string | typeof imgPc>(gallery[0]);

  const waText = encodeURIComponent(`Halo DYTECH, saya mau tanya tentang ${product.name}.`);
  const waLink = `https://wa.me/${STORE_INFO.whatsapp}?text=${waText}`;

  const related = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <main className="pb-24 md:pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#EAECF5] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <nav className="flex flex-wrap items-center gap-1.5 font-body text-[11px] sm:text-xs text-[#8890A6]">
            <Link href="/" className="hover:text-[#2F5CF0] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} />
            <Link href="/produk" className="hover:text-[#2F5CF0] transition-colors">
              Produk
            </Link>
            <ChevronRight size={12} />
            <Link
              href={`/produk?kategori=${encodeURIComponent(product.category)}`}
              className="hidden sm:inline hover:text-[#2F5CF0] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={12} className="hidden sm:inline" />
            <span className="text-[#12162A] font-medium truncate max-w-[160px] sm:max-w-[220px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6 md:pt-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Gallery */}
          <Reveal>
            <div className="relative aspect-square rounded-2xl md:rounded-3xl bg-[#F3F5FB] border border-[#EAECF5] overflow-hidden">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-6 sm:p-8"
                priority
              />
              {product.badge && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 font-body text-[10px] sm:text-[11px] font-bold tracking-wide text-white bg-[#F0323B] rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto scroll-thin pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F3F5FB] border overflow-hidden shrink-0 transition-colors ${
                      img === activeImage ? "border-[#2F5CF0]" : "border-[#EAECF5] hover:border-[#C6CADA]"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Info */}
          <Reveal delay={80}>
            <span
              className="inline-block font-mono text-[10px] sm:text-[11px] tracking-wide px-2.5 py-1 rounded-full mb-3 sm:mb-4"
              style={{ color: accent, backgroundColor: `${accent}14` }}
            >
              {product.category.toUpperCase()}
            </span>

            <h1 className="font-display font-semibold text-xl sm:text-2xl md:text-[32px] text-[#12162A] leading-snug mb-2.5 sm:mb-3">
              {product.name}
            </h1>

            <p className="font-display font-bold text-[#12162A] text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-5">
              {product.price}
            </p>

            {/* Stock info box */}
            <div className="rounded-xl sm:rounded-2xl border border-[#EAECF5] bg-[#F9FAFD] p-3.5 sm:p-4 mb-5 sm:mb-6">
              <p className="font-body text-xs font-semibold text-[#12162A] mb-1">Informasi Stok</p>
              <p className="font-body text-xs sm:text-sm text-[#3AA76D] font-medium">
                {product.stock ?? "Tersedia — hubungi kami untuk konfirmasi stok terbaru"}
              </p>
            </div>

            {/* CTA buttons — hidden on mobile, replaced by sticky bottom bar */}
            <div className="hidden md:flex gap-3 mb-8">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 font-body text-sm font-semibold text-white bg-[#2F5CF0] rounded-full px-6 py-3.5 hover:bg-[#16266B] transition-colors"
              >
                <MessageCircle size={16} /> Tanya via WhatsApp
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 font-body text-sm font-semibold text-[#12162A] bg-[#F6C623] rounded-full px-6 py-3.5 hover:bg-[#e8b70f] transition-colors"
              >
                <Phone size={16} /> Telepon Toko
              </a>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                { icon: ShieldCheck, label: "Bergaransi" },
                { icon: Truck, label: "Siap Diantar" },
                { icon: Wrench, label: "Servis Purnajual" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1 sm:gap-1.5 rounded-xl border border-[#EFF1F8] py-2.5 sm:py-3 px-1.5 sm:px-2"
                >
                  <Icon size={15} className="text-[#2F5CF0] shrink-0" />
                  <span className="font-body text-[10px] sm:text-[11px] leading-tight text-[#667085]">{label}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h2 className="font-display font-semibold text-sm text-[#12162A] mb-3">Spesifikasi</h2>
              <ul className="font-body text-sm text-[#3D4257] space-y-2">
                {product.specs.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* SKU + category */}
            <div className="font-mono text-[11px] text-[#8890A6] space-y-1 pt-4 border-t border-[#EFF1F8]">
              <p>SKU: {product.sku ?? product.slug.toUpperCase()}</p>
              <p>Kategori: {product.category}</p>
            </div>
          </Reveal>
        </div>

        {/* Description */}
        <Reveal delay={120}>
          <div className="max-w-3xl mt-10 md:mt-20">
            <h2 className="font-display font-semibold text-base sm:text-lg text-[#12162A] mb-3">
              Deskripsi Produk
            </h2>
            <p className="font-body text-sm md:text-base text-[#667085] leading-relaxed">
              {product.description ?? fallbackDescription(product)}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-12 md:mt-20">
          <Reveal>
            <h2 className="font-display font-semibold text-base sm:text-lg md:text-xl text-[#12162A] mb-5 sm:mb-6">
              Produk lain di kategori {product.category}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EAECF5] px-4 py-3 flex items-center gap-2.5 shadow-[0_-4px_16px_rgba(18,22,42,0.08)]">
        <a
          href={`tel:${STORE_INFO.phone}`}
          aria-label="Telepon Toko"
          className="shrink-0 w-12 h-12 inline-flex items-center justify-center rounded-full bg-[#F6C623] text-[#12162A]"
        >
          <Phone size={18} />
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 font-body text-sm font-semibold text-white bg-[#2F5CF0] rounded-full px-6 py-3.5"
        >
          <MessageCircle size={16} /> Tanya via WhatsApp
        </a>
      </div>
    </main>
  );
}
