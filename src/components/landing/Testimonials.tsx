import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Adit Nugroho',
      role: 'Fresh Graduate Akuntansi',
      target: 'Lolos Seleksi Berkas BUMN',
      avatarText: 'AN',
      quote: 'Sebagai fresh grad, saya bingung nulis deskripsi organisasi biar profesional. AI di website ini bantu tulisin kalimat pencapaian yang rapi. Alhamdulillah, lolos berkas administrasi salah satu BUMN.',
    },
    {
      name: 'Siti Rahma',
      role: 'Staff Administrasi',
      target: 'Diterima Kerja Perusahaan Retail',
      avatarText: 'SR',
      quote: 'Mudah banget dipakai lewat HP! Saya buat CV ini sambil naik KRL pulang kerja. Sangat praktis buat non-tech-savvy seperti saya, template-nya rapi dan ngga pusing ngisinya.',
    },
    {
      name: 'Rendy Wijaya',
      role: 'Junior Web Developer',
      target: 'Banyak Panggilan Interview Startup',
      avatarText: 'RW',
      quote: 'Dulu CV saya terlalu warna-warni dan ngga lolos robot ATS. Setelah pakai template Clean dengan aksen biru di sini, respon lamaran meningkat drastis. Desainnya beneran profesional.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            💬 Cerita Sukses
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-950 tracking-tight">
            Membantu Pencari Kerja Indonesia
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Berikut adalah cerita dari rekan-rekan yang berhasil meningkatkan peluang dipanggil wawancara kerja.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left relative"
            >
              <div className="space-y-4">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary-100 flex-shrink-0" />
                
                {/* Review Quote text */}
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* User Identity Footer */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200/60">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-heading font-bold text-xs select-none flex-shrink-0">
                  {rev.avatarText}
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-gray-950">{rev.name}</h4>
                  <p className="text-gray-500">{rev.role}</p>
                  <span className="inline-block mt-1 font-semibold text-success-500 text-[10px] bg-success-50 px-1.5 py-0.5 rounded-sm">
                    {rev.target}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
