import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/layouts/AuthProvider';
import { ToastProvider } from '@/components/ui/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luyện Tập Toán Học',
  description:
    'Ứng dụng luyện tập các phép tính cộng, trừ, nhân, chia cho học sinh',
  icons: {
    icon: '/logo.png',
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
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
