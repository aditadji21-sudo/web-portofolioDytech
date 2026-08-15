import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getAllProducts } from "@/lib/getProducts";
import "./globals.css";

export const metadata: Metadata = {
  title: "DYTECH Computer — Toko & Servis Komputer",
  description:
    "DYTECH Computer merakit PC, menjual laptop & aksesoris, dan menangani servis dengan komponen bergaransi di Malang.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F3F5FB] selection:bg-[#F6C623] selection:text-[#12162A] antialiased">
        <TopBar />
        <Nav products={products} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
