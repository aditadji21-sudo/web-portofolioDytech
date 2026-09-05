"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Zap,
  Cpu,
  Shield,
  Layers,
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
  image?: string;
  visualType: "pc-gaming" | "workstation" | "laptop" | "servis";
};

const SLIDES: SlideItem[] = [
  {
    id: "pc-gaming-beast",
    tag: "POPULAR BUILD",
    badgeColor: "#F6C623",
    title: "Dytech TITAN X",
    subtitle: "Custom Gaming & High-FPS Esports Rig",
    specs: [
      "Intel i7 14700KF / Ryzen 7 7800X3D",
      "NVIDIA GeForce RTX 4070 Ti SUPER 16GB",
      "32GB DDR5 6000MHz Dual Channel RGB",
      "1TB NVMe PCIe 4.0 SSD (7000MB/s)",
      "360mm ARGB Liquid AIO Cooler + 850W Gold",
    ],
    price: "Rp 24.850.000",
    priceNote: "Spek bisa disesuaikan budgetmu",
    bgGradient: "from-[#101426] via-[#161D38] to-[#0A0D18]",
    accentColor: "#2F5CF0",
    category: "PC RAKITAN",
    visualType: "pc-gaming",
  },
  {
    id: "pc-workstation-pro",
    tag: "PRO CREATOR",
    badgeColor: "#5C82FF",
    title: "Dytech PRO RENDER",
    subtitle: "Workstation 4K/8K Video, 3D & AI Rendering",
    specs: [
      "AMD Ryzen 9 7900X (12 Core / 24 Thread)",
      "NVIDIA RTX 4080 SUPER 16GB GDDR6X",
      "64GB DDR5 5600MHz High-Speed",
      "2TB NVMe Gen4 + 4TB HDD Storage",
      "Ultra-Quiet Thermal Design & 1000W Platinum",
    ],
    price: "Rp 34.500.000",
    priceNote: "Kompilasi & Render super kencang",
    bgGradient: "from-[#141226] via-[#1F1738] to-[#0A0D18]",
    accentColor: "#9353D3",
    category: "WORKSTATION",
    visualType: "workstation",
  },
  {
    id: "laptop-gaming-deal",
    tag: "READY STOCK",
    badgeColor: "#F0323B",
    title: "LENOVO LOQ & ASUS TUF",
    subtitle: "Laptop Gaming & Kuliah Performa Tinggi",
    specs: [
      "AMD Ryzen 7 7435HS / Intel Core i7",
      "NVIDIA RTX 4060 8GB (Full TGP)",
      "16GB DDR5 Dual Channel Upgradable",
      "512GB NVMe SSD + 1 Slot Kosong",
      "15.6\" 144Hz IPS 100% sRGB Display",
    ],
    price: "Rp 15.499.000",
    priceNote: "Garansi Resmi 2 Tahun + Free Mouse",
    bgGradient: "from-[#1A1212] via-[#2D1619] to-[#0A0D18]",
    accentColor: "#F0323B",
    category: "LAPTOP",
    visualType: "laptop",
  },
  {
    id: "service-upgrade-center",
    tag: "SERVIS CEPAT",
    badgeColor: "#17C964",
    title: "EXPRESS SERVIS & UPGRADE",
    subtitle: "Diagnosa Transparan & Estimasi Jelas di Awal",
    specs: [
      "Upgrade SSD & Tambah RAM (15 Menit Jadi)",
      "Deep Cleaning Motherboard, Fan & Heatsink",
      "Repasting Thermal Grizzly / Noctua High-End",
      "Install Ulang OS + Optimasi Gaming Driver",
      "Semua Pengerjaan Dilengkapi Garansi Servis",
    ],
    price: "Mulai Rp 50.000",
    priceNote: "Estimasi biaya disampaikan di awal",
    bgGradient: "from-[#0F1C18] via-[#132A24] to-[#0A0D18]",
    accentColor: "#17C964",
    category: "SERVIS & UPGRADE",
    visualType: "servis",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
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
    `Halo Dytech Computer, saya tertarik dengan paket [${slide.title} - ${slide.category}] di Carousel. Mau tanya info detail dan konsultasi budget.`
  )}`;

  // Touch Handlers for Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] mx-auto select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer Ambient Glowing Backdrop */}
      <div
        className="absolute -inset-2 rounded-[32px] opacity-40 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${slide.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Instagram Portrait Card Frame (1080 x 1350 -> exact 4:5 Aspect Ratio) */}
      <div className="relative w-full aspect-[4/5] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/15 bg-[#0A0D18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between backdrop-blur-xl">
        
        {/* Instagram Post Header Bar */}
        <div className="relative z-20 px-3.5 sm:px-5 pt-3 sm:pt-4 pb-2 sm:pb-2.5 flex items-center justify-between border-b border-white/10 bg-[#06070B]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            {/* Dytech Avatar with Instagram-style Story Gradient Ring */}
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#F6C623] via-[#F0323B] to-[#2F5CF0] flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0E1226] flex items-center justify-center">
                <Image
                  src={logoOri}
                  alt="Dytech Computer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-montserrat font-bold text-xs text-white">
                  dytech.computer
                </span>
                <span className="w-3 h-3 rounded-full bg-[#2F5CF0] flex items-center justify-center text-[8px] text-white">
                  ✓
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#8A92B5] block -mt-0.5">
                Malang, Jawa Timur
              </span>
            </div>
          </div>

          {/* 1080 x 1350 Ratio & Slide Indicator Badge */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#C7CCE2] border border-white/10">
              1080 × 1350
            </span>
            <span className="font-mono text-[11px] font-bold text-[#F6C623]">
              {current + 1}/{SLIDES.length}
            </span>
          </div>
        </div>

        {/* Slide Body / Visual Showcase */}
        <div className="relative z-10 flex-1 px-4 sm:px-6 py-3 sm:py-4 flex flex-col justify-between overflow-hidden">
          {/* Background Gradient Mesh */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${slide.bgGradient} opacity-90 transition-all duration-700`}
          />

          {/* Dynamic Graphic Tech Elements based on Visual Type */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute right-0 top-10 w-48 h-48 rounded-full border border-white/20 border-dashed animate-[spin_30s_linear_infinite]" />
            <div className="absolute left-6 bottom-16 w-32 h-32 rounded-full border border-white/10" />
          </div>

          {/* Top Tag & Category */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 font-montserrat font-bold text-[10px] sm:text-[11px] px-3 py-1 rounded-full text-[#0A0D18] shadow-sm uppercase tracking-wider"
              style={{ backgroundColor: slide.badgeColor }}
            >
              <Sparkles size={11} /> {slide.tag}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-white/60 uppercase">
              {slide.category}
            </span>
          </div>

          {/* Title, Subtitle, & Visual Icon Badge */}
          <div className="relative z-10 my-auto py-2">
            <div className="flex items-center gap-2 mb-1.5">
              {slide.visualType === "pc-gaming" && (
                <Cpu className="text-[#F6C623] shrink-0" size={20} />
              )}
              {slide.visualType === "workstation" && (
                <Layers className="text-[#5C82FF] shrink-0" size={20} />
              )}
              {slide.visualType === "laptop" && (
                <Zap className="text-[#F0323B] shrink-0" size={20} />
              )}
              {slide.visualType === "servis" && (
                <Shield className="text-[#17C964] shrink-0" size={20} />
              )}
              <h3 className="font-montserrat font-black text-xl sm:text-2xl text-white tracking-tight leading-tight">
                {slide.title}
              </h3>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#B7BEDB]">
              {slide.subtitle}
            </p>

            {/* Hardware Specs Bullet List */}
            <div className="mt-3.5 space-y-1.5 bg-black/30 border border-white/10 rounded-2xl p-3 sm:p-3.5 backdrop-blur-sm">
              {slide.specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-left">
                  <CheckCircle2
                    size={13}
                    className="shrink-0 mt-0.5"
                    style={{ color: slide.badgeColor }}
                  />
                  <span className="font-body text-[11px] sm:text-xs text-white/90 leading-tight">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & CTA Action Bar */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-wider text-[#8A92B5] uppercase block">
                  Estimasi Harga
                </span>
                <span className="font-montserrat font-extrabold text-lg sm:text-xl text-white">
                  {slide.price}
                </span>
              </div>
              <span className="font-body text-[10px] text-[#8A92B5] text-right">
                {slide.priceNote}
              </span>
            </div>

            {/* Direct WhatsApp Consultation Button */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2F5CF0] hover:bg-[#2045cc] text-white font-montserrat font-bold text-xs transition-all duration-200 shadow-md active:scale-95"
              >
                <MessageCircle size={14} /> Konsultasi Spek
              </a>
              <Link
                href={slide.visualType === "servis" ? "/servis" : "/produk"}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-montserrat font-semibold text-xs border border-white/15 transition-all duration-200"
              >
                Lihat Katalog <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Auto-play Progress */}
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
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
