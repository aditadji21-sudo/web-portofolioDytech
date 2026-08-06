import type { Metadata } from "next";
import { CatalogHeader } from "@/features/produk/CatalogHeader";
import { ProductGrid } from "@/features/produk/ProductGrid";

export const metadata: Metadata = {
  title: "Produk & Layanan — DYTECH Computer",
  description: "Katalog PC rakitan, laptop, aksesoris, dan paket servis DYTECH Computer.",
};

export default function ProdukPage() {
  return (
    <>
      <CatalogHeader />
      <ProductGrid />
    </>
  );
}
