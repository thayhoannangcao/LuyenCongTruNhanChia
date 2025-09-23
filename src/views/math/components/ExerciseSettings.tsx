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
  generateNumbersForAddition,
  generateSubtractionExercise,
  generateMultiplicationExercise,
} from '@/lib/math-generator';
import SubSettings from './settings/SubSettings';
import MultiSettings from './settings/MultiSettings';
import Button from '@/src/components/Button';
import Select from '@/src/components/Select';
import Radio from '@/src/components/Radio';
import InputNumber from '@/src/components/InputNumber';

interface ExerciseSettingsProps {
  onStart: (config: ExerciseConfig) => void;
}

export default function ExerciseSettings({ onStart }: ExerciseSettingsProps) {
  const [loading, setLoading] = useState(false);
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
    multiplicationSettings: {
      multiplicationTable: 2,
      additionToMultiplicationTable: 2,
    },
    exerciseType: 'default',
    divisionSettings: {},
    numTerms: 2,
    numsDigits: [1, 1],
    rangeValue: 10,
    totalQuestions: 10,
    timeType: 'false',
    timeValue: 3,
    calculationType: 'false',
    inputDirectionType: 'rtl',
  });

  const minNumber = (n: number) => {
    if (n === 1) {
      return 0;
    } else {
      return 10 ** (n - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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

    if (config.operation === 'addition') {
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

      const numbers = generateNumbersForAddition(
        config.numTerms,
        (config.numsDigits as number[]).join(',') as unknown as number[],
        config.additionSettings
      );
      if (numbers.errorMessage) {
        alert(numbers.errorMessage);
        return;
      }
    }

    if (config.operation === 'subtraction') {
      if (config.subtractionSettings.subtractionRangeType !== 3) {
        config.subtractionSettings.subtractionRangeValue = undefined;
        if (config.subtractionSettings.subtractionRangeType !== 2) {
          config.numsDigits = Array(config.numTerms).fill(1);
        }
      }

      if (config.subtractionSettings.subtractionRangeType === 3) {
        let sum = 0;
        for (let i = 0; i < config.numTerms; i++) {
          sum += minNumber(config.numsDigits[i]);
        }
        if (sum > (config.subtractionSettings.subtractionRangeValue || 0)) {
          alert('Vui lòng tăng phạm vi hoặc giảm số chữ số');
          return;
        }
      }

      const numbers = generateSubtractionExercise(config);
      if (numbers.errorMessage) {
        alert(numbers.errorMessage);
        return;
      }
    }

    if (config.operation === 'multiplication') {
      const numbers = generateMultiplicationExercise(config);
    }

    // console.log('config', config);

    onStart(config);
    setLoading(false);
  };

  // console.log('config.numsDigits', config.numsDigits)

  const handleConfigChange = (key: keyof ExerciseConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const options = [
    { label: 'Cộng (+)', value: 'addition' },
    { label: 'Trừ (-)', value: 'subtraction' },
    { label: 'Nhân (×)', value: 'multiplication' },
    { label: 'Chia (÷)', value: 'division' },
  ];

  const optionsAdditionRangeType = [
    { label: 'Trong phạm vi ' + config.numTerms + '0', value: 1 },
    { label: 'Trong phạm vi 100', value: 2 },
    { label: 'Tự chọn', value: 3 },
  ];

  const optionsTimeType = [
    { label: 'Có', value: 'true' },
    { label: 'Không', value: 'false' },
  ];

  const optionsInputCalculationType = [
    { label: 'Tính', value: 'true' },
    { label: 'Đặt tính rồi tính', value: 'false' },
  ];

  const renderRangeValue = (numTerms: number) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Phạm vi:
        </label>
        <div className="space-y-2">
          <Radio
            options={optionsAdditionRangeType}
            name="additionRangeType"
            value={config.additionSettings.additionRangeType}
            onChange={(e) =>
              handleConfigChange('additionSettings', {
                ...config.additionSettings,
                additionRangeType: e.target.value as AdditionRangeType,
              })
            }
            className="flex w-full flex-col gap-2"
            size="large"
          />

          {config.additionSettings.additionRangeType === 3 && (
            <label className="flex items-center">
              <InputNumber
                name="additionRangeValue"
                value={config.additionSettings.additionRangeValue}
                onChange={(value) =>
                  handleConfigChange('additionSettings', {
                    ...config.additionSettings,
                    additionRangeValue: value,
                  })
                }
                className="w-[200px]"
                size="large"
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  const renderRangeValueSubtraction = (numTerms: number) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Phạm vi:
        </label>
        <div className="space-y-2">
          <Radio
            name="subtractionRangeType"
            value={config.subtractionSettings.subtractionRangeType}
            options={optionsAdditionRangeType}
            onChange={(value) =>
              handleConfigChange('subtractionSettings', {
                ...config.subtractionSettings,
                subtractionRangeType: parseInt(
                  value.target.value
                ) as AdditionRangeType,
              })
            }
            className="flex w-full flex-col gap-2"
          />
          {config.subtractionSettings.subtractionRangeType === 3 && (
            <InputNumber
              name="subtractionRangeValue"
              value={config.subtractionSettings.subtractionRangeValue}
              onChange={(value) =>
                handleConfigChange('subtractionSettings', {
                  ...config.subtractionSettings,
                  subtractionRangeValue: parseInt(value as string, 10),
                })
              }
              className="w-[200px]"
              size="large"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Cài đặt bài tập</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Chọn phép tính:
          </label>

          <Select
            options={options}
            value={config.operation}
            onChange={(value) =>
              handleConfigChange('operation', value as OperationType)
            }
            className="w-full"
            size="large"
          />
        </div>

        {/* Cài đặt phép cộng đặc biệt */}
        {config.operation === 'addition' && (
          <AddSettings
            config={config}
            renderRangeValue={renderRangeValue}
            handleConfigChange={handleConfigChange}
          />
        )}

        {config.operation === 'subtraction' && (
          <SubSettings
            config={config}
            renderRangeValue={renderRangeValueSubtraction}
            handleConfigChange={handleConfigChange}
          />
        )}

        {config.operation === 'multiplication' && (
          <MultiSettings
            config={config}
            handleConfigChange={handleConfigChange}
          />
        )}

        {/* Số câu hỏi */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Số câu hỏi:
          </label>
          <InputNumber
            min={1}
            max={50}
            value={config.totalQuestions}
            onChange={(value) => handleConfigChange('totalQuestions', value)}
            className="w-[200px]"
            size="large"
          />
        </div>

        {config.exerciseType !== 'multi_multiplication_table' &&
          config.exerciseType !== 'multi_addition_to_multiplication' &&
          config.exerciseType !== 'multi_comparison' &&
          config.exerciseType !== 'multi_find_unknown' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phép tính:
              </label>
              <div className="space-y-2">
                <Radio
                  options={optionsInputCalculationType}
                  name="calculation"
                  value={config.calculationType}
                  onChange={(value) =>
                    handleConfigChange(
                      'calculationType',
                      value.target.value as CalculationType
                    )
                  }
                  className="flex w-full flex-col gap-2"
                  size="large"
                />
              </div>
            </div>
          )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tính thời gian:
          </label>
          <div className="space-y-2">
            <Radio
              options={optionsTimeType}
              name="timeType"
              value={config.timeType}
              onChange={(e) =>
                handleConfigChange('timeType', e.target.value as TimeType)
              }
              className="mr-2"
              size="large"
            />
            {config.timeType === 'true' && (
              <label className="flex items-center">
                <InputNumber
                  min="0"
                  name="timeValue"
                  value={config.timeValue}
                  onChange={(value) => handleConfigChange('timeValue', value)}
                  className="mr-2 w-[200px]"
                  size="large"
                />
                Giây
              </label>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          type="primary"
          size="large"
          htmlType="submit"
          // disabled={loading}
          // loading={loading}
        >
          Bắt đầu
        </Button>
      </form>
    </div>
  );
}
