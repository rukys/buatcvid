import React from 'react';
import { PencilLine, Sparkles, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Isi Informasi Kerja',
      description: 'Masukkan riwayat pendidikan dan deskripsi singkat pengalaman kerjamu. Cukup dengan bahasa santai sehari-hari.',
      icon: <PencilLine className="w-6 h-6 text-primary-600" />,
      color: 'bg-primary-50 border-primary-100',
    },
    {
      number: '02',
      title: 'Tulis Otomatis dengan AI',
      description: 'Tekan tombol AI untuk mengubah deskripsi kasarmu menjadi kalimat profesional standar ATS yang bernilai jual tinggi.',
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-100',
    },
    {
      number: '03',
      title: 'Unduh PDF Standar HRD',
      description: 'Pilih template ATS yang kamu suka, sesuaikan warna aksennya, lalu unduh resume PDF profesional dalam sekali klik.',
      icon: <Download className="w-6 h-6 text-success-500" />,
      color: 'bg-success-50 border-success-100',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            💡 Alur 3 Langkah Mudah
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-950 tracking-tight">
            Bagaimana BuatCV.id Bekerja?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Kami menyederhanakan proses penulisan CV yang melelahkan menjadi alur cepat yang bisa selesai dalam 5 menit.
          </p>
        </div>

        {/* Step Flow Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-dashed bg-[linear-gradient(to_right,rgba(226,232,240,0.7)_50%,rgba(255,255,255,0)_50%)] bg-[size:16px_100%] -z-10" />

          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="group bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col items-center lg:items-start text-center lg:text-left relative"
            >
              {/* Step Icon Wrapper */}
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center mb-5 ${step.color} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                {step.icon}
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 right-6 font-heading font-black text-2xl text-gray-200 group-hover:text-primary-100 transition-colors select-none">
                {step.number}
              </div>

              {/* Step Text Details */}
              <h3 className="text-lg font-bold text-gray-950 mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Mobile/Tablet Step Arrow (Hidden on Desktop) */}
              {idx < 2 && (
                <div className="lg:hidden flex justify-center py-4 w-full text-gray-300">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
