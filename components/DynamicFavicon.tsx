'use client';

import { useEffect } from 'react';

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      // Light mode: white background, black 'ILRKSY' text
      // Dark mode: black background, white 'ILRKSY' text
      const bgColor = isDark ? '#000000' : '#FFFFFF';
      const textColor = isDark ? '#FFFFFF' : '#000000';
      const strokeColor = isDark ? '#333333' : '#E5E5E5';

      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <rect width="64" height="64" fill="${bgColor}" rx="14"/>
        <rect x="2" y="2" width="60" height="60" fill="none" stroke="${strokeColor}" stroke-width="2" rx="12"/>
        <text x="32" y="40" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="13" letter-spacing="-0.5px" fill="${textColor}" text-anchor="middle">ILRKSY</text>
      </svg>`;

      const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.type = 'image/svg+xml';
      link.href = encodedSvg;
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      updateFavicon(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return null;
}
