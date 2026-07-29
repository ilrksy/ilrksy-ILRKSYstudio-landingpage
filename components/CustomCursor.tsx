'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Target position (mouse current pos)
  const mousePos = useRef({ x: -100, y: -100 });
  // Current interpolated position (smooth lerp)
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Lerp loop using requestAnimationFrame
    let animationFrameId: number;
    const lerpSpeed = 0.18; // Smooth lagging effect

    const render = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpSpeed;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpSpeed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x - 16}px, ${currentPos.current.y - 16}px, 0px)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event delegation for interactive target hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover, [data-cursor]');
      
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor-text');
        if (customText) {
          setCursorText(customText);
        } else if (interactive.classList.contains('project-card') || interactive.closest('.project-card')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-black bg-white mix-blend-mode-difference pointer-events-none z-[9999] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
        isHovered ? 'scale-[2.5]' : 'scale-100'
      }`}
      style={{
        willChange: 'transform',
      }}
    >
      {cursorText && (
        <span className="text-[6px] font-mono tracking-widest font-bold text-black uppercase leading-none select-none">
          {cursorText}
        </span>
      )}
    </div>
  );
}
