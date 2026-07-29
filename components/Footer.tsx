'use client';

import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: () => void;
}

export default function Footer({ onOpenInquiry }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'INSTAGRAM', url: 'https://instagram.com' },
    { name: 'TWITTER / X', url: 'https://x.com' },
    { name: 'BEHANCE', url: 'https://behance.net' },
    { name: 'ARE.NA', url: 'https://are.na' },
    { name: 'READCV', url: 'https://read.cv' },
    { name: 'LINKEDIN', url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-[#FFFFFF] pt-24 pb-12 px-6 md:px-16 border-t border-white/10 relative z-10 snap-start snap-always scroll-mt-0">
      {/* 4-Column Grid for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
        {/* Column 1-2 (md:col-span-6): Large Brand Name and Short Bio */}
        <div className="md:col-span-6 space-y-8">
          <div>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none text-white select-none">
              ILRKSY
            </h2>
            <span className="font-editorial-mono text-xs text-neutral-500 uppercase tracking-widest block mt-2">
              ILRKSY STUDIO & EDITORIAL PRACTICE
            </span>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
            An independent visual design studio shaping high-density monographs, architectural brand identities, and motion systems with extreme typographic discipline.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenInquiry}
              className="px-8 py-4 bg-white text-black font-editorial-mono text-xs uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-neutral-200 transition-colors"
              data-cursor-text="INQUIRE"
            >
              <span>INITIATE COMMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 3 (md:col-span-3): Socials List */}
        <div className="md:col-span-3 space-y-4">
          <span className="font-editorial-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
            [01. SOCIAL ARCHIVES]
          </span>

          <ul className="space-y-3 font-editorial-mono text-xs uppercase tracking-wider text-neutral-300">
            {socials.map((s, idx) => (
              <li key={idx}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between group transition-colors py-1 border-b border-white/5"
                >
                  <span>{s.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 (md:col-span-3): Contact List */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <span className="font-editorial-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              [02. DIRECT CONTACT]
            </span>
            <a
              href="mailto:hello@ilrksy.studio"
              className="font-editorial-mono text-sm text-white underline hover:text-neutral-300 transition-colors block mb-1"
            >
              hello@ilrksy.studio
            </a>
            <p className="font-editorial-mono text-xs text-neutral-400">
              TEL: +81 3 5400 9011
            </p>
          </div>

          <div>
            <span className="font-editorial-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              [03. LOCATIONS]
            </span>
            <p className="font-editorial-mono text-xs text-neutral-400 leading-relaxed">
              TOKYO: 5-7-2 GINZA, CHUO-KU<br />
              NEW YORK: 42 BROADWAY, SUITE 1800<br />
              BERLIN: KÖPENICKER STRASSE 124
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Thin border-top (white at 10% opacity) with copyright and credits in 14px text */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-editorial-mono text-sm text-neutral-400">
        <div>
          <span>© 2026 ILRKSY STUDIO. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-500">
          <span>SET IN INTER & JETBRAINS MONO</span>
          <span>HIGH-CONTRAST MONOCHROME ARCHITECTURE</span>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors text-xs uppercase tracking-widest"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
