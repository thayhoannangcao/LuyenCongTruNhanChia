'use client'

import ChangePasswordForm from '@/components/auth/ChangePasswordForm'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
  }

  if (!user) {
    router.replace('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button className="btn-secondary" onClick={() => router.back()}>Quay lại</button>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  )
}


