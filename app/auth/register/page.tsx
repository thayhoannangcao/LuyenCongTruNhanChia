'use client'

import AuthForm from '@/components/auth/AuthForm'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  return (
    <AuthForm
      mode="signup"
      onSuccess={() => {
        router.replace('/dashboard')
      }}
      onSwitchMode={() => {
        router.push('/auth/login')
      }}
    />
  )
}


