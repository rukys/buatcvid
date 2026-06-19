'use server';

import Anthropic from '@anthropic-ai/sdk';
import { GenerateBulletsInput, GenerateBulletsOutput, INDUSTRY_LABELS } from '@/types/resume';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateExperienceBullets(
  input: GenerateBulletsInput
): Promise<GenerateBulletsOutput> {
  const { position, company, industry, userDescription, language } = input;

  // 1. Validation check
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      bullets: null,
      error: 'API Key untuk AI (Anthropic) belum dikonfigurasi di server. Silakan isi berkas .env.local terlebih dahulu.',
    };
  }

  if (!position || position.trim() === '') {
    return {
      bullets: null,
      error: 'Nama posisi / jabatan wajib diisi.',
    };
  }

  const industryLabel = INDUSTRY_LABELS[industry] || 'Umum';

  // 2. Formulate prompt instructions
  const systemPrompt = `Anda adalah seorang ahli penulis resume profesional dan spesialis rekrutmen standar ATS (Applicant Tracking System) untuk pasar kerja Indonesia.
Tugas Anda adalah membuat 3-4 butir pencapaian kerja (bullet points) profesional berdasarkan data jabatan dan deskripsi singkat yang diberikan oleh pengguna.

ATURAN KETAT:
1. Bahasa Output: Harus sepenuhnya menggunakan ${language === 'id' ? 'Bahasa Indonesia yang baik, benar, dan profesional' : 'Bahasa Inggris profesional (Professional English)'}.
2. Struktur Kalimat: Setiap butir pencapaian harus dimulai dengan Kata Kerja Aksi yang kuat (Action Verbs, contoh: "Meningkatkan", "Mengelola", "Merancang", "Menghemat" atau "Increased", "Managed", "Designed", "Saved").
3. Dampak & Metrik: Selipkan metrik konkret (persentase %, nominal rupiah Rp, jumlah tim, atau waktu penghematan) secara realistis yang mewakili dampak dari pekerjaan tersebut untuk membuat resume bernilai jual tinggi.
4. Gaya Bahasa: Hindari kalimat pasif atau deskripsi tugas yang membosankan (misal: "Bertanggung jawab untuk..."). Fokus pada HASIL dan DAMPAK.
5. Format Output: Anda WAJIB memberikan output berupa array JSON murni berisi string tanpa teks pembuka, penjelasan, greeting, penutup, atau tanda markdown \`\`\`json. Format harus berupa:
["kalimat pencapaian 1", "kalimat pencapaian 2", "kalimat pencapaian 3"]`;

  const userPrompt = `
Data Pengguna:
- Posisi / Jabatan: ${position}
- Nama Perusahaan / Instansi: ${company || 'Perusahaan'}
- Bidang Pekerjaan / Industri: ${industryLabel}
- Deskripsi singkat kerja dari pengguna: ${userDescription || 'Melakukan tugas harian sesuai jabatan tersebut.'}

Buatkan 3 sampai 4 kalimat pencapaian kerja ATS-friendly yang profesional sesuai aturan di atas.`;

  try {
    // 3. Request Claude completion with 30s timeout
    const msg = await anthropic.messages.create(
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        temperature: 0.2,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      },
      {
        timeout: 30000, // 30 seconds timeout limit
      }
    );

    const contentText = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '';

    if (!contentText) {
      return {
        bullets: null,
        error: 'Gagal mendapatkan tanggapan dari AI. Silakan coba kembali.',
      };
    }

    // Clean up potential markdown formatting block wrapper
    const jsonString = contentText
      .replace(/^```json/i, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    // 4. Parse output
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
        return { bullets: parsed };
      }
    } catch (parseError) {
      // Fallback: If JSON parsing fails, split content by lines and filter out empty items
      const fallbackBullets = jsonString
        .split('\n')
        .map((line) => line.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '').replace(/"/g, '').trim())
        .filter((line) => line.length > 10);

      if (fallbackBullets.length > 0) {
        return { bullets: fallbackBullets.slice(0, 4) };
      }
      
      console.error('Failed to parse AI output:', jsonString, parseError);
    }

    return {
      bullets: null,
      error: 'AI mengembalikan format yang salah. Silakan coba klik tombol generate ulang.',
    };

  } catch (err: any) {
    console.error('generateExperienceBullets server error:', err);
    
    // Timeout or connection errors
    if (err.name === 'APIConnectionTimeoutError' || err.message?.includes('timeout')) {
      return {
        bullets: null,
        error: 'Koneksi ke server AI terputus karena melebihi batas waktu (timeout 30 detik). Silakan coba lagi.',
      };
    }

    return {
      bullets: null,
      error: `Gagal menghubungkan ke server AI: ${err.message || 'Error tidak diketahui'}.`,
    };
  }
}
