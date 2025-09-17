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
Bài 1 – Tính tổng tiền hàng
	•	Viết hàm calculateTotal dưới dạng arrow function.
	•	Hàm nhận vào một object có 2 thuộc tính: price (giá sản phẩm) và quantity (số lượng).
	•	Trả về tổng tiền = price * quantity.

⸻

Bài 2 – Tính giá sau khuyến mãi (Arrow Function + Object)
	•	Viết hàm applyDiscount dưới dạng arrow function.
	•	Hàm nhận vào một object gồm: price (giá gốc), discountPercent (phần trăm giảm giá).
	•	Trả về giá sau khuyến mãi = price – (price * discountPercent / 100).
	•	Lưu ý: Xử lý khi discountPercent lớn hơn 100 hoặc nhỏ hơn 0.

⸻

Bài 3 – Tính phí vận chuyển
	•	Viết hàm calculateShipping dưới dạng arrow function.
	•	Hàm nhận vào một object gồm: totalPrice (tổng tiền đơn hàng sau giảm giá) và location (địa chỉ giao hàng).
	•	Quy tắc tính phí:
	•	Nếu totalPrice ≥ 500,000 → phí = 0.
	•	Nếu totalPrice < 500,000 thì:
	•	location = "noi-thanh" → phí = 30,000.
	•	location = "ngoai-thanh" → phí = 50,000.
	•	Lưu ý: Trường hợp nhập sai location thì phải báo lỗi hoặc trả về thông báo hợp lệ.
 */
