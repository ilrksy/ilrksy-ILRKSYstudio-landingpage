export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  aspectRatio?: string;
  asymmetricalCorners?: string;
  coverImage: string;
  secondaryImages: string[];
  description: string;
  deliverables: string[];
  typography: string;
  featuredInMarquee?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "bauhaus-archive",
    title: "Bauhaus Centenary Archive",
    category: "Editorial & Print",
    year: "2025",
    client: "Bauhaus Archive Museum, Berlin",
    asymmetricalCorners: "rounded-tl-[100px] rounded-br-[24px]",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A 480-page hardcover publication documenting a century of elemental geometry, functionalist typography, and industrial craftsmanship. Features high-density duotone printing on uncoated Munken papers.",
    deliverables: ["Publication Design", "Duotone Art Direction", "Archive Curation", "Custom Type Specimen"],
    typography: "Inter Display 700 & JetBrains Mono",
    featuredInMarquee: true
  },
  {
    id: "tokyo-spatial-monograph",
    title: "Tokyo Spatial Monograph",
    category: "Identity & Books",
    year: "2025",
    client: "Mori Art Foundation, Tokyo",
    asymmetricalCorners: "rounded-tr-[100px] rounded-bl-[40px]",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architectural identity and photographic monograph examining urban density, concrete brutalism, and hidden vertical alleyways in Ginza and Roppongi.",
    deliverables: ["Visual Identity System", "Hardcover Monograph", "Exhibition Scenography", "Signage"],
    typography: "Inter Regular & Helvetica Neue UltraLight",
    featuredInMarquee: true
  },
  {
    id: "monocle-residence-04",
    title: "Monocle Residence No. 04",
    category: "Digital Architecture",
    year: "2024",
    client: "Winkreative / Monocle, London",
    asymmetricalCorners: "rounded-[40px]",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Digital web architecture and spatial experience for an ultra-limited residential architectural development in Zurich, focusing on minimalist layout hierarchy and motion.",
    deliverables: ["Digital Experience", "Editorial Art Direction", "Interactive Floorplans", "Video Direction"],
    typography: "GT America Mono & Sabon Antiqua",
    featuredInMarquee: true
  },
  {
    id: "prada-culture-sound",
    title: "Prada Culture & Sound",
    category: "Spatial & Motion",
    year: "2024",
    client: "Fondazione Prada, Milan",
    asymmetricalCorners: "rounded-tl-[40px] rounded-br-[100px]",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Multi-sensory acoustic identity and motion graphic installations for an experimental electronic sound exhibition at Fondazione Prada's Osservatorio.",
    deliverables: ["Kinetic Motion Graphics", "Acoustic Poster System", "Spatial Projection", "Audio Vinyl Packaging"],
    typography: "Custom High-Contrast Sans",
    featuredInMarquee: true
  },
  {
    id: "archival-press-monograph",
    title: "Archival Press Vol. VII",
    category: "Editorial & Print",
    year: "2024",
    client: "Archival Press, New York",
    asymmetricalCorners: "rounded-tr-[40px] rounded-bl-[20px]",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A limited publication investigating high-contrast Swiss typography, darkroom silver gelatin prints, and brutalist page grids from 1960–1980.",
    deliverables: ["Grid Design", "Type Specs", "Print Production", "Binding System"],
    typography: "Helvetica Neue & Univers Mono",
    featuredInMarquee: false
  },
  {
    id: "vitra-furniture-identity",
    title: "Vitra Industrial Artifacts",
    category: "Identity & Branding",
    year: "2025",
    client: "Vitra AG, Weil am Rhein",
    asymmetricalCorners: "rounded-tl-[80px] rounded-tr-[20px]",
    coverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Reinterpreting mid-century modernist furniture manufacturing into a sleek 2026 digital and print identity system.",
    deliverables: ["Brand Strategy", "Design System", "Product Catalog", "Web UI Architecture"],
    typography: "Inter Tight & JetBrains Mono",
    featuredInMarquee: false
  },
  {
    id: "sony-analog-soundscape",
    title: "Sony Analog Soundscape",
    category: "Spatial & Motion",
    year: "2024",
    client: "Sony Music International",
    asymmetricalCorners: "rounded-br-[80px] rounded-tl-[20px]",
    coverImage: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-contrast tactile vinyl sleeves and generative typography motion art for analog synthesizer master recordings.",
    deliverables: ["Vinyl Packaging", "Generative Motion", "Interactive Web Portal", "Press Kit"],
    typography: "Inter Bold & Courier Prime",
    featuredInMarquee: false
  },
  {
    id: "nordic-concrete-journal",
    title: "Nordic Concrete Journal",
    category: "Editorial & Print",
    year: "2025",
    client: "Oslo School of Architecture",
    asymmetricalCorners: "rounded-tr-[90px]",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architectural periodical examining raw concrete forms, winter sunlight angles, and Scandinavian interior restraint.",
    deliverables: ["Magazine Layout", "Paper Sourcing", "Typographic Grid", "Digital Archive"],
    typography: "Inter Display & JetBrains Mono",
    featuredInMarquee: false
  }
];
