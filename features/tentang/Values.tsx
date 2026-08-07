import { VALUES } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image"; 

export function Values() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-12">
          <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#2F5CF0] rounded-full px-3 py-1 mb-3">
            PRINSIP KAMI
          </span>
          <h2 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight">
            Apa yang bisa kamu harapkan dari kami
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="relative rounded-2xl p-6 bg-[#F7F8FC] border border-[#EAECF5]">
                
                {/* Bagian ini memanggil v.image dari constants.ts */}
                <Image 
                  src={v.image} 
                  alt={v.title} 
                  width={80} 
                  height={80} 
                  className="mb-4"
                />

                <h3 className="font-display font-semibold text-lg text-[#12162A] mb-2">{v.title}</h3>
                <p className="font-body text-sm text-[#667085] leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}