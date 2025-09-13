'use client';

import { useAuth } from '@/components/layouts/AuthProvider';
import ExerciseSettings from '@/src/views/math/components/ExerciseSettings';
import { useRouter } from 'next/navigation';
import { ROUTE_CHANGE_PASSWORD } from '@/src/constants/base.constants';
import { useState, useMemo, useRef, useEffect } from 'react';
import Button from '@/src/components/Button';

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const userInitials = useMemo(() => {
    const name = (user?.full_name?.trim() || user?.username || 'U') as string;
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [user?.full_name, user?.username]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!user) {
    router.replace('/auth/login');
    return null;
  }

  if (user.role === 'admin') {
    router.replace('/admin/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Chào mừng, {user.full_name}!
            </h1>
            <p className="text-gray-600">Chọn bài tập để bắt đầu luyện tập</p>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-semibold text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {userInitials}
            </button>
            {menuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-md border bg-white shadow-lg">
                <Button
                  className="w-full border-none"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(ROUTE_CHANGE_PASSWORD);
                  }}
                >
                  Đổi mật khẩu
                </Button>

                <div className="h-px bg-gray-100" />
                <Button
                  className="w-full border-none"
                  danger
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  loading={loading}
                >
                  Đăng xuất
                </Button>
              </div>
            )}
          </div>
        </div>

        <ExerciseSettings
          onStart={(config) => {
            const params = new URLSearchParams({
              operation: config.operation,
              ar: config.additionSettings.additionRangeType
                ? String(config.additionSettings.additionRangeType)
                : '',
              at: config.additionSettings.additionType
                ? String(config.additionSettings.additionType)
                : '',
              arv: config.additionSettings.additionRangeValue
                ? String(config.additionSettings.additionRangeValue)
                : '',
              sr: config.subtractionSettings.subtractionRangeType
                ? String(config.subtractionSettings.subtractionRangeType)
                : '',
              st: config.subtractionSettings.subtractionType
                ? String(config.subtractionSettings.subtractionType)
                : '',
              srv: config.subtractionSettings.subtractionRangeValue
                ? String(config.subtractionSettings.subtractionRangeValue)
                : '',
              nt: String(config.numTerms),
              nums: String(config.numsDigits),
              rv: String(config.rangeValue),
              total: String(config.totalQuestions),
              tt: config.timeType ? String(config.timeType) : '',
              tv: config.timeValue ? String(config.timeValue) : '',
              ct: config.calculationType ? String(config.calculationType) : '',
              it: config.inputDirectionType
                ? String(config.inputDirectionType)
                : '',
              et: config.exerciseType ? String(config.exerciseType) : '',
              mt: config.multiplicationSettings.multiplicationTable
                ? String(config.multiplicationSettings.multiplicationTable)
                : '',
              amt: config.multiplicationSettings.additionToMultiplicationTable
                ? String(
                    config.multiplicationSettings.additionToMultiplicationTable
                  )
                : '',
            });
            router.push(`/practice?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
}
