'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  generateExerciseList,
  type ExerciseConfig,
  type ExerciseResult,
} from '@/lib/math-generator';
import ScoreBoard from './ScoreBoard';
import SimpleExercise from './SimpleExercise';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';

interface ExerciseSessionProps {
  config: ExerciseConfig;
  onComplete: () => void;
}

export default function ExerciseSession({
  config,
  onComplete,
}: ExerciseSessionProps) {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<ExerciseResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const createSession = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('practice_sessions')
        .insert({
          user_id: user.id,
          operation_type: config.operation,
          difficulty_level: getDifficultyLevel(),
          addition_range: config.additionSettings.additionRangeType,
          addition_type: config.additionSettings.additionType,
          total_questions: config.totalQuestions,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
      } else {
        setSessionId(data.id);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }, [
    user,
    config.operation,
    config.additionSettings.additionRangeType,
    config.additionSettings.additionType,
    config.totalQuestions,
  ]);

  useEffect(() => {
    // Tạo danh sách bài tập
    const exerciseList = generateExerciseList(config);
    setExercises(exerciseList);
    setStartTime(new Date());

    // Tạo session trong database nếu user đã đăng nhập
    if (user) {
      createSession();
    }
  }, [config, user, createSession]);

  const getDifficultyLevel = (): 'easy' | 'medium' | 'hard' => {
    if (config.additionSettings.additionRangeType === 1) return 'easy';
    if (config.additionSettings.additionRangeType === 2) return 'medium';
    if (config.additionSettings.additionRangeType === 3) return 'hard';

    const totalDigits = config.numsDigits.reduce(
      (acc, digit) => acc + digit,
      0
    );
    if (totalDigits <= 3) return 'easy';
    if (totalDigits <= 5) return 'medium';
    return 'hard';
  };

  const handleAnswer = async (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }

    // Lưu kết quả vào database nếu có session
    if (sessionId && user) {
      const currentExercise = exercises[currentIndex];
      const timeTaken = startTime
        ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
        : 0;

      try {
        await supabase.from('practice_results').insert({
          session_id: sessionId,
          question: currentExercise.nums.join(' + '),
          user_answer: currentExercise.userAnswer || '',
          correct_answer: currentExercise.correctAnswer,
          is_correct: isCorrect,
          time_taken: timeTaken,
        });
      } catch (error) {
        console.error('Error saving result:', error);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStartTime(new Date()); // Reset thời gian cho câu tiếp theo
    } else {
      // Hoàn thành bài tập
      completeSession();
    }
  };

  const completeSession = async () => {
    // Cập nhật session trong database
    if (sessionId && user) {
      try {
        await supabase
          .from('practice_sessions')
          .update({
            correct_answers: correctAnswers,
            incorrect_answers: incorrectAnswers,
            completed_at: new Date().toISOString(),
          })
          .eq('id', sessionId);
      } catch (error) {
        console.error('Error updating session:', error);
      }
    }

    // Hiển thị kết quả cuối
    const totalQuestions = exercises.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    alert(
      `Kết thúc bài kiểm tra!\nBạn được: ${correctAnswers}/${totalQuestions} điểm (${score}%)`
    );

    onComplete();
  };

  if (exercises.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600"></div>
          <p>Đang tạo bài tập...</p>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <div className="flex h-[calc(100vh-130px)] gap-4 px-[200px] py-4">
      <ScoreBoard
        currentQuestion={currentIndex + 1}
        totalQuestions={exercises.length}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />

      <SimpleExercise
        exercise={currentExercise}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
