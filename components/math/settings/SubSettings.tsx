import {
  AdditionRangeType,
  ExerciseConfig,
  AdditionType,
  OperationType,
  SubtractionType,
} from '@/lib/math-generator';
import { useState } from 'react';

interface SubSettingsProps {
  config: ExerciseConfig;
  renderRangeValue: (numTerms: number) => React.ReactNode;
  handleConfigChange: (key: keyof ExerciseConfig, value: any) => void;
}

export default function SubSettings({
  config,
  renderRangeValue,
  handleConfigChange,
}: SubSettingsProps) {
  const [numTerms, setNumTerms] = useState(2);
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Chọn số số hạng:
        </label>
        <select
          value={numTerms}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10);
            setNumTerms(newValue);

            let newNumsDigits = [...config.numsDigits];

            if (newValue > newNumsDigits.length) {
              newNumsDigits = [
                ...newNumsDigits,
                ...Array(newValue - newNumsDigits.length).fill(1),
              ];
            } else {
              newNumsDigits = newNumsDigits.slice(0, newValue);
            }

            handleConfigChange('numTerms', newValue);
            handleConfigChange('numsDigits', newNumsDigits);
          }}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          {/* <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option> */}
        </select>
      </div>

      {renderRangeValue(numTerms)}

      {config.additionSettings.additionRangeType !== 1 &&
        Array.from({ length: numTerms }, (_, index) => (
          <div key={index}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ {index + 1}:
            </label>
            <input
              type="number"
              min="1"
              max={config.additionSettings.additionRangeType === 2 ? 2 : 9}
              value={config.numsDigits[index]}
              onChange={(e) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, index),
                  parseInt(e.target.value),
                  ...config.numsDigits.slice(index + 1),
                ]);
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        ))}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            Loại phép trừ:
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="subtractionType"
              value="without_carry"
              checked={config.subtractionSettings.subtractionType === 'without_carry'}
              onChange={(e) =>
                handleConfigChange('subtractionSettings', {
                  ...config.subtractionSettings,
                  subtractionType: e.target.value as SubtractionType,
                })
              }
              className="mr-2"
            />
            Không nhớ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="subtractionType"
              value="with_carry"
              checked={config.subtractionSettings.subtractionType === 'with_carry'}
              onChange={(e) =>
                handleConfigChange('subtractionSettings', {
                  ...config.subtractionSettings,
                  subtractionType: e.target.value as SubtractionType,
                })
              }
              className="mr-2"
            />
            Có nhớ
          </label>
        </div>
      </div>
    </div>
  );
}
