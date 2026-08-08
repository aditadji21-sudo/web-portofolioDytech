import { Product } from "./constants";

export const SERVIS: Product[] = [
  {
    slug: "diagnosa-cleaning",
    name: "Servis Diagnosa & Cleaning",
    category: "Servis & Upgrade",
    price: "Rp 75.000",
    specs: ["Cek hardware & software", "Pembersihan internal", "Estimasi 1 hari"],
    image: "/Cleaningdiagnosa.svg",
  },
  {
    slug: "upgrade-ssd-migrasi",
    name: "Upgrade SSD + Migrasi OS",
    category: "Servis & Upgrade",
    price: "Mulai Rp 150.000",
    specs: ["Jasa pasang & migrasi", "Tanpa kehilangan data", "Harga part terpisah"],
    image: "/UpgradeSSD.svg",
  },
  {
    slug: "install-ulang-os",
    name: "Install Ulang OS + Driver",
    category: "Servis & Upgrade",
    price: "Rp 100.000",
    specs: ["Windows / Linux", "Driver lengkap", "Setup software dasar"],
    image: "/InstallUlangOS.svg",
  },
];