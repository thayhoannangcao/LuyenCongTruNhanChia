'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import AuthForm from '@/components/auth/AuthForm'
import ExerciseSettings from '@/components/math/ExerciseSettings'
import ExerciseSession from '@/components/math/ExerciseSession'
import type { ExerciseConfig } from '@/lib/math-generator'

export default function HomePage() {
  const { user, loading, signOut } = useAuth()
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [showAuth, setShowAuth] = useState(false)
  const [exerciseConfig, setExerciseConfig] = useState<ExerciseConfig | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu chưa đăng nhập, hiển thị trang chủ với nút đăng nhập
  if (!user && !showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              🧮 Luyện Tập Toán Học
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ứng dụng giúp học sinh luyện tập các phép tính cộng, trừ, nhân, chia 
              với giao diện thân thiện và tính năng đa dạng
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowAuth(true)}
                className="btn-primary text-lg px-8 py-3"
              >
                Bắt đầu luyện tập
              </button>
              
              <div className="text-sm text-gray-500">
                Đăng nhập để lưu tiến độ và xem lịch sử bài tập
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-semibold mb-2">Phép Cộng</h3>
              <p className="text-gray-600">
                Luyện tập phép cộng trong phạm vi 10, 20, 100 với các dạng có nhớ và không nhớ
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">➖</div>
              <h3 className="text-xl font-semibold mb-2">Phép Trừ</h3>
              <p className="text-gray-600">
                Thực hành phép trừ với các số có nhiều chữ số khác nhau
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">✖️</div>
              <h3 className="text-xl font-semibold mb-2">Phép Nhân & Chia</h3>
              <p className="text-gray-600">
                Luyện tập phép nhân và chia với giao diện bảng tính chi tiết
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị form đăng nhập/đăng ký
  if (!user && showAuth) {
    return (
      <AuthForm
        mode={authMode}
        onSuccess={() => setShowAuth(false)}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    )
  }

  // Nếu đã đăng nhập và chưa chọn bài tập
  if (user && !exerciseConfig) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chào mừng, {user.full_name}!
              </h1>
              <p className="text-gray-600">Chọn bài tập để bắt đầu luyện tập</p>
            </div>
            <button
              onClick={signOut}
              className="btn-secondary"
            >
              Đăng xuất
            </button>
          </div>
          
          <ExerciseSettings onStart={setExerciseConfig} />
        </div>
      </div>
    )
  }

  // Hiển thị bài tập
  if (exerciseConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Bài tập: {getOperationName(exerciseConfig.operation)}
            </h1>
            <button
              onClick={() => setExerciseConfig(null)}
              className="btn-secondary"
            >
              Quay lại
            </button>
          </div>
          
          <ExerciseSession
            config={exerciseConfig}
            onComplete={() => setExerciseConfig(null)}
          />
        </div>
      </div>
    )
  }

  return null
}

function getOperationName(operation: string): string {
  switch (operation) {
    case 'addition':
      return 'Phép Cộng'
    case 'subtraction':
      return 'Phép Trừ'
    case 'multiplication':
      return 'Phép Nhân'
    case 'division':
      return 'Phép Chia'
    default:
      return 'Bài Tập'
  }
}
