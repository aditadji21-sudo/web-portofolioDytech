import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/getProducts";
import { ProductDetail } from "@/features/produk/ProductDetail";

type Params = { slug: string };

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getAllProducts();
  const product = products.find((p) => p.slug === decodeURIComponent(slug));
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
  const products = await getAllProducts();
  const product = products.find((p) => p.slug === decodeURIComponent(slug));

  if (!product) notFound();

  return <ProductDetail product={product} allProducts={products} />;
}