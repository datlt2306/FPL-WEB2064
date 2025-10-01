// const a = 10;
// const b = 50;

// const btn = document.getElementById("btn");
// const content = document.getElementById("content");
// const resultElement = document.getElementById("result");

// btn.addEventListener("click", () => {
//     content.innerHTML = a + b;
//     // Lưu dữ liệu vào localStorage
//     localStorage.setItem("total", a + b);
// });

// // Lấy dữ liệu từ localStorage
// result.innerHTML = localStorage.getItem("total");

// const data = [
//     {
//         id: 1,
//         name: "John",
//         age: 20,
//     },
//     {
//         id: 2,
//         name: "Jane",
//         age: 21,
//     },
// ];

// btn.addEventListener("click", () => {
//     localStorage.setItem("data", JSON.stringify(data));
// });

// const result = JSON.parse(localStorage.getItem("data")) || [];
// resultElement.innerHTML = result.map((item) => `<div>${item.name}</div>`).join("");

/**
 * Tạo 1 ô input + nút "Save name"
 * Khi bấm nút -> lưu tên vào localStorage
 * Khi reload trang -> hiển thị tên đã lưu
 */

const inputElement = document.getElementById("input");
const btnElement = document.getElementById("btn");
const resultElement = document.getElementById("result");

btnElement.addEventListener("click", () => {
    console.log(inputElement.value);
    localStorage.setItem("name", JSON.stringify(inputElement.value));
});
resultElement.innerHTML = JSON.parse(localStorage.getItem("name")) || "";
// npm create vite@latest todo -- --template vanilla-js
