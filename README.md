# 🧮 Ứng Dụng Luyện Tập Toán Học - NextJS

## 📋 Tổng Quan
Đây là ứng dụng web NextJS được thiết kế để giúp học sinh luyện tập các phép tính cơ bản: **Cộng (+), Trừ (-), Nhân (×), Chia (÷)**. Ứng dụng sử dụng Supabase làm backend và có thể deploy lên Vercel.

## ✨ Tính Năng Chính

### 🔐 Hệ Thống Xác Thực
- **Đăng ký tài khoản** với tài khoản, họ tên, mật khẩu
- **Đăng nhập** an toàn với Supabase Auth
- **Lưu trữ tiến độ** và lịch sử bài tập

### 🎯 Các Phép Tính Được Hỗ Trợ
- **Phép Cộng (+)** - Với phạm vi 10, 20, 100 (có nhớ/không nhớ)
- **Phép Trừ (-)** - Tính hiệu hai số  
- **Phép Nhân (×)** - Tính tích hai số
- **Phép Chia (÷)** - Tính thương hai số

### ⚙️ Tùy Chỉnh Độ Khó
- **Số chữ số**: 1-9 chữ số cho mỗi số
- **Số lượng bài tập**: 1-50 câu hỏi
- **Phạm vi phép cộng**: 10, 20, 100
- **Loại phép cộng**: Có nhớ hoặc không nhớ

### 📊 Hệ Thống Điểm Số & Lưu Trữ
- Hiển thị tiến độ real-time
- Lưu trữ kết quả vào Supabase
- Theo dõi lịch sử bài tập
- Thống kê hiệu suất học tập

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **NextJS 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Row Level Security** - Bảo mật dữ liệu

### Deployment
- **Vercel** - Hosting platform
- **Serverless Functions** - API endpoints

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js 18+ 
- npm hoặc yarn
- Tài khoản Supabase

### 1. Clone Repository
```bash
git clone <repository-url>
cd math-practice-app
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Cấu Hình Environment Variables
Tạo file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Thiết Lập Database
Chạy SQL script trong file `supabase/schema.sql` trên Supabase Dashboard để tạo các bảng cần thiết.

### 5. Chạy Development Server
```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu Trúc Project

```
├── app/                    # NextJS App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── math/             # Math exercise components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── math-generator.ts # Math exercise generator
│   └── supabase.ts       # Supabase client
├── supabase/             # Database schema
│   └── schema.sql        # SQL schema
└── public/               # Static assets
```

## 🗄️ Database Schema

### Bảng `users`
- `id` - UUID (Primary Key, Foreign Key to auth.users)
- `username` - VARCHAR(50) UNIQUE
- `full_name` - VARCHAR(100)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Bảng `practice_sessions`
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key)
- `operation_type` - VARCHAR(20)
- `difficulty_level` - VARCHAR(10)
- `addition_range` - INTEGER
- `addition_type` - VARCHAR(20)
- `total_questions` - INTEGER
- `correct_answers` - INTEGER
- `incorrect_answers` - INTEGER
- `completed_at` - TIMESTAMP
- `created_at` - TIMESTAMP

### Bảng `practice_results`
- `id` - UUID (Primary Key)
- `session_id` - UUID (Foreign Key)
- `question` - TEXT
- `user_answer` - TEXT
- `correct_answer` - TEXT
- `is_correct` - BOOLEAN
- `time_taken` - INTEGER
- `created_at` - TIMESTAMP

## 🚀 Deploy lên Vercel

### 1. Chuẩn Bị
- Tài khoản Vercel
- Repository trên GitHub/GitLab
- Supabase project đã setup

### 2. Deploy
1. Kết nối repository với Vercel
2. Thêm environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy tự động

### 3. Cấu Hình Domain (Optional)
- Thêm custom domain trong Vercel dashboard
- Cấu hình DNS records

## 🔧 API Endpoints

Ứng dụng sử dụng Supabase client-side, không cần custom API endpoints. Tất cả operations được thực hiện trực tiếp từ client với Row Level Security.

## 🛡️ Bảo Mật

- **Row Level Security (RLS)** - Người dùng chỉ truy cập được dữ liệu của mình
- **Supabase Auth** - Xác thực an toàn
- **Environment Variables** - Bảo vệ API keys
- **TypeScript** - Type safety

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind CSS** responsive utilities
- **Touch-friendly** interface
- **Cross-browser** compatibility

## 🎨 UI/UX Features

- **Clean, modern design**
- **Intuitive navigation**
- **Real-time feedback**
- **Progress tracking**
- **Accessibility** considerations

## 🔮 Tính Năng Tương Lai

- [ ] Lịch sử bài tập chi tiết
- [ ] Thống kê học tập
- [ ] Chế độ thi đấu
- [ ] Tích hợp phụ huynh
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations

## 👨‍💻 Thông Tin Tác Giả
**Tác giả**: Trần Hồng Quân  
**Mục đích**: Hỗ trợ học sinh luyện tập toán học  
**Công nghệ**: NextJS, TypeScript, Supabase, Tailwind CSS

## 📝 License
MIT License - Xem file LICENSE để biết thêm chi tiết.

---
*Chúc bạn học tập hiệu quả! 🎓*