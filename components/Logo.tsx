import Image from "next/image";
import logoSrc from "@/assets/dytech uhuy.png"; // Pastikan nama file ini sesuai

export function Logo() {
  return (
    <Image
      src={logoSrc}
      alt="Logo Toko"
      width={200} // Angka ini untuk mengatur LEBAR logo (besarkan jika kurang)
      height={40} // Angka ini untuk mengatur TINGGI logo
      priority
      className="object-contain" // Memastikan logomu proporsional dan tidak gepeng
    />
  );
}