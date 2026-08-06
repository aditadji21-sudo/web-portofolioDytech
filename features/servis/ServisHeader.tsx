import { Reveal } from "@/components/ui/Reveal";

export function ServisHeader() {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10 overflow-hidden bg-white border-b border-[#EAECF5]">
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[380px] h-[380px] rounded-full bg-[#F0323B]/8 blur-[110px]" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#F0323B] rounded-full px-3 py-1 mb-3">
            SERVIS
          </span>
          <h1 className="font-display font-semibold text-2xl md:text-[38px] text-[#12162A] tracking-tight max-w-2xl">
            Servis &amp; upgrade, transparan dari awal sampai selesai
          </h1>
          <p className="font-body text-[#667085] mt-3 max-w-lg leading-relaxed text-sm md:text-base">
            Estimasi biaya disampaikan sebelum pengerjaan — tidak ada biaya tersembunyi. Setiap servis dites
            langsung di depan Anda sebelum unit dikembalikan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
