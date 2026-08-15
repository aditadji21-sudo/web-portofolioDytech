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
  icon: "cpu" | "laptop" | "mouse" | "wrench" | "printer" | "speaker";
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
  {
    title: "Printer",
    desc: "Printer inkjet, laser, hingga all-in-one untuk kebutuhan rumah dan kantor.",
    accent: BRAND.red,
    icon: "printer",
  },
  {
    title: "Speaker",
    desc: "Speaker aktif, bluetooth, hingga soundbar untuk kebutuhan hiburan dan kerja.",
    accent: BRAND.yellow,
    icon: "speaker",
  },
];

export type Processor = {
  name: string; // mis. "Intel Core i7-13650HX"
  brand: "Intel" | "AMD";
  generation: string; // mis. "13th Gen (Raptor Lake HX)"
  cores: string; // mis. "14 (6P+8E)"
  threads: string; // mis. "20"
  baseClock: string; // mis. "2.6 GHz"
  turboClock: string; // mis. "4.9 GHz"
  cache: string; // mis. "24 MB"
  tdp: string; // mis. "55W"
  igpu: string; // mis. "Intel UHD Graphics"
};

export type Product = {
  slug: string;
  name: string;
  category: string; // cocok dengan Category["title"]
  price: string;
  specs: string[];
  badge?: string;
  image?: string; // Tambahkan baris ini
  images?: string[]; // opsional: galeri foto tambahan untuk halaman detail
  description?: string; // opsional: paragraf deskripsi di halaman detail
  stock?: string; // opsional: status stok, mis. "Ready Stock", "Indent 3-5 hari"
  sku?: string; // opsional: kode SKU/produk
  processor?: Processor; // opsional: data prosesor terstruktur untuk fitur bandingkan
};

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