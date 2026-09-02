import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { TopBar } from "@/components/TopBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { getAllProducts } from "@/lib/getProducts";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DYTECH Computer — Toko & Servis Komputer Malang",
  description:
    "DYTECH Computer merakit PC impian, menjual laptop & aksesoris, serta menangani servis cepat dengan garansi resmi di Malang.",
  icons: {
    icon: "/dytech uhuy.png",
    shortcut: "/dytech uhuy.png",
    apple: "/dytech ori.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();

  return (
    <html lang="id" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F3F5FB] selection:bg-[#F6C623] selection:text-[#12162A] antialiased font-body">
        <Preloader />
        <TopBar />
        <Nav products={products} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
