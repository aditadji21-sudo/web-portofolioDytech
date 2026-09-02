"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const BRANDS = [
  { name: "ASUS", file: "asus.svg", type: "Laptop & Motherboard" },
  { name: "Lenovo", file: "lenovo.svg", type: "Laptop & PC" },
  { name: "Acer", file: "acer.svg", type: "Laptop & Monitor" },
  { name: "HP", file: "hp.svg", type: "Laptop & Printer" },
  { name: "Advan", file: "advan.png", type: "Laptop & Gadget" },
  { name: "Axioo", file: "axioo.png", type: "Laptop & PC" },
  { name: "Epson", file: "epson.svg", type: "Printer & Ink" },
  { name: "Canon", file: "canon3.png", type: "Printer & Scanner" },
  { name: "Brother", file: "brother.png", type: "Printer & Office" },
  { name: "Logitech", file: "logitech.png", type: "Gaming & Office" },
  { name: "Fantech", file: "fantech.png", type: "Gaming Gear" },
  { name: "Rexus", file: "rexus.png", type: "Gaming & Accessories" },
];

export function BrandsStrip() {
  // Duplicate for seamless infinite marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="relative w-full pb-0 overflow-hidden text-white">
      {/* Bridge gradient from light Hero to dark brands section */}
      <div className="w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-[#E8ECF8] via-[#1A1F36] to-[#0C101F]" />

      <div className="relative bg-gradient-to-b from-[#0C101F] to-[#12162A] pt-6 sm:pt-8 md:pt-12">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#2F5CF0]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#F6C623]/10 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 relative z-10 mb-6 sm:mb-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 font-montserrat text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#F6C623] bg-white/5 border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 mb-2.5 sm:mb-3 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6C623] animate-pulse" />
            Official &amp; Authorized Brands
          </div>
          <h2 className="font-montserrat font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
            Didukung Brand Hardware &amp; IT Terpercaya
          </h2>
          <p className="font-body text-[11px] sm:text-xs md:text-sm text-[#8A92B5] max-w-lg mx-auto mt-1.5 sm:mt-2">
            Komponen 100% original bergaransi resmi dari distributor terkemuka untuk performa rakitan maksimal.
          </p>
        </Reveal>
      </div>

      {/* Infinite Seamless Scrolling Marquee Strip */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-3 sm:gap-6 w-max animate-marquee py-3">
          {marqueeBrands.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="group relative flex flex-col items-center justify-center w-28 sm:w-36 md:w-44 h-20 sm:h-24 md:h-28 rounded-xl sm:rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#2F5CF0]/50 transition-all duration-300 px-3 sm:px-4 py-2.5 sm:py-3 shrink-0 shadow-sm hover:shadow-[0_8px_24px_rgba(47,92,240,0.2)] hover:-translate-y-1 backdrop-blur-sm cursor-default"
            >
              {/* Brand Logo */}
              <div className="relative w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-12 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 filter drop-shadow-sm">
                <Image
                  src={`/brands/${b.file}`}
                  alt={b.name}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>

              {/* Brand Category Tag on Hover */}
              <span className="font-montserrat font-semibold text-[8px] sm:text-[9px] text-[#8A92B5] group-hover:text-[#F6C623] tracking-wide mt-1 sm:mt-1.5 transition-colors">
                {b.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse Marquee for Dynamic Multi-Layer Movement */}
      <div className="relative w-full overflow-hidden mt-2 sm:mt-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-3 sm:gap-6 w-max animate-marquee-reverse py-2">
          {marqueeBrands.slice().reverse().map((b, i) => (
            <div
              key={`rev-${b.name}-${i}`}
              className="group relative flex flex-col items-center justify-center w-24 sm:w-32 md:w-40 h-16 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-[#F6C623]/40 transition-all duration-300 px-2.5 sm:px-3 py-2 shrink-0 backdrop-blur-sm hover:-translate-y-1 cursor-default"
            >
              <div className="relative w-14 sm:w-20 md:w-24 h-6 sm:h-8 md:h-10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={`/brands/${b.file}`}
                  alt={b.name}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
              <span className="font-montserrat text-[8px] text-[#8A92B5] group-hover:text-white mt-1 transition-colors">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seamless Flowing Transition from Dark Section to Light Canvas (#F3F5FB) */}
      <div className="relative w-full mt-8 sm:mt-14">
        {/* Soft Ambient Aurora Atmosphere */}
        <div className="pointer-events-none absolute -top-12 inset-x-0 h-36 bg-gradient-to-r from-[#2F5CF0]/30 via-[#F6C623]/35 via-[#F0323B]/30 to-[#5C82FF]/30 blur-3xl animate-gradient-flow animate-aurora" />

        {/* Ambient Pulsing Glow Orbs */}
        <div className="pointer-events-none absolute -top-8 left-1/4 w-80 h-28 rounded-full bg-[#2F5CF0]/25 blur-[80px] animate-pulse-soft" />
        <div className="pointer-events-none absolute -top-8 right-1/4 w-80 h-28 rounded-full bg-[#F6C623]/25 blur-[80px] animate-pulse-soft" />

        {/* Smooth Organic Layered Wave Transition directly flush with the bottom */}
        <div className="relative z-20 w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            className="relative block w-full h-16 sm:h-24 md:h-28 text-[#F3F5FB]"
            viewBox="0 0 1440 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Layer 1: Animated Soft Brand Hue Wave */}
            <path
              d="M0,45 C280,105 480,15 720,60 C960,105 1200,20 1440,65 L1440,140 L0,140 Z"
              fill="url(#brandWaveGrad)"
              opacity="0.3"
              className="animate-wave-slow"
            />

            {/* Layer 2: Intermediate Soft Tint Wave */}
            <path
              d="M0,60 C320,115 540,30 840,75 C1140,120 1320,40 1440,80 L1440,140 L0,140 Z"
              fill="#E1E8F8"
              opacity="0.8"
            />

            {/* Layer 3: Solid Canvas Transition Wave */}
            <path
              d="M0,78 C360,135 620,45 960,92 C1220,130 1360,55 1440,95 L1440,140 L0,140 Z"
              fill="#F3F5FB"
            />

            <defs>
              <linearGradient id="brandWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2F5CF0" />
                <stop offset="40%" stopColor="#F6C623" />
                <stop offset="75%" stopColor="#F0323B" />
                <stop offset="100%" stopColor="#5C82FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      </div>
    </section>
  );
}
