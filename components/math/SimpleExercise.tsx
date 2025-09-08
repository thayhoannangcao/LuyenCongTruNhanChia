'use client';

import { useState, useEffect, useRef } from 'react';
import type { ExerciseResult, ExerciseConfig } from '@/lib/math-generator';

interface SimpleExerciseProps {
  exercise: ExerciseResult;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  config: ExerciseConfig;
}

export default function SimpleExercise({
  exercise,
  onAnswer,
  onNext,
  config,
}: SimpleExerciseProps) {
  console.log(exercise);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(
    config.timeType === 'true' ? config.timeValue : 3000
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    setUserAnswer('');
    setShowResult(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [exercise]);

  useEffect(() => {
    if (!showResult && timer != 0) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [exercise, showResult, timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }

    if (!userAnswer.trim() && timer != 0) {
      alert('Vui lòng nhập đáp án');
      return;
    }

    if (timer == 0) {
      onNext();
      return;
    }

    const correct = userAnswer.trim() === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  useEffect(() => {
    const initial = config.timeType === 'true' ? config.timeValue : 3000;
    setTimer(initial);

    if (config.timeType !== 'true') return;

    const id = window.setInterval(() => {
      setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);
    timerIdRef.current = id;

    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [exercise, config.timeType, config.timeValue]);

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      {config.timeType === 'true' && (
        <div className="text-right text-xl">
          {timer != 0 && (
            <div className="text-blue-300">Còn lại: {timer} giây</div>
          )}
          {timer == 0 && (
            <div className="text-red-500">Còn lại: {timer} giây</div>
          )}
        </div>
      )}

      <div className="mb-8 text-center">
        <div className="mb-4 text-4xl font-bold">
          {exercise.nums.join(' + ')} = ?
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
            disabled={showResult}
          />

          {timer == 0 && (
            <button
              type="button"
              onClick={onNext}
              className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Câu tiếp theo
            </button>
          )}

          {timer != 0 && (
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
