-- Tạo bảng users để lưu thông tin người dùng
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng practice_sessions để lưu phiên luyện tập
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  operation_type VARCHAR(20) NOT NULL CHECK (operation_type IN ('addition', 'subtraction', 'multiplication', 'division')),
  difficulty_level VARCHAR(10) NOT NULL CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  addition_range INTEGER CHECK (addition_range IN (10, 20, 100)),
  addition_type VARCHAR(20) CHECK (addition_type IN ('with_carry', 'without_carry')),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  incorrect_answers INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng practice_results để lưu kết quả từng câu hỏi
CREATE TABLE IF NOT EXISTS practice_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  user_answer TEXT,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN,
  time_taken INTEGER, -- thời gian làm bài tính bằng giây
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes để tối ưu hiệu suất
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at ON practice_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_practice_results_session_id ON practice_results(session_id);

-- Tạo function để tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo trigger để tự động cập nhật updated_at
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Tạo RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_results ENABLE ROW LEVEL SECURITY;

-- Policy cho bảng users: người dùng chỉ có thể xem và sửa thông tin của chính mình
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policy cho phép tạo user mới khi đăng ký
CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy cho bảng practice_sessions: người dùng chỉ có thể xem và tạo session của chính mình
CREATE POLICY "Users can view own sessions" ON practice_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON practice_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON practice_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy cho bảng practice_results: người dùng chỉ có thể xem và tạo results của session của mình
CREATE POLICY "Users can view own results" ON practice_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM practice_sessions 
      WHERE practice_sessions.id = practice_results.session_id 
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own results" ON practice_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM practice_sessions 
      WHERE practice_sessions.id = practice_results.session_id 
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own results" ON practice_results
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM practice_sessions 
      WHERE practice_sessions.id = practice_results.session_id 
      AND practice_sessions.user_id = auth.uid()
    )
  );
