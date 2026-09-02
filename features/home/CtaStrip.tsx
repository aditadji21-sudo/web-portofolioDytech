import { MapPin, Phone, ShoppingBag } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function CtaStrip() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-10 sm:pb-16">
      <Reveal>
        <div className="max-w-6xl mx-auto relative rounded-2xl sm:rounded-3xl bg-[#0E1226] p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 overflow-hidden shadow-[0_16px_40px_rgba(14,18,38,0.3)] border border-white/10">
          <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#F6C623]/15 blur-[110px]" />
          <div className="pointer-events-none absolute -left-10 -bottom-16 w-56 h-56 rounded-full bg-[#2F5CF0]/20 blur-[100px]" />
          <div className="relative">
            <h3 className="font-montserrat font-bold text-xl sm:text-2xl md:text-[32px] text-white tracking-tight max-w-md">
              Mau rakit PC atau ada unit yang butuh servis?
            </h3>
            <p className="font-body text-[#B7BEDB] mt-2 sm:mt-3 max-w-sm text-[13px] sm:text-sm leading-relaxed">
              Datang langsung ke toko kami atau konsultasi via WhatsApp — tim teknisi kami bantu pilihkan spek terbaik dan estimasi biaya transparan.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-3.5 relative font-body text-[13px] sm:text-sm w-full md:w-auto">
            <span className="inline-flex items-center gap-2.5 text-white/90">
              <MapPin size={16} className="text-[#F6C623] shrink-0" /> {STORE_INFO.address}
            </span>
            <span className="inline-flex items-center gap-2.5 text-white/90">
              <Phone size={16} className="text-[#2F5CF0] shrink-0" /> {STORE_INFO.phone}
            </span>
            <a
              href="/kontak"
              className="mt-1 sm:mt-2 inline-flex items-center justify-center gap-2 px-7 py-3 sm:py-3.5 rounded-full bg-[#F6C623] text-[#12162A] font-montserrat font-bold text-sm hover:bg-[#ffe169] transition-all duration-200 shadow-md active:scale-95 w-full md:w-auto"
            >
              <ShoppingBag size={16} /> Hubungi Kami
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
