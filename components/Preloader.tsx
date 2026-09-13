"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoPutih from "@/assets/Dytechputih.png";
import logoOri from "@/assets/dytech ori.png";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isFadingContent, setIsFadingContent] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    try {
      const hasSeen = sessionStorage.getItem("dytech_preloaded_v3");
      if (hasSeen) {
        setMounted(false);
        return;
      }
    } catch {
      // Safari private mode fallback
    }

    const duration = 1100; // ms
    const interval = 16;
    const totalSteps = duration / interval;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const t = Math.min(1, stepCount / totalSteps);
      // Smooth cinematic ease
      const easeProgress = Math.round(100 * (1 - Math.pow(1 - t, 3)));

      setProgress(easeProgress);

      if (t >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Split curtain trigger sequence
  useEffect(() => {
    if (progress >= 100) {
      // Step 1: Fade out center logo/text slightly before splitting
      const fadeTimer = setTimeout(() => {
        setIsFadingContent(true);
      }, 150);

      // Step 2: Open top & bottom curtains smoothly
      const splitTimer = setTimeout(() => {
        setIsSplitting(true);
        try {
          sessionStorage.setItem("dytech_preloaded_v3", "1");
        } catch {
          // ignore
        }
      }, 350);

      // Step 3: Unmount preloader after animation completes
      const unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 1100);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(splitTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress]);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[99999] pointer-events-none select-none">
      {/* Top Shutter Curtain Panel */}
      <div
        className={`absolute top-0 left-0 right-0 h-[50.5vh] bg-[#06070B] border-b border-[#2F5CF0]/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Subtle grid pattern on top curtain */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#2F5CF0]/15 blur-[120px]" />
      </div>

      {/* Bottom Shutter Curtain Panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[50.5vh] bg-[#06070B] border-t border-[#F6C623]/30 shadow-[0_-4px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Subtle grid pattern on bottom curtain */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        {/* Ambient Bottom Glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#F6C623]/10 blur-[120px]" />
      </div>

      {/* Center Laser Beam Split Line */}
      <div
        className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#F6C623] to-transparent shadow-[0_0_15px_#F6C623] transition-all duration-500 ease-out z-20 ${
          isSplitting ? "opacity-0 scale-x-150" : "opacity-80 scale-x-100"
        }`}
      />

      {/* Center Floating Content Container */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFadingContent
            ? "opacity-0 scale-105 blur-sm"
            : "opacity-100 scale-100 filter-none"
        }`}
      >
        <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center">
          {/* Glowing Emblem Tile */}
          <div className="relative mb-6 flex flex-col items-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Outer Pulsing Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#2F5CF0]/40 via-[#6366F1]/20 to-[#F6C623]/40 blur-lg animate-pulse" />
              
              {/* High-tech Glass Shield */}
              <div className="absolute inset-0 rounded-2xl border border-white/15 bg-[#0C0E1A]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)]" />

              {/* Logo Emblem */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_24px_rgba(47,92,240,0.6)]">
                <Image
                  src={logoOri}
                  alt="Dytech Computer"
                  className="w-full h-full object-cover transform scale-105"
                  priority
                />
              </div>
            </div>

            {/* Typography */}
            <div className="mt-4 flex flex-col items-center">
              <div className="h-6 w-auto flex items-center justify-center">
                <Image
                  src={logoPutih}
                  alt="Dytech"
                  className="h-5 w-auto object-contain opacity-95"
                  priority
                />
              </div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#8A92B5] uppercase mt-1">
                Computer Malang
              </span>
            </div>
          </div>

          {/* Cinematic Laser Progress Bar */}
          <div className="w-full max-w-[210px] mb-3">
            <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#2F5CF0] via-[#6366F1] to-[#F6C623] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(246,198,35,0.9)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          </div>

          {/* Percentage Counter */}
          <div className="flex items-center justify-center font-mono text-[10px] tracking-widest text-[#B7BEDB]/90 font-semibold">
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
