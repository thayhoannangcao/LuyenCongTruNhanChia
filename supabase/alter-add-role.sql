-- Thêm cột role vào bảng users
ALTER TABLE users
ADD COLUMN IF NOT EXISTS role TEXT CHECK (role IN ('admin','user')) DEFAULT 'user';

-- Đặt admin cho tài khoản username = 'admin'
UPDATE users SET role = 'admin' WHERE username = 'admin';

-- Mở rộng policy nếu cần (chỉ đọc dữ liệu của mình vẫn giữ nguyên)

