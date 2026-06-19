import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Layout Sections */}
      <main className="flex-grow">
        {/* 1. Hero & simulated typing preview */}
        <HeroSection />

        {/* 2. Chronological How it works flow */}
        <HowItWorks />

        {/* 3. Interactive ATS Template previews */}
        <TemplateShowcase />

        {/* 4. Indonesian Job Seeker Testimonials */}
        <Testimonials />
      </main>

      {/* Repeater CTA & Sitemap Footer */}
      <Footer />
    </div>
  );
}
