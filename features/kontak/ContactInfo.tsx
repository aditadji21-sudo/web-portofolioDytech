import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function ContactInfo() {
  return (
    <Reveal>
      <div className="rounded-2xl border border-[#EAECF5] bg-white p-7 space-y-6 h-full">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-[#F6C623] mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm text-[#12162A]">Alamat</p>
            <p className="font-body text-sm text-[#667085] mt-1">{STORE_INFO.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={18} className="text-[#2F5CF0] mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm text-[#12162A]">Telepon / WhatsApp</p>
            <p className="font-body text-sm text-[#667085] mt-1">{STORE_INFO.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail size={18} className="text-[#F0323B] mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm text-[#12162A]">Email</p>
            <p className="font-body text-sm text-[#667085] mt-1">{STORE_INFO.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock size={18} className="text-[#F6C623] mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm text-[#12162A]">Jam Operasional</p>
            {STORE_INFO.hours.map((h) => (
              <p key={h.day} className="font-mono text-[11px] text-[#667085] mt-1">
                {h.day}: {h.time}
              </p>
            ))}
          </div>
        </div>

        <a
          href={`https://wa.me/${STORE_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-2 px-5 py-3 rounded-full bg-[#F6C623] text-[#12162A] font-body text-sm font-semibold hover:bg-[#12162A] hover:text-white transition-colors duration-200"
        >
          Chat via WhatsApp
        </a>
      </div>
    </Reveal>
  );
}
