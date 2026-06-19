import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      
      {/* 1. Large Repeater CTA Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-gray-900 text-center space-y-6">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-900/60 justify-center">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tanpa Biaya, Tanpa Registrasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Siap Untuk Sukses Melamar Kerja?
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Dapatkan resume standar ATS rapi yang siap dikirim ke HRD dalam waktu kurang dari 5 menit.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link href="/builder" className="w-full sm:w-auto no-underline">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Mulai Buat CV Sekarang
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Structured Footer Content Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4 text-left">
            <Link
              href="/"
              className="text-xl font-extrabold font-heading text-white tracking-tight flex items-center"
            >
              BuatCV<span className="text-primary-500">.id</span>
            </Link>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              BuatCV.id adalah AI Resume Builder gratis yang didesain khusus untuk melengkapi pencari kerja di Indonesia dengan resume standar ATS (Applicant Tracking System) yang profesional.
            </p>
          </div>

          {/* Links: Services */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Buat CV Online
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Template ATS
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Resources */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sumber Daya</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tips" className="hover:text-white transition-colors">
                  Tips & Panduan CV
                </Link>
              </li>
              <li>
                <Link href="/tips#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Copyright Block */}
        <div className="mt-12 pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            BuatCV.id © {new Date().getFullYear()} · AI Resume Builder Indonesia.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-600">Dibuat khusus untuk Job Seeker Indonesia</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
