import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ILRKSY — Creative Studio & Editorial Practice',
  description: 'Bold typography-first editorial design studio specializing in brand identity, digital architecture, and visual systems.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-white text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}

