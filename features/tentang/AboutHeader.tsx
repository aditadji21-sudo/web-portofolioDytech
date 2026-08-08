import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function AboutHeader() {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10 overflow-hidden bg-white border-b border-[#EAECF5]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative">
        <Reveal>
          <span className="inline-block font-body text-xs font-bold tracking-wide text-[#12162A] bg-[#F6C623] rounded-full px-3 py-1 mb-3">
            TENTANG KAMI
          </span>
          <h1 className="font-display font-semibold text-2xl md:text-[38px] text-[#12162A] tracking-tight">
            Toko komputer yang jujur soal spek dan harga
          </h1>
          <p className="font-body text-[#667085] mt-3 max-w-lg leading-relaxed text-sm md:text-base">
            DYTECH Computer berawal dari meja servis kecil di Malang. Sekarang kami merakit PC, menjual laptop
            & aksesoris, dan menangani servis — dengan prinsip yang sama sejak awal: jelaskan dulu, baru kerjakan.
          </p>
        </Reveal>

        {/* 2. Ini bagian kanan yang kita ganti jadi Image */}
        <Reveal delay={150} className="flex justify-center md:justify-end">
          <Image
            src="/dytech uhuy.png" // <-- Ganti dengan nama file gambarmu yang ada di folder public
            alt="DYTECH Computer"
            width={1000} // Sesuaikan lebar gambarnya di sini
            height={1000} // Sesuaikan tinggi gambarnya di sini
            className="rounded-3xl object-cover shadow-xl"
          />
        </Reveal>
      </div>
    </section>
  );
}