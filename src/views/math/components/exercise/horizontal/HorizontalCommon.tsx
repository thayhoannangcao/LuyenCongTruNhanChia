import { ExerciseResult, ExerciseConfig } from '@/lib/math-generator';
import { useState, useEffect, useRef } from 'react';
import Button from '@/src/components/Button/Button';

interface HorizontalProps {
  exercise: ExerciseResult;
  onNext: () => void;
  config: ExerciseConfig;
  onAnswer: (isCorrect: boolean) => void;
  timer: number;
  setTimer: (timer: number) => void;
  timerIdRef: React.MutableRefObject<number | null>;
}

export default function Horizontal({
  exercise,
  onNext,
  config,
  onAnswer,
  timer,
  setTimer,
  timerIdRef,
}: HorizontalProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mb-4 text-4xl font-bold">
          {exercise.nums.join(` ${operationText} `)} = ?
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            ref={inputRef}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Nhập đáp án"
            className="w-full rounded-md border border-gray-300 py-3 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
            readOnly={showResult || timer == 0}
          />

          {(timer == 0 || isNextExercise) && (
            <Button
              title="Câu tiếp theo"
              variant="main"
              size="lg"
              type="button"
              onClick={onNext}
              className="mt-4 w-full"
            />
          )}

          {timer != 0 && !isNextExercise && (
            <Button
              title="Kiểm tra"
              variant="main"
              size="lg"
              type="submit"
              className="mt-4 w-full"
            />
          )}
        </form>
      </div>

      {showResult && (
        <div
          className={`rounded-md p-4 text-center ${
            isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="mb-2 text-lg font-semibold">
            {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! 😔'}
          </div>
          <div className="text-sm">Đáp án đúng: {exercise.correctAnswer}</div>
        </div>
      )}

      {timer == 0 && (
        <div
          className={`rounded-md p-4 text-center ${'bg-red-100 text-red-800'}`}
        >
          <div className="mb-2 text-lg font-semibold">Hết thời gian!</div>
          <div className="text-sm">Đáp án đúng: {exercise.correctAnswer}</div>
        </div>
      )}
    </div>
  );
}
