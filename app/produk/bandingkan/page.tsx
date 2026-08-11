import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CompareProcessor } from "@/features/produk/CompareProcessor";
import { getAllProducts } from "@/lib/getProducts";

export const metadata = {
  title: "Bandingkan Processor Laptop — DYTECH Computer",
  description: "Bandingkan spesifikasi processor antar laptop di DYTECH Computer sebelum memutuskan pilihan.",
};

export default async function BandingkanPage() {
  const products = await getAllProducts();

  return (
    <main className="pb-20">
      <div className="border-b border-[#EAECF5] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-1.5 font-body text-xs text-[#8890A6]">
            <Link href="/" className="hover:text-[#2F5CF0] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} />
            <Link href="/produk" className="hover:text-[#2F5CF0] transition-colors">
              Produk
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#12162A] font-medium">Bandingkan Processor</span>
          </nav>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12">
        <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#2F5CF0] rounded-full px-3 py-1 mb-3">
          BANDINGKAN
        </span>
        <h1 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight mb-2">
          Bandingkan spesifikasi processor
        </h1>
        <p className="font-body text-[#667085] text-sm md:text-base max-w-xl mb-8 leading-relaxed">
          Pilih dua laptop untuk melihat perbandingan processor-nya berdampingan — cocok buat nentuin mana yang
          paling pas sama kebutuhan kamu.
        </p>

        <Suspense fallback={<div className="text-center py-20 text-[#667085]">Memuat...</div>}>
          <CompareProcessor products={products} />
        </Suspense>
      </section>
    </main>
  );
}
