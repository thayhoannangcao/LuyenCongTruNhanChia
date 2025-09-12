'use client';

import AuthForm from '@/src/views/auth/components/AuthForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <AuthForm
      mode="signin"
      onSuccess={() => {
        router.replace('/dashboard');
      }}
      onSwitchMode={() => {
        router.push('/auth/register');
      }}
    />
  );
}
