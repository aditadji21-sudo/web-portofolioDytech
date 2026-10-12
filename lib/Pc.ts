import { Product } from "./constants"; // Pastikan tipe Product di-import jika masih di constants

export const PC_RAKITAN: Product[] = [
  {
    slug: "ryzen5-streamer-build",
    name: "Dytech Ryzen 5 Streamer Build",
    category: "PC Rakitan",
    price: "Rp 9.500.000",
    specs: ["Ryzen 5 5600", "RTX 3050 8GB", "16GB RAM", "512GB NVMe SSD"],
    badge: "Terlaris",
    image: "/pc-gaming-hero.jpg",
  },
  {
    slug: "intel-i5-office-build",
    name: "Dytech Intel i5 Office Build",
    category: "PC Rakitan",
    price: "Rp 6.200.000",
    specs: ["Core i5-12400", "Graphics Terintegrasi", "16GB RAM", "512GB SSD"],
    image: "/pc-office-hero.jpg",
  },
];