'use client'

import { useState } from 'react'
import type { ExerciseConfig, OperationType, AdditionRange, AdditionType } from '@/lib/math-generator'

interface ExerciseSettingsProps {
  onStart: (config: ExerciseConfig) => void
}

export default function ExerciseSettings({ onStart }: ExerciseSettingsProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    operation: 'addition',
    num1Digits: 1,
    num2Digits: 1,
    totalQuestions: 10,
    additionRange: 10,
    additionType: 'without_carry'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (config.num1Digits < 1 || config.num1Digits > 9) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9')
      return
    }
    
    if (config.num2Digits < 1 || config.num2Digits > 9) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9')
      return
    }
    
    if (config.totalQuestions < 1 || config.totalQuestions > 50) {
      alert('Vui lòng nhập số câu hỏi từ 1 đến 50')
      return
    }
    
    if (config.operation === 'subtraction' && config.num1Digits < config.num2Digits) {
      alert('Phép trừ: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai')
      return
    }
    
    if (config.operation === 'division' && config.num1Digits < config.num2Digits) {
      alert('Phép chia: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai')
      return
    }

    onStart(config)
  }

  const handleConfigChange = (key: keyof ExerciseConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
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
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phạm vi:
              </label>
              <select
                value={config.additionRange || 10}
                onChange={(e) => handleConfigChange('additionRange', parseInt(e.target.value) as AdditionRange)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={10}>Trong phạm vi 10</option>
                <option value={20}>Trong phạm vi 20</option>
                <option value={100}>Trong phạm vi 100</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại phép cộng:
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="additionType"
                    value="without_carry"
                    checked={config.additionType === 'without_carry'}
                    onChange={(e) => handleConfigChange('additionType', e.target.value as AdditionType)}
                    className="mr-2"
                  />
                  Không nhớ
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="additionType"
                    value="with_carry"
                    checked={config.additionType === 'with_carry'}
                    onChange={(e) => handleConfigChange('additionType', e.target.value as AdditionType)}
                    className="mr-2"
                  />
                  Có nhớ
                </label>
              </div>
            </div>
          </>
        )}

        {/* Số chữ số - chỉ hiển thị khi không phải phép cộng đặc biệt */}
        {!(config.operation === 'addition' && config.additionRange) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số chữ số của số thứ nhất:
              </label>
              <input
                type="number"
                min="1"
                max="9"
                value={config.num1Digits}
                onChange={(e) => handleConfigChange('num1Digits', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số chữ số của số thứ hai:
              </label>
              <input
                type="number"
                min="1"
                max="9"
                value={config.num2Digits}
                onChange={(e) => handleConfigChange('num2Digits', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </>
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
