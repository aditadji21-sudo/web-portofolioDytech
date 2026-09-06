"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoPutih from "@/assets/Dytechputih.png";
import logoOri from "@/assets/dytech ori.png";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    // NOTE: wrapped in try-catch because Safari iOS (esp. private browsing)
    // throws when accessing sessionStorage
    try {
      const hasSeen = sessionStorage.getItem("dytech_preloaded");
      if (hasSeen) {
        setMounted(false);
        return;
      }
    } catch {
      // sessionStorage unavailable (Safari private mode, etc.) — proceed
    }

    const duration = 1400; // ms
    const interval = 20; // ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + (Math.random() * 2 - 0.5);
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(next, 99);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Separate effect for status text — avoids calling setState inside
  // another setState's updater (React antipattern that can break in Safari)
  useEffect(() => {
    if (progress === 0) {
      setStatusText("INITIALIZING SYSTEM...");
    } else if (progress > 0 && progress < 15) {
      setStatusText("INITIALIZING SYSTEM...");
    } else if (progress < 40) {
      setStatusText("INITIALIZING Dytech COMPUTER MALANG...");
    } else if (progress < 70) {
      setStatusText("LOADING CATALOG & HARDWARE SPECS...");
    } else if (progress < 100) {
      setStatusText("CALIBRATING HIGH-PERFORMANCE RIGS...");
    } else {
      setStatusText("SYSTEM READY • WELCOME TO Dytech");
    }
  }, [progress]);

  // Separate effect for exit animation & sessionStorage write
  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        try {
          sessionStorage.setItem("dytech_preloaded", "1");
        } catch {
          // sessionStorage unavailable — ignore
        }
        setTimeout(() => {
          setMounted(false);
        }, 600);
      }, 200);
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#06070B] text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? "opacity-0 pointer-events-none scale-105 backdrop-blur-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#2F5CF0]/25 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F6C623]/15 blur-[120px] animate-pulse" />

      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Animated Brand Emblem using official dytech ori.png & Dytechputih.png */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            {/* Outer rotating dashed ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#F6C623]/50 animate-[spin_8s_linear_infinite]" />
            
            {/* Middle counter-rotating gradient ring */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#2F5CF0] border-r-[#F6C623] border-b-[#F0323B] animate-[spin_3s_linear_infinite_reverse]" />
            
            {/* Inner official logo emblem */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-[0_0_24px_rgba(47,92,240,0.6)]">
              <Image
                src={logoOri}
                alt="Dytech Computer"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Official Brand Logo */}
          <div className="h-8 w-auto flex items-center justify-center">
            <Image
              src={logoPutih}
              alt="Dytech Computer"
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#12162A] rounded-full h-1.5 overflow-hidden p-0.5 border border-white/10 mb-3 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#2F5CF0] via-[#F6C623] to-[#F0323B] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(246,198,35,0.7)]"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Status Text & Numerical Percentage */}
        <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#8A92B5]">
          <span className="truncate pr-2">{statusText}</span>
          <span className="font-bold text-white shrink-0">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
