import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  username: string;
  full_name: string;
  role?: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  operation_type: 'addition' | 'subtraction' | 'multiplication' | 'division';
  difficulty_level: 'easy' | 'medium' | 'hard';
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  completed_at: string;
  created_at: string;
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
