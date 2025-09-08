'use client';

import { useState, useEffect, useRef } from 'react';
import type { ExerciseResult, ExerciseConfig } from '@/lib/math-generator';
import Horizontal from './exercise/Horizontal';
import Vertical from './exercise/Vertical';

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
  const [timer, setTimer] = useState(
    config.timeType === 'true' ? config.timeValue : 3000
  );
  const timerIdRef = useRef<number | null>(null);

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

      {config.calculationType === 'true' && (
        <Horizontal
          exercise={exercise}
          onNext={onNext}
          config={config}
          onAnswer={onAnswer}
          timer={timer ?? 0}
          setTimer={setTimer}
          timerIdRef={timerIdRef}
        />
      )}

      {config.calculationType === 'false' && (
        <Vertical
          exercise={exercise}
          onNext={onNext}
          config={config}
          onAnswer={onAnswer}
          timer={timer ?? 0}
          setTimer={setTimer}
          timerIdRef={timerIdRef}
        />
      )}
    </div>
  );
}
