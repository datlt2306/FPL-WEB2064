var a = 10;
a = 20; 
// mặc định không sử dụng var
console.log(a); /// 20
let b =  10;
b = 20;
// chưa xác định được giá trị của 1 biến
// let gioiTinh;
// let gioiTinh = 'nam'
console.log(b) // 20
// default: sử dụng const khai báo biến
const student1 = {
    name : "Ken"};
console.log(student1.name); // Ken
const student2 = student1;
student2.name = "Đạt";
console.log(student1.name); // Đạt?


const myFriends = ['Đạt', 'Ken'];
myFriends.push('Tùng');

// Quy đặt tên biến / hàm

// tên biến : Danh từ 

const products = [];
const userInfo = {};
const profile = {};
// tên hàm: Động từ
function  removeProduct(){
}
function getUserInfo () {

}

// function

function sum(a, b){
    console.log(a + b);
}
sum(30, 10);


// nhìn, hiểu, nhớ và viết lại

const email = prompt('Nhập email');
const password = prompt('Nhập pass');

// Cấu hình tài khoản admin (Dễ dàng quản lý hoặc thay thế sau này)
const ADMIN_CREDENTIALS = {
    email: 'admin@gmail.com',
    password: 'admin@gmail.com'
};
function login(email, password) {
    // 1. Chuẩn hóa và làm sạch dữ liệu đầu vào (Tránh lỗi khoảng trắng thừa và phân biệt hoa/thường ở email)
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();
    // 2. Kiểm tra dữ liệu rỗng đầu vào
    if (!cleanEmail || !cleanPassword) {
        return 'Vui lòng nhập đầy đủ email và mật khẩu!';
    }
    // 3. Xác thực thông tin (Sử dụng Early Return pattern để giữ code phẳng và dễ đọc)
    if (cleanEmail !== ADMIN_CREDENTIALS.email || cleanPassword !== ADMIN_CREDENTIALS.password) {
        return 'Đăng nhập thất bại!';
    }
    return 'Đăng nhập thành công!';
}
// Thực thi và hiển thị kết quả
const loginResult = login(email, password);
alert(loginResult);

