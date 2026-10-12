"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { STORE_INFO } from "@/lib/constants";
import logoOri from "@/assets/dytech ori.png";

type SlideItem = {
  id: string;
  tag: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  specs: string[];
  price: string;
  priceNote: string;
  bgGradient: string;
  accentColor: string;
  category: string;
  visualType: "pc-gaming" | "workstation" | "laptop" | "servis";
};

const SLIDES: SlideItem[] = [
  {
    id: "pc-gaming-beast",
    tag: "Rakit PC",
    badgeColor: "#F6C623",
    title: "Dytech TITAN X",
    subtitle: "Custom Gaming & Esports Rig",
    specs: [
      "Intel i7 14700KF / Ryzen 7 7800X3D",
      "RTX 4070 Ti SUPER 16GB",
      "32GB DDR5 6000MHz RGB",
      "1TB NVMe PCIe 4.0 SSD (7000MB/s)",
    ],
    price: "Rp 24.850.000",
    priceNote: "Bisa disesuaikan budgetmu",
    bgGradient: "from-[#1A1D2E] via-[#161938] to-[#0A0D18]",
    accentColor: "#F6C623",
    category: "PC RAKITAN",
    visualType: "pc-gaming",
  },
  {
    id: "pc-workstation-pro",
    tag: "Pro Creator",
    badgeColor: "#5C82FF",
    title: "Dytech PRO RENDER",
    subtitle: "Workstation 4K/8K Video & 3D Rendering",
    specs: [
      "AMD Ryzen 9 7900X (12 Core)",
      "RTX 4080 SUPER 16GB GDDR6X",
      "64GB DDR5 5600MHz",
      "2TB NVMe Gen4 + 4TB HDD",
    ],
    price: "Rp 34.500.000",
    priceNote: "Kompilasi & render super kencang",
    bgGradient: "from-[#141226] via-[#1F1738] to-[#0A0D18]",
    accentColor: "#5C82FF",
    category: "WORKSTATION",
    visualType: "workstation",
  },
  {
    id: "laptop-gaming-deal",
    tag: "Ready Stock",
    badgeColor: "#F0323B",
    title: "Lenovo LOQ & ASUS TUF",
    subtitle: "Laptop Gaming & Kuliah Performa Tinggi",
    specs: [
      "Ryzen 7 7435HS / Intel Core i7",
      "RTX 4060 8GB (Full TGP)",
      "16GB DDR5 Dual Channel",
      "512GB NVMe SSD + slot kosong",
    ],
    price: "Rp 15.499.000",
    priceNote: "Garansi Resmi 2 Tahun",
    bgGradient: "from-[#1A1212] via-[#2D1619] to-[#0A0D18]",
    accentColor: "#F0323B",
    category: "LAPTOP",
    visualType: "laptop",
  },
  {
    id: "service-upgrade-center",
    tag: "Servis Cepat",
    badgeColor: "#17C964",
    title: "Express Servis & Upgrade",
    subtitle: "Diagnosa Transparan, Estimasi Jelas di Awal",
    specs: [
      "Upgrade SSD & Tambah RAM (15 Menit)",
      "Deep Cleaning Motherboard & Fan",
      "Repasting Thermal High-End",
      "Install OS + Optimasi Driver",
    ],
    price: "Mulai Rp 50.000",
    priceNote: "Estimasi biaya di awal",
    bgGradient: "from-[#0F1C18] via-[#132A24] to-[#0A0D18]",
    accentColor: "#17C964",
    category: "SERVIS",
    visualType: "servis",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const slide = SLIDES[current];

  const waConsultUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
    `Halo Dytech Computer, saya tertarik dengan [${slide.title}] di halaman utama. Mau tanya info detail.`
  )}`;

  return (
    <div
      className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] mx-auto select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer ambient glow — one focused accent */}
      <div
        className="absolute -inset-2 rounded-[32px] opacity-40 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${slide.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Card Frame */}
      <div className="relative w-full aspect-[4/5] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/15 bg-[#0A0D18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between backdrop-blur-xl">
        
        {/* Header Bar — clean, no clutter */}
        <div className="relative z-20 px-4 sm:px-5 pt-3 sm:pt-4 pb-2.5 flex items-center justify-between border-b border-white/10 bg-[#06070B]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            {/* Dytech Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#0E1226] flex items-center justify-center shrink-0">
              <Image
                src={logoOri}
                alt="Dytech Computer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-montserrat font-bold text-xs text-white block leading-tight">
                Dytech Computer
              </span>
              <span className="font-body text-[9px] text-[#8A92B5] block -mt-0.5">
                Malang, Jawa Timur
              </span>
            </div>
          </div>

          <span className="font-mono text-[11px] font-bold text-[#F6C623]">
            {current + 1}/{SLIDES.length}
          </span>
        </div>

        {/* Slide Body — content focused */}
        <div className="relative z-10 flex-1 px-4 sm:px-6 py-3 sm:py-5 flex flex-col justify-between overflow-hidden">
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${slide.bgGradient} opacity-90 transition-all duration-700`}
          />

          {/* Top Tag & Category */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span
              className="font-montserrat font-bold text-[10px] px-3 py-1 rounded-full text-[#0A0D18] uppercase tracking-wider"
              style={{ backgroundColor: slide.badgeColor }}
            >
              {slide.tag}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-white/60 uppercase">
              {slide.category}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="relative z-10 py-2">
            <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight mb-1">
              {slide.title}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#B7BEDB]">
              {slide.subtitle}
            </p>

            {/* Specs — clean list */}
            <div className="mt-3.5 space-y-1.5 bg-black/30 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              {slide.specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-left">
                  <CheckCircle2
                    size={12}
                    className="shrink-0 mt-0.5"
                    style={{ color: slide.badgeColor }}
                  />
                  <span className="font-body text-[11px] text-white/90 leading-tight">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[9px] tracking-wider text-[#8A92B5] uppercase block mb-0.5">
                Estimasi Harga
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-montserrat font-extrabold text-lg sm:text-xl text-white">
                {slide.price}
              </span>
              <span className="font-body text-[10px] text-[#8A92B5]">
                {slide.priceNote}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#2F5CF0] hover:bg-[#2045cc] text-white font-montserrat font-bold text-xs transition-all duration-200 active:scale-95"
              >
                <MessageCircle size={14} /> Konsultasi Spek
              </a>
              <Link
                href={slide.visualType === "servis" ? "/servis" : "/produk"}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-montserrat font-semibold text-xs border border-white/15 transition-all duration-200"
              >
                Lihat Katalog <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Indicator dots — minimal */}
        <div className="relative z-20 px-5 py-2.5 bg-[#06070B]/80 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-1">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx
                    ? "w-7 bg-[#F6C623]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
