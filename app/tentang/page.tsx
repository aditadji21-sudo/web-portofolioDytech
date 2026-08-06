import type { Metadata } from "next";
import { AboutHeader } from "@/features/tentang/AboutHeader";
import { Values } from "@/features/tentang/Values";
import { CtaStrip } from "@/features/home/CtaStrip";

export const metadata: Metadata = {
  title: "Tentang Kami — DYTECH Computer",
  description: "Kenalan dengan DYTECH Computer, toko dan servis komputer di Malang.",
};

export default function TentangPage() {
  return (
    <>
      <AboutHeader />
      <Values />
      <CtaStrip />
    </>
  );
}
