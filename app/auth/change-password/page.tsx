'use client';

import ChangePasswordForm from '@/src/views/auth/components/ChangePasswordForm';
import { useAuth } from '@/components/layouts/AuthProvider';
import { useRouter } from 'next/navigation';
import Button from '@/src/components/Button';

export default function ChangePasswordPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!user) {
    router.replace('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button size="large" onClick={() => router.back()}>
            Quay lại
          </Button>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
