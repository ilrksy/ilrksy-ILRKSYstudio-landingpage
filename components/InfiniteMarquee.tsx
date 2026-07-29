'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { ArrowUpRight } from 'lucide-react';

interface InfiniteMarqueeProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function InfiniteMarquee({ projects, onSelectProject }: InfiniteMarqueeProps) {
  // Duplicate array to guarantee seamless marquee loop
  const marqueeItems = [...projects, ...projects, ...projects];

  return (
    <section id="marquee" className="py-16 bg-white overflow-hidden border-b border-black/10 snap-start snap-always scroll-mt-0">
      {/* Header Label */}
      <div className="px-6 md:px-16 mb-8 flex justify-between items-end">
        <div>
          <span className="font-editorial-mono text-xs text-[#525252] block mb-1">
            [01. FEATURED ARCHIVE]
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Infinite Motion Index
          </h2>
        </div>
        <div className="hidden sm:block font-editorial-mono text-xs text-[#525252]">
          PAUSE ON HOVER — CLICK TO VIEW CASE STUDY
        </div>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex gap-6 md:gap-8 py-4">
          {marqueeItems.map((project, idx) => {
            // Apply alternating asymmetrical rounded corners
            const borderStyles = [
              "rounded-tl-[100px] rounded-br-[24px]",
              "rounded-tr-[100px] rounded-bl-[40px]",
              "rounded-[40px]",
              "rounded-tl-[40px] rounded-br-[100px]",
              "rounded-tr-[60px] rounded-bl-[20px]"
            ][idx % 5];

            return (
              <div
                key={`${project.id}-${idx}`}
                onClick={() => onSelectProject(project)}
                className={`w-[260px] sm:w-[320px] aspect-[5/7] flex-shrink-0 relative overflow-hidden group cursor-pointer bg-neutral-900 border border-black/10 project-card ${borderStyles}`}
                data-cursor-text="VIEW"
              >
                {/* Background Image with 700ms grayscale to color transition */}
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover editorial-img-transition pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Black Overlay on Hover (10% opacity) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                {/* Floating Top-Right Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 shadow-lg z-10">
                  <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Bottom Metadata Card */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-10 flex flex-col justify-end">
                  <span className="font-editorial-mono text-[11px] text-neutral-300 tracking-widest block mb-1">
                    {project.category} — {project.year}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="font-editorial-mono text-[10px] text-neutral-400 mt-1 uppercase">
                    CLIENT: {project.client}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
