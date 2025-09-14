import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/layouts/AuthProvider';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION!;

export const metadata: Metadata = {
  title: 'Luyện toán',
  description:
    'Ứng dụng luyện tập các phép tính cộng, trừ, nhân, chia cho học sinh',
  icons: {
    icon: '/logo.png',
  },
  verification: {
    google: googleSiteVerification,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            {children}
            <SpeedInsights />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
