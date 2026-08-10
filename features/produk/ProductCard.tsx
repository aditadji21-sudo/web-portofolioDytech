import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";
import imgPc from "@/assets/product-pc.svg";
import imgLaptop from "@/assets/LAPTOP LOQ 15ARP10E.svg";
import imgAksesoris from "@/assets/product-aksesoris.svg";
import imgServis from "@/assets/product-servis.svg";

// Peta kategori -> foto produk. Semua gambar di /assets adalah placeholder —
// ganti file-nya (atau tambah entri baru di sini) dengan foto produk asli.
const CATEGORY_IMAGE: Record<string, typeof imgPc> = {
  "PC Rakitan": imgPc,
  Laptop: imgLaptop,
  Aksesoris: imgAksesoris,
  "Servis & Upgrade": imgServis,
};

function accentFor(category: string) {
  return CATEGORIES.find((c) => c.title === category)?.accent ?? "#2F5CF0";
}

export function ProductCard({ product }: { product: Product }) {
  const accent = accentFor(product.category);
  const image = product.image || CATEGORY_IMAGE[product.category] || imgPc;
  const href = `/produk/${encodeURIComponent(product.slug)}`;

  return (
    <div className="group relative rounded-2xl bg-white border border-[#EAECF5] hover:border-[#2F5CF0]/30 hover:shadow-[0_10px_28px_rgba(18,22,42,0.08)] transition-all duration-300 flex flex-col overflow-hidden h-full">
      <Link href={href} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 font-body text-[11px] font-bold tracking-wide text-white bg-[#F0323B] rounded-full px-3 py-1 shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <span
          className="self-start font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full mb-3"
          style={{ color: accent, backgroundColor: `${accent}14` }}
        >
          {product.category.toUpperCase()}
        </span>

        <Link href={href}>
          <h3 className="font-display font-semibold text-[15px] text-[#12162A] mb-2.5 leading-snug hover:text-[#2F5CF0] transition-colors">
            {product.name}
          </h3>
        </Link>

        <ul className="font-body text-[12px] text-[#667085] space-y-1 mb-4">
          {product.specs.slice(0, 3).map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#C6CADA]" />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 border-t border-[#EFF1F8]">
          <span className="font-display font-bold text-[#12162A] text-[15px] block mb-3">{product.price}</span>
          <div className="flex items-center gap-2">
            <Link
              href={href}
              className="flex-1 inline-flex items-center justify-center gap-1.5 font-body text-xs font-semibold text-[#12162A] bg-[#F3F5FB] rounded-full px-3.5 py-2 hover:bg-[#E7EAF6] transition-colors"
            >
              Detail <ArrowRight size={13} />
            </Link>
            <Link
              href="/kontak"
              className="flex-1 inline-flex items-center justify-center gap-1.5 font-body text-xs font-semibold text-white bg-[#2F5CF0] rounded-full px-3.5 py-2 hover:bg-[#16266B] transition-colors"
            >
              <MessageCircle size={13} /> Tanya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
