# Ứng dụng Quản lý Sản phẩm

## Mô tả

Ứng dụng quản lý sản phẩm được xây dựng với HTML, CSS (Bootstrap), JavaScript và JSON Server.

## Tính năng

### 1. Giao diện và Điều hướng (1 điểm)

-   ✅ Sử dụng Bootstrap 5.3.8 để tạo UI hiện đại
-   ✅ Có nút điều hướng để chuyển giữa các trang
-   ✅ Responsive design

### 2. Hiển thị danh sách sản phẩm (1 điểm)

-   ✅ GET /products để lấy danh sách sản phẩm
-   ✅ Bảng hiển thị: name, quantity, imageUrl (ảnh), category
-   ✅ Hiển thị hình ảnh sản phẩm với fallback

### 3. Chức năng xóa sản phẩm (1 điểm)

-   ✅ Nút Xóa ở từng dòng sản phẩm
-   ✅ Confirm trước khi xóa (0.5 điểm)
-   ✅ DELETE /products/:id và refetch danh sách (0.5 điểm)

### 4. Chức năng thêm sản phẩm mới (2.5 điểm)

-   ✅ POST /products bằng fetch API (1 điểm)
-   ✅ Validation form đầy đủ (1 điểm):
    -   name: string, required
    -   quantity: number, required, ≥ 0
    -   imageUrl: string, required
    -   category: string, required (select-option: Áo/Quần/Đầm)
-   ✅ Thành công: alert + điều hướng về danh sách (0.5 điểm)

### 5. Chức năng cập nhật sản phẩm (2.5 điểm)

-   ✅ Trang sửa nạp trước dữ liệu bằng GET /products/:id
-   ✅ PUT /products/:id thành công (1 điểm)
-   ✅ Validation form đầy đủ (1 điểm):
    -   name: string, required
    -   price: number, required, ≥ 0
    -   quantity: number, required, ≥ 0
    -   imageUrl: string, required
    -   category: string, required (select-option: Áo/Quần/Đầm)
-   ✅ Thành công: alert + điều hướng về danh sách (0.5 điểm)

### 6. Chức năng đăng ký & đăng nhập (1 điểm)

-   ✅ Form Register và Login riêng biệt
-   ✅ Đăng ký (0.5 điểm):
    -   email: bắt buộc, đúng định dạng email
    -   password: bắt buộc, ≥ 6 ký tự
    -   username: bắt buộc
    -   đăng ký thành công → hiển thị thông báo
-   ✅ Đăng nhập (0.5 điểm):
    -   Kiểm tra đúng tài khoản, mật khẩu
    -   đăng nhập thành công → hiển thị thông báo

### 7. Bonus - Bảo mật (1 điểm)

-   ✅ Đăng nhập thành công → lưu token (localStorage)
-   ✅ Chỉ cho xem trang danh sách sản phẩm khi có token
-   ✅ Nếu chưa đăng nhập → tự động chuyển sang trang đăng nhập
-   ✅ Nút đăng xuất và hiển thị trạng thái đăng nhập

## Cách chạy ứng dụng

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy JSON Server

```bash
npm run dev:api
```

Server sẽ chạy tại: http://localhost:3001

### 3. Mở ứng dụng

Mở file `index.html` trong trình duyệt hoặc sử dụng live server.

## Cấu trúc dự án

```
chapter-11/
├── index.html          # Trang danh sách sản phẩm
├── add.html            # Trang thêm sản phẩm
├── edit.html           # Trang sửa sản phẩm
├── signin.html         # Trang đăng nhập
├── signup.html         # Trang đăng ký
├── main.js             # Logic chính của ứng dụng
├── db.json             # Database JSON
├── package.json        # Dependencies
└── README.md           # Hướng dẫn sử dụng
```

## API Endpoints

-   `GET /products` - Lấy danh sách sản phẩm
-   `GET /products/:id` - Lấy thông tin sản phẩm theo ID
-   `POST /products` - Tạo sản phẩm mới
-   `PUT /products/:id` - Cập nhật sản phẩm
-   `DELETE /products/:id` - Xóa sản phẩm
-   `POST /login` - Đăng nhập
-   `POST /register` - Đăng ký

## Tài khoản mẫu

-   Email: admin@gmail.com
-   Password: admin123

-   Email: member@gmail.com
-   Password: member123

## Tính năng bảo mật

-   Sử dụng JWT token để xác thực
-   Tự động redirect về trang đăng nhập nếu chưa xác thực
-   Lưu trữ token trong localStorage
-   Kiểm tra quyền truy cập cho các trang bảo mật
