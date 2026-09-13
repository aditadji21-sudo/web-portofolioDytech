"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoPutih from "@/assets/Dytechputih.png";
import logoOri from "@/assets/dytech ori.png";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user already visited in this session
    try {
      const hasSeen = sessionStorage.getItem("dytech_preloaded_v2");
      if (hasSeen) {
        setMounted(false);
        return;
      }
    } catch {
      // Safari private mode fallback
    }

    const duration = 1200; // ms
    const interval = 16; // ~60fps
    const totalSteps = duration / interval;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      // Smooth ease-out progress curve
      const t = Math.min(1, stepCount / totalSteps);
      const easeProgress = Math.round(100 * (1 - Math.pow(1 - t, 3)));

      setProgress(easeProgress);

      if (t >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Exit transition trigger
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        try {
          sessionStorage.setItem("dytech_preloaded_v2", "1");
        } catch {
          // ignore
        }
        setTimeout(() => {
          setMounted(false);
        }, 700);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07080E] select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? "opacity-0 scale-[1.04] pointer-events-none filter blur-sm"
          : "opacity-100 scale-100 filter-none"
      }`}
    >
      {/* Background Tech Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />
      
      {/* Dynamic Ambient Auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#2F5CF0]/20 blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full bg-[#F6C623]/12 blur-[90px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Emblem & Glowing Shield */}
        <div className="relative mb-6 flex flex-col items-center group">
          {/* Outer Breathing Ring */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#2F5CF0]/30 to-[#F6C623]/30 blur-md transition-all duration-700 animate-pulse" />
            
            {/* Subtle Glass Border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#0C0E1A]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

            {/* Inner Official Logo */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(47,92,240,0.5)]">
              <Image
                src={logoOri}
                alt="Dytech Computer"
                className="w-full h-full object-cover transform transition-transform duration-500 scale-105"
                priority
              />
            </div>
          </div>

          {/* Clean Brand Typography */}
          <div className="mt-4 flex flex-col items-center">
            <div className="h-6 w-auto flex items-center justify-center">
              <Image
                src={logoPutih}
                alt="Dytech"
                className="h-5 w-auto object-contain opacity-95"
                priority
              />
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#8A92B5] uppercase mt-1">
              Computer Malang
            </span>
          </div>
        </div>

        {/* Laser Precision Progress Bar */}
        <div className="w-full max-w-[200px] mb-3">
          <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress Fill with Shimmer */}
            <div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#2F5CF0] via-[#6366F1] to-[#F6C623] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(47,92,240,0.8)]"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Light Reflection */}
              <div className="absolute inset-0 w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-center font-mono text-[10px] tracking-wider text-[#B7BEDB]/80 font-medium">
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
