import Link from "next/link";
import { Cpu, Laptop2, MousePointerClick, Wrench, Printer, Speaker, HardDrive, Camera, Monitor } from "lucide-react";
import { CATEGORIES, type Category } from '@/lib/constants';
import { getAllProducts } from '@/lib/getProducts';
import { Reveal } from "@/components/ui/Reveal";

const ICONS = {
  cpu: Cpu,
  laptop: Laptop2,
  mouse: MousePointerClick,
  wrench: Wrench,
  printer: Printer,
  speaker: Speaker,
  ssd: HardDrive,
  cctv: Camera,
  aio: Monitor,
};

function CategoryCircle({ item, count, delay }: { item: Category; count: number; delay: number }) {
  const Icon = ICONS[item.icon];

  return (
    <Reveal delay={delay}>
      <Link
        href={`/produk?kategori=${encodeURIComponent(item.title)}`}
        className="group flex flex-col items-center text-center gap-3 transition-transform duration-300"
      >
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-[3px] sm:border-4 border-white shadow-[0_4px_16px_rgba(18,22,42,0.08)] group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_28px_rgba(18,22,42,0.16)] transition-all duration-300 relative overflow-hidden"
          style={{ backgroundColor: item.accent }}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          <Icon size={24} className="text-white relative z-10 transition-transform duration-300 group-hover:scale-110 sm:hidden" strokeWidth={1.8} />
          <Icon size={30} className="text-white relative z-10 transition-transform duration-300 group-hover:scale-110 hidden sm:block" strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-montserrat font-bold text-xs sm:text-sm text-[#12162A] group-hover:text-[#2F5CF0] transition-colors">{item.title}</p>
          <p className="font-mono text-[10px] sm:text-[11px] text-[#8890A6] mt-0.5">{count} produk</p>
        </div>
      </Link>
    </Reveal>
  );
}

export async function Categories() {
  const products = await getAllProducts();

  return (
    <section id="kategori" className="relative px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 overflow-hidden bg-[#EAF0FF] rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-8">
      <div className="pointer-events-none absolute -top-10 -left-16 w-64 h-64 rounded-full bg-[#2F5CF0]/20 blur-[80px]" />
      <div className="pointer-events-none absolute top-1/2 -right-16 w-56 h-56 rounded-full bg-[#F6C623]/25 blur-[80px]" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal className="flex items-end justify-between mb-8 sm:mb-10 md:mb-12">
          <div>
            <span className="inline-block font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-white bg-[#2F5CF0] rounded-full px-3 sm:px-3.5 py-1 mb-2.5 sm:mb-3 shadow-sm uppercase">
              KATEGORI
            </span>
            <h2 className="font-montserrat font-extrabold text-xl sm:text-2xl md:text-[32px] text-[#12162A] tracking-tight">
              Belanja Per Kategori
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-y-6 sm:gap-y-10 gap-x-3 sm:gap-x-6 max-w-3xl mx-auto">
          {CATEGORIES.map((c, i) => {
            const count = products.filter((p) => p.category === c.title).length;
            return <CategoryCircle key={c.title} item={c} count={count} delay={i * 70} />;
          })}
        </div>
      </div>
    </section>
  );
}
