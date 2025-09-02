'use client'

interface ScoreBoardProps {
  currentQuestion: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
}

export default function ScoreBoard({ 
  currentQuestion, 
  totalQuestions, 
  correctAnswers, 
  incorrectAnswers 
}: ScoreBoardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-center mb-4">Bảng điểm</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Số câu</p>
          <p className="text-lg font-semibold">
            {currentQuestion}/{totalQuestions}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Đúng</p>
          <p className="text-lg font-semibold text-green-600">
            {correctAnswers}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sai</p>
          <p className="text-lg font-semibold text-red-600">
            {incorrectAnswers}
          </p>
        </div>
      </div>
    </div>
  )
}
