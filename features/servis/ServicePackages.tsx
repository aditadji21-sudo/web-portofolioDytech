import { ProductCard } from "@/features/produk/ProductCard";
import { SERVIS } from "@/lib/Servis";
import { Reveal } from "@/components/ui/Reveal";

export function ServicePackages() {
  const services = SERVIS;

  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-12">
          <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#F0323B] rounded-full px-3 py-1 mb-3">
            PAKET SERVIS
          </span>
          <h2 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight">
            Pilih paket sesuai kebutuhan unit Anda
          </h2>
          <p className="font-body text-sm text-[#667085] mt-3">
            Harga jasa di bawah ini belum termasuk sparepart bila ada penggantian komponen.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <ProductCard product={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
