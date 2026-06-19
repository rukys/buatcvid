import { ResumeData } from '@/types/resume';

export function useStepValidation() {
  const validateStep = (
    step: number,
    data: ResumeData
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!data.industry) {
          errors.push('Silakan pilih salah satu bidang pekerjaan.');
        }
        if (!data.targetPosition || data.targetPosition.trim() === '') {
          errors.push('Silakan isi posisi atau jabatan yang ingin dilamar.');
        }
        break;

      case 2:
        if (!data.personalInfo.fullName || data.personalInfo.fullName.trim() === '') {
          errors.push('Nama Lengkap wajib diisi.');
        }
        if (!data.personalInfo.targetPosition || data.personalInfo.targetPosition.trim() === '') {
          errors.push('Posisi yang dilamar wajib diisi.');
        }
        if (!data.personalInfo.email || data.personalInfo.email.trim() === '') {
          errors.push('Alamat Email wajib diisi.');
        } else if (!/\S+@\S+\.\S+/.test(data.personalInfo.email)) {
          errors.push('Format alamat email tidak valid.');
        }
        if (!data.personalInfo.phone || data.personalInfo.phone.trim() === '') {
          errors.push('Nomor Handphone wajib diisi.');
        }
        if (!data.personalInfo.city || data.personalInfo.city.trim() === '') {
          errors.push('Kota Domisili wajib diisi.');
        }
        break;

      case 3:
        if (data.experiences.length === 0) {
          if (data.isFreshGrad) {
            errors.push('Silakan tambah minimal 1 organisasi, magang, atau proyek.');
          } else {
            errors.push('Silakan tambah minimal 1 riwayat pengalaman kerja.');
          }
        } else {
          // Check if any added experience is incomplete
          data.experiences.forEach((exp, idx) => {
            const num = idx + 1;
            if (!exp.companyName || exp.companyName.trim() === '') {
              errors.push(`Pengalaman #${num}: Nama Instansi/Perusahaan wajib diisi.`);
            }
            if (!exp.position || exp.position.trim() === '') {
              errors.push(`Pengalaman #${num}: Posisi/Jabatan wajib diisi.`);
            }
            if (!exp.startMonth || !exp.startYear) {
              errors.push(`Pengalaman #${num}: Bulan & tahun mulai wajib diisi.`);
            }
            if (!exp.isCurrentJob && (!exp.endMonth || !exp.endYear)) {
              errors.push(`Pengalaman #${num}: Bulan & tahun selesai wajib diisi.`);
            }
          });
        }
        break;

      case 4:
        if (data.educations.length === 0) {
          errors.push('Silakan tambah minimal 1 riwayat pendidikan.');
        } else {
          // Check if any added education is incomplete
          data.educations.forEach((edu, idx) => {
            const num = idx + 1;
            if (!edu.institution || edu.institution.trim() === '') {
              errors.push(`Pendidikan #${num}: Nama sekolah/institusi wajib diisi.`);
            }
            if (!edu.major || edu.major.trim() === '') {
              errors.push(`Pendidikan #${num}: Jurusan/program studi wajib diisi.`);
            }
            if (!edu.isOngoing && !edu.graduationYear) {
              errors.push(`Pendidikan #${num}: Tahun kelulusan wajib diisi.`);
            }
            if (edu.isOngoing && !edu.expectedGraduationYear) {
              errors.push(`Pendidikan #${num}: Ekspektasi tahun kelulusan wajib diisi.`);
            }
          });
        }
        break;

      case 5:
        if (data.skills.length === 0) {
          errors.push('Silakan masukkan minimal 1 keahlian (skill).');
        }
        if (data.languages.length === 0) {
          errors.push('Silakan masukkan minimal 1 kemampuan bahasa.');
        }
        break;

      default:
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return { validateStep };
}
export default useStepValidation;
