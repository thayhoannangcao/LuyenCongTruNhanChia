import {
  AdditionRangeType,
  ExerciseConfig,
  AdditionType,
  OperationType,
  SubtractionType,
} from '@/lib/math-generator';
import { useState, useEffect } from 'react';
import Radio from '@/src/components/Radio';
import Select from '@/src/components/Select';

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

  useEffect(() => {
    handleConfigChange('exerciseType', 'default');
  }, []);

  const options = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  const optionsDigits = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  const optionsAdditionType = [
    { label: 'Không nhớ', value: 'without_carry' },
    { label: 'Có nhớ', value: 'with_carry' },
  ];
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Chọn số số hạng:
        </label>
        <Select
          options={options}
          value={numTerms}
          onChange={(value) => {
            const newValue = parseInt(value as string, 10);
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
          className="w-full"
          size="large"
        />
      </div>

      {renderRangeValue(numTerms)}

      {config.subtractionSettings.subtractionRangeType !== 1 &&
        Array.from({ length: numTerms }, (_, index) => (
          <div key={index}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ {index + 1}:
            </label>
            <Select
              options={optionsDigits}
              className="w-full"
              value={config.numsDigits[index]}
              onChange={(value) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, index),
                  parseInt(value as string, 10),
                  ...config.numsDigits.slice(index + 1),
                ]);
              }}
              size="large"
            />
          </div>
        ))}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Loại phép trừ:
        </label>
        <div className="space-y-2">
          <Radio
            options={optionsAdditionType}
            name="subtractionType"
            value={config.subtractionSettings.subtractionType}
            onChange={(value) =>
              handleConfigChange('subtractionSettings', {
                ...config.subtractionSettings,
                subtractionType: value.target.value as SubtractionType,
              })
            }
            className="flex w-full flex-col gap-2"
          />
        </div>
      </div>
    </div>
  );
}
