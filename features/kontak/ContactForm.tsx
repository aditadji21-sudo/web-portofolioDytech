"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // NOTE: placeholder — belum terhubung ke backend/email service.
    // Sambungkan ke API route atau layanan form (mis. Resend, Formspree) di sini.
    setSent(true);
  }

  if (sent) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-[#EAECF5] bg-white p-10 h-full flex flex-col items-center justify-center text-center">
          <CheckCircle2 size={32} className="text-[#2F5CF0] mb-4" />
          <h3 className="font-display font-semibold text-lg text-[#12162A] mb-2">
            Terima kasih, {name || "kak"}!
          </h3>
          <p className="font-body text-sm text-[#667085] max-w-xs">
            Pesan kamu sudah tercatat. Tim kami akan menghubungi balik di jam operasional.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={100}>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#EAECF5] bg-white p-7 space-y-5">
        <div>
          <label className="font-mono text-[11px] tracking-wide text-[#667085]">NAMA</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nama lengkap"
            className="w-full mt-2 bg-[#F7F8FC] border border-[#E1E4EF] rounded-xl px-4 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none focus:border-[#2F5CF0] focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] tracking-wide text-[#667085]">EMAIL / WHATSAPP</label>
          <input
            required
            type="text"
            placeholder="email@contoh.com atau 08xx-xxxx-xxxx"
            className="w-full mt-2 bg-[#F7F8FC] border border-[#E1E4EF] rounded-xl px-4 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none focus:border-[#2F5CF0] focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] tracking-wide text-[#667085]">PESAN</label>
          <textarea
            required
            rows={4}
            placeholder="Ceritakan kebutuhan kamu — mau rakit PC, servis, atau tanya produk."
            className="w-full mt-2 bg-[#F7F8FC] border border-[#E1E4EF] rounded-xl px-4 py-2.5 font-body text-sm text-[#12162A] placeholder:text-[#8890A6] focus:outline-none focus:border-[#2F5CF0] focus:bg-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2F5CF0] text-white font-body text-sm font-semibold hover:bg-[#16266B] transition-colors duration-200"
        >
          Kirim Pesan <Send size={14} />
        </button>
      </form>
    </Reveal>
  );
}
