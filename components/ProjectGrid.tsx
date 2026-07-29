'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  onSelectProject: (project: Project) => void;
}

function ProjectCard({ project, idx, onSelectProject }: ProjectCardProps) {
  // Motion values for normalized cursor position (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for responsive tilt without jitter
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  // 3D rotation degrees based on cursor offset
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-9, 9]);

  // Parallax translation for the image layer inside the card
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], [6, -6]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: (idx % 2) * 0.15,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelectProject(project)}
        className="group cursor-pointer flex flex-col project-card will-change-transform"
        data-cursor-text="VIEW"
      >
        {/* 1. 4:3 Aspect Ratio Image Container with Parallax Layering */}
        <div
          className="w-full aspect-[4/3] relative overflow-hidden rounded-xl bg-neutral-100 border border-black/10"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          {/* Grayscale to Color Image with Parallax Movement */}
          <motion.div
            className="absolute inset-0 w-full h-full scale-105"
            style={{ x: imgX, y: imgY }}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover editorial-img-transition pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* 2. Hover-triggered & Touch Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition-colors duration-500 pointer-events-none" />

          {/* 3. Top-Right Arrow Icon Appearing on Hover or Persistent on Touch */}
          <div
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-100 scale-90 md:scale-75 transition-all duration-500 shadow-xl z-10 border border-black/10"
            style={{ transform: 'translateZ(30px)' }}
          >
            <ArrowUpRight className="w-6 h-6 stroke-[2]" />
          </div>

          {/* Mobile Persistent Touch 'VIEW' Prompt Badge */}
          <div className="md:hidden absolute top-5 left-5 px-3 py-1 bg-white/95 text-black font-editorial-mono text-[10px] font-bold uppercase tracking-widest rounded-md z-10 border border-black/10 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
            <span>TAP TO VIEW</span>
          </div>

          {/* Client Pill */}
          <div
            className="absolute bottom-5 left-5 px-3 py-1 bg-black/80 backdrop-blur-md text-white font-editorial-mono text-[10px] uppercase tracking-widest rounded-md z-10"
            style={{ transform: 'translateZ(25px)' }}
          >
            {project.client}
          </div>
        </div>

        {/* 4. Bottom Metadata Row Separated by 1px #000000/10 border-top */}
        <div
          className="border-t border-black/10 pt-4 mt-5 flex justify-between items-baseline gap-4"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div>
            <h3 className="text-[24px] font-bold tracking-tight text-black group-hover:underline leading-snug">
              {project.title}
            </h3>
          </div>
          <div className="text-right flex-shrink-0 font-editorial-mono text-xs uppercase tracking-widest text-[#525252]">
            <span>{project.category}</span>
            <span className="mx-2 text-black/20">•</span>
            <span className="font-bold text-black">{project.year}</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectGrid({ projects, onSelectProject }: ProjectGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'EDITORIAL & PRINT', 'IDENTITY & BRANDING', 'DIGITAL ARCHITECTURE', 'SPATIAL & MOTION'];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category.toUpperCase().includes(selectedFilter.split(' ')[0]));

  return (
    <section id="grid" className="py-20 px-6 md:px-16 bg-white border-b border-black/10 snap-start snap-always scroll-mt-0">
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-black/10 pb-8">
        <div>
          <span className="font-editorial-mono text-xs text-[#525252] block mb-2">
            [03. PROJECT INDEX]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">
            Selected Works
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 font-editorial-mono text-[11px] uppercase tracking-wider transition-all duration-300 border ${
                selectedFilter === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black/20 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Grid for Desktop, Single Column for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            idx={idx}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}

