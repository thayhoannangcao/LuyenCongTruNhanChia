export interface PracticeSession {
  id: string;
  user_id: string;
  operation_type: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  addition_range?: number;
  addition_type?: string;
  total_questions: number;
  correct_answers?: number;
  incorrect_answers?: number;
  created_at: string;
  completed_at?: string;
}

export interface PracticeResult {
  id: string;
  session_id: string;
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_taken: number;
  created_at: string;
}

export interface CreateSessionRequest {
  userId: string;
  operationType: string;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  additionRange?: number;
  additionType?: string;
  totalQuestions: number;
}

export interface UpdateSessionRequest {
  sessionId: string;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface SaveResultRequest {
  sessionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken: number;
}
