'use client';

interface ScoreBoardProps {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export default function ScoreBoard({
  currentQuestion,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
}: ScoreBoardProps) {
  return (
    <div className="flex w-[200px] flex-col items-center justify-center gap-4">
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">Bảng điểm</h2>
        <div className="flex flex-col gap-4 text-center">
          <div className="flex items-center gap-2">
            <p className="text-base text-gray-600">Số câu:</p>
            <p className="text-lg font-semibold">
              {currentQuestion}/{totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <p className="text-base">Số câu đúng:</p>
            <p className="text-lg font-semibold">{correctAnswers}</p>
          </div>
          <div className="flex items-center gap-2 text-red-600">
            <p className="text-base"> Số câu sai:</p>
            <p className="text-lg font-semibold">{incorrectAnswers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
