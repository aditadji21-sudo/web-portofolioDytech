import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-24 text-center">
      <PackageSearch size={40} className="mx-auto text-[#8890A6] mb-4" />
      <h1 className="font-display font-semibold text-xl text-[#12162A] mb-2">
        Produk tidak ditemukan
      </h1>
      <p className="font-body text-sm text-[#667085] mb-6">
        Produk yang kamu cari mungkin sudah tidak tersedia atau tautannya salah.
      </p>
      <Link
        href="/produk"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white bg-[#2F5CF0] rounded-full px-5 py-2.5 hover:bg-[#16266B] transition-colors"
      >
        Kembali ke Katalog
      </Link>
    </main>
  );
}
