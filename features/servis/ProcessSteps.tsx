import { SERVICE_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

const ACCENTS = ["#2F5CF0", "#F6C623", "#F0323B", "#2F5CF0", "#F6C623"];

export function ProcessSteps() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-12">
          <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#2F5CF0] rounded-full px-3 py-1 mb-3">
            ALUR SERVIS
          </span>
          <h2 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight">
            Lima langkah, jelas dari awal
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-[#E7E9F3]" />

          <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative">
            {SERVICE_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold bg-white relative z-10"
                    style={{ color: ACCENTS[i], boxShadow: `0 0 0 4px #FFFFFF, 0 0 0 5px ${ACCENTS[i]}33` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-semibold text-base text-[#12162A] mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-[#667085] leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
