'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import ExerciseSession from '@/components/math/ExerciseSession'
import type { AdditionRangeType, AdditionSettings, AdditionType, CalculationType, ExerciseConfig, InputDirectionType, SubtractionRangeType, TimeType, SubtractionSettings, SubtractionType } from '@/lib/math-generator'

export default function PracticePage() {
  const params = useSearchParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [config, setConfig] = useState<ExerciseConfig | null>(null)

  useMemo(() => {
    const operation = (params.get('operation') as ExerciseConfig['operation']) || 'addition'
    const numsDigits = (params.get('nums') || '1') as unknown as number[]
    const totalQuestions = Number(params.get('total') || '10')
    const additionRangeType = params.get('ar') ? (Number(params.get('ar')) as any) : undefined as AdditionRangeType | undefined
    const additionType = params.get('at') ? (params.get('at') as any) : undefined as AdditionType | undefined
    const subtractionRangeType = params.get('sr') ? (Number(params.get('sr')) as any) : undefined as SubtractionRangeType | undefined
    const subtractionType = params.get('st') ? (params.get('st') as any) : undefined as SubtractionType | undefined
    const numTerms = Number(params.get('nt') || '2')
    const timeType = params.get('tt') ? (params.get('tt') as any) : undefined as TimeType | undefined
    const calculationType = params.get('ct') ? (params.get('ct') as any) : undefined as CalculationType | undefined
    const inputDirectionType = params.get('it') ? (params.get('it') as any) : undefined as InputDirectionType | undefined
    const rangeValue = Number(params.get('rv') || '0')
    setConfig({ operation, numsDigits, totalQuestions, additionSettings: { additionRangeType, additionType } as AdditionSettings, subtractionSettings: { subtractionRangeType, subtractionType } as SubtractionSettings, multiplicationSettings: {}, divisionSettings: {}, numTerms, timeType, calculationType, inputDirectionType, rangeValue })
  }, [params])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
  }

  if (!config) return null

  console.log(config)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Luyện tập</h1>
          <button className="btn-secondary" onClick={() => router.push('/dashboard')}>Quay lại</button>
        </div>
        <ExerciseSession config={config} onComplete={() => router.push('/dashboard')} />
      </div>
    </div>
  )
}


