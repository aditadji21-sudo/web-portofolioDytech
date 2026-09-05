"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  image: string;
  alt?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-3.5 sm:gap-6 pb-3.5 sm:pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((t, i) => (
              <div
                className="rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_-2px_rgba(18,22,42,0.07),0_2px_6px_rgba(47,92,240,0.05)] border border-white/90 bg-white hover:shadow-[0_16px_36px_-6px_rgba(47,92,240,0.18)] hover:-translate-y-1 transition-all duration-300 ring-1 ring-[#12162A]/5"
                key={`${index}-${i}`}
              >
                <img
                  src={t.image}
                  alt={t.alt || `Testimoni ${i + 1}`}
                  className="w-full h-auto object-cover block"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
