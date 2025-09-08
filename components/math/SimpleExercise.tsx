'use client';

import { useState, useEffect } from 'react';
import type { ExerciseResult } from '@/lib/math-generator';

interface SimpleExerciseProps {
  exercise: ExerciseResult;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export default function SimpleExercise({
  exercise,
  onAnswer,
  onNext,
}: SimpleExerciseProps) {
  console.log(exercise);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setUserAnswer('');
    setShowResult(false);
  }, [exercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAnswer.trim()) {
      alert('Vui lòng nhập đáp án');
      return;
    }

    const correct = userAnswer.trim() === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);

    // Tự động chuyển câu tiếp theo sau 2 giây
    setTimeout(() => {
      onNext();
    }, 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      {/* <h2 className="text-6xl font-bold text-center mb-6">Phép tính</h2> */}

      <div className="mb-8 text-center">
        <div className="mb-4 text-4xl font-bold">
          {exercise.nums.join(' + ')} = ?
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập đáp án"
            className="w-full rounded-md border border-gray-300 py-3 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
            disabled={showResult}
          />

          {!showResult && (
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Kiểm tra
            </button>
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
    </div>
  );
}
