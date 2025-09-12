'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Button from '@/src/components/Button/Button';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="to-primary-100 min-h-screen bg-gradient-to-br from-primary-50">
      <div className="container relative mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            🧮 Luyện Tập Toán Học
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Ứng dụng giúp học sinh luyện tập các phép tính cộng, trừ, nhân, chia
            với giao diện thân thiện và tính năng đa dạng
          </p>

          <div className="space-y-4">
            <Button
              title="Bắt đầu luyện tập"
              size="lg"
              onClick={() => {
                if (user) {
                  window.location.href = '/dashboard';
                } else {
                  window.location.href = '/auth/login';
                }
              }}
              className="btn-primary px-8 py-3 text-lg"
              variant="main"
            />

            <div className="text-sm text-gray-500">
              {user
                ? 'Bạn đã đăng nhập.'
                : 'Đăng nhập để lưu tiến độ và xem lịch sử bài tập'}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="mb-4 text-4xl">➕</div>
            <h3 className="mb-2 text-xl font-semibold">Phép Cộng</h3>
            <p className="text-gray-600">
              Luyện tập phép cộng trong phạm vi 10, 20, 100 với các dạng có nhớ
              và không nhớ
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4 text-4xl">➖</div>
            <h3 className="mb-2 text-xl font-semibold">Phép Trừ</h3>
            <p className="text-gray-600">
              Thực hành phép trừ với các số có nhiều chữ số khác nhau
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4 text-4xl">✖️</div>
            <h3 className="mb-2 text-xl font-semibold">Phép Nhân & Chia</h3>
            <p className="text-gray-600">
              Luyện tập phép nhân và chia với giao diện bảng tính chi tiết
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
