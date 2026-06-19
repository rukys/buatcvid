'use server';

import Anthropic from '@anthropic-ai/sdk';
import { GenerateSummaryInput, GenerateSummaryOutput, INDUSTRY_LABELS, DEGREE_LABELS } from '@/types/resume';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateProfileSummary(
  input: GenerateSummaryInput
): Promise<GenerateSummaryOutput> {
  const { resumeData, tone, language } = input;

  // 1. Validation check
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      summary: null,
      error: 'API Key untuk AI (Anthropic) belum dikonfigurasi di server. Silakan isi berkas .env.local terlebih dahulu.',
    };
  }

  // 2. Prepare candidate data summary for prompt context
  const targetPos = resumeData.targetPosition || resumeData.personalInfo.targetPosition || 'Profesional';
  const industryLabel = resumeData.industry ? INDUSTRY_LABELS[resumeData.industry] : 'Umum';

  const experiencesSummary = resumeData.experiences
    .map((exp) => `- ${exp.position} di ${exp.companyName} (${exp.startYear}-${exp.endYear || 'Sekarang'}): ${exp.bullets.join('; ')}`)
    .join('\n');

  const educationsSummary = resumeData.educations
    .map((edu) => `- ${DEGREE_LABELS[edu.degree]} ${edu.major} di ${edu.institution}`)
    .join('\n');

  const skillsSummary = resumeData.skills.join(', ');

  // 3. Setup tone directions
  const toneGuide = {
    formal: language === 'id' 
      ? 'Gunakan tata bahasa Indonesia baku yang sangat formal, profesional, terstruktur, dan objektif.'
      : 'Use highly formal, professional, objective, and structured corporate English.',
    semiformal: language === 'id'
      ? 'Gunakan bahasa profesional yang modern, luwes, komunikatif, dan mengalir natural tanpa terasa terlalu kaku.'
      : 'Use a modern, professional, communicative, and natural English that flows easily.',
    confident: language === 'id'
      ? 'Gunakan nada bicara yang penuh percaya diri, dinamis, persuasif, dan menonjolkan kepemimpinan serta rekam jejak kesuksesan pencapaian.'
      : 'Use an assertive, persuasive, and dynamic English tone that strongly emphasizes leadership and a successful track record.',
  };

  const systemPrompt = `Anda adalah seorang ahli rekrutmen dan penulis resume profesional. Tugas Anda adalah membuat 1 paragraf Ringkasan Profil (Profile Summary) yang ringkas, padat, dan menarik sebanyak 3 kalimat (maksimal 4 kalimat).

ATURAN KETAT:
1. Bahasa Output: Harus sepenuhnya menggunakan ${language === 'id' ? 'Bahasa Indonesia' : 'Bahasa Inggris'}.
2. Struktur Ringkasan:
   - Kalimat 1: Jabatan profesional utama, jumlah tahun pengalaman, dan keahlian/bidang utama.
   - Kalimat 2: Sorotan prestasi terbesar atau kontribusi konkret yang pernah dicapai (berdasarkan data kerja yang diberikan).
   - Kalimat 3: Nilai tambah yang ditawarkan dan kontribusi yang ingin diberikan pada posisi berikutnya (${targetPos}).
3. Nada & Tone: Anda harus mengikuti gaya: ${toneGuide[tone]}
4. Gaya Bahasa: Hindari klise kosong (seperti "pekerja keras yang bermotivasi tinggi"). Fokus pada fakta keahlian dan dampak kerja nyata.
5. Format Output: Anda WAJIB hanya mengembalikan 1 paragraf teks ringkasan murni tanpa teks pembuka, penutup, tanda kutip luar, atau tanda markdown. Jangan tambahkan apapun selain teks paragraf tersebut.`;

  const userPrompt = `
Data Kandidat untuk Resume:
- Target Posisi: ${targetPos}
- Bidang Pekerjaan: ${industryLabel}
- Riwayat Pekerjaan / Kegiatan:
${experiencesSummary || '- Belum ada riwayat kerja formal (fresh graduate).'}
- Riwayat Pendidikan:
${educationsSummary || '- Belum diisi.'}
- Daftar Keahlian Utama: ${skillsSummary || '- Belum diisi.'}

Buatkan 1 paragraf ringkasan profil resume sesuai aturan di atas.`;

  try {
    // 4. Request Claude completion with 30s timeout
    const msg = await anthropic.messages.create(
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        temperature: 0.3,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      },
      {
        timeout: 30000, // 30 seconds timeout limit
      }
    );

    const summaryText = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '';

    if (!summaryText) {
      return {
        summary: null,
        error: 'Gagal menghasilkan ringkasan profil. Silakan coba kembali.',
      };
    }

    // Clean up wrapping double quotes if AI generated them accidentally
    const cleanedSummary = summaryText.replace(/^"/, '').replace(/"$/, '').trim();

    return {
      summary: cleanedSummary,
    };

  } catch (err: any) {
    console.error('generateProfileSummary server error:', err);

    if (err.name === 'APIConnectionTimeoutError' || err.message?.includes('timeout')) {
      return {
        summary: null,
        error: 'Koneksi ke server AI terputus karena melebihi batas waktu (timeout 30 detik). Silakan coba lagi.',
      };
    }

    return {
      summary: null,
      error: `Gagal menghasilkan ringkasan profil: ${err.message || 'Error tidak diketahui'}.`,
    };
  }
}
