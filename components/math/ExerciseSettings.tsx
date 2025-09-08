'use client'

import { useState } from 'react'
import type { ExerciseConfig, OperationType, AdditionRangeType, AdditionType, TimeType, CalculationType } from '@/lib/math-generator'
import AddSettings from './settings/AddSettings'

interface ExerciseSettingsProps {
  onStart: (config: ExerciseConfig) => void
}

export default function ExerciseSettings({ onStart }: ExerciseSettingsProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    operation: 'addition',
    additionSettings: {
      additionRangeType: 1,
      additionType: 'without_carry'
    },
    subtractionSettings: {
      subtractionRangeType: 1,
      subtractionType: 'without_carry'
    },
    multiplicationSettings: {
    },
    divisionSettings: {
    },
    numTerms: 2,
    numsDigits: [1, 1],
    rangeValue: 10,
    totalQuestions: 10,
    timeType: 'false',
    calculationType: 'true',
    inputDirectionType: 'rtl'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (config.numsDigits.some(digit => digit < 1 || digit > 9)) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9')
      return
    }

    if (config.numsDigits.some(digit => digit < 1 || digit > 9)) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9')
      return
    }

    if (config.totalQuestions < 1 || config.totalQuestions > 50) {
      alert('Vui lòng nhập số câu hỏi từ 1 đến 50')
      return
    }

    if (config.operation === 'subtraction' && config.numsDigits.some(digit => digit < 1 || digit > 9)) {
      alert('Phép trừ: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai')
      return
    }

    if (config.operation === 'division' && config.numsDigits.some(digit => digit < 1 || digit > 9)) {
      alert('Phép chia: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai')
      return
    }

    onStart(config)
  }

  const handleConfigChange = (key: keyof ExerciseConfig, value: any) => {
    console.log(key, value)
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const renderRangeValue = (numTerms: number) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phạm vi:
        </label>
        <select
          value={config.additionSettings.additionRangeType || 1}
          onChange={(e) => handleConfigChange('additionSettings', { ...config.additionSettings, additionRangeType: parseInt(e.target.value) as AdditionRangeType })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value={1}>Trong phạm vi {numTerms}0</option>
          <option value={2}>Trong phạm vi 100</option>
          <option value={3}>Tự chọn</option>
        </select>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Cài đặt bài tập</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loại phép tính */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn phép tính:
          </label>
          <select
            value={config.operation}
            onChange={(e) => handleConfigChange('operation', e.target.value as OperationType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="addition">Cộng (+)</option>
            <option value="subtraction">Trừ (-)</option>
            <option value="multiplication">Nhân (×)</option>
            <option value="division">Chia (÷)</option>
          </select>
        </div>

        {/* Cài đặt phép cộng đặc biệt */}
        {config.operation === 'addition' && (
          <AddSettings config={config} renderRangeValue={renderRangeValue} handleConfigChange={handleConfigChange} />
        )}

        {/* Số câu hỏi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số câu hỏi:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={config.totalQuestions}
            onChange={(e) => handleConfigChange('totalQuestions', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phép tính:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="calculation"
                value="true"
                checked={config.calculationType === 'true'}
                onChange={(e) => handleConfigChange('calculationType', e.target.value as CalculationType)}
                className="mr-2"
              />
              Tính
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="calculation"
                value="false"
                checked={config.calculationType === 'false'}
                onChange={(e) => handleConfigChange('calculationType', e.target.value as CalculationType)}
                className="mr-2"
              />
              Đặt tính rồi tính
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tính thời gian:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="time"
                value="true"
                checked={config.timeType === 'true'}
                onChange={(e) => handleConfigChange('timeType', e.target.value as TimeType)}
                className="mr-2"
              />
              Có
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="time"
                value="false"
                checked={config.timeType === 'false'}
                onChange={(e) => handleConfigChange('timeType', e.target.value as TimeType)}
                className="mr-2"
              />
              Không
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
        >
          Bắt đầu
        </button>
      </form>
    </div>
  )
}
