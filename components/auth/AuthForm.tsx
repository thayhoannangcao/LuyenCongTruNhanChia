'use client'

import { useState } from 'react'
import { signIn, signUp, type SignInData, type SignUpData } from '@/lib/auth'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess: () => void
  onSwitchMode: () => void
}

export default function AuthForm({ mode, onSuccess, onSwitchMode }: AuthFormProps) {
  const [formData, setFormData] = useState<SignInData | SignUpData>({
    username: '',
    password: '',
    ...(mode === 'signup' && { full_name: '' })
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (mode === 'signin') {
        result = await signIn(formData as SignInData)
      } else {
        result = await signUp(formData as SignUpData)
      }

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error || 'Có lỗi xảy ra')
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'signin' 
              ? 'Chào mừng bạn quay trở lại!' 
              : 'Tạo tài khoản mới để bắt đầu luyện tập'
            }
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Nhập họ và tên"
                  value={(formData as SignUpData).full_name || ''}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tài khoản
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Nhập tài khoản"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang xử lý...' : (mode === 'signin' ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchMode}
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              {mode === 'signin' 
                ? 'Chưa có tài khoản? Đăng ký ngay' 
                : 'Đã có tài khoản? Đăng nhập'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
