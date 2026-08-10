import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/all-products";
import { ProductDetail } from "@/features/produk/ProductDetail";

type Params = { slug: string };

function findProduct(slug: string) {
  const decoded = decodeURIComponent(slug);
  return ALL_PRODUCTS.find((p) => p.slug === decoded);
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Produk tidak ditemukan — DYTECH Computer" };

  return {
    title: `${product.name} — DYTECH Computer`,
    description: product.description ?? product.specs.join(", "),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
