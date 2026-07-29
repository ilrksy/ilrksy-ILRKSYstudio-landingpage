'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function IntroStatement() {
  const pillars = [
    {
      num: '01',
      title: 'RADICAL SIMPLICITY',
      desc: 'Eliminating non-essential decorative noise. Every pixel, margin, and character grid serves an architectural purpose.',
    },
    {
      num: '02',
      title: 'OPTICAL PRECISION',
      desc: 'Applying rigorous Swiss mathematical scale ratios, custom kerning curves, and balanced negative space to elevate legibility.',
    },
    {
      num: '03',
      title: 'PHYSICAL & DIGITAL',
      desc: 'Bridging tactile print craftsmanship with fluid, motion-driven digital web applications for an uncompromising visual identity.',
    },
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-16 bg-white border-b border-black/10 snap-start snap-always scroll-mt-0">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial-mono text-xs text-[#525252] uppercase tracking-widest block mb-6"
        >
          [02. MANIFESTO & PHILOSOPHY]
        </motion.span>

        {/* Big Editorial Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-black leading-[1.08] mb-12"
        >
          WE SHAPE DISCIPLINED VISUAL SYSTEMS, EDITORIAL ARTIFACTS, AND HIGH-CONTRAST DIGITAL ARCHITECTURE FOR FORWARD-THINKING BRANDS AND CULTURAL INSTITUTIONS.
        </motion.h2>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16 pt-12 border-t border-black/10">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + idx * 0.15,
              }}
              className="p-6 border border-black/10 hover:border-black transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-editorial-mono text-xs mb-4">
                {pillar.num}
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
