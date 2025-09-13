import {
  AdditionRangeType,
  ExerciseConfig,
  AdditionType,
  OperationType,
} from '@/lib/math-generator';
import { useState, useEffect } from 'react';
import Select from '@/src/components/Select';
import Radio from '@/src/components/Radio';

interface AddSettingsProps {
  config: ExerciseConfig;
  renderRangeValue: (numTerms: number) => React.ReactNode;
  handleConfigChange: (key: keyof ExerciseConfig, value: any) => void;
}

export default function AddSettings({
  config,
  renderRangeValue,
  handleConfigChange,
}: AddSettingsProps) {
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

      {config.additionSettings.additionRangeType !== 1 &&
        Array.from({ length: numTerms }, (_, index) => (
          <div key={index}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số chữ số của số thứ {index + 1}:
            </label>
            <Select
              options={optionsDigits}
              value={config.numsDigits[index]}
              onChange={(value) => {
                handleConfigChange('numsDigits', [
                  ...config.numsDigits.slice(0, index),
                  value as number,
                  ...config.numsDigits.slice(index + 1),
                ]);
              }}
              className="w-full"
              size="large"
            />
          </div>
        ))}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Loại phép cộng:
        </label>
        <div className="space-y-2">
          <Radio
            options={optionsAdditionType}
            name="additionType"
            value={config.additionSettings.additionType}
            onChange={(e) =>
              handleConfigChange('additionSettings', {
                ...config.additionSettings,
                additionType: e.target.value as AdditionType,
              })
            }
            className="flex w-full flex-col gap-2"
          />
        </div>
      </div>
    </div>
  );
}
