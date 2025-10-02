'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Import Button component

export default function RugbyIntelHubPage() {
  return (
    <div className="py-8 flex flex-col items-center justify-center min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gradient">Rugby Intel Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your central portal for all North Harbour Rugby intelligence.
        </p>
      </header>

      <a href="https://north-harbour-performance-tradiesai.replit.app/" target="_blank" rel="noopener noreferrer" className="relative h-[60vh] w-full max-w-screen-lg mx-auto mb-8 block transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-500 shadow-md rounded-lg"> {/* Container for the image, now clickable, animated, with border and shadow */}
        <Image
          src="https://static.wixstatic.com/media/7b20bf_22c47b5ec1a840e09e87f4e0120f07b1~mv2.png"
          alt="Rugby Intel Hub Background"
          layout="fill"
          objectFit="contain"
          quality={100}
          className="z-0"
        />
      </a>

      <a href="https://north-harbour-performance-tradiesai.replit.app/" target="_blank" rel="noopener noreferrer">
        <Button size="lg">
          Access Rugby Intel Portal
        </Button>
      </a>
    </div>
  );
}
