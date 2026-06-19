'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AccentColor, ACCENT_COLORS } from '@/types/resume';

export default function TemplateShowcase() {
  const [activeColor, setActiveColor] = useState<AccentColor>('#2563EB');

  const templates = [
    {
      id: 'clean',
      name: 'Clean (Bersih)',
      desc: 'Single column layout, ATS-strict yang sangat direkomendasikan untuk posisi korporat formal.',
      badge: 'Paling Populer',
      renderMini: (color: string) => (
        <div className="w-full h-full bg-white p-4 text-[6px] text-left text-gray-800 flex flex-col justify-between">
          <div className="space-y-1.5 text-center">
            <div className="w-16 h-2 bg-gray-900 mx-auto rounded-xs" />
            <div className="flex justify-center gap-1.5 text-gray-400">
              <div className="w-8 h-1 bg-gray-200 rounded-xs" />
              <div className="w-8 h-1 bg-gray-200 rounded-xs" />
              <div className="w-8 h-1 bg-gray-200 rounded-xs" />
            </div>
          </div>
          <div className="space-y-2 flex-1 pt-3">
            <div className="space-y-1">
              <div className="w-12 h-1.5 rounded-xs" style={{ backgroundColor: color }} />
              <div className="h-0.5 bg-gray-200 w-full" />
              <div className="flex justify-between">
                <div className="w-20 h-1 bg-gray-400 rounded-xs" />
                <div className="w-10 h-1 bg-gray-200 rounded-xs" />
              </div>
              <div className="w-full h-1 bg-gray-300 rounded-xs" />
            </div>
            <div className="space-y-1">
              <div className="w-12 h-1.5 rounded-xs" style={{ backgroundColor: color }} />
              <div className="h-0.5 bg-gray-200 w-full" />
              <div className="flex justify-between">
                <div className="w-16 h-1 bg-gray-400 rounded-xs" />
                <div className="w-10 h-1 bg-gray-200 rounded-xs" />
              </div>
              <div className="w-full h-1 bg-gray-300 rounded-xs" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Modern (Kreatif)',
      desc: 'Desain dua kolom dengan sidebar aksen berwarna untuk memperjelas pembagian informasi.',
      badge: 'Rekomendasi Startup',
      renderMini: (color: string) => (
        <div className="w-full h-full bg-white text-[6px] text-left text-gray-800 flex">
          {/* Sidebar */}
          <div className="w-1/3 p-3 text-white flex flex-col gap-2.5 justify-between" style={{ backgroundColor: color }}>
            <div className="space-y-1.5">
              <div className="w-10 h-2 bg-white/90 rounded-xs" />
              <div className="w-12 h-1 bg-white/60 rounded-xs" />
            </div>
            <div className="space-y-2 flex-1 pt-2">
              <div className="space-y-1">
                <div className="w-8 h-1.5 bg-white/80 rounded-xs" />
                <div className="w-10 h-1 bg-white/40 rounded-xs" />
                <div className="w-8 h-1 bg-white/40 rounded-xs" />
              </div>
              <div className="space-y-1">
                <div className="w-8 h-1.5 bg-white/80 rounded-xs" />
                <div className="w-10 h-1 bg-white/40 rounded-xs" />
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="w-12 h-1.5 bg-gray-900 rounded-xs" />
                <div className="w-full h-1 bg-gray-300 rounded-xs" />
                <div className="w-full h-1 bg-gray-200 rounded-xs" />
              </div>
              <div className="space-y-1">
                <div className="w-12 h-1.5 bg-gray-900 rounded-xs" />
                <div className="w-full h-1 bg-gray-300 rounded-xs" />
              </div>
            </div>
            <div className="space-y-1 pt-2">
              <div className="w-10 h-1.5 bg-gray-900 rounded-xs" />
              <div className="w-12 h-1 bg-gray-200 rounded-xs" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'elegant',
      name: 'Elegant (Eksekutif)',
      desc: 'Tipografi klasik premium yang menonjolkan bobot kepemimpinan dan pengalaman profesional.',
      badge: 'Premium Look',
      renderMini: (color: string) => (
        <div className="w-full h-full bg-white p-4 text-[6px] text-left text-gray-800 flex flex-col justify-between">
          <div className="space-y-1 border-b-2 pb-2" style={{ borderColor: color }}>
            <div className="w-20 h-2 bg-gray-950 rounded-xs" />
            <div className="w-12 h-1 bg-gray-500 rounded-xs" />
          </div>
          <div className="space-y-3 flex-1 pt-2.5">
            <div className="space-y-1">
              <div className="w-16 h-1.5 bg-gray-950 font-bold rounded-xs" />
              <div className="flex justify-between">
                <div className="w-14 h-1 bg-gray-600 rounded-xs" />
                <div className="w-8 h-1 bg-gray-300 rounded-xs" />
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-xs" />
            </div>
            <div className="space-y-1">
              <div className="w-16 h-1.5 bg-gray-950 font-bold rounded-xs" />
              <div className="flex justify-between">
                <div className="w-16 h-1 bg-gray-600 rounded-xs" />
                <div className="w-8 h-1 bg-gray-300 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              🎨 100% ATS-Friendly Templates
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-950 tracking-tight">
              Pilih Template CV Unggulanmu
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl">
              Semua template didesain agar mudah terbaca oleh sistem robot ATS HRD dan tetap rapi saat diprint.
            </p>
          </div>

          {/* Color Switcher Widget */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-xs font-semibold text-gray-600">Pilih Warna Aksen:</span>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200 shadow-sm">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setActiveColor(color.value)}
                  className="w-5 h-5 rounded-full relative transition-transform duration-150 active:scale-90 hover:scale-110"
                  style={{ backgroundColor: color.value }}
                  aria-label={`Pilih aksen warna ${color.label}`}
                >
                  {activeColor === color.value && (
                    <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              
              {/* Animated Showcase Thumbnail */}
              <div className="h-64 bg-gray-100 p-6 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                <div className="w-[170px] h-[220px] rounded border border-gray-200/80 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden relative">
                  {tpl.renderMini(activeColor)}
                </div>

                {/* Hover Overlay Action */}
                <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <Link href={`/builder?template=${tpl.id}`} className="no-underline">
                    <Button
                      variant="primary"
                      size="md"
                      className="shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      iconLeft={<Eye className="w-4 h-4" />}
                    >
                      Gunakan Template
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Template Card Details */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-950 font-heading text-base">{tpl.name}</h3>
                    <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {tpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{tpl.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-12 text-center">
          <Link href="/builder" className="inline-block no-underline">
            <Button variant="secondary" size="lg">
              Mulai dengan Template Bersih (Clean)
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
