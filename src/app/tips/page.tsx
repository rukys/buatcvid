'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function TipsPage() {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Gunakan alamat email profesional (contoh: nama.depan@email.com)', checked: false },
    { id: 2, text: 'Cantumkan angka/persentase konkret pada pencapaian kerja', checked: false },
    { id: 3, text: 'Mulai deskripsi pengalaman kerja dengan kata kerja aksi', checked: false },
    { id: 4, text: 'Gunakan nomor handphone aktif yang terhubung ke WhatsApp', checked: false },
    { id: 5, text: 'Sertakan tautan LinkedIn yang sudah di-update', checked: false },
    { id: 6, text: 'Batasi resume maksimal 1-2 halaman saja', checked: false },
  ]);

  const faqs: FAQItem[] = [
    {
      question: 'Apa itu ATS dan kenapa penting?',
      answer: 'ATS (Applicant Tracking System) adalah sistem perangkat lunak otomatis yang dipakai oleh HRD perusahaan besar untuk membaca, menyaring, dan menyortir resume pelamar berdasarkan relevansi kata kunci sebelum akhirnya berkas tersebut dibaca langsung oleh rekruter manusia. Membuat resume ATS-friendly memastikan berkas Anda tidak langsung tereliminasi secara otomatis oleh robot perekrut.',
    },
    {
      question: 'Apakah saya perlu menyertakan foto di resume?',
      answer: 'Di Indonesia, banyak posisi lokal (seperti marketing, sales, customer service, front office) yang menyukai pencantuman foto profesional yang rapi. Namun, jika Anda melamar ke posisi teknis (IT, engineer) atau melamar ke perusahaan asing/multinasional, foto sering kali dilewati untuk menghindari bias penilaian kualifikasi.',
    },
    {
      question: 'Berapa halaman idealnya sebuah resume?',
      answer: 'Idealnya adalah 1 halaman, terutama bagi pelamar pemula (fresh graduate) hingga berpengalaman menengah (di bawah 5 tahun). Bagi yang memiliki pengalaman di atas 8 tahun atau melamar ke posisi eksekutif tingkat tinggi, resume maksimal 2 halaman sangat wajar. Hindari menulis resume lebih dari 2 halaman karena HRD rata-rata hanya meluangkan waktu 6-10 detik untuk membaca cepat satu resume.',
    },
    {
      question: 'Apakah resume saya aman / data saya disimpan?',
      answer: 'Sangat aman. BuatCV.id memprioritaskan privasi Anda. Semua data resume disimpan secara lokal di dalam peramban web (browser) komputer atau HP Anda melalui localStorage. Data Anda hanya dikirim ke server AI Anthropic saat Anda menekan fitur penulisan AI secara interaktif untuk diproses, tanpa disimpan permanen di database kami.',
    },
    {
      question: 'Bisa export ke format selain PDF?',
      answer: 'Untuk saat ini BuatCV.id berfokus melayani ekspor berformat PDF (.pdf) secara utuh. Format PDF merupakan format standar industri perekrutan global yang menjamin susunan font, margin, dan posisi elemen tidak bergeser atau berantakan saat dibuka di HP, laptop, atau sistem software HRD.',
    },
    {
      question: 'Bagaimana cara edit resume yang sudah dibuat?',
      answer: 'Anda bisa mengedit resume kapan saja dengan menekan tombol "Edit Kembali" di preview page atau menekan menu navigasi ke Builder. Berkat fitur penyimpanan otomatis (auto-save), data terakhir Anda akan tetap tersimpan aman di browser selama Anda tidak membersihkan cache browser Anda.',
    },
    {
      question: 'Apakah layanan ini gratis?',
      answer: 'Ya, layanan dasar pembuatan resume, fitur generasi text AI, pemilihan warna aksen, penyesuaian template ATS, dan pengunduhan file PDF berkualitas tinggi di BuatCV.id disediakan secara 100% gratis tanpa biaya tersembunyi.',
    },
    {
      question: 'Resume yang dihasilkan apakah original?',
      answer: 'Resume yang dibuat sepenuhnya orisinal karena diadaptasi langsung dari data riwayat karir nyata yang Anda ketikkan. Fitur AI kami hanya berperan dalam menyempurnakan struktur tata bahasa, memoles kalimat agar lebih berbobot profesional, dan menyisipkan kata kerja aksi yang persuasif.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleChecklist = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-600">
            <Sparkles className="w-3.5 h-3.5 animate-[pulse_2s_infinite]" />
            <span>Pusat Panduan Karir</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-950 tracking-tight">
            Tips Menulis & Panduan Resume Lolos ATS
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dapatkan pekerjaan impianmu dengan panduan menulis resume yang baik serta jawaban lengkap seputar proses seleksi administrasi HRD.
          </p>
        </div>

        {/* Section 1: Cara Menulis Resume + Checklist */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2.5 rounded-lg text-primary-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 font-heading">
                Cara Menulis Resume yang Baik
              </h2>
              <p className="text-xs text-gray-500">Panduan dasar menyusun resume berbobot tinggi</p>
            </div>
          </div>

          <div className="prose prose-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              Resume bukan sekadar daftar riwayat hidup biasa, melainkan lembar pemasaran diri Anda di hadapan HRD. Resume yang baik wajib ringkas, jujur, dan berorientasi pada pencapaian hasil daripada sekadar menyalin deskripsi pekerjaan sehari-hari.
            </p>
            <p>
              Gunakan susunan kronologis terbalik (pengalaman kerja/pendidikan terbaru di bagian teratas) agar rekruter bisa melihat pencapaian termutakhir Anda dalam 3 detik pertama.
            </p>
          </div>

          {/* Interactive Checklist Widget */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Checklist Kesiapan Resume Kamu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  type="button"
                  className={`p-3 border rounded-lg text-left transition-all flex items-start gap-3 ${
                    item.checked
                      ? 'border-success-500 bg-success-50/50 text-success-800'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      item.checked ? 'text-success-500 fill-success-500/20' : 'text-gray-300'
                    }`}
                  />
                  <span className="text-xs leading-normal font-medium">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Tips Lolos ATS */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-error-50 p-2.5 rounded-lg text-error-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 font-heading">
                Tips Lolos Sistem ATS
              </h2>
              <p className="text-xs text-gray-500">Hal penting agar resume tidak dieliminasi otomatis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3 bg-success-50/30 border border-success-100 p-4 rounded-lg">
              <h4 className="font-bold text-success-800 flex items-center gap-2">
                ✓ Lakukan Hal Ini
              </h4>
              <ul className="list-disc pl-4 space-y-2 text-gray-600">
                <li>Gunakan format standard file PDF yang teksnya bisa diseleksi (bukan file hasil scan JPG/PNG).</li>
                <li>Gunakan nama bagian yang standar (misal: &ldquo;Pengalaman Kerja&rdquo;, &ldquo;Pendidikan&rdquo;).</li>
                <li>Gunakan poin-poin (bullet points) pendek berwujud kalimat ringkas.</li>
                <li>Gunakan font standar sistem yang aman (seperti Helvetica).</li>
              </ul>
            </div>

            <div className="space-y-3 bg-error-50/30 border border-error-100 p-4 rounded-lg">
              <h4 className="font-bold text-error-800 flex items-center gap-2">
                ✗ Hindari Hal Ini
              </h4>
              <ul className="list-disc pl-4 space-y-2 text-gray-600">
                <li>Jangan menaruh teks informasi penting di dalam Header/Footer (beberapa sistem ATS mengabaikannya).</li>
                <li>Hindari layout tabel bertumpuk atau kolom bertumpuk yang memecah alur pembacaan sistem.</li>
                <li>Jangan gunakan bar penilaian tingkat keahlian (misal: &ldquo;Photoshop 8/10&rdquo;) — robot ATS tidak bisa menerjemahkannya.</li>
                <li>Hindari hiasan grafis, bentuk shape, atau chart diagram yang rumit.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: FAQ Accordion */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2.5 rounded-lg text-primary-600">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 font-heading">
                Pertanyaan Umum (FAQ)
              </h2>
              <p className="text-xs text-gray-500">Semua yang perlu kamu ketahui tentang BuatCV.id</p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-gray-800 hover:bg-gray-50/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-primary-600' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <p className="p-5 text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Footer Box */}
        <div className="bg-primary-600 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold font-heading">Siap Membuat CV Hebatmu?</h3>
            <p className="text-xs text-white/80 max-w-md leading-normal">
              Cukup butuh waktu 5 menit untuk mengisi data diri kamu dan mendapatkan resume profesional terbaik.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 border-white hover:bg-primary-50 active:scale-95 shadow-sm font-bold flex items-center gap-2 whitespace-nowrap"
            onClick={() => router.push('/builder')}
          >
            Mulai Buat Resume
            <ArrowRight className="w-4 h-4 text-primary-600" />
          </Button>
        </div>
      </main>
    </div>
  );
}
