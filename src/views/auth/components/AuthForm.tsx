'use client';

import { useState } from 'react';
import {
  signIn,
  signUp,
  type SignInData,
  type SignUpData,
} from '@/src/utils/auth';
import { useToast } from '@/components/ui/ToastProvider';
import Button from '@/src/components/Button';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export default function AuthForm({
  mode,
  onSuccess,
  onSwitchMode,
}: AuthFormProps) {
  const toast = useToast();
  const [formData, setFormData] = useState<SignInData | SignUpData>({
    username: '',
    password: '',
    ...(mode === 'signup' && { full_name: '' }),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (mode === 'signin') {
        result = await signIn(formData as SignInData);
      } else {
        result = await signUp(formData as SignUpData);
      }

      if (result.success) {
        toast.success(
          mode === 'signin' ? 'Đăng nhập thành công' : 'Đăng ký thành công'
        );
        onSuccess();
      } else {
        setError(result.error || 'Có lỗi xảy ra');
        toast.error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'signin'
              ? 'Chào mừng bạn quay trở lại!'
              : 'Tạo tài khoản mới để bắt đầu luyện tập'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Nhập họ và tên"
                  value={(formData as SignUpData).full_name || ''}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tài khoản
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Nhập tài khoản"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full"
              disabled={loading}
              loading={loading}
            >
              {mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
            </Button>
          </div>

          <div className="text-center">
            <Button type="link" onClick={onSwitchMode}>
              {mode === 'signin'
                ? 'Chưa có tài khoản? Đăng ký ngay'
                : 'Đã có tài khoản? Đăng nhập'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
