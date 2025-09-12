'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/ToastProvider';
import { changePassword } from '@/src/utils/auth';
import type { ChangePasswordPayload } from '@/src/types/types';

export default function ChangePasswordForm() {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<ChangePasswordPayload>({
    currentPassword: '',
    newPassword: '',
    signOutAfter: true,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setSuccess(null);

    if (!form.currentPassword || !form.newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (form.newPassword === form.currentPassword) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại');
      return;
    }
    if (form.newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu không khớp');
      return;
    }

    setLoading(true);
    const safety = setTimeout(() => setLoading(false), 15000);
    try {
      const res = await changePassword(form);
      if (!res.success) {
        setError(res.error || 'Đổi mật khẩu thất bại');
        toast.error(res.error || 'Đổi mật khẩu thất bại');
      } else {
        // Chuyển ngay về trang đăng nhập
        setSuccess(
          form.signOutAfter
            ? 'Đổi mật khẩu thành công. Đang chuyển về trang đăng nhập...'
            : 'Đổi mật khẩu thành công.'
        );
        toast.success('Đổi mật khẩu thành công');
        setForm({
          currentPassword: '',
          newPassword: '',
          signOutAfter: form.signOutAfter,
        });
        setConfirmPassword('');
        if (form.signOutAfter) {
          router.replace('/auth/login');
        } else {
          router.replace('/dashboard');
        }
      }
    } finally {
      clearTimeout(safety);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Nhập mật khẩu hiện tại"
              autoComplete="current-password"
            />
            <button
              type="button"
              aria-label="toggle current password"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowCurrent((s) => !s)}
            >
              {showCurrent ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.087-2.088a12.318 12.318 0 0 0 3.057-4.373.75.75 0 0 0 0-.558C20.795 7.387 16.047 4.5 11 4.5a10.95 10.95 0 0 0-4.942 1.163L3.53 2.47ZM7.31 6.25A9.45 9.45 0 0 1 11 5.999c4.226 0 8.33 2.507 10.24 6.983a10.82 10.82 0 0 1-2.694 3.754l-2.077-2.078A4.5 4.5 0 0 0 9.34 9.55L7.31 7.52a.75.75 0 1 1 1.06-1.061l1.473 1.472a4.5 4.5 0 0 0 5.934 5.934l1.472 1.473-1.06 1.06-1.37-1.37A6 6 0 0 1 8.68 8.62L7.31 7.25Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 5c-5.047 0-9.795 2.887-11.25 7.5a.75.75 0 0 0 0 .5C2.205 17.613 6.953 20.5 12 20.5s9.795-2.887 11.25-7.5a.75.75 0 0 0 0-.5C21.795 7.887 17.047 5 12 5Zm0 13a5 5 0 1 1 0-10.001A5 5 0 0 1 12 18Zm0-2a3 3 0 1 0 0-6.001A3 3 0 0 0 12 16Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Nhập mật khẩu mới"
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label="toggle new password"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowNew((s) => !s)}
            >
              {showNew ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.087-2.088a12.318 12.318 0 0 0 3.057-4.373.75.75 0 0 0 0-.558C20.795 7.387 16.047 4.5 11 4.5a10.95 10.95 0 0 0-4.942 1.163L3.53 2.47ZM7.31 6.25A9.45 9.45 0 0 1 11 5.999c4.226 0 8.33 2.507 10.24 6.983a10.82 10.82 0 0 1-2.694 3.754l-2.077-2.078A4.5 4.5 0 0 0 9.34 9.55L7.31 7.52a.75.75 0 1 1 1.06-1.061l1.473 1.472a4.5 4.5 0 0 0 5.934 5.934l1.472 1.473-1.06 1.06-1.37-1.37A6 6 0 0 1 8.68 8.62L7.31 7.25Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 5c-5.047 0-9.795 2.887-11.25 7.5a.75.75 0 0 0 0 .5C2.205 17.613 6.953 20.5 12 20.5s9.795-2.887 11.25-7.5a.75.75 0 0 0 0-.5C21.795 7.887 17.047 5 12 5Zm0 13a5 5 0 1 1 0-10.001A5 5 0 0 1 12 18Zm0-2a3 3 0 1 0 0-6.001A3 3 0 0 0 12 16Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Nhập lại mật khẩu mới"
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label="toggle confirm password"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowConfirm((s) => !s)}
            >
              {showConfirm ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.087-2.088a12.318 12.318 0 0 0 3.057-4.373.75.75 0 0 0 0-.558C20.795 7.387 16.047 4.5 11 4.5a10.95 10.95 0 0 0-4.942 1.163L3.53 2.47ZM7.31 6.25A9.45 9.45 0 0 1 11 5.999c4.226 0 8.33 2.507 10.24 6.983a10.82 10.82 0 0 1-2.694 3.754l-2.077-2.078A4.5 4.5 0 0 0 9.34 9.55L7.31 7.52a.75.75 0 1 1 1.06-1.061l1.473 1.472a4.5 4.5 0 0 0 5.934 5.934l1.472 1.473-1.06 1.06-1.37-1.37A6 6 0 0 1 8.68 8.62L7.31 7.25Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 5c-5.047 0-9.795 2.887-11.25 7.5a.75.75 0 0 0 0 .5C2.205 17.613 6.953 20.5 12 20.5s9.795-2.887 11.25-7.5a.75.75 0 0 0 0-.5C21.795 7.887 17.047 5 12 5Zm0 13a5 5 0 1 1 0-10.001A5 5 0 0 1 12 18Zm0-2a3 3 0 1 0 0-6.001A3 3 0 0 0 12 16Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.signOutAfter}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, signOutAfter: e.target.checked }))
            }
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">
            Đăng xuất sau khi đổi mật khẩu
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
        >
          {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
        </button>

        {error && (
          <div className="text-center text-sm text-red-600">{error}</div>
        )}
        {success && (
          <div className="text-center text-sm text-green-600">{success}</div>
        )}
      </form>
    </div>
  );
}
