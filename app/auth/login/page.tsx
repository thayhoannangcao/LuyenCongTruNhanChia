'use client';

import AuthForm from '@/src/views/auth/components/AuthForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <AuthForm
      mode="signin"
      onSuccess={() => {
        // Ensure navigation even if React state updates are pending
        router.push('/dashboard');
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            if (window.location.pathname !== '/dashboard') {
              window.location.href = '/dashboard';
            }
          }, 50);
        }
      }}
      onSwitchMode={() => {
        router.push('/auth/register');
      }}
    />
  );
}
