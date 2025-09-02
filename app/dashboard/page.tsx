'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import ExerciseSettings from '@/components/math/ExerciseSettings'
import { useRouter } from 'next/navigation'
import { ROUTE_CHANGE_PASSWORD } from '@/lib/constants'
import { useState, useMemo, useRef, useEffect } from 'react'

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  // Hooks phải khai báo trước mọi return
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const userInitials = useMemo(() => {
    const name = (user?.full_name?.trim() || user?.username || 'U') as string
    const parts = name.split(' ').filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }, [user?.full_name, user?.username])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return
      if (!(e.target instanceof Node)) return
      if (!menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
    )
  }

  if (!user) {
    router.replace('/auth/login')
    return null
  }

  if (user.role === 'admin') {
    router.replace('/admin/dashboard')
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
          <div className="relative" ref={menuRef}>
            <button
              className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setMenuOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {userInitials}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border z-50 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpen(false)
                    router.push(ROUTE_CHANGE_PASSWORD)
                  }}
                >
                  Đổi mật khẩu
                </button>
                <div className="h-px bg-gray-100" />
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                  onClick={() => {
                    setMenuOpen(false)
                    signOut()
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
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


