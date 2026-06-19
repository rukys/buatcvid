# BuatCV.id 🚀
> **AI Resume Builder & ATS-Friendly CV Generator untuk Job Seeker Indonesia**

BuatCV.id adalah aplikasi web modern berbasis Next.js yang dirancang khusus untuk mempermudah pencari kerja di Indonesia membuat resume berkualitas tinggi, terstandarisasi sistem ATS (Applicant Tracking System), dan dapat diunduh dalam waktu kurang dari 5 menit. Aplikasi ini mengutamakan keterbacaan tinggi di perangkat mobile (mobile-first), memiliki integrasi AI untuk penulisan pencapaian karir secara otomatis, dan sangat menjunjung tinggi privasi data pengguna.

---

## ✨ Fitur Utama

- **📱 Mobile-First UX**: Antarmuka responsif yang sangat ringan, didesain untuk kenyamanan pengisian data penuh dari HP (mayoritas traffic job seeker Indonesia).
- **📝 7-Step Interactive Builder**: Alur pengisian data terstruktur langkah-demi-langkah (Bidang, Kontak, Pengalaman, Pendidikan, Keahlian, Ringkasan, dan Unduh).
- **✨ AI Bullet & Profile Generator**: Integrasi API Anthropic (Claude 3.5 Sonnet) untuk menyusun butir-butir pencapaian kerja (action-verb & metrik-oriented) dan ringkasan profil profesional dalam Bahasa Indonesia maupun Bahasa Inggris.
- **📄 Ekspor PDF Standar ATS**: Pembuatan file PDF langsung dari server menggunakan `@react-pdf/renderer` untuk menjamin file teks PDF valid, dapat diseleksi (select/copy), terbaca sempurna oleh parser software HRD, dan tidak bergeser susunannya.
- **🔒 Privasi 100% (Client-Side Persistence)**: Data pengguna disimpan secara lokal di browser melalui `localStorage` (via Zustand Persist). Tidak ada database permanen untuk data sensitif pengguna.
- **🎨 Pratinjau Mini Dinamis**: Sistem pratinjau langsung berskala otomatis (ResizeObserver-based scale) untuk menampilkan visualisasi tata letak A4 secara presisi di layar desktop maupun layar HP.
- **👔 3 Template Profesional**:
  - **Clean (Minimalis)**: Satu kolom, rapi, dan fungsional.
  - **Modern (Kreatif)**: Dua kolom dengan aksen panel samping berwarna.
  - **Elegant (Eksekutif)**: Struktur satu kolom dengan pembatas garis premium dan tipografi semi-serif.

---

## 🛠️ Stack Teknologi

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **State Management**: Zustand (dengan Middleware Persist)
- **PDF Engine**: `@react-pdf/renderer`
- **AI Engine**: Anthropic Claude API (Claude 3.5 Sonnet)
- **Komponen Ikon**: Lucide React
- **Notifikasi**: React Hot Toast

---

## 🚀 Memulai (Local Development)

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- Node.js (v18 ke atas)
- Yarn atau NPM

### 2. Kloning Repositori
```bash
git clone https://github.com/username/buatcvid.git
cd buatcvid
```

### 3. Instal Dependensi
```bash
yarn install
# atau
npm install
```

### 4. Konfigurasi Environment Variables
Buat berkas `.env.local` di root direktori project dan tambahkan API Key Anthropic Anda:
```env
# API Key Anthropic untuk fitur kecerdasan buatan (AI Writing)
ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
```

### 5. Jalankan Development Server
Jalankan dev server secara lokal:
```bash
yarn dev
# atau
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban (browser) Anda untuk melihat hasilnya.

### 6. Build Produksi & Kompilasi
Untuk memverifikasi kebersihan kode, aturan ESLint, dan kesiapan rilis produksi:
```bash
yarn build
# atau
npm run build
```

---

## 📂 Struktur Direktori Utama

```text
buatcvid/
├── src/
│   ├── actions/               # Server Actions (Penulisan AI & Generasi PDF)
│   │   ├── generateExperienceBullets.ts
│   │   ├── generateProfileSummary.ts
│   │   └── generatePDF.ts
│   ├── app/                   # Next.js App Router (Halaman & Rute)
│   │   ├── builder/           # Aplikasi Utama Pembuat Resume
│   │   ├── preview/           # Halaman Pratinjau Penuh
│   │   ├── templates/         # Galeri Pilihan Template
│   │   ├── tips/              # Tips Menulis Resume & Panduan ATS
│   │   └── layout.tsx
│   ├── components/            # Reusable UI & Layout Components
│   │   ├── builder/           # Komponen Builder Langkah 1-7 & Preview
│   │   ├── landing/           # Komponen Beranda (Hero, Testimoni, dsb)
│   │   ├── resume/            # Template Layout PDF (@react-pdf/renderer)
│   │   └── ui/                # Base UI Atoms (Input, Button, Card, dsb)
│   ├── hooks/                 # React Custom Hooks (Step Validations)
│   ├── lib/                   # Utility Functions & Helper Localization
│   │   └── utils.ts
│   └── store/                 # Zustand Global Stores (Resume & UI States)
```

---

## 🛡️ Aturan Kontribusi
1. **Bahasa UI**: Semua antarmuka copy, placeholder, dan tips diwajibkan menggunakan Bahasa Indonesia yang komunikatif, ramah, dan profesional.
2. **Keterbacaan ATS**: Desain template PDF baru wajib mematuhi aturan ATS (tidak menggunakan tabel nested, elemen grafis berlebih, atau font non-standar).
3. **Kepatuhan Tipe**: Pastikan seluruh kontribusi lulus pemeriksaan typechecking TypeScript (`yarn build`) dengan zero warnings.

