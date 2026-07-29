'use client';

import React, { useState, useRef } from 'react';
import CustomCursor from '@/components/CustomCursor';
import NavigationHeader from '@/components/NavigationHeader';
import HeroSection from '@/components/HeroSection';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import IntroStatement from '@/components/IntroStatement';
import ProjectGrid from '@/components/ProjectGrid';
import StudioPractice from '@/components/StudioPractice';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import InquiryDrawer from '@/components/InquiryDrawer';
import GridOverlay from '@/components/GridOverlay';
import PageTransitionWipe, { PageTransitionWipeRef } from '@/components/PageTransitionWipe';
import DynamicFavicon from '@/components/DynamicFavicon';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import { PROJECTS_DATA, Project } from '@/lib/projectsData';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const wipeRef = useRef<PageTransitionWipeRef>(null);

  const handleSelectProject = (proj: Project) => {
    wipeRef.current?.triggerWipe(() => {
      setSelectedProject(proj);
    }, proj.title);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    const nextProj = PROJECTS_DATA[nextIndex];
    wipeRef.current?.triggerWipe(() => {
      setSelectedProject(nextProj);
    }, nextProj.title);
  };

  const handleOpenInquiry = () => {
    wipeRef.current?.triggerWipe(() => {
      setIsInquiryOpen(true);
    }, 'COMMISSION BRIEF');
  };

  const scrollToGrid = () => {
    wipeRef.current?.triggerWipe(() => {
      const el = document.getElementById('grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 'EXPLORE INDEX');
  };

  return (
    <main className="min-h-screen bg-white text-black relative selection:bg-black selection:text-white">
      {/* Scroll Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Dynamic Adaptive System Favicon */}
      <DynamicFavicon />

      {/* 0. Global Page Transition Screen Wipe Overlay */}
      <PageTransitionWipe ref={wipeRef} initialReveal={true} />

      {/* 1. Custom Interactive Difference Cursor */}
      <CustomCursor />

      {/* 2. Optional Swiss 12-Column Grid Lines Overlay */}
      <GridOverlay show={showGrid} />

      {/* 3. Navigation Header */}
      <NavigationHeader
        onOpenInquiry={handleOpenInquiry}
        toggleGrid={() => setShowGrid(!showGrid)}
        showGrid={showGrid}
      />

      {/* 4. Hero Section */}
      <HeroSection
        onExploreClick={scrollToGrid}
        onStartProject={handleOpenInquiry}
      />

      {/* 5. Infinite Motion Marquee Section */}
      <InfiniteMarquee
        projects={PROJECTS_DATA}
        onSelectProject={handleSelectProject}
      />

      {/* 6. Centered Manifesto Statement */}
      <IntroStatement />

      {/* 7. Balanced Two-Column Project Grid */}
      <ProjectGrid
        projects={PROJECTS_DATA}
        onSelectProject={handleSelectProject}
      />

      {/* 8. Studio Capabilities & Practice */}
      <StudioPractice
        onStartProject={handleOpenInquiry}
      />

      {/* 9. Dark High-Contrast Footer */}
      <Footer
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 10. Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNextProject={handleNextProject}
      />

      {/* 11. Commission Brief / Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* 12. Floating Back to Top Button */}
      <BackToTop />
    </main>
  );
}
