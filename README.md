# Book Store MERN Stack

## Thông tin nhóm 11
- **Thành viên:**
  - Thuận
  - Phát

## Giới thiệu dự án
Dự án Book Store là một trang web bán sách trực tuyến được xây dựng bằng MERN Stack (MongoDB, Express.js, React.js, Node.js). 

### Tính năng chính
- **Người dùng:**
  - Đăng nhập/Đăng ký (tích hợp Firebase Authentication)
  - Tìm kiếm và lọc sách theo nhiều tiêu chí
  - Giỏ hàng và thanh toán
  - Theo dõi đơn hàng
  - Xem lịch sử mua hàng

- **Admin:**
  - Quản lý sách (CRUD)
  - Quản lý đơn hàng
  - Thống kê doanh thu
  - Dashboard với các số liệu quan trọng

## Công nghệ sử dụng
- **Frontend:**
  - React.js
  - Redux Toolkit
  - Tailwind CSS
  - React Router DOM
  - Axios
  - React Hook Form
  - React Icons
  - React Toastify
  - Swiper

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT
  - Cors

- **Authentication:**
  - Firebase

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js
- MongoDB
- Git

### Các bước cài đặt

1. **Clone repository**

git clone [URL của repository]


2. **Cài đặt dependencies cho Backend**

cd admin
npm install


3. **Cài đặt dependencies cho Frontend**

cd client
npm install


4. **Tạo file .env trong thư mục admin**

PORT=5000
MONGODB_URI=[URL MongoDB của bạn]


5. **Tạo file .env trong thư mục client**

VITE_FIREBASE_API_KEY=[Firebase API Key]
VITE_FIREBASE_AUTH_DOMAIN=[Firebase Auth Domain]
VITE_FIREBASE_PROJECT_ID=[Firebase Project ID]
VITE_FIREBASE_STORAGE_BUCKET=[Firebase Storage Bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID=[Firebase Sender ID]
VITE_FIREBASE_APP_ID=[Firebase App ID]



6. **Chạy ứng dụng**

Backend: cd admin
	npm run dev



Frontend: cd client
	npm run dev


Ứng dụng sẽ chạy tại:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Tài khoản Admin mặc định
- Username: admin
- Password: 123456

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một pull request hoặc liên hệ với chúng mình qua email.

## Liên hệ

- **Thuận**: 22110240@student.hcmute.edu.vn
- **Phát**: 22110197@student.hcmute.edu.vn







