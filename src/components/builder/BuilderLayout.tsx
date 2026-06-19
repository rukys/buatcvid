'use client';

import React, { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import MiniPreview from './MiniPreview';
import StepProgress from './StepProgress';

export interface BuilderLayoutProps {
  children: React.ReactNode;
}

export default function BuilderLayout({ children }: BuilderLayoutProps) {
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Escape key to close mobile preview drawer
  useEffect(() => {
    if (!showMobilePreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMobilePreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMobilePreview]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 pb-28 md:pb-6">
      {/* 1. Sticky Top Progress Tracker */}
      <StepProgress />

      {/* 2. Responsive Multi-column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Steps (60% width on desktop) */}
          <div className="lg:col-span-7 space-y-6 bg-white border border-gray-200 rounded-lg p-5 sm:p-8 shadow-sm">
            {children}
          </div>

          {/* Right Column: Live Sticky Miniature Preview Sidebar (40% width on desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left pl-1">
                Live Preview (A4 Mockup)
              </h3>
              <MiniPreview />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Mobile Floating "Lihat Preview" Button */}
      <button
        onClick={() => setShowMobilePreview(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-500 active:scale-95 transition-all flex items-center justify-center gap-2 border border-primary-500/20"
        aria-label="Tampilkan preview resume"
      >
        <Eye className="w-5 h-5" />
        <span className="text-sm font-semibold pr-1">Lihat Preview</span>
      </button>

      {/* 4. Mobile Preview Drawer/Overlay Modal */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 animate-[fadeIn_200ms_ease] flex flex-col justify-end">
          
          {/* Overlay Background click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setShowMobilePreview(false)} />
          
          {/* Slide up Container */}
          <div className="bg-white rounded-t-lg shadow-lg flex flex-col max-h-[85vh] w-full animate-[slideUp_250ms_ease-out]">
            
            {/* Header control */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 flex-shrink-0">
              <h3 className="font-heading font-bold text-gray-950 text-sm">
                Preview Resume Kamu
              </h3>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-colors"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Preview body */}
            <div className="p-4 overflow-y-auto flex-1 bg-gray-100 flex justify-center items-center">
              <div className="w-full max-w-[360px]">
                <MiniPreview />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
