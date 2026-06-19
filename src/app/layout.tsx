import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuatCV.id — AI Resume Builder Indonesia',
  description:
    'Buat CV profesional standar ATS dalam 5 menit gratis. Disesuaikan dengan pasar kerja Indonesia menggunakan kecerdasan buatan (AI).',
  keywords: [
    'buat cv',
    'cv online',
    'resume builder',
    'cv ATS',
    'pencari kerja',
    'karir indonesia',
  ],
  authors: [{ name: 'BuatCV.id Team' }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body bg-gray-50 text-gray-800 antialiased min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#1E293B',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            },
          }}
        />
      </body>
    </html>
  );
}
