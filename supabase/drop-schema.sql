-- File drop schema để xóa toàn bộ database và tạo lại
-- Chạy file này trước khi chạy schema.sql

-- Xóa tất cả policies trước
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Allow user registration" ON users;

DROP POLICY IF EXISTS "Users can view own sessions" ON practice_sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON practice_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON practice_sessions;

DROP POLICY IF EXISTS "Users can view own results" ON practice_results;
DROP POLICY IF EXISTS "Users can insert own results" ON practice_results;
DROP POLICY IF EXISTS "Users can update own results" ON practice_results;

-- Xóa tất cả triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Xóa tất cả functions
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Xóa tất cả indexes
DROP INDEX IF EXISTS idx_practice_sessions_user_id;
DROP INDEX IF EXISTS idx_practice_sessions_created_at;
DROP INDEX IF EXISTS idx_practice_results_session_id;

-- Xóa tất cả tables (theo thứ tự dependency)
DROP TABLE IF EXISTS practice_results CASCADE;
DROP TABLE IF EXISTS practice_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Xóa tất cả extensions nếu cần
-- DROP EXTENSION IF EXISTS "uuid-ossp";
