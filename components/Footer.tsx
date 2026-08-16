import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { NAV_LINKS, CATEGORIES, STORE_INFO } from "@/lib/constants";
import Image from "next/image";
import logoWhite from "@/assets/Dytechputih.png"; // Sesuaikan dengan nama file logo putihmu

export function Footer() {
  return (
    <footer className="bg-[#0E1226] text-[#B7BEDB] mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-6">
              <Image
                src={logoWhite}
                alt="Logo DYTECH"
                width={600}
                height={120}
                style={{ width: 'auto', height: '180px' }} // Ketik manual baris ini. Coba angka 150px - 200px
                className="object-contain"
              />
        </div>
          <p className="font-body text-sm leading-relaxed text-[#8A92B5]">
            Toko &amp; servis komputer di Malang. Rakitan PC, laptop, aksesoris, dan servis dengan komponen
            bergaransi.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-white mb-4">Halaman</h4>
          <ul className="font-body text-sm space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-white mb-4">Kategori</h4>
          <ul className="font-body text-sm space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.title}>
                <Link href={`/produk?kategori=${encodeURIComponent(c.title)}`} className="hover:text-white transition-colors">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-white mb-4">Kontak</h4>
          <ul className="font-body text-sm space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-[#F6C623] mt-0.5 shrink-0" />
              <span>{STORE_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#2F5CF0] shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#F0323B] shrink-0" />
              <span>{STORE_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-wide text-[#6E76A0]">
            © 2026 DYTECH COMPUTER. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[11px] tracking-wide text-[#6E76A0]">
            {STORE_INFO.hours.map((h) => `${h.day} ${h.time}`).join("  ·  ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
