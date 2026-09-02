"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "PC Rakitan Impian",
      "Laptop Bergaransi",
      "Aksesoris & Setup",
      "Servis & Upgrade Cepat",
      "Printer & Office",
      "Audio & Soundbar",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Pusat Kebutuhan IT Malang <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tight text-center font-bold">
              <span>Pusat Kebutuhan IT & Solusi Teknologi Terlengkap di Malang. Temukan </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-[#2F5CF0]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span> di Dytech Computer.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[#667085] max-w-2xl text-center">
              Pusat penjualan komputer, laptop, printer, perangkat AIO, hingga aksesoris original. Nikmati juga layanan servis handal dengan estimasi biaya transparan di awal.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Hubungi Kami <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 bg-[#2F5CF0] text-white">
              Lihat Katalog <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
