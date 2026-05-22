
// Callback
// function taiDuLieu(callback) {
//     console.log("Đang tải dữ liệu");
//     setTimeout(() => {
//         callback();
//     }, 3000);
// }

// taiDuLieu(() => {
//     console.log("Đã tải dữ liệu thành công và hiển thị ra ngoài màn hình");
// });


// function layDuLieu(callback) {
//     console.log("Đang tải dữ liệu...");

//     setTimeout(() => {
//         const data = ["Táo", "Cam", "Xoài"];

//         callback(data);
//     }, 2000);
// }

// layDuLieu((danhSach) => {
//     console.log("Dữ liệu nhận được:", danhSach);
// });

// Chuyển đổi layDuLieu sang sử dụng Promise
// function layDuLieu() {
//     console.log("Đang tải dữ liệu...");
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const data = ["Táo", "Cam", "Xoài"];
//             resolve(data);
//         }, 2000);
//     });
// }

// layDuLieu().then((danhSach) => {
//     console.log("Dữ liệu nhận được:", danhSach);
// });



// Ví dụ 3 về callback hell

// function layUser(callback) {
//     setTimeout(() => {
//         console.log("Đã lấy user");

//         callback({
//             id: 1,
//             name: "Đạt"
//         });
//     }, 1000);
// }
// function layDonHang(userId, callback) {
//     setTimeout(() => {
//         console.log("Đã lấy đơn hàng");
//         callback({
//             orderId: 999,
//             productId: 5
//         });
//     }, 1000);
// }
// function layChiTietSanPham(productId, callback) {
//     setTimeout(() => {
//         console.log("Đã lấy chi tiết sản phẩm");

//         callback({
//             id: productId,
//             name: "iPhone 15",
//             price: 25000000
//         });
//     }, 1000);
// }
// function thanhToan(product, callback) {
//     setTimeout(() => {
//         console.log(`Đã thanh toán ${product.name}`);
//         callback();
//     }, 1000);
// }
// layUser((user) => {
//     // { id: 1, name: "Đạt"}
//     layDonHang(user.id, (order) => {
//         //{orderId: 999, productId: 5 }
//         layChiTietSanPham(order.productId, (product) => {
//             thanhToan(product, () => {
//                 console.log("Hoàn tất quy trình");
//             });
//         });
//     });
// });


// promise 
// function layUser() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Đã lấy user");
//             resolve({
//                 id: 1,
//                 name: "Đạt"
//             });
//         }, 1000);
//     });
// }

// function layDonHang(userId) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Đã lấy đơn hàng");
//             resolve({
//                 orderId: 999,
//                 productId: 5
//             });
//         }, 1000);
//     });
// }

// function layChiTietSanPham(productId) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Đã lấy chi tiết sản phẩm");
//             resolve({
//                 id: productId,
//                 name: "iPhone 15",
//                 price: 25000000
//             });
//         }, 1000);
//     });
// }

// function thanhToan(product) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(`Đã thanh toán ${product.name}`);
//             resolve();
//         }, 1000);
//     });
// }

// // Cách 1: Sử dụng Promise chain (.then)
// layUser()
//     .then((user) => layDonHang(user.id))
//     .then((order) => layChiTietSanPham(order.productId))
//     .then((product) => thanhToan(product))
//     .then(() => console.log("Hoàn tất quy trình"))
//     .catch(error => console.error(error))

// // Cách 2: Sử dụng Async/Await (Khuyên dùng)
// async function chayQuyTrinh() {
//     try {
//         const user = await layUser();
//         const order = await layDonHang(user.id);
//         const product = await layChiTietSanPham(order.productId);
//         await thanhToan(product);
//         console.log("Hoàn tất quy trình");
//     } catch (error) {
//         console.error(error);
//     }
// }
// chayQuyTrinh();


// API


// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then(data => {
//         document.querySelector('#productList').innerHTML = data.map(item => {
//             return `<h2>${item.title}</h2>`
//         }).join("")
//     })

const chayHam = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    document.querySelector('#productList').innerHTML = data.map(item => {
        return `<h2>${item.title}</h2>`
    }).join("")
}
chayHam();