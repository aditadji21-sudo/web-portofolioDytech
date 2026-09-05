"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import type { Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// All images from public/testimoni folder
const testimonials: Testimonial[] = [
  { image: "/testimoni/Advan.png", alt: "Testimoni pembelian Advan" },
  { image: "/testimoni/Legion1.jpeg", alt: "Testimoni Lenovo Legion" },
  { image: "/testimoni/alcatrox.png", alt: "Testimoni Alcatrox" },
  { image: "/testimoni/asustuf.png", alt: "Testimoni ASUS TUF" },
  { image: "/testimoni/asustuf1.png", alt: "Testimoni ASUS TUF 2" },
  { image: "/testimoni/laptopadvan.png", alt: "Testimoni laptop Advan" },
  { image: "/testimoni/laptoplenovo.png", alt: "Testimoni laptop Lenovo" },
  { image: "/testimoni/laptoplenovoasus.png", alt: "Testimoni laptop Lenovo ASUS" },
  { image: "/testimoni/legion2.jpeg", alt: "Testimoni Legion 2" },
  { image: "/testimoni/printerepsonl3211.png", alt: "Testimoni printer Epson L3211" },
  { image: "/testimoni/printerepsonl3251.png", alt: "Testimoni printer Epson L3251" },
  { image: "/testimoni/printerhp.png", alt: "Testimoni printer HP" },
  { image: "/testimoni/printerhp583.png", alt: "Testimoni printer HP 583" },
  { image: "/testimoni/proyektorepson.png", alt: "Testimoni proyektor Epson" },
  { image: "/testimoni/samsungmonitor.png", alt: "Testimoni Samsung monitor" },
];

// Desktop: 3 columns (5 items each)
const col1Desktop = testimonials.slice(0, 5);
const col2Desktop = testimonials.slice(5, 10);
const col3Desktop = testimonials.slice(10, 15);

// Mobile & Tablet: 2 columns (all 15 items distributed: 8 and 7)
const col1Mobile = testimonials.filter((_, i) => i % 2 === 0);
const col2Mobile = testimonials.filter((_, i) => i % 2 !== 0);

export function Testimonials() {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#F2F6FE] via-[#E7EEFD] to-[#F1F5FD] border-y border-[#D6E2FA]/80">
      {/* Subtle Tech Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(47,92,240,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,92,240,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_40%,transparent_100%)] opacity-80" />

      {/* Central Spotlight Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_65%)]" />

      {/* Vibrant Ambient Glow Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-[520px] h-[520px] rounded-full bg-[#2F5CF0]/18 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-[#F6C623]/16 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-[420px] h-[420px] rounded-full bg-[#4F46E5]/12 blur-[110px]" />

      {/* Decorative Tech Rings & Accents */}
      <div className="pointer-events-none absolute top-10 -left-12 w-64 h-64 rounded-full border border-[#2F5CF0]/12 border-dashed" />
      <div className="pointer-events-none absolute top-16 -left-6 w-52 h-52 rounded-full border border-[#2F5CF0]/10" />
      <div className="pointer-events-none absolute bottom-12 -right-16 w-80 h-80 rounded-full border border-[#F6C623]/15 border-dashed" />
      <div className="pointer-events-none absolute bottom-20 -right-8 w-64 h-64 rounded-full border border-[#2F5CF0]/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-[#C89400] bg-white/90 backdrop-blur-md border border-[#F6C623]/40 shadow-sm shadow-[#F6C623]/10 rounded-full px-4 py-1.5 mb-4 uppercase">
            <Star size={13} className="fill-[#F6C623] text-[#F6C623]" />
            TESTIMONI PELANGGAN
          </span>

          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0E1226] tracking-tight">
            Dipercaya Ribuan Pelanggan
          </h2>

          <p className="font-body text-[#53607E] text-[13px] sm:text-sm md:text-base mt-3 max-w-md leading-relaxed font-medium">
            Lihat langsung testimoni asli dari pelanggan yang sudah berbelanja dan servis di Dytech Computer.
          </p>
        </motion.div>

        {/* Mobile & Tablet Layout (2 Columns, includes all 15 testimonials) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex lg:hidden justify-center gap-3.5 sm:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[500px] sm:max-h-[620px] overflow-hidden px-1"
        >
          <TestimonialsColumn
            testimonials={col1Mobile}
            duration={55}
            className="flex-1 max-w-[190px] sm:max-w-none sm:w-[280px]"
          />
          <TestimonialsColumn
            testimonials={col2Mobile}
            duration={60}
            className="flex-1 max-w-[190px] sm:max-w-none sm:w-[280px]"
          />
        </motion.div>

        {/* Desktop Layout (3 Columns, 5 items each) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden lg:flex justify-center gap-6 sm:gap-7 md:gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] sm:max-h-[720px] md:max-h-[800px] overflow-hidden"
        >
          <TestimonialsColumn
            testimonials={col1Desktop}
            duration={46}
            className="w-[300px]"
          />
          <TestimonialsColumn
            testimonials={col2Desktop}
            duration={55}
            className="w-[300px]"
          />
          <TestimonialsColumn
            testimonials={col3Desktop}
            duration={50}
            className="w-[300px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
