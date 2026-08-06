import { Phone, Mail, MapPin } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="hidden sm:block bg-[#0E1226] text-[#B7BEDB]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-9 flex items-center justify-between font-body text-[12px]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={12} className="text-[#F6C623]" />
          {STORE_INFO.address}
        </span>
        <div className="flex items-center gap-5">
          <a href={`tel:${STORE_INFO.phone}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} className="text-[#2F5CF0]" />
            {STORE_INFO.phone}
          </a>
          <a href={`mailto:${STORE_INFO.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} className="text-[#F0323B]" />
            {STORE_INFO.email}
          </a>
        </div>
      </div>
    </div>
  );
}
