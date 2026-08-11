"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRightLeft, Cpu } from "lucide-react";
import type { Product } from "@/lib/constants";

// Baris-baris yang dibandingkan. `numeric` dipakai untuk menentukan mana yang lebih tinggi (disorot hijau).
const ROWS: { label: string; key: keyof NonNullable<Product["processor"]>; numeric?: boolean }[] = [
  { label: "Nama Processor", key: "name" },
  { label: "Generasi", key: "generation" },
  { label: "Jumlah Core", key: "cores" },
  { label: "Jumlah Thread", key: "threads", numeric: true },
  { label: "Clock Speed Dasar", key: "baseClock", numeric: true },
  { label: "Clock Speed Turbo", key: "turboClock", numeric: true },
  { label: "Cache", key: "cache", numeric: true },
  { label: "TDP", key: "tdp" },
  { label: "Grafis Terintegrasi", key: "igpu" },
];

function parseLeadingNumber(value: string): number {
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

function ProductSelect({
  label,
  value,
  onChange,
  exclude,
  options,
}: {
  label: string;
  value: string;
  onChange: (slug: string) => void;
  exclude?: string;
  options: Product[];
}) {
  return (
    <div className="flex-1">
      <label className="block font-body text-xs font-semibold text-[#8890A6] mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full font-body text-sm text-[#12162A] bg-white border border-[#E1E4EF] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2F5CF0]/50"
      >
        <option value="">Pilih laptop...</option>
        {options.filter((p) => p.slug !== exclude).map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CompareProcessor({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const comparable = useMemo(
    () => products.filter((p): p is Product & { processor: NonNullable<Product["processor"]> } => Boolean(p.processor)),
    [products]
  );

  const slugA = searchParams.get("a") ?? "";
  const slugB = searchParams.get("b") ?? "";

  const productA = comparable.find((p) => p.slug === slugA);
  const productB = comparable.find((p) => p.slug === slugB);

  const setParam = (key: "a" | "b", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/produk/bandingkan?${params.toString()}`, { scroll: false });
  };

  const winner = useMemo(() => {
    if (!productA || !productB) return {};
    const result: Record<string, "a" | "b" | null> = {};
    for (const row of ROWS) {
      if (!row.numeric) continue;
      const a = parseLeadingNumber(String(productA.processor[row.key]));
      const b = parseLeadingNumber(String(productB.processor[row.key]));
      if (isNaN(a) || isNaN(b) || a === b) {
        result[row.key] = null;
      } else {
        result[row.key] = a > b ? "a" : "b";
      }
    }
    return result;
  }, [productA, productB]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 mb-8">
        <ProductSelect label="Laptop A" value={slugA} onChange={(v) => setParam("a", v)} exclude={slugB} options={comparable} />
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#F3F5FB] text-[#8890A6] shrink-0 mb-1">
          <ArrowRightLeft size={16} />
        </div>
        <ProductSelect label="Laptop B" value={slugB} onChange={(v) => setParam("b", v)} exclude={slugA} options={comparable} />
      </div>

      {(!productA || !productB) && (
        <div className="rounded-2xl border border-dashed border-[#E1E4EF] py-16 px-6 text-center">
          <Cpu size={28} className="mx-auto text-[#C6CADA] mb-3" />
          <p className="font-body text-sm text-[#8890A6]">
            Pilih dua laptop di atas untuk membandingkan spesifikasi processor-nya.
          </p>
        </div>
      )}

      {productA && productB && (
        <div className="rounded-2xl border border-[#EAECF5] overflow-hidden bg-white">
          {/* header nama produk */}
          <div className="grid grid-cols-2 border-b border-[#EAECF5]">
            <div className="p-4 sm:p-5 border-r border-[#EAECF5]">
              <p className="font-display font-semibold text-sm sm:text-base text-[#12162A] leading-snug">
                {productA.name}
              </p>
              <p className="font-body text-xs text-[#8890A6] mt-1">{productA.price}</p>
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-display font-semibold text-sm sm:text-base text-[#12162A] leading-snug">
                {productB.name}
              </p>
              <p className="font-body text-xs text-[#8890A6] mt-1">{productB.price}</p>
            </div>
          </div>

          {/* baris spesifikasi */}
          {ROWS.map((row, i) => {
            const valA = String(productA.processor[row.key]);
            const valB = String(productB.processor[row.key]);
            const win = winner[row.key];
            return (
              <div key={row.key} className={`${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFD]"}`}>
                <p className="font-body text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#8890A6] uppercase px-4 sm:px-5 pt-3">
                  {row.label}
                </p>
                <div className="grid grid-cols-2">
                  <div
                    className={`px-4 sm:px-5 pb-3 pt-1 font-body text-xs sm:text-sm border-r border-[#EAECF5] ${
                      win === "a" ? "text-[#3AA76D] font-semibold" : "text-[#3D4257]"
                    }`}
                  >
                    {valA}
                  </div>
                  <div
                    className={`px-4 sm:px-5 pb-3 pt-1 font-body text-xs sm:text-sm ${
                      win === "b" ? "text-[#3AA76D] font-semibold" : "text-[#3D4257]"
                    }`}
                  >
                    {valB}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
