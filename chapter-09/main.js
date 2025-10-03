// function display(name) {
//     console.log(`Xin chào ${name}`);
// }

// function hello(name, callback) {
//     callback(name);
// }
// hello("Đạt", display);

/**
 * 	1.	Viết hàm calculate(a, b, callback):
	•	Nhận vào 2 số a, b.
	•	Nhận vào một callback để quyết định phép tính (cộng, trừ, nhân, chia).
	•	Trả về kết quả phép tính.
	2.	Thử gọi với 2 số: 10 và 5.
	•	Callback cộng → ra 15
	•	Callback trừ → ra 5
	•	Callback nhân → ra 50
	•	Callback chia → ra 2
 */
// function tinhToan(a, b, method) {
//     switch (method) {
//         case "cong":
//             return a + b;
//         case "tru":
//             return a - b;
//         case "nhan":
//             return a * b;
//         case "chia":
//             return a / b;
//     }
// }
// const calculate = (a, b, callback) => callback(a, b);
// calculate(10, 5, tinhToan, "cong");
// calculate(20, 30, tinhToan, "nhan");

// console.log("Có 1 khu vực để hiển thị danh sách sản phẩm");
// setTimeout(() => {
//     console.log("Query đến database để lấy dữ liệu");
// }, 3000);
// console.log("Hiển thị dữ liệu vào khu vực đã có");

// function getData(callback) {
//     console.log("Đang tải dữ liệu...");
//     // Giả lập chờ 2 giây
//     setTimeout(function () {
//         let data = "Danh sách sinh viên";
//         callback(data); // gọi callback khi đã có dữ liệu
//     }, 2000);
// }
// // Sử dụng
// getData(function (result) {
//     console.log("Dữ liệu nhận được:", result);
// });

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
        callback(script);
    };
    document.head.append(script);
}
loadScript("https://cdn.tailwindcss.com", function (script) {
    console.log(script);
});
