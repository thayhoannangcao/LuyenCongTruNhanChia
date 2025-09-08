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
    <div className="flex flex-col gap-4 items-center justify-center w-[200px]">
<div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Bảng điểm</h2>
      <div className="flex flex-col gap-4 text-center">
        <div className="flex gap-2 items-center">
          <p className="text-base text-gray-600">Số câu:</p>
          <p className="text-lg font-semibold">
            {currentQuestion}/{totalQuestions}
          </p>
        </div>
        <div className="flex gap-2 items-center text-green-600">
          <p className="text-base">Số câu đúng:</p>
          <p className="text-lg font-semibold ">
            {correctAnswers}
          </p>
        </div>
        <div className="flex gap-2 items-center text-red-600">
          <p className="text-base"> Số câu sai:</p>
          <p className="text-lg font-semibold ">
            {incorrectAnswers}
          </p>
        </div>
      </div>
    </div>
    </div>
    
  )
}
