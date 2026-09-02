"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type RotatingItem = {
  text: string;
  color?: string;
};

interface RotatingTextProps {
  items: (string | RotatingItem)[];
  interval?: number;
  className?: string;
  underline?: boolean;
}

export function RotatingText({
  items,
  interval = 2400,
  className = "",
  underline = true,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const raw = items[index];
  const item: RotatingItem = typeof raw === "string" ? { text: raw } : raw;
  const color = item.color || "#2F5CF0";

  return (
    <span className={`relative inline-flex items-center overflow-hidden pb-1 ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="relative inline-block whitespace-nowrap text-[#2F5CF0] font-bold"
          style={{ color }}
        >
          {item.text}
          {underline && (
            <span
              className="absolute -bottom-0.5 left-0 right-0 h-[3.5px] rounded-full bg-[#2F5CF0]/25"
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}



