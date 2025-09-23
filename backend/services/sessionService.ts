import { supabase } from '../../lib/supabase';
import type { ExerciseConfig } from '../../lib/math-generator';

export class SessionService {
  async createSession(data: { userId: string; config: ExerciseConfig }) {
    try {
      const difficultyLevel = this.getDifficultyLevel(data.config);

      const { data: session, error } = await supabase
        .from('practice_sessions')
        .insert({
          user_id: data.userId,
          operation_type: data.config.operation,
          difficulty_level: difficultyLevel,
          addition_range: data.config.additionSettings.additionRangeType,
          addition_type: data.config.additionSettings.additionType,
          total_questions: data.config.totalQuestions,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, sessionId: session.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tạo session',
      };
    }
  }

  async updateSession(data: {
    sessionId: string;
    correctAnswers: number;
    incorrectAnswers: number;
  }) {
    try {
      const { error } = await supabase
        .from('practice_sessions')
        .update({
          correct_answers: data.correctAnswers,
          incorrect_answers: data.incorrectAnswers,
          completed_at: new Date().toISOString(),
        })
        .eq('id', data.sessionId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Không thể cập nhật session',
      };
    }
  }

  async saveResult(data: {
    sessionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timeTaken: number;
  }) {
    try {
      const { error } = await supabase.from('practice_results').insert({
        session_id: data.sessionId,
        question: data.question,
        user_answer: data.userAnswer,
        correct_answer: data.correctAnswer,
        is_correct: data.isCorrect,
        time_taken: data.timeTaken,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lưu kết quả',
      };
    }
  }

  private getDifficultyLevel(
    config: ExerciseConfig
  ): 'easy' | 'medium' | 'hard' {
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
  }
}
