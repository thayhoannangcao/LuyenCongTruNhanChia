'use client'

import { useAuth } from '@/components/auth/AuthProvider'

export default function HomePage() {
  const { user, loading } = useAuth()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16 relative">
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
              onClick={() => {
                if (user) {
                  window.location.href = '/dashboard'
                } else {
                  window.location.href = '/auth/login'
                }
              }}
              className="btn-primary text-lg px-8 py-3"
            >
              Bắt đầu luyện tập
            </button>

            <div className="text-sm text-gray-500">
              {user ? 'Bạn đã đăng nhập.' : 'Đăng nhập để lưu tiến độ và xem lịch sử bài tập'}
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


