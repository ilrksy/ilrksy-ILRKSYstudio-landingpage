'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStartProject: () => void;
}

export default function HeroSection({ onExploreClick, onStartProject }: HeroSectionProps) {
  // Main headline text splits into letters for staggered slide-up animation
  const headlineWords = [
    { text: "ILRKSY", delay: 0 },
    { text: "STUDIO", delay: 0.2 },
  ];

  return (
    <section className="min-h-[85vh] flex flex-col justify-between pt-36 pb-12 px-6 md:px-16 border-b border-black/10 relative overflow-hidden bg-white snap-start snap-always scroll-mt-0">
      {/* Top Metadata Badges */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-editorial-mono text-xs text-[#525252] border-b border-black/10 pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-black"></span>
          <span>EST. 2021 / TOKYO & NEW YORK</span>
        </div>
        <div className="hidden md:block">
          <span>HIGH-CONTRAST VISUAL ARCHITECTURE</span>
        </div>
        <div>
          <span>ISSUE N° 08 — 2026</span>
        </div>
      </motion.div>

      {/* Hero Headline Center */}
      <div className="my-auto py-12 text-center flex flex-col items-center justify-center">
        <div className="overflow-hidden max-w-full">
          <h1 className="font-editorial-headline text-[13vw] sm:text-[12vw] leading-[0.85] tracking-tighter text-black select-none uppercase flex flex-wrap justify-center gap-x-6 sm:gap-x-10">
            {headlineWords.map((word, wIdx) => (
              <span key={wIdx} className="inline-flex overflow-hidden py-1">
                {word.text.split("").map((char, cIdx) => (
                  <motion.span
                    key={cIdx}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: word.delay + cIdx * 0.04,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-lg sm:text-[24px] text-[#525252] mt-8 max-w-3xl mx-auto font-normal leading-[1.4] tracking-tight px-4"
        >
          An independent practice crafting disciplined visual systems, high-density monographs, and digital architecture with uncompromising typographic precision.
        </motion.p>

        {/* Hero Interactive Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onStartProject}
            className="px-8 py-4 bg-black text-white font-editorial-mono text-xs uppercase tracking-widest font-bold border border-black hover:bg-white hover:text-black transition-colors duration-300"
            data-cursor-text="INQUIRE"
          >
            START A COMMISSION
          </button>
          
          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-transparent text-black font-editorial-mono text-xs uppercase tracking-widest font-bold border border-black/20 hover:border-black transition-colors duration-300 flex items-center gap-2 group"
          >
            <span>EXPLORE ARCHIVE</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Hero Footer Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10 text-xs font-editorial-mono text-[#525252]"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-black">[01]</span>
          <span>SPECIALTIES: IDENTITY / PRINT / WEB</span>
        </div>
        <div className="text-left md:text-center">
          <span className="font-bold text-black">[02]</span>
          <span>TYPOGRAPHY: INTER DISPLAY & JETBRAINS MONO</span>
        </div>
        <div className="flex items-center justify-start md:justify-end gap-2">
          <span className="font-bold text-black">[03]</span>
          <button
            onClick={onExploreClick}
            className="hover:text-black hover:underline uppercase tracking-widest transition-colors flex items-center gap-1"
          >
            SCROLL TO EXPLORE (↓)
          </button>
        </div>
      </motion.div>
    </section>
  );
}
