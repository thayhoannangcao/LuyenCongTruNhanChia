'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import ExerciseSettings from '@/components/math/ExerciseSettings'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
    )
  }

  if (!user) {
    router.replace('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chào mừng, {user.full_name}!</h1>
            <p className="text-gray-600">Chọn bài tập để bắt đầu luyện tập</p>
          </div>
          <div className="space-x-2">
            <button className="btn-secondary" onClick={() => router.push('/practice')}>Vào luyện tập</button>
            <button className="btn-secondary" onClick={signOut}>Đăng xuất</button>
          </div>
        </div>

        <ExerciseSettings onStart={(config) => {
          const params = new URLSearchParams({
            operation: config.operation,
            num1: String(config.num1Digits),
            num2: String(config.num2Digits),
            total: String(config.totalQuestions),
            ar: config.additionRange ? String(config.additionRange) : '',
            at: config.additionType ? String(config.additionType) : '',
          })
          router.push(`/practice?${params.toString()}`)
        }} />
      </div>
    </div>
  )
}


