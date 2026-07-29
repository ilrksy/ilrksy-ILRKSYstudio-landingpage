'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Check } from 'lucide-react';

interface StudioPracticeProps {
  onStartProject: () => void;
}

export default function StudioPractice({ onStartProject }: StudioPracticeProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const capabilities = [
    {
      num: '01',
      title: 'EDITORIAL & PRINT SYSTEMS',
      desc: 'Creation of hardcover monographs, archival periodicals, typographic posters, duotone catalogs, and physical publication identity systems with specialty paper sourcing and print production.',
      deliverables: ['Hardcover Books', 'Duotone Art Direction', 'Publication Grids', 'Print Production Management'],
    },
    {
      num: '02',
      title: 'VISUAL IDENTITY ARCHITECTURE',
      desc: 'Holistic brand identities built on rigorous typographic systems, logo marks, design guidelines, tone of voice, and physical-digital brand touchpoints.',
      deliverables: ['Brand Guidelines', 'Custom Type Specimen', 'Logo Mark & Wordmark', 'Packaging Systems'],
    },
    {
      num: '03',
      title: 'DIGITAL ARCHITECTURE & WEB',
      desc: 'Bespoke web applications and digital archives designed with Swiss layout precision, fluid motion physics, custom interactive cursors, and server-side web technologies.',
      deliverables: ['Web Design & Engineering', 'Interactive Archives', 'Micro-Interactions', 'E-Commerce Portals'],
    },
    {
      num: '04',
      title: 'SPATIAL & MOTION EXPERIENCES',
      desc: 'Exhibition scenography, kinetic motion graphics, spatial signage, projection installations, and acoustic visualizers for museums, galleries, and flagship stores.',
      deliverables: ['Exhibition Graphics', 'Kinetic Typography', 'Spatial Signage', 'Video Art Direction'],
    },
  ];

  const clients = [
    { name: 'BAUHAUS ARCHIVE', loc: 'BERLIN', year: '2025' },
    { name: 'MORI ART FOUNDATION', loc: 'TOKYO', year: '2025' },
    { name: 'MONOCLE / WINKREATIVE', loc: 'LONDON', year: '2024' },
    { name: 'FONDAZIONE PRADA', loc: 'MILAN', year: '2024' },
    { name: 'VITRA INDUSTRIAL', loc: 'SWITZERLAND', year: '2025' },
    { name: 'SONY MUSIC INT.', loc: 'NEW YORK', year: '2024' },
    { name: 'ARCHIVAL PRESS', loc: 'PARIS', year: '2024' },
    { name: 'OSLO ARCHITECTURE', loc: 'NORWAY', year: '2025' },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-16 bg-white border-b border-black/10 snap-start snap-always scroll-mt-0">
      {/* Top Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 border-b border-black/10 pb-8">
        <div className="md:col-span-4">
          <span className="font-editorial-mono text-xs text-[#525252] block mb-2">
            [04. PRACTICE & CAPABILITIES]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">
            Capabilities
          </h2>
        </div>
        <div className="md:col-span-8 flex flex-col justify-end">
          <p className="text-lg text-[#525252] max-w-2xl leading-relaxed">
            We partner with cultural institutions, architecture practices, and luxury brands that demand disciplined execution, timeless monochrome aesthetics, and optical legibility.
          </p>
        </div>
      </div>

      {/* Accordion List for Capabilities */}
      <div className="mb-24">
        {capabilities.map((cap, idx) => {
          const isOpen = activeAccordion === idx;
          return (
            <div
              key={cap.num}
              className="border-b border-black/10 py-6 transition-colors hover:bg-neutral-50/50"
            >
              <button
                onClick={() => setActiveAccordion(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="font-editorial-mono text-sm font-bold text-black border border-black px-2.5 py-1">
                    {cap.num}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight uppercase group-hover:underline">
                    {cap.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black transition-colors">
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="mt-6 pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 pl-0 md:pl-16">
                  <div className="md:col-span-8">
                    <p className="text-base text-[#525252] leading-relaxed mb-6">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block mb-3">
                      DELIVERABLES:
                    </span>
                    <ul className="space-y-2">
                      {cap.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 font-editorial-mono text-xs text-black">
                          <Check className="w-3.5 h-3.5 text-black" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Client Roster Archive */}
      <div className="pt-12 border-t border-black/10">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <span className="font-editorial-mono text-xs text-[#525252] block mb-1">
              [CLIENT ROSTER & ARCHIVE]
            </span>
            <h3 className="text-2xl font-bold tracking-tight">Institutional Collaborators</h3>
          </div>
          <button
            onClick={onStartProject}
            className="font-editorial-mono text-xs uppercase tracking-widest underline hover:text-[#525252] transition-colors"
          >
            BECOME A PARTNER (→)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map((c, idx) => (
            <div
              key={idx}
              className="p-5 border border-black/10 hover:border-black transition-all duration-300 flex flex-col justify-between h-32 hover:bg-neutral-50"
            >
              <div className="flex justify-between items-start font-editorial-mono text-[10px] text-[#525252]">
                <span>{c.loc}</span>
                <span>{c.year}</span>
              </div>
              <div className="font-bold text-base tracking-tight text-black uppercase">
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
