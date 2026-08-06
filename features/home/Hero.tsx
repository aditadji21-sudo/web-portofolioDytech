import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, BadgePercent } from "lucide-react";
import heroBanner from "@/assets/Dytech-Banner.svg";
import { Reveal } from "@/components/ui/Reveal";

const BADGES = [
  { icon: Truck, label: "Gratis Ongkir", sub: "Area Malang Kota" },
  { icon: ShieldCheck, label: "Garansi Resmi", sub: "Komponen bergaransi" },
  { icon: BadgePercent, label: "Cicilan 0%", sub: "Tenor s.d. 12 bulan" },
];

export function Hero() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#06070B] min-h-[440px] md:min-h-[500px]">
            <Image
              src={heroBanner}
              alt="Promo rakitan PC dan laptop DYTECH Computer"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06070B] via-[#06070B]/75 to-transparent" />

            <div className="relative px-7 py-12 md:px-14 md:py-20 max-w-xl">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#F6C623] border border-[#F6C623]/30 rounded-full px-3 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C623] animate-pulse-soft" />
                TOKO &amp; SERVIS KOMPUTER — MALANG
              </span>

              <h1 className="font-display font-semibold text-[32px] leading-[1.12] sm:text-[40px] md:text-[52px] text-white tracking-tight">
                Rakit PC impianmu,
                <br />
                harga jujur, servis{" "}
                <span className="bg-gradient-to-r from-[#F6C623] via-[#8AA3FF] to-[#F0323B] bg-clip-text text-transparent">
                  transparan.
                </span>
              </h1>

              <p className="font-body text-[#C7CCE2] text-sm md:text-base mt-5 max-w-md leading-relaxed">
                Custom build, laptop, aksesoris, dan servis dengan komponen bergaransi — estimasi biaya
                disampaikan di awal, sebelum unit disentuh teknisi.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F6C623] text-[#12162A] font-body font-semibold text-sm hover:bg-white transition-colors duration-200"
                >
                  Lihat Katalog <ArrowRight size={15} />
                </Link>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors duration-200"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 sm:gap-3 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3.5 sm:py-4 shadow-[0_1px_2px_rgba(18,22,42,0.06)]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#2F5CF0]/10 flex items-center justify-center">
                  <b.icon size={16} className="text-[#2F5CF0]" />
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-[12px] sm:text-sm text-[#12162A] truncate">{b.label}</p>
                  <p className="font-body text-[10px] sm:text-xs text-[#8890A6] truncate">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
