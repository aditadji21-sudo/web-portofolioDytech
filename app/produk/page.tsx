import { Suspense } from "react";
import { CatalogHeader } from "@/features/produk/CatalogHeader";
import { ProductGrid } from "@/features/produk/ProductGrid";
import { getAllProducts } from "@/lib/getProducts";

export default async function ProdukPage() {
  const products = await getAllProducts();

  return (
    <main>
      {/* CatalogHeader tidak perlu dibungkus karena tidak pakai searchParams */}
      <CatalogHeader />

      {/* ProductGrid WAJIB dibungkus Suspense karena pakai searchParams */}
      <Suspense fallback={<div className="text-center py-20 text-[#667085]">Memuat data produk...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  );
}