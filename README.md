# 🧮 Ứng Dụng Luyện Tập Toán Học - NextJS

## 📋 Tổng Quan
Đây là ứng dụng web NextJS được thiết kế để giúp học sinh luyện tập các phép tính cơ bản: **Cộng (+), Trừ (-), Nhân (×), Chia (÷)**. Ứng dụng sử dụng Supabase làm backend và có thể deploy lên Vercel.

## ✨ Tính Năng Chính

### 🔐 Xác Thực & Tài Khoản
- **Đăng ký**: username (không phải email), họ tên, mật khẩu
- **Đăng nhập**: dùng username + mật khẩu (nội bộ chuyển thành email giả `username+mathapp@gmail.com`)
- **Đổi mật khẩu**: nhập mật khẩu hiện tại, mật khẩu mới, có thể chọn đăng xuất sau khi đổi
- **Single session**: mỗi tài khoản chỉ đăng nhập trên 1 thiết bị tại 1 thời điểm. Đăng nhập nơi khác sẽ tự đăng xuất nơi hiện tại (dựa vào `current_client_id` + Supabase Realtime)
- **Toast thông báo**: thành công/thất bại cho các thao tác (đăng nhập/đăng ký/đổi mật khẩu/quản trị)

### 🎯 Các Phép Tính Được Hỗ Trợ
- **Phép Cộng (+)** - Với phạm vi 10, 20, 100 (có nhớ/không nhớ)
- **Phép Trừ (-)** - Tính hiệu hai số  
- **Phép Nhân (×)** - Tính tích hai số
- **Phép Chia (÷)** - Tính thương hai số

### ⚙️ Tùy Chỉnh Độ Khó
- **Số chữ số**: 1-9 chữ số cho mỗi số
- **Số lượng bài tập**: 1-50 câu **hỏi**
- **Phạm vi phép cộng**: 10, 20, 100
- **Loại phép cộng**: Có nhớ hoặc không nhớ

### 📊 Dashboard & Quản Trị
- **/dashboard**: trang người dùng, chọn cấu hình bài tập và bắt đầu luyện tập
- **/admin/dashboard**: trang quản trị (chỉ admin)
  - Biểu đồ đăng ký theo ngày/tháng/năm (dựa vào `users.created_at`)
  - Bảng quản lý user với CRUD (sửa role/username/họ tên; xóa user kèm confirm modal)
  - Tạo user mới bằng popup modal
  - Nút đăng xuất

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
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # dùng cho API admin
```

### 4. Thiết Lập Database
1) Chạy toàn bộ SQL trong `supabase/schema.sql` trên Supabase (tạo bảng, RLS, trigger, seed admin role):
   - Bảng `users` đã có cột `current_client_id` phục vụ single session.
2) Nếu đã có schema cũ, thêm cột thủ công (an toàn khi đã tồn tại):
```sql
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS current_client_id TEXT;
```
3) Bật Realtime cho bảng `users` để single session hoạt động:
   - Trong Dashboard: Table Editor → users → Realtime → Enable
   - Hoặc SQL (nếu publication mặc định tồn tại):
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
```

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
│   ├── page.tsx           # Redirect → /home
│   ├── home/              # Trang chính (mọi người đều truy cập được)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── change-password/page.tsx
│   ├── dashboard/page.tsx
│   ├── practice/page.tsx
│   └── admin/dashboard/page.tsx
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── math/             # Math exercise components
│   └── ui/
│       ├── ToastProvider.tsx
│       └── Modal.tsx
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── math-generator.ts # Math exercise generator
│   ├── supabase.ts       # Supabase client (client-side)
│   ├── supabase-lite.ts  # Supabase không persist session (verify mật khẩu)
│   ├── supabase-admin.ts # Supabase service role (server-side)
│   ├── constants.ts      # Hằng số (USERNAME_EMAIL_SUFFIX, routes...)
│   ├── types.ts          # Kiểu dữ liệu dùng chung
│   └── utils.ts          # Tiện ích (withTimeout...)
├── supabase/             # Database schema
│   └── schema.sql        # SQL schema
└── public/               # Static assets
```

## 🗄️ Database Schema

### Bảng `users`
- `id` - UUID (Primary Key, Foreign Key to auth.users)
- `username` - VARCHAR(50) UNIQUE
- `full_name` - VARCHAR(100)
- `role` - TEXT ('admin' | 'user')
- `current_client_id` - TEXT (single session)
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

### Admin Users API (serverless, yêu cầu `SUPABASE_SERVICE_ROLE_KEY`)
- `GET /api/admin/users` — Danh sách users
- `POST /api/admin/users` — Tạo user (Auth + bảng users)
- `PATCH /api/admin/users` — Cập nhật `username`, `full_name`, `role`
- `DELETE /api/admin/users?id={id}` — Xóa user (bảng users + Auth)

## 🛡️ Bảo Mật

- **Row Level Security (RLS)**: user chỉ truy cập dữ liệu của mình; admin có policy riêng
- **Supabase Auth**: dùng email giả dạng `username+mathapp@gmail.com`
- **Single session**: `current_client_id` + Realtime buộc 1 phiên/thiết bị
- **Environment Variables**: tách `NEXT_PUBLIC_*` và `SUPABASE_SERVICE_ROLE_KEY`
- **TypeScript**: type safety, tách `types.ts`

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind CSS** responsive utilities
- **Touch-friendly** interface
- **Cross-browser** compatibility

## 🎨 UI/UX Features

- **Clean, modern design**
- **Intuitive navigation**
- **Real-time feedback** (Toast slide in/out)
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