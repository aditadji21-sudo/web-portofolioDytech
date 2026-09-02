import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { STORE_INFO } from "@/lib/constants";
import { HeroCarousel } from "@/features/home/HeroCarousel";

const BADGES = [
  { icon: Truck, label: "Gratis Ongkir", sub: "Area Malang Kota", color: "#2F5CF0" },
  { icon: ShieldCheck, label: "Garansi Resmi", sub: "100% Komponen Original", color: "#F0323B" },
  { icon: MessageCircle, label: "Konsultasi Gratis", sub: "Tanya spek sesuai budget", color: "#F6C623" },
];

export function Hero() {
  const waUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
    "Halo DYTECH Computer, saya ingin konsultasi rakit PC / cari laptop / tanya servis."
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#F3F5FB] to-[#E8ECF8]">
      {/* Soft ambient blobs — using DESIGN.md primary-fixed-dim (#b4c5ff) tones */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-[#DBE1FF]/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#FFE083]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-[#B4C5FF]/25 blur-[100px]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-14 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Prop, CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 font-montserrat text-[11px] font-semibold tracking-[0.12em] text-[#2F5CF0] bg-[#DBE1FF]/50 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F5CF0]" />
                TOKO & SERVIS KOMPUTER — MALANG
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="font-montserrat font-bold text-[32px] leading-[1.14] sm:text-[42px] md:text-[50px] text-[#12162A] tracking-tight">
                Rakit PC impianmu,
                <br />
                harga jujur, servis{" "}
                <span className="text-[#2F5CF0]">
                  transparan.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="font-body text-[#667085] text-sm sm:text-base md:text-[17px] mt-4 sm:mt-5 max-w-xl leading-relaxed">
                Custom build PC gaming &amp; workstation, laptop baru bergaransi resmi, aksesoris setup, serta servis teknisi terpercaya di Malang. Estimasi biaya disampaikan jelas di awal sebelum pengerjaan.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-8">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#2F5CF0] text-white font-montserrat font-semibold text-sm hover:bg-[#244bd6] transition-colors"
                >
                  Lihat Katalog <ArrowRight size={16} />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-[#12162A] font-montserrat font-medium text-sm border border-[#E2E8F0] hover:border-[#B4C5FF] hover:bg-[#F3F5FB] transition-colors"
                >
                  <MessageCircle size={16} className="text-[#2F5CF0]" /> Konsultasi Gratis
                </a>
              </div>
            </Reveal>

            {/* Quick Trust Highlights under CTA */}
            <Reveal delay={220}>
              <div className="flex items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-[#E2E8F0] text-xs text-[#8890A6] font-body">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17C964]" />
                  <span>Teknisi Berpengalaman</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F5CF0]" />
                  <span>Garansi Resmi &amp; Toko</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C623]" />
                  <span>Bisa COD Malang Kota</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Instagram Portrait Carousel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal delay={150} className="w-full max-w-[440px]">
              <HeroCarousel />
            </Reveal>
          </div>

        </div>

        {/* Feature Badges */}
        <Reveal delay={260}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-12 sm:mt-14 pt-8 border-t border-[#E2E8F0]">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3.5 rounded-xl px-4 sm:px-5 py-4 bg-white/70 border border-[#E2E8F0] hover:bg-white transition-colors"
              >
                <div
                  className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${b.color}14` }}
                >
                  <b.icon size={20} style={{ color: b.color }} />
                </div>
                <div className="min-w-0">
                  <p className="font-montserrat font-semibold text-xs sm:text-sm text-[#12162A] truncate">{b.label}</p>
                  <p className="font-body text-[11px] sm:text-xs text-[#8890A6] truncate mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
