
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



// Ví dụ 3 về callback hell

function layUser(callback) {
    setTimeout(() => {
        console.log("Đã lấy user");

        callback({
            id: 1,
            name: "Đạt"
        });
    }, 1000);
}
function layDonHang(userId, callback) {
    setTimeout(() => {
        console.log("Đã lấy đơn hàng");
        callback({
            orderId: 999,
            productId: 5
        });
    }, 1000);
}
function layChiTietSanPham(productId, callback) {
    setTimeout(() => {
        console.log("Đã lấy chi tiết sản phẩm");

        callback({
            id: productId,
            name: "iPhone 15",
            price: 25000000
        });
    }, 1000);
}
function thanhToan(product, callback) {
    setTimeout(() => {
        console.log(`Đã thanh toán ${product.name}`);
        callback();
    }, 1000);
}
layUser((user) => {
    // { id: 1, name: "Đạt"}
    layDonHang(user.id, (order) => {
        //{orderId: 999, productId: 5 }
        layChiTietSanPham(order.productId, (product) => {
            thanhToan(product, () => {
                console.log("Hoàn tất quy trình");
            });
        });
    });
});