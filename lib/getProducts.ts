import { ALL_PRODUCTS as STATIC_PRODUCTS } from "./all-products";
import type { Product, Processor } from "./constants";

// Isi SHEET_ID & SHEET_NAME di file .env.local (lihat .env.local.example).
// Kalau belum di-set, web otomatis pakai data statis di /lib sebagai fallback
// supaya website tetap jalan normal.
const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || "Produk";

type SheetRow = Record<string, string>;

function splitList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toProduct(row: SheetRow): Product | null {
  if (!row.slug?.trim() || !row.name?.trim()) return null;

  const processor: Processor | undefined = row.processor_name?.trim()
    ? {
        name: row.processor_name,
        brand: row.processor_brand === "AMD" ? "AMD" : "Intel",
        generation: row.processor_generation ?? "",
        cores: row.processor_cores ?? "",
        threads: row.processor_threads ?? "",
        baseClock: row.processor_baseClock ?? "",
        turboClock: row.processor_turboClock ?? "",
        cache: row.processor_cache ?? "",
        tdp: row.processor_tdp ?? "",
        igpu: row.processor_igpu ?? "",
      }
    : undefined;

  return {
    slug: row.slug.trim(),
    name: row.name.trim(),
    category: row.category?.trim() ?? "",
    price: row.price?.trim() ?? "",
    specs: splitList(row.specs),
    badge: row.badge?.trim() || undefined,
    image: row.image?.trim() || undefined,
    images: row.images ? splitList(row.images) : undefined,
    description: row.description?.trim() || undefined,
    stock: row.stock?.trim() || undefined,
    sku: row.sku?.trim() || undefined,
    processor,
  };
}

/**
 * Ambil semua data produk dari Google Sheets lewat opensheet.elk.sh.
 * Pakai Next.js fetch cache dengan revalidate 60 detik (ISR) — jadi perubahan
 * di spreadsheet otomatis muncul di web dalam ~1 menit, tanpa perlu redeploy.
 *
 * Kalau SHEET_ID belum di-set atau fetch gagal (sheet privat, salah nama tab,
 * dsb), otomatis fallback ke data statis di /lib supaya web tidak rusak.
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!SHEET_ID) return STATIC_PRODUCTS;

  try {
    const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`opensheet merespons status ${res.status}`);

    const rows = (await res.json()) as SheetRow[];
    const products = rows.map(toProduct).filter((p): p is Product => p !== null);

    return products.length > 0 ? products : STATIC_PRODUCTS;
  } catch (err) {
    console.error("[getAllProducts] Gagal ambil data dari spreadsheet, pakai data statis sebagai fallback:", err);
    return STATIC_PRODUCTS;
  }
}
