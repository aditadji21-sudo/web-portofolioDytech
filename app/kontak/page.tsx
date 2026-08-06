import type { Metadata } from "next";
import { KontakHeader } from "@/features/kontak/KontakHeader";
import { ContactInfo } from "@/features/kontak/ContactInfo";
import { ContactForm } from "@/features/kontak/ContactForm";

export const metadata: Metadata = {
  title: "Kontak — DYTECH Computer",
  description: "Hubungi DYTECH Computer untuk konsultasi rakitan PC, laptop, aksesoris, atau servis.",
};

export default function KontakPage() {
  return (
    <>
      <KontakHeader />
      <section className="px-6 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
