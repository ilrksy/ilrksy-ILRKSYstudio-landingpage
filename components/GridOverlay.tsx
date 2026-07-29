'use client';

import React from 'react';

interface GridOverlayProps {
  show: boolean;
}

export default function GridOverlay({ show }: GridOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[45] pointer-events-none px-6 md:px-16 flex justify-between opacity-20">
      <div className="w-full h-full grid grid-cols-6 md:grid-cols-12 gap-4 border-x border-red-500">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-r border-red-500 bg-red-500/5 flex flex-col justify-between p-1">
            <span className="font-mono text-[9px] text-red-600 font-bold">COL {i + 1}</span>
            <span className="font-mono text-[9px] text-red-600">8.33%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
