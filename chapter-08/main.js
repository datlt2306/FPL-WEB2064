// const a = 10;
// const b = 50;

const btn = document.getElementById("btn");
const content = document.getElementById("content");
const resultElement = document.getElementById("result");

// btn.addEventListener("click", () => {
//     content.innerHTML = a + b;
//     // Lưu dữ liệu vào localStorage
//     localStorage.setItem("total", a + b);
// });

// // Lấy dữ liệu từ localStorage
// result.innerHTML = localStorage.getItem("total");

const data = [
    {
        id: 1,
        name: "John",
        age: 20,
    },
    {
        id: 2,
        name: "Jane",
        age: 21,
    },
];

btn.addEventListener("click", () => {
    localStorage.setItem("data", JSON.stringify(data));
});

const result = JSON.parse(localStorage.getItem("data")) || [];
resultElement.innerHTML = result.map((item) => `<div>${item.name}</div>`).join("");
