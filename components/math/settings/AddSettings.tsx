import { AdditionRangeType, ExerciseConfig, AdditionType, OperationType } from "@/lib/math-generator";
import { useState } from "react";


interface AddSettingsProps {
  config: ExerciseConfig
  renderRangeValue: (numTerms: number) => React.ReactNode
  handleConfigChange: (key: keyof ExerciseConfig, value: any) => void
}

export default function AddSettings({ config, renderRangeValue, handleConfigChange }: AddSettingsProps) {

  const [numTerms, setNumTerms] = useState(2)
  return (
    <div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn số số hạng:
          </label>
          <select
            value={numTerms}
            onChange={(e) => setNumTerms(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
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

      {renderRangeValue(numTerms)}

      {Array.from({ length: numTerms }, (_, index) => (
        <div key={index}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Số chữ số của số thứ {index + 1}:
        </label>
        <input
          type="number"
          min="1"
          max="9"
          value={1}
          onChange={(e) => handleConfigChange('numsDigits', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      ))}
      
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
              checked={config.additionSettings.additionType === 'without_carry'}
              onChange={(e) => handleConfigChange('additionSettings', { ...config.additionSettings, additionType: e.target.value as AdditionType })}
              className="mr-2"
            />
            Không nhớ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="additionType"
              value="with_carry"
              checked={config.additionSettings.additionType === 'with_carry'}
              onChange={(e) => handleConfigChange('additionSettings', { ...config.additionSettings, additionType: e.target.value as AdditionType })}
              className="mr-2"
            />
            Có nhớ
          </label>
        </div>
      </div>
    </div>
  )
}