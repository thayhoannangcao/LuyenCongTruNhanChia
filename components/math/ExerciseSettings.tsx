'use client';

import { useState } from 'react';
import type {
  ExerciseConfig,
  OperationType,
  AdditionRangeType,
  AdditionType,
  TimeType,
  CalculationType,
} from '@/lib/math-generator';
import AddSettings from './settings/AddSettings';
import {
  generateRandomNumberWithMaxAndDigits,
  generateRandomNumber,
  countDigits,
} from '@/lib/math-generator';

interface ExerciseSettingsProps {
  onStart: (config: ExerciseConfig) => void;
}

export default function ExerciseSettings({ onStart }: ExerciseSettingsProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    operation: 'addition',
    additionSettings: {
      additionRangeType: 1,
      additionType: 'without_carry',
      additionRangeValue: 10,
    },
    subtractionSettings: {
      subtractionRangeType: 1,
      subtractionType: 'without_carry',
      subtractionRangeValue: 10,
    },
    multiplicationSettings: {},
    divisionSettings: {},
    numTerms: 2,
    numsDigits: [1, 1],
    rangeValue: 10,
    totalQuestions: 10,
    timeType: 'false',
    timeValue: 1,
    calculationType: 'true',
    inputDirectionType: 'rtl',
  });

  const minNumber = (n: number) => {
    if (n === 1) {
      return 0;
    } else {
      return 10 ** (n - 1);
    }
  };

  function maxOfDigits(n: number): number {
    if (n <= 0) return 0;
    return Math.pow(10, n) - 1;
  }

  const isInvalidRangeAndDigits = (
    numTerms: number,
    numsDigits: number[],
    rangeValue: number
  ) => {
    const lenRangeValue = countDigits(rangeValue);

    for (let i = 0; i < numTerms; i++) {
      if (numsDigits[i] < 1 || numsDigits[i] > 9) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (config.numsDigits.some((digit) => digit < 1 || digit > 9)) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9');
      return;
    }

    if (config.numsDigits.some((digit) => digit < 1 || digit > 9)) {
      alert('Vui lòng nhập số chữ số từ 1 đến 9');
      return;
    }

    if (config.totalQuestions < 1 || config.totalQuestions > 50) {
      alert('Vui lòng nhập số câu hỏi từ 1 đến 50');
      return;
    }

    if (
      config.operation === 'subtraction' &&
      config.numsDigits.some((digit) => digit < 1 || digit > 9)
    ) {
      alert(
        'Phép trừ: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai'
      );
      return;
    }

    if (
      config.operation === 'division' &&
      config.numsDigits.some((digit) => digit < 1 || digit > 9)
    ) {
      alert(
        'Phép chia: số chữ số của số thứ nhất phải lớn hơn hoặc bằng số thứ hai'
      );
      return;
    }

    if (config.timeType === 'true' && config.timeValue === 0) {
      alert('Vui lòng nhập thời gian lớn hơn 0');
      return;
    }

    if (config.additionSettings.additionRangeType !== 3) {
      config.additionSettings.additionRangeValue = undefined;
      if (config.additionSettings.additionRangeType !== 2) {
        config.numsDigits = Array(config.numTerms).fill(1);
      }
    }

    if (config.additionSettings.additionRangeType === 3) {
      let sum = 0;
      for (let i = 0; i < config.numTerms; i++) {
        sum += minNumber(config.numsDigits[i]);
      }
      if (sum > (config.additionSettings.additionRangeValue || 0)) {
        alert('Vui lòng tăng phạm vi hoặc giảm số chữ số');
        return;
      }
    }

    onStart(config);
  };

  // console.log('config.numsDigits', config.numsDigits)

  const handleConfigChange = (key: keyof ExerciseConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const renderRangeValue = (numTerms: number) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Phạm vi:
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="additionRangeType"
              value="1"
              checked={config.additionSettings.additionRangeType === 1}
              onChange={(e) =>
                handleConfigChange('additionSettings', {
                  ...config.additionSettings,
                  additionRangeType: parseInt(
                    e.target.value
                  ) as AdditionRangeType,
                })
              }
              className="mr-2"
            />
            Trong phạm vi {numTerms}0
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="additionRangeType"
              value="2"
              checked={config.additionSettings.additionRangeType === 2}
              onChange={(e) =>
                handleConfigChange('additionSettings', {
                  ...config.additionSettings,
                  additionRangeType: parseInt(
                    e.target.value
                  ) as AdditionRangeType,
                })
              }
              className="mr-2"
            />
            Trong phạm vi 100
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="additionRangeType"
              value="3"
              checked={config.additionSettings.additionRangeType === 3}
              onChange={(e) =>
                handleConfigChange('additionSettings', {
                  ...config.additionSettings,
                  additionRangeType: parseInt(
                    e.target.value
                  ) as AdditionRangeType,
                })
              }
              className="mr-2"
            />
            Tự chọn
          </label>
          {config.additionSettings.additionRangeType === 3 && (
            <label className="flex items-center">
              <input
                type="number"
                name="additionRangeValue"
                value={config.additionSettings.additionRangeValue}
                onChange={(e) =>
                  handleConfigChange('additionSettings', {
                    ...config.additionSettings,
                    additionRangeValue: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Cài đặt bài tập</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loại phép tính */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Chọn phép tính:
          </label>
          <select
            value={config.operation}
            onChange={(e) =>
              handleConfigChange('operation', e.target.value as OperationType)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="addition">Cộng (+)</option>
            <option value="subtraction">Trừ (-)</option>
            <option value="multiplication">Nhân (×)</option>
            <option value="division">Chia (÷)</option>
          </select>
        </div>

        {/* Cài đặt phép cộng đặc biệt */}
        {config.operation === 'addition' && (
          <AddSettings
            config={config}
            renderRangeValue={renderRangeValue}
            handleConfigChange={handleConfigChange}
          />
        )}

        {/* Số câu hỏi */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Số câu hỏi:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={config.totalQuestions}
            onChange={(e) =>
              handleConfigChange('totalQuestions', parseInt(e.target.value))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phép tính:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="calculation"
                value="true"
                checked={config.calculationType === 'true'}
                onChange={(e) =>
                  handleConfigChange(
                    'calculationType',
                    e.target.value as CalculationType
                  )
                }
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
                onChange={(e) =>
                  handleConfigChange(
                    'calculationType',
                    e.target.value as CalculationType
                  )
                }
                className="mr-2"
              />
              Đặt tính rồi tính
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tính thời gian:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="time"
                value="true"
                checked={config.timeType === 'true'}
                onChange={(e) =>
                  handleConfigChange('timeType', e.target.value as TimeType)
                }
                className="mr-2"
              />
              Có
            </label>
            {config.timeType === 'true' && (
              <label className="flex items-center">
                <input
                  type="number"
                  min="0"
                  name="timeValue"
                  value={config.timeValue}
                  onChange={(e) =>
                    handleConfigChange('timeValue', e.target.value)
                  }
                  className="mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                Giây
              </label>
            )}
            <label className="flex items-center">
              <input
                type="radio"
                name="time"
                value="false"
                checked={config.timeType === 'false'}
                onChange={(e) =>
                  handleConfigChange('timeType', e.target.value as TimeType)
                }
                className="mr-2"
              />
              Không
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Bắt đầu
        </button>
      </form>
    </div>
  );
}
