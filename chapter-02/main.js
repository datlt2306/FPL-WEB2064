// ================================================
// function run() {
//     console.log("Đang chạy");
// }
// const profile = {
//     name: "Đạt",
//     run: function () {
//         console.log("Đang chạy");
//     },
//     children: {
//         run: function () {
//             console.log("Đang chạy");
//         },
//     },
// };
// console.log(profile.name);
// profile.children.run();

// ================================================

const a = 10;
const myName = "Dat";
const myInfo = {
    name: "Dat",
};

// function name
console.log(sum(10, 20));
function sum(a, b) {
    return a + b;
}

// function expression
const sum2 = function (a, b) {
    return a + b;
};
console.log(sum2(10, 20));

// arrow function
const sum3 = (a, b) => {
    return a + b;
};
console.log(sum3(10, 20));

/**
 * Bài tập: Viết kiểu arrow function cho các bài tập sau:
 * Bài 1: Tính tổng tiền hàng
 * Mô tả: Viết hàm calculateTotal(price, quantity) nhận vào giá sản phẩm và số lượng, trả về tổng tiền.
 * 
 * Bài 2: Tính giá sau khuyến mãi
 * Mô tả: Viết hàm applyDiscount(price, discountPercent) nhận vào giá gốc và phần trăm giảm giá, trả về giá sau giảm.
 * 
 * Bài 3 (Khó) – Tính phí vận chuyển
 * Mô tả: Viết hàm calculateShipping(totalPrice, location) tính phí vận chuyển dựa trên điều kiện:
        •	Nếu tổng giá trị đơn hàng ≥ 500,000 thì miễn phí ship.
        •	Nếu dưới 500,000 thì:
        •	Khách ở "noi-thanh" (nội thành) thì phí ship = 30,000.
        •	Khách ở "ngoai-thanh" (ngoại thành) thì phí ship = 50,000.
 */
