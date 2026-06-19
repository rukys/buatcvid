'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/Input';
import { Plus, Minus, Image as ImageIcon, Trash2, Info } from 'lucide-react';

export default function Step2Personal() {
  const personalInfo = useResumeStore((state) => state.personalInfo);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const [showOptional, setShowOptional] = useState(() => {
    return !!(personalInfo.linkedIn || personalInfo.portfolio || personalInfo.photoUrl);
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo({ [field]: value });
  };

  // Automated client-side canvas square crop and resize (400x400px)
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions to 400x400
        canvas.width = 400;
        canvas.height = 400;

        // Calculate center square cropping bounds
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;

        // Draw cropped image onto canvas
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 400, 400);

        // Convert to dataUrl and save to store
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPersonalInfo({ photoUrl: dataUrl });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPersonalInfo({ photoUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
          Bagaimana cara HRD menghubungi kamu?
        </h2>
        <p className="text-sm text-gray-500">
          Masukkan informasi kontak dasar kamu. Pastikan nomor HP dan email dalam kondisi aktif.
        </p>
      </div>

      {/* Main Required Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <Input
          id="fullName"
          label="Nama Lengkap"
          placeholder="Contoh: Budi Santoso"
          value={personalInfo.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
        />
        
        <Input
          id="targetPosition"
          label="Posisi / Jabatan yang Dilamar"
          placeholder="Contoh: Staff Administrasi"
          value={personalInfo.targetPosition}
          onChange={(e) => handleInputChange('targetPosition', e.target.value)}
        />
        
        <Input
          id="email"
          label="Alamat Email"
          type="email"
          placeholder="Contoh: budi.santoso@email.com"
          value={personalInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />

        <Input
          id="phone"
          label="Nomor Handphone"
          type="tel"
          placeholder="Contoh: +62 812-3456-7890"
          value={personalInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        
        <Input
          id="city"
          label="Kota Domisili"
          placeholder="Contoh: Jakarta Selatan atau Bandung"
          value={personalInfo.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          wrapperClassName="md:col-span-2"
        />
      </div>

      {/* Optional Fields Toggle Drawer */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
        >
          {showOptional ? (
            <>
              <Minus className="w-4 h-4" />
              <span>Sembunyikan info opsional</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah info opsional (LinkedIn, Foto, Portfolio)</span>
            </>
          )}
        </button>

        {showOptional && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 animate-[slideUp_200ms_ease-out]">
            
            <Input
              id="linkedIn"
              label="LinkedIn URL (Opsional)"
              placeholder="Contoh: linkedin.com/in/username"
              value={personalInfo.linkedIn || ''}
              onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            />

            <Input
              id="portfolio"
              label="Portfolio / Website (Opsional)"
              placeholder="Contoh: behance.net/username atau github.com"
              value={personalInfo.portfolio || ''}
              onChange={(e) => handleInputChange('portfolio', e.target.value)}
            />

            {/* Photo Profil Upload Container */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Foto Profil (Opsional)
              </label>
              
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-sm p-4">
                
                {/* Photo Preview circular frame */}
                <div className="w-16 h-16 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {personalInfo.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={personalInfo.photoUrl} alt="Preview Foto" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Pilih Foto
                    </button>
                    {personalInfo.photoUrl && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="text-error-500 hover:bg-error-50 p-1.5 rounded-sm transition-colors"
                        aria-label="Hapus foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Format JPG/PNG. Foto akan otomatis dipotong kotak 400x400 piksel.
                  </p>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>

              {/* Informative Tooltip */}
              <div className="flex items-start gap-2 text-[10px] text-gray-500 bg-primary-50/60 p-2.5 rounded-sm border border-primary-100/50">
                <Info className="w-3.5 h-3.5 text-primary-500 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed text-left">
                  Beberapa perusahaan multinasional menyarankan resume tanpa foto untuk menghindari bias rekrutmen. Boleh dikosongkan jika tidak diperlukan.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
