'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { X, ArrowRight, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNextProject: () => void;
}

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  projectTitle: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function ImageViewer({ images, currentIndex, projectTitle, onClose, onNavigate }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchDistanceRef = useRef<number | null>(null);

  const activeSrc = images[currentIndex];

  const handleNavigate = React.useCallback(
    (newIndex: number) => {
      setScale(1);
      onNavigate(newIndex);
    },
    [onNavigate]
  );

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        handleNavigate(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(currentIndex - 1);
      } else if (e.key === '+' || e.key === '=') {
        setScale((prev) => Math.min(prev + 0.5, 4));
      } else if (e.key === '-') {
        setScale((prev) => Math.max(prev - 0.5, 1));
      } else if (e.key === '0') {
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, handleNavigate]);

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.003;
    setScale((prev) => {
      const nextScale = Math.min(Math.max(prev + delta, 1), 4);
      return nextScale;
    });
  };

  // Pinch touch zoom handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistanceRef.current;
      touchDistanceRef.current = dist;
      setScale((prev) => Math.min(Math.max(prev * factor, 1), 4));
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
  };

  const toggleDoubleTapZoom = () => {
    setScale((prev) => (prev > 1.2 ? 1 : 2.5));
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-between select-none"
    >
      {/* Top Header Bar */}
      <div className="w-full px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent text-white font-editorial-mono text-xs">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400 uppercase tracking-widest">[HIGH-RES EXHIBITION VIEWER]</span>
          <span className="hidden sm:inline-block text-neutral-600">•</span>
          <span className="hidden sm:inline-block uppercase tracking-widest font-bold">{projectTitle}</span>
          <span className="text-neutral-500">
            ({currentIndex + 1} / {images.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={toggleDoubleTapZoom}
        className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing p-4"
      >
        <motion.div
          key={currentIndex}
          drag={scale > 1}
          dragConstraints={{ left: -400 * scale, right: 400 * scale, top: -300 * scale, bottom: 300 * scale }}
          dragElastic={0.05}
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-5xl h-full flex items-center justify-center"
        >
          <Image
            src={activeSrc}
            alt={`${projectTitle} fullscreen view ${currentIndex + 1}`}
            fill
            className="object-contain pointer-events-none"
            referrerPolicy="no-referrer"
            priority
          />
        </motion.div>
      </div>

      {/* Previous / Next Side Arrow Controls */}
      {currentIndex > 0 && (
        <button
          onClick={() => handleNavigate(currentIndex - 1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={() => handleNavigate(currentIndex + 1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      )}

      {/* Bottom Control Toolbar */}
      <div className="w-full pb-6 pt-3 px-6 flex items-center justify-center z-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-editorial-mono text-xs shadow-2xl">
          <button
            onClick={zoomOut}
            disabled={scale <= 1}
            className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors"
            title="Zoom out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="w-16 text-center font-bold tracking-widest text-[11px]">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 4}
            className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={resetZoom}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1.5 text-[10px] uppercase font-semibold"
            title="Reset Zoom (0)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectModal({ project, onClose, onNextProject }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!project) return null;

  const allImages = [project.coverImage, ...project.secondaryImages];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-0 sm:p-6 md:p-12">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Content Window */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-6xl bg-white text-black my-auto rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border border-black/20 flex flex-col min-h-screen sm:min-h-0"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 md:px-10 py-5 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3 font-editorial-mono text-xs uppercase tracking-widest text-[#525252]">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span>CASE STUDY / {project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Close project detail"
              data-cursor-text="CLOSE"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Modal Body Scroll */}
          <div className="p-6 md:p-12 space-y-12">
            {/* Title & Metadata Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-black/10 pb-10">
              <div className="md:col-span-8">
                <span className="font-editorial-mono text-xs text-[#525252] uppercase tracking-widest block mb-2">
                  PROJECT NO. {project.id}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
                  {project.title}
                </h2>
                <p className="text-lg text-[#525252] mt-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Sidebar Metadata */}
              <div className="md:col-span-4 space-y-4 font-editorial-mono text-xs border-l border-black/10 pl-0 md:pl-8">
                <div>
                  <span className="text-[#525252] block uppercase tracking-widest text-[10px]">CLIENT:</span>
                  <span className="font-bold text-black text-sm">{project.client}</span>
                </div>
                <div>
                  <span className="text-[#525252] block uppercase tracking-widest text-[10px]">YEAR:</span>
                  <span className="font-bold text-black text-sm">{project.year}</span>
                </div>
                <div>
                  <span className="text-[#525252] block uppercase tracking-widest text-[10px]">TYPOGRAPHY SPEC:</span>
                  <span className="font-bold text-black text-sm">{project.typography}</span>
                </div>
                <div>
                  <span className="text-[#525252] block uppercase tracking-widest text-[10px]">DELIVERABLES:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.deliverables.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-neutral-100 text-black border border-black/10 text-[10px] uppercase font-bold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* High-Resolution Imagery Gallery */}
            <div className="space-y-8">
              <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block">
                [EXHIBITION ARTWORK GALLERY]
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allImages.map((imgUrl, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setActiveImageIndex(imgIdx)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer bg-neutral-100 border border-black/10"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${project.title} figure ${imgIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover editorial-img-transition pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Specimen Callout Box */}
            <div className="p-8 bg-neutral-900 text-white rounded-xl font-editorial-mono space-y-4">
              <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-white/10 pb-3">
                <span>[TYPOGRAPHIC SPECIMEN]</span>
                <span>{project.typography}</span>
              </div>
              <div className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white leading-none">
                Aa Bb Cc 0123456789
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Set in high-density optical size variants with negative side-bearings and precise line geometry.
              </p>
            </div>
          </div>

          {/* Modal Footer Navigation */}
          <div className="p-6 md:p-8 bg-neutral-50 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-black/20 text-black font-editorial-mono text-xs uppercase tracking-widest hover:border-black transition-colors"
            >
              CLOSE CASE STUDY
            </button>

            <button
              onClick={onNextProject}
              className="w-full sm:w-auto px-8 py-3 bg-black text-white font-editorial-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
            >
              <span>NEXT CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Fullscreen Pinch-to-Zoom & Pan Image Viewer */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <ImageViewer
              images={allImages}
              currentIndex={activeImageIndex}
              projectTitle={project.title}
              onClose={() => setActiveImageIndex(null)}
              onNavigate={(index) => setActiveImageIndex(index)}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
