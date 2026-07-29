'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowUpRight, Grid, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playClickSound, playToggleSound } from '@/lib/audio';

interface HeaderProps {
  onOpenInquiry: () => void;
  toggleGrid: () => void;
  showGrid: boolean;
}

export default function NavigationHeader({ onOpenInquiry, toggleGrid, showGrid }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [times, setTimes] = useState<{ [key: string]: string }>({
    TOKYO: '',
    LONDON: '',
    NYC: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimes({
        TOKYO: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        LONDON: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        NYC: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 pointer-events-none mix-blend-difference text-white flex items-center justify-between">
        {/* Left: Brand Logomark 'ILRKSY' */}
        <motion.a
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="pointer-events-auto text-[24px] font-bold tracking-tighter leading-none hover:opacity-75 transition-opacity"
          aria-label="ILRKSY homepage"
        >
          ILRKSY
        </motion.a>

        {/* Center: Live Studio Status Ticker (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="hidden lg:flex items-center gap-8 text-[12px] font-mono tracking-widest uppercase opacity-90"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            AVAILABLE FOR COMMISSIONS 2026
          </span>
          <span className="text-white/40">|</span>
          <span>TYO {times.TOKYO}</span>
          <span>LDN {times.LONDON}</span>
          <span>NYC {times.NYC}</span>
        </motion.div>

        {/* Right Controls */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="pointer-events-auto flex items-center gap-4"
        >
          {/* Grid Overlay Toggle */}
          <button
            onClick={() => {
              playToggleSound(!showGrid);
              toggleGrid();
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 border border-white/30 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors ${
              showGrid ? 'bg-white text-black' : 'hover:bg-white/10'
            }`}
            title="Toggle Swiss 12-Column Grid Lines"
          >
            <Grid className="w-3.5 h-3.5" />
            GRID {showGrid ? 'ON' : 'OFF'}
          </button>

          {/* Plus / Close Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              setMenuOpen(!menuOpen);
            }}
            className="p-3 border border-white/40 rounded-full hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center bg-transparent text-white"
            aria-label="Toggle navigation menu"
            data-cursor-text={menuOpen ? 'CLOSE' : 'MENU'}
          >
            {menuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Plus className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Fullscreen Navigation Menu Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] text-white flex flex-col justify-between p-8 md:p-16 pt-32 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
                  [NAVIGATION]
                </span>
                <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                  ILRKSY is a bold editorial design practice exploring high-contrast systems, typography, and physical-digital archives.
                </p>
              </div>

              {/* Main Nav Links */}
              <div className="md:col-span-6 flex flex-col gap-4 text-4xl md:text-6xl font-bold tracking-tighter">
                <button
                  onClick={() => scrollToSection('marquee')}
                  className="text-left hover:translate-x-4 hover:text-neutral-400 transition-all duration-500 flex items-center justify-between border-b border-white/10 pb-4 group"
                >
                  <span>SELECTED WORK</span>
                  <span className="font-mono text-sm tracking-widest font-normal text-neutral-500 group-hover:text-white">
                    (01)
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left hover:translate-x-4 hover:text-neutral-400 transition-all duration-500 flex items-center justify-between border-b border-white/10 pb-4 group"
                >
                  <span>MANIFESTO & PRACTICE</span>
                  <span className="font-mono text-sm tracking-widest font-normal text-neutral-500 group-hover:text-white">
                    (02)
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('grid')}
                  className="text-left hover:translate-x-4 hover:text-neutral-400 transition-all duration-500 flex items-center justify-between border-b border-white/10 pb-4 group"
                >
                  <span>PROJECT INDEX</span>
                  <span className="font-mono text-sm tracking-widest font-normal text-neutral-500 group-hover:text-white">
                    (03)
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left hover:translate-x-4 hover:text-neutral-400 transition-all duration-500 flex items-center justify-between border-b border-white/10 pb-4 group"
                >
                  <span>CAPABILITIES</span>
                  <span className="font-mono text-sm tracking-widest font-normal text-neutral-500 group-hover:text-white">
                    (04)
                  </span>
                </button>
              </div>

              {/* Quick Actions & Contact */}
              <div className="md:col-span-3 flex flex-col justify-between gap-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
                    [COMMISSIONS]
                  </span>
                  <p className="text-sm text-neutral-300 mb-4">
                    Accepting brand identities, monographs, and digital architecture for Q3/Q4.
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full py-4 px-6 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-between hover:bg-neutral-200 transition-colors"
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
                    [DIRECT INQUIRIES]
                  </span>
                  <a
                    href="mailto:hello@ilrksy.studio"
                    className="font-mono text-sm underline hover:text-neutral-400 transition-colors"
                  >
                    hello@ilrksy.studio
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Menu Footer */}
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
              <div className="flex gap-6">
                <span>TYO {times.TOKYO}</span>
                <span>LDN {times.LONDON}</span>
                <span>NYC {times.NYC}</span>
              </div>
              <div>© 2026 ILRKSY STUDIO — ALL RIGHTS RESERVED</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
