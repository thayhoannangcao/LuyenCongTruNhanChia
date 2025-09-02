'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import ExerciseSession from '@/components/math/ExerciseSession'
import type { ExerciseConfig } from '@/lib/math-generator'

export default function PracticePage() {
  const params = useSearchParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [config, setConfig] = useState<ExerciseConfig | null>(null)

  useMemo(() => {
    const operation = (params.get('operation') as ExerciseConfig['operation']) || 'addition'
    const num1Digits = Number(params.get('num1') || '1')
    const num2Digits = Number(params.get('num2') || '1')
    const totalQuestions = Number(params.get('total') || '10')
    const additionRange = params.get('ar') ? (Number(params.get('ar')) as any) : undefined
    const additionType = params.get('at') ? (params.get('at') as any) : undefined

    setConfig({ operation, num1Digits, num2Digits, totalQuestions, additionRange, additionType })
  }, [params])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
  }

  if (!config) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Luyện tập</h1>
          <button className="btn-secondary" onClick={() => router.push('/dashboard')}>Quay lại</button>
        </div>
        <ExerciseSession config={config} onComplete={() => router.push('/dashboard')} />
      </div>
    </div>
  )
}


