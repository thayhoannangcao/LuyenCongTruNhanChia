import { useEffect, useRef, useState } from 'react';
import { calculationOperatorMultiply } from '@/lib/exercise';
import { ExerciseConfig, ExerciseResult } from '@/lib/math-generator';
import Button from '@/src/components/Button';

export default function Multiplication({
  exercise,
  onNext,
  timer,
  config,
  timerIdRef,
  onAnswer,
}: {
  exercise: ExerciseResult;
  onNext: () => void;
  timer: number;
  config: ExerciseConfig;
  timerIdRef: React.MutableRefObject<number | null>;
  onAnswer: (isCorrect: boolean) => void;
}) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNextExercise) {
      setIsNextExercise(false);
      onNext();
      return;
    }

    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }

    if (timer == 0) {
      onNext();
      return;
    }

    const correct = userAnswer.trim() === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);

    setIsNextExercise(true);
  };

  return (
    <div>
      {config.exerciseType === 'multi_addition_to_multiplication' && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold">
                <div>
                  {Array.from({ length: exercise.nums[1] })
                    .map(() => exercise.nums[0])
                    .join(' + ')}
                </div>
                <div className="text-4xl font-bold">=</div>
                <div className="text-4xl font-bold">{exercise.nums[0]}</div>
                <div className="text-4xl font-bold">x</div>
                <div className="text-4xl font-bold">
                  <input
                    type="text"
                    value={userAnswer}
                    ref={inputRef}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-[70px] rounded-md border border-gray-300 py-3 text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                    readOnly={showResult || timer == 0}
                  />
                </div>
              </div>

              {(timer == 0 || isNextExercise) && (
                <Button
                  type="primary"
                  size="large"
                  htmlType="button"
                  onClick={onNext}
                  className="mt-4 w-full"
                >
                  Câu tiếp theo
                </Button>
              )}

              {timer != 0 && !isNextExercise && (
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="mt-4 w-full"
                >
                  Kiểm tra
                </Button>
              )}
            </div>
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
              <div className="text-sm">
                Đáp án đúng: {exercise.correctAnswer}
              </div>
            </div>
          )}

          {timer == 0 && (
            <div
              className={`rounded-md p-4 text-center ${'bg-red-100 text-red-800'}`}
            >
              <div className="mb-2 text-lg font-semibold">Hết thời gian!</div>
              <div className="text-sm">
                Đáp án đúng: {exercise.correctAnswer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
