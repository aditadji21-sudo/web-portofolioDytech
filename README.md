# DYTECH Computer — Website

Struktur project (Next.js App Router + TypeScript + Tailwind v4):

```
app/            route & page (Beranda ada di sini)
assets/         gambar yang di-import langsung ke komponen (logo, banner, foto produk)
components/     komponen shared (Nav, TopBar, Footer, Logo, OrbitMark, ui/)
features/       komponen per-halaman, dikelompokkan per fitur (features/home/...)
hooks/          custom hooks (useReveal untuk animasi scroll)
lib/            konstanta & data (warna brand, kategori, produk, nav links)
public/         asset statis lain (kalau ada)
```

## Desain v2 — gaya toko komputer

Tampilan diubah dari tema gelap minimalis ke gaya e-commerce terang yang lebih
familiar (mirip Enterkomputer / Agres Komputer): top bar kontak, search bar,
strip kategori di header, banner promo di Beranda, grid "Belanja per
Kategori", dan kartu produk bergambar.

### Ganti logo & gambar

Semua gambar yang bisa ditimpa ada di folder `assets/` dan di-import lewat
`import` (bukan ditaruh di `public/`), supaya begitu file-nya diganti,
Next.js otomatis pakai versi baru tanpa perlu ubah kode:

- `assets/logo.svg` — logo di Nav & Footer (dipakai lewat `components/Logo.tsx`)
- `assets/hero-banner.svg` — banner besar di Beranda (`features/home/Hero.tsx`)
- `assets/product-pc.svg`, `product-laptop.svg`, `product-aksesoris.svg`, `product-servis.svg` — foto produk per kategori (`features/produk/ProductCard.tsx`)

Cara ganti: timpa file dengan nama yang sama (boleh JPG/PNG/SVG, cukup ganti
ekstensi di baris `import` terkait bila formatnya beda).

## Menjalankan

```bash
pnpm install
pnpm dev
```

## Progres

- [x] Tahap 1 — Scaffold + Halaman Beranda
- [x] Tahap 2 — Halaman Produk / Katalog
- [x] Tahap 3 — Halaman Servis
- [x] Tahap 4 — Halaman Tentang & Kontak

Semua tahap selesai. Halaman: Beranda (/), Produk (/produk), Servis (/servis), Tentang (/tentang), Kontak (/kontak).
