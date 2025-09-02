# 🧮 Ứng Dụng Luyện Tập Các Phép Tính Cộng Trừ Nhân Chia

## 📋 Tổng Quan
Đây là một ứng dụng web được thiết kế để giúp học sinh luyện tập các phép tính cơ bản: **Cộng (+), Trừ (-), Nhân (×), Chia (÷)**. Ứng dụng hỗ trợ nhiều loại bài tập khác nhau với độ khó có thể tùy chỉnh.

## ✨ Tính Năng Chính

### 🎯 Các Phép Tính Được Hỗ Trợ
- **Phép Cộng (+)** - Tính tổng hai số
- **Phép Trừ (-)** - Tính hiệu hai số  
- **Phép Nhân (×)** - Tính tích hai số với giao diện bảng tính chi tiết
- **Phép Chia (÷)** - Tính thương hai số với giao diện chia dọc

### ⚙️ Tùy Chỉnh Độ Khó
- **Số chữ số của số thứ nhất**: 1-9 chữ số
- **Số chữ số của số thứ hai**: 1-9 chữ số
- **Số lượng bài tập**: 1-50 câu hỏi
- **Loại số**: Số tự nhiên, phân số, số thập phân (đang phát triển)

### 📊 Hệ Thống Điểm Số
- Hiển thị số câu đã làm
- Đếm số câu trả lời đúng (màu xanh)
- Đếm số câu trả lời sai (màu đỏ)
- Thông báo kết quả cuối bài

## 🎮 Cách Sử Dụng

### 1. Thiết Lập Bài Tập
1. Chọn **loại phép tính** từ dropdown
2. Nhập **số chữ số** cho số thứ nhất (1-9)
3. Nhập **số chữ số** cho số thứ hai (1-9)
4. Chọn **số lượng bài** muốn làm (1-50)
5. Nhấn **"Bắt đầu"**

### 2. Làm Bài
- **Phép cộng/trừ**: Nhập kết quả vào ô trống
- **Phép nhân**: Điền từng chữ số vào bảng tính chi tiết
- **Phép chia**: Điền từng bước tính trong phép chia dọc
- Nhấn **"Kiểm tra"** hoặc **Enter** để kiểm tra đáp án

### 3. Điều Hướng
- Sử dụng **phím mũi tên** để di chuyển giữa các ô input
- **Nút cài đặt** (⚙️) để quay về màn hình chọn bài
- **Popup thông báo** hiển thị kết quả đúng/sai

## 🛠️ Cấu Trúc Code

### 📁 Cấu Trúc File
```
├── index.html          # Giao diện chính
├── script.js           # Logic xử lý và tính toán
├── styles.css          # Thiết kế giao diện
├── avt.png            # Icon ứng dụng
└── README.md          # Tài liệu hướng dẫn
```

### 🔧 Các Hàm Chính

#### **Tạo Số Ngẫu Nhiên**
- `generateRandomNumber(digits)` - Tạo số ngẫu nhiên với số chữ số cho trước
- `generateRandomNumberDivide(digits, num2)` - Tạo số phù hợp cho phép chia

#### **Kiểm Tra Đáp Án**
- `checkAnswer()` - Hàm chính kiểm tra tất cả loại phép tính
- `checkAnswerMultiply(num1, num2)` - Kiểm tra phép nhân
- `checkAnswerDivision(num1, num2)` - Kiểm tra phép chia

#### **Tạo Giao Diện Tính Toán**
- `calculationOperatorNormal(num1, num2, operator)` - Giao diện cộng/trừ
- `calculationOperatorMultiply(num1, num2, operator)` - Giao diện nhân
- `calculationOperatorDivision(num1, num2)` - Giao diện chia

#### **Hàm Hỗ Trợ**
- `quanNum(num)` - Đếm số chữ số của một số
- `isArrayEmpty(arr)` - Kiểm tra mảng có rỗng không
- `returnArrLineAnwerDivision(num1, num2)` - Tính đáp án phép chia

### 🎨 Giao Diện

#### **Màn Hình Chính**
- **Bảng điểm**: Hiển thị tiến độ và kết quả
- **Khu vực tính toán**: Nơi hiển thị bài tập
- **Nút cài đặt**: Quay về màn hình chọn bài

#### **Thiết Kế Responsive**
- Giao diện thân thiện với người dùng
- Popup thông báo kết quả
- Màu sắc phân biệt đúng/sai
- Font chữ lớn, dễ đọc

## 🚀 Tính Năng Đặc Biệt

### 📐 Phép Nhân Chi Tiết
- Hiển thị bảng tính từng bước
- Cho phép điền từng chữ số của tích riêng
- Tự động chuyển focus giữa các ô
- Hỗ trợ phím mũi tên để điều hướng

### ➗ Phép Chia Dọc
- Giao diện chia dọc truyền thống
- Điền từng bước tính chi tiết
- Nút "Thêm bước tính" cho phép mở rộng
- Kiểm tra đáp án chính xác từng bước

### 🎯 Validation Thông Minh
- Kiểm tra tính hợp lệ của cài đặt
- Đảm bảo phép trừ/chia có kết quả dương
- Giới hạn số chữ số và số bài hợp lý
- Thông báo lỗi rõ ràng

## 🔧 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần cài đặt thêm phần mềm

### Cách Chạy
1. Tải toàn bộ file về máy
2. Mở file `index.html` bằng trình duyệt
3. Bắt đầu luyện tập!

## 👨‍💻 Thông Tin Tác Giả
**Tác giả**: Trần Hồng Quân  
**Mục đích**: Hỗ trợ học sinh luyện tập toán học  
**Công nghệ**: HTML5, CSS3, JavaScript thuần

## 📝 Ghi Chú
- Ứng dụng hoạt động hoàn toàn offline
- Không lưu trữ dữ liệu người dùng
- Phù hợp cho học sinh tiểu học và trung học cơ sở
- Có thể mở rộng thêm các phép tính phức tạp hơn

---
*Chúc bạn học tập hiệu quả! 🎓*
