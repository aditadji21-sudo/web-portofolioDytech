import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder assets di /assets memakai SVG supaya gampang diganti.
    // Kalau semua sudah ditimpa dengan foto asli (JPG/PNG), opsi ini boleh dihapus.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
