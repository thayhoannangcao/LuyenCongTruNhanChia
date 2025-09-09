import { useRef, useEffect, useState } from 'react';
import '../../../app/exercise.css';
import Addition from './vertical/Addition';
import Subtraction from './vertical/Subtraction';
import Multiplication from './vertical/Multiplication';
import Division from './vertical/Division';
import { ExerciseConfig, ExerciseResult } from '@/lib/math-generator';

interface VerticalProps {
  exercise: ExerciseResult;
  onNext: () => void;
  config: ExerciseConfig;
  onAnswer: (isCorrect: boolean) => void;
  timer: number;
  setTimer: (timer: number) => void;
  timerIdRef: React.MutableRefObject<number | null>;
}

export default function Vertical({
  exercise,
  onNext,
  config,
  onAnswer,
  timer,
  setTimer,
  timerIdRef,
}: VerticalProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isNextExercise, setIsNextExercise] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

    const inputValue = (
      document.querySelector('.inp_on_table_normal') as HTMLInputElement
    ).value;

    if (isNextExercise) {
      setIsNextExercise(false);
      onNext();
      return;
    }

    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }

    if (!inputValue?.trim() && timer != 0) {
      alert('Vui lòng nhập đáp án');
      return;
    }

    if (timer == 0) {
      onNext();
      return;
    }

    const correct = inputValue?.trim() === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);

    setIsNextExercise(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-[32px]">
        {config.operation === 'addition' && (
          <Addition num1={exercise.nums[0]} num2={exercise.nums[1]} />
        )}
        {config.operation === 'subtraction' && (
          <Subtraction num1={exercise.nums[0]} num2={exercise.nums[1]} />
        )}
        {config.operation === 'multiplication' && (
          <Multiplication num1={exercise.nums[0]} num2={exercise.nums[1]} />
        )}
        {config.operation === 'division' && (
          <Division num1={exercise.nums[0]} num2={exercise.nums[1]} />
        )}

        {(timer == 0 || isNextExercise) && (
          <button
            type="button"
            onClick={onNext}
            className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Câu tiếp theo
          </button>
        )}

        {timer != 0 && !isNextExercise && (
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Kiểm tra
          </button>
        )}
      </form>

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
