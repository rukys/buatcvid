'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Typing simulation steps
type AnimationStep = 'idle' | 'typing-name' | 'typing-position' | 'generating-summary' | 'generating-bullet' | 'completed';

export default function HeroSection() {
  const [animationStep, setAnimationStep] = useState<AnimationStep>('idle');
  const [typedName, setTypedName] = useState('');
  const [typedPosition, setTypedPosition] = useState('');
  const [typedSummary, setTypedSummary] = useState('');
  const [typedBullet, setTypedBullet] = useState('');

  // Simulation text configurations
  const targetName = 'Rian Pratama';
  const targetPosition = 'Social Media Specialist';
  const targetSummary = 'Spesialis pemasaran digital berpengalaman 3+ tahun dalam mengelola kampanye media sosial kreatif. Terbukti meningkatkan engagement rate hingga 120% dan brand awareness.';
  const targetBullet = 'Mengelola budget iklan Rp30jt/bulan dan meningkatkan konversi penjualan sebesar 45% melalui kampanye TikTok Ads.';

  useEffect(() => {
    // Start animation sequence after 500ms
    const startTimeout = setTimeout(() => setAnimationStep('typing-name'), 800);
    return () => clearTimeout(startTimeout);
  }, []);

  // 1. Name typing
  useEffect(() => {
    if (animationStep !== 'typing-name') return;
    let idx = 0;
    const interval = setInterval(() => {
      const char = targetName[idx];
      if (char !== undefined) {
        setTypedName((prev) => prev + char);
      }
      idx++;
      if (idx >= targetName.length) {
        clearInterval(interval);
        setTimeout(() => setAnimationStep('typing-position'), 600);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [animationStep]);

  // 2. Position typing
  useEffect(() => {
    if (animationStep !== 'typing-position') return;
    let idx = 0;
    const interval = setInterval(() => {
      const char = targetPosition[idx];
      if (char !== undefined) {
        setTypedPosition((prev) => prev + char);
      }
      idx++;
      if (idx >= targetPosition.length) {
        clearInterval(interval);
        setTimeout(() => setAnimationStep('generating-summary'), 800);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [animationStep]);

  // 3. AI Summary writing
  useEffect(() => {
    if (animationStep !== 'generating-summary') return;
    let idx = 0;
    // Simulate initial AI processing delay
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        const char = targetSummary[idx];
        if (char !== undefined) {
          setTypedSummary((prev) => prev + char);
        }
        idx++;
        if (idx >= targetSummary.length) {
          clearInterval(interval);
          setTimeout(() => setAnimationStep('generating-bullet'), 800);
        }
      }, 15);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(delay);
  }, [animationStep]);

  // 4. AI Bullet writing
  useEffect(() => {
    if (animationStep !== 'generating-bullet') return;
    let idx = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        const char = targetBullet[idx];
        if (char !== undefined) {
          setTypedBullet((prev) => prev + char);
        }
        idx++;
        if (idx >= targetBullet.length) {
          clearInterval(interval);
          setTimeout(() => setAnimationStep('completed'), 1000);
        }
      }, 15);
      return () => clearInterval(interval);
    }, 850);
    return () => clearTimeout(delay);
  }, [animationStep]);

  // 5. Reset sequence for continuous display
  useEffect(() => {
    if (animationStep !== 'completed') return;
    const loopTimeout = setTimeout(() => {
      setTypedName('');
      setTypedPosition('');
      setTypedSummary('');
      setTypedBullet('');
      setAnimationStep('typing-name');
    }, 6000); // Wait 6 seconds on complete before restarting loop
    return () => clearTimeout(loopTimeout);
  }, [animationStep]);

  return (
    <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gray-50">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-100/30 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Marketing Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-[pulse_2s_infinite]" />
              AI Resume Writer Untuk Pasar Kerja Indonesia
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-gray-950 tracking-tight leading-[1.08] lg:-mr-4">
              Susah Bikin Kalimat Kerja CV? Biar <span className="text-primary-600">AI Kami</span> yang Tulis.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 leading-normal max-w-xl mx-auto lg:mx-0">
              Buat resume ATS-friendly profesional dalam 5 menit. AI kami secara otomatis menyusun kalimat deskripsi kerja bernilai jual tinggi sesuai bidang pekerjaanmu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/builder" className="w-full sm:w-auto no-underline">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md"
                  iconRight={<ArrowRight className="w-5 h-5" />}
                >
                  Buat CV Gratis Sekarang
                </Button>
              </Link>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                ⚡ Tanpa Registrasi · 100% Gratis
              </span>
            </div>

            {/* Trust Indicator */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                <span className="inline-block w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary-600">A</span>
                <span className="inline-block w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600">S</span>
                <span className="inline-block w-8 h-8 rounded-full bg-success-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-success-500">M</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Dipercaya oleh <span className="text-gray-950 font-semibold">15.000+ pencari kerja</span> di Indonesia untuk melamar magang, BUMN, hingga tech startups.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Simulated CV Typing Preview */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[480px] bg-white rounded-lg border border-gray-200 shadow-lg relative p-6 space-y-5 select-none overflow-hidden h-[460px] flex flex-col justify-start">
              
              {/* Paper Top Header Line indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-600" />
              
              {/* Simulated Editor Info Header */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-3 mb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                  <span className="ml-1 font-mono">cv_rian_pratama.pdf</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-primary-600">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>AI Writing Live</span>
                </div>
              </div>

              {/* Dynamic CV Document Preview Body */}
              <div className="space-y-4 flex-1 overflow-hidden pr-1 font-body text-gray-800 text-left">
                {/* Header Section */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-gray-950 tracking-tight min-h-[28px] flex items-center justify-center">
                    {typedName}
                    {(animationStep === 'typing-name' || animationStep === 'idle') && (
                      <span className="w-0.5 h-4.5 bg-primary-600 inline-block ml-0.5 animate-[pulse_0.8s_infinite]" />
                    )}
                  </h3>
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider min-h-[18px] flex items-center justify-center">
                    {typedPosition}
                    {animationStep === 'typing-position' && (
                      <span className="w-0.5 h-3.5 bg-primary-600 inline-block ml-0.5 animate-[pulse_0.8s_infinite]" />
                    )}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Jakarta, Indonesia · rianpratama@email.com · +62 812-3456-7890
                  </p>
                </div>

                {/* Profile Summary Block */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-wide border-b border-gray-200 pb-0.5">
                    Ringkasan Profil
                  </h4>
                  <div
                    className={`text-[10px] text-gray-600 leading-normal min-h-[42px] transition-all p-1.5 rounded ${
                      animationStep === 'generating-summary'
                        ? 'bg-ai-glow/40 border border-primary-100 animate-[pulse_2s_infinite]'
                        : 'bg-transparent border border-transparent'
                    }`}
                  >
                    {animationStep === 'generating-summary' && typedSummary === '' && (
                      <span className="italic text-gray-400">🤖 AI sedang menulis paragraf ringkasan...</span>
                    )}
                    {typedSummary}
                    {animationStep === 'generating-summary' && typedSummary !== '' && (
                      <span className="w-0.5 h-3 bg-primary-600 inline-block ml-0.5 animate-[pulse_0.8s_infinite]" />
                    )}
                  </div>
                </div>

                {/* Experience Block */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-wide border-b border-gray-200 pb-0.5">
                    Pengalaman Kerja
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-900">
                      <span>Social Media Specialist · Kopi Digital Agency</span>
                      <span className="font-normal text-gray-500">Jan 2023 – Sekarang</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[9.5px] text-gray-600">
                      <li>Mengembangkan strategi konten kreatif bulanan untuk Instagram dan TikTok.</li>
                      <li
                        className={`transition-all p-1 rounded list-none -ml-4 pl-4 relative ${
                          animationStep === 'generating-bullet'
                            ? 'bg-ai-glow/40 border border-primary-100 animate-[pulse_2s_infinite]'
                            : 'bg-transparent border border-transparent'
                        }`}
                      >
                        {animationStep === 'generating-bullet' && typedBullet === '' && (
                          <span className="italic text-gray-400">🤖 AI sedang menyusun bullet pencapaian kerja...</span>
                        )}
                        {typedBullet && <span className="absolute left-1">.</span>}
                        {typedBullet}
                        {animationStep === 'generating-bullet' && typedBullet !== '' && (
                          <span className="w-0.5 h-3 bg-primary-600 inline-block ml-0.5 animate-[pulse_0.8s_infinite]" />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Floating Widget */}
              {animationStep === 'completed' && (
                <div className="absolute bottom-6 left-6 right-6 bg-success-50 border border-success-500 rounded-lg p-3 shadow-md flex items-center gap-3 animate-[slideUp_0.3s_ease-out] z-10">
                  <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-950">CV Siap Didownload!</p>
                    <p className="text-[10px] text-gray-500">100% ATS-Friendly & Siap Lamar.</p>
                  </div>
                  <Link href="/builder" className="ml-auto no-underline">
                    <Button variant="primary" size="sm" className="text-[11px] py-1.5 px-3">
                      Buat Sekarang
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
