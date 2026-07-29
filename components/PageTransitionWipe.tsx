'use client';

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playTransitionSound } from '@/lib/audio';

export interface PageTransitionWipeRef {
  triggerWipe: (onMidwayCallback?: () => void, label?: string) => void;
}

const PageTransitionWipe = forwardRef<PageTransitionWipeRef, { initialReveal?: boolean }>(
  ({ initialReveal = true }, ref) => {
    const [isWiping, setIsWiping] = useState(false);
    const [initialDone, setInitialDone] = useState(!initialReveal);
    const [wipeText, setWipeText] = useState<string>('SD EDITORIAL STUDIO');

    useEffect(() => {
      if (initialReveal) {
        const timer = setTimeout(() => {
          setInitialDone(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }, [initialReveal]);

    useImperativeHandle(ref, () => ({
      triggerWipe: (onMidwayCallback?: () => void, label?: string) => {
        if (isWiping) return;
        playTransitionSound();
        if (label) setWipeText(label);
        setIsWiping(true);

        // Halfway when screen is fully covered by black curtain
        setTimeout(() => {
          if (onMidwayCallback) onMidwayCallback();
        }, 500);

        // Complete transition wipe
        setTimeout(() => {
          setIsWiping(false);
        }, 1000);
      },
    }));

    return (
      <>
        {/* Initial Page Load Curtain Reveal */}
        <AnimatePresence>
          {!initialDone && (
            <motion.div
              key="initial-curtain"
              initial={{ y: '0%' }}
              animate={{ y: '-100%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="fixed inset-0 z-[10000] bg-[#0A0A0A] text-white flex flex-col justify-between p-8 md:p-16 pointer-events-none"
            >
              <div className="flex justify-between items-center font-editorial-mono text-xs text-neutral-400">
                <span>[SD EDITORIAL ARCHIVE]</span>
                <span>2026</span>
              </div>

              <div className="my-auto text-center">
                <span className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none block">
                  sd
                </span>
                <span className="font-editorial-mono text-xs text-neutral-500 tracking-widest uppercase mt-4 block">
                  EDITORIAL STUDIO & PRACTICE
                </span>
              </div>

              <div className="flex justify-between items-center font-editorial-mono text-[10px] text-neutral-500">
                <span>SWISS TYPOGRAPHIC DISCIPLINE</span>
                <span>LOADING ASSETS...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Action Triggered Screen Wipe Overlay */}
        <AnimatePresence>
          {isWiping && (
            <div className="fixed inset-0 z-[9995] pointer-events-none overflow-hidden">
              <motion.div
                key="wipe-curtain"
                initial={{ y: '100%' }}
                animate={{ y: ['100%', '0%', '0%', '-100%'] }}
                transition={{
                  duration: 1.1,
                  times: [0, 0.45, 0.55, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-8 border-y border-white/10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
                  transition={{ duration: 1.1, times: [0, 0.3, 0.7, 1] }}
                  className="text-center font-editorial-mono"
                >
                  <span className="text-4xl md:text-6xl font-bold tracking-tighter block text-white uppercase mb-2">
                    sd
                  </span>
                  <span className="text-xs tracking-widest text-neutral-400 uppercase">
                    {wipeText}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

PageTransitionWipe.displayName = 'PageTransitionWipe';

export default PageTransitionWipe;
