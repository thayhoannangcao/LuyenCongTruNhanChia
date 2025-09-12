'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import ExerciseSession from '@/components/math/ExerciseSession';
import type {
  AdditionRangeType,
  AdditionSettings,
  AdditionType,
  CalculationType,
  ExerciseConfig,
  InputDirectionType,
  SubtractionRangeType,
  TimeType,
  SubtractionSettings,
  SubtractionType,
  ExerciseType,
  MultiplicationSettings,
} from '@/lib/math-generator';

export default function PracticePage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [config, setConfig] = useState<ExerciseConfig | null>(null);

  useMemo(() => {
    const operation =
      (params.get('operation') as ExerciseConfig['operation']) || 'addition';
    const numsDigits = (params.get('nums') || '1') as unknown as number[];
    const totalQuestions = Number(params.get('total') || '10');
    const additionRangeType = params.get('ar')
      ? (Number(params.get('ar')) as any)
      : (undefined as AdditionRangeType | undefined);
    const additionType = params.get('at')
      ? (params.get('at') as any)
      : (undefined as AdditionType | undefined);
    const additionRangeValue = params.get('arv')
      ? (Number(params.get('arv')) as any)
      : (undefined as number | undefined);
    const subtractionRangeType = params.get('sr')
      ? (Number(params.get('sr')) as any)
      : (undefined as SubtractionRangeType | undefined);
    const subtractionType = params.get('st')
      ? (params.get('st') as any)
      : (undefined as SubtractionType | undefined);
    const subtractionRangeValue = params.get('srv')
      ? (Number(params.get('srv')) as any)
      : (undefined as number | undefined);
    const numTerms = Number(params.get('nt') || '2');
    const timeType = params.get('tt')
      ? (params.get('tt') as any)
      : (undefined as TimeType | undefined);
    const timeValue = params.get('tv')
      ? (Number(params.get('tv')) as any)
      : (undefined as number | undefined);
    const calculationType = params.get('ct')
      ? (params.get('ct') as any)
      : (undefined as CalculationType | undefined);
    const inputDirectionType = params.get('it')
      ? (params.get('it') as any)
      : (undefined as InputDirectionType | undefined);
    const rangeValue = Number(params.get('rv') || '0');
    const exerciseType = params.get('et')
      ? (params.get('et') as any)
      : (undefined as ExerciseType | undefined);
    const multiplicationTable = params.get('mt')
      ? (Number(params.get('mt')) as any)
      : (undefined as number | undefined);
    const additionToMultiplicationTable = params.get('amt')
      ? (Number(params.get('amt')) as any)
      : (undefined as number | undefined);

    setConfig({
      operation,
      numsDigits,
      totalQuestions,
      additionSettings: {
        additionRangeType,
        additionType,
        additionRangeValue,
      } as AdditionSettings,
      subtractionSettings: {
        subtractionRangeType,
        subtractionType,
        subtractionRangeValue,
      } as SubtractionSettings,
      multiplicationSettings: {
        multiplicationTable,
        additionToMultiplicationTable,
      } as MultiplicationSettings,
      divisionSettings: {},
      numTerms,
      timeType,
      timeValue,
      calculationType,
      inputDirectionType,
      rangeValue,
      exerciseType,
    });
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-gray-900">Luyện tập</h1>
          <button
            className="btn-secondary"
            onClick={() => router.push('/dashboard')}
          >
            Quay lại
          </button>
        </div>
        <ExerciseSession
          config={config}
          onComplete={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}
