import { Reveal } from "@/components/ui/Reveal";

export function KontakHeader() {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10 overflow-hidden bg-white border-b border-[#EAECF5]">
      <div className="pointer-events-none absolute -top-24 left-1/3 w-[380px] h-[380px] rounded-full bg-[#2F5CF0]/8 blur-[110px]" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#2F5CF0] rounded-full px-3 py-1 mb-3">
            KONTAK
          </span>
          <h1 className="font-display font-semibold text-2xl md:text-[38px] text-[#12162A] tracking-tight max-w-xl">
            Ada yang mau ditanyakan dulu?
          </h1>
          <p className="font-body text-[#667085] mt-3 max-w-lg leading-relaxed text-sm md:text-base">
            Isi form di bawah atau hubungi kami langsung — kami balas secepatnya di jam operasional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
