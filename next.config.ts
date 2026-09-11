import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder assets di /assets memakai SVG supaya gampang diganti.
    // Kalau semua sudah ditimpa dengan foto asli (JPG/PNG), opsi ini boleh dihapus.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Izinkan next/image memuat gambar dari Google Drive dan Cloudinary
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/d/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

