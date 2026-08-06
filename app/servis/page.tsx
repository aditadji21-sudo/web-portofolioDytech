import type { Metadata } from "next";
import { ServisHeader } from "@/features/servis/ServisHeader";
import { ProcessSteps } from "@/features/servis/ProcessSteps";
import { ServicePackages } from "@/features/servis/ServicePackages";
import { CtaStrip } from "@/features/home/CtaStrip";

export const metadata: Metadata = {
  title: "Servis & Upgrade — DYTECH Computer",
  description: "Diagnosa, perbaikan, dan upgrade komputer dengan alur kerja transparan di DYTECH Computer.",
};

export default function ServisPage() {
  return (
    <>
      <ServisHeader />
      <ProcessSteps />
      <ServicePackages />
      <CtaStrip />
    </>
  );
}
