import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

// Logo brand ambil dari file di /public/brands/ — kamu yang upload file-nya sendiri
// (download resmi dari halaman "Brand/Media Kit" tiap brand, atau dari distributor
// kalau kamu reseller resmi). Aku tidak bisa menyediakan file logo asli brand orang lain.
//
// Cara nambah/ganti brand:
// 1. Simpan file logo (PNG transparan disarankan) ke folder public/brands/
// 2. Tambah/edit baris di array BRANDS di bawah, samakan `file` dengan nama filenya
// 3. Ukuran disarankan: tinggi ~120px, lebar menyesuaikan (rasio logo asli), background transparan
const BRANDS: { name: string; file: string }[] = [
  { name: "ASUS", file: "asus.svg" },
  { name: "Lenovo", file: "lenovo.svg" },
  { name: "Acer", file: "acer.svg" },
  { name: "HP", file: "hp.svg" },
  { name: "Advan", file: "advan.png" },
  { name: "Axioo", file: "axioo.png" },
  { name: "Epson", file: "epson.svg" },
  { name: "Canon", file: "canon3.png" },
  { name: "Brother", file: "brother.png" },
  { name: "Logitech", file: "logitech.png" },
  { name: "Fantech", file: "fantech.png" },
  { name: "Rexus", file: "rexus.png" },
];

export function BrandsStrip() {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 py-14 md:py-16 overflow-hidden bg-gradient-to-b from-[#12162A] to-[#06070B]">
      <div className="pointer-events-none absolute -top-10 -left-16 w-64 h-64 rounded-full bg-[#2F5CF0]/15 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-16 w-64 h-64 rounded-full bg-[#F6C623]/10 blur-[90px]" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.2em] text-white/50 mb-10">
            DIDUKUNG OLEH BERBAGAI BRAND TERPERCAYA
          </p>
        </Reveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-10">
          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={i * 40}>
              <div className="relative h-10 sm:h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={`/brands/${b.file}`}
                  alt={b.name}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
