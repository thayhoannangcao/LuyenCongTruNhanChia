'use client';

import AuthForm from '@/components/auth/AuthForm';
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
