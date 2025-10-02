'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Added Image import

// Local component for a larger logo on this page only
function LargeLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="https://static.wixstatic.com/media/7b20bf_b9afb1293719453b8e27049e8551ac48~mv2.png"
        alt="North Harbour Rugby Logo"
        width={120} // 3x original size
        height={120} // 3x original size
        className="object-contain"
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <style>{`
        @keyframes subtle-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-pan-animation {
          animation: subtle-pan 30s ease-in-out infinite;
        }
      `}</style>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white overflow-hidden">
        {/* 1. Background Image with Pan Animation */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 opacity-25 bg-pan-animation"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080/000000/FFFFFF/png?text=NHR')" }}
        />

        {/* 2. AI Tech Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/80 to-blue-950/70 z-10" />
        
        {/* 3. Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 z-20" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* 4. Main Content */}
        <main className="relative z-30 flex flex-col items-center text-center px-4">
          <div className="mb-8">
            <LargeLogo />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-[0_2px_15px_rgba(0,0,0,0.5)] leading-tight">
            <span className="text-blue-400">AI Intelligence Hub</span>
          </h1>
          
          <div className="mt-12">
            <Link href="/login/email-password">
                 <Button size="lg" className="px-10 py-6 text-lg bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                    Login
                </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}