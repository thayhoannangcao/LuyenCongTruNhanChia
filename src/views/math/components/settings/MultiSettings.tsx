import {
  AdditionRangeType,
  ExerciseConfig,
  AdditionType,
  OperationType,
  SubtractionType,
  ExerciseType,
} from '@/lib/math-generator';
import { useEffect } from 'react';
import Radio from '@/src/components/Radio';
import Select from '@/src/components/Select';

interface MultiSettingsProps {
  config: ExerciseConfig;
  handleConfigChange: (key: keyof ExerciseConfig, value: any) => void;
}

export default function MultiSettings({
  config,
  handleConfigChange,
}: MultiSettingsProps) {
  useEffect(() => {
    handleConfigChange('calculationType', 'true');
    handleConfigChange('exerciseType', 'multi_multiplication_table');
  }, []);

  const options = [
    { label: 'Bảng cửu chương', value: 'multi_multiplication_table' },
    {
      label: 'Chuyển phép cộng qua phép nhân',
      value: 'multi_addition_to_multiplication',
    },
    { label: 'So sánh', value: 'multi_comparison' },
    { label: 'Tìm số chưa biết', value: 'multi_find_unknown' },
    { label: 'Khác', value: 'multi_other' },
  ];

  const optionsMultiplicationTable = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
  ];

  const optionsNumsDigits = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Dạng bài:
        </label>
        <Select
          options={options}
          value={config.exerciseType}
          onChange={(value) => {
            handleConfigChange('exerciseType', value as ExerciseType);

            if (value !== 'multi_other') {
              handleConfigChange('calculationType', 'true');
            }
          }}
          className="w-full"
          size="large"
        />
      </div>

      {config.exerciseType === 'multi_multiplication_table' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bảng cửu chương:
          </label>
          <Select
            options={optionsMultiplicationTable}
            value={config.multiplicationSettings.multiplicationTable}
            onChange={(value) =>
              handleConfigChange('multiplicationSettings', {
                ...config.multiplicationSettings,
                multiplicationTable: parseInt(value as string, 10),
              })
            }
            className="w-full"
            size="large"
          />
        </div>
      )}

      {config.exerciseType === 'multi_addition_to_multiplication' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Chọn số để chuyển phép cộng qua phép nhân:
          </label>
          <Select
            options={optionsMultiplicationTable}
            value={config.multiplicationSettings.additionToMultiplicationTable}
            onChange={(value) =>
              handleConfigChange('multiplicationSettings', {
                ...config.multiplicationSettings,
                additionToMultiplicationTable: parseInt(value as string, 10),
              })
            }
            className="w-full"
            size="large"
          />
        </div>
      )}
      {(config.exerciseType === 'multi_comparison' ||
        config.exerciseType === 'multi_find_unknown' ||
        config.exerciseType === 'multi_other') && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ 1:
            </label>
            <Select
              options={optionsNumsDigits}
              value={config.numsDigits[0]}
              onChange={(value) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, 0),
                  parseInt(value as string, 10),
                  ...config.numsDigits.slice(1),
                ]);
              }}
              className="w-full"
              size="large"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ 2:
            </label>
            <Select
              options={optionsNumsDigits}
              value={config.numsDigits[1]}
              onChange={(value) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, 1),
                  parseInt(value as string, 10),
                  ...config.numsDigits.slice(2),
                ]);
              }}
              className="w-full"
              size="large"
            />
          </div>
        </div>
      )}
    </div>
  );
}
