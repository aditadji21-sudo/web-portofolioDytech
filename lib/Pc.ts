import { Product } from "./constants"; // Pastikan tipe Product di-import jika masih di constants

export const PC_RAKITAN: Product[] = [
  {
    slug: "ryzen5-streamer-build",
    name: "DYTECH Ryzen 5 Streamer Build",
    category: "PC Rakitan",
    price: "Rp 9.500.000",
    specs: ["Ryzen 5 5600", "RTX 3050 8GB", "16GB RAM", "512GB NVMe SSD"],
    badge: "Terlaris",
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "intel-i5-office-build",
    name: "DYTECH Intel i5 Office Build",
    category: "PC Rakitan",
    price: "Rp 6.200.000",
    specs: ["Core i5-12400", "Graphics Terintegrasi", "16GB RAM", "512GB SSD"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "ryzen7-creator-build",
    name: "DYTECH Ryzen 7 Creator Build",
    category: "PC Rakitan",
    price: "Rp 15.800.000",
    specs: ["Ryzen 7 5700X", "RTX 4060 8GB", "32GB RAM", "1TB NVMe SSD"],
    image: "/AdvanAnyar.svg",
  },
];