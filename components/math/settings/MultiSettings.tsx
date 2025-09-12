import {
  AdditionRangeType,
  ExerciseConfig,
  AdditionType,
  OperationType,
  SubtractionType,
  ExerciseType,
} from '@/lib/math-generator';
import { useEffect } from 'react';

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
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Dạng bài:
        </label>
        <select
          value={config.exerciseType}
          onChange={(e) => {
            handleConfigChange('exerciseType', e.target.value as ExerciseType);

            if (e.target.value !== 'multi_other') {
              handleConfigChange('calculationType', 'true');
            }
          }}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="multi_multiplication_table">Bảng cửu chương</option>
          <option value="multi_addition_to_multiplication">
            Chuyển phép cộng qua phép nhân
          </option>
          <option value="multi_comparison">So sánh</option>
          <option value="multi_find_unknown">Tìm số chưa biết</option>
          <option value="multi_other">Khác</option>
        </select>
      </div>

      {config.exerciseType === 'multi_multiplication_table' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bảng cửu chương:
          </label>
          <select
            value={config.multiplicationSettings.multiplicationTable}
            onChange={(e) =>
              handleConfigChange('multiplicationSettings', {
                ...config.multiplicationSettings,
                multiplicationTable: parseInt(e.target.value),
              })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      )}

      {config.exerciseType === 'multi_addition_to_multiplication' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Chọn số để chuyển phép cộng qua phép nhân:
          </label>
          <select
            value={config.multiplicationSettings.additionToMultiplicationTable}
            onChange={(e) =>
              handleConfigChange('multiplicationSettings', {
                ...config.multiplicationSettings,
                additionToMultiplicationTable: parseInt(e.target.value),
              })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
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
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={config.numsDigits[0]}
              onChange={(e) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, 0),
                  parseInt(e.target.value),
                  ...config.numsDigits.slice(1),
                ]);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ 2:
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={config.numsDigits[1]}
              onChange={(e) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, 1),
                  parseInt(e.target.value),
                  ...config.numsDigits.slice(2),
                ]);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
