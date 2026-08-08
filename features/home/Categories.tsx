import Link from "next/link";
import { Cpu, Laptop2, MousePointerClick, Wrench } from "lucide-react";
import { CATEGORIES, type Category } from '@/lib/constants';
import { ALL_PRODUCTS } from '@/lib/all-products';
import { Reveal } from "@/components/ui/Reveal";

const ICONS = { cpu: Cpu, laptop: Laptop2, mouse: MousePointerClick, wrench: Wrench };

function CategoryCircle({ item, delay }: { item: Category; delay: number }) {
  const Icon = ICONS[item.icon];
  const count = ALL_PRODUCTS.filter((p) => p.category === item.title).length;

  return (
    <Reveal delay={delay}>
      <Link
        href={`/produk?kategori=${encodeURIComponent(item.title)}`}
        className="group flex flex-col items-center text-center gap-3"
      >
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_16px_rgba(18,22,42,0.08)] group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(18,22,42,0.12)] transition-all duration-300"
          style={{ backgroundColor: item.accent }}
        >
          <Icon size={30} className="text-white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-[#12162A]">{item.title}</p>
          <p className="font-mono text-[11px] text-[#8890A6]">{count} produk</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function Categories() {
  return (
    <section id="kategori" className="px-4 sm:px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="inline-block font-body text-xs font-bold tracking-wide text-white bg-[#2F5CF0] rounded-full px-3 py-1 mb-3">
              KATEGORI
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-[32px] text-[#12162A] tracking-tight">
              Belanja per kategori
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
          {CATEGORIES.map((c, i) => (
            <CategoryCircle key={c.title} item={c} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
