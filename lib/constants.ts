// Brand tokens diambil dari palet logo DYTECH Computer:
// biru elektrik, kuning emas, merah aksen.
export const BRAND = {
  bg: "#06070B",
  surface: "#0E121C",
  blue: "#2F5CF0",
  yellow: "#F6C623",
  red: "#F0323B",
  textHi: "#F4F6FB",
  textMute: "#8890A6",
};

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Servis", href: "/servis" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export type Category = {
  title: string;
  desc: string;
  accent: string;
  icon: "cpu" | "laptop" | "mouse" | "wrench";
};

export const CATEGORIES: Category[] = [
  {
    title: "PC Rakitan",
    desc: "Custom build sesuai budget dan kebutuhan — gaming, editing, atau kerja kantor.",
    accent: BRAND.blue,
    icon: "cpu",
  },
  {
    title: "Laptop",
    desc: "Pilihan laptop baru & bergaransi dari berbagai brand, siap konsultasi spek.",
    accent: BRAND.yellow,
    icon: "laptop",
  },
  {
    title: "Aksesoris",
    desc: "Keyboard, mouse, headset, hingga komponen tambahan untuk setup Anda.",
    accent: BRAND.red,
    icon: "mouse",
  },
  {
    title: "Servis & Upgrade",
    desc: "Diagnosa, perbaikan, dan upgrade komponen dengan pengerjaan transparan.",
    accent: BRAND.blue,
    icon: "wrench",
  },
];

export type Product = {
  slug: string;
  name: string;
  category: string; // cocok dengan Category["title"]
  price: string;
  specs: string[];
  badge?: string;
  image?: string; // Tambahkan baris ini
};

export const PRODUCTS: Product[] = [
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
  {
    slug: "ADVAN SOULMATE X ATHLON",
    name: "LAPTOP ADVAN SOULMATE X ATHLON",
    category: "Laptop",
    price: "Rp 7.400.000",
    specs: ["Core i5-1235U", "8GB RAM", "512GB SSD", "14\" FHD"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "lenovo-loq-gaming",
    name: "Laptop Lenovo LOQ Gaming",
    category: "Laptop",
    price: "Rp 15.950.000",
    specs: ["Core i7-13650HX", "RTX 4050 6GB", "16GB RAM", "512GB SSD"],
    badge: "Terlaris",
    image: "/LAPTOP LOQ 15ARP10E.svg",
  },
  {
    slug: "acer-aspire-lite",
    name: "Laptop Acer Aspire GO AG14",
    category: "Laptop",
    price: "Rp 10.599.000",
    specs: ["Core 5-120U", "16GB RAM", "512GB SSD", "14\" WUXGA", "WINDOWS 11 + OHS"],
    image: "/AcerAspireGOAG14.svg",
  },
  {
    slug: "km100-mechanical",
    name: "Keyboard Mechanical DYTECH KM100",
    category: "Aksesoris",
    price: "Rp 350.000",
    specs: ["Hot-swappable", "RGB Backlight", "Kabel USB-C"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "mx-air-wireless",
    name: "Mouse Wireless DYTECH MX Air",
    category: "Aksesoris",
    price: "Rp 180.000",
    specs: ["2.4GHz + Bluetooth", "4800 DPI", "Baterai 3 bulan"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "sonic-h7-headset",
    name: "Headset Gaming DYTECH Sonic H7",
    category: "Aksesoris",
    price: "Rp 275.000",
    specs: ["7.1 Surround", "Mic Detachable", "Earcup Memory Foam"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "ccihuy",
    name: "Cihuy",
    category: "Aksesoris",
    price: "Rp 275.000",
    specs: ["7.1 Surround", "Mic Detachable", "Earcup Memory Foam"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "diagnosa-cleaning",
    name: "Servis Diagnosa & Cleaning",
    category: "Servis & Upgrade",
    price: "Rp 75.000",
    specs: ["Cek hardware & software", "Pembersihan internal", "Estimasi 1 hari"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "upgrade-ssd-migrasi",
    name: "Upgrade SSD + Migrasi OS",
    category: "Servis & Upgrade",
    price: "Mulai Rp 150.000",
    specs: ["Jasa pasang & migrasi", "Tanpa kehilangan data", "Harga part terpisah"],
    image: "/AdvanAnyar.svg",
  },
  {
    slug: "install-ulang-os",
    name: "Install Ulang OS + Driver",
    category: "Servis & Upgrade",
    price: "Rp 100.000",
    specs: ["Windows / Linux", "Driver lengkap", "Setup software dasar"],
    image: "/AdvanAnyar.svg",
  },
];

export type ProcessStep = {
  title: string;
  desc: string;
};

// Urutan asli alur servis di toko — penomoran di sini valid
// karena memang proses berurutan, bukan sekadar dekorasi.
export const SERVICE_STEPS: ProcessStep[] = [
  {
    title: "Diagnosa Awal",
    desc: "Teknisi cek keluhan & kondisi unit, lalu sampaikan estimasi biaya sebelum pengerjaan dimulai.",
  },
  {
    title: "Konfirmasi & Persetujuan",
    desc: "Setelah estimasi disetujui, unit masuk antrian servis dan dijadwalkan pengerjaannya.",
  },
  {
    title: "Pengerjaan",
    desc: "Perbaikan atau upgrade dikerjakan sesuai kesepakatan, memakai komponen bergaransi.",
  },
  {
    title: "Quality Check",
    desc: "Unit diuji fungsinya secara menyeluruh sebelum dinyatakan selesai.",
  },
  {
    title: "Serah Terima",
    desc: "Unit ditunjukkan & dites langsung di depan customer, lengkap dengan garansi servis.",
  },
];

export const STORE_INFO = {
  address: "Jl. Danau Toba No.Blok A/9, Sawojajar, Kedungkandang, Kota Malang, Jawa Timur",
  phone: "0341-727676",
  whatsapp: "62881026014897",
  email: "dytechstore@gmail.com",
  hours: [
    { day: "Senin – Jumat", time: "08.00 – 20.00" },
    { day: "Sabtu - Minggu", time: "08.00 – 17.00" },
  ],
};

// 1. Tambahkan properti 'image' ke dalam tipe data ValueItem
export type ValueItem = {
  title: string;
  desc: string;
  accent: string;
  image: string; // <-- Tambahkan baris ini
};

// 2. Tambahkan nama file gambar ke masing-masing item
export const VALUES: ValueItem[] = [
  {
    title: "Transparan",
    desc: "Estimasi biaya disampaikan di awal, sebelum unit disentuh teknisi.",
    accent: "#2F5CF0",
    image: "/Transparan.svg", // <-- Sesuaikan dengan nama gambar 1 kamu
  },
  {
    title: "Bergaransi",
    desc: "Komponen dan jasa servis kami bergaransi resmi, bukan janji lisan.",
    accent: "#F6C623",
    image: "/Bergaransi.svg", // <-- Sesuaikan dengan nama gambar 2 kamu
  },
  {
    title: "Cepat Tanggap",
    desc: "Sebagian besar servis selesai 1–3 hari kerja, tanpa antre berlarut-larut.",
    accent: "#F0323B",
    image: "/Cepat tanggap.svg", // <-- Sesuaikan dengan nama gambar 3 kamu
  },
  {
    title: "Rekomendasi Jujur",
    desc: "Saran spek disesuaikan kebutuhan & budget, bukan sekadar jual yang mahal.",
    accent: "#2F5CF0",
    image: "/Rekomendasi.svg", // <-- Sesuaikan dengan nama gambar 4 kamu
  },
];