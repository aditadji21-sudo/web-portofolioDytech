import { MapPin, Phone, ShoppingBag } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function CtaStrip() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-20">
      <Reveal>
        <div className="max-w-6xl mx-auto relative rounded-2xl md:rounded-3xl bg-[#0E1226] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#F6C623]/15 blur-[110px]" />
          <div className="pointer-events-none absolute -left-10 -bottom-16 w-56 h-56 rounded-full bg-[#2F5CF0]/20 blur-[100px]" />
          <div className="relative">
            <h3 className="font-display font-semibold text-2xl md:text-[32px] text-white tracking-tight max-w-md">
              Mau rakit PC atau ada unit yang butuh servis?
            </h3>
            <p className="font-body text-[#B7BEDB] mt-3 max-w-sm text-sm">
              Datang langsung atau konsultasi dulu — tim kami bantu tentukan spek dan estimasi biaya.
            </p>
          </div>
          <div className="flex flex-col gap-3 relative font-body text-sm">
            <span className="inline-flex items-center gap-2 text-white">
              <MapPin size={15} className="text-[#F6C623]" /> {STORE_INFO.address}
            </span>
            <span className="inline-flex items-center gap-2 text-white">
              <Phone size={15} className="text-[#2F5CF0]" /> {STORE_INFO.phone}
            </span>
            <a
              href="/kontak"
              className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F6C623] text-[#12162A] font-semibold hover:bg-white transition-colors duration-200"
            >
              <ShoppingBag size={15} /> Hubungi Kami
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
